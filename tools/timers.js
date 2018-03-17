
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
