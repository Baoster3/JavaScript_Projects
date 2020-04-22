function concat_function() {
    var p1 = "This sentence ";
    var p2 = "is made to show ";
    var p3 = "you how to utilize ";
    var p4 = "the concatenate function" ;
    var whole_phrase = p1.concat(p2, p3, p4);
    document.getElementById("Concatenate").innerHTML = whole_phrase;
}

document.write("<br>");

function slice_Method() {
    var Answer = "Jaime is the brother";
    var The_answer = Answer.slice(0,5);
    var uppercase = The_answer.toUpperCase();
    document.getElementById("slice").innerHTML = uppercase;
}

function string_Method() {
    var X = 12
    document.getElementById("toString").innerHTML = X.toString();
}

function precision_Method() {
    var P = (33.33*33.33);
    document.getElementById("Too_Precise").innerHTML = P.toPrecision(6);
}
