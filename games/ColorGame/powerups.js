//this whole thing is going to be a huge Object.

if (localStorage.achieveList==undefined)  achieveList = "0000000000" //storing binary array in numbers because fuck JSON
else    achieveList=localStorage.achieveList

selected = 0

pwrup =  [
          {
              name:'Amplify',
              before : 'reach Level 50',
              desc: '20% more bonuses',
              require : () => level>50 ,
              runs : () => alert(),
              icon: "angle-double-up"
          }, 
          {
              name:'Save The Day',
              desc:'20% less dooom',
              require : () => Math.floor(level/loopvar.doomOccurrance)>10 ,
              runs : () => alert(),
              icon: "life-ring"
          },
          {
              name:'Eye for an eye',
              desc:'35% bonus to upgrades but 10% more doom',
              before : 'reach Level 100 on medium or hard',
              require : () => (level>100)&&(difficulty>1) , 
              runs : () => alert(),
              icon: "refresh"
          },
          {
              name:'Helping hand',
              desc:'5% chance of automatically continuing in a perfect match',
              before : 'Have 10 continous combos',
              require : () => comboCounter>10 , //!nem ezt csinálja baszki
              runs : () => autoContinueChance=0.05 ,
              icon: "handshake-o"
          },
          {
              name:'Jackpot',
              before : 'Have 5000 points purely from combos!',
              desc:'50% more points and score from combos',
              require : () => pointsFromCombo>5000 , //!
              runs : () => alert(),
              icon: "gift"
          },
          {
              name:'Headstart I',
              before : 'reach Level 250 on medium',
              desc:'game starts from level 50',
              require : () => (level>250)&&(difficulty>1) ,
              runs : () => level=50,
              icon: "paper-plane"
          },
          {
              name:'Headstart II',
              desc:'game starts from level 111',
              before : 'reach Level 666 on hard',
              require : () => (level>666)&&(difficulty>2)  , 
              runs : () => level=111,
              icon: "rocket"
          },
          {  
              name:'Powernap',
              desc:'more time between levels',
              before : 'play for at least 10 minutes',
              require : () => playtime>600 , 
              runs : () => timeBetweenLevels = 1200,
              icon: "hourglass-start"
          },
          
          {
              name:'Insane Difficulty',
              desc:'Use with caution!',
              require : () => null , //!
              runs : () => $$('#difficulty_selector button')[3].disabled=false ,
              icon: "odnoklassniki"
          },
           {
              name:'Zen Mode',
              desc:'infinite time, infinite possibilities', //needs to be added later!!!
              require : () => null , //!
              runs : () =>  $$('#difficulty_selector button')[4].disabled=false,
              icon: "superpowers"
          },
        ]


function isAchievementGet(nth,setAch) { //setting or getting achievement
  
    setAch = typeof(setAch) == 'undefined' ? null : setAch;
    if (setAch!=null) {
        a = new Array (...achieveList)     
        a[nth]=1
        achieveList=a.join("")   
        localStorage.achieveList=achieveList
    }
    else {
        return Number(localStorage.achieveList[nth])
    }
}

function achievementListGenerator() {
    temp="";
   
    for (i=0;i<pwrup.length;i++) {
        if (achieveList[i]=="0") { disabledText="disabled"; reachedThis="before"}
        else { disabledText="";  reachedThis="desc"; }
        
        temp+='<div class="pwr" onmouseenter="viewAchievement('+i+',false)" onclick="setAchievement('+i+')" '+disabledText+'> <i class="fa fa-'+ pwrup[i].icon + '" aria-hidden="true"></i> </div>';
        if (i%5==4) { temp+="<br>" }
    }
   
    $('#achievementHolder').innerHTML=temp;
}
function viewAchievement(call,reached) {    //(reached) bis only
     if (achieveList[call]=="0") { disabledText="disabled"; reachedThis="before"; reachText=""}
        else { disabledText="";  reachedThis="desc"; reachText=" <i>|  Reached</i>"}
     if (reached) reachText="<s> | Active</s>";
     
     $('#currSelAchievement').innerHTML='<b>'+pwrup[call].name+reachText+'</b><br><span>'+pwrup[call][reachedThis]+'</span>';
} 
function setAchievement(call) { //if user clicks on it!
    viewAchievement(call,true);
    if (isAchievementGet(call)) {
        initVars(); //reset every setup so far!
        pwrup[call].runs();
        $$('div.pwr').forEach(function(elem){
        elem.classList.remove('active');
   });
        $$('div.pwr')[call].classList.add('active');
        
    }
}
function loopEndAchievementCompletionCheck() { //this checks for all achievements that may have been compleated ->when the game is over
    for (i=0;i<pwrup.length;i++) {
        if (pwrup[i].require()) {
            isAchievementGet(i,1)
            console.info("[GAMEINFO]  Achievement ",i," is activated");   
        }
        //is reached, activate it!
        
    }
}

achievementListGenerator();