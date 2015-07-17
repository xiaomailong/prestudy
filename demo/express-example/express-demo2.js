var express = require('express')
var app = express()

// 和get函数不同app.all()函数可以匹配所有的HTTP动词，也就是说它可以过滤所有路径的请求，
// 如果使用all函数定义中间件，那么就相当于所有请求都必须先通过此该中间件。
app.all("*", function(request, response, next) {
　response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" }); //设置响应头属性值
  next();
});

app.get('/', function(request, response) {
　response.end('Welcome to the homepage!');
});
app.get('/about', function(request, response) {
　response.end('Welcome to the about page!');
});
app.get("*", function(request, response) {
  response.end("404 error!");
});

app.listen(3000)
