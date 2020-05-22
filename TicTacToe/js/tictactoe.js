// This function will get fired once the DOM is loaded.
// Disable the stop button since it is not needed until game start.
window.onload = function() {watch() };
function watch() {
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); // disable the stop button since the game has not started
}

// this function will rooll for a random number twice, one for
// each player and determines which player won the roll.
function rollForTurn() {
    var xArray = [];
    var ranNum = '';
    var minimum = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        // random whole nnumber between 1 and 10
        ranNum = Math.floor(Math.random()*(maximum - minimum) + minimum);
        xArray.push(ranNum);
    }
    diceRoll(); //play dice sounds during the game roll for turn
    // build the string to show which player rolled what die roll
    for (i=0;i<xArray.length;i++) {
        console.log(i);
        var result = i + 1;
        var pOne = xArray[0];
        var pTwo = xArray[1];
        if (pOne == pTwo) { // rigging roll on tie to avoid bug in code. Need to address this later...
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 rolled ["+pOne+"]<br>";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled ["+pOne+"]<br><br>";
        setTimeout(function() {writeMsg(txt1);}, 1000); // time delay for dramatic affect
    }
    //determines and concatenate string showing which player won the roll
    if(pOne > pTwo) {
        first = "Player 1";
        setTimeout(function() {txt1 = txt1 + "Player 1 wins, please chooose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    } else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function() { txt1 = txt1 + "Player2 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);},2000);
    }
    // pass which player won the roll
    return first;
}


//
//initiate the game, roll for turn & determine the 
//
function startGame() {
    var xTurn = 0;
    activePlayer = rollForTurn();
    if (activePlayer == "") {// if it was a tie, then reroll
        activePlayer = rollForTurn();
    }
    setTimeout(function() {hideGameMsg();}, 4000);

    // assign proper state of the control buttons
    var btn = document.getElementById('btnStart');
    btnDisabled(btn); // diable the start button since the game is now afoot
    var btn = document.getElementById('btnStop');
    stopEnabled(btn); // enable the stop button since the game is now afoot

    //Assing the  to the console
    var showPlayer = document.getElementById('showPlayer')
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color = "green";
}

// this funciton styles the game buttons while they are disabled
function btnDisabled(btn) {
    btn.style.color = "fff";
    btn.style.border = "2px solid rgb(153,153, 102)";
    btn.style.backgroundColor = "rgb (214, 234, 194)";
    btn.disabled = true;
}

// this funcito styles the game buttons while they are disabled
function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(204, 0, 0)";
    btn.style.backgroundColor = "rgb(255, 51, 51)";
    btn.disabled = false;
}

//this function styles the game buttons while they are disabled
function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(0, 153, 0)";
    btn.style.backgroundColor = "rgb(57, 230 0)";
    btn.disalbed = false;
}

// when the user indicates, stop the current game and reset game
function stopGame() {
    hideGameMsg(); // clear the text and hides messaged box
    var btn = document.getElementById('btnStart');
    startEnabled(btn);// enable the start button since the game
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); // disable the stop button since the game is started
    var showPlayer = document.getElementById('showPlayer')
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color = 'red';

    // reset all squares to their starting empty state.
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i = 0; i<arrayO.length;i++) {
        arrayO[i].style.transform = "translateY(-100%)";
    }
    for (var i = 0; i<arrayX.length;i++) {
        arrayX[i].style.transform = "translateY(100%)";
    }
    // this clears the runnin log of all game moves
    document.getElementById('boardState').innerHTML = "";
}

// this functio will show the message console and any text it may have
function showGameMsg() {
    document.getElementById('gameMsgBox').style.display= 'block';
}

// this function will conceal the message console from view
function hideGameMsg() {
    clearMsg() // clear the text fro the message console
    document.getElementById('gameMsgBox').style.display = 'none'; // hide the div
}

// this functio will write text to the game message console
function writeMsg(txt) {
    showGameMsg();
    document.getElementById('gameMsg').innerHTML = txt;
}

// this functio will clear the text from the message console
function clearMsg() {
    document.getElementById('gameMsg').innerHTML = "";
}

// this function is for the player configuation panel and checks the 
// proposed avatar assignments and prevents them from being the same.
function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Player 1 and Player2 cannot both be assigned as: "+p1Selected[p1Index].text);
    } else {
        document.getElementById('p1Display').innerHTML=p1Selected[p1Index].text;
        document.getElementById('p2Display').innerHTML=p2Selected[p2Index].text;
    }
}

// this function returns's the currently assigned avatar for each player
function getAvatar() {
    var p2Avatar = document.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar,p2Avatar];
    return avatarArray;
}

// this function will return the 's avatar
function determineAvatar() {
    // determine the correct avatar to paint for the 

    var avatarArray = getAvatar(); // returns an array of both player's assigned avatars
    var active = document.getElementById('showPlayer').innerHTML; // get 
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active == "Player 1") { // check wich player is active and their corresponding avatar
        var paintAvatar = p1Avatar;
    } else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar; // returned back the correct avatar
}

// this funciton changes  over to the other player
function avatarPlaced() {
    var parseText = document.getElementById('gameMsg').innerHTML;
    var showPlayer = document.getElementById('showPlayer'); // select the current element to memory
    // check if the there is already a winner... if there is, then don't continue the game
    if (parseText == "That's three in a row, Player 1 wins!" || paseText == "That's three in a row, Player wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color='red';
    }
    activePlayer = showPlayer.innerHTML; // get the current player from the element
    if (activePlayer == "Player 1") { // once  selects a square change the 
        showPlayer.innerHTML = "Player 2";
    } else {
        showPlayer.innerHTML = "Player 1";
    }
    check4Tie(); // call this funcito to inquire if there was a cat's game.
}

// this function will get the array of the current board
// and check the proposed move for a validity
function check(info,square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(O); // comaring index of square
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

// as squares are slected they check in with this function to see if that particular
// square has already been assigned and if it has not, record new square with the assigned avatar.
function recordMoves(square) {
    var proposedMove = square;
    var boardState = document.getElementById('boardState').innerHTML; // retrieve boardState array
    var info = boardState.split(','); // seperate the string by commas to create an array
    verdict = check(info,square); // call function to check if proposed square is already occupied
    return verdict;
}

// this function will get list of previous moves
// and then concatenate the current move to it.
function recordMove(currentMove) {
    var target = document.getElementById('boardState');
    var previousMoves = target.innerHTML;
    target.innerHTML = previousMoves+currentMove;
}

function checkForWinCon() {
    var squareArray = [];
    var target = document.getElementById('boardState');
    var info = target.innerHTML; // raw array with squares and avatars
    info = info.substring(1); // remove leading comma
    info = info.split(','); // separate the string by commas into an array
    info.sort(); // sort the square array in order despite the actual gameplay sequence
    for (var i in infor) {
        squareArray.push(info[i].charAt(O));// new array with only squares not avatars
    }
    // call this following array of functions to check for any of the possible win cons
    checkWinCon1(info.squareArray);
    checkWinCon2(info.squareArray);
    checkWinCon3(info.squareArray);
    checkWinCon4(info.squareArray);
    checkWinCon5(info.squareArray);
    checkWinCon6(info.squareArray);
    checkWinCon7(info.squareArray);
    checkWinCon8(info.squareArray);
    // console.log("New CHECK: "+document.getElementById('gameMsg').innerHTML);
    check4Tie();
}

// call this funcito to check board state for any ties and act accordingly
function check4Tie() {
    var boardState = document.getElementById('boardState').innerHTML;
    boardState = boardState.substring(1); // remove leading comma
    boardState = borardState.split(','); // separate the string by commas into an array
    var check = document.getElementById('gameMsg').innerHTML;
    if(boardState.lenth>= 9 && check != "That's three in a row, Palyer 1 wins!" && check !="That's three in a row, Player 2 wins!"){
        var txt1 = "Oh no! Nobody wins, it was a tie!";
        tieSound(); // play a sound whe a tie has been detected
        writeMsg(txt1);
        setTimeout(function() {stopGame();}, 3000);
    }
}

//whenever a win is tected the corresponding function will 
// call this functio to produce the following winning process for the game
function winnner(winDetected,winCon) {
    if (winDectected == "win") {
        var showme = winDectected;
        var activePlayer = document.getElementById('showPlayer').innerHTML;
        var txt2 = "That's three in a row, "+activePlayer+" wins!";
        writeMsg(txt2);
        var btn = document.getElementById('btnStart');
        startEnabled(btn); // enable the start button since the game is now stopped
        var btn = document.getElementById('btnStop');
        btnDisabled(btn); // disable the stop button since the game is now stopped
        document.getElementById('showPlayer').innerHTML = "Game Stopped";
        glowBoard(winCon); // call function to make the gamboard pulse with colors
    }
}

// this function will make the winning squares light up in celebration
function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementsByClassName('square')
    for (var i=O;i<squares.length;i++) {
        if (i == index0) {
            var bgl = squares[i];
            blink();
            winSound();
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
            setTimeout(function() {bgl.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
            setTimeout(function() {bgl.style.backgroundColor = '#d7f3f7';}, 1100);
        } else if (i == index1) {
            var bg2 = squares[i];
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 100);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 200);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(245, 235, 66)';}, 400);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 500);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 600);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 700);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 255, 66)';}, 900);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 1000);
            setTimeout(function() {bg2.style.backgroundColor = '#d7f3f7';}, 1100);
        } else if (i == index2) {
            var bg3 = squares [i];
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
            setTimeout(function() {bg3.style.backgroundColor = '#d7f3f7';}, 1100);
        }
    }
    setTimeout(function() {stopGame() ;}, 1200);
}

// these functions will produce sounds depending on the occasion
function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function() {sound.pause();}, 400); // add delay to these to keep sound short
    setTimeout(function() {sound.currentTime = 0;}, 500);
}
function tieSound() {
    var sound = document.getElementById("tieGame");
    var check = document.getElementById('gameMsg').innerHTML;
    setTimeout (function() {sound.play();},500);
}
function winSound() {
var sound =document.getElementById("winGame");
    setTimeout(function() {sound.play();}, 500);
    setTimeout(function() {sound.pause();}, 2700); // add delay to these to keepsound short
    setTimeout(function() {sound.currentTime = 0;}, 2800);
}
function diceRoll() {
    var sound = document.getElementById("diceRoll");
    sound.play();
}

// call this funcito to make entire background color
// flash for a few seconds for a win condition
function blink() {
    var body = document.getElementById('body');
    setTimeout(function() {body.style.backgroundColor = '#94f7ed';}, 100);
    setTimeout(function() {body.style.backgroundColor = '#94cef7';}, 200);
    setTimeout(function() {body.style.backgroundColor = '#94a6f7';}, 300);
    setTimeout(function() {body.style.backgroundColor = '#b094f7';}, 400);
    setTimeout(function() {body.style.backgroundColor = '#cc94f7';}, 500);
    setTimeout(function() {body.style.backgroundColor = '#e894f7';}, 600);
    setTimeout(function() {body.style.backgroundColor = '#f794d9';}, 700);
    setTimeout(function() {body.style.backgroundColor = '#f73881';}, 800);
    setTimeout(function() {body.style.backgroundColor = '#c6034e';}, 900);
    setTimeout(function() {body.style.backgroundColor = '#e00202';}, 1000);
    setTimeout(function() {body.style.backgroundColor = '#ffffff';}, 1100);
}

// 378
// These functionsare the algorithms to find all win conditions
//
// checking for wincon squares 012
function checkWinCon1(info,squareArray) {
    var winDetected = "on";
    var winCon1 = [0,1,2];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 0, index 1, index 2 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "O") {
            var matchOAvatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (matchOAvatar != undefined && match1Avatar != undefined && match2Avatar != undefined) {
        if (matchOAvatar == match1Avatar && matchOAvatar == match2Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1); // winon1 is the array of win combo
}

// checking for wincon squares 345
function checkWinCon2(info,squareArray) {
    var winDetected = "on";
    var winCon2 = [3,4,5];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 3, index 4, index 5 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "3") {
            var match3Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) {
        if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon2);
            return;
        }
    }
    winner(winDetected,winCon2); // winon1 is the array of win combo
}

// checking for wincon 678
function checkWinCon3(info,squareArray) {

    var winDetected = "on";
    var winCon3 = [6,7,8];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 6, index 7, index 8 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "6") {
            var match6Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) {
        if (match6Avatar == match7Avatar && match6Avatar == match8Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon3);
            return;
        }
    }
    winner(winDetected,winCon3); // winon1 is the array of win combo
}

// checking for wincon squares 036

function checkWinCon4(info,squareArray) {
    var winDetected = "on";
    var winCon4 = [0,3,6];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 0, index 3, index 6 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "0") {
            var matchOAvatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (matchOAvatar != undefined && match3Avatar != undefined && match6Avatar != undefined) {
        if (matchOAvatar == match3Avatar && matchOAvatar == match6Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon4);
            return;
        }
    }
    winner(winDetected,winCon4); // winon1 is the array of win combo
}

// checking for wincon squares 147
function checkWinCon5(info,squareArray) {
    var winDetected = "on";
    var winCon5 = [1,4,7];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 1, index 4, index 7 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "1") {
            var match1Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (match1Avatar != undefined && match4Avatar != undefined && match7Avatar != undefined) {
        if (match1Avatar == match4Avatar && match1Avatar == match7Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon5);
            return;
        }
    }
    winner(winDetected,winCon5); // wincon2 is the array of win combo
}

// checking for wincon squares 258
function checkWinCon6(info,squareArray) {
    var winDetected = "on";
    var winCon6 = [2,5,8];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 2, index 5, index 8 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "2") {
            var match2Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (match2Avatar != undefined && match5Avatar != undefined && match8Avatar != undefined) {
        if (match2Avatar == match5Avatar && match2Avatar == match8Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon6);
            return;
        }
    }
    winner(winDetected,winCon6); // winon1 is the array of win combo
}

// checking for wincon squares 642
function checkWinCon7(info,squareArray) {
    var winDetected = "on";
    var winCon7 = [6,4,2];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 6, index 4, index 2 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "6") {
            var match6Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (match6Avatar != undefined && match4Avatar != undefined && match2Avatar != undefined) {
        if (match6Avatar == match4Avatar && match6Avatar == match2Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon7);
            return;
        }
    }
    winner(winDetected,winCon7); // winon1 is the array of win combo
}

// checking for wincon squares 840
function checkWinCon8(info,squareArray) {
    var winDetected = "on";
    var winCon8 = [8,4,0];
    // iterate through the growing array during
    //gametime searching for the existence of
    // index 8, index 4, index 0 and once they
    // they do appear in the array, record their
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(O) == "8") {
            var match8Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(O) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(O) == "0") {
            var match0Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a mtch for index0, index1, and index2
    if (match8Avatar != undefined && match4Avatar != undefined && match0Avatar != undefined) {
        if (match8Avatar == match4Avatar && match8Avatar == match0Avatar) {
            winDectected = "win"; // this flag will pass when a win has been detected
            winner (winDetected,winCon8);
            return;
        }
    }
    winner(winDetected,winCon8); // winon1 is the array of win combo
}
//573
// These block of fucntions are for each click event of their corresponding square element
//
function square1Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // If game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the 
            var selected = document.getElementsByClassName(paintAvatar)[i]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call functio to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); //a end current turn and pass the turn tothe other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square2Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "1"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square3Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placemtn
        var square = "2"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square4Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placemtn
        var square = "3"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square5Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placemtn
        var square = "4"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square6Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placemtn
        var square = "5"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square7Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placemtn
        var square = "6"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square8Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placemtn
        var square = "7"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square9Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placemtn
        var square = "8"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active palyer
            var selected = document.getElementsByClassName(paintAvatar) [i]; // paint avatar
            if (paintAvatar = "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a vwinning condition.
            avatarPlaced(square.paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

// this function will perform the animation for the O avatar.
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(O%)" : "translateY(-100%)";
}

// this functio will perform the animatio for the X avatar.
function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(100%)" || null) ? "translateY(O%)" : "translateY(100%)";
}