var waterbolik = require("../common/waterbolik.js");

exports.UnderscoreObjectFunctions_Test = function(test) {

  test.equal(waterbolik.VERSION, '0.1.0');
  test.equal(waterbolik.formatMoneyByComma(1234567890.12), "1,234,567,890.12")



  test.done();
}
