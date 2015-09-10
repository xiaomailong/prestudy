// 理解Ecmascript 6中的类和继承
// import 'core-js/shim';

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

(function() {
  console.log("\n---ECMAScript 6 class");
  class AnimalES6 {
    constructor(name) {
      this.name = name;
    }
    get age() {
      return this._age;
    }
    set age(value) {
      if (value < 0) {
        console.log("We do not support undead animals");
      }
      this._age = value;
    }
    doSomething() {
      console.log("I'm a " + this.name);
    }
  }
  var lionES6 = new AnimalES6("Lion");
  lionES6.doSomething();
  printChain(lionES6);
})();

(function() {
  console.log("\n---ECMAScript 6 getter 和 setter");
  class AnimalES6 {
    constructor(name) {
      this.name = name;
    }
    get age() {
      return this._age;
    }
    set age(value) {
      if (value < 0) {
        console.log("We do not support undead animals");
      }

      this._age = value;
    }
    doSomething() {
      console.log("I'm a " + this.name);
    }
  }
  var lionES6 = new AnimalES6("Lion");
  lionES6.doSomething();
  lionES6.age = 5;
  printChain(lionES6);
  // 但这会看到一个 JavaScript 的常规警告：“不是真正私有的”私有成员（_age）。
})();

(function() {
  console.log("\n---ECMAScript 6 Symbol ");

  // 什么是 symbol （符号）呢？它是唯一且不可改变的数据类型，可用于标识对象属性。如果没有 symbol （符号），是不能获取该属性的。
  // 所以，这是一个可创建更“私有”的成员属性途径。
  // 或者，至少没那么容易访问到。Symbol （符号）对于创建唯一的名字是很有用的，但唯一性不意味着私有性。
  // 唯一性只意味着，为一把钥匙添加一个新符号后，当你需要它的时候，肯定不会被其它钥匙所干扰。

  var ageSymbol = Symbol("age");

  class AnimalES6 {
    constructor(name) {
      this.name = name;
      this[ageSymbol] = 0;
    }
    get age() {
      return this[ageSymbol];
    }
    set age(value) {
      if (value < 0) {
        console.log("We do not support undead animals");
      }
      this[ageSymbol] = value;
    }
    doSomething() {
      console.log("I'm a " + this.name);
    }
  }

  var lionES6 = new AnimalES6("Lion");
  lionES6.doSomething();
  lionES6.age = 5;
  printChain(lionES6);
  // console.log(lionES6.age()); // lionES6.age is not a function
  // console.log(lionES6.age(5)); // lionES6.age is not a function
  console.log(lionES6.age); // 5

  // 但这还不是正真的私有，因为通过 Object.getOwnPropertySymbols，downstream consumers  能获取 symbol （符号）属性。
  console.log(Object.getOwnPropertySymbols(lionES6));
  console.log(Object.getOwnPropertySymbols(lionES6).length);
  console.log(Object.getOwnPropertySymbols(lionES6)[0]);
  console.log(lionES6[ageSymbol]);
  console.log(lionES6[Object.getOwnPropertySymbols(lionES6)[0]]);
  console.log(ageSymbol);
  // 关于symbols的一个忠告：与JS中的其它类型不同，它不能被自动转换为字符串。试图拼接symbol与字符串将会引起类型错误。
  // 你可以通过显示地将symbol转换为一个字符串来避免这个问题，通过String(ageSymbol)或者ageSymbol.toString()。

  console.log("\n---ECMAScript 6 继承 ");

  var legsCountSymbol = Symbol('legs');
  class InsectES6 extends AnimalES6 {
    constructor(name) {
      super(name);
      this[legsCountSymbol] = 0;
    }
    get legsCount() {
      return this[legsCountSymbol];
    }
    set legsCount(value) {
      if (value < 0) {
        console.log("We do not support nether or interstellar insects");
      }
      this[legsCountSymbol] = value;
    }
    doSomething() {
      super.doSomething();
      console.log("And I have " + this[legsCountSymbol] + " legs!");
    }
  }
  var spiderES6 = new InsectES6("Spider");
  spiderES6.legsCount = 8;
  spiderES6.age = 37;
  spiderES6.doSomething();
  printChain(spiderES6);
  console.log(Object.getOwnPropertySymbols(spiderES6));
  console.log(Object.getOwnPropertySymbols(spiderES6).length);
  console.log(spiderES6[Object.getOwnPropertySymbols(spiderES6)[0]]);
  console.log(spiderES6[Object.getOwnPropertySymbols(spiderES6)[1]]);
  // 多亏 “extends” 关键字，它能让你继承类而产生子类，并能使用 “super” 关键字保持对根类的引用。
})();

(function() {
  console.log("\n---javascript ES 6 class 详解");
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }

  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y);
      this.color = color;
    }
    toString() {
      return super.toString() + ' in ' + this.color;
    }
  }

  let cp = new ColorPoint(25, 8, 'green');
  console.log(cp.toString()); // (25, 8) in green
  console.log(cp instanceof ColorPoint); // true
  console.log(cp instanceof Point); // true
  printChain(cp);

  // Base classes
  // 我们可以像使用ES5标准中的constructor一样实例化class
  let p = new Point(25, 8);
  console.log(p.toString()); // (25, 8)
  // 实际上，class还是用function实现的，并没有为js创造一个全新的class体系。
  console.log(typeof Point);
  // 但是，与function相比，它是不能直接调用的，也就是说必须得new出来
  // Point();  //  TypeError: Cannot call a class as a function

  // 另外，它不会像function一样会被hoisted(原因是语义阶段无法解析到extends的内容)
  foo(); // works, because `foo` is hoisted
  function foo() {}
  // new Foo(); // ReferenceError
  class Foo {}
  new Foo(); // works
  function functionThatUsesBar() {
    new Bar();
  }
  // functionThatUsesBar(); // ReferenceError
  class Bar {}
  functionThatUsesBar(); // OK

  // 与函数一样，class的定义表达式也有两种，声明形式、表达式形式。之前用的都是声明形式，以下是表达式式的:
  const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  };
  let inst = new MyClass();
  console.log(inst.getClassName()); // Me
  // console.log(Me.name); // ReferenceError: Me is not defined
})();

(function() {
  console.log("\n---Inside the body of a class definition");

  // class定义体是只能包含方法，不能包含属性的(标准定义组织认为原型链中不应包含属性)，属性被写在constructor中。
  // 以下是三种会用到的方法(constructor 、static method、 prototype method)：
  class Foo {
    constructor(prop) {
      this.prop1 = prop;
    }
    static staticMethod() {
      return 'classy';
    }
    prototypeMethod() {
      return 'prototypical';
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: ' + value);
    }
  }
  let foo = new Foo(123);

  // constructor，这个方法本身，代表了class
  console.log(Foo === Foo.prototype.constructor); // true
  // constructor有时被称为类构造器。相较于ES5，它可以调用父类的constructor(使用super())。
  // static methods。它们归属于类本身。
  console.log(typeof Foo.staticMethod); // function
  console.log(Foo.staticMethod()); // classy
  // 关于Getters and setters
  foo.prop = 123; // setter: 123
  console.log(foo.prop); // getter
  printChain(foo);

  // 方法名是可以动态生成的
  // class Foo111() {
  //     myMethod() {}
  // }
  // class Foo222() {
  //     ['my'+'Method']() {}
  // }
  // const m = 'myMethod';
  // class Foo333() {
  //     [m]() {}
  // }

  // 增加了迭代器的支持，需要给方法前面加一个*
  class IterableArguments {
    constructor(...args) {
      this.args = args;
    }

    * [Symbol.iterator]() {
      for (let arg of this.args) {
        yield arg;
      }
    }
  }

  for (let x of new IterableArguments('hello', 'world')) {
    console.log(x); // hello    world
  }

})();

(function() {
  console.log("\n---Subclassing");

  // 通过extends，我们可以继承其它实现constructor的函数或对象。
  // 需要注意一下，constructor与非constructor调用父类方法的途径是不同的。
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
    static classMethod() {
      return 'hello';
    }
  }

  class ColorPoint extends Point {
    constructor(x, y, color) {
      // 关于子类中使用构造器，需要注意的是，调用this之前，需要调用super()
      let tmp = x * y; // OK
      // this.area = tmp; // ReferenceError 'this' is not allowed before super()
      super(x, y); // (A)
      this.color = color;
      this.area = tmp; // OK
    }
    toString() {
      return super.toString() + ' in ' + this.color; // (B)
    }
    static classMethod() {
      // static方法也是支持调用父类的。
      return super.classMethod() + ', too';
    }
  }
  let cp = new ColorPoint(25, 8, 'green');
  console.log(cp.toString()); // (25, 8) in green
  console.log(cp instanceof ColorPoint); // true
  console.log(cp instanceof Point); // true
  printChain(cp);

  // 子类的原型就是它的父类
  console.log(Object.getPrototypeOf(ColorPoint) === Point); // true
  // 所以，static method也被继承了
  console.log(ColorPoint.classMethod()); // hello
  // constructors是可以被显示覆盖(override)的。
  class Foo {
    constructor() {
      return Object.create(null);
    }
  }
  console.log(new Foo() instanceof Foo); // false
  // 如果基类中不显示定义constructor，引擎会生成如下代码
  // constructor() {}
  // 对于子类
  // constructor(...args) {
  //   super(...args);
  // }

  // 类名不能为eval 或者 arguments，不能有重复的类名，constructor不支持getter,setter。
  // classes不能像函数一样调用。
  // 原型方法不能用作构造器：
  // class C {
  //   m() {}
  // }
  // new C.prototype.m(); // TypeError
})();

(function() {
  console.log("\n---");

})();
