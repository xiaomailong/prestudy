
// 整数判断
function isInt(str) {
	return /^(-|\+)?\d+$/.test(str);
}

// 大于零
function isBigZero(str) {
	return /^\d+$/.test(str);
}

// 小于零
function isLessZero(str) {
	return /^-\d+$/.test(str);
}

// 浮点数
function isFloat(str){
	return /^(-?\d+)(\.\d+)?$/.test(str);
}

// 时间
function isTime(str) {
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) {
		// alert("输入的参数不是时间格式");
		return false;
	}
	if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
		// alert("时间格式不对");
		return false;
	}
	return true;
}

// 日期
function isDate(str){
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) {
		return false;
	}
	var d = new Date(r[1], r[3]-1, r[4]);
	return (d.getFullYear() == r[1]&&(d.getMonth()+1) == r[3]&&d.getDate() == r[4]);
}

// 日期+时间
function isDateTime(str){
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	var r = str.match(reg);
	if(r == null) return false;
	var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
	return (d.getFullYear() == r[1]&&(d.getMonth()+1) == r[3]&&d.getDate() == r[4]&&d.getHours() == r[5]&&d.getMinutes() == r[6]&&d.getSeconds() == r[7]);
}

// 字符串
function isValiStr(str){
	return /^([a-zA-z_]{1})([\w]*)$/g.test(str);
}

// 邮箱
function isEMail(str){
	var pattern =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
	if(str!=""){
		if(!pattern.exec(str)){
			alert("请输入正确的邮箱地址");
			return false;
		}
	}
	return true;
}

// IP地址
function isIP(str){
	var check=function(v){try{return (v<=255 && v>=0);}catch(x){return false;}};
	var re=str.split(".");
	return (re.length==4)?(check(re[0]) && check(re[1]) && check(re[2]) && check(re[3])):false;
}

// 互联网链接
function isUrl(str){
	var regExp = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
	return str.match(regExp);
}

// 带本地连接的链接
function isUrl2(str){
	var regExp = /(?:(?:http[s]?|ftp):\/\/)?[^\/\.]+?\.[^\.\\\/]+?\.\w{2,}$/i;
	return str.match(regExp);
}

// 所有链接
function isStrictUrl(str){
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	+ "|" // 允许IP和DOMAIN（域名）
	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
	+ "[a-z]{2,6})" // first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" // 端口- :80
	+ "((/?)|" // a slash isn't required if there is no file name
	+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

	var re=new RegExp(strRegex);
	return re.test(str);
}

// 手机号码
function isPhone(str){
	var reg = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
	return reg.test(str);
}

// 公司代码
function isCorporationCode(s){
	var patrn = /^(\d){15}$/;
	return patrn.exec(s);
}

// 区域码
function isAreaCode(s){
	var patrn = /^(\d){6}$/;
	return patrn.exec(s);
}

// 邮编
function isPostalCode(str){
	var patrn=/^[1-9]{1}(\d){5}$/;
	return patrn.exec(str);
}

// 中文
function isChinese(str){
	var pattern=/[^\x00-\xff]/g;
	return pattern.test(str);
}

// QQ号码
function isQQ(str){
	return /^\d{5,9}$/.test(str);
}

// 去除头部和尾部空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 去除头部空格
function ltrim(str) {
	return str.replace(/(^\s*)/g, "");
}

// 去除尾部空格
function rtrim(str) {
	return str.replace(/(\s*$)/g, "");
}

// 去除头尾和中间空格,制表符
function trimSpaces(str){
	var ResultStr = "";
	Temp=str.split(/\s/);
	for(i = 0; i < Temp.length; i++)
		ResultStr +=Temp[i];
		return ResultStr;
}
