
// cluster模块可以让你很容易的创建多个分享端口的进程。
// 每一个进程使用一个系统核心，也就是代码中的numCPUs变量中cpu核心的一个。
// 每一个子进程都实现了HTTP server，并监听指定的端口。
var cluster = require("cluster");
var http = require("http");
var numCPUs = require("os").cpus().length;
var port = 3000;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", function(worker, code, signal) {
    cluster.fork();
  });
} else {
  // console.log(numCPUs);
  // console.log(port);
  http.createServer(function(request, response) {
    console.log("Request for:  " + request.url);
    response.writeHead(200);
    response.end("hello world\n");
  }).listen(port);
}
