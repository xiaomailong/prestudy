// 1  Introduction  ---------------------------------------
// TypeScript helps programming teams to define interfaces between software components
// and to gain insight into the behavior of existing JavaScript libraries.
// TypeScript also enables teams to reduce naming conflicts by
// organizing their code into dynamically-loadable modules.
// TypeScript's optional type system enables
// JavaScript programmers to use highly-productive development tools and practices:
// static checking, symbol-based navigation, statement completion, and code re-factoring.

// TypeScript will infer that the variable 'i' has the type number.
var i = 0;
// TypeScript will infer from the following function definition that the function f has return type string.
function f1() {
  return "hello";
}

function f2222(s: string) {
  return s;
}
// f2({});       // **"Red"**Error
f2222("hello");  // Ok

// 1.1 Ambient Declarations ----------
// An ambient declaration introduces a variable into a TypeScript scope,
// but has zero impact on the emitted JavaScript program.
// Programmers can use ambient declarations to tell the TypeScript compiler that
// some other component will supply a variable.
// For example, by default the TypeScript compiler will print an error for uses of undefined variables.
// To add some of the common variables defined by browsers,
// a TypeScript programmer can use ambient declarations.
// declare var document;
declare var document: Document;
document.title = "Hello";  // Ok because document has been declared

// The TypeScript compiler does not include by default an interface for jQuery,
// so to use jQuery, a programmer could supply a declaration such as:
// declare var $;

// 1.2 Function Types ----------
// Function expressions are a powerful feature of JavaScript.
// They enable function definitions to create closures:
// functions that capture information from the lexical scope surrounding the function's definition.
function vote(candidate: string, callback: (result: string) => any) {
  // ...
}
vote("BigPig", function(result: string) {
  if (result === "BigPig") {
    // ...
  }
});
// In this example, the second parame
// (result: string) => any

// 1.3 Object Types ----------
// TypeScript programmers use object types to declare their expectations of object behavior.
var MakePoint: () => {
  x: number; y: number;
};

interface Friend {
  name: string;
  favoriteColor?: string;
}
function add(friend: Friend) {
  var name = friend.name;
}
add({ name: "Fred" });  // Ok
// add({ favoriteColor: "blue" });  // **"Red"**Error, name required
add({ name: "Jill", favoriteColor: "green" });  // Ok

// The following code fragment captures a small subset of jQuery behavior,
// just enough to use jQuery in a simple way.
interface JQuery {
  text(content: string);
}
interface JQueryStatic {
  get(url: string, callback: (data: string) => any);
  (query: string): JQuery;
  // To specify multiple behaviors,
  // TypeScript supports overloading of function signatures in object types.
  // For example, we can add an additional call signature to the 'JQueryStatic' interface.
  (ready: () => any): any;
}
declare var $: JQueryStatic;
$.get("http://mysite.org/divContent", function (data: string) {
  $("div").text(data);
});

var f: { (): string; };
var sameType: () => string = f;     // Ok
// var nope: () => number = sameType;  // **"Red"**Error: type mismatch

// 1.4 Structural Subtyping ----------
// Object types are compared structurally
interface Point {
  x: number;
  y: number;
}
function getX(p: Point) {
  return p.x;
}
class CPoint {
  x: number;
  y: number;
  constructor(x: number,  y: number) {
    this.x = x;
    this.y = y;
  }
}
getX(new CPoint(0, 0));  // Ok, fields match
// getX({ x: 0, y: 0, color: "red" });  // **"Yellow"**Warning Extra fields Ok
// getX({ x: 0 });  // **"Red"**Error: supplied parameter does not match
// Property 'y' is missing in type '{ x: number; }'.

// 1.5 Contextual Typing ----------
// Ordinarily, TypeScript type inference proceeds "bottom-up":
// from the leaves of an expression tree to its root.

function mul(a: number, b: number) {
  return a * b;
}

$.get("http://mysite.org/divContent", function (data) {
  $("div").text(data);  // TypeScript infers data is a string
});

// 1.6 Classes ----------
// JavaScript practice has at least two common design patterns:
// the module pattern and the class pattern.
class BankAccount1 {
  balance = 0;
  deposit(credit: number) {
    this.balance += credit;
    return this.balance;
  }
}

interface BankAccount2 {
  balance: number;
  deposit(credit: number): number;
}
var BankAccount2: new() => BankAccount2;

class BankAccount3 {
  balance: number;
  constructor(initially: number) {
    this.balance = initially;
  }
  deposit(credit: number) {
    this.balance += credit;
    return this.balance;
  }
}

class BankAccount4 {
  constructor(public balance: number) {
  }
  deposit(credit: number) {
    this.balance += credit;
    return this.balance;
  }
}

class CheckingAccount1 extends BankAccount4 {
  constructor(balance: number) {
    super(balance);
  }
  writeCheck(debit: number) {
    this.balance -= debit;
  }
}

// 1.7 Enum Types
// TypeScript enables programmers to summarize a set of numeric constants as an enum type.
enum Operator {
  ADD,
  DIV,
  MUL,
  SUB
}
function compute(op: Operator, a: number, b: number) {
  console.log("the operator is" + Operator[op]);
  // ...
  switch (op) {
    case Operator.ADD:
      // execute add
      break;
    case Operator.DIV:
      // execute div
      break;
    // ...
  }
}

// 1.8 Overloading on String Parameters ----------
// An important goal of TypeScript is to provide accurate and straightforward types
// for existing JavaScript programming patterns.
// To that end, TypeScript includes generic types, discussed in the next section,
// and overloading on string parameters, the topic of this section.
var span = document.createElement("span");
// span.isMultiLine = false;  // OK: HTMLSpanElement has isMultiline property
span.hidden = false;

// 1.9 Generic Types and Functions ----------
// Like overloading on string parameters, generic types make it easier for TypeScript
// to accurately capture the behavior of JavaScript libraries.
// Because they enable type information to flow from client code,
// through library code, and back into client code,
// generic types may do more than any other TypeScript feature
// to support detailed API descriptions.
interface Array<T> {
  reverse(): T[];
  sort(compareFn?: (a: T, b: T) => number): T[];
  // ...
}
// map<U>(func: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
function numberToString(a: number[]) {
  var stringArray = a.map(v => v.toString());
  return stringArray;
}

interface NamedItem {
  name: string;
}
class List<T extends NamedItem> {
  next: List<T> = null;
  constructor(public item: T) {
  }
  insertAfter(item: T) {
    var temp = this.next;
    this.next = new List(item);
    this.next.next = temp;
  }
  log() {
    console.log(this.item.name);
  }
  // ...
}

// 1.10 Modules ----------
// Classes and interfaces support large-scale JavaScript development by
// providing a mechanism for describing how to use a software component
// that can be separated from that component's implementation.
// TypeScript enforces encapsulation of implementation in classes at design time
// (by restricting use of private and protected members),
// but cannot enforce encapsulation at runtime because
// all object properties are accessible at runtime.
// Future versions of JavaScript may provide private names
// which would enable runtime enforcement of private and protected members.
module M {
  var s = "hello";
  export function f() {
    return s;
  }
}
M.f();
// M.s;  // **"Red"**Error, s is not exported
