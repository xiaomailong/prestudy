require("babel/polyfill");

var pinyin = require("../pinyin-rb.js");

var option = {
  heteronym: true, // 启用多音字模式
  segment: true, // 启用分词，以解决多音字问题。
  style: pinyin.STYLE_RUBY, // 设置拼音风格
}
var fs = require('fs');

var readFile = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

var writeFile = function (fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

// var readFile = require('fs-readfile-promise');
// var writeFile = require('fs-writefile-promise');

// 写成 async 函数，就是下面这样。
var pinyinProcess = async function () {
  var file = await readFile('./经典诵读原版/千字文.txt');
  var strFile = file.toString();
  // console.log(strFile);
  var strPinyin = pinyin(strFile, option)
    .join("");
  // console.log(strPinyin);
  await writeFile('./经典诵读拼音版/千字文拼音版.txt', strPinyin);
};

pinyinProcess();
