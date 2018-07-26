/*
 * cancer HTML main core js
 * created by: Aron Tatai

 * testing and feedback: Csikos-Nagy Mate

 * part of RTS NXT | created in 2018
 * source: http://rontap.netne.net/games/cancer.html

*/

// -----------------------------------------------
// --- BASIC SETUP -------------------------------
// -----------------------------------------------

level = 0 ;
//variables
size = 10;
cellWidth = 10;
content=[];
validity=[];
movesTook=Array(99).fill(0);     //storing how many moves you took to complete each level!
isAllowed = true;

gameMode = "normal";
//gamemodes: Normal/Zen
var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

cancerMetastasis=[null,null];
isMetastasis=false;



schemeStore = [
  ["f44336","3F51B5","009688","FFEB3B","795548","8E24AA","039BE5","7CB342","F4511E","546E7A","212121"],
  ["E74856","00CC6A","0078D7","C239B3","FF8C00","00B7C3","6B69D6","FFB900","4C4A48","515C6B","212121"],
  ["e74c3c","2ecc71","3498db","e67e22","9b59b6","34495e","1abc9c","f1c40f","95a5a6","#ecf0f1","212121"],
  ["c62828","e53935","6A1B9A","F06292","E91E63","C2185B","f44336","b71c1c","d50000","#9C27B0","212121"]
]
scheme = schemeStore[2];
colorRange =3;

// -----------------------------------------------
// --- DRAWING NEW LEVEL -------------------------
// -----------------------------------------------

function paint() {
    actWidth = (300 + (size*5));
    cellWidth = (actWidth)/(size);

    canv.width = actWidth ;
    canv.height = actWidth ;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancerOrigin=[Math.randInt(size),Math.randInt(size)]; //X,Y

    //repainting the document canvas
    for ( line=0 ; line<size ; line++) {
      content[line]=[];   //resetting every color
      validity[line]=[];  //resetting every validity
      for ( cell=0 ; cell<size ; cell++) {  //looping through all cells
        let selectedBrush = Math.randInt(colorRange);
        content[line][cell]=selectedBrush; //saving to array!!!
        validity[line][cell]=false; //filling up with false
        ctx.fillStyle = "#" + scheme[selectedBrush];
        ctx.fillRect(cell*cellWidth,line*cellWidth,cellWidth,cellWidth);
      }
    }
  //paintCancerCell Center
  isMetastasis=false; //resetting double center
  cancerMetastasis=[null,null];

  //update center
  currColor = content[cancerOrigin[1]][cancerOrigin[0]];
  paintCentre(cancerOrigin[0],cancerOrigin[1]);
  if (isMetastasis) paintCentre(cancerMetastasis[0],cancerMetastasis[1]);

  // updating controls
  $('#controls').innerHTML='';
  for (i=0;i<colorRange;i++) {
    $('#controls').innerHTML+="<button nxt onclick='clickTo("+i+")' style='background:#"+scheme[i]+"'>"+i+"</button>"
  }

  //updating current level
  level++;
  $('#level').innerHTML="Level "+level;
}

// -----------------------------------------------
// --- UPDATING LEVEL COLORS ---------------------
// -----------------------------------------------

function updatePaint(color) {
  if (isAllowed) {
  for ( line=0 ; line<size ; line++) {
    for ( cell=0 ; cell<size ; cell++) {

      if (validity[line][cell]) { //if this is affected, force color change
          content[line][cell]=color;
          ctx.fillStyle = "#" + scheme[color];
      }
      else {
          ctx.fillStyle = "#" + scheme[content[line][cell]];
      }
      ctx.fillRect(cell*cellWidth,line*cellWidth,cellWidth,cellWidth);
    }
  }

  //redraw cancer centers
                    paintCentre(cancerOrigin[0]    ,cancerOrigin[1]    );
  if (isMetastasis) paintCentre(cancerMetastasis[0],cancerMetastasis[1]);
  }
}

function paintCentre(xPos,yPos) { //cancer center drawing
  ctx.strokeStyle='black';
  ctx.fillStyle='rgba(255,255,255,.75)';
  ctx.moveTo(50,50);
  ctx.ellipse((xPos*cellWidth)+(cellWidth/2),(yPos*cellWidth)+(cellWidth/2),10,10,0,0,2*Math.PI,false);
  ctx.fill();
  //validity[yPos][xPos]=true;
}

// -----------------------------------------------
// --- CHANGING CANCER COLOR ---------------------
// -----------------------------------------------


function clickTo(color ) {

  if (reqMoves[level-1]<0) { //game ends LOST
    nxt.notify("#runOut");
    restart.classList.add('on');
    backdrop.classList.add('on');
    restartLevel.innerHTML= level;
    if ( nxt.getStore('cancer-3-maxlevel') < level ) {
      XPHolder.innerHTML="New Personal Record!<br> You beat your previous record of " + nxt.getStore('cancer-3-maxlevel');
      nxt.setStore('cancer-3-maxlevel',level);
    }
    else if ( nxt.getStore('cancer-3-maxlevel') == undefined) {
        nxt.setStore('cancer-3-maxlevel',level);
          XPHolder.innerHTML="Congrats on your first game!";
    }
    else {
        XPHolder.innerHTML="Keep it up! Your best level is: " + nxt.getStore('cancer-3-maxlevel');
    }
    isAllowed=false;
    return false;
  }

  if (color>colorRange) return false; //invalid color

  powerup.stepStrength( level );

  for (i=0;i<validity.length;i++) { //resetting validity
      for (j=0;j<validity.length;j++) {
      validity[i][j]=false;
     }
  }

  // ------------ HACKING STARTING POINTS ----------
  //starting from main coordinates
  x = cancerOrigin[1];
  y = cancerOrigin[0];
  expand(x,y,currColor);
    if (isMetastasis) { //áttét
      validity[cancerMetastasis[1]][cancerMetastasis[0]]=true;
      expand(cancerMetastasis[1],cancerMetastasis[0],currColor);
    }
    powerup.goArray.push(content);

  currColor = color;

  updatePaint(color);
  updatePaint(color);

  // [LEVEL PROGRESSION]
  movesTook[level-1]++; //adding moves

  if ((gameMode == "normal") || (gameMode == "time")) {
      reqMoves[level-1]--;
      movesLeft.innerHTML =  reqMoves[level-1];

        // -- INCREASING HARDNESS --
        if ( content.map(x => x.isSame()).isSame() ) {//you won
          reqMoves[level] += reqMoves[level-1];
           size+=2;
           if (level%3==1) {
             colorRange++;
             size-=2;
           }
           powerup.levelStrength( level );
           animateWin(color);
           paint();
           movesLeft.innerHTML=reqMoves[level];

          // YOU WON STILL
          if (gameMode == "time") {
            setTimeout(function(){
              timeAttackSafeSpace=true;
              timeAttackCount();
            },100)
        }
  }
  if (gameMode == "zen") {
      movesLeft.innerHTML =  movesTook[level-1];
      move_text.innerHTML = "Moves Used";
      if ( content.map(x => x.isSame()).isSame() ) {//you won
        reqMoves[level] += reqMoves[level-1];
         size+=2;
         if (level%4==1) {
           colorRange++;
           size-=2;
           if (level>10) size++;

         }
         powerup.levelStrength( level );
         animateWin(color);
         paint();
         movesLeft.innerHTML="..";

  }
}
  //


}


}
function animateWin(color) {

  winAnimate.style.marginTop = canv.offsetTop+"px";
  winAnimate.style.marginLeft = canv.offsetLeft+"px";
  winAnimate.style.width = canv.width+"px";
  winAnimate.style.height = canv.height+"px";
  winAnimate.style.background="#"+scheme[color];
  setTimeout(function(){
      winAnimate.classList.add('on');
      winAnimate.style.marginTop   = canv.offsetTop+((cancerOrigin[1]-.5)*cellWidth)+(cellWidth/2)+"px";
      winAnimate.style.marginLeft = canv.offsetLeft+((cancerOrigin[0]-.5)*cellWidth)+(cellWidth/2)+"px";
      winAnimate.style.width = cellWidth+"px";
      winAnimate.style.height = cellWidth+"px";
  },100);
  setTimeout(function(){
      winAnimate.style.width = canv.style.width;
      winAnimate.style.height = canv.style.height;
      winAnimate.classList.remove('on');
  },1000);
}
// -----------------------------------------------
// --- RECURSIVE COLOR CHANGE --------------------
// -----------------------------------------------

function expand(x,y,colorCode) { //this does the acual expanding of the project

validity[x][y] = true;

    //looking in the four main directions
    if ( isValid(x-1,y  ,colorCode) ) expand(x-1,y  ,colorCode);
    if ( isValid(x+1,y  ,colorCode) ) expand(x+1,y  ,colorCode);
    if ( isValid(x  ,y-1,colorCode) ) expand(x  ,y-1,colorCode);
    if ( isValid(x  ,y+1,colorCode) ) expand(x  ,y+1,colorCode);


}
function isValid(x,y,color) {
  let isValid=true;
//console.log("checking:",x,y);
  if (x<0 || y<0) isValid = false;  //out of bounds
  else if (x>=size || y>=size) isValid = false;  //out of bounds
  else if (content[x][y] != color) isValid = false; //invalid color...
  else if (validity[x][y]) isValid = false;  //already checked element


  return isValid;
}

function startGame()//animtaion
{
    if (gameMode =="time") {
      timeAttackBar.style.transition='0s';
      timeAttackBar.style.right='0%';
      timeAttackBar.style.background='#4CAF50';
    setTimeout(function(){
     timeAttackCount();

    },600);

     }

  if (gameMode == "zen") {
      colorRange=2;
  }

  isGameStarted = true;
  setDifficulty();
  menu.classList.add('hide');
  start.classList.add('on');
  setTimeout(function(){
    menu.classList.add('hideall');
    $('body').classList.add('started');
  },700);


  start.onclick = function(event) {
    clickEvent(event);
  }
  paint();


}

function clickEvent(e) {    //handeling
  console.log(e);
  xPos = Math.round(( e.offsetX - cellWidth/2) / cellWidth );
  yPos = Math.round(( e.offsetY - cellWidth/2) / cellWidth );
  console.log(xPos,yPos);
  if (powerup.active == "metastasis") powerup.metastasis(xPos,yPos);
  if (powerup.active == "clear")      powerup.clear(xPos,yPos);
  if (powerup.active == "expand")     powerup.expand();
  if (powerup.active == "steps")      powerup.addSteps();
  //clickTo(currColor); //automatically call it
  updatePaint(currColor);

}


nxt.location='../NXTJS/';

//EVOLUTION
function showEvolution() {
  $('body').classList.add('evolveIO');
  pageTitle.style.opacity=0;
  setTimeout(function() {
    pageTitle.innerHTML="Evole and Traits";
    start.innerHTML="close";
    evolveHolder.classList.add('on');
    pageTitle.style.opacity=1;
    setTimeout(function(){

    },600);
  },300);
}
