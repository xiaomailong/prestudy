---
layout: post
title: ECMAScript6 Style Guide - Frontend Team of GF Securities
date: 2015-09-22T00:00:00.000Z
categories: JavaScript
tagline: JavaScript
tags:
  - JavaScript
---

# ECMAScript6 Style Guide - Frontend Team of GF Securities
> This style guide is based on standard specifications of JavaScript，only agreed for the ES6 related content

> Such as variable naming convention, whether to add a semicolon or not, please refer to JavaScript specification

> Note that the current code compiling tools ( such as Babel, Traceur) is not perfect , some features should be used with caution

## [ES6编码规范中文版本](https://github.com/gf-web/es6-coding-style/blob/master/README.md)
## Contents
1. [Declarations](# declarations)
2. [Strings](# strings)
3. [Destructuring](# destructuring)
4. [Arrays](# arrays)
5. [Functions](# functions)
6. [Classes](# classes)
7. [Modules](# modules)

### Declarations
- 1.1 Variables

> For only valid under the current scope of the variables , you should use `let` instead of `var`.

> For global variable declaration, using `var`, but should avoid excessively declaring global variables which pollutes the global namespace.

```js
// Bad
const variables;
const globalObj = null; // not a const
let globalObj = null;

for (var i = 0; i < 5; i++) {
  console.log(i);
}
console.log(i); // 4


// Good
let variables;
var globalObj = null;

for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log(i); // ReferenceError: i is not defined.
```

- 1.2 Constant

> For constant, using `const` to declare whose naming should be `lowerCamelCase`.

> For immutable data, using `const` to declare.

> Note : `const` and `let` are only valid within the block level which they are declared.

```js
// Bad
let someNum = 123;
const AnotherStr = 'InvariantString';
let arr = ['in', 'variant', 'array'];
var ANOTHER_OBJ = {
  'invariantObject': true
};


// Good
const someNum = 123;
const anotherStr = 'InvariantString';
const arr = ['in', 'variant', 'array'];
const anotherObj = {
  'invariantObject': true
};
```

[Back To Top](# contents)

### Strings
- 2.1 Handle multi-line strings , using the template string.

> Use backquote ( `) to mark.

> A readable, concise syntax with proper newlines and string interpolation features.

> Note: the space by formatting, using it for HTML template string.

```js
// Bad
const tmpl = '<div class="content"> \n' +
              '<h1>This is a new line.</h1> \n' +
            '</div>';


// Good
const tmpl = `
<div class="content">
  <h1>This is a new line.</h1>
</div>`;
```

- 2.2 When dealing with string and variable concatenation, use the `template string`.

```js
  // Bad
  function sayHi(name) {
    return 'How are you, ' + name + '?';
  }


  // Good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
```

[Back To Top](# contents)

### Destructuring
- 3.1 Layers of nested structures can not exceed 3 layers.

```js
// Bad
let obj = {
  'one': [
    { 'newTwo': [
        { 'three': [
            'four': 'too many layers, omg!'
          ]
        }
      ]
  ]
};


// Good
let obj = {
  'one': [
    'two',
    {'twoObj': 'A clear structure' }
  ]
};
```

- 3.2 Never use parentheses in destructuring.

```js
// Bad
[(a)] = [11]; // a is undefined
let { a: (b) } = {}; // Parsing error


// Good
let [a, b] = [11, 22];
```

- 3.3 Object destructuring

> Object elements are not related to the order of sequence.

> It is effective only when The object specifies the default value that equals to undefined (! = = null).

- 3.3.1 When a function parameter is an object, the object is used to assign a value.

```js
// Bad
function someFun(opt) {
  let opt1 = opt.opt1;
  let opt2 = opt.opt2;
  console.log(op1);
}


// Good
function someFun(opt) {
  let { opt1, opt2 } = opt;
  console.log(`$(opt1) 加上 $(opt2)`);
}

function someFun({opt1, opt2}) {
  console.log(opt1);
}
```

- 3.3.2 Use object destructuring for multiple return values rather than array destructuring, avoid the order problem when adding.

```js
// Bad
function anotherFun() {
  const one = 1, two = 2, three = 3;
  return [one, two, three];
}
const [one, three, two] = anotherFun(); // out of order


// Good
function anotherFun() {
  const one = 1, two = 2, three = 3;
  return { one, two, three };
}
const { one, three, two } = anotherFun(); // let the order be
```

- 3.3.3 Declared variable can not be used deconstruction assignment（syntax error).

```js
// syntax error
let a;
{a} = { a: 123 };
```

- 3.4 Array destructuring

> Array elements are related to the order of sequence.

- 3.4.1 Swap the value of variables.

```js
let x = 1;
let y = 2;

// Bad
let temp;
temp = x;
x = y;
y = temp;


// Good
[x, y] = [y, x]; // swap varialbes
```

- 3.4.2 Use array destruturing to extract data from arrays.

```js
const arr = [1, 2, 3, 4, 5];

// Bad
const one = arr[0];
const two = arr[1];


// Good
const [one, two] = arr;
```

[Back To Top](# contents)

### Arrays
- 4.1 To convert array-like object and iterable object( such as `Set`,`Map`) to a real array.

> Use `Array.from`.

```js
// Bad
function foo() {
  let args = Array.prototype.slice.call(arguments);
}


// Good
function foo() {
  let args = Array.from(arguments);
}
```

- 4.2 Remove duplicates from arrays.

> Nice to use `Set` object and `Array.from`.

```js
// Bad
// Don't use `indexOf`, `HashTable` etc, since they are not elegant enough.


// Good
function deduplication(arr) {
  return Array.from(new Set(arr));
}
```

- 4.3 Arrays Copy

> Use array spreads `...` to copy arrays.

```js
const items = [1, 2, 3];

// Bad
const len = items.length;
let copyTemp = [];
for (let i = 0; i < len; i++) {
  copyTemp[i] = items[i];
}


// Good
let copyTemp = [...items];
```

- 4.4 Create array instance from a variable number of arguments.

> Use `Array.of`, without special one-arg behavior.

```js
// Bad
let arr1 = new Array(2); // [undefined x 2]
let arr2 = new Array(1, 2, 3); // [1, 2, 3]


// Good
let arr1 = Array.of(2);  // [2]
let arr2 = Array.of(1, 2, 3); // [1, 2, 3]
```

[Back To Top](# contents)

### Functions
- 5.1 Use arrow function notation instead of function expressions and anonymous functions.

> Arrow function notation is a more concise syntax and it will binds `this` lexically.

```js
// Bad
const foo = function(x) {
  console.log(foo.name); // Return ''
};

[1, 2, 3].map(function(x) {
  return x + 1;
});

var testObj = {
  name: 'testObj',
  init: function init() {
    var _this = this; // Explicitly preserve function context
    document.addEventListener('click', function() {
      return _this.doSth();
    }, false);
  },
  doSth: function() {
    console.log(this.name);
  }
};

// Good
const foo = x => {
  console.log(foo.name); // Return 'foo'
};

[1, 2, 3].map( x => {
  return x + 1;
});

var testObj = {
  name: 'testObj',
  init: function() {
    // Arrow function preserve context for inner functions.
    document.addEventListener('click', () => this.doSth(), false);
  },
  doSth: function() {
    console.log(this.name);
  }
};
```

- 5.1.1 Arrow function conventions.

> For a single line function, curly braces can be omitted.

> For a single parameter function, parentheses can be omitted.

```js
// Good
const foo = x => x + x; // The value of x + x is implicitly returned.

const foo = (x) => {
  return x + x; // For a function enclosed in curly braces, value must be explicitly returned.
};

[1, 2, 3].map( x => x * x);
```

- 5.1.2 If arrow function return an object, it should be wrapped in '`()`'.

```js
// Bad
let test = x => { x: x }; // '{}' will be treated as a block which is not an object.


// Good
let test = x => ({ x: x }); // Now wrap the object with '()',and it will return '{ x: x }'.
```

- 5.2 Immediately-invoked function expression (IIFE)

> Use arrow function notation.

```js
// Bad
(function() {
  console.log('hey');
})();


// Good
(() => {
  console.log('hey');
})();
```

- 5.3 Use rest syntax `...` instead of `arguments`.

> Rest arguments are a real Array, no need to be converted.

> Note: Arrows can not use their own 'arguments'.

```js
// Bad
function foo() {
  let args = Array.prototype.slice.call(arguments);
  return args.join('');
}


// Good
function foo(...args) {
  return args.join('');
}
```

- 5.4 Use function default parameter syntax rather than mutating function arguments.

```js
// Bad
function foo(opts) {
  opts = opts || {};// There is a obvious side-effect : 0 , '' will be treated as false.
}


// Good
function foo(opts = {}) {
  console.log('More clear and saferty');
}
```

- 5.5 Use object method shorthand when define functions in an object.

```js
// Bad
const shopObj = {
  des: 'Des',
  foo: function() {
    console.log('function in an object');
  }
};

// Good
const des = 'Des'; // Use property value shorthand.
const shopObj = {
  des,
  foo() {
    console.log('function in an object');
  }
};
```

[Back To Top](# contents)

### Classes
- 6.1 Class names should be `PascalCased`.

```js
// Good
class SomeClass {

}
```

- 6.1.1 Class names and `{` should be separated by one space.

> Class methods and `{` should also be separated by one space.

```js
// Bad
class Foo{ // No space between class name and {
  constructor(){
    // No space between function and {
  }
  sayHi()    {
    // Multiple spaces in-between
  }
}


// Good
class Foo {
  constructor() {
    // constructor
  }
  sayHi() {
    // Only one space between function and {
  }
}
```

- 6.2 Class methods **should** be defined in the following subsequent order:
  - `constructor`
  - public `get/set` public getters and setters，`set` should only take one argument
  - public methods (Use `lowerCamelCase` for methods naming)
  - private `get/set` private getters and setters. (with a `_` prefix)
  - private methods (with a `_` prefix)

```js
// Good
class SomeClass {
  constructor() {
    // constructor
  }

  get aval() {
    // public getter
  }

  set aval(val) {
    // public setter
  }

  doSth() {
    // public method
  }

  get _aval() {
    // private getter
  }

  set _aval() {
    // private setter
  }

  _doSth() {
    // private method
  }
}
```

- 6.3 Use `new` for `classes` instead of `functions`.

```js
// Bad
function Foo() {

}
const foo = new Foo();


// Good
class Foo() {

}
const foo = new Foo();
```

- 6.4 Use `class` statement. Avoid manipulating `prototype` directly.

> Classes is more simpler and more readable than prototype.

```js
// Bad
function Dog(names = []) {
  this._names = [...names];
}
Dog.prototype.bark = function() {
  const currName = this._names[0];
  alert(`one one ${currName}`);
}

// Good
class Dog {
  constructor(names = []) {
    this._name = [...names];
  }
  bark() {
    const currName = this._names[0];
    alert(`one one ${currName}`);
  }
}
```

- 6.5 Classes should be declared before use.

> Class declaration does not exist `hoist`, should be declared before initialized. Super class should be declared before subclass in inheritance.

```js
// Bad
let foo = new Foo();
class Foo { }


// Good
class Foo { }
let foo = new Foo();

class SubFoo extends Foo {

}
```

- 6.6 Caution for `this`.

> For subclass to use `super`, `super` should be the first call in the constructor.

> Methods can use `return this` for method chaining.

```js
class Foo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Bad
class SubFoo extends Foo {
  constructor(x, y, z) {
    this.z = z; // Reference error
    super(x, y);
  }
}


// Good
class SubFoo extends Foo {
  constructor(x, y, z) {
    super(x, y);
    this.z = z; // `this` is after `super` call
  }
  setHeight(height) {
    this.height = height;
    return this;
  }
}
```

[Back To Top](# contents)

### Modules
- 7.1 Use modules(`import / export`) over a non-standard module system for dependencies.

> Those who follow standards always have a lucky day.

```js
// Bad
const colors  = require('./colors');
module.exports = color.lightRed;


// Good
import { lightRed } from './colors';
export default lightRed;
```

- 7.1.1 One space should be added inside curly braces both at the front and end, when using `{}` with `import / export`.

```js
// Bad
import {lightRed} from './colors';
import { lightRed} from './colors';

// Good
import { lightRed } from './colors';
```

- 7.2 Make sure every module has a single default export.

> This makes it easy to use for module users.

```js
// Bad
const lightRed = '# F07';

export lightRed;


// Good
const lightRed = '# F07';

export default lightRed;
```

- 7.3 Do not use `*` (wildcard imports) to import all exported variables.

> Make modules dependencies as clear as possible.

```js
// Bad
import * as colors from './colors';

// Good
import colors from './colors';
```

- 7.4 Do not mix`import` and `export` on the same line.

> Put exports and inputs on separate lines makes code more readable.

```js
// Bad
export { lightRed as default } from './colors';

// Good
import { lightRed } from './colors';
export default lightRed;
```

- 7.5 Use destructuring to make exports clear.

> `export` should be placed at the end of each file to make exports clear.

```js
// Bad
export const lightRed = '# F07';
export const black  = '# 000';
export const white  = '# FFF';

// Good
const lightRed = '# F07';
const black  = '# 000';
const white  = '# FFF';

export default { lightRed, black, white };
```

[Back To Top](# contents)
