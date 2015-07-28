'use strict';
// 我们来做一个电子商务网站，一个邮购咖啡豆的公司。这个网站会销售好几种类型的咖啡， 有不同的品质，当然也有不同的价格。

// 命令式方法 --------------------------------------
// create some objects to store the data.
var columbian = {
  name: 'columbian',
  basePrice: 5
};
var frenchRoast = {
  name: 'french roast',
  basePrice: 8
};
var decaf = {
  name: 'decaf',
  basePrice: 6
};
// 我们将使用辅助函数计算价格
// 根据size打印到一个HTML的列表中
function printPrice(coffee, size) {
  if (size == 'small') {
    var price = coffee.basePrice + 2;
  } else if (size == 'medium') {
    var price = coffee.basePrice + 4;
  } else {
    var price = coffee.basePrice + 6;
  }
  // create the new html list item
  // var node = document.createElement("li");
  // var label = coffee.name + ' ' + size;
  // var textnode = document.createTextNode(label+' price: $'+price);
  // node.appendChild(textnode);
  // document.getElementById('products').appendChild(node);
  console.log(coffee.name + ' ' + size + ' price: $' + price);
}
// 现在我们只需根据咖啡的各种价格和size的组合调用printPrice函数
printPrice(columbian, 'small');
printPrice(columbian, 'medium');
printPrice(columbian, 'large');
printPrice(frenchRoast, 'small');
printPrice(frenchRoast, 'medium');
printPrice(frenchRoast, 'large');
printPrice(decaf, 'small');
printPrice(decaf, 'medium');
printPrice(decaf, 'large');
// 如你所见，这个代码非常基础。如果现在有更多的咖啡种类而不只是这三个改怎么办？
// 如果有20个，甚至50个？ 如果有更多的size呢？如果有有机和无机之分呢？
// 这将会很快将代码量变得巨大无比！
// 采用这种方法，我们让机器去打印每一种咖啡类型和每一个size。这就是采用这种命令式方法的基本问题。
console.log('----------------------------');

// 函数式编程 ---------------------------------------------------------------------------
// 命令式的代码一步一步地告诉电脑需要做什么来解决问题，相反，函数式编程追求用数学方式来描述问题， 其余的交给电脑来做。
// 从接口中分解数据和逻辑
var printPrice = function(price, label) {
  // var node = document.createElement("li");
  // var textnode = document.createTextNode(label+' price: $'+price);
  // node.appendChild(textnode);
  // document.getElementById('products 2').appendChild(node);
  console.log(label+' price: $'+price);
}
// 为每种咖啡创建函数对象
var columbian = function(){
 this.name = 'columbian';
 this.basePrice = 5;
};
var frenchRoast = function(){
 this.name = 'french roast';
 this.basePrice = 8;
};
var decaf = function(){
 this.name = 'decaf';
 this.basePrice = 6;
};
// 为每种size通过字面量创建对象
var small = {
 getPrice: function(){return this.basePrice + 2},
 getLabel: function(){return this.name + ' small'}
};
var medium = {
  getPrice: function(){return this.basePrice + 4},
  getLabel: function(){return this.name + ' medium'}
};
var large = {
  getPrice: function(){return this.basePrice + 6},
  getLabel: function(){return this.name + ' large'}
};

var plusMixin = function(current, mixin) {
  var newObj = current;
  newObj.prototype = Object.create(current.prototype);
  newObj.prototype.constructor = newObj;
  for (var prop in mixin) {
    if (mixin.hasOwnProperty(prop)) {
      newObj.prototype[prop] = mixin[prop];
    }
  }
  return newObj;
}

// 将所有咖啡的种类和size放到数组里
var coffeeTypes = [columbian, frenchRoast, decaf];
var coffeeSizes = [small, medium, large];
// 创建由上面内容组成的新对象，并把它们放到一个新数组里
var coffees = coffeeTypes.reduce(function(previous, current) {
  var newCoffee = coffeeSizes.map(function(mixin) {
    // `plusmix`是函数式的minxin, 见第7章
    var newCoffeeObj = plusMixin(current, mixin);
    return new newCoffeeObj();
  });
  return previous.concat(newCoffee);
},[]);
// 现在我们已经定义了如何获得所有咖啡种类和size组合方式的价格，现在可以直接打印它们了
coffees.forEach(function(coffee){
  printPrice(coffee.getPrice(), coffee.getLabel());
});
console.log('==============================');

// 首先需要明确的是这个代码更加模块化了。现在新增一种size或者信新增一个咖啡种类就像下面的代码这样简单：
var peruvian = function(){
  this.name = 'peruvian';
  this.basePrice = 11;
};
var extraLarge = {
  getPrice: function(){return this.basePrice + 10},
  getLabel: function(){return this.name + ' extra large'}
};
coffeeTypes.push(peruvian);
coffeeSizes.push(extraLarge);
// 现在我们已经增加了咖啡种类和size，现在可以直接打印它们了
// 实际上，我们可以让这个例子更加函数式：去掉coffees变量，并将函数串到一起链式调用，这也是函数式编程的一个小技巧。
coffeeTypes.reduce(function(previous, current) {
  var newCoffee = coffeeSizes.map(function(mixin) {
    // `plusMixin` function for functional mixins, see Ch.7
    var newCoffeeObj = plusMixin(current, mixin);
    return new newCoffeeObj();
  });
  return previous.concat(newCoffee);
},[]).forEach(function(coffee) {
  printPrice(coffee.getPrice(), coffee.getLabel());
});
