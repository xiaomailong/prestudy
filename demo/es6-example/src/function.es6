import 'core-js/shim';
require('babel/polyfill');

// 1. 函数参数的默认值 ------

// 在ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法。
function log1(x, y) {
  y = y || 'World';
  console.log(x, y);
}
log1('Hello'); // Hello World
log1('Hello', 'China'); // Hello China
log1('Hello', ''); // Hello World
// 上面代码检查函数log的参数y有没有赋值，如果没有，则指定默认值为World。
// 这种写法的缺点在于，如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用。
// 就像上面代码的最后一行，参数y等于空字符，结果被改为默认值。

// 为了避免这个问题，通常需要先判断一下参数y是否被赋值，如果没有，再等于默认值。这有两种写法。
// 写法一
// if (typeof y === 'undefined') {
//   y = 'World';
// }
// 写法二
// if (arguments.length === 1) {
//   y = 'World';
// }

// ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
function log2(x, y = 'World') {
  console.log(x, y);
}
log2('Hello'); // Hello World
log2('Hello', 'China'); // Hello China
log2('Hello', ''); // Hello
// 可以看到，ES6的写法比ES5简洁许多，而且非常自然。

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
const p = new Point();
console.log(p); // p = { x:0, y:0 }
// 除了简洁，ES6的写法还有两个好处：
// 首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；
// 其次，有利于将来的代码优化，即使未来的版本彻底拿到这个参数，也不会导致以前的代码无法运行。

// 默认值的写法非常灵活，下面是一个为对象属性设置默认值的例子。
function fetch1(url, {
  body = '', method = 'GET', headers = {}
}) {
  console.log(method);
}
fetch1('http://example.com', {}); // "GET"
// fetch1('http://example.com'); // 报错
// 上面代码中，传入函数fetch的第二个参数是一个对象，调用的时候可以为它的三个属性设置默认值。

// 但是，这种写法不能省略第二个参数，为此可以设置双重默认值。
function fetch2(url, {
  method = 'GET'
} = {}) {
  console.log(method);
}
fetch2('http://example.com'); // "GET"
// 上面代码中，调用函数fetch时，第二个参数默认为一个空对象，而只要有第二个参数，method参数就默认为GET。

// 通常情况下，定义了默认值的参数，都是函数的尾参数。
// 因为这样比较容易看出来，到底省略了哪些参数。
// 但是，非尾部的参数，也是可以设置默认值的。

// 例一
function f1(x = 1, y) {
  return [x, y];
}
console.log(f1()); // [1, undefined]
console.log(f1(2)); // [2, undefined])
// console.log(f1(, 1)); // 报错
console.log(f1(undefined, 1)); // [1, 1]

// 例二
function f2(x, y = 5, z) {
  return [x, y, z];
}
console.log(f2()); // [undefined, 5, undefined]
console.log(f2(1)); // [1, 5, undefined]
// console.log(f2(1,,2)); // 报错
console.log(f2(1, undefined, 2)); // [1, 5, 2]
// 上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

// 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
function foo1(x = 5, y = 6) {
  console.log(x, y);
}
foo1(undefined, null); // 5 null
// 上面代码中，x参数对应undefined，结果触发了默认值，y参数等于null，就没有触发默认值。

// 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。
// 也就是说，指定了默认值后，length属性将失真。
console.log((function (a) {}).length); // 1
console.log((function (a = 5) {}).length); // 0
console.log((function (a, b, c = 5) {}).length); // 2
// 上面代码中，length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。

// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo2(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
// console.log(foo2()); // Error: Missing parameter
console.log(foo2(1111)); // Error: Missing parameter
// 上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。

// 从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（即函数名之后有一对圆括号），
// 这表明参数的默认值不是在定义时执行，而是在运行时执行（即如果参数已经赋值，默认值中的函数就不会运行），
// 这与python语言不一样。

// 另一个需要注意的地方是，参数默认值所处的作用域，不是全局作用域，而是函数作用域。
const x = 1;

function foo3(x, y = x) {
  console.log(y);
}
foo3(2); // 2
// 上面代码中，参数y的默认值等于x，由于处在函数作用域，所以y等于参数x，而不是全局变量x。

// 参数变量是默认声明的，所以不能用let或const再次声明。
function foo4(x = 5) {
  // let x = 1; // error
  // const x = 2; // error
}
// 上面代码中，参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。

// 参数默认值可以与解构赋值，联合起来使用。
function foo5({
  x, y = 5
}) {
  console.log(x, y);
}
foo5({}); // undefined, 5
foo5({
  x: 1
}); // 1, 5
foo5({
  x: 1,
  y: 2
}); // 1, 2
// 上面代码中，foo函数的参数是一个对象，变量x和y用于解构赋值，y有默认值5。

// 2. rest参数 ----------
// ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。
// rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
function add(...values) {
  let sum = 0;
  for (let val of values) {
    sum += val;
  }
  return sum;
}
console.log(add(2, 5, 3)); // 10
// 上面代码的add函数是一个求和函数，利用rest参数，可以向该函数传入任意数目的参数。

// 下面是一个rest参数代替arguments变量的例子。
// arguments变量的写法
const sortNumbers1 = () => Array.prototype.slice.call(arguments).sort();

// rest参数的写法
const sortNumbers2 = (...numbers) => numbers.sort();
// 上面代码的两种写法，比较后可以发现，rest参数的写法更自然也更简洁。

// rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。
// 下面是一个利用rest参数改写数组push方法的例子。
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
    // console.log(item);
  });
}
let a = [];
push(a, 1, 2, 3);
console.log(a); // [ 1, 2, 3 ]
// 注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

// 报错
// function f(a, ...b, c) {
//   // ...
// }

// 函数的length属性，不包括rest参数。
console.log((function (a) {}).length); // 1
console.log((function (...a) {}).length); // 0
console.log((function (a, ...b) {}).length); // 1

// 3. 扩展运算符 -----------
// 扩展运算符（spread）是三个点（...）。
// 它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5

// [...document.querySelectorAll('div')]
// <- [<div>, <div>, <div>]
// 该运算符主要用于函数调用。

function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}
var numbers111 = [4, 38];
console.log(add(...numbers111)); // 42
// 上面代码中，array.push(...items)和add(...numbers)这两行，都是函数的调用，它们的都使用了扩展运算符。
// 该运算符将一个数组，变为参数序列。

// 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
// ES5的写法
function f1(x, y, z) {}
var args = [0, 1, 2];
f1.apply(null, args);

// ES6的写法
function f2(x, y, z) {}
var args = [0, 1, 2];
f2(...args);

// 下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。
// ES5的写法
Math.max.apply(null, [14, 3, 77])

// ES6的写法
Math.max(...[14, 3, 77])
  // 等同于
Math.max(14, 3, 77);
// 上面代码表示，由于JavaScript不提供求数组最大元素的函数，所以只能套用Math.max函数，将数组转为一个参数序列，然后求最大值。
// 有了扩展运算符以后，就可以直接用Math.max了。

// 另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。
// ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
// 上面代码的ES5写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。
// 有了扩展运算符，就可以直接将数组传入push方法。

// 扩展运算符与正常的函数参数可以结合使用，非常灵活。
function f(v, w, x, y, z) {}
var args = [0, 1];
f(-1, ...args, 2, ...[3]);

let more = [3, 4];
// 扩展运算符可以简化很多种ES5的写法。
// ES5
[1, 2].concat(more);
// ES6
[1, 2, ...more]

let list = [0, 1, 2];
// ES5
list.push.apply(list, [3, 4]);
// ES6
list.push(...[3, 4]);

// ES5
var a55 = list[0],
  rest55 = list.slice(1);
// ES6
const [a66, ...rest66] = list;

// ES5
new(Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);

// 扩展运算符也可以与解构赋值结合起来，用于生成数组。
const [first1, ...rest1] = [1, 2, 3, 4, 5];
console.log(first1); // 1
console.log(rest1); // [2, 3, 4, 5]

const [first2, ...rest2] = [];
console.log(first2); // undefined
console.log(rest2); // []:

const [first3, ...rest3] = ["foo"];
console.log(first3); // "foo"
console.log(rest3); // []

const [first4, ...rest4] = ["foo", "bar"];
console.log(first4); // "foo"
console.log(rest4); // ["bar"]

const [first5, ...rest5] = ["foo", "bar", "baz"];
console.log(first5); // "foo"
console.log(rest5); // ["bar","baz"]

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
// const [...butLast, last] = [1, 2, 3, 4, 5]; // 报错

// const [first, ...middle, last] = [1, 2, 3, 4, 5]; // 报错

// JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。
// 扩展运算符提供了解决这个问题的一种变通方法。

// var dateFields = readDateFields(database);
// var d = new Date(...dateFields);
// 上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。

// 扩展运算符还可以将字符串转为真正的数组。

console.log([...
  "hello"]); // [ "h", "e", "l", "l", "o" ]

// 任何类似数组的对象，都可以用扩展运算符转为真正的数组。
// var nodeList = document.querySelectorAll('div');
// var array = [...nodeList];
// 上面代码中，querySelectorAll方法返回的是一个nodeList对象，扩展运算符可以将其转为真正的数组。

// 扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]

// Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
var go = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...go()]); // [1, 2, 3]
// 上面代码中，变量go是一个Generator函数，执行后返回的是一个遍历器对象，
// 对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

// 4. name属性 ----------
// 函数的name属性，返回该函数的函数名。

function foo41() {}
console.log(foo41.name); // "foo"
// 这个属性早就被浏览器广泛支持，但是直到ES6，才将其写入了标准。

// 需要注意的是，ES6对这个属性的行为做出了一些修改。
// 如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名。

var func1 = function () {};
// ES5
console.log(func1.name); // ""
// ES6
console.log(func1.name); // "func1"
// 上面代码中，变量func1等于一个匿名函数，ES5和ES6的name属性返回的值不一样。

// 如果将一个具名函数赋值给一个变量，则ES5和ES6的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};
// ES5
console.log(bar.name); // "baz"
// ES6
console.log(bar.name); // "baz"

// Function构造函数返回的函数实例，name属性的值为“anonymous”。
console.log((new Function()).name); // "anonymous"
console.log((function () {}).name); // "anonymous"

// bind返回的函数，name属性值会加上“bound ”前缀。
function foo42() {};
console.log(foo42.bind({}).name); // "bound foo"
console.log((function () {}).bind({}).name); // "bound "

// 5. 箭头函数 -----------
// 基本用法
// ES6允许使用“箭头”（=>）定义函数。
var f51 = v => v;
// 上面的箭头函数等同于：
var f52 = function (v) {
  return v;
};

// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
var f53 = () => 5;
// 等同于
var f54 = function () {
  return 5
};

var sum51 = (num1, num2) => num1 + num2;
// 等同于
var sum52 = function (num1, num2) {
  return num1 + num2;
};

// 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
var sum53 = (num1, num2) => {
  return num1 + num2;
}

// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
var getTempItem = id => ({
  id: id,
  name: "Temp"
});

// 箭头函数可以与变量解构结合使用。
const full1 = ({
  first, last
}) => first + ' ' + last;
// 等同于
function full2(person) {
  return person.first + ' ' + person.name;
}

// 箭头函数使得表达更加简洁。
const isEven = n => n % 2 == 0;
const square = n => n * n;
// 上面代码只用了两行，就定义了两个简单的工具函数。如果不用箭头函数，可能就要占用多行，而且还不如现在这样写醒目。

// 箭头函数的一个用处是简化回调函数。

// 正常函数写法
[1, 2, 3].map(function (x) {
  return x * x;
});
// 箭头函数写法
[1, 2, 3].map(x => x * x);

let values = [1, 3, 5, 9, 7];
// 正常函数写法
var result = values.sort(function (a, b) {
  return a - b;
});
// 箭头函数写法
var result = values.sort((a, b) => a - b);

// 下面是rest参数与箭头函数结合的例子。
const numbers = (...nums) => nums;
console.log(numbers(1, 2, 3, 4, 5)); // [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
console.log(headAndTail(1, 2, 3, 4, 5)); // [1,[2,3,4,5]]

// 使用注意点
// 箭头函数有几个使用注意点。
// （1）函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作Generator函数。
// 上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

[1, 2, 3].map(n => n * 2);
// 等同于
[1, 2, 3].map(function (n) {
  return n * 2;
}, this);

// 下面的代码是一个例子，将this对象绑定定义时所在的对象。
// var handler = {
//   id: "123456",
//
//   init: function() {
//     document.addEventListener("click",
//       event => this.doSomething(event.type), false);
//   },
//
//   doSomething: function(type) {
//     console.log("Handling " + type  + " for " + this.id);
//   }
// };
// 上面代码的init方法中，使用了箭头函数，这导致this绑定handler对象，
// 否则回调函数运行时，this.doSomething这一行会报错，因为此时this指向全局对象。

// function Timer () {
//   this.seconds = 0;
//   setInterval(() => this.seconds++, 1000);
// }
// var timer = new Timer();
// setTimeout(() => console.log(timer.seconds), 3100); // 3
// 上面代码中，Timer函数内部的setInterval调用了this.seconds属性，通过箭头函数将this绑定在Timer的实例对象。
// 否则，输出结果是0，而不是3。

// 由于this在箭头函数中被绑定，所以不能用call()、apply()、bind()这些方法去改变this的指向。

// 长期以来，JavaScript语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须非常小心。
// 箭头函数绑定this，很大程度上解决了这个困扰。

// 嵌套的箭头函数
// 箭头函数内部，还可以再使用箭头函数。下面是一个ES5语法的多重嵌套函数。
function insert1(value) {
  return {
    into1: function (array) {
      return {
        after1: function (afterValue) {
          array.splice(array.indexOf(afterValue) + 1, 0, value);
          return array;
        }
      };
    }
  };
}
console.log(insert1(2).into1([1, 3]).after1(1)); //[1, 2, 3]

// 上面这个函数，可以使用箭头函数改写。
let insert2 = (value) => ({
  into2: (array) => ({
    after2: (afterValue) => {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }
  })
});
console.log(insert2(2).into2([1, 3]).after2(1)); //[1, 2, 3]

// 下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);
console.log(addThenMult(5)); // 12

// 如果觉得上面的写法可读性比较差，也可以采用下面的写法。
const plus11 = a => a + 1;
const mult22 = a => a * 2;
console.log(mult22(plus11(5))); // 12

// 箭头函数还有一个功能，就是可以很方便地改写λ演算。

// λ演算的写法
// var fix1 = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)));

// ES6的写法
var fix2 = f => (x => f(v => x(x)(v)))
  (x => f(v => x(x)(v)));
// 上面两种写法，几乎是一一对应的。由于λ演算对于计算机科学非常重要，这使得我们可以用ES6作为替代工具，探索计算机科学。


// 6. 函数绑定 --------------
// 箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。
// 但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。
// 虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。

// 函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。
// 该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

// foo61::bar61;
// // 等同于
// bar62.call(foo62);
//
// foo63::bar63(...arguments);
// // 等同于
// bar64.apply(foo64, arguments);
//
// const hasOwnProperty = Object.prototype.hasOwnProperty;
// function hasOwn(obj, key) {
//   return obj::hasOwnProperty(key);
// }
//
// // 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
// var method61 = obj::obj.foo;
// // 等同于
// var method62 = ::obj.foo;
//
// let log61 = ::console.log;
// // 等同于
// var log62 = console.log.bind(console);

// 由于双冒号运算符返回的还是原对象，因此可以采用链式写法。
// 例一
// import { map, takeWhile, forEach } from "iterlib";
// getPlayers()
// ::map(x => x.character())
// ::takeWhile(x => x.strength > 100)
// ::forEach(x => console.log(x));

// 例二
// let { find, html } = jake;
// document.querySelectorAll("div.myClass")
// ::find("p")
// ::html("hahaha");

// 7. 尾调用优化 ----------
// 什么是尾调用？
// 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
function g(x) {}

function f(x) {
  return g(x);
}
// 上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

// 以下三种情况，都不属于尾调用。
// 情况一
function f1(x) {
  let y = g(x);
  return y;
}
// 情况二
function f2(x) {
  return g(x) + 1;
}
// 情况三
function f3(x) {
  g(x);
}
// 上面代码中，情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。
// 情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。
function f4(x) {
  g(x);
  return undefined;
}

// 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
function f5(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
// 上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。

// 尾调用优化
// 尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

// 我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。
// 如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。
// 等到B运行结束，将结果返回到A，B的调用帧才会消失。
// 如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。
// 所有的调用帧，就形成一个“调用栈”（call stack）。

// 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
// 因为调用位置、内部变量等信息都不会再用到了，
// 只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
function f6() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();
// 等同于
function f7() {
  return g(3);
}
f();
// 等同于
g(3);
// 上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。
// 但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。

// 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
// 如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

// 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
function addOne(a) {
  var one = 1;

  function inner(b) {
    return b + one;
  }
  return inner(a);
}
// 上面的函数不会进行尾调用优化，因为内层函数inner用到了，外层函数addOne的内部变量one。

// 尾递归
// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。
// 但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
function factorial1(n) {
  if (n === 1) return 1;
  return n * factorial1(n - 1);
}
console.log(factorial1(5)); // 120
// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial2(n, total) {
  if (n === 1) return total;
  return factorial2(n - 1, n * total);
}
console.log(factorial2(5, 1)); // 120
// 由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。
// ES6也是如此，第一次明确规定，所有ECMAScript的实现，都必须部署“尾调用优化”。
// 这就是说，在ES6中，只要使用尾递归，就不会发生栈溢出，相对节省内存。

// 目前，只有开启严格模式，尾调用优化才会生效。

// 递归函数的改写
// 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。
// 做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
// 比如上面的例子，阶乘函数 factorial 需要用到一个中间变量 total ，那就把这个中间变量改写成函数的参数。
// 这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

// 两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。
function tailFactorial3(n, total) {
  if (n === 1) return total;
  return tailFactorial3(n - 1, n * total);
}

function factorial3(n) {
  return tailFactorial3(n, 1);
}
console.log(factorial3(5)); // 120
// 上面代码通过一个正常形式的阶乘函数 factorial ，调用尾递归函数 tailFactorial ，看起来就正常多了。

// 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial4(n, total) {
  if (n === 1) return total;
  return tailFactorial4(n - 1, n * total);
}
const factorial4 = currying(tailFactorial4, 1);
console.log(factorial4(5)); // 120
// 上面代码通过柯里化，将尾递归函数 tailFactorial 变为只接受1个参数的 factorial 。

// 第二种方法就简单多了，就是采用ES6的函数默认值。
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
console.log(factorial(5)); // 120
// 上面代码中，参数 total 有默认值1，所以调用时不用提供这个值。

// 总结一下，递归本质上是一种循环操作。
// 纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。
// 对于其他支持“尾调用优化”的语言（比如Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

// 8. 函数参数的尾逗号
// ES7有一个提案，允许函数的最后一个参数有尾逗号（trailing comma）。

// 目前，函数定义和调用时，都不允许有参数的尾逗号。
function clownsEverywhere1(
  param1,
  param2
) { /* ... */ }

clownsEverywhere1(
  'foo',
  'bar'
);
// 如果以后要在函数的定义之中添加参数，就势必还要添加一个逗号。
// 这对版本管理系统来说，就会显示，添加逗号的那一行也发生了变动。
// 这看上去有点冗余，因此新提案允许定义和调用时，尾部直接有一个逗号。

function clownsEverywhere2(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere2(
  'foo',
  'bar',
);
