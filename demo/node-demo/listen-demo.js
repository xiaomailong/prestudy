
// 发布---订阅模式又叫观察者模式，
// 它定义了对象间的一种一对多的关系，让多个观察者对象同时监听某一个主题对象，
// 当一个对象发生改变时，所有依赖于它的对象都将得到通知。

// 发布订阅模式的优点：
//   *支持简单的广播通信，当对象状态发生改变时，会自动通知已经订阅过的对象。
//   *发布者与订阅者耦合性降低，发布者只管发布一条消息出去，
//    它不关心这条消息如何被订阅者使用，同时，订阅者只监听发布者的事件名，
//    只要发布者的事件名不变，它不管发布者如何改变。
// 发布订阅模式的缺点：
//   *创建订阅者需要消耗一定的时间和内存。
//   *虽然可以弱化对象之间的联系，如果过度使用的话，反而使代码不好理解及代码不好维护等等。

// 如何实现发布--订阅模式？
//   *首先要想好谁是发布者。
//   *然后给发布者添加一个缓存列表，用于存放回调函数来通知订阅者。
//   *最后就是发布消息，发布者遍历这个缓存列表，依次触发里面存放的订阅者回调函数。

console.log("Sample1");
var shoeObj1 = {};   // 定义发布者
shoeObj1.list = [];  // 缓存列表 存放订阅者回调函数
// 增加订阅者
shoeObj1.listen = function(fn) {
  shoeObj1.list.push(fn);  // 订阅消息添加到缓存列表
}
// 发布消息
shoeObj1.trigger = function(){
  for(var i = 0,fn; fn = this.list[i++];) {
    fn.apply(this,arguments);
  }
}
// 小红订阅如下消息
shoeObj1.listen(function(color,size){
  console.log("小红订阅颜色是："+color);
  console.log("小红订阅尺码是："+size);
});
// 小花订阅如下消息
shoeObj1.listen(function(color,size){
  console.log("小花订阅颜色是："+color);
  console.log("小花订阅尺码是："+size);
});
shoeObj1.trigger("红色",40);
shoeObj1.trigger("黑色",42);

// 对代码进行如下改造下，可以先增加一个key，使订阅者只订阅自己感兴趣的消息。--------------
console.log("Sample2");
var shoeObj2 = {};     // 定义发布者
shoeObj2.list = [];    // 缓存列表 存放订阅者回调函数
// 增加订阅者
shoeObj2.listen = function(key,fn) {
  if(!this.list[key]) {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.list[key] = [];
  }
  this.list[key].push(fn);  // 订阅消息添加到缓存列表
}
// 发布消息
shoeObj2.trigger = function(){
  var key = Array.prototype.shift.call(arguments); // 取出消息类型名称
  var fns = this.list[key];  // 取出该消息对应的回调函数的集合
  // 如果没有订阅过该消息的话，则返回
  if(!fns || fns.length === 0) {
    return;
  }
  for(var i = 0,fn; fn = fns[i++]; ) {
    fn.apply(this,arguments); // arguments 是发布消息时附送的参数
  }
};
// 小红订阅如下消息
shoeObj2.listen('red',function(size){
    console.log("小红订阅尺码是："+size);
});
// 小花订阅如下消息
shoeObj2.listen('black',function(size){
    console.log("小花订阅尺码是："+size);
});
shoeObj2.trigger("red",40);
shoeObj2.trigger("black",42);

// 发布---订阅模式的代码封装 ------------
console.log("Sample3");
var event3 = {
  list: [],
  listen: function(key,fn) {
    if(!this.list[key]) {
      this.list[key] = [];
    }
    // 订阅的消息添加到缓存列表中
    this.list[key].push(fn);
  },
  trigger: function(){
    var key = Array.prototype.shift.call(arguments);
    var fns = this.list[key];
    // 如果没有订阅过该消息的话，则返回
    if(!fns || fns.length === 0) {
      return;
    }
    for(var i = 0,fn; fn = fns[i++];) {
      fn.apply(this,arguments);
    }
  }
};
var initEvent3 = function(obj) {
  for(var i in event3) {
    obj[i] = event3[i];
  }
};
// 我们再来测试下，我们还是给shoeObj这个对象添加发布-订阅功能；
var shoeObj3 = {};
initEvent3(shoeObj3);
// 小红订阅如下消息
shoeObj3.listen('red',function(size){
    console.log("小红订阅尺码是："+size);
});
// 小花订阅如下消息
shoeObj3.listen('black',function(size){
    console.log("小花订阅尺码是："+size);
});
shoeObj3.trigger("red",40);
shoeObj3.trigger("black",42);

// 如何取消订阅事件？ -------------
console.log("Sample4");
var event4 = {
  list: [],
  listen: function(key,fn) {
    if(!this.list[key]) {
      this.list[key] = [];
    }
    // 订阅的消息添加到缓存列表中
    this.list[key].push(fn);
  },
  trigger: function(){
    var key = Array.prototype.shift.call(arguments);
    var fns = this.list[key];
    // 如果没有订阅过该消息的话，则返回
    if(!fns || fns.length === 0) {
      return;
    }
    for(var i = 0,fn; fn = fns[i++];) {
      fn.apply(this,arguments);
    }
  }
};
event4.remove = function(key,fn){
  var fns = this.list[key];
  // 如果key对应的消息没有订阅过的话，则返回
  if(!fns) {
    return false;
  }
  // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
  if(!fn) {
    fn && (fns.length = 0);
  } else {
    for(var i = fns.length - 1; i >= 0; i--) {
      var _fn = fns[i];
      if(_fn === fn) {
        fns.splice(i,1); // 删除订阅者的回调函数
      }
    }
  }
};
var initEvent4 = function(obj) {
  for(var i in event4) {
    obj[i] = event4[i];
  }
};
var shoeObj4 = {};
initEvent4(shoeObj4);
// 小红订阅如下消息
shoeObj4.listen('red',fn1 = function(size){
    console.log("小红订阅尺码是："+size);
});
// 小花订阅如下消息
shoeObj4.listen('red',fn2 = function(size){
    console.log("小花订阅尺码是："+size);
});
shoeObj4.trigger("red",43);
shoeObj4.remove("red",fn1);
shoeObj4.trigger("red",44);
shoeObj4.remove("red",fn2);
shoeObj4.trigger("red",45);

// 封装一个全局发布-订阅模式对象
console.log("Sample5");
var Event5 = (function(){
  var list = {},
  listen,
  trigger,
  remove;
  listen = function(key,fn){
    if(!list[key]) {
      list[key] = [];
    }
    list[key].push(fn);
  };
  trigger = function(){
    var key = Array.prototype.shift.call(arguments);
    var fns = list[key];
    if(!fns || fns.length === 0) {
      return false;
    }
    for(var i = 0, fn; fn = fns[i++];) {
      fn.apply(this,arguments);
    }
  };
  remove = function(key,fn){
    var fns = list[key];
    if(!fns) {
      return false;
    }
    if(!fn) {
      fns && (fns.length = 0);
    } else {
      for(var i = fns.length - 1; i >= 0; i--){
        var _fn = fns[i];
        if(_fn === fn) {
          fns.splice(i,1);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})();
// 测试代码如下：
Event5.listen("color",function(size) {
  console.log("尺码为:"+size); // 打印出尺码为42
});
Event5.trigger("color",42);
