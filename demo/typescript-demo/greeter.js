// hello
function greeter1(person) {
    return "Hello, " + person;
}
var user1 = "Jane User";
console.log(greeter1(user1));
var user2 = [0, 1, 2];
console.log(greeter1(user2));
// Supplied parameters do not match any signature of call target
function greeter2(person) {
    return "Hello, " + person;
}
var user2 = [0, 1, 2];
function greeter3(person) {
    return "Hello, " + person.firstname + " " + person.lastname;
}
var user = { firstname: "Jane", lastname: "User" };
console.log(greeter3(user));
// class
var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "" + this.greeting + "";
    };
    return Greeter;
})();
;
var greeter = new Greeter("Hello, world!");
console.log(greeter.greet());
// TypeScript supports the current ES6 proposal for class-based object-oriented programming.
var Student = (function () {
    function Student(firstname, middleinitial, lastname) {
        this.firstname = firstname;
        this.middleinitial = middleinitial;
        this.lastname = lastname;
        this.fullname = firstname + " " + middleinitial + " " + lastname;
    }
    return Student;
})();
function greeter4(person) {
    return "Hello, " + person.firstname + " " + person.lastname;
}
var student1 = new Student("Jane", "M.", "User");
console.log(greeter4(student1));
console.log(student1.fullname);
