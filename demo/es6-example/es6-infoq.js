// require("babel/register");
'use strict';

// 遍历数组中的元素 ---------------------------
var myArray = [0, 1, 2, 3, 4, 5];
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
// ES5可以使用内建的forEach方法来遍历数组
// ***但这种方法也有一个小缺陷：你不能使用break语句中断循环，也不能使用return语句返回到外层函数。
myArray.forEach(function (value) {
  console.log(value);
});
// ***尝试一下for-in循环
for (var index in myArray) { // 千万别这样做
  console.log(myArray[index]);  // 这绝对是一个糟糕的选择，为什么呢？
  // 在这段代码中，赋给index的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，
  //     例如：“2” + 1 == “21”，这给编码过程带来极大的不便。
  // 作用于数组的for-in循环体除了遍历数组元素外，还会遍历自定义属性。
  //     举个例子，如果你的数组中有一个可枚举属性myArray.name，循环将额外执行一次，遍历到名为“name”的索引。
  //     就连数组原型链上的属性都能被访问到。
  // 最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。
  // 简而言之，for-in是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历。
}
// 强大的for-of循环
// ES6不会破坏你已经写好的JS代码。目前看来，成千上万的Web网站依赖for-in循环，其中一些网站甚至将其用于数组遍历。
// 如果想通过修正for-in循环增加数组遍历支持会让这一切变得更加混乱，
// 因此，标准委员会在ES6中增加了一种新的循环语法来解决目前的问题。
for (var value of myArray) {
  console.log(value);
  // 这是最简洁、最直接的遍历数组元素的语法
  // 这个方法避开了for-in循环的所有缺陷
  // 与forEach()不同的是，它可以正确响应break、continue和return语句
}
// for-of循环也可以遍历其它的集合
// for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM NodeList对象。
// for-of循环也支持字符串遍历，它将字符串视为一系列的Unicode字符来进行遍历：
// 它同样支持Map和Set对象遍历。
for (var chr of "Abc123中国人") {
  console.log(chr);
}

// Set对象可以自动排除重复项
// 基于单词数组创建一个set对象
var words = ['abc', '123', 'ABC', 'abc'];
var uniqueWords = new Set(words);
// 生成Set对象后，你可以轻松遍历它所包含的内容：
for (var word of uniqueWords) {
   console.log(word);
}

// Map对象稍有不同：内含的数据由键值对组成，所以你需要使用解构（destructuring）来将键值对拆解为两个独立的变量：
// for (var [key, value] of phoneBookMap) {
//    console.log(key + "'s phone number is: " + value);
// }

// for-of循环不支持普通对象，但如果你想迭代一个对象的属性，
// 你可以用for-in循环（这也是它的本职工作）或内建的Object.keys()方法：
// 向控制台输出对象的可枚举属性
var someObject = new Object;
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}

// for-of循环语句通过方法调用来遍历各种集合。
// 数组、Maps对象、Sets对象以及其它在我们讨论的对象有一个共同点，它们都有一个迭代器方法。
// 当你向任意对象添加myObject[Symbol.iterator]()方法，就可以遍历这个对象了。
// 让jQuery对象也支持for-of循环，你可以这样做：
// 因为jQuery对象与数组相似，可以为其添加与数组一致的迭代器方法
var jQuery = require('jquery');
jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// Symbols是ES6中的新类型，基于新标准，你可以定义一个全新的symbol，就像Symbol.iterator，
// 如此一来可以保证不与任何已有代码产生冲突。这样做的代价是，这段代码的语法看起来会略显生硬，
// 但是这微乎其微代价却可以为你带来如此多的新特性和新功能，并且你所做的这一切可以完美地向后兼容。
// 所有拥有[Symbol.iterator]()的对象被称为可迭代的。

// for-of循环首先调用集合的[Symbol.iterator]()方法，紧接着返回一个新的迭代器对象。
// 迭代器对象可以是任意具有.next()方法的对象；for-of循环将重复调用这个方法，每次循环调用一次。
// 举个例子，这段代码是我能想出来的最简单的迭代器：
// var zeroesForeverIterator = {
//   [Symbol.iterator]: function () {
//     return this;
//   },
//   next: function () {
//     return { done: false, value: 0 };
//   }
// };

// var $iterator = ITERABLE[Symbol.iterator]();
// var $result = $iterator.next();
// while (!$result.done) {
//   VAR = $result.value;
//   $result = $iterator.next();
// }

// ES6生成器（Generators）简介 ------------------------------------
function* quips(name) {
  yield name + " 你好!";
  yield "希望你能喜欢这篇介绍ES6的译文";
  if (name.startsWith("X")) {
    yield "你的名字 " + name + "  首字母是X，这很酷！";
  }
  yield "我们下次再见！";
}
// 生成器函数，它与普通函数有很多共同点，但是二者有如下区别：
//     普通函数使用function声明，而生成器函数使用function*声明。
//     在生成器函数内部，有一种类似return的语法：关键字yield。
// 二者的区别是，普通函数只可以return一次，而生成器函数可以yield多次（当然也可以只yield一次）。
// 在生成器的执行过程中，遇到yield表达式立即暂停，后续可恢复执行状态。
// 这就是普通函数和生成器函数之间最大的区别，普通函数不能自暂停，生成器函数可以。
var iter = quips('孔波利');
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
// 当你调用一个生成器时，它并非立即执行，而是返回一个已暂停的生成器对象（上述实例代码中的iter）。
// 你可将这个生成器对象视为一次函数调用，只不过立即冻结了，它恰好在生成器函数的最顶端的第一行代码之前冻结了。
// 每当你调用生成器对象的.next()方法时，函数调用将其自身解冻并一直运行到下一个yield表达式，再次暂停。
// 调用最后一个iter.next()时，我们最终抵达生成器函数的末尾，所以返回结果中done的值为true。

// 生成器是迭代器！所有的生成器都有内建.next()和[Symbol.iterator]()方法的实现。你只须编写循环部分的行为。
// 迭代器是ES6中独立的内建类，同时也是语言的一个扩展点，
// 通过实现[Symbol.iterator]()和.next()两个方法你就可以创建自定义迭代器。
// 举个例子，我们创建一个简单的range迭代器，它可以简单地将两个数字之间的所有数相加。
// 首先是传统C的for(;;)循环：
// 应该弹出三次 "ding"
for (var value of range(0, 3)) {
  console.log("Ding! at floor #" + value);
}
// 使用ES6的类的解决方案
// class RangeIterator {
//   constructor(start, stop) {
//     this.value = start;
//     this.stop = stop;
//   }
//
//   [Symbol.iterator]() { return this; }
//
//   next() {
//     var value = this.value;
//     if (value < this.stop) {
//       this.value++;
//       return {done: false, value: value};
//     } else {
//       return {done: true, value: undefined};
//     }
//   }
// }

// 返回一个新的迭代器，可以从start到stop计数。
// function range(start, stop) {
//   return new RangeIterator(start, stop);
// }

// 使用生成器实现
function* range(start, stop) {
  for (var i = start; i < stop; i++)
    yield i;
}
var iter = range(0, 3);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// 如何发挥作为迭代器的生成器所产生的最大效力？
// 使任意对象可迭代。编写生成器函数遍历这个对象，运行时yield每一个值。
// 然后将这个生成器函数作为这个对象的[Symbol.iterator]方法。
// 简化数组构建函数。假设你有一个函数，每次调用的时候返回一个数组结果，就像这样：
// 拆分一维数组icons
// 根据长度rowLength
function splitIntoRows(icons, rowLength) {
  var rows = [];
  for (var i = 0; i < icons.length; i += rowLength) {
    rows.push(icons.slice(i, i + rowLength));
  }
  return rows;
}
// 使用生成器创建的代码相对较短：
// 行为上唯一的不同是，传统写法立即计算所有结果并返回一个数组类型的结果，
// 使用生成器则返回一个迭代器，每次根据需要逐一地计算结果。
function* splitIntoRows(icons, rowLength) {
  for (var i = 0; i < icons.length; i += rowLength) {
    yield icons.slice(i, i + rowLength);
  }
}
//     获取异常尺寸的结果。你无法构建一个无限大的数组，
// 但是你可以返回一个可以生成一个永无止境的序列的生成器，每次调用可以从中取任意数量的值。
//     重构复杂循环。你是否写过又丑又大的函数？你是否愿意将其拆分为两个更简单的部分？
// 现在，你的重构工具箱里有了新的利刃——生成器。当你面对一个复杂的循环时，你可以拆分出生成数据的代码，
// 将其转换为独立的生成器函数，然后使用for (var data of myNewGenerator(args))遍历我们所需的数据。
//     构建与迭代相关的工具。ES6不提供用来过滤、映射以及针对任意可迭代数据集进行特殊操作的扩展库。
// 借助生成器，我们只须写几行代码就可以实现类似的工具。
// 举个例子，假设你需要一个等效于Array.prototype.filter并且支持DOM NodeLists的方法，可以这样写：
function* filter(test, iterable) {
  for (var item of iterable) {
    if (test(item))
      yield item;
  }
}

// 生成器和异步代码
// 异步API通常需要一个回调函数，这意味着你需要为每一次任务执行编写额外的异步函数。
// 异步API拥有错误处理规则，不支持异常处理。
// 异步代码不如等效同步代码美观又简洁的这个事实。
// 生成器为你提供了避免以上问题的新思路。
// 实验性的Q.async()尝试结合promises使用生成器产生异步代码的等效同步代码。举个例子：
// 制造一些噪音的同步代码。
function makeNoise() {
  shake();
  rattle();
  roll();
}
// 制造一些噪音的异步代码。
// 返回一个Promise对象
// 当我们制造完噪音的时候会变为resolved
function makeNoise_async() {
  return Q.async(function* () {
    yield shake_async();
    yield rattle_async();
    yield roll_async();
  });
}

function* foo(x) {
    yield x + 1;
    var y = yield null;
    return x + y;
}
var gen = foo(5);
console.log(gen.next());     // { value: 6, done: false }
console.log(gen.next());     // { value: null, done: false }
console.log(gen.next());     // { value: NaN, done: true }
// console.log(gen.send(8));    // { value: 13, done: true }

var suspend = require('suspend');
var fs = require('fs');
suspend(function*(resume) {
  var data = yield fs.readFile(__filename, 'utf8', resume);
  if (data[0]) {
    throw data[0];
  }
  console.log(data[1]);
})();

// 常规实现
// client.hmset('blog::post', { date: '20130605', title: 'g3n3rat0rs r0ck', tags: 'js,node'},
// function(err, res) {
//   if(err) throw err;
//   client.hgetall('blog::post', function(err, post) {
//     if(err) throw err;
//     var tags = post.tags.split(',');
//     var posts = [];
//     tags.forEach(function(tag) {
//       client.hgetall('post::tag::' + tag, function(err, taggedPost) {
//         if(err) throw err;
//         posts.push(taggedPost);
//         if(posts.length == tags.length) {
//           // do something with post and taggedPosts
//           client.quit();
//         }
//       });
//     });
//   });
// });

// Q promises 实现
// var db = {
//   get: Q.nbind(client.get, client),
//   set: Q.nbind(client.set, client),
//   hmset: Q.nbind(client.hmset, client),
//   hgetall: Q.nbind(client.hgetall, client)
// };
// db.hmset('blog::post', { date: '20130605', title: 'g3n3rat0rs r0ck', tags: 'js,node' })
// .then(function() {
//   return db.hgetall('blog::post');
// }).then(function(post) {
//   var tags = post.tags.split(',');
//   return Q.all(tags.map(function(tag) {
//     return db.hgetall('blog::tag::' + tag);
//   })).then(function(taggedPosts) {
//     // do something with post and taggedPosts
//     client.quit();
//   });
// }).done();

// 生成器实现
// Q.async(function*() {
//   yield db.hmset('blog::post', { date: '20130605', title: 'g3n3rat0rs r0ck', tags: 'js,node' });
//   var post = yield db.hgetall('blog::post');
//   var tags = post.tags.split(',');
//   var taggedPosts = yield Q.all(tags.map(function(tag) {
//     return db.hgetall('blog::tag::' + tag);
//   }));
//   // do something with post and taggedPosts
//   client.quit();
// })().done();

// 带异常处理
// Q.async(function*() {
//   try {
//     var post = yield db.hgetall('blog::post');
//     var tags = post.tags.split(',');
//     var taggedPosts = yield Q.all(tags.map(function(tag) {
//       return db.hgetall('blog::tag::' + tag);
//     }));
//     // do something with post and taggedPosts
//   } catch(e) {
//     console.log(e);
//   }
//   client.quit();
// })();

// var getTaggedPosts = Q.async(function*() {
//   var post = yield db.hgetall('blog::post');
//   var tags = post.tags.split(',');
//   return Q.all(tags.map(function(tag) {
//     return db.hget('blog::tag::' + tag);
//   }));
// });

// Q.async(function*() {
//   var tagged = yield getTaggedPosts();
//   // do something with the tagged array
// })().done();

// Q.spawn(function*() {
//   var tagged = yield getTaggedPosts();
//   // do something with the tagged array
// });

// 模板字符串 --------------------------------------------------
// 反撇号（`）基础知识
// ES6引入了一种新型的字符串字面量语法，我们称之为模板字符串（template strings）。
// 除了使用反撇号字符 ` 代替普通字符串的引号 ' 或 " 外，它们看起来与普通字符串并无二致。
// 在最简单的情况下，它们与普通字符串的表现一致：
console.log(`Ceci n'est pas une chaîne.`);
// 模板字符串名之有理，它为JavaScript提供了简单的字符串插值功能，
// 从此以后，你可以通过一种更加美观、更加方便的方式向字符串中插值了。
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      `用户 ${user.name} 未被授权执行 ${action} 操作。`);
  }
}
// 模板字符串不仅仅是比 + 运算符更优雅的语法
//     * 模板占位符中的代码可以是任意JavaScript表达式，所以函数调用、算数运算等这些都可以作为占位符使用，
//       你甚至可以在一个模板字符串中嵌套另一个，我称之为模板套构（template inception）。
//     * 如果这两个值都不是字符串，可以按照常规将其转换为字符串。
//       例如：如果action是一个对象，将会调用它的.toString()方法将其转换为字符串值。
//     * 如果你需要在模板字符串中书写反撇号，你必须使用反斜杠将其转义：`\``等价于"`"。
//     * 同样地，如果你需要在模板字符串中引入字符$和{。
//       无论你要实现什么样的目标，你都需要用反斜杠转义每一个字符：`\$`和`\{`。
// 与普通字符串不同的是，模板字符串可以多行书写：
console.log(`
  <h1>小心！>/h1>
  <p>未经授权打冰球可能受罚
  将近10分钟。</p>
`);
// 当然，模板字符串也并非事事包揽：
//     * 它们不会为你自动转义特殊字符，为了避免跨站脚本漏洞，
//       你应当像拼接普通字符串时做的那样对非置信数据进行特殊处理。
//     * 它们无法很好地与国际化库（可以帮助你面向不同用户提供不同的语言）相配合，
//       模板字符串不会格式化特定语言的数字和日期，更别提同时使用不同语言的情况了。
//     * 它们不能替代模板引擎的地位，例如：Mustache、Nunjucks。
// 模板字符串没有内建循环语法，所以你无法通过遍历数组来构建类似HTML中的表格，甚至它连条件语句都不支持。
// 你当然可以使用模板套构（template inception）的方法实现，但在我看来这方法略显愚钝啊。

// ES6为JS开发者和库设计者提供了一个很好的衍生工具，
// 你可以借助这一特性突破模板字符串的诸多限制，我们称之为标签模板（tagged templates）。
// 标签模板的语法非常简单，在模板字符串开始的反撇号前附加一个额外的标签即可。
// 我们的第一个示例将添加一个SaferHTML标签，我们要用这个标签来解决上述的第一个限制：自动转义特殊字符。
// 请注意，ES6标准库不提供类似SaferHTML功能，我们将在下面自己来实现这个功能。
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);
    // 转义占位符中的特殊字符。
    s += arg.replace(/&/g, "&")
            .replace(/</g, "<")
            .replace(/</g, ">");
    // 不转义模板中的特殊字符。
    s += templateData[i];
  }
  return s;
}
var user = 'demo';
var message = SaferHTML`<p>${user} 向你示好。</p>`;
console.log(message);
// 精确地说，任何ES6的成员表达式（MemberExpression）或调用表达式（CallExpression）都可作为标签使用。
// 上面的代码等效于：
var message = SaferHTML(`<p>${user} 向你示好。</p>`, user);
console.log(message);

// 模板字符串没有内建的国际化特性，但是通过标签，我们可以添加这些功能。
// Jack Hsu的一篇博客文章展示了具体的实现过程。我谨在此处抛砖引玉：
// i18n`Hello ${name}, you have ${amount}:c(CAD) in your bank account.`
// => Hallo Bob, Sie haben 1.234,56 $CA auf Ihrem Bankkonto.

// ***标签模板以开放的姿态欢迎库设计者们来创建强有力的领域特定语言。
// 这些语言可能看起来不像JS，但是它们仍可以无缝嵌入到JS中并与JS的其它语言特性智能交互。
// 我不知道这一特性将会带领我们走向何方，但它蕴藏着无限的可能性，这令我感到异常兴奋！

// 不定参数和默认参数 -------------------------------------
// 我们通常使用可变参函数来构造API，可变参函数可接受任意数量的参数。
// 例如，String.prototype.concat方法就可以接受任意数量的字符串参数。
// ES6提供了一种编写可变参函数的新方式——不定参数。
// 我们通过一个简单的可变参数函数containsAll给大家演示不定参数的用法。
// 函数containsAll可以检查一个字符串中是否包含若干个子串
// 首先使用传统方法来实现这个函数：
function containsAll(haystack) {
  for (var i = 1; i < arguments.length; i++) {
    var needle = arguments[i];
    if (haystack.indexOf(needle) === -1) {
      return false;
    }
  }
  return true;
}
// 在这个实现中，我们用到了神奇的arguments对象，它是一个类数组对象，其中包含了传递给函数的所有参数。
// 这段代码实现了我们的需求，但它的可读性却不是最理想的。
// 函数的参数列表中只有一个参数haystack，我们无法一眼就看出这个函数实际上接受了多个参数。
// 另外，我们一定要注意，应该从1开始迭代，而不是从0开始，因为arguments[0]相当于参数haystack。
// 如果我们想要在haystack前后添加另一个参数，我们一定要记得更新循环体。
console.log(containsAll("banana", "b", "nan"));
console.log(containsAll("banana", "c", "nan"));

// 不定参数恰好可以解决可读性与参数索引的问题。
// 下面是用ES6不定参数特性实现的containsAll函数：
// function containsAll(haystack, ...needles) {  // ES6...
//   for (var needle of needles) {
//     if (haystack.indexOf(needle) === -1) {
//       return false;
//     }
//   }
//   return true;
// }
// console.log(containsAll("banana", "b", "nan"));
// console.log(containsAll("banana", "c", "nan"));
// 在所有函数参数中，只有最后一个才可以被标记为不定参数。
// 函数被调用时，不定参数前的所有参数都正常填充，任何“额外的”参数都被放进一个数组中并赋值给不定参数。
// 如果没有额外的参数，不定参数就是一个空数组，它永远不会是undefined。

// 默认参数
// 通常来说，函数调用者不需要传递所有可能存在的参数，没有被传递的参数可由感知到的默认参数进行填充。
// JavaScript有严格的默认参数格式，未被传值的参数默认为undefined。
// ES6引入了一种新方式，可以指定任意参数的默认值。
// 下面是一个简单的示例（反撇号表示模板字符串，上周已经讨论过。）：
// function animalSentence(animals2 = "tigers", animals3 = "bears") {  // ES6...
//   return `Lions and ${animals2} and ${animals3}! Oh my!`;
// }
// animalSentence();                       // Lions and tigers and bears! Oh my!
// animalSentence("elephants");            // Lions and elephants and bears! Oh my!
// animalSentence("elephants", "whales");  // Lions and elephants and whales! Oh my!
// 默认参数的定义形式为[param1[ = defaultValue1 ][, ..., paramN[ = defaultValueN ]]]，
// 对于每个参数而言，定义默认值时=后的部分是一个表达式，如果调用者没有传递相应参数，将使用该表达式的值作为参数默认值。
//     * 默认值表达式在函数调用时自左向右求值，这一点与Python不同。
//       这也意味着，默认表达式可以使用该参数之前已经填充好的其它参数值。
//     * 传递undefined值等效于不传值
//     * 没有默认值的参数隐式默认为undefined
// 举个例子，我们优化一下刚刚那个动物语句函数：
// function animalSentenceFancy(animals2="tigers", animals3=(animals2 == "bears") ? "sealions" : "bears") {
//   return `Lions and ${animals2} and ${animals3}! Oh my!`;
// }
// 现在，animalSentenceFancy("bears")将返回“Lions and bears and sealions. Oh my!”。
// 现在我们已经看到了arguments对象可被不定参数和默认参数完美代替，移除arguments后通常会使代码更易于阅读。
// 除了破坏可读性外，众所周知，针对arguments对象对JavaScript虚拟机进行的优化会导致一些让你头疼不已的问题。
// 我们期待着不定参数和默认参数可以完全取代arguments，要实现这个目标，标准中增加了相应的限制：
// 在使用不定参数或默认参数的函数中禁止使用arguments对象。
// 曾经实现过arguments的引擎不会立即移除对它的支持，当然，现在更推荐使用不定参数和默认参数。

// 解构 Destructuring
// 解构赋值允许你使用类似数组或对象字面量的语法将数组和对象的属性赋给各种变量。
// 这种赋值语法极度简洁，同时还比传统的属性访问方法更为清晰。
// 通常来说，你很可能这样访问数组中的前三个元素：
var someArray = [0, 1, 2, 3, 4, 5];
var first = someArray[0];
var second = someArray[1];
var third = someArray[2];
// 如果使用解构赋值的特性，将会使等效的代码变得更加简洁并且可读性更高：
// var [first, second, third] = someArray;  // ES6...
// 可以对任意深度的嵌套数组进行解构：
// var [foo, [[bar], baz]] = [1, [[2], 3]];
// 可以在对应位留空来跳过被解构数组中的某些元素：
// var [,,third] = ["foo", "bar", "baz"];
// 可以通过“不定参数”模式捕获数组中的所有尾随元素：
// var [head, ...tail] = [1, 2, 3, 4];
// 当访问空数组或越界访问数组时，对其解构与对其索引的行为一致，最终得到的结果都是：undefined。
// var [missing] = [];
// 数组解构赋值的模式同样适用于任意迭代器：
// function* fibs() {
//   var a = 0;
//   var b = 1;
//   while (true) {
//     yield a;
//     [a, b] = [b, a + b];
//   }
// }
// var [first, second, third, fourth, fifth, sixth] = fibs();

// 通过解构对象，你可以把它的每个属性与不同的变量绑定，首先指定被绑定的属性，然后紧跟一个要解构的变量。
// var robotA = { name: "Bender" };
// var robotB = { name: "Flexo" };
// var { name: nameA } = robotA;
// var { name: nameB } = robotB;
// 当属性名与变量名一致时，可以通过一种实用的句法简写：
// var { foo, bar } = { foo: "lorem", bar: "ipsum" };
// 与数组解构一样，你可以随意嵌套并进一步组合对象解构：
var complicatedObj = {
  arrayProp: [
    "Zapp",
    { second: "Brannigan" }
  ]
};
// var { arrayProp: [first, { second }] } = complicatedObj;
// 当你解构一个未定义的属性时，得到的值为undefined：
// 当你解构对象并赋值给变量时，如果你已经声明或不打算声明这些变量
// （亦即赋值语句前没有let、const或var关键字），你应该注意这样一个潜在的语法错误：
// { blowUp } = { blowUp: 10 };   // Syntax error 语法错误
// 为什么会出错？这是因为JavaScript语法通知解析引擎将任何以{开始的语句解析为一个块语句
// （例如，{console}是一个合法块语句）。解决方案是将整个表达式用一对小括号包裹：
// ({ safe } = {});    // No errors 没有语法错误
// 解构值不是对象、数组或迭代器
// 当你尝试解构null或undefined时，你会得到一个类型错误：
// var {blowUp} = null;   // TypeError: null has no properties（null没有属性）
// 你可以解构其它原始类型，例如：布尔值、数值、字符串，但是你将得到undefined：
// var {wtf} = NaN;    // undefined
// 当使用对象赋值模式时，被解构的值需要被强制转换为对象。
// 大多数类型都可以被转换为对象，但null和undefined却无法进行转换。
// 当使用数组赋值模式时，被解构的值一定要包含一个迭代器。
// 当你要解构的属性未定义时你可以提供一个默认值：
// var [missing = true] = [];

// 与ES6迭代器协议协同使用
// var map = new Map();
// map.set(window, "the global");
// map.set(document, "the document");
// for (var [key, value] of map) {
//   console.log(key + " is " + value);
// }

// JavaScript语言中尚未整合多重返回值的特性，但是无须多此一举，因为你自己就可以返回一个数组并将结果解构：
function returnMultipleValues() {
  return [1, 2];
}
// var [foo, bar] = returnMultipleValues();
// 或者，你可以用一个对象作为容器并为返回值命名：
function returnMultipleValues() {
  return {foo: 1, bar: 2};
}
// var { foo, bar } = returnMultipleValues();
// 或者使用CPS变换：
// function returnMultipleValues(k) {
//   k(1, 2);
// }
// returnMultipleValues((foo, bar) => ...);

// 使用解构导入部分CommonJS模块
// 你是否尚未使用ES6模块？还用着CommonJS的模块呢吧！
// 没问题，当我们导入CommonJS模块X时，很可能在模块X中导出了许多你根本没打算用的函数。
// 通过解构，你可以显式定义模块的一部分来拆分使用，同时还不会污染你的命名空间：
// const { SourceMapConsumer, SourceNode } = require("source-map");

// 箭头函数 Arrow Functions --------------------------
// -->是一个JS运算符：“趋向于”运算符！
function countdown(n) {
  while (n --> 0) {  // "n goes to zero"
    console.log(n);
  }
}
countdown(5);
// <!--	单行注释
// -->	“趋向于”操作符
// <=	小于等于
// =>	这又是什么？

// ES6中引入了一种编写函数的新语法
// ES5
// var selected = allJobs.filter(function (job) {
//   return job.isSelected();
// });
// ES6
// var selected = allJobs.filter(job => job.isSelected());
// 当你只需要一个只有一个参数的简单函数时，可以使用新标准中的箭头函数，
// 它的语法非常简单：标识符=>表达式。你无需输入function和return，一些小括号、大括号以及分号也可以省略。

// 如果要写一个接受多重参数（也可能没有参数，或者是不定参数、默认参数、参数解构）的函数，你需要用小括号包裹参数list。
// ES5
var values = [0, 1, 2, 3, 4];
var total = values.reduce(function (a, b) {
  return a + b;
}, 0);
console.log(total);
// ES6
// var total = values.reduce((a, b) => a + b, 0);
// console.log(total);

// ES5
// $("#confetti-btn").click(function (event) {
//   playTrumpet();
//   fireConfettiCannon();
// });
// ES6
// $("#confetti-btn").click(event => {
//   playTrumpet();
//   fireConfettiCannon();
// });

// 为与你玩耍的每一个小狗创建一个新的空对象
// var chewToys = puppies.map(puppy => {});   // 这样写会报Bug！
// var chewToys = puppies.map(puppy => ({})); //

// 普通function函数和箭头函数的行为有一个微妙的区别，箭头函数没有它自己的this值，箭头函数内的this值继承自外围作用域。
// 箭头函数与非箭头函数间还有一个细微的区别，箭头函数不会获取它们自己的arguments对象。
// 诚然，在ES6中，你可能更多地会使用不定参数和默认参数值这些新特性。

// 这是用Church的lambda标记写出来的数学家风格的“程序”示例：
// fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)));
// 等效的JavaScript函数是这样的：
// var fix = f => (x => f(v => x(x)(v)))
//                (x => f(v => x(x)(v)));
