var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');


// app.use(express.static(require('path').join(__dirname, 'public')));

app.set('views', __dirname);

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

var session = require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*10 //过期时间设置(单位毫秒)
    }
}));

app.use(function(req, res, next){
　　res.locals.user = req.session.user;
　　var err = req.session.error;
　　res.locals.message = '';
　　if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
　　next();
});

app.get('/', function(req, res) {
　　res.render('index');
});

app.get('/login',function(req,res){
　　res.render('login');
});
app.post('/login',function(req,res){
　　var user={
　　　　username:'admin',
　　　　password:'admin'
　　}
　　if(req.body.username==user.username&&req.body.password==user.password){
　　　　req.session.user = user;
　　　　res.send(200);
　　}else{
　　　　req.session.error = "用户名或密码不正确";
　　　　res.send(404);
　　}
});

// app.get('/home',function(req,res){
// 　　res.render('home');
// });
app.get('/home',function(req,res){
　　if(req.session.user){
　　　　res.render('home');
　　}else{
　　　　req.session.error = "请先登录"
　　　　res.redirect('login');
　　}
});

app.get('/logout', function(req, res){
　　req.session.user = null;
　　req.session.error = null;
　　res.redirect('index');
});
app.get('/index', function(req, res) {
　　res.render('index');
});

app.listen(3000);
