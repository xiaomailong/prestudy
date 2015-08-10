// 4  Expressions
// TypeScript's type analysis occurs entirely at compile-time and
// adds no run-time overhead to expression evaluation.

// 4.1  Values and References

// 4.2  The this Keyword

// 4.3  Identifiers

// 4.4  Literals

// 4.5  Object Literals

// 4.6  Array Literals
var a46 = [1, 2];                          // number[]
var b46 = ["hello", true];                 // (string | boolean)[]
var c46: [number, string] = [3, "three"];  // [number, string]
var a461 = [2, 3, 4];
var b461 = [0, 1, ...a, 5, 6];

// 4.7  Parentheses

// 4.8  The super Keyword
// 4.8.1  Super Calls
// 4.8.2  Super Property Access

// 4.9  Function Expressions
// 4.9.1  Standard Function Expressions
// 4.9.2  Arrow Function Expressions
(x) => { return Math.sin(x); }
(x) => Math.sin(x)
x => { return Math.sin(x); }
x => Math.sin(x)
class Messenger {
  message = "Hello World";
  start() {
    setTimeout(() => alert(this.message), 3000);
  }
};
var messenger = new Messenger();
messenger.start();
// 4.9.3  Contextually Typed Function Expressions
var f493: (s: string) => string = s => s.toLowerCase();

// 4.10 Property Access
var type410 = {
  name: "boolean",
  primitive: true
};
var s410 = type410["name"];       // string
var b410 = type410["primitive"];  // boolean
var data410: [string, number] = ["five", 5];
var s410 = data410[0];  // string
var n410 = data410[1];  // number

// 4.11  The new Operator

// 4.12 Function Calls
// 4.12.1  Overload Resolution
// 4.12.2  Type Argument Inference
function choose4122<T>(x: T, y: T): T {
  return Math.random() < 0.5 ? x : y;
}
var x4122 = choose4122(10, 20);     // Ok, x of type number
// var y4122 = choose4122("Five", 5);  // **"Red"**Error
var x = choose4122<number>(10, 20);

function map<T, U>(a: T[], f: (x: T) => U): U[] {
  var result: U[] = [];
  for (var i = 0; i < a.length; i++) result.push(f(a[i]));
  return result;
}
var names = ["Peter", "Paul", "Mary"];
var lengths = map(names, s => s.length);
var lengths = map<string, number>(names, s => s.length);

function zip<S, T, U>(x: S[], y: T[], combine: (x: S) => (y: T) => U): U[] {
    var len = Math.max(x.length, y.length);
    var result: U[] = [];
    for (var i = 0; i < len; i++) result.push(combine(x[i])(y[i]));
    return result;
}
var names = ["Peter", "Paul", "Mary"];
var ages = [7, 9, 12];
var pairs = zip(names, ages, s => n => ({ name: s, age: n }));

var pairs = zip<string, number, { name: string; age: number }>(
    names, ages, s => n => ({ name: s, age: n }));

// 4.12.3  Grammar Ambiguities
// f(g<A, B>(7));
// f(g < A, B > 7);
// f(g < A, B > +(7));

// 4.13 Type Assertions
class Shape {  }
class Circle extends Shape {  }
function createShape(kind: string): Shape {
    if (kind === "circle") return new Circle();
}
var circle = <Circle> createShape("circle");
var shape = createShape("shapeKind");
if (shape instanceof Circle) {
    var circle = <Circle> shape;
}

// 4.14 Unary Operators
// 4.14.1  The ++ and -- operators
// 4.14.2  The +, –, and ~ operators
function getValue4142() { }
var n = +getValue4142();
// 4.14.3  The ! operator
function getValue4143() {  }
var b = !!getValue4143();
// 4.14.4  The delete Operator
// 4.14.5  The void Operator
// 4.14.6  The typeof Operator
var x4146 = 5;
var y4146 = typeof x4146;  // Use in an expression
var z4146: typeof x4146;   // Use in a type query

// 4.15 Binary Operators
// 4.15.1  The *, /, %, –, <<, >>, >>>, &, ^, and | operators
// 4.15.2  The + operator
function getValue4152() { }
var s4152 = getValue4152() + "";
// 4.15.3  The <, >, <=, >=, ==, !=, ===, and !== operators
// 4.15.4  The instanceof operator
// 4.15.5  The in operator
// 4.15.6  The && operator
// 4.15.7  The || operator

// 4.16  The Conditional Operator

// 4.17  Assignment Operators
// 4.17.1  Destructuring Assignment
var x4171 = 1;
var y4171 = 2;
[x4171, y4171] = [y4171, x4171];

// 4.18 The Comma Operator

// 4.19 Contextually Typed Expressions
declare var startTracking;
declare var endTracking;
interface EventObject {
  x: number;
  y: number;
}
interface EventHandlers {
  mousedown?: (event: EventObject) => void;
  mouseup?: (event: EventObject) => void;
  mousemove?: (event: EventObject) => void;
}
function setEventHandlers(handlers: EventHandlers) { }
setEventHandlers({
  mousedown: e => { startTracking(e.x, e.y); },
  mouseup: e => { endTracking(); }
});

// 4.20 Type Guards
function foo420(x: number | string) {
  if (typeof x === "string") {
    return x.length;  // x has type string here
  }
  else {
    return x + 1;     // x has type number here
  }
}
function isLongString(obj: any) {
  return typeof obj === "string" && obj.length > 100;
}
function processValue(value: number | (() => number)) {
  var x = typeof value !== "number" ? value() : value;
  // Process number in x
}
function f420(x: string | number | boolean) {
  if (typeof x === "string" || typeof x === "number") {
    var y = x;  // Type of y is string | number
  }
  else {
    var z = x;  // Type of z is boolean
  }
}
class C420 {
  data: string | string[];
  getData() {
    var data = this.data;
    return typeof data === "string" ? data : data.join(" ");
  }
}
class NamedItem420 { 
  name: string;
}
function getName(obj: Object) {
  return obj instanceof NamedItem420 ? obj.name : "unknown";
}
