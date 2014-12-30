var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function greeter1(person) {
    return "Hello, " + person;
}
var user1 = "Jane User";
var user2 = [0, 1, 2];
document.body.innerHTML += greeter1(user1) + "<br/>";
function greeter3(person) {
    return "Hello, " + person.firstname + " " + person.lastname;
}
var user3 = {
    firstname: "Jane",
    lastname: "User"
};
document.body.innerHTML += greeter3(user3) + "<br/>";
var Student4 = (function () {
    function Student4(firstname, middleinitial, lastname) {
        this.firstname = firstname;
        this.middleinitial = middleinitial;
        this.lastname = lastname;
        this.fullname = firstname + " " + middleinitial + " " + lastname;
    }
    return Student4;
})();
function greeter4(person) {
    return "Hello, " + person.firstname + " " + person.lastname + "(" + person.fullname + ")";
}
var user4 = new Student4("Jane", "M.", "User");
document.body.innerHTML += greeter4(user4) + "<br/>";
/*Boolean
The most basic datatype is the simple true/false value,
which JavaScript and TypeScript (as well as other languages) call a 'boolean' value.*/
var isDone = false;
/*Number
As in JavaScript, all numbers in TypeScript are floating point values.
These floating point numbers get the type 'number'.*/
var height = 6;
/*String
Another fundamental part of creating programs in JavaScript for webpages and servers
alike is working with textual data. As in other languages,
 we use the type 'string' to refer to these textual datatypes.
 Just like JavaScript, TypeScript also uses the double quote (")
 or single quote (') to surround string data.*/
var name = "bob";
name = 'smith';
/*Array
TypeScript, like JavaScript, allows you to work with arrays of values.
 Array types can be written in one of two ways.
In the first, you use the type of the elements followed by '[]'
to denote an array of that element type:*/
var list = [1, 2, 3];
/*The second way uses a generic array type, Array<elemType>:*/
var list = [1, 2, 3];
/*Enum
A helpful addition to the standard set of datatypes from JavaScript is the 'enum'.
Like languages like C#, an enum is a way of giving more friendly names to sets of numeric values.*/
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 0] = "Red";
    Color1[Color1["Green"] = 1] = "Green";
    Color1[Color1["Blue"] = 2] = "Blue";
})(Color1 || (Color1 = {}));
;
var c1 = 1 /* Green */;
/*By default, enums begin numbering their members starting at 0.
 You can change this by manually setting the value of one its members.
 For example, we can start the previous example at 1 instead of 0:*/
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
;
var c2 = 2 /* Green */;
/*Or, even manually set all the values in the enum:*/
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 4] = "Blue";
})(Color3 || (Color3 = {}));
;
var c3 = 2 /* Green */;
/*A handy feature of enums is that you can also go from a numeric value
to the name of that value in the enum. For example,
 if we had the value 2 but weren't sure which that mapped to in the Color enum above,
 we could look up the corresponding name:*/
var Color4;
(function (Color4) {
    Color4[Color4["Red"] = 1] = "Red";
    Color4[Color4["Green"] = 2] = "Green";
    Color4[Color4["Blue"] = 3] = "Blue";
})(Color4 || (Color4 = {}));
;
var colorName = Color4[2];
alert(colorName);
/*Any
We may need to describe the type of variables that we may not know
when we are writing the application. These values may come from dynamic content,
 eg from the user or 3rd party library. In these cases,
 we want to opt-out of type-checking and let the values pass through compile-time checks.
 To do so, we label these with the 'any' type:*/
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
/*The 'any' type is a powerful way to work with existing JavaScript,
allowing you to gradually opt-in and opt-out of type-checking during compilation.
The 'any' type is also handy if you know some part of the type,
but perhaps not all of it. For example,
you may have an array but the array has a mix of different types:*/
/*var list:any[] = [1, true, "free"];
list[1] = 100;*/
/*Void
Perhaps the opposite in some ways to 'any' is 'void',
the absence of having any type at all.
You may commonly see this as the return type of functions that do not return a value:*/
function warnUser() {
    alert("This is my warning message");
}
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var mySearch1;
mySearch1 = function (source, subString) {
    var result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
var mySearch2;
mySearch2 = function (src, sub) {
    var result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
var myArray;
myArray = ["Bob", "Fred"];
var Clock1 = (function () {
    function Clock1(h, m) {
    }
    return Clock1;
})();
var Clock2 = (function () {
    function Clock2(h, m) {
    }
    Clock2.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock2;
})();
var Clock = (function () {
    function Clock(h, m) {
    }
    return Clock;
})();
var cs = Clock;
var newClock = new cs(7, 30);
var square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
var c;
c(10);
c.reset();
c.interval = 5.0;
/*Classes*/
var Greeter11 = (function () {
    function Greeter11(message) {
        this.greeting = message;
    }
    Greeter11.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter11;
})();
var greeter11 = new Greeter11("world");
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (meters) {
        if (meters === void 0) { meters = 0; }
        alert(this.name + " moved " + meters + "m.");
    };
    return Animal;
})();
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        _super.call(this, name);
    }
    Snake.prototype.move = function (meters) {
        if (meters === void 0) { meters = 5; }
        alert("Slithering...");
        _super.prototype.move.call(this, meters);
    };
    return Snake;
})(Animal);
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        _super.call(this, name);
    }
    Horse.prototype.move = function (meters) {
        if (meters === void 0) { meters = 45; }
        alert("Galloping...");
        _super.prototype.move.call(this, meters);
    };
    return Horse;
})(Animal);
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
var Animal1 = (function () {
    function Animal1(theName) {
        this.name = theName;
    }
    return Animal1;
})();
var Rhino1 = (function (_super) {
    __extends(Rhino1, _super);
    function Rhino1() {
        _super.call(this, "Rhino");
    }
    return Rhino1;
})(Animal);
var Employee1 = (function () {
    function Employee1(theName) {
        this.name = theName;
    }
    return Employee1;
})();
var animal = new Animal1("Goat");
var rhino = new Rhino1();
var employee = new Employee1("Bob");
/*animal = rhino;
animal = employee; //error: Animal and Employee are not compatible*/
/*Parameter properties*/
var Animal2 = (function () {
    function Animal2(name) {
        this.name = name;
    }
    Animal2.prototype.move = function (meters) {
        alert(this.name + " moved " + meters + "m.");
    };
    return Animal2;
})();
/*Accessors*/
var Employee2 = (function () {
    function Employee2() {
    }
    return Employee2;
})();
var employee2 = new Employee2();
employee2.fullName = "Bob Smith";
if (employee2.fullName) {
    alert(employee2.fullName);
}
/*var passcode = "secret passcode";
class Employee3 {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            alert("Error: Unauthorized update of employee!");
        }
    }
}
var employee3 = new Employee3();
employee3.fullName = "Bob Smith";
if (employee3.fullName) {
    alert(employee3.fullName);
}*/
/*Static Properties*/
var Grid = (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
})();
var grid1 = new Grid(1.0); // 1x scale
var grid2 = new Grid(5.0); // 5x scale
alert(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
alert(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
/*Advanced Techniques*/
var Greeter33 = (function () {
    function Greeter33(message) {
        this.greeting = message;
    }
    Greeter33.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter33;
})();
var greeter33;
greeter33 = new Greeter33("world");
alert(greeter33.greet());
var Greeter44 = (function () {
    function Greeter44(message) {
        this.greeting = message;
    }
    Greeter44.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter44;
})();
var greeter44;
greeter44 = new Greeter44("world");
alert(greeter44.greet());
var Greeter55 = (function () {
    function Greeter55() {
    }
    Greeter55.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter55.standardGreeting;
        }
    };
    Greeter55.standardGreeting = "Hello, there";
    return Greeter55;
})();
var greeter55;
greeter55 = new Greeter55();
alert(greeter55.greet());
var greeterMaker = Greeter55;
greeterMaker.standardGreeting = "Hey there!";
var greeter255 = new greeterMaker();
alert(greeter255.greet());
/*Using a class as an interface*/
var Point = (function () {
    function Point() {
    }
    return Point;
})();
var point3d = { x: 1, y: 2, z: 3 };
