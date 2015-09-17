// JavaScript设计模式——前奏

Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
};
var Anim = function() {
  //----
};
Anim.method("start", function() {
  //----
});
Anim.method("stop", function() {
  //----
});

//方法的链式调用

Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
  return this;
};
var Anim = function() {
  //----
};
Anim.method("start", function() {
  //----
}).method("stop", function() {
  //----
});

// 一：首先，再回顾一下JavaScript：
// 1.数据类型
// 　　原始类型：布尔型、数值型、字符串类型
// 　　在就包括：对象类型（数组是一种特殊的对象）、函数类型
// 　　最后就是：空类型（null）、未定义类型（undefind）
// 　　注意：原始类型按值传送，其他数据类型则按引用传送。　　
//
// 　　toString() 数值或者布尔类型转换成字符串类型。
// 　　parseInt()   parseFloat() 把字符串转换成数值。
// 　　双重非（var bool = !! num;） 把字符串转换成布尔值。
console.log(!!123);
console.log(!!0); // false
console.log(!!'1');
console.log(!!''); // false
console.log(!!'0');

// 2. 闭包：
// 　　闭包是一个受保护的变量空间，由内嵌函数生成。JavaScript具有函数级的作用域。这意味着函数内部的变量函数外部不能访问。
//    JavaScript的作用域是词法性质的。这意味着函数运行在定义它的作用域中，而不是在调用它的作用域中。这样就可以创建私有变量：
var baz;
(function() {
  var foo = 11;
  var bar = 22;
  baz = function() {
    return foo * bar;
  };
})();
console.log(baz());

var baz = function() {
  var foo = 111;
  var bar = 222;
  return function() {
    return foo * bar;
  };
}();
console.log(baz());

// 3. 对象的易变性：
// 　　对实例化的对象进行扩展。比如给一个实例加一个方法或者给一个函数加一条属性。
// 　　与之相关的还有内省的概念：可以在运行时检查对象所具有的属性和方法，还可以使用这种信息动态实例化类和执行其方法。
//                        （这种技术称为反射）---（我对此的概念有点模糊，日后补充。嘿嘿......）

// 二：接口：
// 　　JavaScript模仿接口的三种方法：注释法、属性检查法、鸭式辨型法。
// 　　1.注释法：
// 　　注释法简单，但是，嘿嘿。效果最差。
/*
    interface jk{
        function add(child);
        function remove(child);
        function get(child);
    }
    */
var sx = function() {
  //------
};
sx.prototype.add = function() {
  //------
};
sx.prototype.remove = function() {
  //------
};
sx.prototype.get = function() {
  //------
};

// 　　2.属性检查法：
/*
     interface jk{
        function add(child);
        function remove(child);
        function get(child);
     }
     interface jk_two{
        function save(child);
     }
     */
var sx = function(id, method, action) {
  this.impletementsInterfaces = ['jk', 'jk_two'];
};

function addForm(formInstance) {
  if (!impletements(formInstance, 'jk', 'jk_two')) {
    throw new Error("Object does not implement a required interface.");
  }
}

function impletements(object) {
  for (var i = 1; i < arguments.length; i++) {
    var interfaceName = arguments[i];
    var interfaceFound = fale;
    for (var j = 0; j < object.impletementsInterfaces.length; j++) {
      if (object.impletementsInterfaces[j] == interfaceName) {
        interfaceFound = true;
        break;
      }
    }
    if (!interfaceFound) {
      return false;
    }
  }
  return true;
}

//  　3.鸭式辨型法：
//----下面是Interface类
var Interface = function(name, methods) {
  if (arguments.length != 2) {
    throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
  }

  this.name = name;
  this.methods = [];
  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== 'string') {
      //接口构造函数希望将方法名称传递给字符串
      throw new Error("Interface constructor expects method names to be" + "passed in as a string");
    }
    this.methods.push(methods[i]);
  }
};
//静态类方法
Interface.ensureImplements = function(object) {
  if (arguments.length < 2) {
    //函数 interface.ensureimplements 称有2个参数，但预计至少2。
    throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
  }
  for (var i = 1, len = arguments.length; i < len; i++) {
    var interface = arguments[i];
    if (interface.constructor !== Interface) {
      throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
    }
    for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
      var method = interface.methods[j];
      if (!object[method] || typeof object[method] !== 'function') {
        //没有继承 xx 接口，方法 xx 没有发现
        throw new Error("Function Interface.ensureImplements:object does not implement the " + interface.name + " interface.Method" + method + " was not found.");
      }
    }
  }
};

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

var CompositeForm = function(id, method, action) {
  //.......
};

function addForm(formInstance) {
  Interface.ensureImplements(formInstance, Composite, FormItem);
  //如果有一个接口的方法没有被继承，这个方法会抛出一个错误。。。。
}

// 三：封装和信息隐藏：
// 信息隐藏用来进行解耦，定义一些私有的数据和方法。
// 封装是用来实现信息隐藏的技术，通过闭包实现私有数据的定义和使用。
// 接口在这其中扮演的角色是：提供一份记载着可公众访问的方法的契约，它定义了两个对象间可以具有的关系。

// 接下来介绍一下创建对象的基本模式：
// 基本模式有3种：门户大开型、用下划线表示方法和属性的私用性、闭包创建私用成员
// 1.门户大开型：
// 所谓门户大开，即，用一个函数来做构造器，所有方法和属性都是公开的。
//定义接口
var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle', 'setTitle', 'getAuthor', 'setAuthor', 'display']);
//implements Publication
var Book = function(isbn, title, author) {
  this.setIsbn(isbn);
  this.setTitle(title);
  this.setAuthor(author);
};
Book.prototype = {
  checkIsbn: function(isbn) {
    //.....检查isbn的格式是否规范
  },
  getIsbn: function() {
    return this.isbn;
  },
  getTitle: function() {
    return this.title;
  },
  getAuthor: function() {
    return this.author;
  },
  setIsbn: function(isbn) {
    if (!this.checkIsbn(isbn)) throw new Error('Book: Invalid ISBN');
    this.isbn = isbn;
  },
  setTitle: function(title) {
    this.title = title || "no title specified";
  },
  setAuthor: function(author) {
    this.author = author || "no author specified";
  },
  display: function() {
    //..............
    console.log(this.getIsbn() + this.getTitle() + this.getAuthor());
  }
};
// 这种方法看似很完善了，但是对于里面的属性还是可以进行修改的，isbn亦可能被赋值为一个无效值。

// 2.用一个函数来做构造器（用命名规范区别私用成员）
// 这个方法和上面的方法如出一辙，就是给私有成员加一个下划线。
// 就不做详细的讨论了。

// 3.作用域、嵌套和闭包
//implements Publication
var Book = function(newisbn, newtitle, newauthor) {
  //私有成员
  var isbn, title, author;

  //私有方法
  function checkIsbn(isbn) {
    //.....检查isbn的格式是否规范
    //.......
  }

  //特权方法
  this.getIsbn = function() {
    return isbn;
  };
  this.getTitle = function() {
    return title;
  };
  this.getAuthor = function() {
    return author;
  };
  this.setIsbn = function() {
    if (!checkIsbn(newisbn)) throw new Error('Book: Invalid ISBN');
    isbn = newisbn;
  };
  this.setTitle = function() {
    title = newtitle;
  };
  this.setAuthor = function() {
    author = newauthor;
  };

  //构造
  this.setIsbn(newisbn);
  this.setAuthor(newauthor);
  this.setTitle(newtitle);
};

Book.prototype = {
  display: function() {
    //..............
  }
};

// 这种方法存在一个问题。前面的门户大开型方法对象创建模式中，所有的方法都创建在原型对象上，因此不管生成多少对象实例，这些方法在内存中只会存在一份。
// 而这种方法每次生成一个新的对象实例都会为每一个私用方法和特权方法生成一个新的副本。这种做法会浪费更多的内存。
// 这种对象创建模式不利于派生子类。（继承破坏封装.....）

// 最后总结一下:
// 私有属性和方法：函数有作用域，在函数内用var 关键字声明的变量在外部无法访问，私有属性和方法本质就是你希望在对象外部无法访问的变量。
// 特权属性和方法：创建属性和方法时使用的this关键字，因为这些方法定义在构造器的作用域中，所以它们可以访问到私有属性和方法；
//              只有那些需要直接访问私有成员的方法才应该被设计为特权方法。
// 共有属性和方法：直接链在prototype上的属性和方法，不可以访问构造器内的私有成员，可以访问特权成员，子类会继承所有的共有方法。
// 共有静态属性和方法：最好的理解方式就是把它想象成一个命名空间，实际上相当于把构造器作为命名空间来使用。

// 四：继承：
// 1.类式继承  （组合继承）
//超级类（父类）
function Persion(name) {
  this.name = name;
}
Persion.prototype.getName = function() {
  return this.name;
};

//（子类）
function Author(name, books) {
  Persion.call(this, name); //调用超类的构造函数，把name作为参数传过去
  this.books = books;
}
Author.prototype = new Persion(); //子类的原型指向超类的实例，同时就会拥有超类的原型所指向的内存所拥有的方法和属性。
Author.prototype.constructor = Author; //因为子类的原型对象等于超类的实例，所以prototype.constructor这个方法也等于超类构造函数,所以要重新指定constructor.
Author.prototype.getBooks = function() {
  return this.books;
};
// 首先创建构造函数，然后创建子类，通过call(this，arguments)来调用构造函数。
// 然后设置原型链，js没有extend， so........ 就用prototype 来做继承。
// 关于原型，不理解就自己看书吧，基础......要扎实........
// 子类的prototype是一个实例，就会拥有父类的prototype 属性，然后通过父类的prototype来找这块内存中存在的方法或者属性。

// 为了简化类的声明，可以把派生子类的整个过程包装在一个extend的函数中。
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = new superClass.prototype();
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
}

// 但是，这样终究存在一个问题。就是超类的名称（Person）被固化在了Author类的声明中.......很难受啊.....................但是有个更好的方法
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = new superClass.prototype();
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;

  subClass.superclass = superClass.prototype; //添加superclass属性
  if (superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass; //--------懂吗？？？？不懂自己看.....我也不是很懂......
  }
}

function Author(name, books) {
  Author.superclass.constructor.call(this, name);
  this.books = books;
}
extend(Author, Persion);
Author.prototype.getBooks = function() {
  return this.books;
};

// 有了superclass属性，就可以直接调用超类中的方法。它的好处在哪里呢，哈哈哈....当想重定义一个和超类重名的方法时，
// 就可以先用superclass属性来调用原来的重名的方法，然后在处理。
Author.prototype.getName = function() {
  //为什么要加一个call呢？唉...又不懂了吧..真的是（当然是this的作用域问题，要取Author的name属性）
  var name = Author.superclass.constructor.getName.call(this);
  return name + ",Author of" + this.getBooks().join(',');
};
// 类式继承用到了原型链....原型链不懂的自己研究去吧.....

// 2.原型式继承
/* -- 原型式继承 -- */
//clone()函数用来创建新的类Person对象
var clone = function(obj) {
  var _f = function() {};
  //这句是原型式继承最核心的地方，函数的原型对象为对象字面量
  _f.prototype = obj;
  return new _f();
};
//先声明一个对象字面量
var Person = {
  name: 'Darren',
  getName: function() {
    return this.name;
  }
};
//不需要定义一个Person的子类，只要执行一次克隆即可
var Programmer = clone(Person);
//可以直接获得Person提供的默认值，也可以添加或者修改属性和方法
console.log(Programmer.getName());
Programmer.name = 'Darren2';
console.log(Programmer.getName());

//声明子类,执行一次克隆即可
var Someone = clone(Programmer);

// 总结：
// 类式继承（组合继承）：使用原型链继承共享的属性和方法，而通过借用构造函数（   call( _ , _ )   ）继承实例属性.
// 原型式继承：可以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅复制。而复制得到的副本还可以得到进一步改造。
// 寄生式继承：
// 寄生组合式继承：

// 类式继承，子类的原型指向一个父类的实例；原型式继承，子类的原型指向了父类的一个对象字面量（浅复制）。（子类都可能对父类的属性和方法进行修改。）
// 原型式继承会更省内存：被克隆出来的对象都共享每个属性和方法的唯一一份实例。而类式继承创建的每一个对象在内存中都有自己的一套属性（和私用方法）的副本。
