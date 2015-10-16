var Supports = require("es-checker");

if (Supports.letConst) {
  // let x = 5;
} else {
  var x = 5;
}

// 附：Supports 的属性清单
// letConst: let 和 const 命令
// defaultParameter: 函数的默认参数
// spreadRest: 扩展（...）运算符
// destructuring: 解构赋值
// parameterDestructuring: 函数参数的解构
// templateString: 模板字符串
// forOf: for...of循环
// arrow: 箭头函数
// generator: generator函数
// conciseMethodProperty: 对象属性的简洁表示法
// computedProperty: 对象属性名使用表达式
// moduleExport: 模块的export命令
// moduleImport: 模板的import命令
// numericLiteral: 数值的八进制和二进制表示法
// oldOctalLiteral: 八进制的前缀零表示法
// symbol: Symbol类型
// unicodeEscape: Unicode字符的大括号表示法
// unicodeIdentifier: Unicode字符是否可用作标识名
// unicodeRegExp: 正则表达式的u修饰符
// stickyRegExp: 正则表达式的y修饰符
// class: 类（class）
// letTDZ: let命令的暂时性死区
// constRedef: 不允许再次用const声明同一变量
// objectProto: 对象的proto属性
// objectSuper: 对象方法是否可以使用super
// extendNatives: 原生类型的扩展
// tco: 尾调用优化
// symbolImplicitCoercion: Symbol值不能用于运算
// functionNameInference: 匿名函数的name属性推断函数名
// objectStatics: Object的静态方法
// arrayStatics: 数组的静态方法
// arrayMethods: 数组的实例方法
// typedArrays: 类型化数组
// typedArrayStatics: 类型化数组的静态方法
// typedArrayMethods: 类型化数组的实例方法
// stringMethods: 字符串的实例方法
// numberStatics: Number对象的静态方法
// mathStatics: Math对象的静态方法
// collections: Map, Set, WeakMap, WeakSet
// proxy: Proxy对象
// promise: Promise对象
