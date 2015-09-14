// javascript引用类型之对象Object

// [前面的话]
// 　　引用类型：在javascript中，引用类型是一种数据结构，用于将数据和功能组织在一起，它也常被称为类。
//    引用类型有时也被称为对象定义，因为它们描述的是一类对象所具有的属性和方法。

// 　　引用对象的值（对象）：是引用类型的一个实例。
//     对象是某个特定引用类型的实例，新对象是使用new操作符后跟一个构造函数来创建的。
//     构造函数本身就是一个函数，只不过该函数是出于创建新对象的目的而定义的。对象的别名是集合。

// Object:是一组数据和功能的集合
// 	[1]对象创建：两种Object类型的创建方法
// 	　　[1.1]使用new操作符后跟Object构造函数
var person = new Object(); // 类似于
console.log(person);
var person = new Object; //也就是说可以不加括号
console.log(person);
person.name = 'bai';
person.age = 29;
console.log(person);

// 　　[1.2]使用对象字面量
var person = {
  name: 'bai',
  age: 29
};
console.log(person);

// 　　[注意1]在对象字面量中使用逗号来分隔不同的属性，但是在最后一个属性后面添加逗号，会在IE7及更早版本和Opera中导致错误
// 　　[注意2]使用对象字面量的方法来定义对象，属性名会自动转换成字符串,实际上不会调用Object构造函数
// 　　[注意3]如果留空其花括号，则可以定义只包含默认属性和方法的对象
var person = {}; // 相当于
console.log(person);
var person = new Object();
console.log(person);

// 　　　　[1.2.1]使用对象字面量来封装多个可选参数的方法：
function displayInfo(args) {
  var output = '';
  if (typeof args.name == 'string') {
    output += 'name:' + args.name + '\n';
  }
  if (typeof args.age == 'number') {
    output += 'Age:' + args.age + '\n';
  }
  console.log(output);
}
displayInfo({
  name: 'Nicholas',
  age: 29
});
// 　　[注意]以上这种传递参数的模式最适合需要向函数传入大量可选参数的情形。最好的做法是，对那些必需值使用形参，而使用对象字面量来封装多个可选参数。

// [2]Object的实例的属性和方法
// 	　　[2.1]constructor:保存着用于创建当前对象的函数
// 	　　[2.2]hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中(而不是在实例的原型中)是否存在。其中，propertyName必须以字符串形式指定
// 	　　[2.3]isPrototypeOf(object):用于检查传入的对象是否是传入对象的原型
// 	　　[2.4]propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in语句来枚举。其中，propertyName必须以字符串形式指定
// 	　　[2.5]toLocaleString():返回对象的字符串表示，该字符串与执行环境的地区对应。
// 	　　[2.6]toString():返回对象的字符串表示
// 	　　[2.7]valueOf():返回对象的字符串、数值或布尔值表示，通常与toString()方法的返回值相同

// [3]两种访问对象属性的方法
// 　　[注意1]除非必须使用变量来访问属性，否则建议使用点表示法，且在属性名命名时尽量符合命名规则
// 　　[注意2]变量中可以存在中文，因为中文相当于字符，与英文字符同样对待，因此可以写成person.白或person['白']
// 　　[注意3]方括号中的值若是非字符串类型会使用String()隐式转换成字符串再输出；
//           如果是字符串类型，若有引号则原值输出，否则会被识别为变量，若变量未定义，则报错
person[0] = 1; // []中的数字不会报错，而是自动转换成字符串
console.log(person);
// person[a] = 1; // []中符合变量命名规则的元素会被当成变量，变量未被定义，而报错
person[''] = 2; // []中的空字符串不会报错,是实际存在的且可以调用,但不会在控制台右侧的集合中显示
console.log(person);
person[undefined] = 1; // 不会报错，而是自动转换成字符串
console.log(person);
person[null] = 2; // 不会报错，而是自动转换成字符串
console.log(person);
person[true] = 3; // 不会报错，而是自动转换成字符串
console.log(person);
person[false] = 4; // 不会报错，而是自动转换成字符串
console.log(person);
person['白'] = 6; // 不会报错
console.log(person);

// 　　[3.1] person.name
// 	　　[3.2] person['name']
// 	　　　　[3.2.1]方括号的主要优点
// 	　　　　　　[a]可以通过变量来访问属性
// 	　　　　　　[b]属性名中可以包含导致语法错误的字符，或者属性名中使用的是关键字或保留字
// 　　　　　　e.g. person['first name'];

//  [4]对象可以嵌套，但必须逐层取值
var student = {
  name: {
    chinese: 1,
    englisth: 2
  },
  sex: 1,
  age: 26
};
console.log(student);
// 　　[注意]取值只能一层一层取,如student.name.chinese,而不能跨过name,直接用student.chinese,因为与name的同级下也可能有叫chinese的元素

// [5]对象的delete运算符: delete只能删除对象下的数据，其他5种基础类型的值是删除不掉的
// 	　　[5.1]如果在全局状态下声明变量a，相当于window对象下的一个数据a,
//           可以通过window.a或a来对a赋值，且window.a和a的值总是相等，但就是无法删除
// 	　　[5.2]如果用window.b 来声明并赋值(b相当于声明在window对象下),可以删除,且用delete b 和 delete window.b 的效果相同，
//          删除后，console.log(b)提示变量不存在，console.log(window.b)提示undefined
