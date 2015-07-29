'use strict';

// let是ES6中新增关键字。
// 它的作用类似于var，用来声明变量，但是所声明的变量，只在let命令所在的代码块内有效。
{
  var a = 3;
  let b = 4;
  if (true) {
    var a = 1;
    let b = 2;
    console.log(a);
    console.log(b);
  }
  console.log(a);
  console.log(b);
}

// const 声明的是常量，一旦声明，值将是不可变的。
// const 也具有块级作用域。const 不能变量提升（必须先声明后使用）。const 不可重复声明。
{
  const PI = 3.1415;
  console.log(PI);
  // PI = 3;                       // Assignment to constant variable.
  // const PI = 3.14;              // Identifier 'PI' has already been declared

  if (true) {
    const max = 5;
  }
  // console.log(max);             // max is not defined

  // var message = "Hello!";       // Identifier 'message' has already been declared
  let age = 25;
  // 以下两行都会报错
  const message = "Goodbye!";
  // const age = 30;               // Identifier 'age' has already been declared

  // const 指令指向变量所在的地址，所以对该变量进行属性设置是可行的（未改变变量地址），如果想完全不可变化（包括属性），那么可以使用冻结。
  const C1 = {};
  C1.a = 1;
  console.log(C1.a);
  // C1 = {};                      // Assignment to constant variable. 报错 重新赋值，地址改变
  const C2 = Object.freeze({});    // 冻结对象，此时前面用不用const都是一个效果
  // C2.a = 1;                     // Can't add property a, object is not extensible.  Error,对象不可扩展
  console.log(C2.a);
}

// 传统上，JavaScript只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。
{
  var str = "Hello world!";
  console.log(str.startsWith("Hello"));         // true
  console.log(str.endsWith("!"));               // true
  console.log(str.includes("o"));               // true
  // 这三个方法都支持第二个参数，表示开始搜索的位置。
  // 使用第二个参数n时，endsWith 的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
  console.log(str.startsWith("world", 6));      // true
  console.log(str.endsWith("Hello", 5));        // true
  console.log(str.includes("Hello", 6));        // false
}

// repeat()返回一个新字符串，表示将原字符串重复n次。
{
  var str = "x";
  console.log(str.repeat(3));                   // "xxx"
  var str1 = "hello";
  console.log(str1.repeat(2));                  // "hellohello"
}

// 模板字符串提供了3个有意思的特性。
{
  // 模板字符中，支持字符串插值
  let first = 'hubwiz';
  let last = '汇智网';
  console.log(`Hello ${first} ${last}!`);      // Hello hubwiz 汇智网!
  // 模板字符串可以包含多行
  let multiLine = `
　　　　This is
　　　　a string
　　　　with multiple
　　　　lines`;
  console.log(multiLine);
  // 标签模板
  var a = 5;
  var b = 10;
  function tag(s, v1, v2) {
    console.log(s[0]);
    console.log(s[1]);
    console.log(v1);
    console.log(v2);
    return "OK";
  }
  tag`Hello ${ a + b } world ${ a * b}`;
  // 上面代码中，模板字符串前面有一个标识名tag，它是一个函数。整个表达式的返回值，就是tag函数处理模板字符串后的返回值。
  // tag函数所有参数的实际值如下。
  // 第一个参数：['Hello ', ' world ']
  // 第二个参数: 15
  // 第三个参数：50
  // 也就是说，tag函数实际上以下面的形式调用。
  // tag(['Hello ', ' world '], 15, 50)
}

// ES6还为原生的String对象，提供了一个raw方法。
// 若使用String.raw 作为模板字符串的前缀，则模板字符串可以是原始(raw)的。反斜线也不再是特殊字符，\n 也不会被解释成换行符：
{
  let raw = String.raw`Not a newline: \n`;
  console.log(raw === 'Not a newline: \\n');       // true
}

// ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
{
  var Person = {
    name: '张三',
    birth:'1990-01-01',
    // 等同于hello: function ()...
    hello() {
      console.log('我的名字是', this.name);
    }
  };
  Person.hello();

  function getPoint() {
    var x = 1;　　
    var y = 10;　　
    return {x, y};
  };
  console.log(getPoint());       // { x: 1, y: 10 }
}

// ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
{
  // JavaScript语言定义对象的属性，有两种方法。
  let obj = {};
  obj.foo = true;         // 方法一
  obj['a'+'bc'] = 123;    // 方法二
  console.log(obj);
  // 如果使用字面量方式定义对象（使用大括号），在ES5中只能使用方法一（标识符）定义属性。
  var obj2 = {
　　foo: true,
　　abc: 123
  };
  console.log(obj2);
  // ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
  // let propKey = 'foo';
  // let obj3 = {
  //   [propKey]: true,
  //   ['a'+'bc']: 123
  // };
  // console.log(obj3);

  // 表达式还可以用于定义方法名。
  // let obj4 = {　　
  //   ['h'+'ello']() {　　　　
  //     return 'hi';
  //   }
  // };
  // console.log(obj4.hello());
}

// Object.is()用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
{
  console.log(+0 === -0);                 // true
  console.log(NaN === NaN);               // false
  console.log(Object.is(+0, -0));         // false
  console.log(Object.is(NaN, NaN));       // true
}

// Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。
// 它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。
{
  var target = { a: 1 };
  var source1 = { b: 2 };
  var source2 = { c: 3 };
  // Object.assign(target, source1, source2);
  console.log(target);  // {a:1, b:2, c:3}

  // 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
  var target = { a: 1, b: 1 };
  var source1 = { b: 2, c: 2 };
  var source2 = { c: 3 };
  // Object.assign(target, source1, source2);
  console.log(target);  // {a:1, b:2, c:3}
}

// proto属性，用来读取或设置当前对象的prototype对象。该属性一度被正式写入ES6草案，但后来又被移除。
// 目前，所有浏览器（包括IE11）都部署了这个属性。
{
  // es6的写法
  // var obj = {
  //   __proto__: someOtherObj,
  //   method: function() { }
  // }
  // es5的写法
  // var obj = Object.create(someOtherObj);
  // obj.method = function() { }
}

// ES6引入了一种新的原始数据类型Symbol，表示独一无二的ID。
// 凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
// 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。
{
  let s = Symbol();
  console.log(typeof s);    // symbol
  // Symbol类型的值不能与其他类型的值进行运算，会报错。
  // 但是，Symbol类型的值可以转为字符串。
  var sym = Symbol('My symbol');
  console.log(String(sym));                // 'Symbol(My symbol)'
  console.log(sym.toString());             // 'Symbol(My symbol)'
}

// Proxy 内置的一个代理工具，使用他可以在对象处理上加一层屏障：
// ES6原生提供Proxy构造函数，用来生成Proxy实例。
{
  // var proxy = new Proxy(target, handler);
  // // new Proxy()表示生成一个Proxy实例，它的target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
  // var plain = {
  //   name : "hubwiz"
  // };
  // var proxy = new Proxy(plain, {
  //   get: function(target, property) {
  //     return property in target ? target[property] : "汇智网";
  //   }
  // });
  // console.log(proxy.name);        // "hubwiz"
  // console.log(proxy.title);       // "汇智网"
}

// 现在可以在定义函数的时候指定参数的默认值了，而不用像以前那样通过逻辑或操作符来达到目的了。
{
  function sayHello(name) {
    //传统的指定默认参数的方式
    var name = name||'hubwiz';
    console.log('Hello '+name);
  }

  //运用ES6的默认参数
  // function sayHello2(name='hubwiz') {
  //   console.log(`Hello ${name}`);
  // }
  sayHello();                  // 输出：Hello hubwiz
  sayHello('汇智网');           // 输出：Hello 汇智网
  // sayHello2();                 // 输出：Hello hubwiz
  // sayHello2('汇智网');          // 输出：Hello 汇智网
}

// rest参数（形式为“...变量名”）可以称为不定参数，用于获取函数的多余参数，这样就不需要使用arguments对象了。
// rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
// 不定参数的格式是三个句点后跟代表所有不定参数的变量名。比如以上示例中，...values 代表了所有传入add函数的参数。
{
//   function add(...values) {　　
//     let sum = 0;
// 　　 for (var val of values) {
//       sum += val;
// 　　 }
// 　　 return sum;
//   }
//   console.log(add(1, 2, 3));         // 6
}

// 扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。该运算符主要用于函数调用。
// 它允许传递数组或者类数组直接做为函数的参数而不用通过apply。
{
  var people=['张三','李四','王五'];
  // sayHello函数本来接收三个单独的参数people1，people2和people3
  function sayHello(people1,people2,people3){
    console.log(`Hello ${people1},${people2},${people3}`);
  }
  // // 但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
  // sayHello(...people); // 输出：Hello 张三,李四,王五
  // // 而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
  // sayHello.apply(null, people);  // 输出：Hello 张三,李四,王五
}

// 箭头函数是使用=>语法的函数简写形式。这在语法上与 C#、Java 8 和 CoffeeScript 的相关特性非常相似。
{
  var array = [1, 2, 3];
  //传统写法
  array.forEach(function(v, i, a) {
    console.log(v);
  });
  //ES6
  // array.forEach(v => console.log(v));

//   var evens = [1,2,3,4,5];
//   var fives = [];
//   // 表达式体
//   var odds = evens.map(v => v + 1);
//   var nums = evens.map((v, i) => v + i);
//   var pairs = evens.map(v => ({even: v, odd: v + 1}));
//   // 语句体
//   nums.forEach(v => {
// 　　if (v % 5 === 0)
// 　　　　fives.push(v);
//   });
//   console.log(fives);
//   // 具有词法作用域的 this
//   var bob = {　　
//     _name: "Bob",　
//     _friends: ["Amy", "Bob", "Cinne", "Dylan", "Ellen"],　　
//     printFriends() {　　　　
//       this._friends.forEach(f => console.log(this._name + " knows " + f));
// 　　}
//   }
//   bob.printFriends();

  // 箭头函数有几个使用注意点。
  //   函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。
  //   不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
  //   不可以使用arguments对象，该对象在函数体内不存在。
  // 上面三点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
}

// 函数绑定运算符是并排的两个双引号（::），双引号左边是一个对象，右边是一个函数。
// 该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
{
  // let log = ::console.log;
  // // 等同于
  // var log = console.log.bind(console);
  //
  // foo::bar;
  // // 等同于
  // bar.call(foo);
  //
  // foo::bar(...arguments);
  // // 等同于
  // bar.apply(foo, arguments);
}

// 尾调用的概念非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
// “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧，这样可以节省内存。
{
  function f(x) {
    return g(x);
  }

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
  // 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，
  // 因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了。
}

// -->是一个JS运算符：“趋向于”运算符！
function countdown(n) {
  while (n --> 0) { // "n goes to zero"
    console.log(n);
  }
  blastoff();
}

// ES5
// var selected = allJobs.filter(function (job) {
//   return job.isSelected();
// });
// ES6
// var selected = allJobs.filter(job => job.isSelected());

// ES5
// var total = values.reduce(function (a, b) {
//   return a + b;
// }, 0);
// ES6
// var total = values.reduce((a, b) => a + b, 0);

// ES5
// $("#confetti-btn").click(function (event) {
//   playTrumpet();
//   fireConfettiCannon();
// });
// ES6
// $("#confetti-btn").click(event => {
//   playTrumpet();
//   fireConfettiCannon();
// });

// 为与你玩耍的每一个小狗创建一个新的空对象
// var chewToys = puppies.map(puppy => {});   // 这样写会报Bug！
// var chewToys = puppies.map(puppy => ({})); //
