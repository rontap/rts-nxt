/*
 * cancer HTML main core js
 * created by: Aron Tatai

 * testing and feedback: Csikos-Nagy Mate

 * part of RTS NXT | created in 2018
 * source: http://rontap.netne.net/games/cancer.html

*/
/*eslint eqeqeq:0*/
/*eslint-disable*/
// -----------------------------------------------
// --- BASIC SETUP -------------------------------
// -----------------------------------------------
import nxt from '../nxtjs/jsplus';
import CONST from '../constants';
nxt.export();
let level = 0;
//variables
let size = 10;

let previousColor = null;
let cellWidth = 10;
let content = [];
let validity = [];
let movesTook = Array(99).fill(0);     //storing how many moves you took to complete each level!
let isAllowed = true;

let gameMode = "normal";
//gamemodes: Normal/Zen/TimeAttack
var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

let secondCenterPoint = [null, null];
let isSecondCentrePointActive = false;

let colorRange = CONST.defaultColorRange;
let scheme =  CONST.schemeWallColor.concat(CONST.schemeStore[CONST.defaultScheme]);

// -----------------------------------------------
// --- DRAWING NEW LEVEL -------------------------
// -----------------------------------------------

function paint() {
    let actWidth = (300 + (size * 5));
    cellWidth = (actWidth) / (size);

    canv.width = actWidth;
    canv.height = actWidth;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let cancerOrigin = [Math.randInt(size), Math.randInt(size)]; //X,Y

    //repainting the document canvas
    for (let line = 0; line < size; line++) {
        content[line] = [];   //resetting every color
        validity[line] = [];  //resetting every validity
        for (let cell = 0; cell < size; cell++) {  //looping through all cells
            let selectedBrush = Math.randInt(colorRange)+1;
            content[line][cell] = selectedBrush; //saving to array!!!
            validity[line][cell] = false; //filling up with false
            ctx.fillStyle = "#" + scheme[selectedBrush];
            ctx.fillRect(cell * cellWidth, line * cellWidth, cellWidth, cellWidth);
        }
    }
    //drawWalls
    let numberOfWalls = Math.min((level**2), CONST.maxWallPercent*size*size);
    for (let iwall= 0; iwall<numberOfWalls;iwall++) {
        let [cell,line] = [Math.randInt(size),Math.randInt(size)];

        content[line][cell] = 0;
        ctx.fillStyle = '#'+ CONST.schemeWallColor;
        ctx.fillRect(cell * cellWidth, line * cellWidth, cellWidth, cellWidth);
    }


    //paintCancerCell Center
    isSecondCentrePointActive = false; //resetting double center
    secondCenterPoint = [null, null];

    //update center
    let currColor = content[cancerOrigin[1]][cancerOrigin[0]];
    paintCentre(cancerOrigin[0], cancerOrigin[1]);
    if (isSecondCentrePointActive) paintCentre(secondCenterPoint[0], secondCenterPoint[1]);

    // updating controls
    $('#controls').innerHTML = '';
    for (i = 1; i < colorRange+1; i++) {
        $('#controls').innerHTML += "<button nxt onclick='clickTo(" + i + ")' style='background:#" + scheme[i] + "'>" + i + "</button>"
    }

    //updating current level
    level++;
    $('#level').innerHTML = "Level " + level;
}

// -----------------------------------------------
// --- UPDATING LEVEL COLORS ---------------------
// -----------------------------------------------

function updatePaint(color) {
    if (isAllowed) {
        for (let line = 0; line < size; line++) {
            for (let cell = 0; cell < size; cell++) {

                if (validity[line][cell]) { //if this is affected, force color change
                    content[line][cell] = color;
                    ctx.fillStyle = "#" + scheme[color];
                } else {
                    ctx.fillStyle = "#" + scheme[content[line][cell]];
                }
                ctx.fillRect(cell * cellWidth, line * cellWidth, cellWidth, cellWidth);
            }
        }

        //redraw cancer centers
        paintCentre(cancerOrigin[0], cancerOrigin[1]);
        if (isSecondCentrePointActive) paintCentre(secondCenterPoint[0], secondCenterPoint[1]);
    }
}

function paintCentre(xPos, yPos) { //cancer center drawing
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'rgba(255,255,255,.75)';
    ctx.moveTo(50, 50);
    ctx.ellipse((xPos * cellWidth) + (cellWidth / 2), (yPos * cellWidth) + (cellWidth / 2), 10, 10, 0, 0, 2 * Math.PI, false);
    ctx.fill();
    //validity[yPos][xPos]=true;
}

// -----------------------------------------------
// --- CHANGING CANCER COLOR ---------------------
// -----------------------------------------------

function clickTo(color) {

    if (reqMoves[level - 1] < 0) { //game ends LOST
        nxt.notify("#runOut");
        restart.classList.add('on');
        backdrop.classList.add('on');
        restartLevel.innerHTML = level;
        if (nxt.getStore('cancer-3-maxlevel') < level) {
            XPHolder.innerHTML = "New Personal Record!<br> You beat your previous record of " + nxt.getStore('cancer-3-maxlevel');
            nxt.setStore('cancer-3-maxlevel', level);
        } else if (nxt.getStore('cancer-3-maxlevel') == undefined) {
            nxt.setStore('cancer-3-maxlevel', level);
            XPHolder.innerHTML = "Congrats on your first game!";
        } else {
            XPHolder.innerHTML = "Keep it up! Your best level is: " + nxt.getStore('cancer-3-maxlevel');
        }
        isAllowed = false;
        return false;
    }

    if (color > colorRange) return false; //invalid color
    if (color === 0) return false;

    if (color == previousColor) return false;
    previousColor = color;

    powerup.stepStrength(level);

    for (let i = 0; i < validity.length; i++) { //resetting validity
        for (let j = 0; j < validity.length; j++) {
            validity[i][j] = false;
        }
    }

    // ------------ HACKING STARTING POINTS ----------
    //starting from main coordinates
    let x = cancerOrigin[1];
    let y = cancerOrigin[0];
    expand(x, y, currColor);
    if (isSecondCentrePointActive) { //áttét
        validity[secondCenterPoint[1]][secondCenterPoint[0]] = true;
        expand(secondCenterPoint[1], secondCenterPoint[0], currColor);
    }
    powerup.goArray.push(content);

    let currColor = color;

    updatePaint(color);
    updatePaint(color);

    // [LEVEL PROGRESSION]
    movesTook[level - 1]++; //adding moves
    let prevColor = null;

    if ((gameMode === "normal") || (gameMode === "time")) {
        reqMoves[level - 1]--;
        movesLeft.innerHTML = reqMoves[level - 1];

        // -- INCREASING HARDNESS --
        if ( isWon() ) {//you won
            reqMoves[level] += reqMoves[level - 1];
            size += 2;
            if (level % 3 === 1) {
                colorRange++;
                size -= 2;
            }
            powerup.levelStrength(level);
            animateWin(color);
            paint();
            movesLeft.innerHTML = reqMoves[level];

            // YOU WON STILL
            if (gameMode === "time") {
                setTimeout(function () {
                    window.timeAttackSafeSpace = true;
                    timeAttackCount();
                }, 100)
            }
        }
    }
    if (gameMode === "zen") {
        movesLeft.innerHTML = movesTook[level - 1];
        move_text.innerHTML = "Moves Used";
        if ( isWon() ) {//you won

            reqMoves[level] += reqMoves[level - 1];
            size += 2;
            if (level % 4 === 1) {
                colorRange++;
                size -= 2;
                if (level > 10) size++;

            }
            powerup.levelStrength(level);
            animateWin(color);
            paint();
            movesLeft.innerHTML = "..";

        }

        //


    }


}

function animateWin(color) {

    winAnimate.style.marginTop = canv.offsetTop + "px";
    winAnimate.style.marginLeft = canv.offsetLeft + "px";
    winAnimate.style.width = canv.width + "px";
    winAnimate.style.height = canv.height + "px";
    winAnimate.style.background = "#" + scheme[color];
    setTimeout(function () {
        winAnimate.classList.add('on');
        winAnimate.style.marginTop = canv.offsetTop + ((cancerOrigin[1] - .5) * cellWidth) + (cellWidth / 2) + "px";
        winAnimate.style.marginLeft = canv.offsetLeft + ((cancerOrigin[0] - .5) * cellWidth) + (cellWidth / 2) + "px";
        winAnimate.style.width = cellWidth + "px";
        winAnimate.style.height = cellWidth + "px";
    }, 100);
    setTimeout(function () {
        winAnimate.style.width = canv.style.width;
        winAnimate.style.height = canv.style.height;
        winAnimate.classList.remove('on');
    }, 1000);
}

// -----------------------------------------------
// --- RECURSIVE COLOR CHANGE --------------------
// -----------------------------------------------

function expand(x, y, colorCode) { //this does the acual expanding of the project

    validity[x][y] = true;

    //looking in the four main directions
    if (isValid(x - 1, y, colorCode)) expand(x - 1, y, colorCode);
    if (isValid(x + 1, y, colorCode)) expand(x + 1, y, colorCode);
    if (isValid(x, y - 1, colorCode)) expand(x, y - 1, colorCode);
    if (isValid(x, y + 1, colorCode)) expand(x, y + 1, colorCode);


}

function isValid(x, y, color) {
    let isValid = true;
//console.log("checking:",x,y);
    if (x < 0 || y < 0) isValid = false;  //out of bounds
    else if (x >= size || y >= size) isValid = false;  //out of bounds
    else if (content[x][y] != color) isValid = false; //invalid color...
    else if (validity[x][y]) isValid = false;  //already checked element


    return isValid;
}

function isWon() {
    return content.every( array => array.isSameOrZero(array) )
}

function startGame()//animtaion
{
    if (gameMode == "time") {
        timeAttackBar.style.transition = '0s';
        timeAttackBar.style.right = '0%';
        timeAttackBar.style.background = '#4CAF50';
        setTimeout(function () {
            timeAttackCount();

        }, 600);

    }

    if (gameMode == "zen") {
        colorRange = 2;
    }

    window.isGameStarted = true;
    setDifficulty();
    menu.classList.add('hide');
    start.classList.add('on');
    setTimeout(function () {
        menu.classList.add('hideall');
        $('body').classList.add('started');
    }, 700);


    start.onclick = function (event) {
        clickEvent(event);
    }
    paint();


}

function clickEvent(e) {    //handeling
    console.log(e);
    let xPos = Math.round((e.offsetX - cellWidth / 2) / cellWidth);
    let yPos = Math.round((e.offsetY - cellWidth / 2) / cellWidth);
    console.log(xPos, yPos);
    if (powerup.active == "metastasis") powerup.metastasis(xPos, yPos);
    if (powerup.active == "clear") powerup.clear(xPos, yPos);
    if (powerup.active == "expand") powerup.expand();
    if (powerup.active == "steps") powerup.addSteps();
    //clickTo(currColor); //automatically call it
    updatePaint(currColor);

}


nxt.location = '../NXTJS/';

//EVOLUTION
function showEvolution() {
    $('body').classList.add('evolveIO');
    pageTitle.style.opacity = 0;
    setTimeout(function () {
        pageTitle.innerHTML = "Evole and Traits";
        start.innerHTML = "close";
        evolveHolder.classList.add('on');
        pageTitle.style.opacity = 1;
        setTimeout(function () {

        }, 600);
    }, 300);
}
