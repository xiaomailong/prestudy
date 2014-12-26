var async = require('async');

// function drinkWater(callback) {
// 	callback(null,null);
// }
// function eatFood(callback) {
// 	callback(null,null);
// }
// // function openMac(callback) {
// // 	callback(null,null);
// // }
// function openMac(callback) {
// 	callback(1,"I can't find my mac");
// }

function drinkWater(callback) {
	callback(null,"Cola");
}
// function eatFood(callback) {
// 	callback(null,"Hamburger");
// }
function eatFood(callback) {
	callback(1,"not enough money");
}
function openMac(callback) {
	callback(null,"Chrome");
}


function normalFunc() {
	console.log("Normal function Run");
	drinkWater(function (error,data) {
		if(error) {
			console.log("error: ",error,"msg: ",data);
		} else {
			console.log("drink water finish, I will eat food");
			eatFood(function(error,data) {
				if(error) {
					console.log("error: ",error,"msg: ",data);
				} else {
					console.log("eat food finish, I will open mac");
					openMac(function(error,data) {
						if(error) {
							console.log("error: ",error,"msg: ",data);
						} else {
							//do something after open mac
							// console.log("Mac ",result," is open, all action done");
							console.log("Mac is open, all action done");
						}
					});
				}
			});
		}
	});
};

function seriesFunc() {
	async.series([
		function(callback) {
			sleep(100);
			console.log("Series function Run");
			drinkWater(function(error,data) {
				callback(error,data);
			});
		},
		function(callback) {
			sleep(100);
			console.log("drink water finish, I will eat food");
			eatFood(function(error,data) {
				callback(error,data);
			});
		},
		function(callback) {
			sleep(100);
			console.log("eat food finish, I will open mac");
			openMac(function(error,data) {
				callback(error,data);
			});
		}],
		function(error,result) {
			if(error) {
				console.log("error: ",error,"msg: ",result);
			} else {
				console.log("Mac ",result," is open, all action done");
				// console.log("Mac is open, all action done");
			}
		}
	);
}

function waterFunc() {
	async.waterfall([
		function(callback) {
			console.log("Water Fall Run");
			drinkWater(function(error,data) {
				callback(error,data);
			});
		},
		function(data,callback) {
			console.log("drink ",data," finish, I will eat food");
			eatFood(function(error,data) {
				callback(error,data);
			});
		},
		function(data,callback) {
			console.log("eat ",data," finish, I will open mac");
			openMac(function(error,data) {
				callback(error,data);
			});
		}],
		function(error,result) {
			if(error) {
				console.log("error: ",error,"msg: ",result);
			}
			else {
				console.log("Mac ",result," is open, all action done");
			}
		}
	);
}

exports.Async_Test = function(test) {
	// 使用 async node.js 可以将复杂的逻辑表现的更直观。
	// 但如果逻辑只有一次回调，就不建议使用async了，这会无意义的增加一些运行的成本。
	normalFunc();

	waterFunc();

	seriesFunc();



	test.done();
}
