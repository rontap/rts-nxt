// primitive AI for SPEED NXT 1.0
const speed = 1300;
const aiDeck = 1;
const aim = 1;
const fall = 200;
playerHangs = [false,false];
var globalAIList = new Sets([]);
//function

const AITemplate = {
  0 : {
    speed : 2000,
    aim : 1,
    fall : 400
  },
  1 : {
    speed : 1500,
    aim : 1,
    fall : 300
  },
  2 : {
    speed : 1300,
    aim : 1,
    fall : 250
  },
  3 : {
    speed : 1000,
    aim : 1,
    fall : 200
  }
}
AITemplate.undefined = AITemplate[0];
function AIStateChange(to) {
  //truning on or off all AIS.
  globalAIList.get.forEach( function(el) {
    el.start();
  }

  )
}
class AI {
  constructor( aiDeck , autoStart, templateNo) {
    templateNo ? undefined : 0;
    autoStart ? undefined : false;
    this.speed = AITemplate[ templateNo ].speed;
    this.aiDeck = aiDeck;
    this.aim = AITemplate[ templateNo ].aim;
    this.fall = AITemplate[ templateNo ].fall;

    $$("holder[user]")[aiDeck].classList.add('ai-cards');
    globalAIList.add(this);
    if ( autoStart ) this.think();
  }
  think() {
    var i = 0;
    for (i = 0; i< deckLength; i++) {
      if ( clickCard( this.aiDeck , i ) ) {
        controlActive[this.aiDeck]--; //if placing, turn SHIFT off.
        $$('holder[user]')[this.aiDeck].classList.remove('move');
        
        i=Inf;
        playerHangs[this.aiDeck]=false;
      }
    }
    if (i != Inf)  {//didnt succesfully placed any cards, trying to check for duplicates.
        i = this.checkForDuplicates(); //replacing true
        playerHangs[this.aiDeck]=false;
        console.log(i);
    }
    if (i == false) {
        //couldnt place and couldnt join cards!
        $$("holder[user] toggle")[this.aiDeck].classList.add('on')
        playerHangs[this.aiDeck]=true;
    }
    let randomSpeed = this.speed + (Math.random()*2-1)*this.fall*this.aim;
    setTimeout( () => this.think() ,  randomSpeed  );
  }
  checkForDuplicates()
  {
      
      for (let j=0; j<deckLength ; j++) {
        let currCheckCard = Players[this.aiDeck].frontCards[j];
        let lastCardIndex = Players[this.aiDeck].frontCards.lastIndexOf( currCheckCard );
        //console.log(j+"--"+currCheckCard+"--"+lastCardIndex);
        if ( (lastCardIndex != j/*currCardIndex*/) && (currCheckCard!="-" )) {
            console.log("RAINBOX SPONGE"+j+"__"+lastCardIndex);
            console.warn(currCheckCard+"c-t"+Players[this.aiDeck].frontCards[lastCardIndex]);
            $$('holder[user]')[0].classList.add('move');
            setTimeout( () =>  $$('holder[user]')[this.aiDeck].classList.remove('move') , 300 );
            Players[this.aiDeck].stackCards( j, lastCardIndex );
            updateGameUI();
            return true; //Did replace a card, moving on
        }
      
      }
      return false; //didnt find anything
  }

  runOutOfCards() {

  }
  start() {
    this.think();
  }
}
