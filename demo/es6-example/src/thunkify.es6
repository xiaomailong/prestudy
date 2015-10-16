require("babel/polyfill");
var thunkify = require('thunkify');

var fs = require('fs');

// Thunk 函数的含义和用法
// http://www.ruanyifeng.com/blog/2015/05/thunk.html

(function () {
  function f(a, b, callback) {
    var sum = a + b;
    callback(sum);
    callback(sum);
  }

  var ft = thunkify(f);
  ft(1, 2)(console.log); // 3
  // 由于 thunkify 只允许回调函数执行一次，所以只输出一行结果。
})();

(function () {
  var readFile = thunkify(fs.readFile);

  var gen = function* () {
    var r1 = yield readFile('file/file1.txt');
    console.log(r1.toString());
    var r2 = yield readFile('file/file2.txt');
    console.log(r2.toString());
  };
  // 上面代码中，yield 命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。

  // 这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。
  // 为了便于理解，我们先看如何手动执行上面这个 Generator 函数。
  // var g = gen();
  //
  // var r1 = g.next();
  // r1.value(function (err, data) {
  //   if (err) throw err;
  //   var r2 = g.next(data);
  //   r2.value(function (err, data) {
  //     if (err) throw err;
  //     g.next(data);
  //   });
  // });
  // 上面代码中，变量 g 是 Generator 函数的内部指针，表示目前执行到哪一步。
  // next 方法负责将指针移动到下一步，并返回该步的信息（value 属性和 done 属性）。

  // 仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入 next 方法的 value 属性。
  // 这使得我们可以用递归来自动完成这个过程。


  // Thunk 函数真正的威力，在于可以自动执行 Generator 函数。
  // 下面就是一个基于 Thunk 函数的 Generator 执行器。
  function run(fn) {
    var gen = fn();

    function next(err, data) {
      var result = gen.next(data);
      if (result.done) return;
      result.value(next);
    }
    next();
  }
  run(gen);
  // 上面代码的 run 函数，就是一个 Generator 函数的自动执行器。
  // 内部的 next 函数就是 Thunk 的回调函数。
  // next 函数先将指针移到 Generator 函数的下一步（gen.next 方法），
  // 然后判断 Generator 函数是否结束（result.done 属性），
  // 如果没结束，就将 next 函数再传入 Thunk 函数（result.value 属性），否则就直接退出。

  // 有了这个执行器，执行 Generator 函数方便多了。
  // 不管有多少个异步操作，直接传入 run 函数即可。
  // 当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在 yield 命令后面的必须是 Thunk 函数。
  // var gen2 = function* () {
  //   var f1 = yield readFile('fileA');
  //   var f2 = yield readFile('fileB');
  //   // ...
  //   var fn = yield readFile('fileN');
  // };
  // run(gen2);
  // 上面代码中，函数 gen 封装了 n 个异步的读取文件操作，只要执行 run 函数，这些操作就会自动完成。
  // 这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。


  // Thunk 函数并不是 Generator 函数自动执行的唯一方案。
  // 因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。
  // 回调函数可以做到这一点，Promise 对象也可以做到这一点。
  // 本系列的下一篇，将介绍基于 Promise 的自动执行器。
})();
