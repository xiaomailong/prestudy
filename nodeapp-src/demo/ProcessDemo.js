// var cp = require('child_process');
// var Wind = require("wind");

//var child = cp.fork(__dirname+'/forkChild.js');
// var child = cp.fork(__dirname+'/forkChild.js');
//
// child.on('message', function(m) {
//   process.stdout.write(m.result.toString());
// });
//
// (function fiboLoop () {
//   child.send({v:40});
//   process.nextTick(fiboLoop);
// })();


// (function spinForever () {
//   $await(Wind.Async.sleep(1));
//   process.stdout.write(".");
//   process.nextTick(spinForever);
// })();

// var spinForever = eval(Wind.compile("async", function () {
//   setImmediate();
//   $await(Wind.Async.sleep(1));
//   process.stdout.write(".");
//   process.nextTick(spinForever);
// }));
//
// spinForever().start();

function fibo (n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

var cluster= require('cluster');

if (cluster.isMaster) {
  cluster.fork();
} else {
  var n1 = 1;
  (function fiboLoop () {
    process.stdout.write(fibo(++n1).toString());
    process.nextTick(fiboLoop);
  })();
}

(function spinForever () {
  process.stdout.write(".");
  process.nextTick(spinForever);
})();
