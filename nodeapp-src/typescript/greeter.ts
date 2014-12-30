function greeter1(person: string) {
		return "Hello, " + person;
}

var user1 = "Jane User";
var user2 = [0, 1, 2];

document.body.innerHTML += greeter1(user1) + "<br/>";
/*document.body.innerHTML = greeter(user2);*/

interface Person3 {
	firstname: string;
	lastname: string;
}

function greeter3(person : Person3) {
	return "Hello, " + person.firstname + " " + person.lastname;
}

var user3 = {
	firstname: "Jane",
	lastname: "User"
};

document.body.innerHTML += greeter3(user3) + "<br/>";


class Student4 {
	fullname : string;
	constructor(public firstname, public middleinitial, public lastname) {
		this.fullname = firstname + " " + middleinitial + " " + lastname;
	}
}

interface Person4 {
	firstname: string;
	lastname: string;
}

function greeter4(person : Student4) {
	return "Hello, " + person.firstname + " " + person.lastname + "(" + person.fullname + ")";
}

var user4 = new Student4("Jane", "M.", "User");

document.body.innerHTML += greeter4(user4) + "<br/>";

/*Boolean
The most basic datatype is the simple true/false value,
which JavaScript and TypeScript (as well as other languages) call a 'boolean' value.*/
var isDone: boolean = false;

/*Number
As in JavaScript, all numbers in TypeScript are floating point values.
These floating point numbers get the type 'number'.*/
var height: number = 6;

/*String
Another fundamental part of creating programs in JavaScript for webpages and servers
alike is working with textual data. As in other languages,
 we use the type 'string' to refer to these textual datatypes.
 Just like JavaScript, TypeScript also uses the double quote (")
 or single quote (') to surround string data.*/
var name: string = "bob";
name = 'smith';

/*Array
TypeScript, like JavaScript, allows you to work with arrays of values.
 Array types can be written in one of two ways.
In the first, you use the type of the elements followed by '[]'
to denote an array of that element type:*/
var list:number[] = [1, 2, 3];
/*The second way uses a generic array type, Array<elemType>:*/
var list:Array<number> = [1, 2, 3];

/*Enum
A helpful addition to the standard set of datatypes from JavaScript is the 'enum'.
Like languages like C#, an enum is a way of giving more friendly names to sets of numeric values.*/
enum Color1 {Red, Green, Blue};
var c1: Color1 = Color1.Green;
/*By default, enums begin numbering their members starting at 0.
 You can change this by manually setting the value of one its members.
 For example, we can start the previous example at 1 instead of 0:*/
enum Color2 {Red = 1, Green, Blue};
var c2: Color2 = Color2.Green;
/*Or, even manually set all the values in the enum:*/
enum Color3 {Red = 1, Green = 2, Blue = 4};
var c3: Color3 = Color3.Green;
/*A handy feature of enums is that you can also go from a numeric value
to the name of that value in the enum. For example,
 if we had the value 2 but weren't sure which that mapped to in the Color enum above,
 we could look up the corresponding name:*/
enum Color4 {Red = 1, Green, Blue};
var colorName: string = Color4[2];
alert(colorName);

/*Any
We may need to describe the type of variables that we may not know
when we are writing the application. These values may come from dynamic content,
 eg from the user or 3rd party library. In these cases,
 we want to opt-out of type-checking and let the values pass through compile-time checks.
 To do so, we label these with the 'any' type:*/
var notSure: any = 4;
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
function warnUser(): void {
	alert("This is my warning message");
}

/*Interfaces*/
interface LabelledValue {
	label: string;
}
function printLabel(labelledObj: LabelledValue) {
	console.log(labelledObj.label);
}
var myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

/*Optional Properties*/
interface SquareConfig {
	color?: string;
	width?: number;
}
function createSquare(config: SquareConfig): {color: string; area: number} {
	var newSquare = {color: "white", area: 100};
	if (config.color) {
		newSquare.color = config.color;
	}
	if (config.width) {
		newSquare.area = config.width * config.width;
	}
	return newSquare;
}
var mySquare = createSquare({color: "black"});

/*Function Types*/
interface SearchFunc {
	(source: string, subString: string): boolean;
}
var mySearch1: SearchFunc;
mySearch1 = function(source: string, subString: string) {
	var result = source.search(subString);
	if (result == -1) {
		return false;
	}
	else {
		return true;
	}
}
var mySearch2: SearchFunc;
mySearch2 = function(src: string, sub: string) {
	var result = src.search(sub);
	if (result == -1) {
		return false;
	}
	else {
		return true;
	}
}
/*Array Types*/
interface StringArray {
	[index: number]: string;
}
var myArray: StringArray;
myArray = ["Bob", "Fred"];
/*interface Dictionary {
	[index: string]: string;
	length: number;    // error, the type of 'length' is not a subtype of the indexer
} */

/*Class Types*/
interface ClockInterface1 {
	currentTime: Date;
}
class Clock1 implements ClockInterface1  {
	currentTime: Date;
	constructor(h: number, m: number) { }
}
interface ClockInterface2 {
	currentTime: Date;
	setTime(d: Date);
}
class Clock2 implements ClockInterface2  {
	currentTime: Date;
	setTime(d: Date) {
		this.currentTime = d;
	}
	constructor(h: number, m: number) { }
}
/*interface ClockInterface3 {
	new (hour: number, minute: number);
}
class Clock3 implements ClockInterface3  {
	currentTime: Date;
	constructor(h: number, m: number) { }
}*/
interface ClockStatic {
	new (hour: number, minute: number);
}
class Clock  {
	currentTime: Date;
	constructor(h: number, m: number) { }
}
var cs: ClockStatic = Clock;
var newClock = new cs(7, 30);

/*Extending Interfaces*/
interface Shape {
	color: string;
}
interface PenStroke {
	penWidth: number;
}
interface Square extends Shape, PenStroke {
	sideLength: number;
}
var square = <Square>{};
	square.color = "blue";
	square.sideLength = 10;
	square.penWidth = 5.0;

/*Hybrid Types*/
interface Counter {
	(start: number): string;
	interval: number;
	reset(): void;
}
var c: Counter;
c(10);
c.reset();
c.interval = 5.0;

/*Classes*/
class Greeter11 {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}
var greeter11 = new Greeter11("world");

class Animal {
	name:string;
	constructor(theName: string) { this.name = theName; }
	move(meters: number = 0) {
		alert(this.name + " moved " + meters + "m.");
	}
}
class Snake extends Animal {
	constructor(name: string) { super(name); }
	move(meters = 5) {
		alert("Slithering...");
		super.move(meters);
	}
}
class Horse extends Animal {
	constructor(name: string) { super(name); }
	move(meters = 45) {
		alert("Galloping...");
		super.move(meters);
	}
}
var sam = new Snake("Sammy the Python");
var tom: Animal = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);

class Animal1 {
	private name:string;
	constructor(theName: string) { this.name = theName; }
}
class Rhino1 extends Animal {
	constructor() { super("Rhino"); }
}
class Employee1 {
	private name:string;
	constructor(theName: string) { this.name = theName; }
}
var animal = new Animal1("Goat");
var rhino = new Rhino1();
var employee = new Employee1("Bob");
/*animal = rhino;
animal = employee; //error: Animal and Employee are not compatible*/
/*Parameter properties*/
class Animal2 {
	constructor(private name: string) { }
	move(meters: number) {
		alert(this.name + " moved " + meters + "m.");
	}
}
/*Accessors*/
class Employee2 {
	fullName: string;
}
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
class Grid {
	static origin = {x: 0, y: 0};
	calculateDistanceFromOrigin(point: {x: number; y: number;}) {
		var xDist = (point.x - Grid.origin.x);
		var yDist = (point.y - Grid.origin.y);
		return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
	}
	constructor (public scale: number) { }
}
var grid1 = new Grid(1.0);  // 1x scale
var grid2 = new Grid(5.0);  // 5x scale
alert(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
alert(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
/*Advanced Techniques*/
class Greeter33 {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}
var greeter33: Greeter33;
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

class Greeter55 {
	static standardGreeting = "Hello, there";
	greeting: string;
	greet() {
		if (this.greeting) {
			return "Hello, " + this.greeting;
		}
		else {
			return Greeter55.standardGreeting;
		}
	}
}
var greeter55: Greeter55;
greeter55 = new Greeter55();
alert(greeter55.greet());
var greeterMaker: typeof Greeter55 = Greeter55;
greeterMaker.standardGreeting = "Hey there!";
var greeter255:Greeter55 = new greeterMaker();
alert(greeter255.greet());

/*Using a class as an interface*/
class Point {
	x: number;
	y: number;
}
interface Point3d extends Point {
	z: number;
}
var point3d: Point3d = {x: 1, y: 2, z: 3};
