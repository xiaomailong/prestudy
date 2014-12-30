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
