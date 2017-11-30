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

    },300 );

  }
}


if (nxt.getStore("desktopMode")) {

$('nav').innerHTML+='<i class="ctrls-l material-icons" onClick=nodew.toggleFullscreen();>crop_square</i>';
$('nav').innerHTML+='<i class="ctrls-x material-icons " onClick="window.close()">close</i>';
$('nav').innerHTML+='<i class="ctrls-m material-icons " onClick="nodew.minimize()">keyboard_arrow_down</i>';

try {var nodew = nw.Window.get();
}
catch (e) {}

}


},100);



function trigger(call) {
   return false
}
