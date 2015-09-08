import 'core-js/shim';

// 输出对象及其原型链
function printChain(object) {
  var protoChain = [object];
  while (object = object.__proto__) {
    if (object != Object.prototype) {
      protoChain.push(object);
    }
  }
  // protoChain.push(null);
  console.dir(protoChain);
}

// 最基本的：let和const ------
let a = 1;
const A = 2;

// 模板字符串 ------
const name = 'Jarvis';
const template = `My name is ${name}`;
const tmpl = `text line 1,
    text line 2,
    textline 3`;

// 箭头函数 ------
// 箭头函数通常比匿名函数还要简洁，几乎可以取代所有使用function的地方，不过用起来别太嗨了，下面有这个坑还是值得注意。
const fn1 = () => {
  console.log('hello world');
};
// 箭头函数最大的特点在于this关键字在声明或者定义箭头函数的时候就已经被绑定好了，而且不会改变，
// 这个特性用来解决setTimeout等一些异步函数this会改变的问题很爽，但下面这个却是个大问题：
// $('#selector').on('tap', () => {
//   $(this).addClass('new');
// });
// 这时候的this指向的全局变量，并非我们期望中的那个dom元素。
// 这时候就不适合用箭头函数了，除非你明确知道this指向的谁或者根本用不上this。

// …args ------
function fn2(...args) {
  console.log(args);
};
// 这里的args是个真正的数组了，使用到arguments的地方推荐都换成…args吧，还能避免一些意想不到的坑，比如下面这个。
const fn3 = () => {
  console.log(arguments);
};
// 这时候的arguments映射的是外层函数的arguments，如果使用…args就不会有这个问题。

// 默认参数 ------
// 默认函数参数我想用处非常大了，从此再也不用写一大堆参数判断的代码了。
function fn(params = {}, options = {}, callback = () => {}) {
  // TODO
}
// 再也不用去费力判断哪一个参数才是callback了。 Babel已经完全支持默认参数一些强大的语法，如
function f([x, y] = [1, 2], {
  z: z
} = {
  z: 3
}) {
  return x + y + z;
}

// 对象属性缩写 ------
const url = 'http://www.alloyteam.com';
const type = 'GET';
const timeout = 10000;
// $.ajax({
//   url, type, timeout
// });
// 属性缩写还可与解构赋值搭配使用
const options = {
  url1: url,
  type1: type,
  timeout1: timeout
}
const {
  url1, type1
} = options;
const opt = {
  url1, type1
};
// 这样轻松就能让opt成为options的一个子集了，在做字段过滤和参数白名单过滤的时候很有用。

// ECMAScript 6中除类之外的OOP新特性 ----------
// 在 ECMAScript 6中，方法依旧是函数值的属性，但现在定义方式更简洁了：
let obj1 = {
  myMethod() {}
};

// Getters 和 setters 依旧像 ECMAScript 5 那样使用（注意方法定义的语法相似度）
let obj2 = {
  get foo() {
    console.log('GET foo');
    return 123;
  },
  set bar(value) {
    console.log('SET bar to ' + value);
    // return value is ignored
  }
};
console.log(obj2.foo);
obj2.bar = true;
printChain(obj2);

// 还有一种简明方式来定义生成函数值的属性：
// let obj3 = { * myGeneratorMethod() {}
// };

// 属性值简写
// 属性值简写能让你将属性定义简写成对象字面量：如果变量的名称指定的属性值也是属性键，你就可以省略键，如下所示：
let x = 4;
let y = 1;
let obj4 = {
  x, y
};
console.log(obj4);
// let obj = { x: x, y: y };
// 属性值简写在重构方面也非常有用：
let obj5 = {
  x2: 4,
  y2: 1
};
let {
  x2, y2
} = obj5;
console.log(x2); // 4
console.log(y2); // 1
// 属性值简写的另外一个例子就是多值返回。

// 可计算的属性值
// 这里有两种设置属性指定属性键的方式：
//    通过一个固定的名字：obj.foo = true
//    通过一个表达式： obj['b'+'ar'] = 123
// 使用对象字面量时， ECMAScript 5只能选择第一种，而 ECMAScript 6则增加了第二种的选择：
let propKey = 'foo';
let obj6 = {
  [propKey]: true, ['b' + 'ar']: 123
};
console.log(obj6);

// 这个新语法同样也可以结合方法定义：
let obj7 = {
  ['h' + 'ello']() {
    return 'hi';
  }
};
console.log(obj7.hello()); // hi

// 可计算的属性值的主要用法就是标志（ symbols）：你可以定义一个公共的标志 （symbols）并将其作为一个特殊的属性键。
// 一个典型的例子就是将标志（symbols）储存在Symbol.iterator，如果对象有关于这个键的方法，就能成为可迭代的。
// 这个方法返还一个用来迭代对象并使用 for-of 循环构造的迭代器。就像以下代码这样：
// let obj8 = { * [Symbol.iterator]() { // (A)
//     yield 'hello';
//     yield 'world';
//   }
// };
// for (let x of obj8) {
//   console.log(x);
// }

// 对象的新方法
// Object.assign(target, source_1, source_2, ···)
let obj9 = {
  foo: 123
};
Object.assign(obj9, {
  bar: true
});
console.log(JSON.stringify(obj9));
// {"foo":123,"bar":true}
// 让我们仔细看看 Object.assign() 是怎么运作的：
// 支持两种类型的属性键： Object.assign()支持将 strings 和标志（symbols）作为属性键
// 只能枚举自己的属性：Object.assign()忽略属性继承和不枚举属性。
// 通过赋值来复制：target对象中的属性是通过赋值创建的（内部操作[[put]]）这意味着如果target有（自己的或者继承的）setters，将在复制的时候被调用。
//              另一种方式是定义新属性，可以不用调用setter直接创建自己的新属性，
//              最初是建议使用Object.assign()的变体来定义以取代赋值，这个提议已经被ECMAScript 6否决，但也有可能在更后面的版本中重新考虑。

// 让我们来看看几个使用案例，你可以使用Object.assign()在构造器中给this添加属性：
class Point {
  constructor(x, y) {
    Object.assign(this, {
      x, y
    });
  }
}

// Object.assign()在为缺失属性补充默认值也同样有用，在以下例子中，DEFAULTS 对象有属性的默认值和对象选项：
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options2) {
  var options2 = Object.assign({}, DEFAULTS, options2); // (A)
}

// 另一个使用案例是给对象添加方法：
Object.assign(Point.prototype, {
  someMethod(arg1, arg2) {},
    anotherMethod() {}
});

// 你也可以给函数赋值，但这不是好的方法定义语法，因为每次都需要使用 SomeClass.prototype。
Point.prototype.someMethod2 = function(arg1, arg2) {};
Point.prototype.anotherMethod2 = function() {};

// 最后一个Object.assign()的使用案例是拷贝（ cloning）对象一种快捷的方式。
function clone(orig) {
  return Object.assign({}, orig);
}
// 这种拷贝方式比较糟糕的一点是不能保存oirg的属性值，如果你需要这些值的话，你需要使用 property descriptors。

// 如果你希望拷贝的时候有原始对象一样的原型，你可以使用 useObject.getPrototypeOf 和 Object.create()
function clone(orig) {
  let origProto = Object.getPrototypeOf(orig);
  return Object.assign(Object.create(origProto), orig);
}

// Object.getOwnPropertySymbols(obj)
// 在ECMAScript 6，属性键可以是 string 或者标志（symbol），现在有五个工具方法来获取obj对象的属性键：
//    Object.keys(obj) → Array<string> 获取可枚举的自己属性的string属性键的全部值
//    Object.getOwnPropertyNames(obj) → Array<string> 获取自己属性的string属性键的全部值
//    Object.getOwnPropertySymbols(obj) → Array<symbol> 获取自己属性的标志（symbol）属性键的全部值
//    Reflect.ownKeys(obj) → Array<string|symbol> 获取自己属性的属性键的全部值
//    Reflect.enumerate(obj) → Iterator 获取可枚举的string属性键的全部值

// Object.is(value1, value2)
// 严格等于操作符（===）比较两个不同的值的时候有时候会与你预期的不同。
// 首先，NaN不等于NaN
console.log(NaN === NaN); // false
// 不幸的是，这会阻碍我们检测到NaN
console.log([0, NaN, 2].indexOf(NaN)); // -1
// 其次，JavaScript 有两个0，但是等于操作符将其看做相等的，
console.log(-0 === +0); // true
// 这样做通常是件好事：
// Object.is()提供一个比===更精确的比较值的方式，如下所示：
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, +0)); // false
// 其他的将使用===来比较

// 如果我们将Object.is()和 ECMAScript 6的新数组方法findIndex()结合使用，我们将在数组中找到NaN：
console.log([0, NaN, 2].findIndex(x => Object.is(x, NaN))); // 1

// Object.setPrototypeOf(obj, proto)
// 这个方法是将obj的原型设置为proto，在ECMAScript 5标准中不提供这样的做法，但这个做法得到一些引擎的支持，并通过一个特定的属性 __proto__ 来赋值。
// 推荐设置原型的方法跟 ECMAScript 5是相同的：
// 在创建对象的过程中，使用Object.create()将更快的创建的对象和设置原型，但很明显的是，他不能改变已存在对象的原型。
