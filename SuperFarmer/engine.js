//--------------------
//-CONSTS------------
//--------------------

const gameFieldMax = [50,24,20,12,3,4,2];   //maximum amount of each animal
const values = [1,6,12,36,72,6,36];         //how much an animal is worth, measured in rabbits
const upgradeCost = [6,2,3,2];   //individual upgrade cost
         //amount of animal left

//--------------------
//-GAME-VARS----------
//--------------------
UserList= [];       //stores USER types 
function initGameField() {
gameFieldHas = [50,24,20,12,3,4,2];
wonUnder=[];
waitBetweenTicks=tickSpeed.value
editUserAI=""
performanceMode = false;
gamesPlayed=0;
gameTickVar=0; //currently active user
isGameWon=false;
GameStat = [[],[],[],[],[],[],[]];    //stores array-s 
statLastOpened=0;

}

say = {
    perf:'Performance Mode\nDisables UI updates during a game. It will update only when a game is won, making the UI and the simulation faster',
    sim:'Plays games automatically, with all the players, using the defined AI code.\nEach round will last [tickspeed] ms long.',
    it:function(call){alert(say[call])}
    
}
initGameField(); //for reinit and init;
//--------------------
//-BASIC-FUNCTIONS----
//--------------------

$    = (call)    =>  document.querySelector(call)      
$$   = (call)    =>  document.querySelectorAll(call)  

Math.spread = function(call /*array*/)
{
   let avg = Math.avg(call);
   let temp = []
   for (i=0;i<call.length;i++) {
       temp[i]=Math.pow(call[i]-avg,2);
   }
   return Math.sqrt(Math.sum(temp)/(temp.length));
}

Math.sum = function(call /*array*/) {
    temp=0;
    for (i=0; i<call.length;i++) {
        temp+=call[i];   
    }
    return temp;
}
Math.avg = function(call /*array*/) {
    let a=0;
    for (let i=0; i<call.length;i++) {
        a+=call[i];
    }
    return Math.round(a/call.length);
}
function pad(call)   {
    if (String(call).length!=2)  
        return "0"+String(call)
    else
        return call
}
   
function gameTick() {
    if (isSimulationRunning) {
        if (isGameWon) {
            isGameWon=false;
            //console.log('GAME IS WON');
            setTimeout( () => gameTickAS(),70);
        }
        else {
            gameTickAS();
        }
    }
}   
function gameTickAS() {
    
    
    new Promise((resolve) => {
        
        keepGameTickVarInPlace()
       // console.log(gameTickVar);
    }).then( UserList[gameTickVar].ai() )
    
    
    if (!performanceMode) {
        for (i=0;i<UserList.length;i++) {
            $$('.isactive')[i].innerHTML='Inactive' ;
        }
        $$('.isactive')[gameTickVar].innerHTML='<b>Active</b>'
    };
    
}
function keepGameTickVarInPlace() {
     gameTickVar++
    if (gameTickVar>=UserList.length) gameTickVar=0;
   
}

function createNewUser() {
    
    addUIElement();
    UserList[UserList.length] = new user(UserList.length,UserList[0].ai);
    if (UserList.length>6) {
        $('#newplayer').innerHTML="Max Player count reached!"; 
        $('#newplayer').disabled=true;
    }        
    
    
}

function resetGameSetup() {
    AIListActivateAll(false);
    $('#reset').innerHTML="Resetting... &#10687";
    setTimeout( function(){ $('#reset').innerHTML="Reset Games &#8855;"},1200);
    initGameField();
    for (let ii=0;ii<UserList.length;ii++) {
        console.log(ii);
        UserList[ii].gameWon();
        UserList[ii].resetUser();
        UserList[ii].updateUI(ii);
    }
    
}

isGameRunning=false;
