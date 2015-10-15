
// Babel provides the following new language features straight out of the box:
// Arrow functions using => ,
// let ,
// const ,
// Classes,
// Template strings,
// Destructuring,
// Spread operator

// The following new features are supported but require including the Babel polyfill :
// Promises,
// Generators,
// Iterators,
// Data structures – Map , Set , WeakMap , and WeakSet .



[1,2,3].map(x => x * x);

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

if(require.main === module) {
  let pt = new Point(7, 4);
  console.log('My Point: ${JSON.Stringify(pt)}');
}
