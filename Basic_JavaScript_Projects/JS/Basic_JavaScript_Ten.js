function Call_Loop() {
    var year = document.getElementById("birth_year").value;
    var X = 2020;
    var Y = 0;
    while (year < X) {
        year++;
        Y++;
    }
    document.getElementById("Loop").innerHTML = "You are " + Y + "give or take a year.";
}