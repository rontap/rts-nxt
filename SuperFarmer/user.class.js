class user {
    constructor(id,aicode) {  //when its created!
        this.has = [0,0,0,0,0,0,0];
        this.diceResult = []
        this.round = 0;
        this.topscore = 0;
        this.id=id;
        this.ai=aicode;
        
    } 
    
    breed () {  //animal breeding in DICE
       this.has[this.diceResult[0]]++
       this.has[this.diceResult[1]]++
       for (let i=0; i<4; i++){
           if ((Math.floor(this.has[i]/2)>=1)&&((this.diceResult[0]==i)||(this.diceResult[1]==i))) {
               if ((Math.floor(this.has[i]/2))>gameFieldHas[i])
               {
                   this.has[i]+=gameFieldHas[i];
                  
               }
               else  {
                   this.has[i] +=     Math.floor(this.has[i]/2);
                  
               }

           }
       }
       this.has[this.diceResult[0]]--
       this.has[this.diceResult[1]]--
    
    }
    
    wild () {  //fox or wolf in DICE
        if (this.diceResult[0] == 7) {
            if (this.has[5] != 0)  this.has[5]=this.has[5]-1
            else  {
                
                this.has[0]=0;
                }
            }
            
        if (this.diceResult[1] == 9)  {
            if (this.has[6] != 0)  this.has[6]=this.has[6]-1
            else {
                this.has[1]=0;  
                this.has[2]=0; 
                this.has[3]=0;  
               
            }
        }
        else return false
    }
    
    dice () {   //main function
        let a = Math.floor(Math.random()*11)
        let b = Math.floor(Math.random()*11)
        //setting dice values
        if (a<5)            a=0
        else if (a<7)       a=1
        else if (a<9)       a=2
        else if (a<10)      a=4
        else if (a<11)      a=7
        
        if (b<5)            b=0
        else if (b<8)       b=1
        else if (b<9)       b=2
        else if (b<10)      b=3
        else if (b<11)      b=9
        
        this.diceResult = [a,b];
        this.wild();
        this.breed();
        this.round++;
        if (!performanceMode) this.updateUI(this.id); //do not update UI if in performance mode
        this.isGameWon();
        return [a,b];
    }
    
    //EXCHANGE OF ANIMALS AND DOGS
    trade (which,way) { //trade before DICE, which=[0-5] way=Boolean (upgrade or downgrade)
        
        if (way) {//upgrade 
            if (this.has[which]>=upgradeCost[which]) {
                this.has[which]-=upgradeCost[which];
                this.has[which+1]++;
            }
        }
        else {//downgrade
            if (this.has[which]>0) {
                this.has[which-1]+=upgradeCost[which-1];
                this.has[which]--;
            }
        }
    }
    
    defenders (which,way) { //which:    way:true=new kutya
    
        if (which) {
            if (way) {
                if (this.has[1]>0) { this.has[1]--; this.has[5]++; }
            }
            else { 
                if (this.has[5]>0) { this.has[5]--; this.has[1]++; }
            }
        }
        else {
           if (way) {
                if (this.has[3]>0) { this.has[3]--; this.has[6]++; }
            }
            else { 
                if (this.has[6]>0) { this.has[6]--; this.has[3]++; }
            } 
        }
    }
    
    
    updateUI(id) {
        
        
        
        let c=0;
        if ((!performanceMode)) {
            $$('.rollresult')[id].innerHTML=this.diceResult;
            $$('.rounds')[id].innerHTML=this.round;
            $('#hasGolbalList').innerHTML=gameFieldHas;
            
            
           for (let i=0;i<7;i++) { //fil
         
            $$('table.table'+id+' span')[i].innerHTML=pad(this.has[i]);
            c+=this.has[i]*values[i];   //combined points
            if (this.has[i]>0) $$('table.table'+id+' td.c')[i].classList.add('on');
            else $$('table.table'+id+' .c')[i].classList.remove('on');
            } 
        }
        
        if (c>this.topscore) this.topscore=c;
        $$('.fs')[id].innerHTML=c+" × top: "+this.topscore;  
        
    }
    
    doRound(whatToDo,which,way) {       //MASTER FUNCTION
        if (whatToDo==1)  this.trade(which,way)
        else if (whatToDo==2)  this.defenders(which,way)
        return this.dice();
              
    }
    
    isGameWon() {
        
        let isGameWonVar=1;
        for (let i=0;i<5;i++) { //check whether game is won
             isGameWonVar=isGameWonVar*this.has[i];
        }
        if (isGameWonVar>0) this.gameWon()
            
        
    }
    gameWon() {
        this.updateUI(this.id);
        //UserList[this.id] = new user(this.id); //resetting
        GameStat[this.id][GameStat[this.id].length]=this.round;
       
        //update UI accordingly
        $$('.gamesplayed')[this.id].innerHTML=GameStat[this.id].length;
        $$('.bestforthis')[this.id].innerHTML=Math.min(...GameStat[this.id]);
        $$('.worstforthis')[this.id].innerHTML=Math.max(...GameStat[this.id]);
        $$('.last')[this.id].innerHTML=GameStat[this.id][gamesPlayed++];
        $$('.avg')[this.id].innerHTML=Math.avg(GameStat[this.id]);
        $('#gamesPlayed').innerHTML=gamesPlayed;
        //$('#hasGlobalList').innerHTML=gameFieldHas;
        this.resetUser();
        return true; //game is won wow
        
    }
    resetUser() { //for now, resetting ALL USERS
        for (i=0; i<UserList.length;i++) {
            UserList[i].has = [0,0,0,0,0,0,0];
            UserList[i].diceResult = []
            UserList[i].round = 0;
            UserList[i].topscore = 0;
            gameTickVar=0;
        }    
        $$('container')[this.id].classList.add('blink');
        gameTickVar=0;
        isGameWon=true;
        removeBlink(this.id);
        //console.log(this.id);
        
    }
}




