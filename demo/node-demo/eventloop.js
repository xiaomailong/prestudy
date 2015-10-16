// JavaScript 运行机制详解：再谈Event Loop
// http://www.ruanyifeng.com/blog/2014/10/event-loop.html

// 除了放置异步任务的事件，"任务队列"还可以放置定时事件，即指定某些代码在多少时间之后执行。
// 这叫做"定时器"（timer）功能，也就是定时执行的代码。

// 定时器功能主要由setTimeout()和setInterval()这两个函数来完成，
// 它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。
// 以下主要讨论setTimeout()。

// setTimeout()接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。

console.log(1);
setTimeout(function(){console.log(2);},1000);
console.log(3);
// 上面代码的执行结果是1，3，2，因为setTimeout()将第二行推迟到1000毫秒之后执行。


setTimeout(function(){console.log(11);}, 0);
console.log(22);
// 上面代码的执行结果总是2，1，因为只有在执行完第二行以后，系统才会去执行"任务队列"中的回调函数。


// Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。
// Node.js的运行机制如下。
// （1）V8引擎解析JavaScript脚本。
// （2）解析后的代码，调用Node API。
// （3）libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
// （4）V8引擎再将结果返回给用户。
// 除了setTimeout和setInterval这两个方法，Node.js还提供了另外两个与"任务队列"有关的方法：
// process.nextTick和setImmediate。它们可以帮助我们加深对"任务队列"的理解。

// process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。
// 也就是说，它指定的任务总是发生在所有异步任务之前。
// setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，
// 这与setTimeout(fn, 0)很像。
// 请看下面的例子（via StackOverflow）。
process.nextTick(function A() {
  console.log(111);
  process.nextTick(function B(){console.log(222);});
});

setTimeout(function timeout() {
  console.log('nextTick TIMEOUT FIRED');
}, 0);
// 111
// 2
// TIMEOUT FIRED
// 上面代码中，由于process.nextTick方法指定的回调函数，总是在当前"执行栈"的尾部触发，
// 所以不仅函数A比setTimeout指定的回调函数timeout先执行，而且函数B也比timeout先执行。
// 这说明，如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前"执行栈"执行。

// 现在，再看setImmediate。
setImmediate(function A() {
  console.log(1111);
  setImmediate(function B(){console.log(2222);});
});

setTimeout(function timeout() {
  console.log('setImmediate TIMEOUT FIRED');
}, 0);
// 上面代码中，setImmediate与setTimeout(fn,0)各自添加了一个回调函数A和timeout，都是在下一次Event Loop触发。
// 那么，哪个回调函数先执行呢？答案是不确定。
// 运行结果可能是1--TIMEOUT FIRED--2，也可能是TIMEOUT FIRED--1--2。

// 令人困惑的是，Node.js文档中称，setImmediate指定的回调函数，总是排在setTimeout前面。
// 实际上，这种情况只发生在递归调用的时候。
setImmediate(function (){
  setImmediate(function A() {
    console.log(11111);
    setImmediate(function B(){console.log(22222);});
  });

  setTimeout(function timeout() {
    console.log('11111 TIMEOUT FIRED');
  }, 0);
});
// 1
// TIMEOUT FIRED
// 2
// 上面代码中，setImmediate和setTimeout被封装在一个setImmediate里面，
// 它的运行结果总是1--TIMEOUT FIRED--2，这时函数A一定在timeout前面触发。
// 至于2排在TIMEOUT FIRED的后面（即函数B在timeout后面触发），是因为setImmediate总是将事件注册到下一轮Event Loop，
// 所以函数A和timeout是在同一轮Loop执行，而函数B在下一轮Loop执行。
// 我们由此得到了process.nextTick和setImmediate的一个重要区别：
// 多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。
// 事实上，这正是Node.js 10.0版添加setImmediate方法的原因，
// 否则像下面这样的递归调用process.nextTick，将会没完没了，主线程根本不会去读取"事件队列"！
// process.nextTick(function foo() {
//   process.nextTick(foo);
// });
// setImmediate(function foo() {
//   setImmediate(foo);
// });
// 事实上，现在要是你写出递归的process.nextTick，Node.js会抛出一个警告，要求你改成setImmediate。
// 另外，由于process.nextTick指定的回调函数是在本次"事件循环"触发，而setImmediate指定的是在下次"事件循环"触发，
// 所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。
