
// hasOwnProperty和in ------------------------
// hasOwnProperty方法是用来检查对象的非原型链属性，
// 换句话说，也就是检查对象中用户自定义的属性，而且这些属性不是定义在prototype上的。
// JavaScript语言中还有一个in操作符，用来检查一个对象的属性，包括来自原型链的属性。
var myFunc = function() {
  this.foo = 'value';
};
myFunc.prototype.ok = 'ok';
thefunc = new myFunc();
console.log(
  thefunc.hasOwnProperty('foo'),           // true
  thefunc.hasOwnProperty('ok'),            // false
  myFunc.hasOwnProperty('foo'),            // false
  myFunc.prototype.hasOwnProperty('ok'),   // true这里有点特殊
  'ok' in thefunc,                         // true
  'foo' in thefunc,                        // true
  'ok' in myFunc.prototype,                // true
  'ok' in myFunc                           // false
);

// constructor -----------------------
// 每一个JavaScript函数（ECMAScript 5中的Function.bind()返回的函数除外）都自动拥有一个prototype属性。
// 这个属性的值是一个对象，这个对象包含唯一一个不可枚举的属性constructor。
// 构造函数实例都拥有指向其构造函数的constructor属性。constructor属性的值是一个函数对象：
var F = function(){};   // 这是一个函数对象
var P = F.prototype;    // 这是F相关联的原型对象
var C = P.constructor;  // 这是与原型相关联的函数
console.log(C === F);   // true,对于任意函数F.prototype.constructor === F

var myFunc = function() {
  this.foo = 'value';
};
myFunc.prototype.ok = 'ok';
thefunc = new myFunc();
console.log(
    thefunc.constructor === myFunc,      // true
    myFunc.constructor === Function,     // true
    typeof thefunc,                      // object
    typeof myFunc,                       // function
    myFunc.prototype                     // {ok='ok'}
);

// instanceof和isPrototypeOf -------------------------
// instanceof是JavaScript语言中的一种运算符。左操作数是待检测其类的对象，右操作数是定义类的构造函数。
// isPrototypeOf是用来判断要检查其原型链的对象是否存在于指定对象实例中，是则返回true，否则返回false。
var myFunc = function(){
    this.foo = 'value';
};
myFunc.prototype.ok = 'ok';
thefunc = new myFunc();
console.log(
  thefunc instanceof myFunc,                  // true
  myFunc instanceof Function,                 // true
  myFunc.prototype.isPrototypeOf(thefunc),    // true
  Function.prototype.isPrototypeOf(myFunc),   // true
  myFunc.prototype,                           // {ok='ok'}
  typeof thefunc,                             // object
  thefunc.prototype                           // undefined,这里没搞懂
);

// typeof ------------------------------------
// typeof是一元运算符，放在操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。
var myNumber = new Number('23');
var myNumberL = 23;                        // literal shorthand
var myString = new String('male');
var myStringL = 'male';                    // literal shorthand
var myBoolean = new Boolean('true');
var myBooleanL = true;                     // literal shorthand
var myObject = new Object();
var myObjectL = {};                        // literal shorthand
var myArray = new Array();
var myArrayL = [];                         // literal shorthand
var myFunction = new Function();
var myFunctionL = function() {};           // literal shorthand
var myDate = new Date();
var myRegExp = new RegExp('/./');
var myRegExpL = /./;                       // literal shorthand
var myError = new Error();

console.log( // all of these return true
  myNumber.constructor === Number,
  myNumberL.constructor === Number,
  myString.constructor === String,
  myStringL.constructor === String,
  myBoolean.constructor === Boolean,
  myBooleanL.constructor === Boolean,
  myObject.constructor === Object,
  myObjectL.constructor === Object,
  myArray.constructor === Array,
  myArrayL.constructor === Array,
  myFunction.constructor === Function,
  myFunctionL.constructor === Function,
  myDate.constructor === Date,
  myRegExp.constructor === RegExp,
  myRegExpL.constructor === RegExp,
  myError.constructor === Error
);
console.log( // others return true
  myNumber instanceof Number,
  myNumberL instanceof Number,    // false
  myString instanceof String,
  myStringL instanceof String,    // false
  myBoolean instanceof Boolean,
  myBooleanL instanceof Boolean,  // false
  myObject instanceof Object,
  myObjectL instanceof Object,
  myArray instanceof Array,
  myArrayL instanceof Array,
  myFunction instanceof Function,
  myFunctionL instanceof Function,
  myDate instanceof Date,
  myRegExp instanceof RegExp,
  myRegExpL instanceof RegExp,
  myError instanceof Error
);
console.log( //others return true
  Number.prototype.isPrototypeOf(myNumber),
  Number.prototype.isPrototypeOf(myNumberL),    // false
  String.prototype.isPrototypeOf(myString),
  String.prototype.isPrototypeOf(myStringL),    // false
  Boolean.prototype.isPrototypeOf(myBoolean),
  Boolean.prototype.isPrototypeOf(myBooleanL),  // false
  Object.prototype.isPrototypeOf(myObject),
  Object.prototype.isPrototypeOf(myObjectL),
  Array.prototype.isPrototypeOf(myArray),
  Array.prototype.isPrototypeOf(myArrayL),
  Function.prototype.isPrototypeOf(myFunction),
  Function.prototype.isPrototypeOf(myFunctionL),
  Date.prototype.isPrototypeOf(myDate),
  RegExp.prototype.isPrototypeOf(myRegExp),
  RegExp.prototype.isPrototypeOf(myRegExpL),
  Error.prototype.isPrototypeOf(myError)
);
console.log(
  typeof myNumber,       // object
  typeof myNumberL,      // number
  typeof myString,       // object
  typeof myStringL,      // string
  typeof myBoolean,      // object
  typeof myBooleanL,     // boolean
  typeof myObject,       // object
  typeof myObjectL,      // object
  typeof myArray,        // object
  typeof myArrayL,       // object
  typeof myFunction,     // function
  typeof myFunctionL,    // function
  typeof myDate,         // object
  typeof myRegExp,       // object
  typeof myRegExpL,      // object
  typeof myError         // object
);

// javascript 原型 和 原型链 -----------------------------------------
// JavaScript 不包含传统的类继承模型，而是使用 prototype 原型模型。代码实现大概是这样子的
function Student(name){
  this.name = name;
}
var Kimy = new Student("Kimy");
// new 做了三件事情
// 1、定义了一个空对象
// 2、设置其原型
// 3、初始化对象
// 这样就能理解为什么Kimy.__proto__指向的是Student.prototype了(同一个引用)，原来就是new在起着关键的作用！
{
  var Kimy1  = {};
  Kimy1.__proto__ = Student.prototype;
  Student.call(Kimy1, "Kimy1");
}
Student.prototype.say = function() {
  console.log(this.name + " say");
}
Kimy.say();  // Kimy say
Kimy1.say();  // Kimy1 say

// 构造函数、__proto__以及原型链
// 除了IE浏览器，其他浏览器都在Object对象的实例上，部署了一个非标准的__proto__属性（前后各两个下划线），
// 指向该对象的原型对象，即构造函数的prototype属性。
// 构造方法
function Foo(y) {
  this.y = y;
}
Foo.prototype.x = 10;
// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
  console.log(this.x, this.y, z);
  return this.x + this.y + z;
};
// 使用foo模式创建 "b" and "c"
var b = new Foo(20);
var c = new Foo(30);
// 调用继承的方法
console.log(b.calculate(30)); // 60
console.log(c.calculate(40)); // 80
console.log(
  b.__proto__ === Foo.prototype,                        // true
  c.__proto__ === Foo.prototype,                        // true
  b.constructor === Foo,                                // true
  c.constructor === Foo,                                // true
  Foo.prototype.constructor === Foo,                    // true
  b.calculate === b.__proto__.calculate,                // true
  b.__proto__.calculate === Foo.prototype.calculate,    // true
  Object instanceof Function,
  Function instanceof Object
);
// 每个对象都是含有一个__proto__属性，
// b的__proto__指向的构造b的构造方法Foo的prototype属性；
// 而Foo.prototype也是一个对象，本身也有一个__proto__指向构造其的构造方法Object的prototype。
// Object.prototype的__proto__被指向了 null, 这就形成了一个原型链了。
