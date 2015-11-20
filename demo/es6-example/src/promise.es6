require("babel/polyfill");

// Promise在JavaScript语言早有实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。

// 所谓Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的API，可供进一步处理。

// Promise对象有以下两个特点。
// （1）对象的状态不受外界影响。
// Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。
// 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
// 这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

// （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
// Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。
// 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。
// 就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
// 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

// Promise也有一些缺点。
// 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
// 第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

// ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (true/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
promise.then(function(value) {
  // success
}, function(value) {
  // failure
});
// then方法可以接受两个回调函数作为参数。
// 第一个回调函数是Promise对象的状态变为Resolved时调用，
// 第二个回调函数是Promise对象的状态变为Reject时调用。
// 其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

// 下面是一个Promise对象的简单例子。
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'timeout done !');
  });
}

timeout(100).then((value) => {
  console.log(value);
});

// 下面是异步加载图片的例子。
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}

// 下面是一个用Promise对象实现的Ajax操作的例子。
var getJSON = function(url) {
  return new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if ( this.readyState !== 4 ) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

// 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。
// reject函数的参数通常是Error对象的实例，表示抛出的错误；
// resolve函数的参数除了正常的值以外，还可能是另一个Promise实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，
// 比如像下面这样。
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
});
p2.then(result => console.log(result));
p2.catch(error => console.log(error));
// 上面代码中，p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
// 注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。
// 如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；
// 如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数将会立刻执行。

// Promise.prototype.then()

// Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。
// 它的作用是为Promise实例添加状态改变时的回调函数。
// 前面说过，then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
// 因此可以采用链式写法，即then方法后面再调用另一个then方法。
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("Resolved: ", comments);
}, function funcB(err){
  console.log("Rejected: ", err);
});

getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
);

// Promise.prototype.catch()
// Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
getJSON("/posts.json").then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});

// 如果Promise状态已经变成resolved，再抛出错误是无效的。
var promise = new Promise(function(resolve, reject) {
  resolve("ok");
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok

// Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

// 一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。

// 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。
var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};
someAsyncThing().then(function() {
  console.log('everything is great');
});
// 上面代码中，someAsyncThing函数产生的Promise对象会报错，但是由于没有指定catch方法，这个错误不会被捕获，也不会传递到外层代码，导致运行后没有任何输出。

var promise = new Promise(function(resolve, reject) {
  resolve("ok");
  setTimeout(function() { throw new Error('test') }, 0)
});
promise.then(function(value) { console.log(value) });
// ok
// Uncaught Error: test
// 上面代码中，Promise指定在下一轮“事件循环”再抛出错误，结果由于没有指定使用try...catch语句，就冒泡到最外层，成了未捕获的错误。
// 因为此时，Promise的函数体已经运行结束了，所以这个错误是在Promise函数体外抛出的。

// Node.js有一个unhandledRejection事件，专门监听未捕获的reject错误。
process.on('unhandledRejection', function (err, p) {
  console.error(err.stack)
});
// 上面代码中，unhandledRejection事件的监听函数有两个参数，第一个是错误对象，第二个是报错的Promise实例，它可以用来了解发生错误的环境信息。

// 需要注意的是，catch方法返回的还是一个Promise对象，因此后面还可以接着调用then方法。
var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on

// Promise.all()
// Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
// （Promise.all方法的参数不一定是数组，但是必须具有iterator接口，且返回的每个成员都是Promise实例。）
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function(id){
  return getJSON("/post/" + id + ".json");
});
Promise.all(promises).then(function(posts) {
  // ...
}).catch(function(reason){
  // ...
});
// p的状态由p1、p2、p3决定，分成两种情况。
// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。


// Promise.race()
// Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。

// Promise.resolve()
// 有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。

// Promise.reject()
// Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。
// Promise.reject方法的参数reason，会被传递给实例的回调函数。
