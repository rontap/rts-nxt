class Player {
    //constructing a player, having cards and actions.
    constructor(playername,against) {
        this.name = playername;     //ID or name of enemy
        this.cards = shuffleCardDeck();
        this.frontCards = [,,,,,]; //array of 4
        this.frontCardsStacked = [1,1,1,1,1];   //[5]
        this.centralDeckNo = Players.length;
        this.against=against; //plays agains
        this.hangs=false; //if cannot place card% used by AI automatically
    }

    placeFrontCard(where) {  //pakli to előtted

        if (this.cards.length > 0) {
          this.frontCardsStacked[ where ] = 1;
          this.frontCards[ where ] = this.cards.pop();
        }
        else if ( ! this.frontCards.isSame() ) {
          // if you haven't got any cards left, it will place a [-]
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
          //drawing from own card deck
        }
        else if ( Players[this.against].cards.length > 0){
          centralDeck[ this.centralDeckNo ].push( Players[this.against].cards.pop() );
          //if one user doesnt have any cards, it will draw from the other player.
        }
        else {
          centralDeck[ this.centralDeckNo ].push( centralDeck[ this.centralDeckNo ].shift() );
          //if neither users have any cards. shifts one from the beginning to the first ones.
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
