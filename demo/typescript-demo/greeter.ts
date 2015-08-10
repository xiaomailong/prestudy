// hello
function greeter1(person) {
  return "Hello, " + person;
}
var user1 = "Jane User";
console.log(greeter1(user1));
var user2 = [0, 1, 2];
console.log(greeter1(user2));

// Supplied parameters do not match any signature of call target
function greeter2(person: string) {
  return "Hello, " + person;
}
var user2 = [0, 1, 2];
// Argument of type 'number[]' is not assignable to parameter of type 'string'.
// console.log(greeter2(user2));

// interface type
interface Person {
  firstname: string;
  lastname: string;
}
function greeter3(person : Person) {
  return "Hello, " + person.firstname + " " + person.lastname;
}
var user = {firstname: "Jane", lastname: "User"};
console.log(greeter3(user));

// class
class Greeter4 {
  constructor(public greeting: string) { }
  greet() {
    return "" + this.greeting + "";
  }
};
var greeter = new Greeter4("Hello, world!");
console.log(greeter.greet());

// TypeScript supports the current ES6 proposal for class-based object-oriented programming.
class Student {
  fullname : string;
  constructor(public firstname, public middleinitial, public lastname) {
    this.fullname = firstname + " " + middleinitial + " " + lastname;
  }
}

interface Person2 {
  firstname: string;
  lastname: string;
}

function greeter4(person : Person2) {
  return "Hello, " + person.firstname + " " + person.lastname;
}

var student1 = new Student("Jane", "M.", "User");

console.log(greeter4(student1));
console.log(student1.fullname);
