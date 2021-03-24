//Aron Tatai Submission.

ctx = canv.getContext('2d')
ctxUI = canvUI.getContext('2d')
ctxOverlay =  canvOverlay.getContext('2d')
// CONFIGURE
const tickSpeed = 60
const speed = 5
const maxCircles = 10
const dpi = 1
const circleAdditionsPerLevel = 4;
const advancedTimeCoefficient = 500;

var tutorialMode = false;
var circles = []
var radius = 10
var goalCircles = 8;
var sumCollisions, maxCollisions;
var isGamePaused = false;
col = () => Math.floor(Math.random()*255)

var maxColls = 60;
var sumColls = 400;
var maxTime = 120;
levelStats = [];
const borderColor = "black"
const textColor = "white"

function toggleGamePause() {
    isGamePaused = ! isGamePaused;
    pauseBtn.classList.toggle('active');

    if (isGamePaused) {
        pauseBtn.innerHTML='play_arrow'
    } else {
        
        pauseBtn.innerHTML='pause'
        setTimeout(function(){
            
            loop()
        },100)
    }
}

isAllStopped = () =>    
    circles.reduce( (acc,el) => ( ( el.isAdvanced == "negator" || !el.isMoving) && acc && circles.length!=0) ? true : false , true)

function endGame() {
    circles=[];
    loop='';
    levelStats.forEach( el=>
        levelStat.innerHTML+='<span>'+el+'</span><br>'
        )
}
function nextLevel() {
   
    nxt.notify(3000,`Well done with ${tutorialMode ? 'Tutorial Stage' : 'level' } `+(level-1));
    //levelHolder.innerHTML = level;
    levelStats.push([ sumCollisions, maxCollisions ,timeSpentLevel]);
    if (tutorialMode) setTimeout(function(){tutorial(++tutorialStage)},3500) 
    setTimeout(function(){
        circles = [];
        goalCircles += circleAdditionsPerLevel;
        
        loop();
        
        
        timeSpent = new Date().getTime();
    },3000)
    
}
var timeSpent = new Date().getTime();
//setting resolution, resetting each time when we are resizing.

function setupCanv()  {
    radius = Math.min(innerHeight,innerWidth) / 11;
    [canv,canvUI,canvOverlay].map(curr =>{
    curr.height = (innerHeight)*dpi;
    curr.style.height = (innerHeight);
    curr.width = (innerWidth-2)*dpi;
    curr.style.width = innerWidth-2;
    curr.getContext('2d').scale(dpi,dpi);
    })
}
setupCanv();

window.onresize =  setupCanv


// ---- window event listeners -----

window.addEventListener("keydown", handleKeys, false)
function handleKeys(e)  {
    if (e.code == 'Digit1' || e.key == '1') {
        if (circles.length < maxCircles) {
            //creating a new circle
            //added functionality:  Hold Shift+1 for random spawn location
            //default functionality:Press 1 to spawn a circle at the cursor
            if ( mouseEvent === false || e.shiftKey) 
                addCircle()
            else 
                circles.push( new Circle(mouseEvent.offsetX, mouseEvent.offsetY) )
        }
        else 
            console.log('Maximum reached!')
        
        
    }
    if (e.code == 'Digit2' || e.key == '2') {
        if (circles.length == 0) 
            console.log('Minimum reached!')
        
        //deleting circles
        //added functionality: Hold Shift + 2 to delete all circles
        if (e.shiftKey) 
            circles = []       
        else 
            circles.shift()  
    }
}


// added functionality: circles spawn where the cursor currently is
// or when we cannot determine the cursor position, randomly
mouseEvent = false // Boolean or MouseEvent
window.addEventListener("mousemove", saveMousePos, false)
function saveMousePos(e) {
    mouseEvent = e
}


//toggle moving circles

window.addEventListener("mousedown", toggleMoving, false)

function toggleMoving(e) {
    if (isGamePaused)  return false
    //counting backwards as required by the specification
    for (i=circles.length-1 ; i >=0 ; i--) {
        //calculating whether the click is withing an idividual circle's radius
        if ( circles[i].distanceFromPoint( e.offsetX , e.offsetY ) < circles[i].radius) {
            if (circles[i].isAdvanced != false) circles[i].advancedClicksLeft--;
            else circles[i].isMoving = !circles[i].isMoving
            break;  // only need to apply the toggle to a single circle
         
        }
    }
}

//method for adding new circle
addCircle = (adv = false) =>  circles.push( new Circle(adv) )    
addAdvCircle = (adv = false) =>  circles.push( new AdvCircle(adv) )

addMultiple = (arr) => arr.forEach( el => addAdvCircle(el) )

circles.push(new Circle())


// 

if (location.hash == "#tutorial") {
    tutorialMode=true;
    tutorial(0);
    $('body').classList.remove('pre-game')
}
function startFromMenu(menu) {
    if (menu === "tutorial") {
   tutorialMode=true;
    tutorial(0);
	}
    $('body').classList.remove('pre-game')
}
loop();
addMultiple([false].times(4));
