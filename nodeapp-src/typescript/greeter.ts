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
