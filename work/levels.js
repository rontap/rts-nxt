// custom levels

const levels = {
   'main' : {
       normal: 3,
       before:[false],
       els: [false],
    },
    'main2' : {
     normal: 6,
     before:[false,false,false,false],
     els: [false],
     },
   'collider': {
       normal: 3,
       before:['collider','collider'],
       els: ['collider','collider'],
   },
   'spawner-halfling': {
        normal: 2,
        before:['spawner','halfling'],
        els: ['spawner','spawner','spawner','halfling','halfling'],
   },
   'runner-blocker': {
        normal: 2,
        before:['runner','runner','blocker'],
        els: ['collider','runner','runner','blocker','blocker'],
   },
   'killer':{
        normal: 4,
        before:['halfling'],
        els: ['killer','halfling','spawner'],
   },
   'vanisher-negator':{
        normal: 4,
        before:['negator','vanisher','vanisher'],
        els: ['negator','negator','vanisher','vanisher'],
   }

}

let tutorialStage = 0;
tutorialPaddingTop = 0;

let currentTutorialStage = 0;

function tutorial(nth = 0) {
     if (tutorialStage == 7) {
          alert('You have finished with the tutorial, boi');
          location.hash="";
          location.reload();
     }
     tutorialMode = true;
     tutorialPaddingTop = 220;
    try { $('[guide].on').classList.remove('on'); }
    catch(e){}

    let currLevel = levels[Object.keys(levels)[tutorialStage]];
    $('#tutorialPlane').classList.add('on')
     console.log(levels,currLevel);
     addMultiple(currLevel.before);
     $('[guide]#'+Object.keys(levels)[nth]).classList.add('on');
      
    

}

function startTutorial() {
     circles = [];
     timeSpent = new Date().getTime();
     $('#tutorialPlane').classList.remove('on')
     let currLevel = levels[Object.keys(levels)[tutorialStage]];
     addMultiple([false].times(currLevel.normal));
     addMultiple(currLevel.els);
}

Array.prototype.times = function(times,acc=[]) {  while (times-->0) acc=acc.concat(this) ; return acc} 
