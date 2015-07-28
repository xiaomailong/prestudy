var Lazy = require('lazy.js');
var fn = require('fn.js');

// 函数式编程语言是那些方便于使用函数式编程范式的语言。
// 简单来说，如果具备函数式编程所需的特征， 它就可以被称为函数式语言。
// 在多数情况下，编程的风格实际上决定了一个程序是否是函数式的。

// 函数式语言特征
// 特点	              命令式	                              函数式
// 编程风格	          一步一步地执行，并且要管理状态的变化	   描述问题和和所需的数据变化以解决问题
// 状态变化	          很重要	                              不存在
// 执行顺序	          很重要	                              不太重要
// 主要的控制流	      循环、条件、函数调用	                 函数调用和递归
// 主要的操作单元	   结构体和类对象	                      函数作为一等公民的对象和数据集

// 函数式语言的语法必须要顾及到特定的设计模式，比如类型推断系统和匿名函数。
// 大体上，这个语言必须实现lambda演算。
// 并且解释器的求值策略必须是非严格、按需调用的（也叫做延迟执行），它允许不变数据结构和非严格、惰性求值。

// 函数式编程更简洁、更简单、更小。它简化了调试、测试和维护。
// 例如，我们需要这样一个函数，它能将二维数组转化为一维数组。
{
  // 如果只用命令式的技术，我们会写成这样：
  function merge2dArrayIntoOne(arrays) {
    var count = arrays.length;
    var merged = new Array(count);
    var c = 0;
    for (var i = 0; i < count; ++i) {
      for (var j = 0, jlen = arrays[i].length; j < jlen; ++j) {
        merged[c++] = arrays[i][j];
      }
    }
    return merged;
  };

  // 现在使用函数式技术，可以写成这样：
  // merge2dArrayIntoOne2 = (arrays) ->
  // arrays.reduce (memo, item) ->
  //   memo.concat item
  // , []
  var merge2dArrayIntoOne2 = function(arrays) {
    return arrays.reduce(function(p,n) {
      return p.concat(n);
    }, []);
  };
}

// 模块化: 函数式编程强制把大型问题拆分成解决同样问题的更小的情形，这就意味着代码会更加模块化。
//        模块化的程序具有更清晰的描述，更易调试，维护起来也更简单。
//        测试也会变得更加容易， 这是由于每一个模块的代码都可以单独检测正确性。
// 复用性: 由于其模块化的特性，函数式编程会有许多通用的辅助函数。
//        你将会发现这里面的许多函数可以在大量不同的应用里重用。
// 减少耦合: 耦合是程序里模块间的大量依赖。由于函数式编程遵循编写一等公民的、高阶的纯函数，
//          这使得它们对全局变量没有副作用而彼此完全独立，耦合极大程度上的减小了。
//          当然，函数会不可避免地相互依赖，但是改变一个函数不会影响其他的，只要输入和输出的一对一映射保持正确。
// 数学正确性: 最后一点更理论一些。由于根植于lambda演算，函数式编程可以在数学上证明正确性。
//            这对于一些研究者来说是一个巨大的优点，他们需要用程序来证明增长率、时间复杂度以及数学正确性。

// 对一个斐波那契数列求值标准的办法是建立一个递归函数，像这样：
// fibonnaci(n) = fibonnaci(n-2) + fibonnaci(n–1)
// 还需要加上一个一般情形：
// return 1 when n < 2
{
  var fibonacci = function(n) {
    if (n < 2) {
      return 1;
    } else {
      return fibonacci(n - 2) + fibonacci(n - 1);
    }
  }
  console.log(fibonacci(8));                    // Output: 34

  // 然而，在一个懒执行函数库的辅助下，可以生成一个无穷大的序列，它是通过数学方程来定义整个序列的成员的。
  // 只有那些我们最终需要的成员最后才会被计算出来。
  var fibonacci2 = Lazy.generate(function() {
    var x = 1,
    y = 1;
    return function() {
      var prev = x;
      x = y;
      y += prev;
      return prev;
    };
  }());
  console.log(fibonacci2.take(12).toArray());    // Output: [1, 1, 2, 3, 5,8, 13, 21, 34, 55, 89, 144]
  var fibonacci3 = Lazy.generate(function() {
    var x = 1,
    y = 1;
    return function() {
      var prev = x;
      x = y;
      y += prev;
      return prev;
    };
  }());
  console.log(fibonacci2.take(9).reverse().first(1).toArray());  //Output: [10946] 第二次调用
  console.log(fibonacci3.take(9).reverse().first(1).toArray());  //Output: [34]    第一次调用
  console.log(fibonacci3.take(9).reverse().first(1).toArray());  //Output: [2584]  第二次调用
}

// 例如，你需要在一段文本中找出头四个只含有字母的单词，
{
  var myString = 'test sfsfasdsf af12 12345 67890 abc defgh';
  // 稚嫩一些的写法会是这样：
  var words = [], count = 0;
  text = myString.split(' ');
  for (i=0; count < 4, i < text.length; i++) {
    if (!text[i].match(/[0-9]/)) {
      words = words.concat(text[i]);
      count++;
    }
  }
  console.log(words);

  // 函数式编程会写成这样：
  var words = [];
  var words = myString.split(' ').filter(function(x){
    return (! x.match(/[1-9]+/));
  }).slice(0,4);
  console.log(words);

  // 如果有一个函数式编程的工具库，代码可以进一步被简化：
  // var words = toSequence(myString).match(/[a-zA-Z]+/).first(4);
}

// Javascript可以说是世界上最流行却最没有被理解的函数式编程语言。
// 它的真实身份可以追溯到它的原型：Scheme和Lisp，两个经典的函数式编程语言。
// Javascript一直都是一个函数式编程语言。
// 它的函数是头等公民，并且可以嵌套，它具有闭包和复合函数，它允许珂理化和monad。
// 所有这些都是函数式编程的关键。

// 这里另外还有一些Javascript是函数式语言的原因：
//     Javascript的词法包括了传递函数为参数的能力，具有类型推断系统，支持匿名函数、高阶函数、闭包等等。
//     这些特点对构成函数式编程的结构和行为至关重要。

//     Javascript不是一个纯面向对象语言，它的多数面向对象设计模式都是通过拷贝Prototype对象来完成的，这是一个弱面向对象编程的模型。
//     欧洲电脑制造商协会脚本（ECMAScript）——Javascript的正式形式和标准实现 ——在4.2.1版本的规范里有如下陈述：
//     “Javascript不具有像C++、Smalltalk、Java那样的真正的类，但是支持创建对象的构造器。
//      一般来说，在基于类的面向对象语言里，状态由实例承载，方法由类承载，继承只是针对结构和行为。
//      在EMACScript里，状态和方法由对象来承载，结构、行为和状态都会被继承。”

//     Javascript是一个解释型语言。Javascript的解释器（有时被称为“引擎”）非常类似于Scheme的解释器。
//     它们都是动态的，都有易于组合和传输的灵活的数据类型，都把代码求值为表达式块，处理函数的方式也类似。

// Javascript的确不是一个纯函数式语言。它缺乏惰性求值和内建的不可变数据。
// 这是由于大多数解释器是按名调用，而不是按需调用。
// Javascript由于其尾调用的处理方式也不太善于处理递归。
// 不过所有的这些问题都可以通过一些小的注意事项来缓和。
// 需要无穷序列和惰性求值的非严格求值可以通过一个叫Lazy.js的库来实现。
// 不可变量只需要简单的通过编程技巧就可以实现，不过它不是通过依赖语言层面来限制而是需要程序员自律。
// 尾递归消除可以通过一个叫Trampolining的方法实现。
