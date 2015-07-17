var express = require('express');
var app = express();

app.get("/user/:name/", function(req, res) {
  // 和属性query一样，通过req.param我们也可以获取被解析过的请求参数对象的值。
  // 和param相似，但params是一个可以解析包含着有复杂命名路由规则的请求对象的属性。
  // /user/mike
  console.log(req.param("name"));  // mike
  console.log(req.params.name);    // mike
　res.send("使用req.param属性获取具有路由规则的参数对象值!");
});

app.get("/user/:name/:id", function(req, res) {
  // /user/mike/123
　console.log(req.params.id); //"123"
　res.send("使用req.params属性复杂路由规则的参数对象值!");
});

app.get("*", function(req, res) {　　
  console.log(req.path);
  console.log(req.host);
  // query是一个可获取客户端get请求路径参数的对象属性，包含着被解析过的请求参数对象，默认为{}。
  // /search?n=Lenka
  console.log(req.query.n);           // Lenka
  console.log(req.param("n"));        // Lenka
  // /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
  console.log(req.query.order);       // "desc"
  console.log(req.query.shoe.color);  // "blue"
  console.log(req.query.shoe.type);   // "converse"
　res.send("req.host获取主机名，req.path获取请求路径名, req.query.参数名!");
});


app.listen(3000);
