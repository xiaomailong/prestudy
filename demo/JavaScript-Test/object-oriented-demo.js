// javascript面向对象系列1——理解对象 --------------------------------
// 【编程思想】
// 　　【面向过程】:以过程为中心，自顶向下逐步细化，程序看成一系列函数调用的集合
// 　　【面向对象】:对象作为程序的基本单元，程序分解为数据和相关操作
//
// 【类、对象】
// 　　【类】:对具有相同特性和特征事物的抽象描述
// 　　【对象】:某种类型对应的具体事物
//
// 【面向对象的三大特性】
// 　　【封装】隐藏实现细节，实现代码模块化
// 　　【继承】扩展已存在的代码模块，实现代码重用
// 　　【多态】接口的不同实现方式，实现接口重用
//
// 【对象定义】无序属性的集合，其属性可以包含基本值、对象或者函数
(function() {
  console.log("\n---简单的对象实例");

  var person = new Object();
  person.name = "Nicholas";
  person.age = 29;
  person.job = "Software Engineer";
  person.sayName = function() {
    console.log(this.name);
  };
  person.sayName();
})();

// 【内部属性类型】内部属性无法直接访问，ECMAScript5把它们放在两对方括号中，分为数据属性和访问器属性
// 　　[1]【数据属性】包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有4个特性:
// 　　　　a、[[Configurable]]: 表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，
//                            或者能否把属性修改为访问器属性，直接在对象上定义的属性，默认值为true
// 　　　　b、[[Enumerable]]: 表示能否通过for-in循环返回属性,直接在对象上定义的属性，默认值为true
// 　　　　c、[[Writable]]: 表示能否修改属性的值，直接在对象上定义的属性，默认值为true
// 　　　　d、[[Value]]: 包含这个属性的数据值，读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。
//                     直接在对象上定义的属性，默认值为undefined
//
// 　　[2]【访问器属性】不包含数据值，包含一对getter和setter函数(不过这两个函数不是必需的)。
//      读取访问器属性时，会调用getter函数，这个函数负责返回有效的值；
//      在写入访问器属性时，会调用setter函数并传入新值，这个函数负责决定如何处理函数。访问器属性有如下4个特性：
// 　　　　a、[[Configurable]]: 表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，
//                            或者能否把属性修改为访问器属性。直接在对象上定义的属性，默认值为true
// 　　　　b、[[Enumerable]]: 表示能否通过for-in循环返回属性，直接在对象上定义的属性，默认值为true
// 　　　　c、[[Get]]: 在读取属性时调用的函数。默认值为undefined
// 　　　　d、[[Set]]: 在写入属性时调用的函数。默认值为undefined
//
// 【修改内部属性】使用ECMAScript5的object.defineProperty()方法,该方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象
//   [注意1]IE8是第一个实现Object.defineProperty()方法的浏览器版本。
//         然而，这个版本的实现存在诸多限制：只能在DOM对象上使用这个方法，而且只能创建访问器属性。
//         由于实现不彻底，不建议在IE8中使用Object.defineProperty()方法
//   [注意2]不支持Object.defineProperty()方法的浏览器中不能修改[[Configurable]]和[[Enumerable]]
// 　　[1]【修改数据属性】
(function() {
  console.log("\n---直接在对象上定义的属性");
  // 直接在对象上定义的属性，Configurable、Enumerable、Writable为true
  var person = {
    name: 'cook'
  };
  Object.defineProperty(person, 'name', {
    value: 'Nicholas'
  });
  console.log(person.name); // 'Nicholas'
  person.name = 'Greg';
  console.log(person.name); // 'Greg'
})();

(function() {
  console.log("\n---不是在对象上定义的属性");
  // 不是在对象上定义的属性，Configurable、Enumerable、Writable为false
  var person = {};
  Object.defineProperty(person, 'name', {
    value: 'Nicholas'
  });
  console.log(person.name); // 'Nicholas'
  person.name = 'Greg';
  console.log(person.name); // 'Nicholas'
})();

(function() {
  console.log("\n---设置writable为false,则属性值无法被修改");
  // 该例子中设置writable为false,则属性值无法被修改
  var person = {};
  Object.defineProperty(person, 'name', {
    writable: false,
    value: 'Nicholas'
  });
  console.log(person.name); // 'Nicholas'
  person.name = 'Greg';
  console.log(person.name); // 'Nicholas'
})();

(function() {
  console.log("\n---设置configurable为false,则属性不可配置");
  // 该例子中设置configurable为false,则属性不可配置
  var person = {};
  Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'Nicholas'
  });
  console.log(person.name); // 'Nichols'
  delete person.name;
  console.log(person.name); // 'Nicholas'
})();

// 　　  [注意]一旦把属性定义为不可配置的，就不能再把它变回可配置了，也就是说可以多次调用Object.defineProperty()修改同一属性，
//           但在把configurable设置为false之后，就有限制了
(function() {
  console.log("\n---一旦把属性定义为不可配置的，就不能再把它变回可配置了");
  var person = {};
  Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'Nicholas'
  });
  // 会报错 Cannot redefine property: name
  // Object.defineProperty(person, 'name', {
  //   configurable: true,
  //   value: 'Nicholas'
  // });
})();

// 　　[2]【修改访问器属性】
(function() {
  console.log("\n---简单的修改访问器属性");
  // 简单的修改访问器属性的例子
  var book = {
    _year: 2004,
    edition: 1
  };
  Object.defineProperty(book, 'year', {
    get: function() {
      return this._year;
    },
    set: function(newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  });
  book.year = 2015;
  console.log(book.year); // 2015
  console.log(book.edition); // 12
})();

// 　　  [注意1]只指定getter意味着属性是不能写
(function() {
  console.log("\n---[注意1]只指定getter意味着属性是不能写");
  var book = {
    _year: 2004,
    edition: 1
  };
  Object.defineProperty(book, 'year', {
    get: function() {
      return this._year;
    },
  });
  book.year = 2005;
  console.log(book.year); // 2004
})();

// 　　  [注意2]只指定setter意味着属性不能读
(function() {
  console.log("\n---[注意2]只指定setter意味着属性不能读");
  var book = {
    _year: 2004,
    edition: 1
  };
  Object.defineProperty(book, 'year', {
    set: function(newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  });
  book.year = 2005;
  console.log(book.year); // undefined
})();

// 　　  【补充】创建访问器属性的用两个非标准的方法：__defineGetter__()和__defineSetter__()
(function() {
  console.log("\n---【补充】创建访问器属性的用两个非标准的方法");
  var book = {
    _year: 2004,
    edition: 1
  };
  // 定义访问器的旧有方法
  book.__defineGetter__('year', function() {
    return this._year;
  });
  book.__defineSetter__('year', function(newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  });
  book.year = 2005;
  console.log(book.year); // 2005
  console.log(book.edition); // 2
})();

// 【定义多个属性】ECMAScript5定义了一个Object.defineProperties()方法，利用这个方法可以通过描述符一次定义多个属性，
//              这个方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象要添加或修改的一一对应
(function() {
  console.log("\n---定义多个属性");
  var book = {};
  Object.defineProperties(book, {
    _year: {
      value: 2004
    },
    edition: {
      value: 1
    },
    year: {
      get: function() {
        return this._year;
      },
      set: function(newValue) {
        if (newValue > 2004) {
          this._year = newValue;
          this.edition += newValue - 2004;
        }
      }
    }
  });
})();

// 【读取属性特性】使用ECMAScript5的Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述符。
//              该方法接收两个参数：属性所在对象和要读取其描述符的属性名称，返回值是一个对象。
// 　　[注意]可以针对任何对象——包括DOM和BOM对象，使用Object.getOwnPropertyDescriptor()方法
(function() {
  console.log("\n---");
  var book = {};
  Object.defineProperties(book, {
    _year: {
      value: 2004
    },
    edition: {
      value: 1
    },
    year: {
      get: function() {
        return this._year;
      },
      set: function(newValue) {
        if (newValue > 2004) {
          this._year = newValue;
          this.edition += newValue - 2004;
        }
      }
    }
  });
  var descriptor = Object.getOwnPropertyDescriptor(book, '_year');
  console.log(descriptor.value); // 2004
  console.log(descriptor.configurable); // false
  console.log(typeof descriptor.get); // 'undefined'

  var descriptor2 = Object.getOwnPropertyDescriptor(book, 'year');
  console.log(descriptor2.value); // 'undefined'
  console.log(descriptor2.configurable); // false
  console.log(typeof descriptor2.get); // 'function'
})();

// 输出对象及其原型链
function printChain(object) {
  var protoChain = [object];
  while (object == object.prototype) {
    if (object != Object.prototype) {
      protoChain.push(object);
    }
  }
  // protoChain.push(null);
  console.dir(protoChain);
}
// javascript面向对象系列2——创建对象的9种方式 ----------------------------
// 【1】使用Object构造函数
// 　　[缺点]使用同一个接口创建很多对象，会产生大量重复代码
(function() {
  console.log("\n---【1】使用Object构造函数");
  var person = new Object();
  person.name = "Nicholas";
  person.age = 29;
  person.job = "Software Engineer";
  person.sayName = function() {　　
    console.log(this.name);　　
  };
  printChain(person);
})();

// 【2】使用对象字面量
// 　　[缺点]使用同一个接口创建很多对象，会产生大量重复代码
(function() {
  console.log("\n---【2】使用对象字面量");
  var person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function() {
      console.log(this.name);
    }
  };
  printChain(person);
})();

// 【3】工厂模式:抽象了创建具体对象的过程，考虑到ECMAScript中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节
// 　　[缺点]解决了创建多个相似对象的问题，但没有解决对象识别的问题
(function() {
  console.log("\n---【3】工厂模式");

  function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayname = function() {
      console.log(this.name);
    };
    return o;
  }
  var person1 = createPerson('Nicholas', 29, 'software Engineer');
  var person2 = createPerson('greg', 27, 'doctor');
  printChain(person1);
  printChain(person2);
})();

// 【4】构造函数模式:没有显式地创建对象，直接将属性和方法赋给了this对象，没有return语句
// 　　[缺点]每个方法都要在每个实例上重新创建一遍
(function() {
  console.log("\n---【4】构造函数模式");

  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.jog = job;
    this.sayName = function() {
      console.log(this.name);
    };
    // 与声明函数在逻辑上是等价的
    // this.sayName = new Function('console.log(this.name)');
  }
  var person1 = new Person("Nicholas", 29, "software Engineer");
  var person2 = new Person("Greg", 27, "doctor");
  printChain(person1);
  printChain(person2);
})();

// 　　【4.1】构造函数拓展模式:把函数定义转移到构造函数外部
// 　　　　[缺点1]在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实
// 　　　　[缺点2]若对象需要定义很多方法，就要定义很多全局函数，这个自定义引用类型就没有封装性可言
(function() {
  console.log("\n---【4.1】构造函数拓展模式");

  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
  }

  function sayName() {
    console.log(this.name);
  }
  var person = new Person('小火柴', '20', 'student');
  person.sayName();
  printChain(person);
})();

// 【5】原型模式:我们创建的每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，
//             而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
//             如果按照字面意思来理解，prototype就是通过调用构造函数而创建的对象实例的原型对象
(function() {
  console.log("\n---【5】原型模式");

  function Person() {
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "software Engineer";
    Person.prototype.sayName = function() {
      console.log(this.name);
    };
  }
  var person1 = new Person();
  person1.sayName(); // "Nicholas"
  var person2 = new Person();
  Person.prototype.age = 38;
  person2.name = 'Nich olas';
  person2.sayName(); // "Nicholas"
  person2.age = 37;
  console.log(person1.sayName == person2.sayName); // true
  printChain(person1);
  printChain(person2);
})();

//  　　【5.1】更简单的原型模式:为了减少不必要的输入，也为了从视觉上更好地封装原型的功能，用一个包含所有属性和方法的对象字面量来重写整个原型对象。
// 　　　　[缺点]以这种方式重设constructor属性会导致它的[[Enumerable]]特性被设置为true,默认情况下原生的constructor属性是不可枚举的
(function() {
  console.log("\n---【5.1】更简单的原型模式");

  function Person() {};
  Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "software Engineer",
    sayName: function() {
      console.log(this.name);
    }
  };
  person = new Person();
  printChain(person);
})();

//  　　【5.2】解决enumerable问题的原型模式
(function() {
  console.log("\n---【5.2】解决enumerable问题的原型模式");

  function Person() {}
  Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "software Engineer",
    sayName: function() {
      console.log(this.name);
    }
  };
  Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
  });
  person = new Person();
  printChain(person);
})();

//  　　[原型模式缺点1]重写原型对象切断了现有原型与已存在对象实例之间的联系，它们引用的仍是最初的原型。
(function() {
  console.log("\n---[原型模式缺点1]重写原型对象切断了现有原型与已存在对象实例之间的联系，它们引用的仍是最初的原型。");

  function Person() {}
  var friend = new Person();
  Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function() {
      console.log(this.name);
    }
  };
  printChain(friend);
  var friend2 = new Person();
  printChain(friend2);
  // friend.sayName(); // error TypeError: friend.sayName is not a function
})();

//  　　[原型模式缺点2]引用类型属性的共享性问题突出
(function() {
  console.log("\n---[原型模式缺点2]引用类型属性的共享性问题突出");

  function Person() {}
  Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    friends: ["shelby", "Court"],
    sayName: function() {
      console.log(this.name);
    }
  };
  var person1 = new Person();
  var person2 = new Person();
  person1.friends.push("Van");
  console.log(person1.friends); // ["shelby","Court","Van"];
  console.log(person2.friends); // ["shelby","Court","Van"];
  console.log(person1.friends === person2.friends); // true
  printChain(person1);
  printChain(person2);
})();

// 【6】组合模式:组合使用构造函数模式和原型模式是创建自定义类型的最常见方式。
// 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
// 这种混成模式还支持向构造函数传递参数，是用来定义引用类型的一种默认模式
(function() {
  console.log("\n---【6】组合模式");

  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["shelby", "Court"];
  }
  Person.prototype = {
    constructor: Person,
    sayName: function() {
      console.log(this.name);
    }
  };
  var person1 = new Person("Nicholas", 29, "Software Engineer");
  var person2 = new Person("Greg", 27, "Doctor");
  person1.friends.push("Van");
  console.log(person1.friends); // ["shelby","Court","Van"];
  console.log(person1.friends); // ["shelby","Court"];
  console.log(person1.friends === person2.friends); // false
  console.log(person1.sayName === person2.sayName); // true
  console.log(person1.constructor === person2.constructor); // true
  printChain(person1);
  printChain(person2);
})();

// 【7】动态原型模式:把所有信息都封装在构造函数中，通过在构造函数中初始化原型(仅在必要情况下)，又保持了同时使用构造函数和原型的优点。
//                换句话说，可以通过检查某个存在的方法是否有效，来决定是否要初始化原型。
// 　　[注意]使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新实例之间的联系
(function() {
  console.log("\n---【7】动态原型模式");

  function Person(name, age, job) {
    // 属性
    this.name = name;
    this.age = age;
    this.job = job;
    // 方法
    if (typeof this.sayName != "function") {
      Person.prototype.sayName = function() {
        console.log(this.name);
      };
    }
  }
  var friend = new Person("Nicholas", 29, "Software Engineer");
  friend.sayName();
  printChain(friend);
})();

// 【8】寄生构造函数模式:创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象
(function() {
  console.log("\n---【8】寄生构造函数模式");

  function Person(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
      console.log(this.name);
    };
    return o;
  }
  var friend = new Person("Nicholas", 29, "Software Engineer");
  friend.sayName(); // "Nicholas"
  printChain(friend);
})();

//  　　【寄生构造函数模式应用】创建一个具有额外方法的特殊数组。由于不能直接修改Array构造函数，因此可以使用这个模式
(function() {
  console.log("\n---【寄生构造函数模式应用】");

  function SpecialArray() {
    // 创建数组
    var values = new Array();
    // 添加值
    values.push.apply(values, arguments);
    // 添加方法
    values.toPipedString = function() {
      return this.join('|');
    };
    // 返回数组
    return values;
  }
  var colors = new SpecialArray("red", "blue", "green");
  console.log(colors.toPipedString()); // "red|blue|green"
  printChain(colors);
})();

// 【9】稳妥构造函数模式:所谓稳妥对象指没有公共属性，而且其方法也不引用this的对象。
//     稳妥对象最适合在一些安全环境中(这些环境会禁止使用this和new)或者在防止数据被其他应用程序改动时使用。
(function() {
  console.log("\n---【9】稳妥构造函数模式");

  function Person(name, age, job) {
    // 创建要返回的对象
    var o = new Object();
    // 可以在这里定义私有变量和函数
    // 添加方法
    o.sayName = function() {
      console.log(name);
    };
    // 返回对象
    return o;
  }
  // 在稳妥模式创建的对象中，除了使用sayName()方法之外，没有其他方法访问name的值
  var friend = Person("Nicholas", 29, "Software Engineer");
  friend.sayName(); // "Nicholas"
  printChain(friend);
})();

// javascript面向对象系列3——实现继承的6种方式 ----------------------------------
// 【前面的话】许多OO语言都支持两种继承方式:接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法，
// 由于函数没有签名，在ECMAScript中无法实现接口继承，ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的

// 【1】【原型链继承】实现的本质是重写原型对象，代之以一个新类型的实例。
// 实际上不是SubType的原型的constructor属性被重写了，而是SubType的原型指向了另一个对象——SuperType的原型，
// 而这个原型对象的construtor属性指向的是SuperType
(function() {
  console.log("\n---【1】【原型链继承】");

  function SuperType() {
    this.property = true;
  }
  SuperType.prototype.getSuperValue = function() {
    return this.property;
  };

  function SubType() {
    this.subproperty = false;
  }
  // 继承了SuperType
  SubType.prototype = new SuperType();
  SubType.prototype.getSubValue = function() {
    return this.subproperty;
  };
  var instance = new SubType();
  console.log(instance.getSuperValue()); // true
  printChain(instance);
})();

// 　　[注意1]谨慎地定义方法，给原型添加方法的代码一定要放在替换原型的语句之后
(function() {
  console.log("\n---[注意1]谨慎地定义方法，给原型添加方法的代码一定要放在替换原型的语句之后");

  function SuperType() {
    this.property = true;
  }
  SuperType.prototype.getSuperValue = function() {
    return this.property;
  };

  function SubType() {
    this.subproperty = false;
  }
  // 继承了SuperType
  SubType.prototype = new SuperType();

  // 添加了新方法
  SubType.prototype.getSubValue = function() {
    return this.subproperty;
  };
  // 重写超类型的方法
  SubType.prototype.getSuperValue = function() {
    return false;
  };
  var instance = new SubType();
  console.log(instance.getSuperValue()); // false
  printChain(instance);
})();

// 　　[注意2]通过原型链实现继承时，不能使用对象字面量创建原型方法，这样做会重写原型链
(function() {
  console.log("\n---[注意2]通过原型链实现继承时，不能使用对象字面量创建原型方法，这样做会重写原型链");

  function SuperType() {
    this.property = true;
  }
  SuperType.prototype.getSuperValue = function() {
    return this.property;
  };

  function SubType() {
    this.subproperty = false;
  }
  // 继承了SuperType
  SubType.prototype = new SuperType();

  // 使用字面量方法添加新方法会导致上一行代码无效
  SubType.prototype = {
    getSubValue: function() {
      return this, subproperty;
    },
    someOtherMethod: function() {
      return false;
    }
  };
  var instance = new SubType();
  // console.log(instance.getSuperValue()); // error TypeError: instance.getSuperValue is not a function
  printChain(instance);
})();

// 　　[缺点1]在创建子类型的实例时，不能向超类型的构造函数中传递参数
// 　　[缺点2]包含引用类型值的原型属性会被所有实例共享
(function() {
  console.log("\n---[缺点1]在创建子类型的实例时，不能向超类型的构造函数中传递参数\n   [缺点2]包含引用类型值的原型属性会被所有实例共享");

  function SuperType() {
    this.colors = ['red', 'blue', 'green'];
  }

  function SubType() {}
  // 继承了SuperType
  SubType.prototype = new SuperType();
  var instance1 = new SubType();
  instance1.colors.push('black');
  console.log(instance1.colors); // 'red,blue,green,black'
  var instance2 = new SubType();
  console.log(instance2.colors); // 'red,blue,green,black'
  printChain(instance1);
  printChain(instance2);
})();

// 【2】【借用构造函数继承(又叫伪造对象或经典继承)】在子类型构造函数的内部调用超类型构造函数，
//      因此通过使用apply()和call()方法也可以在将来新创建的对象上执行构造函数
(function() {
  console.log("\n---【2】【借用构造函数继承(又叫伪造对象或经典继承)】");

  function SuperType() {
    this.colors = ['red', 'blue', 'green'];
  }

  function SubType() {
    // 继承了SuperType
    SuperType.call(this);
  }
  var instance1 = new SubType();
  instance1.colors.push('black');
  console.log(instance1.colors); // 'red,blue,green,black'
  var instance2 = new SubType();
  console.log(instance2.colors); // 'red,blue,green'
  printChain(instance1);
  printChain(instance2);
})();

// 　　[优点]传递参数
(function() {
  console.log("\n---[优点]传递参数");

  function SuperType(name) {
    this.name = name;
  }

  function SubType() {
    // 继承了SUperType,同时还传递了参数
    SuperType.call(this, "Nicholas");
    // 实例属性
    this.age = 29;
  }
  var instance = new SubType();
  console.log(instance.name); // "Nicholas"
  console.log(instance.age); // 29
  printChain(instance);
})();

// 　　[注意]为了确保SuperType构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性
(function() {
  console.log("\n---[注意]为了确保SuperType构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性");

  function SuperType(name) {
    this.name = name;
    this.age = 30;
  }

  function SubType() {
    // 实例属性
    this.age = 29;
    // 继承了SUperType,同时还传递了参数
    SuperType.call(this, "Nicholas");
    this.gender = 'male';
  }
  var instance = new SubType();
  // 实例属性被重写为SuperType构造函数的属性
  console.log(instance.age); // 30
  printChain(instance);
})();
// 　　[缺点1]无法实现函数复用
// 　　[缺点2]在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式

// 【3】【组合继承(又叫伪经典继承)】将原型链和借用构造函数的技术组合到一起，从而发挥二者之长的一种继承模式。
// 其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。
// 这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性，成为JavaScript中最常用的继承模式。
(function() {
  console.log("\n---【3】【组合继承(又叫伪经典继承)】");

  function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }
  SuperType.prototype.sayName = function() {
    console.log(this.name);
  };

  function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
  }
  // 继承方法
  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;
  SubType.prototype.sayAge = function() {
    console.log(this.age);
  };
  var instance1 = new SubType("Nicholas", 29);
  instance1.colors.push("black");
  console.log(instance1.colors); // 'red,blue,green,black'
  instance1.sayName(); // "Nicholas"
  instance1.sayAge(); // 29
  var instance2 = new SubType("Greg", 27);
  console.log(instance2.colors); // 'red,blue,green'
  instance2.sayName(); // "Greg"
  instance2.sayAge(); // 27
  printChain(instance1);
  printChain(instance2);
})();

// 　　[缺点]无论什么情况下，都会调用两次超类型构造函数:一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
//         子类型最终会包含超类型对象的全部实例属性，但不得不在调用子类型构造函数时重写这些属性。
(function() {
  console.log("\n---[缺点]无论什么情况下，都会调用两次超类型构造函数");

  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
    console.log(this);
  }
  SuperType.prototype.sayName = function() {
    console.log(this.name);
  };

  function SubType(name, age) {
    SuperType.call(this, name); // 第二次调用SuperType()
    this.age = age;
    console.log(this);
  }
  SubType.prototype = new SuperType(); // 第一次调用SuperType()
  SubType.prototype.constructor = SubType;
  SubType.prototype.sayAge = function() {
    console.log(this.age);
  };
  var instance1 = new SubType("Nicholas", 29);
  printChain(instance1);
})();

// 【4】【原型式继承】借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。从本质上讲，object()对传入其中的对象执行了一次浅复制。
// 　　[注意]原型式继承要求必须有一个对象可以作为另一个对象的基础，如果有这么一个对象的话，
//         可以把它传递给object()函数，然后再根据具体需求对得到的对象加以修改即可
(function() {
  console.log("\n---4】【原型式继承】");

  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }
  var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
  };
  var anotherPerson = object(person);
  anotherPerson.name = "Greg";
  anotherPerson.friends.push("Rob");

  var yetAnotherPerson = object(person);
  yetAnotherPerson.name = "Linda";
  yetAnotherPerson.friends.push("Barbie");

  console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
  printChain(person);
  printChain(anotherPerson);
  printChain(yetAnotherPerson);
})();

// 　　【4.1】【Object.create()方法】：ECMAScript5新增Object.create()方法规范化了原型式继承。
//           这个方法接收两个参数:一个用作新对象原型的对象和(可选的)一个为新对象定义额外属性的对象。
//           在传入一个参数情况下，Object.create()与object()方法的行为相同
(function() {
  console.log("\n---【4.1】【Object.create()方法】");

  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }
  var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
  };
  var anotherPerson = Object.create(person);
  anotherPerson.name = "Greg";
  anotherPerson.friends.push("Rob");
  var yetAnotherPerson = object(person);
  yetAnotherPerson.name = "Linda";
  yetAnotherPerson.friends.push("Barbie");
  console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
  printChain(person);
  printChain(anotherPerson);
  printChain(yetAnotherPerson);
})();

// 　　[注意]Object.create()方法的第二个参数与Object.defineProperties()方法的第二个参数格式相同:
//         每个属性都是通过自己的描述符定义的。以这种方式指定的任何属性都会覆盖原型对象上的同名属性。
(function() {
  console.log("\n---以这种方式指定的任何属性都会覆盖原型对象上的同名属性。");
  var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
  };
  var anotherPerson = Object.create(person, {
    name: {
      value: "Greg"
    }
  });
  console.log(anotherPerson.name); // "Greg"
  printChain(person);
  printChain(anotherPerson);
})();

// 　　【4.2】低版本浏览器下兼容Object.create()方法
(function() {
  console.log("\n---【4.2】低版本浏览器下兼容Object.create()方法");
  if (typeof Object.create != "function") {
    (function() {
      var F = function() {};
      Object.create = function(o) {
        if (arguments.length > 1) {
          throw Error('Second argument noe supported');
        }
        if (o === null) {
          throw Error("Cannot set a null [[Prototype]]");
        }
        if ('Object' !== (typeof o)) {
          throw TypeError("Arguments must be an object");
        }
        F.prototype = o;
        return new F();
      };
    })();
  }
})();

// 【5】【寄生式继承】创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象
// 　　[缺点]无法实现函数复用
(function() {
  console.log("\n---【5】【寄生式继承】");

  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  function createAnother(original) {
    var clone = object(original); // 通过调用函数创建一个新对象
    clone.sayHi = function() { // 以某种方式来增强这个对象
      console.log("hi");
    };
    return clone; // 返回这个对象
  }
  var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
  };
  var anotherPerson = createAnother(person);
  anotherPerson.sayHi(); // "hi"
  printChain(person);
  printChain(anotherPerson);
})();

// 【6】【寄生组合式继承】通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
// 其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，所需的无非就是超类型原型的一个副本而已。
// 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承是引用类型最理想的继承范式。
(function() {
  console.log("\n---【6】【寄生组合式继承】");
  // 这个例子中的高效率体现在它只调用了一次Super构造函数，并且因此避免了在SubType.prototype上面创建不必要的、多余的属性。
  // 与此同时，原型链还能保持不变。
  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 指定对象
  }

  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
    console.log(this);
  }
  SuperType.prototype.sayName = function() {
    console.log(this.name);
  };

  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
    console.log(this);
  }
  inheritPrototype(SubType, SuperType);
  SubType.prototype.sayAge = function() {
    console.log(this.age);
  };
  var instance = new SubType('Bolik', 37);
  printChain(instance);
})();

// javascript面向对象系列5——知识点(this的9种应用场景) -----------------------------

// 【场景1】全局环境中的this指向全局对象
(function() {
  console.log("\n---【场景1】全局环境中的this指向全局对象");
  this.a = 10;
  console.log(a); // 10
  b = 20;
  console.log(this.b); // 20
  var c = 30;
  console.log(this.c); // undefined
})();

// 【场景2】对象内部函数的this指向调用函数的当前对象
(function() {
  console.log("\n---【场景2】对象内部函数的this指向调用函数的当前对象");
  var a = 100;
  var bar = {
    a: 2000,
    test: function() {
      console.log(this.a);
    }
  };
  bar.test(); // 2000
})();

// 【场景3】全局环境函数的this指向全局对象
(function() {
  console.log("\n---【场景3】全局环境函数的this指向全局对象");
  this.a = 3000;

  function foo() {
    console.log(this.a);
  }
  foo(); // 3000
})();

// 【场景4】匿名函数中的this指向全局对象
(function() {
  console.log("\n---【场景4】匿名函数中的this指向全局对象");
  this.a = 4000;
  var foo = {
    a: 20,
    fn: (function() {
      console.log(this.a); // 4000
    })()
  };
  console.log(foo); // { a: 20, fn: undefined }
})();

// 【场景5】setInterval和setTimeout定时器中的this指向全局对象
this.a = 50000;
(function() {
  console.log("\n---【场景5】setInterval和setTimeout定时器中的this指向全局对象");
  this.a = 5000;
  var oTimer1 = setInterval(function() {
    var a = 20;
    console.log('【场景5】setInterval: ' + this.a); // undefined
    clearInterval(oTimer1);
  }, 100);
})();

// 【场景6】eval中的this指向调用上下文中的this
(function() {
  console.log("\n---【场景6】eval中的this指向调用上下文中的this");
  this.a = 6000;
  this.b = 6200;
  (function() {
    eval("console.log(this.a);"); // [object Window] 6000
  })();

  function Foo() {
    this.b = 6300;
    this.bar = function() {
      eval("console.log(this.b);"); // [object Object] 6300
    };
  }
  var foo = new Foo();
  foo.bar();
})();

// 【场景7】构造函数中的this指向构造出的新对象
(function() {
  console.log("\n---【场景7】构造函数中的this指向构造出的新对象");

  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
      console.log(this.name);
    };
  }
  var p1 = new Person('lily', '20');
  p1.sayName(); // 'lily'
})();

// 【场景8】new Function中的this指向全局对象
(function() {
  console.log("\n---【场景8】new Function中的this指向全局对象");

  this.a = 8000;
  this.b = 8200;
  (function() {
    var f = new Function("console.log(this.a)");
    f(); // [object Window]  8000
  })();

  function Foo() {
    this.bar = function() {
      var f = new Function("console.log(this.b)");
      f(); // [object Window]  8200
    };
  }
  var foo = new Foo();
  foo.bar();
})();

// 【场景9】apply和call中的this指向参数中的对象
(function() {
  console.log("\n---【场景9】apply和call中的this指向参数中的对象");
  this.a = 9000;
  var foo = {
    a: 9200,
    fn: function() {
      console.log(this.a); // undefined
    }
  };
  var bar = {
    a: 9300
  };
  foo.fn.apply(); // 9000(若参数为空，默认指向全局对象)
  foo.fn.apply(foo); // 9200
  foo.fn.apply(bar); // 9300
})();

// 【复合场景1】
(function() {
  console.log("\n---【复合场景1】");
  var someone = {
    name: "Bob",
    showName: function() {
      console.log(this.name);
    }
  };
  var other = {
    name: "Tom",
    showName: someone.showName
  };
  other.showName();　　 // Tom

  // 以上函数相当于
  var other2 = {
    name: "Tom2",
    showName: function() {
      console.log(this.name);
    }
  };
  other2.showName();　　 // Tom2
})();

// 【复合场景2】
(function() {
  console.log("\n---【复合场景2】");
  this.name = 20000;
  var a = {
    name: 30000,
    fn: (function() {
      console.log(this.name);
    })(),
    fn1: function() {
      console.log(this.name);
    }
  };
  a.fn(); // 20000[匿名函数中的this指向全局对象]
  a.fn1(); // 30000[对象内部函数的this指向调用函数的当前对象]
  console.log(a);
})();

// 【复合场景3】
(function() {
  console.log("\n---【复合场景3】");
  this.name = "Bob";
  var nameObj1 = {
    name: "Tom",
    showName: function() {
      console.log('【复合场景3】 ' + this.name);
    },
    waitShowName: function() {
      var that = this;
      setTimeout(function() {
        that.showName();
      }, 1000);
    }
  };
  nameObj1.waitShowName(); // "Tom"[that=this改变this的指向，使this从指向全局变量变化到指向nameObj]

  this.name = "Bob";
  var nameObj2 = {
    name: "Tom",
    showName: function() {
      console.log('showName: ' + this.name);
    },
    waitShowName: function() {
      var that = this; // that指向nameObj
      setTimeout(function() {
        (function() {
          console.log('【复合场景3】[形成匿名函数，this指向全局变量]: ' + this.name);
        })();
      }, 1000);
    }
  };

  nameObj2.waitShowName(); // 'Bob'[形成匿名函数，this指向全局变量]
})();

// javascript面向对象系列5——知识点(原型和原型链) -----------------
// 基本概念　　
// 　　【原型链】每个构造函数都有一个对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
//            那么，如果原型对象等于另一个原型的实例，此时的原型对象将包含一个指向另一个原型的指针，
//            相应地，另一个原型中也包含着一个指向另一个构造函数的指针。
//            如果另一个原型又是另一个原型的实例，那么上述关系依然成立。如此层层递进，就构成了实例与原型的链条。
// 　　【原型对象】这个对象包含可以由特定类型的所有实例共享的属性和方法。
//              所有引用类型默认都继承了Object，而这个继承也是通过原型链实现的。
//              所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype，
//              这也正是所有自定义类型都会继承toString()、valueOf()方法的原因

// 　　【构造函数】构造函数与其他函数的区别在于调用它们的方式不同。一般来说，函数只要通过new操作符来调用，
//              那它就可以作为构造函数；如果不通过new操作符来调用，那它跟普通函数也不会有什么两样。
// 　　　　[注意]用户自定义的函数和javascript中内置的构造函数可以当成构造函数使用
// 　　　　【构造函数的写法】构造函数始终应该以一个大写字母开头，而非构造函数以一个小写字母开头。这个做法借鉴自其他OO语言，
//                      主要是为了区别于ECMAScript中的其他函数;因为构造函数本身也是函数，只不过可以用来创建对象而已
// 　　　　【构造函数的三种使用场景】
// 　　　　　　[a]当作构造函数使用
// var person = new Person("Nicholas",29,"software Engineer");
// person.sayName();
// 　　　　　　[b]当作普通函数调用
// Person("greg",27,"doctor");// 添加到window
// window.sayName();// "Greg"
// 　　　　　　[c]在另一个对象的作用域中调用
// var o = new Object();
// Person.call(o,"Kristen",25,"Nurse");
// o.sayName();// "Kristen"

// 【prototype属性】只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。
// 　　　　[注意]只有函数才有prototype属性，object没有prototype属性

// 　　【constructor属性】在默认情况下，所有原型对象都会自动获得一个constructor(构造函数)属性，这个属性包含一个指向prototype属性所在函数的指针
// 　　　　[注意]创建了自定义的构造函数之后，其原型对象默认只会取得constructor属性，至于其他方法则都是从Object继承而来的

// 　　【_proto_和[[prototype]]】当调用构造函数创建一个新实例后，该实例的内部将包含一个指针(内部属性)，指向构造函数的原型对象。
//         ECMA-262第5版管这个指针叫[[prototype]]。虽然在脚本中标准的方式访问[[prototype]]，
//         但firefox\safari\chrome在每个对象上都支持一个属性_proto_;而在其他实现中，这个属性对脚本则是完全不可见的。
//         这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间

// 基本操作　　

// 　　【原型链查询】每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。
//               搜索首先从对象实例本身开始，如果在实例中找到了具有给定名字的属性，则返回该属性的值；
//               如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性，如果找到了这个属性，则返回该属性的值。
//
//
// 　　【添加实例属性】当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；
//                 换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性，
//                 即使将这个属性设置为null,也只会在实例中设置这个属性，而不会恢复其指向原型的连接。
//                 不过，使用delete操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性。

// 　　【原型的动态性】由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能立即从实例上反映出来，
//                 即使是先创建了实例后修改原型也照样如此。
// 　　　　[注意]不推荐在产品化的程序中修改原生对象的原型
(function() {
  console.log("\n---[注意]不推荐在产品化的程序中修改原生对象的原型");

  function Person() {}
  var friend = new Person();
  Person.prototype.sayHi = function() {
    console.log('hi');
  };
  friend.sayHi(); // "hi"
})();
// 　　【重写原型】调用构造函数时会为实例添加一个指向最初原型的[[prototype]]指针，
//              而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。实例中的指针仅指向原型，而不指向构造函数。

// 基本方法　　
// 　　[1]isPrototypeOf()：判断实例对象和原型对象是否存在于同一原型链中，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型
(function() {
  console.log("\n---[1]isPrototypeOf()");

  function Person() {}
  var person1 = new Person();
  var person2 = new Object();
  console.log(Person.prototype.isPrototypeOf(person1)); // true
  console.log(Object.prototype.isPrototypeOf(person1)); // true
  console.log(Person.prototype.isPrototypeOf(person2)); // false
  console.log(Object.prototype.isPrototypeOf(person2)); // true
})();

// 　　[2]ECMAScript5新增方法Object.getPrototypeOf():这个方法返回[[Prototype]]的值
(function() {
  console.log("\n---[2]ECMAScript5新增方法Object.getPrototypeOf()");

  function Person() {}
  var person1 = new Person();
  var person2 = new Object();
  console.log(Object.getPrototypeOf(person1)); // Person{}
  console.log(Object.getPrototypeOf(person1) === Person.prototype); // true
  console.log(Object.getPrototypeOf(person1) === Object.prototype); // false
  console.log(Object.getPrototypeOf(person2)); // {}
})();

// 　　[3]hasOwnProperty():检测一个属性是否存在于实例中
(function() {
  console.log("\n---[3]hasOwnProperty()");

  function Person() {
    Person.prototype.name = 'Nicholas';
  }
  var person1 = new Person();
  // 不存在实例中，但存在原型中
  console.log(person1.hasOwnProperty("name")); // false
  // 不存在实例中，也不存在原型中
  console.log(person1.hasOwnProperty("no")); // false
  person1.name = 'Greg';
  console.log(person1.name); // 'Greg'
  console.log(person1.hasOwnProperty('name')); // true
  delete person1.name;
  console.log(person1.name); // "Nicholas"
  console.log(person1.hasOwnProperty('name')); // false
})();

// 　　[4]ECMAScript5的Object.getOwnPropertyDescriptor():只能用于取得实例属性的描述符，要取得原型属性的描述符，
//       必须直接在原型对象上调用Object.getOwnPropertyDescription()方法
(function() {
  console.log("\n---[4]ECMAScript5的Object.getOwnPropertyDescriptor()");

  function Person() {
    Person.prototype.name = 'Nicholas';
  }
  var person1 = new Person();
  person1.name = 'cook';
  console.log(Object.getOwnPropertyDescriptor(person1, "name"));
  // {value: "cook", writable: true, enumerable: true, configurable: true}
  console.log(Object.getOwnPropertyDescriptor(Person.prototype, "name"));
  // {value: "Nicholas", writable: true, enumerable: true, configurable: true}
})();

// 　　[5]in操作符:在通过对象能够访问给定属性时返回true，无论该属性存在于实例还是原型中
(function() {
  console.log("\n---[5]in操作符");

  function Person() {}
  var person1 = new Person();
  person1.name = 'cook';
  console.log("name" in person1); // true
  console.log("name" in Person.prototype); // false
  var person2 = new Person();
  Person.prototype.name = 'cook';
  console.log("name" in person2); // true
  console.log("name" in Person.prototype); // true
})();

// 　　[6]同时使用hasOwnProperty()方法和in操作符，来确定属性是否存在于实例中
(function() {
  console.log("\n---[6]同时使用hasOwnProperty()方法和in操作符");
  // hasOwnProperty()返回false,且in操作符返回true，则函数返回true，判定是原型中的属性
  function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
  }

  function Person() {
    Person.prototype.name = 'Nicholas';
  }
  var person1 = new Person();
  console.log(hasPrototypeProperty(person1, 'name')); // true
  person1.name = 'cook';
  console.log(hasPrototypeProperty(person1, 'name')); // false
  delete person1.name;
  console.log(hasPrototypeProperty(person1, 'name')); // true
  delete Person.prototype.name;
  console.log(hasPrototypeProperty(person1, 'name')); // false
})();

// 　　[7]ECMAScript5的Object.keys()方法:接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组
// 　　　　[注意]一定要先new出实例对象再使用该方法，否则为空
(function() {
  console.log("\n---[7]ECMAScript5的Object.keys()方法");

  function Person() {
    Person.prototype.name = 'Nicholas';
    Person.prototype.age = 29;
    Person.prototype.job = 'Software Engineer';
    Person.prototype.sayName = function() {
      console.log(this.name);
    };
  }
  var keys = Object.keys(Person.prototype);
  console.log(keys); // []
  var p1 = new Person();
  p1.name = "Rob";
  p1.age = 31;
  keys = Object.keys(Person.prototype);
  console.log(keys); // ["name","age","job","sayName"]
  var p1Keys = Object.keys(p1);
  console.log(p1Keys); // ["name","age"]
})();

// 　　[8]ECMAScript5的Object.getOwnPropertyNames()方法:接收一个对象作为参数，返回一个包含所有属性的字符串数组
// 　　　　[注意]一定要先new出实例对象再使用该方法，否则只有constructor
(function() {
  console.log("\n---[8]ECMAScript5的Object.getOwnPropertyNames()方法");

  function Person() {
    Person.prototype.name = 'Nicholas';
    Person.prototype.age = 29;
    Person.prototype.job = 'Software Engineer';
    Person.prototype.sayName = function() {
      console.log(this.name);
    };
  }
  var keys = Object.getOwnPropertyNames(Person.prototype);
  console.log(keys); // ["constructor"]
  var p1 = new Person();
  keys = Object.getOwnPropertyNames(Person.prototype);
  console.log(keys); // ["constructor", "name", "age", "job", "sayName"]
})();

(function() {
  console.log("\n---");

})();


(function() {
  console.log("\n---");

})();

(function() {
  console.log("\n---");

})();

(function() {
  console.log("\n---");

})();
