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

// apply、call和this关键词 -----------------------
// 在纯函数式语言中，函数不会被唤起（invoke），他们是被应用（apply）。
// JavaScript以同样的方式工作， 甚至提供了手动调用(call)和应用(apply)函数的工具。
// 这些都是与this关键词有关的，当然this指的是函数所属的那个对象。

// call()函数把第一个参数作为this关键字。它是这样工作的：
console.log(['Hello', 'world'].join(' ')) // 正常方式
console.log(Array.prototype.join.call(['Hello', 'world'], ' ')); //使用call

// call()函数可以唤起匿名函数：
console.log((function(){
  console.log(this.length);
  return "匿名函数调用返回值！";
}).call([1,2,3]));

// apply()函数和call()函数很像，但是更有用一些：
console.log(Math.max(1,2,3));                // 返回3
console.log(Math.max([1,2,3]));              // 返回NaN 无法应用于数组
console.log(Math.max.apply(null, [1,2,3]));  // 返回3 这样就可以了
// 基本的区别是：call()函数接受一列参数，apply函数接受一个数组作为参数。

// call()和apply()让你可以只写一次函数，其它对象可以继承它而无需再写一遍函数。
// 并且他俩都是Function对象的成员。

// 当你对call()自己调用call()的时候，会发生些有趣的事情。
function func(a) {
  console.log(a);
}
// 这两行代码是等价的
func.call("thisValue1");
Function.prototype.call.call(func, "thisValue2");

// 绑定参数 -----------
// bind()函数让你能够调用一个对象的函数时this指向另一个对象。
// 这跟call()函数差不多，不过它可以让方法链式调用，返回一个新的函数。

// 这对于回调非常有用，就像下面的代码那样：
function Drum() {
  this.noise = 'boom';
  this.duration = 1000;
  this.goBoom = function() {
    console.log(this.noise)
  };
}
var drum = new Drum();
// setInterval(drum.goBoom.bind(drum), drum.duration);
setTimeout(drum.goBoom.bind(drum), drum.duration);
// 这解决了许多面向对象框架中的问题，比如Dojo，特别是对于那些有自己的handler函数的类处理状态维持的问题。
// 不过我们也可以用bind()来进行函数式编程。

// 函数工厂 -----------
// 闭包使建立函数工厂这种Javascript编程模式成为可能。 它们使你能够手动绑定函数的参数。

// 首先我们需要一个为另一个函数绑定参数的函数：
function bindFirstArg(func, a) {
  return function(b) {
    return func(a, b);
  };
}

// 现在我们可以用它来创建更多的泛型函数（generic function）：
var powersOfTwo = bindFirstArg(Math.pow, 2);
console.log(powersOfTwo(3));  // 8
console.log(powersOfTwo(5));  // 32

// 也可以针对于其它参数：
function bindSecondArg(func, b) {
  return function(a) {
    return func(a, b);
  };
}
var squareOf = bindSecondArg(Math.pow, 2);
var cubeOf = bindSecondArg(Math.pow, 3);
console.log(squareOf(3));   // 9
console.log(squareOf(4));   // 16
console.log(cubeOf(3));     // 27
console.log(cubeOf(4));     // 64

// 在函数式编程中，创建泛型函数的能力十分重要。然而还有更巧妙的方式可以更加一般化地完成这一过程。
// bindFirstArg()函数接受两个参数，第一个参数是个函数。
// 如果我们把bindFirstArg本身作为第一个参数的函数传给它自己， 我们就可以创建绑定函数。
// 最好用下面的例子来描述：
var makePowersOf = bindFirstArg(bindFirstArg, Math.pow);
var powersOfThree = makePowersOf(3);
console.log(powersOfThree(2));   // 9
console.log(powersOfThree(3));   // 27

// 部分应用 ------------
// 部分应用是这样一个过程：它给函数的一个或多个参数绑定上值，返回一个已经部分应用过的函数，
// 这个函数仍然需要接受未绑定的参数。
// 补充的方式是为原型增加新的函数，这会允许我们在为想要部分应用的函数调用我们的新函数的时候作为它的一个方法。

// 左端部分应用
// 如你所见，它的工作方式是对arguments这个特殊的值调用slice。
Function.prototype.partialApply = function() {
  var func = this;
  args = Array.prototype.slice.call(arguments);
  return function() {
    return func.apply(this, args.concat(
      Array.prototype.slice.call(arguments)
    ));
  };
};
// 每一个函数又有一个特殊的内部变量叫做arguments，它是一个类似于数组的对象，包含传入函数的全部参数。
// 从技术层面说，它不是数组，因此它没有slice和forEach这些数组的方法。
// 这也就是为什么我们需要使用Array的slice.call方法。

// 我们来建立一个把数字转换为16进制的小应用。
function nums2hex() {
  function componentToHex(component) {
    var hex = component.toString(16);
    // 确保返回的数值是两位数字，比如0c或12
    if (hex.length == 1) {
      return "0" + hex;
    } else {
      return hex;
    }
  }
  return Array.prototype.map.call(arguments, componentToHex).join('');
}
// 这个函数对多少个数字都有效
console.log(nums2hex());                        // ''
console.log(nums2hex(100, 200));                // '64c8'
console.log(nums2hex(100, 200, 255, 0, 123));   // '64c8ff007b'
// 不过我们可以用部分函数来对部分参数进行应用，比如mac地址的OUI
// ( OUI，“组织唯一标识符”，即网卡制造商的唯一标识符。)
var myOUI = 123;
var getMacAddress = nums2hex.partialApply(myOUI);
console.log(getMacAddress());                            // '7b'
console.log(getMacAddress(100, 200, 2, 123, 66, 0, 1));  // '7b64c8027b420001'
// 我们还可以转换全红基础上的颜色rgb十六进制值
var shadesOfRed = nums2hex.partialApply(255);
console.log(shadesOfRed(123, 0));       // 'ff7b00'
console.log(shadesOfRed(100, 200));     // 'ff64c8'
// 这个例子展示出了我们可以应用部分参数而生成一个新的函数。
// 它是左-右的，意思是我们只能部分应用从左边开始的若干参数。

// 右端部分应用
// 为了从右边开始应用参数，我们可以再定义一个补充函数。
Function.prototype.partialApplyRight = function() {
  var func = this;
  args = Array.prototype.slice.call(arguments);
  return function() {
    return func.apply(
      this, [].slice.call(arguments, 0)
      .concat(args));
  };
};
var shadesOfBlue = nums2hex.partialApplyRight(255);
console.log(shadesOfBlue(123, 0));     // '7b00ff'
console.log(shadesOfBlue(100, 200));   // '64c8ff'
var shadesOfGreen = nums2hex.partialApplyRight(255, 0);
console.log(shadesOfGreen(123));   // '7bff00'
console.log(shadesOfGreen(100, 200));   // '64ff00'

// 部分应用使我们能够创建非常一般化的函数，并从它提取出更多特殊化的函数。
// 但是这个方法最大的缺点在于参数传入的方式，也就是参数有多少个，是什么样的顺序，这些不太明确。
// 不明确性在编程中永远不是个好事儿。还有个更好的方式：珂理化。

// 珂理化（currying）
// 珂理化是这样一个过程：它把一个具有多个参数的函数转换为一个只有一个参数的函数并返回另一个函数，
// 这个被返回的函数需要原函数剩余的参数。
// 正式的说法是：一个具有N个参数的函数可以被转换为具有N个函数的函数链， 其中每一个函数只有一个参数。

// 一个普遍的问题是：部分应用和珂理化有什么区别？
// 实际就是部分应用立刻返回一个值， 而珂理化只返回另一个珂理化的函数来获取下一个参数，
// 本质的区别是珂理化可以更好的控制参数传入的方式。

// 我们将会看到真的是这样，不过首先我们需要先创建一个呈现珂理化的函数。
Function.prototype.curry = function(numArgs) {
  var func = this;
  numArgs = numArgs || func.length; //func.length是调用此方法的函数的形参个数
  // 递归地获取参数
  function subCurry(prev) {
    return function(arg) {
      var args = prev.concat(arg);
      if (args.length < numArgs) {
        // 递归情形: 仍需要更多的参数
        return subCurry(args);
      } else {
        // 基准情形: 执行函数
        return func.apply(this, args);
      }
    };
  }
  return subCurry([]);
};

// Function.prototype.curry = (numArgs) ->
//   func = this
//   numArgs or= func.length
//   subCurry = (prev) ->
//     (arg) ->
//       args = prev.concat arg
//       if args.length < numArgs
//         subCurry args
//       else
//         func.apply this, args
//   subCurry []
// numArgs参数让我们可以在被珂理化的函数没有给出确切参数的时候指定参数的个数。

// 来看看用它来如何处理我们的十六进制应用。我们先写个函数，它会把RGB值转换为适合HTML的16进制字符串。
function rgb2hex(r, g, b) {
  // nums2hex is previously defined in this chapter
  return '#' + nums2hex(r) + nums2hex(g) + nums2hex(b);
}
var hexColors = rgb2hex.curry();
console.log(hexColors(11))            // 返回一个珂理化的函数
console.log(hexColors(11, 12, 123))   // 返回一个珂理化的函数
console.log(hexColors(11)(12)(123))   // 返回 #0b0c7b
console.log(hexColors(210)(12)(0))    // 返回 #d20c00
// 注意，curry方法返回的函数只接受一个参数，所以上例倒数第三行传入的三个参数的后两个是没用的。

// 如果我们想对nums2hex()这个函数进行珂理化就会有点问题，
// 因为这个函数没有指定参数， 你可以传入任意数量的参数。
// 所以我们需要定义参数的个数。
// 我们curry函数的那个可选的参数来设置被珂理化函数的参数个数。
var hexs = nums2hex.curry(2);
console.log(hexs(11)(12));       // 返回 0b0c
console.log(hexs(11));           // 返回一个函数
// console.log(hexs(110)(12)(0));   // 不正确

// 所以珂理化不太适合可变参数的函数，对于这种情况，建议使用部分应用函数。
// 所有这些不只是利于函数工厂和代码重用，珂理化和部分应用在函数组合中扮演着更重要的角色。
