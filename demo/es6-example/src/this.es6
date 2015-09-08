// 用自然语言的角度理解JavaScript中的this关键字

(function() {
  console.log("\n---对象方法调用");
  // 我们在调用一个对象的方法的时候，需要先指明这个对象，再指明要调用的方法。
  var xiaoming = {
    name: 'Xiao Ming',
    run: function() {
      console.log(`${this.name} seems happy!`);
    },
  };
  // xiaoming指定了run方法运行时的主语。因此，在run中，我们才可以用this来代替xiaoming这个对象。可以看到this起了代词的作用。
  xiaoming.run();
})();

(function() {
  console.log("\n---类实例方法调用");
  // 同样的，对于一个JavaScript类，在将它初始化之后，我们也可以用类似的方法来理解：
  // 类的实例在调用其方法的时候，将作为主语，其方法中的this就自然变成了指代主语的代词。
  class People {
    constructor(name) {
      // 在用new关键字实例化一个对象的时候，相当于在说，
      // “创建一个People类实例（主语），它（this）的name是……”
      // 所以这里的this就是新创建的People类实例
      this.name = name;
    }
    run() {
      console.log(`${this.name} seems happy.`)
    }
  }
  // new关键字实例化一个类
  var xiaoming = new People('xiaoming');
  // 这就是我认为this关键字设计得精彩的地方！如果将调用方法的语句和方法本身的代码连起来，像英语一样读，其实是完全通顺的。
  xiaoming.run();
})();

(function() {
  console.log("\n---this对象替代");
  // this的绑定
  // 句子的主语是可以变的，例如在下面的场景中，run被赋值到小芳（xiaofang）身上之后，调用xiaofang.run，主语就变成了小芳！
  var xiaofang = {
    name: 'Xiao Fang',
  };

  var xiaoming = {
    name: 'Xiao Ming',
    run: function() {
      console.log(`${this.name} seems happy`);
    },
  };
  xiaofang.run = xiaoming.run;
  // 主语变成了小芳
  xiaofang.run();
  // 在这种情况下，句子还是通顺的。所以，非常完美！
})();

(function() {
  console.log("\n---this对象绑定");
  // 但是如果小明很抠门，不愿意将run方法借给小芳以后，this就变成了小芳的话，那么小明要怎么做呢？
  // 他可以通过Function.prototype.bind让run运行时候的this永远为小明自己。
  var xiaofang = {
    name: 'Xiao Fang',
  };

  var xiaoming = {
    name: 'Xiao Ming',
    run: function() {
      console.log(`${this.name} seems happy`);
    },
  };
  // 将小明的run方法绑定（bind）后，返回的还是一个
  // 函数，但是这个函数之后被调用的时候就算主语不是小明，
  // 它的this依然是小明
  xiaoming.run = xiaoming.run.bind(xiaoming);
  xiaofang.run = xiaoming.run;
  // 主语虽然是小芳，但是最后this还是小明
  xiaofang.run();
  // 那么同一个函数被多次bind之后，到底this是哪一次bind的对象呢？你可以自己尝试看看。
})();

(function() {
  console.log("\n---call与apply");

  // Function.prototype.call允许你在调用一个函数的时候指定它的this的值。
  var xiaoming = {
    name: 'Xiao Ming'
  };

  function run(today, mood) {
    console.log(`Today is ${today}, ${this.name} seems ${mood}`);
  }
  // 函数的call方法第一个参数是this的值
  // 后续只需按函数参数的顺序传参即可
  run.call(xiaoming, 'Monday', 'happy');
})();

(function() {
  console.log("\n---call与apply");

  // Function.prototype.apply和Function.prototype.call的功能是一模一样的，
  // 区别进在于，apply里将函数调用所需的所有参数放到一个数组当中。
  var xiaoming = {
    name: 'Xiao Ming'
  };

  function run(today, mood) {
    console.log(`Today is ${today}, ${this.name} seems ${mood}`);
  }

  // apply只接受两个参数
  // 第二个参数是一个数组，这个数组的元素被按顺序
  // 作为run调用的参数
  run.apply(xiaoming, ['Monday', 'happy']);

  // 那么call/apply和上面的bind混用的时候是什么样的行为呢？这个也留给大家自行验证。
  // 但是在一般情况下，我们应该避免混用它们，否则会造成代码检查或者调试的时候难以跟踪this的值的问题。
})();

(function() {
  console.log("\n---当方法失去主语的时候，this的值会是全局对象");

  // 首先，全局函数的调用就是最简单的一种。
  function bar() {
    // 在浏览器中为window
    console.log(this === global); // 输出：true
  }
  bar();

  // 立即调用的函数表达式（IIFE，Immediately-Invoked Function Expression）也是没有主语的，所以它被调用的时候this也是全局对象。
  (function() {
    // 在浏览器中为window
    console.log(this === global); // 输出：true
  })();

  // 但是，当函数被执行在严格模式（strict-mode）下的时候，函数的调用时的this就是undefined了。这是很值得注意的一点。
  function bar2() {
    'use strict';
    console.log('Case 2 ' + String(this === undefined)); // 输出：undefined
  }
  bar2();
})();
