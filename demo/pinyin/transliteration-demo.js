var tr = require('transliteration');
var tr = require('transliteration');
var slugify = require('transliteration').slugify;
console.log(tr('庄子·内篇·逍遥游第一')); // Ni Hao ,Shi Jie
console.log(slugify('庄子·内篇·逍遥游第一')); // Ni Hao ,Shi Jie
console.log(slugify('庄子·内篇·逍遥游第一', {lowercase: false, separator: '_'})); // Ni Hao ,Shi Jie
