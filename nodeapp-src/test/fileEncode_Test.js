var iconv = require("iconv-lite");
var fs = require("fs");

exports.UnderscoreObjectFunctions_Test = function(test) {

	var fileStr = fs.readFileSync('./test/test.txt', {encoding:'binary'});
	var buf = new Buffer(fileStr, 'binary');
	var str = iconv.decode(buf, 'utf8');
	test.equal(str, '测试文件第一行\n测试文件第二行\n');
	var fileStr2 = fs.readFileSync('./test/test.txt', {encoding:'utf8'});
	test.equal(fileStr2, '测试文件第一行\n测试文件第二行\n');

	test.done();
}
