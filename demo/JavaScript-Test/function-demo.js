// Javascript中的函数Function -----------------
// [1]三种函数定义的方式
// [1.1]函数声明:使用function关键字,后跟一组参数以及函数体
// [注意]函数的形参之间用逗号分割,因为是声明多个变量,不是多个语句,所以用逗号分隔,而不是分号
function sum11(num1, num2) {　　
	return num1 + num2;
}

// [1.2]函数表达式
var sum12 = function(num1, num2) {　　
	return num1 + num2
}

// [1.3]Function构造函数
var sum13 = new Function('num1', 'num2', 'return num1 + num2');
// [不推荐]会导致解析两次代码,第一次解析常规ECMAScript代码,第二次解析传入构造函数中的字符串,影响性能
// [tips]函数声明与函数表达式的区别:
//   [a1]解析器会率先读取函数声明,并使其在执行任何代码之前可用
//   [a2]至于函数表达式,则必须等到解析器执行到它所在的代码行,才会真正被解释执行
//   [b]如果将函数表达式放在对函数的引用语句之后,会弹出"unexpected identifier"意外标识符错误
//   [c]除了什么时候可以通过变量访问函数这一点区别之外,函数声明与函数表达式的语法其实是等价的

// [2]函数参数
// [2.1]函数参数在内部是用一个数组来表示的,在函数内部可以通过arguments对象来访问这个参数数组
// [2.2]形参只提供便利，但不是必须的
// [2.3]开发人员可以利用argument.length属性让函数能够接收任意个参数分别实现适当的功能
// [2.4]没有传递值的形参默认为undefined
// [2.5]函数参数也被当作变量来对待，因此其访问规则与执行环境中的其他变量相同
// [2.6]arguments对象可以和形参一起使用,它的值与对应形参的值保持一致。
//      但形参数组和arguments对象并不指向同一内存空间,它们的内存空间是独立的,但值会同步。
function doAdd26(num1, num2) {　　
	console.log('arguments[1] = 10 赋值前：', arguments.length, arguments);　　
	arguments[1] = 5555;　　
	// [注意1]若未传入num2，num2 == undefined,并不会被赋值为10,而arguments[1] == 10
	// [注意2]若传入num2,则 num2 == arguments[1] == 10,二者都等于10
	// [注意3]在严格模式下，不允许为arguments赋值，但允许为arguments[n]赋值
	console.log(arguments[0] + num2);
	// [注意4]若未传入num2当赋值arguments[1]时会改变arguments对象占用内存空间大小，
	//       但arguments.length以内的值不受影响
	console.log('arguments[1] = 10 赋值后：', arguments.length, arguments);　　
}
doAdd26(1, 2); // 11
doAdd26(1); // NaN 因为 1 + Number(undefined) == 1 + NaN == NaN
// [2.7]所有参数传递的都是值，不可能通过引用传递参数
function setName(obj) {　　
	obj.name = 'Nicholas';　　
	obj = new Object();　　
	obj.name = 'greg';
	console.log(obj.name);
}
var person = new Object();
setName(person);
console.log(person.name); // 'Nicholas'
// [tips]严格模式的限制
//   [a]不能把函数命名为eval或arguments
//   [b]不能把函数参数命名为eval或arguments
//   [c]不能出现两个命名参数同名的情况

// [3]函数返回值:通过return语句后跟要返回的值来实现返回值，未指定返回值的函数则默认返回undefined
//   [注意]位于return语句之后的任何代码都永远不会执行

// [4]函数重载:ECMAScript函数没有重载，不存在函数签名的特性，
//    因为其函数参数是以一个包含零或多个值的数组的形式传递的。
//  [注意]通过检查传入函数中参数的类型和数量并作出不同的反应，可以模仿方法的重载。

// [5]函数的属性
// [5.1]this:引用的是函数据以执行的环境对象，当在网页全局作用域中调用函数时，this对象引用的是window
//   [注意]在严格模式下,未指定环境对象而调用函数,则this值不会转型为window,
//        除非明确把函数添加到某个对象或者调用apply()或call(),否则this值将是undefined
// [5.2]arguments:一个类数组对象，包含着传入函数中的所有参数
// [5.2.1]arguments下有一个名为callee的属性,该属性是一个指针,指向拥有这个arguments对象的函数
//   [注意]当函数在严格模式下运行时，访问arguments.callee会导致错误
//   [tips]阶乘函数
function factorial1(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * factorial1(num - 1);
	}
}
console.log(factorial1(10));
//   若使用arguments.callee可以消除函数解耦
function factorial2(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * arguments.callee(num - 1);
	}
}
console.log(factorial1(20));
// [5.3]length:表示函数希望接收的命名参数的个数
// [5.4]prototype:在ECMAScript5中，prototype属性是不可枚举的，因此使用for-in无法发现
// [5.5]caller(ECMAScript5):除了Opera的早期版本不支持,其他浏览器都支持ECMAScript3并没有定义的属性。
//      这个属性保存着调用当前函数的函数的引用。如果是在全局作用域中调用当前函数，它的值为null
//   [注意1]ECMAScript5还定义了arguments.caller属性,
//         在严格模式下访问它也会导致错误,而在非严格模式下这个属性始终是undefined,
//         定义这个属性是为了分清arguments.caller和函数的caller属性
//   [注意2]严格模式还有一个限制:不能为函数的caller属性赋值,否则会导致错误
// window.color = 'red';
this.color = 'red';
var o = {
	color: 'blue'
};

function sayColor() {
	console.log(this.color);
}
sayColor(); // 'red'
o.say = sayColor;
o.say(); // 'blue'
function outer() {
	inner();
}

function inner() {
	console.log(inner.caller);
}
outer(); //弹出function outer(){inner()};
//为了更松散的耦合，可以改为这样：
function outer() {
	inner();
}

function inner() {
	console.log(arguments.callee.caller);
}
outer();

// [6]函数的方法:apply和call这两个方法都是用于在特定的作用域中调用函数,实际上等于设置函数体内this对象的值。
//    最大的好处是对象不需要与方法有任何耦合关系,这两个方法的强大地方在于能够扩充函数的作用域。
// [6.1]apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。
//      第二个参数可以是Array()的实例，也可以是arguments对象。
// [6.2]call()方法与apply()方法相同,区别仅仅在于接受参数的方式不同,在使用call()方法时,
//      传递给函数的参数必须逐个列举出来,而apply方法接收arguments对象或一个数组
// [6.3]bind()(ECMAScript5):创建一个函数的实例，其this值会被绑定到传给bind()函数的值
function sum(num1, num2) {
	return num1 + num2;
}

function callSum1(num1, num2) {
	return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
	return sum.apply(this, [num1, num2]);
}

function callSum00(num1, num2) {
	return sum.call(this, num1, num2);
}

function callSum01(num1, num2) {
	return sum.bind(this, num1, num2)();
}
console.log(callSum00(10, 10)); // 20
console.log(callSum01(10, 10)); // 20
console.log(callSum1(10, 10)); // 20
console.log(callSum2(10, 10)); // 20

var color = 'red';
var o = {
	color: 'blue'
};

function sayColor() {
	console.log(this.color);
}
sayColor(); //red
sayColor.call(this); //red
sayColor.apply(this); //red
sayColor.bind(this)(); //red
// sayColor.call(window); //red
// sayColor.apply(window); //red
// sayColor.bind(window)(); //red
sayColor.call(o); //blue
sayColor.apply(o); //blue
sayColor.bind(o)(); //blue

// [7]继承的方法:始终返回函数代码
//    (因浏览器而异,有的返回的代码与源代码中的函数代码一样。有的删除了注释并对某些代码做了改动)
// 　　[a]toLocaleString()
// 　　[b]toString()
// 　　[c]valueOf()

// [8]函数的应用
// [8.1]函数成为参数
function callSomeFunction(someFunction, someArgument) {　　
	return someFunction(someArgument);
}
// [8.2]从一个函数返回另一个函数
// 　　[tips]根据属性名创建比较函数
function createComparisonFunction(propertyName) {
	return function(object1, object2) {
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if (value1 < value2) {
			return -1;
		} else if (value1 > value2) {
			return 1;
		} else {
			return 0;
		}
	};
}

// [8.3]为函数形参添加默认值
function G(id) {
	var id = id || 'div1'; //为函数形参添加默认值来替代undefined
	document.getElementById('id').innerHTML = '内容1'
}


// javascript和其他编程语言相比比较随意,所以javascript代码中充满各种奇葩的写法,有时雾里看花;
// 当然,能理解各型各色的写法也是对javascript语言特性更进一步的深入理解。
// ( function(){…} )()  和  ( function (){…} () )  是两种javascript立即执行函数的常见写法;
// 最初我以为是一个括号包裹匿名函数,再在后面加个括号调用函数,最后达到函数定义后立即执行的目的;
// 后来发现加括号的原因并非如此。要理解立即执行函数,需要先理解一些函数的基本概念。

// 函数声明、函数表达式、匿名函数
// * 函数声明：function fnName () {…};
//   使用function关键字声明一个函数,再指定一个函数名,叫函数声明。
// * 函数表达式 var fnName = function () {…};
//   使用function关键字声明一个函数,但未给函数命名,
//   最后将匿名函数赋予一个变量,叫函数表达式,这是最常见的函数表达式语法形式。
// * 匿名函数：function () {};
//   使用function关键字声明一个函数,但未给函数命名,所以叫匿名函数,匿名函数 属于函数表达式,
//   匿名函数有很多作用,赋予一个变量则创建函数,赋予一个事件则成为事件处理程序或创建闭包等等。

// 函数声明和函数表达式不同之处:
// * Javascript引擎在解析javascript代码时会
//   "函数声明提升"(Function declaration Hoisting)当前执行环境(作用域)上的函数声明,
//   而函数表达式必须等到Javascirtp引擎执行到它所在行时, 才会从上而下一行一行地解析函数表达式;
// * 函数表达式后面可以加括号立即调用该函数,函数声明不可以,只能以fnName()形式调用 。

// 正常,因为"提升"了函数声明,函数调用可在函数声明之前
fnName1();

function fnName1() {
	console.log("fnName1")
}

// fnName2(); // **"Red"**报错,变量fnName还未保存对函数的引用,函数调用必须在函数表达式之后
var fnName2 = function() {
	console.log("fnName2")
}

// 函数表达式后面加括号,当javascript引擎解析到此处时能立即调用函数
var fnName3 = function() {
	console.log("fnName3")
}();

// **"Red"**报错,但是javascript引擎只解析函数声明,忽略后面的括号,函数声明不会被调用
// function fnName4(){
//   console.log("fnName4")
// }();

// **"Red"**语法错误,虽然匿名函数属于函数表达式,但是未进行赋值操作,
// 所以javascript引擎将开头的function关键字当做函数声明,报错：要求需要一个函数名
// function(){
//   console.log("fnName5")
// }();

// ****要在函数体后面加括号就能立即调用,则这个函数 必须是函数表达式,不能是函数声明。
(function(a) {
	console.log(a); // 输出123,使用()运算符
})(123);

(function(a) {
	console.log(a); // 输出1234,使用()运算符
}(1234));

! function(a) {
	console.log(a); // 输出12345,使用！运算符
}(12345);

+ function(a) {
	console.log(a); // 输出123456,使用+运算符
}(123456);

- function(a) {
	console.log(a); // 输出1234567,使用-运算符
}(1234567);

var fn = function(a) {
	console.log(a); // 输出12345678,使用=运算符
}(12345678)

// 可以看到输出结果,在function前面加！、+、 -甚至是逗号等到都可以起到函数定义后立即执行的效果,
// 而()、！、+、-、=等运算符, 都将 函数声明转换成函数表达式, 消除了javascript引擎识别函数表达式和函数声明的歧义,
// 告诉javascript引擎这是一个函数表达式,不是函数声明,可以在后面加括号,并立即执行函数的代码。
// 加括号是最安全的做法,因为！、+、-等运算符还会和函数的返回值进行运算,有时造成不必要的麻烦。

// 根据javascript函数作用域链的特性,可以使用这种技术可以模仿一个私有作用域,
// 用匿名函数作为一个"容器","容器"内部可以访问外部的变量,而外部环境不能访问"容器"内部的变量,
// 所以( function(){…} )()内部定义的变量不会和外部的变量发生冲突,俗称"匿名包裹器"或"命名空间"。

// 函数的return ---------------
// return顾名思义就是返回，函数在执行完return后就会立即停止并返回，就是说，return后面的语句是永远也不会执行的。如下：
function functionReturn() {
	return 'This the last state can be run.';
	console.log('Something after return can not show in console.');
}
console.log(functionReturn());

// 注：这里可能会有歧义产生。这里说的return之后是紧接着return之后，像这样是不包括的：
var a = [1, 2, 3];

function fn1() {
	(function() {
		for (var i in a) {
			return (i);
		}
	})();
	console.log('Hello world can show in console.');
}
fn1();
// 这里有return，后面的打印依然可以正常输出，这个应该不难理解。
// 评论里网友韩子迟有提出这个歧义，特此更正，同时也感谢韩子迟的提出。

// 函数参数 -------------------------------------
// 关于函数参数我总结了8点，我们分开来说。
// *1. 函数对传递进来的参数个数没有限制，对传递进来的参数的数据类型也没有限制。
//     即，如果形参有2个，但是传递进来的实参可以是1个，也可以是3个，而且参数类型也无所谓。
// *2. 每个函数在被调用的时候，其活动对象会获得两个特殊的变量，其中之一就是arguments对象，在arguments对象中保存着传递给函数的参数，
//     在函数体内可以通过arguments对象来访问这个参数数组，从而可以获得每一个实参，
//     但是要注意的是，arguments对象只是与数组类似的一个对象，它并不是Array的实例。
function funcAdd1(num1, num2) {
	console.log(arguments);
	console.log(arguments[0], arguments[1], arguments[2]);
	return num1 + num2;
}
console.log(funcAdd1(100, 200));
// *3. 由上面的例子，还可以得出：没有传递值的命名参数将赋值为undefined。
// *4. 命名参数（叫形参应该好理解一些）不是必须的。
function funcAdd2() {
	console.log('传递给函数的两个参数是：' + arguments[0] + '和' + arguments[1]);
}
funcAdd2(1, 'para2');
// *5. 关于命名参数，其他编程语言比如C需要函数签名，即函数名、参数个数、参数类型、返回值等相关声明信息，之后调用函数时必须和函数签名一致，
//     但是ECMAScript中的函数没有函数签名。这一点在下面的函数的重载中会有介绍。同时，也正是因为没有ECMAScript没有函数签名，所以函数不能实现重载。
// *6. 函数的arguments对象有一个length属性，可以看成是数组的长度（arguments对象只是与数组类似的一个对象，它并不是Array的实例），
//     从而获取传递给函数的参数的个数
function funcAdd3() {
	console.log(arguments.length);
	console.log(arguments);
}
funcAdd3();
funcAdd3(1);
funcAdd3(1, 2);
// *7. 命名参数的值永远和arguments中的值（arguments中有值）保持同步，这是单向的，即arguments中的值会使命名参数的值同步。
function funcAdd4(num1, num2) {
	console.log(arguments);
	arguments[0] = 20;
	console.log(arguments);
	console.log(num1 + num2);
}
funcAdd4(10, 10);
// *8. ECMAScript中的所有参数传递都是按值传递，访问变量有按值访问和按引用访问两种方式。

// 没有重载 -----------------------
// 函数的重载是指函数名相同，但是形参列表（参数的个数、参数的数据类型）不相同。
// 在其他编程语言比如C++（之前写的是C，C没有重载，特此更正）中，重载是可以实现的，
// 但是在ECMAScript中，函数是没有重载的。先看一段代码：
function funcAdd(num1, num2) {
	console.log('This funcAdd can not be called: ');
	console.log(arguments);
	console.log(num1 + num2);
}

function funcAdd(num) {
	console.log('The last funcAdd can be called: ');
	console.log(arguments);
	console.log(num);
}
funcAdd(100, 200); // 100
funcAdd(100); // 100
// 在ECMAScript中，位于后面的同名函数会覆盖前面的函数，所以最终调用的函数是funcAdd(num)，
// 在执行console.log(funcAdd(100,100));时，因为调用的函数形参只有一个，
// 传入arguments的是两个参数100和200,即arguments[0]的等于100,arguments[1]的等于200,
// 但是函数调用时只传递arguments[0]，

// 虽然没有重载，但是我们可以来模拟重载机制，即可以来检测数据长度和数据类型，从而执行不同的代码来模拟重载的实现。
// 我们简单写一段代码：
function funOverride() {
	if (arguments.length == 1) {
		console.log('Hi, ' + arguments[0] + '.');
	} else {
		console.log('Please input one para.');
	}
}
funOverride();
funOverride('Jim');

// 迭代方法
// 对于数组而言，原生ECMAScript5有5个迭代方法，分别是：
//   •every()
//   •some()
//   •filter()
//   •map()
//   •forEach()
// 这5个方法接收两个参数：
//   •运行在数组每一项上的函数
//   •运行这个函数的作用域（可选的）
// 同时，作为方法参数的函数接收三个参数：
//   •数组每项值
//   •索引
//   •数组对象
// 各个方法都是对数组中的每一项运行传递进去的函数，其具体作用如下：
//   •every():数组中的每一项都运行传递进去的函数，顾名思义，如果每一项都返回true，则该方法返回true。
//   •some()：数组中的每一项都运行传递进去的函数，顾名思义，如果有若干项返回true，则该方法返回true。
//   •filter()：数组中的每一项都运行传递进去的函数，顾名思义是过滤的意思，该方法返回一个数组，这个返回的数组里面的项是由该函数返回true的项组成。
//   •map()：数组中的每一项都运行传递进去的函数，map，映射，就是返回一个每次函数调用的结果组成的数组。
//   •forEach()：数组中的每一项都运行传递进去的函数，这个方法没有返回值。
// 以上5个方法中，有一个比较特殊，那就是forEach()方法，该方法是没有返回值的，它不像其他方法一样返回数组什么的，它只是执行传递进去的函数。
// 就相当于用for循环来迭代数组一样。

// 例子就给出简单的一个：
var values = [4, 3, 2, 1];
var valueEvery = values.every(function(item, index, array) {
	return item >= 2;
});
console.log(valueEvery);
