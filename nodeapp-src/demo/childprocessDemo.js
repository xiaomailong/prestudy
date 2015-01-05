var spawn = require('child_process').spawn;
ls = spawn('ls', ['-a']);

// 捕获标准输出并将其打印到控制台
ls.stdout.on('data', function (data) {
	console.log('standard output:\n' + data);
});

// 捕获标准错误输出并将其打印到控制台
ls.stderr.on('data', function (data) {
	console.log('standard error output:\n' + data);
});

// 注册子进程关闭事件
ls.on('exit', function (code, signal) {
	console.log('child process exit , exit:' + code);
});

grep  = spawn('grep', ['ssh']);
console.log('Spawned child pid: ' + grep.pid);
grep.stdin.end();


var exec = require('child_process').exec;
var cmdStr = 'curl http://www.weather.com.cn/data/sk/101180401.html';
exec(cmdStr, function(err, stdout, stderr){
	if (err) {
		console.log('get weather api error:'+stderr);
	} else {
		var data = JSON.parse(stdout);
		console.log(data);
	}
});

var callfile = require('child_process');
var ip = '1.1.1.1';
var username = 'test';
var password = 'pwd';
var newpassword = 'newpwd';

callfile.execFile('sudo sh ./demo/change_password.sh',
['-H', ip, '-U', username, '-P', password, '-N', newpassword],
null,
function(err, stdout, stderr) {
	if (err) {
		console.log(stdout);
		console.log('exec change_password.sh error:' + stderr);
	} else {
		// var data = JSON.parse(stdout);
		console.log(stdout);
	}
});

// var exec = require('child_process').exec;
var arg1 = 'hello'
var arg2 = 'waterbolik'
exec('python ./demo/py_test.py ' + arg1 + ' ' + arg2 + ' ', function(error,stdout,stderr){
	if(stdout.length >1){
		console.log('you offer args:',stdout);
	} else {
		console.log('you don\'t offer args');
	}
	if(error) {
		console.info('stderr : '+stderr);
	}
});
