/*using Local Variable*/
document.write("<br>");

var X = 10;
function Add_numbers_1() {
    document.write(20 + X + "<br>");
}
function Add_numbers_2() {
    document.write(X + 100);
}
Add_numbers_1();
Add_numbers_2();

document.write("<br>");

/*using global Variables*/
function Add_numberrs_1() {
    var X = 10;
    document.write(20 + X + "<br>");
}
function Add_numbers_2() {
    document.write(X + 100);
}
Add_numbers_1();
Add_numbers_2();

document.write("<br>");

function getDate() {
    if (new Date() .getHours() < 12) {
        document.getElementById("timeofday").innerHTML = "Good Morning";
    }else {
        document.getElementById("timeofday").innerHTML = "Good day";
    }
}

function legal_driving_age() {
    var Z = document.getElementById("age").value;
    var saying;
    if (Z >= 16) {
        saying = "Congrats, you are old enough to drive!";
    }else {
        saying = "Sorry, you are not old enought to drive.";
    }
    document.getElementById("driving_age").innerHTML = saying;
}