var request = require('request');
var qs = require('querystring');

// Hi,欢迎使用中文转拼音服务
//
// API址址：
// http://string2pinyin.sinaapp.com/?str=中文
// 参数
// str - * 中文内容
// delimiter - 分隔符，默认为一个空格' '
// traditional - 使用繁体, 默认:0
// accent - 是否输出音调，默认:1
// letter - 只输出首字母，或者直接使用 Pinyin::letter($string)
// only_chinese只保留 $string 中中文部分, 默认:0
// 响应
// 正确：
//
// {
// status: "T",
// str: "中文转拼音服务",
// pinyin: "zhōng wén zhuǎn pīn yīn fú wù",
// setting:
// {
// accent: true,
// delimiter: " ",
// traditional: false,
// letter: false,
// only_chinese: false
// },
// doc: "http://string2pinyin.sinaapp.com/doc.html"
// }

function getPinYin(s) {
  var option = {
    url: 'http://string2pinyin.sinaapp.com/',
    qs: {
      str: s, // * 中文内容
      accent: 1, // 是否输出音调，默认:1
      delimiter: " ", //  分隔符，默认为一个空格' '
      traditional: 0, // 使用繁体, 默认:0
      letter: 0, // 只输出首字母，或者直接使用 Pinyin::letter($string)
      only_chinese: 0 // 只保留 $string 中中文部分, 默认:0
    }
  }

  request(option, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      var o = JSON.parse(body);
      console.log('<ruby>' + o.str + '<rt>' + o.pinyin + '</rt></ruby>');
    }
  });
}

// getPinYin('南郭子綦隐机而坐，仰天而嘘，答焉似丧其耦。颜成子游立侍乎前，曰：“何居乎？形固可使如槁木，而心固可使如死灰乎？今之隐机者，非昔之隐机者也。”子綦曰：“偃，不亦善乎？而问之也。今者吾丧我，汝知之乎？汝闻人籁而未闻地籁，汝闻地籁而未闻天籁夫。”子游曰：“敢问其方？”子綦曰：“夫大块噫气，其名为风。是唯无作，作则万窍怒号。而独不闻之蓼蓼乎？山林之畏佳，大木百围之窍穴，似鼻，似口，似耳，似趼，似圈，似臼，似洼者，似污者，激者，稿者，叱者，吸者，叫者，嚎者，窈者，咬者。前者唱于，而随者唱禺。泠风得小和，飘风则大和，厉风济则众窍为虚。而独不见之调调之刁刁乎？”子游曰：“地籁则众窍是已，人籁则比竹是已。敢问天籁？”子綦曰：“夫吹万不同，而使其子已也，咸其自取，怒者其谁邪！”');


var pinyin = require("pinyin");

// console.log(pinyin("中心"));    // [ [ 'zhōng' ], [ 'xīn' ] ]
// console.log(pinyin("中心", {
//   heteronym: true               // 启用多音字模式
// }));                            // [ [ 'zhōng', 'zhòng' ], [ 'xīn' ] ]
// console.log(pinyin("中心", {
//   heteronym: true,              // 启用多音字模式
//   segment: true                 // 启用分词，以解决多音字问题。
// }));                            // [ [ 'zhōng' ], [ 'xīn' ] ]
// console.log(pinyin("中心", {
//   style: pinyin.STYLE_INITIALS, // 设置拼音风格
//   heteronym: true
// }));                            // [ [ 'zh' ], [ 'x' ] ]

var option = {
  heteronym: false,               // 启用多音字模式
  segment: true,                 // 启用分词，以解决多音字问题。
  style: pinyin.STYLE_TONE,      // 设置拼音风格
}

var str = '了然来了，了凡交还什么，什锦便当很便宜';

console.log(pinyin(str, option));

var nodejieba = require("nodejieba");
var result = nodejieba.cut(str);
console.log(result);

getPinYin(str);

// 载入模块
var Segment = require('segment');
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();

// 开始分词
var result = segment.doSegment(str, {
  simple: true
});
console.log(result);

var cedict = require('node-cc-cedict');

cedict.searchByChinese('世界', function(words){
  console.log(words);
});
