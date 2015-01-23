// 给定任一个各位数字不完全相同的4位正整数，
// 如果我们先把4个数字按非递增排序，再按非递减排序，然后用第1个数字减第2个数字，将得到一个新的数字。
// 一直重复这样做，我们很快(最多七次)会停在有“数字黑洞”之称的6174，这个神奇的数字也叫Kaprekar常数。
// 例如，我们从6767开始，将得到
// 7766 - 6677 = 1089
// 9810 - 0189 = 9621
// 9621 - 1269 = 8352
// 8532 - 2358 = 6174
// 7641 - 1467 = 6174
// 输入给出一个(0, 10000)区间内的正整数N。
// 如果N的4位数字全相等，则在一行内输出“N - N = 0000”；
// 否则将计算的每一步在一行内输出，直到6174作为差出现，输出格式见样例。注意每个数字按4位数格式输出。
function Kaprekar(n) {
	n = Number.parseInt(n);
	if (n < 0  || n > 9999) {
		// console.log(n + ": 不完全相同的4位正整数");
		return -1;
	}
  var nArray = parseArray4(n);
	if (nArray[0] == nArray[1] && nArray[1] == nArray[2] && nArray[2] == nArray[3]) {
		// console.log(n + ": 4位数字全相等");
		return 0;
	}
	var i = 0;
  while (n != 6174) {
		var nArray = parseArray4(n);
		nArray.sort();
		n1 = nArray[0] * 1000 + nArray[1] * 100 + nArray[2] * 10 + nArray[3];
		n2 = nArray[3] * 1000 + nArray[2] * 100 + nArray[1] * 10 + nArray[0];
		n = n2 - n1;
		i++;
		// console.log(n2 + " - " + n1 + " = " + n);
	}
	// console.log(i);
	return i;
}

function parseArray4(n) {
	return [Math.floor(n / 1000), Math.floor(n % 1000 / 100), Math.floor(n % 100 / 10), n % 10];
}

module.exports = Kaprekar;
