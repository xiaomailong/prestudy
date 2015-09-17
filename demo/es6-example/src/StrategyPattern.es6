// JavaScript设计模式之策略模式

// 策略模式：定义了一系列家族算法，并对每一种算法单独封装起来，让算法之间可以相互替换，独立于使用算法的客户。

(function() {
  console.log("\n---基本策略模式");

  function ConcreteStrategyA() {
    this.AlgorithmInterface = function() {
      console.log("算法A");
    }
  }

  function ConcreteStrategyB() {
    this.AlgorithmInterface = function() {
      console.log("算法B");
    }
  }

  function ConcreteStrategyC() {
    this.AlgorithmInterface = function() {
      console.log("算法C");
    }
  }

  //Context,用一个createStrategy来配置，维护一个对Strategy对象的引用
  function Context(strategy) {
    this.strategy = strategy;
    this.ContextInterface = function() {
      strategy.AlgorithmInterface();
    }

  }

  //应用
  var context1 = new Context(new ConcreteStrategyA());
  context1.ContextInterface();
  var context2 = new Context(new ConcreteStrategyB());
  context2.ContextInterface();
  var context3 = new Context(new ConcreteStrategyC());
  context3.ContextInterface();
})();

(function() {
  console.log("\n---商场活动策略模式");

  // 在《大话设计模式》一书中，作者举例的是一个商场的收银系统，在实际操作中，
  // 商場可能因为“双11买一送一”、“满500立减50”、“中秋节全场11折”等活动而对最终的收费产生变化。
  // 如果哪一天商场突然倒闭，全场两元，这时候我们仅需要给软件系统增加一个所有商品价格变两元的插件算法（类）即可。

  //因为要用到数值验证，所以...这里用的是jquery2.1里面的isNum
  function isNum(obj) {
    return obj - parseFloat(obj) >= 0;
  }
  //算法A，没有活动，正常收费
  function ConcreteStrategyA() {
    this.AlgorithmInterface = function(money) {
      return money;
    }
  }
  //算法B，满300减100
  function ConcreteStrategyB(MoneyCondition, MoneyReturn) {
    this.MoneyCondition = MoneyCondition,
      this.MoneyReturn = MoneyReturn;

    this.AlgorithmInterface = function(money) {
      var result = money;
      if (money >= MoneyCondition) {
        result = money - Math.floor(money / MoneyCondition) * MoneyReturn;
      }
      return result;
    }
  }
  //算法C，打折
  function ConcreteStrategyC(moneyRebate) {
    this.moneyRebate = moneyRebate;
    this.AlgorithmInterface = function(money) {
      return money * this.moneyRebate;
    }
  }

  //Context,用一个createStrategy来配置，维护一个对Strategy对象的引用
  //这里将算法相关的从客户端剥离出来，简单工厂模式
  function Context(type) {
    this.strategy = null;
    switch (type) {
      case "a":
        this.strategy = new ConcreteStrategyA();
        break;
      case "b":
        this.strategy = new ConcreteStrategyB("300", "100");
        break;
      case "c":
        this.strategy = new ConcreteStrategyC("0.8");
        break;
    }

    this.ContextInterface = function(money) {
      if (!isNum(money)) {
        money = 0;
      }
      return this.strategy.AlgorithmInterface(money);
    }
  }

  console.log((new Context('a')).ContextInterface(3000)); // 不打折 3000
  console.log((new Context('b')).ContextInterface(3000)); // 满三百减一百 2000
  console.log((new Context('c')).ContextInterface(3000)); // 打八折 2400
})();
