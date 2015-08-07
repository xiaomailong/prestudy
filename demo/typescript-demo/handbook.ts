// 基本类型 Basic Types ------------------------------------------------------------
// Boolean
var isDone: boolean = false;
// Number
var height: number = 6;
// String
var name: string = "bob";
name = 'smith';
// Array
var list1:number[] = [1, 2, 3];
var list2:Array<number> = [1, 2, 3];
// Enum
enum Color1 {Red, Green, Blue};
var c1: Color1 = Color1.Green;
enum Color2 {Red = 1, Green, Blue};
var c2: Color2 = Color2.Green;
enum Color3 {Red = 1, Green = 2, Blue = 4};
var c3: Color3 = Color3.Green;
enum Color4 {Red = 1, Green, Blue};
var colorName: string = Color4[2];
console.log(colorName);
// Any
var notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
var list:any[] = [1, true, "free"];
list[1] = 100;
// Void
function warnUser(): void {
  console.log("This is my warning message");
}

// 接口 Interfaces ---------------------------------------------------------------
// One of TypeScript's core principles is that type-checking focuses on the 'shape' that values have.
// This is sometimes called "duck typing" or "structural subtyping".
// In TypeScript, interfaces fill the role of naming these types,
// and are a powerful way of defining contracts within your code
// as well as contracts with code outside of your project.
// 属性接口
function printLabel1(labelledObj: {label: string}) {
  console.log(labelledObj.label);
}
var myObj = {size: 10, label: "Size 10 Object"};
printLabel1(myObj);

interface LabelledValue {
  label: string;
}
function printLabel2(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
var myObj = {size: 10, label: "Size 10 Object"};
printLabel2(myObj);

// 可选属性 Optional Properties
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquareConfig): {color: string; area: number} {
  var newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
    // newSquare.color = config.collor;  // Type-checker can catch the mistyped name here
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
var mySquare = createSquare({color: "black"});

// 函数接口 Function Types
interface SearchFunc {
  (source: string, subString: string): boolean;
}
var mySearch: SearchFunc;
mySearch = function(source: string, sub: string) {
  var result = source.search(sub); // subString 函数接口中的变量名称可以不一样，但类型必须一致
  if (result == -1) {
    return false;
  }
  else {
    return true;
  }
}

// 数组类型 Array Types
interface StringArray {
  [index: number]: string;
}
var myArray: StringArray;
myArray = ["Bob", "Fred"];

interface Dictionary {
  [index: string]: string;
  // length: number;    // error, the type of 'length' is not a subtype of the indexer
}

// Class Types
// Implementing an interface
interface ClockInterface1 {
  currentTime: Date;
}
class Clock1 implements ClockInterface1  {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
// You can also describe methods in an interface that are implemented in the class
interface ClockInterface2 {
  currentTime: Date;
  setTime(d: Date);
}
class Clock2 implements ClockInterface2 {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

// Difference between static/instance side of class
// interface ClockInterface3 {
//   new (hour: number, minute: number);
// }
// class Clock3 implements ClockInterface3  {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }
// ***Class 'Clock3' incorrectly implements interface 'ClockInterface3'.
// This is because when a class implements an interface,
// only the instance side of the class is checked.
// Since the constructor sits in the static side,
// it is not included in this check.

// Instead, you would need to work with the 'static' side of the class directly. In this example, we work with the class directly:
interface ClockStatic4 {
  new (hour: number, minute: number);
}
class Clock4  {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
var cs: ClockStatic4 = Clock4;
var newClock = new cs(7, 30);

// Extending Interfaces
// Like classes, interfaces can extend each other.
// This handles the task of copying the members of one interface into another,
// allowing you more freedom in how you separate your interfaces into reusable components.
interface Shape1 {
  color: string;
}
interface Square1 extends Shape1 {
  sideLength: number;
}
var square1 = <Square1>{};
square1.color = "blue";
square1.sideLength = 10;

// An interface can extend multiple interfaces, creating a combination of all of the interfaces.
interface Shape2 {
  color: string;
}
interface PenStroke2 {
  penWidth: number;
}
interface Square2 extends Shape2, PenStroke2 {
  sideLength: number;
}
var square2 = <Square2>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;

// Hybrid Types
// As we mentioned earlier,
// interfaces can describe the rich types present in real world JavaScript.
// Because of JavaScript's dynamic and flexible nature,
// you may occasionally encounter an object that works as a combination of
// some of the types described above.
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
var c: Counter;
c(10);
c.reset();
c.interval = 5.0;

// Classes --------------------------------------------------------------------------------
// Traditional JavaScript focuses on functions and prototype-based inheritance
// as the basic means of building up reusable components,
// but this may feel a bit awkward to programmers more comfortable
// with an object-oriented approach,
// where classes inherit functionality and objects are built from these classes.
// Starting with ECMAScript 6, the next version of JavaScript,
// JavaScript programmers will be able to build their applications
// using this object-oriented class-based approach.
// In TypeScript, we allow developers to use these techniques now,
// and compile them down to JavaScript that works across all major browsers and platforms,
// without having to wait for the next version of JavaScript.
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
var greeter = new Greeter("world");
