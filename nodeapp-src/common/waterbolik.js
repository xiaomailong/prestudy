//     waterbolik.js 0.1.0
//     http://waterbolik.github.io
//     (c) 2014-2015 Water Bolik
//     WaterBolik may be freely distributed under the MIT license.

(function() {

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousWaterBolik = root.waterbolik;

  // Create a safe reference to the Underscore object for use below.
  var waterbolik = function(obj) {
    if (obj instanceof waterbolik) return obj;
    if (!(this instanceof waterbolik)) return new waterbolik(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `waterbolik` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = waterbolik;
    }
    exports.waterbolik = waterbolik;
  } else {
    root.waterbolik = waterbolik;
  }

  // Current version.
  waterbolik.VERSION = '0.1.0';

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  waterbolik.noConflict = function() {
    root.waterbolik = previousWaterBolik;
    return this;
  };

  waterbolik.getCitizenIdentityCardInfo = require("./lib/CitizenIdentityCard.js");
  waterbolik.md5 = require("./lib/md5.js");
  waterbolik.sha256 = require("./lib/sha256.js");

  // 格式化数字成0,000.00
  waterbolik.formatMoneyByComma = function(value) {
    var result = "";
    var valueParts = value.toString().split(".");
    // 最高有效数字位，默认为个位
    var mostSignificationDigit = valueParts[0].length -1;
    var intervalOfDigit = 0; 	// 逗号之间的位数
    var digit, countOfSignificationDigit;
    for (var i = valueParts[0].length -1; i >= 0; i--) {
      digit = valueParts[0][i];
      result = digit + result;
      if (digit != "0") {
        mostSignificationDigit = i;
      }
      if (3 == ++intervalOfDigit) {
        result = "," + result;
        intervalOfDigit = 0;
      }
    }
    if (mostSignificationDigit == -1) {
      result = "0";
    }
    else {
      countOfSignificationDigit = valueParts[0].length - mostSignificationDigit;
      if (countOfSignificationDigit > 3) {
        result = result.substring(result.length - (countOfSignificationDigit%3 == 0 ? countOfSignificationDigit/3 - 1 : countOfSignificationDigit/3)  - countOfSignificationDigit);
      }
      else {
        result = result.substring(result.length - countOfSignificationDigit);
      }
    }
    if (valueParts.length == 2) {
      result += ".";
      var temp = 2 - valueParts[1].length;	// 是否需要补0
      for (var i = 0; i < temp; i++) {
        valueParts[1] += "0"
      }
      result += valueParts[1].substring(0, 2);
    }
    else {
      result += ".00";
    }
    return result;
  }

  // 鼠标再次聚焦文本域，就清除货币格式，显示无格式的数字
  // function clearAllFormat(value){
  //     return value.replace(/,/g,"");
  //   }
  // }


  // 验证是否为浮点数
  // function checkNumberIsLegal22(obj){
  //   if(!/^[0-9]+(\.[0-9]+){0,1}$/.test(obj)){
  //     return false;
  //   }
  //   return true;
  // }


  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('waterbolik', [], function() {
      return waterbolik;
    });
  }
}.call(this));
