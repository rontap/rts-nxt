//NXT MATERIAL BASE NAVIGATION DESIGN

//GNU GPL v3 Licence


nxt.modules.push("design.js");

if ( nxt.build < 1620) nxt.dieFromVersion(1620);

//waiting for everything to get
setTimeout(function(){


//menu handlink, and omenu onclicks
lastSelMenuItem=0;
for (i=0;i<$$('.omenu').length;i++)
{
  $$('.omenu')[i].onclick=function(){
      
    //for each menu element, we create an onclick
      $$('.omenu')[lastSelMenuItem].classList.remove('on'); //removing knob
    $$('holder>*')[lastSelMenuItem].classList.remove('on'); //removing actual card
    this.classList.add('on');
    lastSelMenuItem=$$('.omenu').indexOf(this);
    try {
      $$('holder>*')[lastSelMenuItem].classList.add('on');
    }
    catch(e) { //if you want to open an element which doesnt exist.
      //TBA notification
      nxt.die(e);
    }
     $('#pageTitle').style.opacity=0

    trigger(this);
    setTimeout(function(){

       $('#pageTitle').innerHTML=$$('.omenu')[lastSelMenuItem].innerHTML;
       $('#pageTitle').style.opacity=1;
       location.hash="l="+lastSelMenuItem;
    },200 );


  }
}

// supporting standalone desktop mode
if (nxt.getStore("desktopMode")) {
    //adding navigational icons
    $('nav').innerHTML+='<i class="ctrls-l material-icons" onClick=history.back();>arrow_left</i>';
    $('nav').innerHTML+='<i class="ctrls-x material-icons " onClick="history.forward()">arrow_right</i>';
    $('nav').innerHTML+='<i class="ctrls-m material-icons " onClick="location.reload()">replay</i>';

    try {var nodew = nw.Window.get();}
    catch (e) {}
}


//jumping between locations
setTimeout(function(){
  let getArgs =  new Sets($_GET().argumentList()) ;
  if (getArgs.includes("l")) 
    $$('.omenu')[ Number( $_GET("l") ) ].click(); 
  else 
    $$('.omenu')[0].click();
},100);


},100); //main wait



function trigger(call) {
   return false
}
