var x = myFunction(4, 3);
document.getElementById("Math").innerHTML = x;

function myFunction(a, b) {
  return a + b;
}

var x = 5;
var y = 2;
var z = x - y;
document.getElementById("Math2").innerHTML = z;

var x = 6;
var y = 3;
var z = x * y;
document.getElementById("Math3").innerHTML = z;

var x = 6;
var y = 3;
var z = x / y;
document.getElementById("Math4").innerHTML = z;

var x = 7;
var y = 8;
var z = 2;
var a =(8 * 7) / 2;
document.getElementById("Math5").innerHTML = a;

var x = 10;
var y = 4;
var z = 10 % 4;   
document.getElementById("Math6").innerHTML = (z); 


var s = 6;
document.getElementById("Math7").innerHTML = (-s);

var X = 11;
X--;
document.getElementById("Math8").innerHTML = (X);

var Y = 11;
Y++;
document.getElementById("Math9").innerHTML = (X);

window.alert(Math.random() * 100);

var Z = Math.floor(4.7);
document.getElementById("Math10").innerHTML = (Z);
