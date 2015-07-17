var express = require('express')
var app = express()

app.get('/', function(request, response) {
　　response.send('Welcome to the homepage!');
});
app.get('/about', function(request, response) {
　　response.send('Welcome to the about page!');
});
app.get("*", function(request, response) {
　　response.send("404 error!");
});

app.listen(3000)
