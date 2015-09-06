// 简单的说，闭包就是内部函数一直拥有父函数作用域的访问权限，即使父函数已经返回。

// 简单来说闭包拥有三个特性：
// 1.函数嵌套函数
// 2.函数内部可以引用外部的参数和变量
// 3.参数和变量不会被垃圾回收机制回收

// 闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量。
// 使用闭包有一个优点，也是它的缺点，就是可以把局部变量驻留在内存中，可以避免使用全局变量。
// 全局变量在每个模块都可调用，这势必将是灾难性的。（所以推荐使用私有的，封装的局部变量。）
// 一般函数执行完毕后，局部活动对象就被销毁，内存中仅仅保存全局作用域。但闭包的情况不同！

// 我觉得这段说明也很精彩：js里的函数在运行结束之后，所有的过程中产生的变量都会被销毁（销毁原则是无引用）
// 但在js的函数A里定义一个函数B并在外部引用时，这条引用链上的变量都不会销毁（即使A已经运行结束），这个函数B就叫做一个闭包。
(function() {
  console.log("\n---闭包很好地避免了全局变量的使用，避免了全局变量的污染。");

  function fn() {
    var a = 0;

    function f() {
      console.log(a++);
    }
    return f;
  }

  var b = fn();
  b(); // 0
  b(); // 1
  b(); // 2
  // 首先要明确f函数即是所谓的闭包，我们看到它嵌套在fn函数内，而且访问了外部的变量a，同时console的结果也证明了变量a贮存在了内存中！
  // 为什么会这样呢？原因在于f被赋予给了一个全局变量b，导致始终存在在内存中，而f的存在必须依赖于fn，这导致fn也始终存在在内存中，于是变量a不会在执行后被垃圾回收机制回收。
  // 以上例子很好地避免了全局变量的使用，避免了全局变量的污染。

  // 闭包还可用于模块化代码，减少全局变量的污染：
  var abc = (function() { //abc为外部匿名函数的返回值
    var a = 1;
    return function() {
      a++;
      console.log(a);
    }
  })();
  abc(); //2
  abc(); //3

  // 闭包还可用于设置私有成员：
  var obj = function() {
    var num = 0;

    function a() {
      num++;
      return num;
    }

    function b() {
      num++;
      return num;
    }

    return {
      a: a,
      b: b
    }
  }();

  console.log(obj.a()); // 1
  console.log(obj.b()); // 2
  // 这样就无法修改num的值了，保护了私有成员。
})();

(function() {
  console.log("\n---闭包很好地避免了全局变量的使用，避免了全局变量的污染。");

  function outerFn() {
    var a = 0;

    function innerFn() {
      console.log(a++);
    }
    return innerFn;
  }

  var fn = outerFn();
  fn(); // 0
  fn(); // 1

  // 这里并没有在outerFn内部修改全局变量，而是从outerFn中返回了一个对innerFn的引用。
  // 通过调用outerFn能够获得这个引用，而且这个引用可以可以保存在变量中。
  // 这种即使离开函数作用域的情况下仍然能够通过引用调用内部函数的事实，意味着只要存在调用内部函数的可能，JavaScript就需要保留被引用的函数。
  // 而且JavaScript运行时需要跟踪引用这个内部函数的所有变量，直到最后一个变量废弃，JavaScript的垃圾收集器才能释放相应的内存空间。

  // 让我们说的更透彻一些。所谓“闭包”，就是在构造函数体内定义另外的函数作为目标对象的方法函数，而这个对象的方法函数反过来引用外层函数体中的临时变量。
  // 这使得只要目标对象在生存期内始终能保持其方法，就能间接保持原构造函数体当时用到的临时变量值。
  // 尽管最开始的构造函数调用已经结束，临时变量的名称也都消失了，但在目标对象的方法内却始终能引用到该变量的值，而且该值只能通这种方法来访问。
  // 即使再次调用相同的构造函数，但只会生成新对象和方法，新的临时变量只是对应新的值，和上次那次调用的是各自独立的。
})();

(function() {
  console.log("---闭包原理的经典例子");

  function createComparison(propertyName) {
    return function(obj1, obj2) {
      var item1 = obj1[propertyName];
      var item2 = obj2[propertyName];

      if (item1 < item2)
        return -1;

      if (item1 > item2)
        return 1;

      if (item1 == item2)
        return 0;
    }
  }

  //比较name
  var person1 = {
    name: "d",
    age: 20
  };
  var person2 = {
    name: "c",
    age: 27
  };
  var compare1 = createComparison("name");
  var compare2 = createComparison("age");

  console.log(compare1(person1, person2));
  console.log(compare2(person1, person2));
  // 闭包原理的经典例子，经典在哪里？如例子中我使用compare时，我的function是可以访问到createComparison函数中的propertyName字段的，
  // 其实这个理解并不复杂，我们去看看浏览器的scope variables就一清二楚了。
  // 其实在每个function里面都有一个scope属性，当然这个属性被引擎屏蔽了，你是看不见也摸不着的，
  // 它里面就保存着当前函数的 local variables，如果应用到上面demo的话，就是全局函数中有一个scope，
  // createComparison有一个scope，匿名的compare有一个scope，而且这三个scope还是通过链表链接的
})();

(function() {
  console.log("---闭包陷阱");
  var arr = new Array();

  function Person() {
    for (var i = 0; i < 10; i++) {
      //要记住，这个属性函数申明，只有立即执行才会取scope属性
      var item = function() {
        return i;
      };
      arr.push(item);
    }
  }
  Person();
  console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]()); // 10 10 10 10 10 10 10 10 10 10
  }
  // 上面这个陷阱的最大问题在于你自以为我在匿名function中写了return i;就认为它是属于匿名函数的，其实这就大错特错了，
  // 因为这个i就算走到天涯海角都不属于匿名函数，而是属于它的包含函数Person，
  // 所以原理应该是这样，比如你看，当我执行arr[0]()的时候，这时候匿名函数就会通过scope去找i，
  // 但是在匿名函数的scope中没有i，所以就通过next找到了Person函数，确实在Person中找到了i，
  // 但是这个时候i已经是10了，然后结束scope查找输出10。
})();

(function() {
  console.log("---闭包陷阱的解决方案");
  var arr = new Array();

  function Person() {
    for (var i = 0; i < 10; i++) {
      //要记住，这个属性函数申明，只有立即执行才会取scope属性
      var item = function(num) {
        return num;
      }(i);
      arr.push(item);
    }
  }
  Person();
  console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 0 1 2 3 4 5 6 7 8 9
  }
})();

// 在JavaScript，作用域的边界检查只在函数被声明的时候。
// 逐个函数，并且仅仅逐个函数，拥有它们各自的作用域表。
// （注：在ECMAScript 6中不再是这样，因为let的引入）
(function() {
  console.log("---证明函数作用域");
  // global scope
  var scope = "global";

  var foo = function() {

    // inner scope 1
    var scope = "inner";
    var myscope = function() {

      // inner scope 2
      return scope;
    };
    return myscope;
  };

  console.log(foo()()); // inner
  console.log(scope); // global

  // 关于作用域还有一些重要的事情需要考虑。例如，我们需要创建一个函数，接受一个数字（0-9），返回该数字相应的英文名称。
  var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  var digit_name1 = function(n) {
    return names[n];
  };
  // 但是缺点是，names定义在了全局作用域，可能会意外的被修改，这样可能致使digit_name1函数所返回的结果不正确。
  // 那么，这样写：
  // 这次把names数组定义成函数digit_name2局部变量.这个函数远离了意外风险，但是带来了性能损失，
  // 由于每次digit_name2被调用的时候，都将重新为names数组定义和分配空间。
  // 换个例子如果names是个非常大的数组，或者可能digit_name2函数在一个循环中被调用多次，这时候性能影响将非常明显。
  var digit_name2 = function(n) {
    var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return names[n];
  };
  // 这时候我们面临第三个选择。这里我们实现立即调用的函数表达式，仅仅实例化names变量一次，然后返回digit_name3函数，
  // 在 IIFE (Immediately-Invoked-Function-Expression 立即执行表达式)的闭包函数持有names变量的引用。
  // 这个方案兼具前两个的优点，回避了缺点。搞定！这是一个常用的模式用来创建一个不可被外部环境修改“private”（私有）状态。
  var digit_name3 = (function() {
    var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return function(n) {
      return names[n];
    };
  })();
})();
