
const numberCards = "23456789XJQKA";
const winCard = "🃟"; //joker
const UTFCards = {
  2 : '🂢', 3:'🂣', 4 : '🂤', 5 : '🂥', 6 : '🂦', 7 : '🂧', 8 : '🂨', 9 : '🂩', 'X' : '🂪', 'J' : '🂫', 'Q' : '🂭', 'K' : '🂮', 'A' : '🂡'
  ,'-' : winCard
} //"";


const standardCards = numberCards;
const deckLength = 5;


var   centralDeck   = [[],[]] ;


function shuffleCardDeck() {
    allCards = standardCards + standardCards + standardCards + standardCards;
    return allCards.split("").shuffle();
}


Players = [];
Players.push( new Player("UserOne" , 1) );
Players.push( new Player("UserTwo" , 0) );


Array.prototype.last = function() {
    return this[this.length-1];
}


function clickCard(user, nthCard, aiTest) {
    aiTest = aiTest ? undefined : false;  //used if you want to test with an AI
    if (Players[user].frontCards[nthCard]=='-') return false;
    //do not place 

    //decides whether you can place a certain card from your card dock to the to a specific part of the playzone
    if ( [1,12].indexOf(Math.abs( standardCards.indexOf(centralDeck[0].last()) - standardCards.indexOf(Players[user].frontCards[nthCard]) ) ) >= 0 )   {
        placeCard(user, nthCard, 0);

    }
    else if ( [1,12].indexOf(Math.abs( standardCards.indexOf(centralDeck[1].last()) - standardCards.indexOf(Players[user].frontCards[nthCard]) ) ) >= 0 )  {
        placeCard(user, nthCard, 1);

    }
    else return false;

    checkIfWin(user);
    $$('holder[user] card')[((user)*deckLength)+nthCard].classList.add('placed');
    setTimeout(function(){
      $$('holder[user] card')[((user)*deckLength)+nthCard].classList.remove('placed');
    },200)
    return true;
}


function placeCard(user, nthCard, nthDeck) {
    Players[user].placeToCentralDeck(nthCard,nthDeck);
    $$('holder[user] toggle')[user].classList.remove('on');
    updateGameUI();


}

function speedCall(userWin, userLose) {
    if ( centralDeck[0].last() == centralDeck[1].last() ) {


        console.log('speed! User ' , userLose, ' gets cards')

        Players[userLose].speedLose();

        Players[userLose].turnOver();
        Players[userWin ].turnOver();

        updateGameUI();
    }
}

function updateGameUI() {
    for ( let i = 0 ; i<$$('holder[user]>card').length; i++) {
        //console.log(Math.floor(i/deckLength),i%deckLength);
        $$('holder[user]>card')[i].innerHTML = Players[Math.floor(i/deckLength)].frontCards[i%deckLength] ;
    }
    for ( let i = 0 ; i<$$('holder[central]>card').length; i++) {
        console.log(centralDeck[i])
        $$('holder[central]>card')[i].innerHTML = centralDeck[i].last();

        //$$('holder[user]>div')[i].innerHTML = Players[i].cards.length + " cards"; replaced by var
    }
    replaceUTFCards();
}

function initGame() {
    for (i=0; i<Players.length;i++) {
        Players[i].initPlayer();
    }
    updateGameUI();
}
function splash(first,second) {
    Players[first ].turnOver();
    Players[second].turnOver();
    updateGameUI();
}

function checkIfWin(user) {
  if (( Players[user].frontCards.isSame()) && (Players[user].cards == 0 ))
    alert(user + ' WINS THE GAME');
}


/// USER CONTROL
lastKeyPress = [ new Date().getTime() ,  new Date().getTime() ];
controlActive = [ Inf , Inf ];
firstSelCard = [ null , null] ;
ctrlState = [ false , false ];


function touchControl(keyCode) {
  keyBoardControl({'code':keyCode, 'key':keyCode});
}

function keyBoardControl(e) {
  console.log(e.key);

  if ((e.code == "ControlLeft") ||(e.key =="t") || (e.code == "AI-SHIFT-0")) {
    controlActive[0] = 3; console.log("Control Left ACTIVE");
    $$('holder[user]')[0].classList.add('move');
    $$('holder[user] toggle')[0].classList.add('on');
    playerHangs[0]=true;

  }
  if (e.code == "ControlRight" ||(e.key =="u") || (e.code == "AI-SHIFT-1")) {
    controlActive[1] = 3; console.log("Control Right ACTIVE");
    $$('holder[user]')[1].classList.add('move');
    $$('holder[user] toggle')[1].classList.add('on');
    playerHangs[1]=true
  }

  if (e.code == "Tab") {
    if (((controlActive[0] == 2) && (controlActive[1] == 2)) || (playerHangs.isSame())) {
      splash(0,1);
      controlActive = [ 0 , 0 ];
      $$('holder[user]')[0].classList.remove('move');
      $$('holder[user]')[1].classList.remove('move');
      $$('holder[central]')[0].classList.add('placed-center');
      setTimeout(function(){
        $$('holder[central]')[0].classList.remove('placed-center');
        $$('holder[user] toggle')[0].classList.remove('on');
        $$('holder[user] toggle')[1].classList.remove('on');
      },600)
      e.preventDefault();
      playerHangs=[false,false];
    }
    return false;
  }
  if (  controlActive[0] == 3 ) { firstSelCard[0] = e.key; controlActive[0]--; return false; }
  if (  controlActive[1] == 3 ) { firstSelCard[1] = e.key; controlActive[1]--; return false; }

  switch (e.key) {
    case "a": u=0; k=0; break;
    case "s": u=0; k=1; controlActive[0]--; break;
    case "d": u=0; k=2; controlActive[0]--; break;
    case "f": u=0; k=3; controlActive[0]--; break;
    case "v": u=0; k=4; controlActive[0]--; break;

    case "n": u=1; k=0; controlActive[1]--; break;
    case "j": u=1; k=1; controlActive[1]--; break;
    case "k": u=1; k=2; controlActive[1]--; break;
    case "l": u=1; k=3; controlActive[1]--; break;
    case "é": case ';': u=1; k=4; controlActive[1]--; break;

    case "r": speedCall(0,1); return "speed" ;
    case "i": speedCall(1,0); return "speed" ;


    default: return false;
  }
  lastKeyPress[u] = new Date().getTime();
  ctrlState = [ false , false ];

  if ( controlActive[0] == 1 ) { Players[0].stackCards( firstSelCard, k ); console.log("S0");   return "stack";}
  if ( controlActive[1] == 1 ) { Players[1].stackCards( firstSelCard, k ); console.log("S1");  return "stack"; }

  if ( controlActive[0] <= 1) {  $$('holder[user]')[0].classList.remove('move');  }
  if ( controlActive[1] <= 1) {  $$('holder[user]')[1].classList.remove('move');  }

  clickCard(u,k);

  updateGameUI();
}


isUTFCards = true;
function replaceUTFCards() {
  if (isUTFCards) {
    for (i=0;i<$$("card").length;i++) {
      if ( $$("card")[i].innerHTML.length == 1 )
        $$("card")[i].innerHTML = UTFCards[ $$("card")[i].innerHTML ]
    }
  }
}

setTimeout( () => initGame() , 200) ;

document.body.onkeydown = function(event) { keyBoardControl(event); }

/*version history
//0.1.0  starting speed, creating table <13.05.13>
//0.1.1  random numbers, design added
//0.1.2  placing card (not valid) [UNITY]

//0.2.0  placing card (valid!) <13.05.18>
//0.2.1  placing cards AB + two slots
//0.2.2  card remaining (42 alap), go less
//0.2.2B placing cards bugfix (2->>A) <13.05.19>
//0.2.3  redesign (bit)
//0.2.4  felcsapás
//0.2.6  removing double cards (hardwork)
//0.2.7  starting implementing game end [UNIT]

//0.3.0  adding '^' endcards
//0.3.1  stresstest
//0.3.2  user B added (not implemented since 2.4)
//0.3.3  starting implementing SPEED
//0.3.4  added for both (A+B)
//0.3.5  bugfixes

//0.9.0C CONCEPT WORKS RESTARTED IN 2017 w/agocsago [RTS4/SOTON]
//0.9.0  completely rewriteen from grounds-up, using NXT-JS
//0.9.1  user class added
//0.9.2  functional base click
//0.9.3  keyboard control added [w/o agocsago]
//0.9.4  bugfixes, speed and UI visual improvements <2017/11/28>{RC1}

//0.9.5  UTF-8 cards added [NXT/ARCHER]<2018/01/30>
//0.9.6  js support is only partial. Design changed {RC2}
//0.9.7  Click-Controls substituted back using keyBoardControl methods.

//0.9.8  End-Game Improvements (winnable, drawing from deck)
//0.9.9  Primitive AI Enemy Implemented

//1.0.0  RELEASE 1.0 [ACHILLES]
//    *  - complete AI, not including speed
//    *  - added toggles, info, AI can't use TAB yet.
//    *  - added About section
//    *  - AI has color and its own setup.

*/
