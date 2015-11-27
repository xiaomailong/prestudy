// /* @flow */
// function getEnvVersion() {
//   return '1.0.1';
// }
//
// if(getEnvVersion() > 1) {
//
// }

/* @flow */
function size(str) {
  if (typeof str === 'string') {
    return str.length;
  } else {
    return 0;
  }
  // return str.length;
}
var len = size(null);

/* @flow */
function add(num1: number, num2: number) {
  return num1 + num2;
}
add(3, 12);
// add(3, '0');
add('123456789', '987654321');
