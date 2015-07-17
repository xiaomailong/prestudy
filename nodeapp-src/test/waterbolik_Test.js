var waterbolik = require("../common/waterbolik.js");

exports.UnderscoreObjectFunctions_Test = function(test) {

  test.equal(waterbolik.VERSION, '0.1.0');
  test.equal(waterbolik.formatMoneyByComma(1234567890.12), "1,234,567,890.12")

  var card = waterbolik.getCitizenIdentityCardInfo("610103197705012475");
  test.ok(card.isVerified);
  test.equal(card.errorInfo, "");
  test.equal(card.year, "1977");
  test.equal(card.month, 5-1);
  test.equal(card.day, "1");
  test.equal(card.birthday, new Date(1977, 5-1, 1).toLocaleDateString());
  test.equal(card.province, "陕西省");
  test.equal(card.city, "陕西省西安市");
  test.equal(card.county, "陕西省西安市碑林区");
  test.equal(card.sex, "男");
  test.equal(card.cardNumber, "610103197705012475");

  card = waterbolik.getCitizenIdentityCardInfo("610103770501247");
  test.equal(card.cardNumber, "610103197705012475");

  card = waterbolik.getCitizenIdentityCardInfo("411023198601033528");
  test.ok(card.isVerified);
  test.equal(card.errorInfo, "");
  test.equal(card.year, "1986");
  test.equal(card.month, 1-1);
  test.equal(card.day, 3);
  test.equal(card.birthday, new Date(1986, 1-1, 3).toLocaleDateString());
  test.equal(card.province, "河南省");
  test.equal(card.city, "河南省许昌市");
  test.equal(card.county, "河南省许昌县");
  test.equal(card.sex, "女");
  test.equal(card.cardNumber, "411023198601033528");

  card = waterbolik.getCitizenIdentityCardInfo("653131231221242");
  test.ok(card.isVerified);
  test.equal(card.cardNumber, "653131192312212428");
  test.equal(card.county, "新疆塔什库尔干塔吉克自治县");

  test.equal(waterbolik.md5("abc"), "900150983cd24fb0d6963f7d28e17f72");
  test.equal(waterbolik.sha256("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");

  test.equal(waterbolik.getLocalIP().toString(), "10.11.20.75,10.211.55.2,10.37.129.2");

  test.equal(waterbolik.Kaprekar(6767), 4);
  test.equal(waterbolik.Kaprekar(14), 7);
  test.equal(waterbolik.Kaprekar(9985), 7);
  waterbolik.Kaprekar(Math.floor(Math.random() * 10000));
  var j = 0, k = 0;
  for (var i = 0; i < 10000; i++) {
    k = waterbolik.Kaprekar(i);
    if (k > j) {
      j = k;
      // console.log(i + ": " + j);
    }
  }
  test.equal(j, 7);

  test.done();
}
