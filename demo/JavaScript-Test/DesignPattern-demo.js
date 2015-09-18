// 《Practical Common Lisp》的作者 Peter Seibel 曾说，如果你需要一种模式，那一定是哪里出了问题。
// 他所说的问题是指因为语言的天生缺陷，不得不去寻求和总结一种通用的解决方案。


// 单例模式 ----------
// 单例模式的定义是产生一个类的唯一实例，但js本身是一种“无类”语言。
// 很多讲js设计模式的文章把{}当成一个单例来使用也勉强说得通。
// 用一个变量来保存第一次的返回值, 如果它已经被赋值过, 那么在以后的调用中优先返回该变量.
// 而真正创建对象的代码是通过回调函数的方式传人到singleton包装器中的. 这种方式其实叫桥接模式.
var singleton = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
};
// 然而singleton函数也不是完美的, 它始终还是需要一个变量result来寄存div的引用.
// 遗憾的是js的函数式特性还不足以完全的消除声明和语句.
// var createMask = singleton(function() {
//   return document.body.appendChild(document.createElement('div'));
// });

// 简单工厂模式 ----------
// 简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些实例经常都拥有相同的接口.
// 这种模式主要用在所实例化的类型在编译期并不能确定， 而是在执行期决定的情况。
// 说的通俗点，就像公司茶水间的饮料机，要咖啡还是牛奶取决于你按哪个按钮。
function ObjectFactory() {
  var obj = {};
  var Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = typeof Constructor.prototype === 'number' ? Object.prototype : Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}

// function A(name) {
//   this.name = name;
// }
// var a = ObjectFactory(A, 'svenzeng');
// console.log(a.name); //svenzeng

// 观察者模式 ----------
// 观察者模式( 又叫发布者-订阅者模式 )应该是最常用的模式之一. 在很多语言里都得到大量应用.
// 包括我们平时接触的dom事件. 也是js和dom之间实现的一种观察者模式.
Events = function() {
  var listen, log, obj, one, remove, trigger, __this;
  obj = {};
  __this = this;

  listen = function(key, eventfn) { //把简历扔盒子, key就是联系方式.
    var stack, _ref; //stack是盒子
    stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
    return stack.push(eventfn);
  };

  one = function(key, eventfn) {
    remove(key);
    return listen(key, eventfn);
  };

  remove = function(key) {
    var _ref;
    return (_ref = obj[key]) != null ? _ref.length = 0 : void 0;
  };

  trigger = function() { //面试官打电话通知面试者
    var fn, stack, _i, _len, _ref, key;
    key = Array.prototype.shift.call(arguments);
    stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
    for (_i = 0, _len = stack.length; _i < _len; _i++) {
      fn = stack[_i];
      if (fn.apply(__this, arguments) === false) {
        return false;
      }
    }
  };
  return {
    listen: listen,
    one: one,
    remove: remove,
    trigger: trigger
  };
};
// // Sample
// var adultTv = Events();
// console.log(adultTv);
// adultTv.listen('play', function(data) {
//   console.log("今天是谁的电影？：" + data.name);
// });
// //发布者
// adultTv.trigger('play', {
//   'name': '麻生希'
// });

// 适配器模式 ----------
// 适配器模式的作用很像一个转接口

// 代理模式 ----------
// 代理模式的定义是把对一个对象的访问, 交给另一个代理对象来操作

// 桥接模式 ----------
// 桥接模式的作用在于将实现部分和抽象部分分离开来，以便两者可以独立的变化。
// 在实现api的时候， 桥接模式特别有用。
forEach = function(ary, fn) {
  for (var i = 0, l = ary.length; i < l; i++) {
    var c = ary[i];
    if (fn.call(c, i, c) === false) {
      return false;
    }
  }
};
// forEach([1, 2, 3], function(i, n) {
//   console.log(n * 2);
// });

// 外观模式
// 外观模式(门面模式)，是一种相对简单而又无处不在的模式。
// 外观模式提供一个高层接口，这个接口使得客户端或子系统更加方便调用。
var stopEvent = function(e) { // 同时阻止事件默认行为和冒泡
  e.stopPropagation();
  e.preventDefault();
};

// 访问者模式 ----------
// GOF官方定义： 访问者模式是表示一个作用于某个对象结构中的各元素的操作。
// 它使可以在不改变各元素的类的前提下定义作用于这些元素的新操作。
// 我们在使用一些操作对不同的对象进行处理时，往往会根据不同的对象选择不同的处理方法和过程。
// 在实际的代码过程中，我们可以发现，如果让所有的操作分散到各个对象中，整个系统会变得难以维护和修改。
// 且增加新的操作通常都要重新编译所有的类。
// 因此，为了解决这个问题，我们可以将每一个类中的相关操作提取出来，包装成一个独立的对象，这个对象我们就称为访问者（Visitor）。
// 利用访问者，对访问的元素进行某些操作时，只需将此对象作为参数传递给当前访问者，
// 然后，访问者会依据被访问者的具体信息，进行相关的操作。

// 据统计，上面这段话只有5%的人会看到最后一句。
// 那么通俗点讲，访问者模式先把一些可复用的行为抽象到一个函数(对象)里，这个函数我们就称为访问者（Visitor）。
// 如果另外一些对象要调用这个函数，只需要把那些对象当作参数传给这个函数，
// 在js里我们经常通过call或者apply的方式传递this对象给一个Visitor函数.

// 利用访问者，我们来做个有趣的事情. 给一个object对象增加push方法.
var Visitor = {};
Visitor.push = function() {
  return Array.prototype.push.apply(this, arguments);
};
// var obj = {};
// obj.push = Visitor.push;
// obj.push("first");
// console.log(obj[0]); // first
// console.log(obj.length); // 1

// 策略模式 ---------
// 策略模式的意义是定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。
// nameInput.addValidata({
//    notNull: true,
//    dirtyWords: true,
//    maxLength: 30
// });
// 而notNull，maxLength等方法只需要统一的返回true或者false，来表示是否通过了验证。
validataList = {
  notNull: function(value) {
    return value !== '';
  },
  maxLength: function(value, maxLen) {
    return value.length() > maxLen;
  }
};

// 模版方法模式 ----------
// 模式方法是预先定义一组算法，先把算法的不变部分抽象到父类，再将另外一些可变的步骤延迟到子类去实现。
// 听起来有点像工厂模式( 非前面说过的简单工厂模式 ).
// 最大的区别是,工厂模式的意图是根据子类的实现最终获得一种对象. 而模版方法模式着重于父类对子类的控制.

// 按GOF的描叙，模版方法导致一种反向的控制结构，这种结构有时被称为“好莱坞法则”，即“别找我们，我们找你”。
// 这指的是一个父类调用一个子类的操作，而不是相反。
var Life = function() {};
Life.prototype.init = function() {
  this.DNA复制();
  this.出生();
  this.成长();
  this.衰老();
  this.死亡();
};
Life.prototype.DNA复制 = function() {
  // &*$%&^%^&(&(&(&&(^^(*);  //看不懂的代码
};
Life.prototype.出生 = function() {};
Life.prototype.成长 = function() {};
Life.prototype.衰老 = function() {};
Life.prototype.死亡 = function() {};

var Mammal = function() {};
Mammal.prototype = Life.prototype; //继承Life
Mammal.prototype.出生 = function() {
  console.log('胎生');
};
Mammal.prototype.成长 = function() {
  //再留给子类去实现
};
Mammal.prototype.衰老 = function() {
  console.log('自由基的过氧化反应');
};
Life.prototype.死亡 = function() {
  //再留给子类去实现
};
//再实现一个Dog类
var Dog = function() {};
//Dog继承自哺乳动物.
Dog.prototype = Mammal.prototype;
var dog = new Dog();
dog.init();

// 中介者模式 ----------
// 中介者对象可以让各个对象之间不需要显示的相互引用，从而使其耦合松散，而且可以独立的改变它们之间的交互。
// var mode1 = Mode.create(),
//   mode2 = Mode.create();
// var view1 = View.create(),
//   view2 = View.create();
// var controler1 = Controler.create(mode1, view1, function() {
//   view1.el.find('div').bind('click', function() {
//     this.innerHTML = mode1.find('data');
//   });
// });
// var controler2 = Controler.create(mode2, view2, function() {
//   view1.el.find('div').bind('click', function() {
//     this.innerHTML = mode2.find('data');
//   });
// });

// 迭代器模式 ----------
// 迭代器模式提供一种方法顺序访问一个聚合对象中各个元素，而又不需要暴露该方法中的内部表示。
ObjectForEach = function(obj, fn) {
  for (var i in obj) {
    var c = obj[i];
    if (fn.call(c, i, c) === false) {
      return false;
    }
  }
};
// ObjectForEach({
//   "a": 1,
//   "b": 2
// }, function(i, n) {
//   console.log(i);
// });

// 组合模式 ----------
// 组合模式又叫部分-整体模式，它将所有对象组合成树形结构。
// 使得用户只需要操作最上层的接口，就可以对所有成员做相同的操作。

// 备忘录模式 ----------
// 备忘录模式在js中经常用于数据缓存.
// 比如一个分页控件, 从服务器获得某一页的数据后可以存入缓存。
// 以后再翻回这一页的时候，可以直接使用缓存里的数据而无需再次请求服务器。
// 实现比较简单，伪代码：
var Page = function() {
  var page = 1,
    cache = {},
    data;
  return function(page) {
    if (cache[page]) {
      data = cache[page];
      render(data);
    } else {
      Ajax.send('cgi.xx.com/xxx', function(data) {
        cache[page] = data;
        render(data);
      });
    }
  };
}();

// 职责链模式 ----------
// 职责链模式是一个对象A向另一个对象B发起请求，如果B不处理，可以把请求转给C，如果C不处理，又可以把请求转给D。
// 一直到有一个对象愿意处理这个请求为止。

// 享元模式 ----------
// 享元模式主要用来减少程序所需的对象个数.
// 有一个例子, 我们这边的前端同学几乎人手一本《javascript权威指南》.
// 从省钱的角度讲, 大约三本就够了. 放在部门的书柜里, 谁需要看的时候就去拿, 看完了还回去.
// 如果同时有4个同学需要看, 此时再去多买一本.
// var getDiv = (function() {
//   var created = [];
//   var create = function() {
//     return document.body.appendChild(document.createElement('div'));
//   };
//   var get = function() {
//     if (created.length) {
//       return created.shift();
//     } else {
//       return create();
//     }
//   };
//   /* 一个假设的事件，用来监听刚消失在视线外的div，实际上可以通过监听滚                                     动条位置来实现 */
//   userInfoContainer.disappear(function(div) {
//     created.push(div);
//   });
// })();
// var div = getDiv();
// div.innerHTML = "${userinfo}";

// 状态模式 ----------
// 状态模式主要可以用于这种场景
// 1 一个对象的行为取决于它的状态
// 2 一个操作中含有庞大的条件分支语句
var StateManager = function() {
  var currState = 'wait';
  var states = {
    jump: function(state) {},
    wait: function(state) {},
    attack: function(state) {},
    crouch: function(state) {},
    defense: function(state) {
      if (currState === 'jump') {
        return false; //不成功，跳跃的时候不能防御
      }
      //do something;     //防御的真正逻辑代码, 为了防止状态类的代码过多, 应该把这些逻辑继续扔给真正的fight类来执行.
      currState = 'defense'; //  切换状态
    }
  };
  var changeState = function(state) {
    // states[state] && states[state]();
  };
  return {
    changeState: changeState
  };
};
var stateManager = StateManager();
stateManager.changeState('defense');
