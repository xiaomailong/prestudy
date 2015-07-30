
// 要想理解JavaScript的定时器是如何工作的，先要明白 JavaScript 引擎是单线程的。
// 这个可以理解为 javascript 引擎是一个服务员，它有一个服务的队列，
// 所有的界面元素事件,定时触发器回调，异步请求回调都要在这个任务队列里排队，等待处理。
// 所有任务都是一个最小单位，不会中断处理。这样就可以理解 setTimeout(fun,0) 了，它并不是代表立即执行该代码，除非任务队列为空
// (事实上，各个浏览器在实际执行这个的时候也是有差异了，比较新的浏览器实际可能是在4ms；老版本的可能更长一点，16ms也是可能的)。
// 而 setTimeout(fun,time) 的意思就是多少时间后将 fun 回调加到这个任务队列中，也就是至少需要time时间才会执行fun。
setTimeout(function () {
  console.log('setTimeout 1');
}, 0);
var tem = 0;
for (var i = 1; i < 1000000; i++) {
  tem += i;
};
console.log('setTimeout 2');
// 在执行 setTimeout 时，将 function 回调加入了任务队列，但并没有立即执行，因为js引擎还在忙着处理当前的js，
// 而只在这段代码段执行完才去任务列表里取新的任务，所以结果就是先显示 2 后显示 1。

// setInterval(fun, time)方法是，每隔一定时间将fun添加到队列中，那么问题来，如果fun执行时间比 time 要长的时候怎么办？
var num = 0;
var time = setInterval(function () {
  var tem = 0;
  for (var i = 1; i < 99999999; i++) {
    tem += i;
  };
  num ++;
  console.log('setInterval ' + num);
}, 100);
setTimeout(function (){
  clearInterval(time);
  console.log('clearInterval');
}, 2000);
// 意思是每隔100ms执行一段代码，在2s中后清除这个定时器。但是结果呢？
// 事实上，并没有执行到那么多次数。也就是说某些间隔会被跳过，这也就存在多个代码执行的间隔可能会比预期的小。
// 原来在将定时器代码加入队列的时候，如果该定时器的代码实例存在时，该次定时器代码会被跳过。
