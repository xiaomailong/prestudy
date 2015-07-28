
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
