// 闭包函数可以访问外层函数中的变量。
var f1 = (function() {
		var n = 10;
		return function() {
					++n;
					console.log(n);
		}
})();
f1();

// 一个函数内有多个闭包函数，那么这些闭包函数共享外层函数中的变量。
// 可以看出，例子中3个闭包函数中的n是同一个变量，而不是该变量的3个副本。
var arr = [];
(function() {
	var n = 0;
	for (var i=0; i<3; ++i) {
		arr[i] = function() {
			++n;
			console.log(n);
		}
	}
})();
for (var i=0; i<3; ++i) {
	var f2 = arr[i];
	f2();
}

// 闭包函数的作用域不是在引用或运行它的时候确定的，看起来好像是在定义它的时候确定的。
// var f0 = function() {
// 	++n;
// 	console.log(n);
// }
//
// var f3 = (function() {
// 	var n = 10;
// 	return f0;
// })();
//
// f3();

// 由该程序可以得出的结论是：闭包函数的作用域是在编译它的时候确定的。
// var f4 = (function() {
// 	var n = 10;
// 	return new Function('++n;console.log(n);');
// })();
//
// f4();

// 使用Function构造器可以创建一个function对象，函数体使用一个字符串指定，
// 它可以像普通函数一样执行，并在首次执行时编译。
// 因此，虽然在匿名函数内部定义了此function对象，但一直要到调用它的时候才会编译，
// 即执行到“f()”时，而此时原函数的作用域已经不存在了。
var f5 = (function() {
	var n = 10;
	return eval('(function(){++n;console.log(n);})');
})();
f5();

// 外层函数中那些未在闭包函数中使用的变量，对闭包函数是不可见的。
// 在这个例子中，闭包函数没有引用过变量s，因此其作用域中只有n。
// 也就是说，对闭包函数来说，其可以访问的外层函数的变量实际上只是真正的外层函数变量的一个子集。
var f6 = (function() {
	var n = 10;
	var s = 'hello';
	return function() {
		++n;
		console.log(n);
	}
})();
f6();

// 函数中的局部变量如果没有被任何闭包函数所引用（这里不考虑被全局变量所引用的情况），
// 则这些局部变量在函数运行完成后就可以被回收，
// 否则，这些变量会作为其闭包函数的作用域的一部分被保留，直到所有闭包函数也执行完毕为止。
// 外层函数执行结束后是会被回收掉的。因为既然函数内部变量已被回收，那函数本身也没有存在的意义了。
var funArr = [];
var LENGTH = 500;
var ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function getStr() {
	var s = '';
	for (var i=0; i<LENGTH; ++i) {
		s += ALPHABET[Math.floor(Math.random() * 62)];
	}
	return s;
}
function getArr() {
	var a = new Array(LENGTH);
	for (var i=0; i<LENGTH; ++i) {
		a[i] = Math.random();
	}
}
var f7 = function() {
	var n = 10;
	var s = getStr();
	var a = getArr();
	funArr.push(function() {
		console.log(n, s, a);  // --- 1
		console.log(n);        //  --- 2
	})
}
for (var i=0; i<2000; ++i) {
	f7();
}
