// 基本类型 Basic Types ------------------------------------------------------------
// Boolean
var isDone = false;
// Number
var height = 6;
// String
var name = "bob";
name = 'smith';
// Array
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
// Enum
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 0] = "Red";
    Color1[Color1["Green"] = 1] = "Green";
    Color1[Color1["Blue"] = 2] = "Blue";
})(Color1 || (Color1 = {}));
;
var c1 = Color1.Green;
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
;
var c2 = Color2.Green;
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 4] = "Blue";
})(Color3 || (Color3 = {}));
;
var c3 = Color3.Green;
var Color4;
(function (Color4) {
    Color4[Color4["Red"] = 1] = "Red";
    Color4[Color4["Green"] = 2] = "Green";
    Color4[Color4["Blue"] = 3] = "Blue";
})(Color4 || (Color4 = {}));
;
var colorName = Color4[2];
console.log(colorName);
// Any
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
var list = [1, true, "free"];
list[1] = 100;
// Void
function warnUser() {
    console.log("This is my warning message");
}
// 接口 Interfaces ---------------------------------------------------------------
// One of TypeScript's core principles is that type-checking focuses on the 'shape' that values have.
// This is sometimes called "duck typing" or "structural subtyping".
// In TypeScript, interfaces fill the role of naming these types,
// and are a powerful way of defining contracts within your code
// as well as contracts with code outside of your project.
// 属性接口
function printLabel1(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel1(myObj);
function printLabel2(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel2(myObj);
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
var mySearch;
mySearch = function (source, sub) {
    var result = source.search(sub); // subString 函数接口中的变量名称可以不一样，但类型必须一致
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
var Clock4 = (function () {
    function Clock4(h, m) {
    }
    return Clock4;
})();
var cs = Clock4;
var newClock = new cs(7, 30);
var square1 = {};
square1.color = "blue";
square1.sideLength = 10;
var square2 = {};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
var c;
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
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
var greeter = new Greeter("world");
