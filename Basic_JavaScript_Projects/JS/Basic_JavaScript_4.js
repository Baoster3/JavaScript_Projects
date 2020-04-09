function Method() {
    var primate = {
        Species: "Human",
        Legs: 2,
        Arms: 2,
        Breed: "Homo-Sapien",
    };
    document.getElementById("Dictionary").innerHTML = primate.Species;
}

function Method2() {
    var primate = {
        Species: "Gorilla",
        Legs: 2,
        Arms: 2,
        Breed: "Unknown",
    };
    document.getElementById("Dictionary2").innerHTML = primate.Species;
}

function Method3() {
    var primate = {
        Species: "Monkey",
        Legs: 2,
        Arms: 2,
        Breed: "Unknown"
    };
    delete primate.Breed;
    document.getElementById("Dictionary3").innerHTML = primate.Breed;
}

