function loop() { //main game loop
    loopI++;
    if (!space) { //if level is running currently
        setTimeout(function() {
            change = [dst[0]/randomisedSpeed, dst[1]/randomisedSpeed, dst[2]/randomisedSpeed];
            altRight = [Math.round(right[0] + (change[0] * loopI)), Math.round(right[1] + (change[1] * loopI)), Math.round(right[2] + (change[2] * loopI))];
            
      
            
            $("#right").style.background =  "rgb(" + altRight[0] + ", " + altRight[1] + ", " + altRight[2] + ")";
            
            if (Math.random()<autoContinueChance) {
                               
            }
            if (isMaxHue()) { //for power up -> color switch
                if (isGiftActive(0)) {
                    console.dbg(lastRecord,$("#right").style.background);
                    $("#right").style.background="rgb(" + right[0] + ", " + right[1] + ", " + right[2] + ")";
                    loopI=0;
                    isGiftActive(0,false);
                }
            }
            
            loop();
        }, 50 * slowDownVar);
    } 
    else { 
        //level checkout
        diff = D(left[0] , altRight[0]) + D(left[1] , altRight[1]) + D(left[2] , altRight[2]);
        lastRecord="";
        
        //score calculation TO BE CONVERTED TO 
        
        calculateGameloopScore();
        
        //doom countdown
        for (i in doomActiveList) {
            isDoomActive(i);
        }
        
        if ((loopvar.score > 0) || ((loopvar.score <= 0) && (isGiftActive(0)))) { //game keeps on goints
        
            $("#score").innerHTML=" <b>Tokens: " + Math.floor(loopvar.score)+'</b> ';
            $("#points").innerHTML=" Points: " + Math.floor(points);
            $("#level").innerHTML=" Level: " + level++;
             
            randomSpeed = ((Math.random() * 6) + 7) / 10;
            speed = loopvar.mainSpeed/(Math.pow(level , 1/loopvar.speedGrowth));
            randomisedSpeed = speed*randomSpeed;
            //speed set according to level and difficult
            
            space=false;
            loopI=0;    
            if (loopvar.score<=0) {
                isGiftActive(0,false);
                loopvar.score=0;
                console.dbg('[INFO] gift 0 used, user stayed alive');
            }
            //bonuses
            if ((level%loopvar.giftOccurrance==0) && (level>10)) {
                if ((level==14) && localStorage.hasGameBeenPlayed!="true") {
                    localStorage.hasGameBeenPlayed="true";
                    alert("You have reaced level 13!\nYou can earn powerups every 7 levels, these include:\nTime: Restart color hue if reaced the end\nShield: Saves you once from dying\nHourglass: slows down the game by 30% for a limited time!");
                }
                gift = Math.floor(Math.random()*3) ;
                isGiftActive(gift,true);
            }
            
            if ((level%loopvar.doomOccurrance==0) && (level>10)) {
                doom = Math.floor(Math.random()*2)+1 ;
                isDoomActive(doom,loopvar.doomLength);
            }
            
            for (i=0;i<doomActiveList.length;i++) {
                isDoomActive(i);
            }
            
            //makes the main header clickable - you can give up by clicking it
            $("#main_header").classList.add("header_click");
        
            //returns to main page if name clicked while playing
            $("#main_header").onclick = function() {
                reloadPrompt = confirm("ARE YOU SURE YOURE OK WITH BEING A LOSER?");
                if (reloadPrompt == true)   window.location.reload();
            }
            
            //restarts the loop
            setTimeout(function(){run();},timeBetweenLevels);
            
        // GAME OVER
        } else {
            highScore();
            showStatistic();

        }
    }
}

setInterval( () => playtime++ , 1000 ) ;

//track of playtime in game

function calculateGameloopScore() {
    
         $('#succes_notification').classList.remove('toast');
        if (diff<=20)  comboCounter++; 
        else           comboCounter = 0;
        
        if (diff<8) loopvar.score+=(100-diff*10)*(1+comboCounter/10);
        else if (diff<20) loopvar.score+=20*(1+comboCounter/10);
        else if (diff>40) loopvar.score-=diff;
        
        scoreInLevels[scoreInLevels.length]=loopvar.score;
        
        //points calculation
        oldPoints=points;
        
        if (diff<4) points+=(100+level*3)*(1+comboCounter/10);
        else if (diff<100) points+=((100-diff)+level*2)*(1+comboCounter/10); 
        else points+=level;
        
        if (diff<20) pointsFromCombo+=(points-oldPoints); //get some points from combo
        
        //color set
        if (diff<8) selectedSucc="Combo";
        else if (diff<40) selectedSucc="Good";
        else if (diff<100) selectedSucc="Meh";
        else if (diff<200) selectedSucc="Bad";
        else selectedSucc="Awful";
        
        $('#succes_notificationText').innerHTML=selectedSucc;
        $('#succes_notificationColor').className="";
        $('#succes_notificationColor').classList.add('succ_'+selectedSucc);
        
        setTimeout(function(){
            $('#succes_notification').classList.add('toast');
        },20);
        colorInLevels[colorInLevels.length]=selectedSucc;
}