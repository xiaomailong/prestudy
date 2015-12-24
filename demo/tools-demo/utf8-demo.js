var utf8 = require('utf8');

console.log(utf8.encode('\xA9')); // Â©
console.log(utf8.encode('\uD800\uDC01')); // ð
console.log(utf8.decode('\xC2\xA9')); // ©𐀁
console.log(utf8.decode('\xF0\x90\x80\x81')); //
