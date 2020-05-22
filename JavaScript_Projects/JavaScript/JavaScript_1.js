// Switch Function
function Weapon_Function() {
    var Weapon_Output;
    var Weapons = document.getElementById("Weapon_Input").value;
    var Weapon_String = " is a great weapon!";
    switch(Weapons) {
        case "Knife":
            Weapon_Output = "Knife" + Weapon_String;
        break;
        case "Handgun":
            Weapon_Output = "Handgun" + Weapon_String;
        break;
        case "Assault Rifle":
            Weapon_Output = "Assault Rifle" + Weapon_String;
        break;
        case "Sniper Rifle":
            Weapon_Output = "Sniper Rifle" + Weapon_String;
        break;
        case "Rocket Launcher":
            Weapon_Output = "Rocket Launcher" + Weapon_String;
        break;
        case "Sword":
            Weapon_Output = "Sword" + Weapon_String;
        break;
        default:
        Weapon_Output = "Please enter a weapon exactly as written on the above list.";
    }
    document.getElementById("Output").innerHTML = Weapon_Output;
}

// GETELEMENTBYCLASS() METHOD
function Sentence_Change() {
    var A = document.getElementsByClassName("Change");
    A[0].innerHTML = " I told you that the text will change haha!";
    A[1].innerHTML = " I told you this line will also change haha!";
}

// CANVAS
var c = document.getElementById("TheeCanvas");
var ctx = c.getContext("2d");

var grd = ctx.createLinearGradient(0, 0, 170, 0);
grd.addColorStop(0, "black");
grd.addColorStop(1, "white");

ctx.fillStyle= grd;
ctx.fillRect(20, 20, 150, 100);