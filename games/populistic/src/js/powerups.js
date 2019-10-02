/*
 * cancer HTML powerups addition
 * created by: Aron Tatai
 * contributed: Agoston Csehi
 * testing and feedback: Csikos-Nagy Mate

 * part of RTS NXT | created in 2018
 * source: http://rontap.netne.net/games/cancer.html

*/
/*eslint eqeqeq:0*/
/*eslint-disable*/
import nxt from '../nxtjs/jsplus';
nxt.export();
import CONST from '../constants';
let powerup = {};
powerup.active = undefined ;// no powerups are active
powerup.strength = 0; //0-100

powerup.name = [ "Targeted Campaign", "Fundraiser" , "Postponed Election" ,"Vice President"];
powerup.longname=["Select a single point in the field to change it to your current color.",

            "Everyone loves a fundraiser! Your influence expands in every direction.",
              "Gives 3-5 Extra steps. Tap Anywhere on the field to activate",
            "Creates a new starting point from which you can expand! Select a single citizen."];


//selecting the current powerup
powerup.select = function(where) {
  if (where < 0) {
    $('#power_selection').classList.remove('on')
  }
  else {
    //we aint allowing someone to activate our beacons
    if ($$('#pwrup i')[where].style.color == 'rgb(119, 119, 119)') return false;

     $('#power_icon').innerHTML = $$('#pwrup i')[where].innerHTML;
    $('#power_text').innerHTML='<b>'+powerup.name[where]+'</b><br><br>'+powerup.longname[where];
    $('#power_selection').classList.add('on');
    if (where == 0) {
      powerup.active='clear'
    }
    else if (where == 1) {
        powerup.active='steps'
    }
    else if (where == 2) {
      powerup.active='expand'
    }
    else if (where == 3) {
      powerup.active='metastasis'
    }
  }

}
powerup.addSteps = function() {
  if (powerup.strength>50) {
    let st = Math.randInt(3) + 3;
    reqMoves[level-1] += st;
    movesLeft.innerHTML =   reqMoves[level-1];
      powerup.updateStrength(-(50));
  }
}
//adding to user Strenght
powerup.stepStrength = function(level) {
  powerup.updateStrength(1+(level/10));
}
powerup.levelStrength = function(level) {
  powerup.updateStrength(2+level);
}
powerup.updateStrength = function(levelChange) {
  powerup.strength += levelChange;
  if (window.innerWidth > 600) {
    if (powerup.strength  > 95)  pwrup_gradient.style.width ="193px";
    else pwrup_gradient.style.width = powerup.strength*2 + "px";
  }
  else {
    if (powerup.strength  > 95)  pwrup_gradient.style.width ="99%";
    else pwrup_gradient.style.width = powerup.strength + "%";
  }


  for (i=1; i<5 ; i++) {
    if (powerup.strength >= i*25) $$("#pwrup i")[i-1].style.color='#000';
    else  $$("#pwrup i")[i-1].style.color='#777';
  }


  powerup.select(-1); // do not select anything
  if (powerup.strength > 133) powerup.strength = 133;
}

// -----------------------------------------------
// --- POWERUP MAIN CONTROL ----------------------
// -----------------------------------------------
powerup.clear = function(xPos,yPos) {
  if (powerup.strength>15) {
  content[yPos][xPos]=currColor;
  updatePaint(currColor);
  powerup.active = null;
  powerup.updateStrength(-(15));
}
}

powerup.goArray = [];
powerup.goBack = function(by) {

};
powerup.metastasis = function(xPos,yPos) { //activate attet
  if (powerup.strength>90) {
    secondCenterPoint=[xPos,yPos];
    validity[xPos][yPos]=true;
    isSecondCentrePointActive=true;
    powerup.active = null;
    powerup.updateStrength(-(90));
  }

};

powerup.expand = function() {
    if (powerup.strength>50) {
    validity =  powerup.expandArr(validity);
    updatePaint(currColor);

    powerup.updateStrength(-(50));
  }
};

//inner function
powerup.expandArr = function(a /*2D array*/) { //expands true values in every direction
           let output=[];
           for(k=0;k<a.length;k++){
               output[k]=[];
               for(l=0;l<a[0].length;l++){
                   output[k][l]=a[k][l];
               }
           }
           for(i=0;i<a.length;i++){
               for(j=0;j<a[0].length;j++){
                   if(a[i][j]==true){
                       if(j>0)                  output[i][j-1]=true;
                       if(j<a[0].length-1)      output[i][j+1]=true;
                       if(i>0)                  output[i-1][j]=true;
                       if(i<a.length-1)         output[i+1][j]=true;
                   }
               }
           }
           return output;
       }
export default powerup;