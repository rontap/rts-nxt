/*random text*/

textDataSheet = {   //STRICT ORDER BEACUSE OF checkbox order
  text:"qwertyuiopasdfghjklzxcvbnm",
  numbers:"0123456789",
  uppercase:"QWERTYUIOPASDFGHJKLZXCVBNM",
  spec:"#;!£$%^&*()_+-=[]{}@~~,./<>?|¬¦€ ",
  ext:"АБВГҐДЂЃЕЀЁЄЖЗЗ́ЅИЍІЇЙЈКЛЉМНЊОПРСС́ТЋЌУЎФХЦЧЏШЩЪЫЬЭЮЯöüóőúűáéíŁłŒŔĀĐŠŴŮŬŨŜŘŌ"
};
textDataSheetValues=[0.75,0.85,0.80,1,1.125];
usedValues=0;

setTimeout(function(){
  Object.prototype.attr = function(call) { console.log(this.getAttribute("checked")); return this.getAttribute(call) }
  console.log($$("#passwordHolder checkbox")[0].attr("checked"))
},10000)


function generateAllPwd(length,times) {
  let possibleVariaions =1;
  inputs=$$("#passwordHolder checkbox");
  allow=["true",inputs[0].getAttribute("checked"),inputs[1].getAttribute("checked"),inputs[2].getAttribute("checked"),inputs[3].getAttribute("checked")]
  console.log(allow);
  currTextDataSheet = "";
    for (j=0;j<allow.length;j++) {
        if (allow[j]=="true") {
          currTextDataSheet+=textDataSheet[Object.keys(textDataSheet)[j]];
          possibleVariaions+=textDataSheet[Object.keys(textDataSheet)[j]].length;
          usedValues+=textDataSheetValues[j];
        }
    }
  console.log(possibleVariaions);
  possibleVariaions = Math.pow(Math.pow(possibleVariaions,length),1/10);
  console.log(possibleVariaions);


  if (possibleVariaions<18) possibleVariaions="Very Poor!";
  else if (possibleVariaions<30) possibleVariaions="Not good enugh!";
  else if (possibleVariaions<40) possibleVariaions="Alright. Try adding more letters!";
  else if (possibleVariaions<60) possibleVariaions="Good password!";
  else if (possibleVariaions<140) possibleVariaions="Strong password!";
  else if (possibleVariaions<280) possibleVariaions="Very strong password. No improvement needed";
  else possibleVariaions="This password is unnecesarly long or complicated.";

  if (length<Math.round(12-usedValues)) possibleVariaions+="<br>It is good practice to use passwords longer than this password";
  $("#passwordOutput").innerHTML=" Password Security Level: "+possibleVariaions+"<hr><br>";
  for (let i=0 ; i<times ; i++) { generatePwd(length);  }
}

function generatePwd(length) {
  let output="";
  for (k=0;k<length;k++) {    //adding LENGTH times random characters
      randomIndex = Math.floor(Math.random()*currTextDataSheet.length);
      output+=currTextDataSheet[randomIndex];
  }
  $("#passwordOutput").innerHTML+=output+"<br>";
}


/*number */

currentColor='';
function randomColor() {
  let a= new Color();
  currentColor = a;

  $$('#colorMixer input:not([type="range"])')[0].value=a.r
  $$('#colorMixer input:not([type="range"])')[1].value=a.g
  $$('#colorMixer input:not([type="range"])')[2].value=a.b
  updateColor(false,0);
  updateColor(false,1);
  updateColor(false,2);
}


function updateColor(call,nth) {//random color tool updater main function
  if (call) range=$$('#colorMixer input[type="range"]')
  else      range=$$('#colorMixer input:not([type="range"])')

  let a= new Color(range[0].value, range[1].value, range[2].value)
  currentColor = a;
  $('#colorResult').style.background=a.rgb;

  if (!call) $$('#colorMixer input[type="range"]')[nth].value=range[nth].value
  else      $$('#colorMixer input:not([type="range"])')[nth].value=range[nth].value


  if (a.shade)  $('#colorResult').style.color="#FFF";
  else $('#colorResult').style.color="#000";

  $('#colorResult').innerHTML=a.hex;
}

function saveColor() {
  let color="black";
  if (currentColor.shade) color="white";
  $('#colorResults').innerHTML+='<div class=colorResults style=color:'+color+';background:'+currentColor.hex+'>'+currentColor.hex+'</div>';

}



/*timer*/

var isTimerOn;
var isStopOn;

function switchTimer() {
  if(isTimerOn) {
    isTimerOn=false;
    $("#timerHolder .h1-connect-fab").innerHTML="hourglass_empty";
  }
  else {
    $("#timerHolder .h1-connect-fab").innerHTML="hourglass_full";
  isTimerOn=true;
  let temp=$$('#timerHolder input');
  fullSecTimer=(Number(temp[0].value)*3600+Number(temp[1].value)*60+Number(temp[2].value))*1000;
  startTimeTimer = new Date().getTime();
  endTimeTimer = startTimeTimer + fullSecTimer; //this is when it has to stop.
  lookAtTheTime();
  }
}

function lookAtTheTime() {
  currentDate = new Date().getTime();
  remainingTimeTimer = endTimeTimer - currentDate;

  if ((remainingTimeTimer/fullSecTimer)<0) remainingTimeTimer=0;

  $('#timerHolder status div').style.width=(remainingTimeTimer/fullSecTimer)*100+'%';
  $$('#timerHolder input')[0].value=Math.floor(remainingTimeTimer/(3600*1000)/1000);
  $$('#timerHolder input')[1].value=Math.floor((remainingTimeTimer%(3600*1000)/1000)/60);
  $$('#timerHolder input')[2].value=Math.floor((remainingTimeTimer%(60*1000)/1000));

  if (isTimerOn)  setTimeout(() =>  lookAtTheTime(), 300);
  if (currentDate > endTimeTimer) {
    isTimerOn=false;
    $("#timerHolder .fab").innerHTML="hourglass_empty";
  }
}
function resetTimer() {
  endTimeTimer=0;
  lookAtTheTime();
}

var isStopperOn;
elapsedTime = 0;
function switchStopper() {
  if(isStopperOn) {
    isStopperOn=false;
    $("#stopHolder .h1-connect-fab").innerHTML="timer";
  }
  else {
    $("#stopHolder .h1-connect-fab").innerHTML="pause";
    isStopperOn=true;
    startTimeStopper = new Date().getTime() - elapsedTime ;
    lookAtTheStopper();
  }
}
/*stopper*/
function lookAtTheStopper() {
  currentDate = new Date().getTime();
  elapsedTime = currentDate - startTimeStopper;

  $$('#stopHolder status')[0].setSwitchData(Math.floor((elapsedTime%(3600*1000)/1000)/60)/60*100);
  $$('#stopHolder status')[1].setSwitchData(Math.floor((elapsedTime%(60*1000)/1000))/60*100);

  $('#timerCurrent').innerHTML=Math.floor(elapsedTime/(3600*1000)/1000) + ':' + Math.floor((elapsedTime%(3600*1000)/1000)/60) + ':' + Math.floor((elapsedTime%(60*1000)/1000));

  if (isStopperOn)  setTimeout(() =>  lookAtTheStopper(), 300);

}
function resetStopper() {
  elapsedTime=0; startTimeStopper=0;
  isStopperOn=false;
  $("#stopHolder .h1-connect-fab").innerHTML="timer";
  $$('#stopHolder status')[0].setSwitchData(0);
  $$('#stopHolder status')[1].setSwitchData(0);
}

function roundStopper() {
    $('#stopperRounds').innerHTML='<div class="colorResults">'+ ($$('#stopperRounds div').length+1)  +': '+$('#timerCurrent').innerHTML+'</div>'+  $('#stopperRounds').innerHTML;
}


/*text Editor CLASS*/

function updateTextStats() {
  input = $('#mainText').innerHTML;

  countOfDots = input.replace(/\.\.\./g,'.').replace(/\.\./g,'.').split('.').length;
  countOfExmM = input.replace(/\!\!\!/g,'!').replace(/\!\!/g,'!').split('!').length;
  countOfQues = input.replace(/\?\?\?/g,'?').replace(/\?\?/g,'?').split('?').length;
  countOfSent = countOfDots + countOfExmM + countOfQues -2 ;

  countOfLines = input.split(/\r\n|\r|\n/g).length
  $('#textStats').innerHTML=input.length+' characters | ' +  input.split(' ').length + " Words | "+ countOfSent +' Sentences | '+ countOfLines +' Lines.';
}
