var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex =1}
    if (n < 1) {slideIndex = slides.length}
    for (i=0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex -1].className += " active";
}

document.write("<br>");
// Countdown Function
function countdown_hero() {
    var chosen_hero = document.getElementById("fav_hero").value;
    var start = 10;
    var seconds = start;
    var countdown_timer = setInterval(function() {
        seconds--;
        if(seconds <= 0) {
            document.getElementById("timer").innerHTML = chosen_hero + " is a great choice";
        }else{
            document.getElementById("timer").innerHTML = seconds;
        }
    }, 1000);
}
    
