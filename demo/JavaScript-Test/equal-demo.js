
// switch里面的实际判断是==还是===?
var a = '5';
switch (a) {
    case 5:
        console.log('==');
        break;
    case "5":
        console.log('===');  // Output ===
        break;
    default:
}

var a = "5", b = 5;
console.log(a == b);          // true
console.log(a === b);         // false

var A = "ABC", B = "AB" + "C";
console.log(A === B);         // true
