
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

// Babel also has experimental support for ES7 proposals.
// Subject to change
// These proposals are subject to change so use with extreme caution. Babel may update without warning in order to track spec changes.
// The TC39 categorises proposals into 4 stages:

// Stage 0 - Strawman
// Stage 1 - Proposal
// Stage 2 - Draft
// Stage 3 - Candidate
// Stage 4 - Finished
// Proposals that are stage 2 or above are enabled by default. Now this does not mean that they're guaranteed to be included in future ECMAScript specifications or maintained in Babel itself. Stage 2 is considered a good point for inclusion by default in Babel due to their relative maturity and need for critical proposal feedback.

// Status

// Stage 0
// es7.comprehensions
// es7.classProperties
// es7.doExpressions
// es7.functionBind
// Stage 1
// es7.decorators
// es7.exportExtensions
// es7.trailingFunctionCommas
// Stage 2
// NOTE: Stage 2 and above are enabled by default.

// es7.exponentiationOperator
// es7.asyncFunctions
// es7.objectRestSpread
// Usage

// Enable by stage
// $ babel --stage 0
// babel.transform("code", { stage: 0 });
// Enable by transformer
// $ babel --optional es7.decorators
// babel.transform("code", { optional: ["es7.decorators"] });

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
