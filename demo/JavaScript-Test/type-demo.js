// JavaScript 中对变量类型的判断

var num = 123;
var str = 'abcdef';
var bool = true;
var arr = [1, 2, 3, 4];
var json = {
  name: 'wenzi',
  age: 25
};
var func = function() {
  console.log('this is function');
};
var und = undefined;
var nul = null;
var date = new Date();
var reg = /^[a-zA-Z]{5,20}$/;
var error = new Error();

// 1. 使用typeof检测
console.log(
  typeof num, // number
  typeof str, // string
  typeof bool, // boolean
  typeof arr, // object
  typeof json, // object
  typeof func, // function
  typeof und, // undefined
  typeof nul, // object
  typeof date, // object
  typeof reg, // object
  typeof error // object
);
// 从输出的结果来看，arr, json, nul, date, reg, error 全部被检测为object类型，其他的变量能够被正确检测出来。
// 当需要变量是否是number, string, boolean, function, undefined, json类型时，可以使用typeof进行判断。
// 其他变量是判断不出类型的，包括null。
// 还有，typeof是区分不出array和json类型的。因为使用typeof这个变量时，array和json类型输出的都是object。

// 2. 使用instance检测
// 在 JavaScript 中，判断一个变量的类型尝尝会用 typeof 运算符，
// 在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。
// ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。
// instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。
// 与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。例如：
function Person() {}
var Tom = new Person();
console.log(Tom instanceof Person); // true
function Student() {}
Student.prototype = new Person();
var John = new Student();
console.log(John instanceof Student); // true
console.log(John instanceof Person); // true
// instanceof还能检测出多层继承的关系。
console.log(
  num instanceof Number, // false
  str instanceof String, // false
  bool instanceof Boolean, // false
  arr instanceof Array, // true
  json instanceof Object, // true
  func instanceof Function, // true
  und instanceof Object, // false
  nul instanceof Object, // false
  date instanceof Date, // true
  reg instanceof RegExp, // true
  error instanceof Error // true
);
// 从上面的运行结果我们可以看到，num, str和bool没有检测出他的类型，但是我们使用下面的方式创建num，是可以检测出类型的：
var num1 = new Number(123);
var str1 = new String('abcdef');
var bool1 = new Boolean(true);
console.log(
  num1 instanceof Number, // true
  str1 instanceof String, // true
  bool1 instanceof Boolean // true
);
// 同时，我们也要看到，und和nul是检测的Object类型，才输出的true，
// 因为js中没有Undefined和Null的这种全局类型，他们und和nul都属于Object类型，因此输出了true。

// 3. 使用constructor检测
// 在使用instanceof检测变量类型时，我们是检测不到number, 'string', bool的类型的。因此，我们需要换一种方式来解决这个问题。
// constructor本来是原型对象上的属性，指向构造函数。
// 但是根据实例对象寻找属性的顺序，若实例对象上没有实例属性或方法时，就去原型链上寻找，因此，实例对象也是能使用constructor属性的。
console.log(
  Tom.constructor == Person, // true
  num.constructor == Number, // true
  str.constructor == String, // true
  bool.constructor == Boolean, // true
  arr.constructor == Array, // true
  json.constructor == Object, // true
  func.constructor == Function, // true
  date.constructor == Date, // true
  reg.constructor == RegExp, // true
  error.constructor == Error // true
);
// 从输出的结果我们可以看出，除了undefined和null，其他类型的变量均能使用constructor判断出类型。
// 不过使用constructor也不是保险的，因为constructor属性是可以被修改的，会导致检测出的结果不正确，例如：
console.log(John.constructor == Student); // false
console.log(John.constructor == Person); // true
// Student原型中的constructor被修改为指向到Person，导致检测不出实例对象John真实的构造函数。
// 同时，使用instaceof和construcor,被判断的array必须是在当前页面声明的！
// 比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，
// 这时判断该变量，Array == object.constructor;会返回false；
// 原因：
// 1、array属于引用型数据，在传递过程中，仅仅是引用地址的传递。
// 2、每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；
// 父页面来进行判断，使用的Array并不等于子页面的Array；切记，不然很难跟踪问题！

// 4. 使用Object.prototype.toString.call
console.log(
  Object.prototype.toString.call(num), // [object Number]
  Object.prototype.toString.call(str), // [object String]
  Object.prototype.toString.call(bool), // [object Boolean]
  Object.prototype.toString.call(arr), // [object Array]
  Object.prototype.toString.call(json), // [object Object]
  Object.prototype.toString.call(func), // [object Function]
  Object.prototype.toString.call(und), // [object Undefined]
  Object.prototype.toString.call(nul), // [object Null]
  Object.prototype.toString.call(date), // [object Date]
  Object.prototype.toString.call(reg), // [object RegExp]
  Object.prototype.toString.call(error) // [object Error]
);
// 从输出的结果来看，Object.prototype.toString.call(变量)输出的是一个字符串，
// 字符串里有一个数组，第一个参数是Object，第二个参数就是这个变量的类型，而且，
// 所有变量的类型都检测出来了，我们只需要取出第二个参数即可。
// 或者可以使用Object.prototype.toString.call(arr)=="object Array"来检测变量arr是不是数组。

// 5. jquery中$.type的实现
// 在jquery中提供了一个$.type的接口，来让我们检测变量的类型：
// var $ = require('jquery').$;
// console.log(
//   $.type(num),
//   $.type(str),
//   $.type(bool),
//   $.type(arr),
//   $.type(json),
//   $.type(func),
//   $.type(und),
//   $.type(nul),
//   $.type(date),
//   $.type(reg),
//   $.type(error)
// );
// 看到输出结果，有没有一种熟悉的感觉？对，他就是上面使用Object.prototype.toString.call(变量)输出的结果的第二个参数呀。
