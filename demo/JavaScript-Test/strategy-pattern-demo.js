// 策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

// 使用策略模式的优点如下：
// 1. 策略模式利用组合，委托等技术和思想，有效的避免很多if条件语句。
// 2. 策略模式提供了开放-封闭原则，使代码更容易理解和扩展。
// 3. 策略模式中的代码可以复用。

// 使用策略模式计算奖金
// 比如公司的年终奖是根据员工的工资和绩效来考核的，
// 绩效为A的人，年终奖为工资的4倍，绩效为B的人，年终奖为工资的3倍，绩效为C的人，年终奖为工资的2倍；
// 现在我们使用一般的编码方式会如下这样编写代码：
(function() {
  console.log("\n---一般的编码方式");
  var calculateBouns = function(salary, level) {
    if (level === 'A') {
      return salary * 4;
    }
    if (level === 'B') {
      return salary * 3;
    }
    if (level === 'C') {
      return salary * 2;
    }
  };
  // 调用如下：
  console.log(calculateBouns(4000, 'A')); // 16000
  console.log(calculateBouns(2500, 'B')); // 7500
  // 代码缺点如下：
  // calculateBouns 函数包含了很多if-else语句。
  // calculateBouns 函数缺乏弹性，假如还有D等级的话，那么我们需要在calculateBouns 函数内添加判断等级D的if语句；
  // 算法复用性差，如果在其他的地方也有类似这样的算法的话，但是规则不一样，我们这些代码不能通用。
})();

// 使用组合函数重构代码
// 组合函数是把各种算法封装到一个个的小函数里面，比如等级A的话，封装一个小函数，等级为B的话，也封装一个小函数，以此类推；如下代码：
(function() {
  console.log("\n---使用组合函数");
  var performanceA = function(salary) {
    return salary * 4;
  };
  var performanceB = function(salary) {
    return salary * 3;
  };
  var performanceC = function(salary) {
    return salary * 2
  };
  var calculateBouns = function(level, salary) {
    if (level === 'A') {
      return performanceA(salary);
    }
    if (level === 'B') {
      return performanceB(salary);
    }
    if (level === 'C') {
      return performanceC(salary);
    }
  };
  // 调用如下
  console.log(calculateBouns('A', 4500)); // 18000
  // 代码看起来有点改善，但是还是有如下缺点：
  // calculateBouns 函数有可能会越来越大，比如增加D等级的时候，而且缺乏弹性。
})();

// 使用策略模式重构代码
// 策略模式指的是 定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，实际就是将算法的使用和实现分离出来；
// 算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数，而算法的实现是根据绩效对应不同的绩效规则；
// 一个基于策略模式的程序至少由2部分组成，第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
// 第二个部分是环境类Context，该Context接收客户端的请求，随后把请求委托给某一个策略类。我们先使用传统面向对象来实现；
// 如下代码：
(function() {
  console.log("\n---使用传统面向对象来实现策略模式");
  var performanceA = function() {};
  performanceA.prototype.calculate = function(salary) {
    return salary * 4;
  };
  var performanceB = function() {};
  performanceB.prototype.calculate = function(salary) {
    return salary * 3;
  };
  var performanceC = function() {};
  performanceC.prototype.calculate = function(salary) {
    return salary * 2;
  };
  // 奖金类
  var Bouns = function() {
    this.salary = null; // 原始工资
    this.levelObj = null; // 绩效等级对应的策略对象
  };
  Bouns.prototype.setSalary = function(salary) {
    this.salary = salary; // 保存员工的原始工资
  };
  Bouns.prototype.setlevelObj = function(levelObj) {
    this.levelObj = levelObj; // 设置员工绩效等级对应的策略对象
  };
  // 取得奖金数
  Bouns.prototype.getBouns = function() {
    // 把计算奖金的操作委托给对应的策略对象
    return this.levelObj.calculate(this.salary);
  };
  var bouns = new Bouns();
  bouns.setSalary(10000);
  bouns.setlevelObj(new performanceA()); // 设置策略对象
  console.log(bouns.getBouns()); // 40000
  bouns.setlevelObj(new performanceB()); // 设置策略对象
  console.log(bouns.getBouns()); // 30000
  // 如上代码使用策略模式重构代码，可以看到代码职责更新分明，代码变得更加清晰。
})();

// Javascript版本的策略模式
(function() {
  console.log("\n---Javascript版本的策略模式");
  var obj = {
    "A": function(salary) {
      return salary * 4;
    },
    "B": function(salary) {
      return salary * 3;
    },
    "C": function(salary) {
      return salary * 2;
    }
  };
  var calculateBouns = function(level, salary) {
    return obj[level](salary);
  };
  console.log(calculateBouns('A', 10000)); // 40000
  // 可以看到代码更加简单明了；
  // 策略模式指的是定义一系列的算法，并且把它们封装起来，
  // 但是策略模式不仅仅只封装算法，我们还可以对用来封装一系列的业务规则，
  // 只要这些业务规则目标一致，我们就可以使用策略模式来封装它们；
})();

// 表单效验
// 比如我们经常来进行表单验证，比如注册登录对话框，我们登录之前要进行验证操作：比如有以下几条逻辑：
// 用户名不能为空
// 密码长度不能小于6位。
// 手机号码必须符合格式。
(function() {
  console.log("\n---表单效验策略模式实现");
  // 策略对象
  var strategys = {
    isNotEmpty: function(value, errorMsg) {
      if (value === '') {
        return errorMsg;
      }
    },
    // 限制最小长度
    minLength: function(value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg;
      }
    },
    // 手机号码格式
    mobileFormat: function(value, errorMsg) {
      if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
        return errorMsg;
      }
    }
  };
  var Validator = function() {
    this.cache = []; // 保存效验规则
  };
  Validator.prototype.add = function(dom, rules) {
    var self = this;
    for (var i = 0, rule; rule = rules[i++];) {
      (function(rule) {
        var strategyAry = rule.strategy.split(":");
        var errorMsg = rule.errorMsg;
        self.cache.push(function() {
          var strategy = strategyAry.shift();
          strategyAry.unshift(dom.value);
          strategyAry.push(errorMsg);
          return strategys[strategy].apply(dom, strategyAry);
        });
      })(rule);
    }
  };
  Validator.prototype.start = function() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      var msg = validatorFunc(); // 开始效验 并取得效验后的返回信息
      if (msg) {
        return msg;
      }
    }
  };
  // 代码调用
  // var registerForm = document.getElementById("registerForm");
  var validateFunc = function() {
    var validator = new Validator(); // 创建一个Validator对象
    /* 添加一些效验规则 */
    validator.add(registerForm.userName, [{
      strategy: 'isNotEmpty',
      errorMsg: '用户名不能为空'
    }, {
      strategy: 'minLength:6',
      errorMsg: '用户名长度不能小于6位'
    }]);
    validator.add(registerForm.password, [{
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于6位'
    }, ]);
    validator.add(registerForm.phoneNumber, [{
      strategy: 'mobileFormat',
      errorMsg: '手机号格式不正确'
    }, ]);
    var errorMsg = validator.start(); // 获得效验结果
    return errorMsg; // 返回效验结果
  };
  // 点击确定提交
  // registerForm.onsubmit = function() {
  //   var errorMsg = validateFunc();
  //   if (errorMsg) {
  //     alert(errorMsg);
  //     return false;
  //   }
  // }
})();
