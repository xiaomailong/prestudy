// JavaScript工具库之Lodash
// http://greengerong.com/blog/2015/04/11/qian-duan-ku-zhi-lodash/

// 你还在为JavaScript中的数据转换、匹配、查找等烦恼吗？
// 一堆看似简单的foreach，却冗长无趣，可仍还在不停的repeat it！
// 也许你已经用上了Underscore.js，不错，你已经进步很大一步了。
// 然而今天我希望你能更进一步，利用lodash替换掉Underscore。

// lodash一开始是Underscore.js库的一个fork，因为和其他(Underscore.js的)贡献者意见相左。
// John-David Dalton的最初目标，是提供更多“一致的跨浏览器行为……，并改善性能”。
// 之后，该项目在现有成功的基础之上取得了更大的成果。
// 最近lodash也发布了3.5版，成为了npm包仓库中依赖最多的库。
// 它正在摆脱屌丝身份，成为开发者的常规选择之一。

// 现在我们所熟知的很多开源项目都已经使用或者转到了lodash阵营之上。
// 比如JavaScript转译器Babel、博客平台Ghost，和项目脚手架工具Yeoman。
// 特别Ghost是从Underscore迁移到了lodash，Ghost的创始人John O’Nolan对于此曾评价到：
// “这是一个非常明智的选择，它几乎完全是由我们开源开发社区推动的。
//  我们发现lodash包含更多的功能，更好的性能、恰到好处地使用了semver，
//  并且在Node.js社区（以及其他依赖）中越来越抢眼“。

// Lodash以链式、惰性求值著称，形成了一套自有的DSL风格。

var _ = require('lodash')
var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 18 }
];

var names = _.chain(users)
    .pluck('user')
    .join(" , ")
    .value();
console.log(names);

// 我们希望获取最年轻的用户：
var y = _.chain(users)
  .sortBy("age")
  .first()
  .value();
console.log(y);
