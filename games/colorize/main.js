//-------------------------------
//-API-ADDITIONS-----------------
//-------------------------------

$    = (call)    =>  document.querySelector(call)      
$$   = (call)    =>  document.querySelectorAll(call)   
rand = ()        =>  Math.round(Math.random() * 255)    
D    = (one,two) =>  Math.abs( one - two )   //returns difference

Array.prototype.sum = function() {//want 
    var c=0;
    for (x = 0; x < this.length; x++) c = c + this[x];
    return c;
}

console.dbg = function (call) {
    if (isDebug)
        console.log(call)
} 

//evil code FUCKING EMCASCRIPT WRITERS
NodeList.prototype.indexOf = function(element) {
    ArrayObj = new Array( ...this);
    return ArrayObj.indexOf(element);
}

//-------------------------------
//-MAIN-CONTROLS-----------------
//-------------------------------

//-DOCUMENT-VARS-----------------
function initVars() {

var left, right ;           //arrays holding the original values
var dst, altRight;          //left-right distance.  altRight is current color
var difficulty;
speed=120;                  //the current speed, dependent on level
space = false;              //is space pressed or clicked
loopI=0;                    //gameloop i variable
level=1;
points=0;                   //only increasing, used for  highscore

slowDownVar = 1;
giftActiveList=[false,false,false,false]; //do not write to this array, use isGiftActive instead
doomActiveList=[0,0];      //do not write to this array, use isDoomActive instead
gameStart = false;
scoreInLevels = [];         //saves how many score you had
colorInLevels = [];         //TBATBA PLS ARON
lastRecord="";
//powerup affected VARs
timeBetweenLevels = 500 ;   //between levels gap
playtime = 0;               //game played for seconds
comboCounter = 0;           //defines combocounter
autoContinueChance = 0;     //chance that the came will automatically continue on
pointsFromCombo= 0 ;        //how many points ONLY from combos
//game difficulty changer 0 = RARE 1 = MEDIUM 2 = DONE 3 = WELL-DONE MIT KÁTCHUP 
loopvar = {
    score : [2500,2000,1500,1250],                 //tokens; life
    mainSpeed :[150,120,100,80],                   //the game main 
    speedGrowth :[2,1.8,1.7,1.5],
    giftOccurrance :[7,10,13,16],
    doomOccurrance : [18,15,12,9],
    doomLength : [4,5,6,7],
    slowDownChange : [1.8,1.6,1.4,1.2]
};
isDebug=false; //if false, turns off console logs.
}//init vars, resets whole document. [used for powerups reset]
initVars(); //MUST RUN HERE

function setDifficulty(setDiff) {       //this HAS to run to init the game!  
   Object.keys(loopvar).forEach(function(key) {
   loopvar[key]=loopvar[key][setDiff];
   difficulty=setDiff;
  })
  setDifficulty=function(){};
}

//Lifesaver,redo color, slow down, nothing
function leftColor() {
    left = [rand() , rand(), rand() ];
      $("#left").style.background =  "rgb(" + left[0] + ", " + left[1] + ", " + left[2] + ")";
}
function rightColor() {
    right = [rand() , rand(), rand() ]
      $("#right").style.background =  "rgb(" + right[0] + ", " + right[1] + ", " + right[2] + ")";
}

// returns the value if call is not set
function isGiftActive(nth,call) {
    
    call = typeof(call) == 'undefined' ? null : call;
    if (call==null) return giftActiveList[nth];
    else {
        giftActiveList[nth]=call;
        if (call) $('fab:nth-child('+(nth+1)+')').classList.remove('hidden');
        else  $('fab:nth-child('+(nth+1)+')').classList.add('hidden');
    }

    if (giftActiveList[2] == true) {  //slowdowngame
        slowDownVar = loopvar.slowDownChange;
        setTimeout(function() {
            slowDownVar = 1;
            isGiftActive(2,false);
        }, 10000)
    }
}

function isDoomActive(nth,call) {
    
    if ( doomActiveList[nth]>0 )  $('body').classList.add('doom'+(nth))
    else  $('body').classList.remove('doom'+(nth))
    call = typeof(call) == 'undefined' ? null : call;
    if (call==null) 
        if (doomActiveList[nth]>0) return doomActiveList[nth]-- ;
        else return  doomActiveList[nth]=0 ;
    else doomActiveList[nth]=call;
 
}

function run() {  //main process. run->loop->run
    $('body').classList.add('ingame');
    if (level > 1) {
        leftColor();
        $('holder').style.display="block";   
    }
    else changeActiveTabCall(0);
    rightColor();
    dst=[left[0] - right[0], left[1] - right[1], left[2] - right[2]];
    loop(); //main game loop
}

function userAction(call) {
        if (!gameStart) {
            gameStart = true;
            floor.classList.add("hide");
            difficulty_selector.classList.add("hide");
            additional_info.classList.add("hide");
            setDifficulty(call);
            randomisedSpeed=loopvar.mainSpeed;
            run();
            
        } else  space = true;
        
}

function isMaxHue() {   // if all of the hues have reached max
    reachedEnd=0;
    for (i in altRight) {
        if ((altRight[i]<0)||(altRight[i]>255))  reachedEnd++;
    }
    if (reachedEnd==3) return true
    else return false
}

function highScore() {
    if (localStorage.topscore < points || localStorage.topscore == undefined) {
        localStorage.topscore = points;
    }
    topscore.innerHTML = localStorage.topscore;
}
function resetGame(){
    if (confirm("Are you sure?") == true) {
        localStorage.clear()
        location.reload()
    }
}

//changes the method of interaction based on device (desktop/laptop, mobile/tablet)
function isMobileBrowser() { 
 if (
    navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

initGameField();
highScore();
deviceWidth();

