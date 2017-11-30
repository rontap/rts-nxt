class Player {

    constructor(asd,against) {
        this.name = asd;
        this.cards = shuffleCardDeck();
        this.frontCards = [,,,,,]; //array of 4
        this.frontCardsStacked = [1,1,1,1,1];
        this.centralDeckNo = Players.length;
        this.against=against;
    }

    placeFrontCard(where) {  //pakli to előtted
        //TBA error when you rdont have enugh cards
        if (this.cards.length > 0) {
          this.frontCardsStacked[ where ] = 1;
          this.frontCards[ where ] = this.cards.pop();
        }
        else if ( ! this.frontCards.isSame() ) {
          this.frontCards[ where ] = "-";
          this.frontCardsStacked[ where ] = 0;
        }
        else {
          console.log("playerwon");
        }

    }
    placeToCentralDeck(which,where) {
        centralDeck[ where ].push( this.frontCards[which] );
        this.placeFrontCard(which);
    }
    speedLose() {
        this.cards = (this.cards.concat(centralDeck[0].concat(centralDeck[1]))).shuffle();
        centralDeck = [[],[]];
    }
    turnOver() {
        // moving one item from cards to No element of centralDeck
        if ( this.cards.length > 0) {
          centralDeck[ this.centralDeckNo ].push( this.cards.pop() );
        }
        else {
          centralDeck[ this.centralDeckNo ].push( Players[this.against]);
        }
    }
    stackCards(first,second) {
        this.frontCardsStacked[first] += this.frontCardsStacked[second];
        this.placeFrontCard(second);

        if (this.frontCardsStacked[first]==3) this.placeFrontCard(first);
    }
    initPlayer() {
        //initialising the player
        for (let i=0 ; i<deckLength ; i++)
        {
             this.placeFrontCard(i);
        }
        this.turnOver();
    }
}

//MENJ ALUDNI
