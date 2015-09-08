// 理解Ecmascript 6中的类和继承

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
