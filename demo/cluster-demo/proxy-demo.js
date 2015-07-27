// 使用cluster模块，你就可以更高效的使用硬件。然而，你还是被限制在单一的机器上。
// 如果你的应用有客观的访问量，你最终还是把负载分部在不同的机器上。
// 使用reverse proxy server可以把并发的访问负载到不同的服务器上。
var proxyServer = require('http-proxy');
var port = 3000;
var servers = [
  {
    host: "localhost",
    port: 8081
  },
  {
    host: "localhost",
    port: 8080
  }
];

proxyServer.createServer(function (req, res, proxy) {
  var target = servers.shift();

  proxy.proxyRequest(req, res, target);
  servers.push(target);
}).listen(port);
