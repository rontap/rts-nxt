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


    //special rules
    /*i=lastSelMenuItem;
         if ( (i<3) ) $('body').classList.add('websiteThemeBlue')
         else $('body').classList.remove('websiteThemeBlue')*/
    trigger(this);
    setTimeout(function(){

       $('#pageTitle').innerHTML=$$('.omenu')[lastSelMenuItem].innerHTML;
       $('#pageTitle').style.opacity=1;

    },300 );

  }
}
},100);



function trigger(call) {
   return false
}