// 深入掌握 ECMAScript 6 异步编程

var fs = require('fs');

// JavaScript 语言对异步编程的实现，就是回调函数。
// 所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。
// 它的英语名字 callback，直译过来就是”重新调用”。
fs.readFile('/etc/passwd', function (err, data) {
  if (err) throw err;
  console.log(data);
});
// readFile 函数的第二个参数，就是回调函数，也就是任务的第二段。
// 等到操作系统返回了 /etc/passwd 这个文件以后，回调函数才会执行。
// 一个有趣的问题是，为什么 Node.js 约定，回调函数的第一个参数，必须是错误对象err（如果没有错误，该参数就是 null）？
// 原因是执行分成两段，在这两段之间抛出的错误，程序无法捕捉，只能当作参数，传入第二段。

// 回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件，代码如下。
fs.readFile(fileA, function (err, data) {
  fs.readFile(fileB, function (err, data) {
    // ...
  });
});
// 不难想象，如果依次读取多个文件，就会出现多重嵌套。代码不是纵向发展，而是横向发展，很快就会乱成一团，无法管理。
// 这种情况就称为“回调函数噩梦”（callback hell）。

// Promise就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的横向加载，改成纵向加载。
// 采用Promise，连续读取多个文件，写法如下。
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function(data){
  console.log(data.toString());
})
.then(function(){
  return readFile(fileB);
})
.then(function(data){
  console.log(data.toString());
})
.catch(function(err) {
  console.log(err);
});
// 我使用了 fs-readfile-promise 模块，它的作用就是返回一个 Promise 版本的 readFile 函数。
// Promise 提供 then 方法加载回调函数，catch方法捕捉执行过程中抛出的错误。
// Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。
// Promise 的最大问题是代码冗余，原来的任务被Promise 包装了一下，不管什么操作，一眼看去都是一堆 then，原来的语义变得很不清楚。
// 那么，有没有更好的写法呢？
