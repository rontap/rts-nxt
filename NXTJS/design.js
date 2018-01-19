if ( nxt.build < 1520) nxt.dieFromVersion(1600); 

setTimeout(function(){


//menu handlink, and omenu onclicks
lastSelMenuItem=0;
for (i=0;i<$$('.omenu').length;i++)
{
  $$('.omenu')[i].onclick=function(){


    $$('.omenu')[lastSelMenuItem].classList.remove('on');
    $$('holder>*')[lastSelMenuItem].classList.remove('on');
    this.classList.add('on');
    lastSelMenuItem=$$('.omenu').indexOf(this);
    $$('holder>*')[lastSelMenuItem].classList.add('on');
     $('#pageTitle').style.opacity=0

    trigger(this);
    setTimeout(function(){

       $('#pageTitle').innerHTML=$$('.omenu')[lastSelMenuItem].innerHTML;
       $('#pageTitle').style.opacity=1;
       location.hash="l="+lastSelMenuItem;
    },200 );


  }
}


if (nxt.getStore("desktopMode")) {

$('nav').innerHTML+='<i class="ctrls-l material-icons" onClick=history.back();>arrow_right</i>';
$('nav').innerHTML+='<i class="ctrls-x material-icons " onClick="history.forward()">arrow_left</i>';
$('nav').innerHTML+='<i class="ctrls-m material-icons " onClick="location.reload()">reload</i>';

try {var nodew = nw.Window.get();
}
catch (e) {}

}


setTimeout(function(){
  let getArgs =  new Sets($_GET().argumentList()) ;
  console.log(getArgs);
  if (getArgs.includes("l")) {

    let nth = Number( $_GET("l") );
     $$('.omenu')[nth].click();

  }
  else {
    $$('.omenu')[0].click();
  }

},100);


},100);



function trigger(call) {
   return false
}
