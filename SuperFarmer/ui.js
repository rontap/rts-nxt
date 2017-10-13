
//--------------------
//-USER-UPDATE-INTERFACE
//--------------------
isSimulationRunning=false;


function AIListActivateAll(call) {
    if (isNaN(call)) { 
      isSimulationRunning=!isSimulationRunning;
      call=isSimulationRunning;
    }
    if (call) {
        gameTick();
        isGameRunning=true;
        $('#simulationRunBtn').innerHTML="Stop simulaton ■";
    }
    else {
        isGameRunning=false;
        $('#simulationRunBtn').innerHTML="Start simulaton ►";

    }
    for (i=0;i<$$('.editAIBtn').length-1;i++)
    {
        if (call) $$('.editAIBtn')[i].disabled=true;
        else $$('.editAIBtn')[i].disabled=false;
    }
}
function readAI(user) {
    if (UserList[user].ai != undefined){
        AIcode.value = String(UserList[user].ai).slice(20,Infinity);
    }
    else {
        AIcode.value=""
    }
    $('#ultimateEditor').classList.add('on');
    $('#AIEditNo').innerHTML=user;
    editUserAI=user;
}
function writeAI(run) {
    UserList[editUserAI].ai = new Function(AIcode.value);
    if (run){
        UserList[editUserAI].ai()
    }
}
function closeAIWindow() {
    AIcode.value = ""
    $('#ultimateEditor').classList.remove('on');
}    

function addUIElement() {
    $('#UIElementHolder').innerHTML+= $('#UIContainerBase container').outerHTML.replace(/%userID%/g,UserList.length);
    
}
function removeBlink(id) {
    setTimeout(function(){
      $$('container')[id].classList.remove('blink');   
    },600)
   
}
function readStat(id) {
    let currStat = GameStat[id];
    let info='';
    if (currStat.length<200) info=' <br><b>Not enugh games played for accurate statistics.</b>'
    $('#statHolder').innerHTML=$$('.statWin')[id].innerHTML.replace(/class/g,"destructedClass")+info;
    currMax=Math.max(...currStat);
    temp='';
    
    for (i=0;i<currStat.length;i++) {
        temp+="<span style='width:"+100/currStat.length+"%;height:"+(currStat[i]/currMax*100)+"%'></span>";
    }
    $('#statIdName').innerHTML="Statistics for ID No "+id;
    $('#proghold').innerHTML=temp;
    $('#statSpread').innerHTML=Math.floor(Math.spread(currStat)*10);
    $('#winRateStat').innerHTML=Math.floor((currStat.length/gamesPlayed)*UserList.length*100) + " / [100]";
    statLastOpened=id;
}