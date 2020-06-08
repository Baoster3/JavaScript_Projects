//This variable keeps track of who's turn it is.
let activePlayer='X';
let selectedSquares = [];  // The array of moves 

// This function is for placing an x or o in a square
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);
        if (activePlayer ==='X') {
            select.style.backgroundImage= 'url("../TicTacToe/images/x2.jpg")';
        } else {
            select.style.backgroundImage = 'url("../TicTacToe/images/o2.jpg")';
        }
        selectedSquares.push(squareNumber + activePlayer);
        checkWinConditions(); // This calls a function to check for any win condtions.
        if (activePlayer === 'X') {
            activePlayer = 'O';
        } else {
            activePlayer = 'X';
        }
        audio('../TicTacToe/media/place2.mp3');
        if (activePlayer === 'O') {
            disableClick();
            //this function disables clicking for computer choice
            setTimeout(function () { computersTurn(); }, 1000);
        }
        // Returning true is needed for our computersTurn() function to work.
        return true;
    }

    //This function results in a random square being selected.
    function computersTurn() {
        let success = false;
        let pickASquare;// This variable stores a random number 0-8
        while (!success) {
            pickASquare = String(Math.floor(Math.random() * 9));
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                success = true;
            };
        }
    }
}

// this function parses the selectedSquares array to search for win conditions
//draWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    // X 0 1 2 condition.
    if (arrayIncludes('0X' ,'1X' , '2X')) { drawWinLine(50, 100, 558, 100); }
    // X 3 4 5 condition.
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    // X 6 7 8 condition.
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    // X 0 3 6 condition.
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    // X 1 4 7  condition.
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    // X 2 5 8 condition.
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    // X 6 4 2 condition.
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    // X 0 4 8 condition.
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    // O  0 1 2 condition.
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 520, 100); }
    // O 3 4 5 condition.
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    // O 6 7 8 condition.
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    // O 0 3 6 condition.
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    // O 1 4 7 condition.
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    // O 2 5 8 condition.
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 304, 558); }
    // O 6 4 2 condition.
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    // O 0 4 8 condition.
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    // This condition checks for tie. If none of the above conditions register
    // and 9 squares are selected, the code executes.
    else if (selectedSquares.length >= 9) {
        // this function plays the tie game sound.
        audio('../TicTacToe/media/tie2.mp3');
        setTimeout(function () { resetGame(); }, 1000);
    }
    //This function checks if an array includes 3 strings.
    //It is used to check for each win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If the 3 variables we pass are all included in our array true is 
        // returned and our else if condition executes the drawWinLine funciton.
        if (a === true && b === true && c === true) { return true; }
    }   
}

//This function makes our body element temporarily unclickable.
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

// This funciton takes a string parameter of the path you set earlier for 
// placement sound ('./media/place.mp3')
function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

// This function utilizes html canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;
    
    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608);
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.lineWidth = 10;
        c.strokeStyle = 'rgba(70, 255, 33, .8)';
        c.stroke();
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10; }
            if (y < y2) { y += 10; }
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
         //This condition is similar to the one above.
        //It was necessary for the 6, 4, 2 win condition.
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }
        
    //This function clears our canvas after our win line is drawn.
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    disableClick();
    audio('../TicTacToe/media/winGame(2).mp3');
    animateLineDrawing();
    setTimeout(function () { clear(); resetGame(); }, 1000);
}
//This funciton resets the game in a tie or a win.
function resetGame() {
    for (let i=0; i < 9; i++) {
        let square = document.getElementById(String(i));
        square.style.backgroundImage = '';
    }
    selectedSquares = [];
}