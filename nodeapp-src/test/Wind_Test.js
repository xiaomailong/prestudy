var Wind = require("wind");

function drinkWater(callback) {
	console.log("drink water...");
	callback(null, "Cola");
}
function eatFood(callback) {
	console.log("eat food...");
	callback(null,"Hamburger");
	// callback(1, "not enough money");
}
function openMac(callback) {
	console.log("open mac...");
	callback(null, "Chrome");
}

function callbackFunc(error,result) {
	if(error) {
		console.log("error: ", error, "msg: ", result);
	}
	else {
		console.log("Mac ", result, " is open, all action done");
	}
}

var windFunc = eval(Wind.compile("async",
function () {
	console.log("Wind function Run");
	$await(drinkWater(callbackFunc));

	console.log("drink water finish, I will eat food");
	$await(eatFood(callbackFunc));

	console.log("eat food finish, I will open mac");
	$await(openMac(callbackFunc));
}
));

// windFunc().start();

exports.Wind_Test = function(test) {
	// 异步：即async构造器，用于简化异步开发，基于Wind.js自带的异步任务模型。
	// 迭代：即seq构造器，用于生成一个延迟计算的迭代器。
	// Promise：即promise构造器，用于支持基于Promise/A模型的异步开发。
	windFunc().start();

	test.done();
}
