// 理解单例模式

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

// 单例模式的含义是: 保证一个类只有一个实例,并提供一个访问它的全局访问点。
// 实现的方法是:使用一个变量来标志当前是否已经为某个类创建过对象,
//            如果创建了,则在下一次获取该类的实例时,直接返回之前创建的对象,否则就创建一个对象。
//            这就确保了一个类只有一个实例对象。
(function() {
  console.log("\n---简单的单例模式");

  var Singleton = function(name) {
    this.name = name;
    // 使用instance 该标志来判断是否创建了一个实例
    this.instance = null;
  };
  Singleton.prototype.getName = function() {
    console.log(this.name);
  };
  Singleton.getInstance = function(name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }

  var a = Singleton.getInstance("aa");
  var b = Singleton.getInstance("bbb");
  console.log(a);
  console.log(b);

  console.log(a === b); // true
  a.getName(); // aa
  b.getName(); // aa
  a.test = "test";
  console.log(b.test); // test

  printChain(a);
  printChain(b);
})();

(function() {
  console.log("\n---我们还可以像如下方式来编写代码");

  var Singleton = function(name) {
    this.name = name;
  };
  Singleton.prototype.getName = function() {
    console.log(this.name);
  };
  Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
      if (!instance) {
        instance = new Singleton(name);
      }
      return instance;
    }
  })();

  var a = Singleton.getInstance("aa");
  var b = Singleton.getInstance("bbb");
  console.log(a);
  console.log(b);

  console.log(a === b); // true
  a.getName(); // aa
  b.getName(); // aa
  a.test = "test";
  console.log(b.test); // test

  printChain(a);
  printChain(b);
})();

// 编写通用的惰性单例
(function() {
  console.log("\n---编写通用的惰性单例");
  var getSingle = function(fn) {
    var result;
    return function() {
      return result || (result = fn.apply(this, arguments));
    };
  };
  // var Create = function(name) {
  //   this.name = name;
  // };
  // Create.prototype.getName = function() {
  //   console.log(this.name);
  // };
  // var CreateSingleton = getSingle(Create);
  // var a = CreateSingleton('a');
  // var b = CreateSingleton('b');
  // console.log(a);
  // console.log(b);
  // console.log(a === b); // true
  // a.getName(); // aa
  // b.getName(); // aa
  // a.test = "test";
  // console.log(b.test); // test
  // printChain(a);
  // printChain(b);
})();
