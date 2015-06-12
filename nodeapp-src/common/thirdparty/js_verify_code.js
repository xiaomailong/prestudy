//js验证码
//by http://www.jbxue.com
function isInt(str) {
 return /^(-|\+)?\d+$/.test(str);
}

function isBigZero(str) {
 return /^\d+$/.test(str);
}

function isLessZero(str) {
 return /^-\d+$/.test(str);
}

function isFloat(str){
 return /^(-?\d+)(\.\d+)?$/.test(str);
}

function isTime(str) {
 var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
 if (a == null) {
  alert("输入的参数不是时间格式");
  return false;
 }
 if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
  alert("时间格式不对");
  return false;
 }
 return true;
}

function isDate(str){
 var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
 if(r == null)return false;
 var d = new Date(r[1], r[3]-1, r[4]);
 return (d.getFullYear() == r[1]&&(d.getMonth()+1) == r[3]&&d.getDate() == r[4]);
}

function isDateTime(str){
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
 var r = str.match(reg);
 if(r == null) return false;
 var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
 return (d.getFullYear() == r[1]&&(d.getMonth()+1) == r[3]&&d.getDate() == r[4]&&d.getHours() == r[5]&&d.getMinutes() == r[6]&&d.getSeconds() == r[7]);
} 

function isValiStr(str){
 return /^([a-zA-z_]{1})([\w]*)$/g.test(str);
}

function isMail(str){
 var pattern =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
    if(str!=""){
        if(!pattern.exec(str)){
         alert("请输入正确的邮箱地址");
         return false;
        }
    }
    return true;
}

function isEmail(str){
 return isMail(str);
}

function isCard(num){
    num = num.toUpperCase();
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。 ');
        return false;
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    var len, re; len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);  // 检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay; bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            alert('输入的身份证号里出生日期不对！');
            return false;
        } else { // 将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD
     // 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);  // 检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay; bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            alert('输入的身份证号里出生日期不对！');
            return false;
        }
        else { // 检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD
    // 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                alert('18位身份证的校验码不正确！应该为：' + valnum);
                return false;
            }
            return true;
        }
    }
   
    return false;
}

function isCardNum(num){
 return isCard(num);
}

function isCardId(num){
 return isCard(num);
}

function isIP(str){
 var check=function(v){try{return (v<=255 && v>=0);}catch(x){return false;}};
 var re=str.split(".");
 return (re.length==4)?(check(re[0]) && check(re[1]) && check(re[2]) && check(re[3])):false;
}

function isIp(str){
 return isIP(str);
}

function isUrl(str){
  var regExp = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
     return str.match(regExp);
}

function isUrl2(str){
    var regExp = /(?:(?:http[s]?|ftp):\/\/)?[^\/\.]+?\.[^\.\\\/]+?\.\w{2,}$/i;
    return str.match(regExp);
}

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

function isPhone(str){
 var reg = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
 return reg.test(str);
}

function isCorporationCode(s){
 var patrn = /^(\d){15}$/;
 return patrn.exec(s);
}

function isAreaCode(s){
 var patrn = /^(\d){6}$/;
 return patrn.exec(s);
}

function isPostalCode(str){
 var patrn=/^[1-9]{1}(\d){5}$/;
 return patrn.exec(str);
}

function isChinese(str){
 var pattern=/[^\x00-\xff]/g;
 return pattern.test(str);
}

function isQQ(str){
 return /^\d{5,9}$/.test(str);
}