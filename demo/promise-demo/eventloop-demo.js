var EventEmitter = require('events').EventEmitter;
var util = require('util');

// 要理解event loop首先需要了解的就是event driven programming（事件驱动的编程）。
// 定义非常简单：event-driven programming就是程序的控制流程是由事件或者状态的改变决定的。
// 主要的实现机制就是用一个中心控制台监听事件，并在事件发生的时候调用这个事件对应的回调函数（状态的改变也是一样）。
function MyEmitter() {
  EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);
MyEmitter.prototype.doStuff = function() {
  console.log('---before');
  this.emit('fire');
  console.log('---after');
};
var me = new MyEmitter();
me.on('fire', function(){
  console.log('---emit fired');
});
me.doStuff();  // Output: ---before ---emit fired ---after
// EventEmitter看起来是异步的，因为他总是被用来发出异步操作完成的信号。但是，EventEmitter API是完全同步的。
// emit方法可能被异步调用，但是需要主要到全部的监听方法都是按照添加的顺序同步执行的。

// Event Emitter和Event Loop
// 为了简化和Event loop的互操作，所以有了EventEmitter。
// 用EventEmitter可以很容易创建一个基于事件的API。下面我们就一些主要内容做讲解。
// 下面的代码展示了没有同步发出事件会造成用户错过事件的情况：
function MyThing1() {
  EventEmitter.call(this);
  this.emit('thing1');
}
util.inherits(MyThing1, EventEmitter);
var mt1 = new MyThing1();
mt1.on('thing1', function(){
  // never going to happen.
});
// 以上代码的问题就在于‘thing1’永远不会被用户捕捉到，因为MyThing()必须在初始化完成之后才能监听事件。

// 下面是一个简单地解决方案，不需要任何另外的闭包：
function MyThing2() {
  EventEmitter.call(this);
  setImmediate(emitThing2, this);
}
util.inherits(MyThing2, EventEmitter);
function emitThing2(self) {
  self.emit('thing2');
}
var mt2 = new MyThing2();
mt2.on('thing2', function(){
  console.log('bravo, thing2 captured.');
});

// 下面的代码页可以运行，只不过消耗较多。
function MyThing3() {
  EventEmitter.call(this);
  setImmediate(this.emit.bind(this, 'thing3'));
}
util.inherits(MyThing3, EventEmitter);
var mt3 = new MyThing3();
mt3.on('thing3', function(){
  // bravo
  console.log('bravo, thing3 captured.');
});

// 另一种情况是触发错误。查出你的应用的问题非常麻烦，而且如果没有调用栈的话，简直无法排查。
// 一个Error在异步执行的深处初始化的时候可能会导致调用栈丢失。解决这个问题最靠谱的两个办法就是同步emit事件，
// 或者确保Error带了足够的相关信息。请看以下代码的演示：
// MyThing3.prototype.foo = function () {
//   var er = doFirstThing();
//   if (er) {
//     // emit error asynchronously
//     setImmediate(emitError, this, new Error('Bad stuff'));
//     return;
//   }
//   // emit error synchronously
//   var er = doSecondThing();
//   if (er) {
//     this.emit('error', 'More bad stuff');
//     return;
//   }
// };
// mt3.foo();
// emit的错误应该立即被处理，以防程序继续执行。而且在构造函数中emit错误也不是个好主意。
