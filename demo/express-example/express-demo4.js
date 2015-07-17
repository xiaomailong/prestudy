var express = require("express");
var app = express();

app.use(function(request, response, next) {
　　if(request.url == "/") {
　　　　response.send("Welcome to the homepage!");
　　}else {
　　　　next();
　　}
});

app.use(function(request, response, next) {
　　if(request.url == "/about") {
　　　　response.send("Welcome to the about page!");
　　}else {
　　　　next();
　　}
});

app.use(function(request, response) {
　　response.send("404 error!");
});

app.listen(3000);
