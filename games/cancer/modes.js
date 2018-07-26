/*
 * cancer HTML modes addition
 * created by: Aron Tatai
 * testing and feedback: Csikos-Nagy Mate

 * MODE module, Time mode disabled for 3.0 STABLE

 * part of RTS NXT | created in 2018

*/


function selectMode(mode) {

  if (mode=="zen") {
    $('body').style.setProperty("--dark-primary", '#4CAF50');
    $('body').style.setProperty("--primary", '#4CAF50');
    gameMode="zen";
  }
  else if (mode=="normal") {
    $('body').style.setProperty("--dark-primary", '#3F51B5');
    $('body').style.setProperty("--primary", '#3F51B5');
    gameMode="normal";
  }
  else if (mode=="time") {
    setTimeout(function(){

      timeAttackBar.style.right='0%';

    },100);
    $('body').style.setProperty("--dark-primary", '#FF9800');
    $('body').style.setProperty("--primary", '#FF9800');
    gameMode="time";



  }
}
objects = [];


timeAttackSafeSpace = true;
timeFrozen = false;
function timeAttackCount() {
  if (gameMode != "time") return false;

  timeAttackBar.style.transition=timeAttackSpace*3+'s linear';
  timeAttackBar.style.right='100%';
  setTimeout(function(){
    if (timeFrozen) {
        timeAttackBar.classList.add('frozen');
    }
    else {
        timeAttackBar.classList.add('frozen');
    }
    if (timeAttackSafeSpace) {
      timeAttackSafeSpace=false;
      timeAttackBar.classList.add('warn');
    }
    else {
      reqMoves[level-1]--;

    }
    timeAttackBar.style.transition='0s';
      timeAttackBar.style.right='0%';
    setTimeout(function(){

        movesLeft.innerHTML=   reqMoves[level-1];
        timeAttackCount();
      },100);
  },timeAttackSpace*3000);

}

// not implemented at this point
// for V 4.0

function placeObject(x,y,type,random) {
  if (random) ctx.fillStyle = "rgba(10,10,10,.9)" ;
  else        ctx.fillStyle = "rgba(210,210,210,.9)" ;
  third = cellWidth/3;
  ctx.fillRect(x*cellWidth + third,y*cellWidth +third,third,third);
}
function pickObject(type) {
  switch (type) {
    case 'boost-large' : powerup.strength+=Math.randInt(30);
    case 'boost-small' : powerup.strength+=Math.randInt(30); break;

    case 'starship' : //expand in every direction
    case 'boost-bad' : powerup.strength-=Math.randInt(40);
    case 'remix' : //remixes everything
  }
}
