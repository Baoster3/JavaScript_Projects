function Ride_Function() {
    var Height, Can_ride;
    Height = document.getElementById("Height").value;
    Can_ride = (Height < 52) ? "You are too short":"You are tall enough";
    document.getElementById("Ride").innerHTML = Can_ride + " to ride.";
}
/* New and this and constructors JS code */
function Vehicle (Make, Model, Year, Color) {
	this.Vehicle_Make = Make;
	this.Vehicle_Model = Model;
	this.Vehicle_Year = Year;
	this.Vehicle_Color = Color;
}
var Jack = new Vehicle ("Dodge", "Viper", 2020, "Red");
var Emily = new Vehicle("Jeep", "Trail Hawk", 2019, "White and Black");
var Erik = new Vehicle("Ford", "Pinto", 1971, "Mustard");
function myFunction() {
	document.getElementById("New_and_This").innerHTML =
	"Erik drives "+ Erik.Vehicle_Color + "-colored " + Erik.Vehicle_Model +
	" manufactured in " + Erik.Vehicle_Year;
}
/*Nested Funciton*/
function add() {
    var counter=0;
    function plus() {counter += 1;}
    plus();
    return counter;
}
document.getElementById("nest").innerHTML = add();
