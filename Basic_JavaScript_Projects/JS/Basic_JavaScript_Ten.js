/* While Loop */
function Call_Loop() {
    var year = document.getElementById("birth_year").value;
    var X = 2020;
    var Y = 0;
    while (year < X) {
        year++;
        Y++;
    }
    document.getElementById("Loop").innerHTML = "You are " + Y + " years old" + " give or take a year.";
}

/* For Loop */
function for_Loop() {
    var cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
    var text = "";
    var i;
    for (i = 0; i < cars.length; i++) {
        text += cars[i] + "<br>";
    }
    document.getElementById("List_of_Cars").innerHTML = text;
}

/* Array */
function array_Function() {
    var fruits = ["Banana", " Orange", " Apple", " Mango"];
    document.getElementById("Array").innerHTML ="I like mixing "  + fruits[0] + fruits[1] + " together when I make juice.";
}

/* Constant */
function constant_function() {
    const Motor_Vehicle = {type:"Sedan", brand:"Mazda", color:"black"};
    Motor_Vehicle.color = "black";
    Motor_Vehicle.price = "$1200";
    document.getElementById("Constant").innerHTML = "The cost of the " + Motor_Vehicle.brand + " is " + Motor_Vehicle.price;
}

/* Let Keyword */
function LetKeyword () {
    var X = 82;
    document.write(X);
    {
        let X = 33;
        document.write("<br>" + X);
    }
    document.write("<br>" + X);
}

/* Let Objects */
function LetObjects () {
    let car = {
        make: "Scion ",
        model: "FRS ",
        year: "2010 ",
        color: "blue ",
        description: function() {
            return "The car is a " + car.year + car.color + car.make + car.model;
        }
    };
    document.getElementById("Let_Objects").innerHTML = car.description();
}