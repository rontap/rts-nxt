     window.onresize=function(){
         ax=window.innerWidth;
         ay=window.innerHeight;
     };

    function goresizeblocks(event) {
    ax=window.innerWidth;
    ay=window.innerHeight;
    $('div').addClass('resize');
    }



    numcount=0;
    currsel="";
    function addnum(call) {
        hist.innerHTML="<div class='item' ondragstart='dragi(event);' draggable='true' id='numx"+numcount+"'>"+call+"</div>"+hist.innerHTML;
        numcount++;
    }
    addnum(42);
    addnum(1239);
    function dragi(ev)
    {

    currsel=ev.toElement;
    }
    isopened=false;
function about() {
    if (!isopened)
    {
 $('#aboluter').addClass("on")  ;
 $("#blacker").removeClass("mute");
        isopened=true;
    }
    else {
 $('#aboluter').removeClass("on")  ;
 $("#blacker").addClass("mute");
         isopened=false;
    }
}


function dragStart(ev) {
   return true;
}
function dragEnter(ev) {
   event.preventDefault();
   event.target.classList.add('active');
   return true;

}
function dragOver(ev) {
   event.target.classList.remove('active');
    return false;
}
function dragDrop(ev) {
   console.log(ev);
    ev.toElement.value=currsel.innerHTML;

   return false;
}

kero.style.width=window.innerWidth/100*23-10+'px';

isslide=false;
function slideup() {
	if (!isslide)
	{
		$('body').addClass('euclOn');
	initCanvas(document.getElementById("euclidean"));

	setTimeout(function(){resizeCanvas();},750);
	isslide=true;
	//nv3fel.style.
	}
	else {
			$('body').removeClass('euclOn');
	  	isslide=false;
	}
	}


	setTimeout(function(){
		pageScroll=function(){slideup()};

		},1500);
		pageScroll=function(){slideup()};

	 getMousePos = function(event)
{
	return {"x":event.pageX-canvas.offsetLeft,"y":event.pageY-canvas.offsetTop};
}

function graphis(call) {
    if (call)
    {
        $(".mainbtn").classList.add("on");
    }
    else {
        $(".mainbtn").classList.remove("on");
    }
}

isSideBarOn=false;
function switchSideBar() {

	if (isSideBarOn) {
	  document.body.classList.remove('sideBar');
		isSideBarOn=false;
		$('#moreinfo_icon').src="../../NXTJS/icon_info.png";
	}
	else {
		document.body.classList.add('sideBar');
		isSideBarOn=true;
		$('#moreinfo_icon').src="../../NXTJS/icon_info_white.png";
	}
}
/*$.each($('.omenu'), function(i, el){//animation
    $(el).css({'opacity':0.1});
    setTimeout(function(){
       $(el).animate({
        'opacity':.8
       }, 150);
    },10 + ( i * 100 ));

}
)
;*/
var map = [];
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
    if( map[13] ){
    calkr();
      map=[];
    }
    if (map[17] && map[18] ) {
    	setTimeout(function(){
    		   for (i=0;$(".keyhint").length>i;i++)
			    	{
			    	$(".keyhint")[i].style.opacity=0.9;
			    	}

    	},100)

    	setTimeout(function(){
    		   for (i=0;$(".keyhint").length>i;i++)
			    	{
			    	$(".keyhint")[i].style.opacity=0;
			    	}

    	},4000)
    }
    if((map[17] && map[18] & map[96]) || (map[17] && map[18] & map[48])){ // CTRL+alt+0
    	fillt('formula');   	 mapler();
    }
    else if((map[17] && map[18] & map[97]) || (map[17] && map[18] & map[49])){ // CTRL+alt+0
    	fillt('add') ;  	 mapler();
    }
           else if((map[17] && map[18] & map[98]) || (map[17] && map[18] & map[50])){ // CTRL+alt+0
    	fillt('szor') ;  	 mapler();
    }
     else if((map[17] && map[18] & map[99]) || (map[17] && map[18] & map[71])){ // CTRL+alt+0
    	fillt('gyok') ;  	 mapler();
    }
     else if((map[17] && map[18] & map[100]) || (map[17] && map[18] & map[52])){ // CTRL+alt+0
    	fillt('negyz');   	 mapler();
    }
  	 else if((map[17] && map[18] & map[101]) || (map[17] && map[18] & map[53])){ // CTRL+alt+0
    	fillt('besz');   	 mapler();
    }
     else if((map[17] && map[18] & map[102]) || (map[17] && map[18] & map[54])){ // CTRL+alt+0
    	fillt('toa') ;  	 mapler();
    }
      else if((map[17] && map[18] & map[103]) || (map[17] && map[18] & map[55])){ // CTRL+alt+0
    	fillt('szamtani') ;  	 mapler();
    }
          else if((map[17] && map[18] & map[104]) || (map[17] && map[18] & map[56])){ // CTRL+alt+0
    	fillt('primfel') ;  	 mapler();
    }
          else if((map[17] && map[18] & map[105]) || (map[17] && map[18] & map[57])){ // CTRL+alt+0
    	fillt('mesel') ;  	 mapler();
    }
           else if(map[17] && map[18] && map[70]) { // CTRL+alt+0
    	fillt('fakt') ;  	 mapler();
    }
               else if(map[17] && map[18] && map[83]) { // CTRL+alt+s
    	fillt('sintg') ;  	 mapler();
    }
               else if(map[17] && map[18] && map[75]) { // CTRL+alt+s
    	fillt('atlszam') ;  	 mapler();
    }
               else if(map[17] && map[18] && map[65]) { // CTRL+alt+a
    	fillt('szamrend') ;  	 mapler();
    }
}
function mapler() {//hinttörlés
	   	setTimeout(function(){
    		   for (i=0;$(".keyhint").length>i;i++)
			    	{
			    	$(".keyhint")[i].style.opacity=0;
			    	}

    	},100)
	map=[];

}

tapcalk= {};

tapcalk.set = function() {
infopanel.style.top="100%"
infopanel.style.opacity="0";
histh.style.top="100%"
histh.style.opacity="0";
tco.style.width="0"
tco.style.opacity="0";
tmain.style.left="15%";
tmain.style.height="auto"
tmain.style.bottom="0";

setTimeout(function(){
	histh.style.display="none";
	infopanel.style.display="none";
	tco.style.display="none";
},500)
return 'set';
}

tapcalk.unset = function() {

	histh.style.display="block";
	infopanel.style.display="block";
	tco.style.display="block";
setTimeout(function(){
infopanel.style.top="60%"
infopanel.style.opacity="1";
histh.style.top="60%"
histh.style.opacity="1";
tco.style.width="25%"
tco.style.opacity="1";
tmain.style.left="40.5%";
tmain.style.height="60%";
},100);
return 'set';
}
/*$.each($('.omenu'), function(i, el){//animation
    $(el).css({'opacity':0.1});
    setTimeout(function(){
       $(el).animate({
        'opacity':.8
       }, 150);
    },10 + ( i * 100 ));

);*/



function downloadcanvas() {

    var down = window.open();
    adc= "<img src='"+Canvas2Image.saveAsPNG(document.getElementsByTagName("canvas")[0],'a').src+"'>"
    down.document.write(adc);
     rjsx.notify("A mentéshez jobbklikk a képre, majd a Mentés Másként-ra","black");
    if(!down || down.closed || typeof down.closed=='undefined')
        {
             rjsx.notify("Engedélyezd a felugró ablakokat!","red");
        }
}

function getit() {
	get.init();
	if (get.q!==undefined)
	{
		fillt('formula');
		ino1.value='='+get.q;
		calkr();
		}
	}


setTimeout(function(){
	lastSelMenuItem=0;
	for (i=0;i<$$('.omenu').length;i++)
	{
		$$('.omenu')[i].onmousedown=function(){
			$$('.omenu')[lastSelMenuItem].classList.remove('on');
			this.classList.add('on');
			lastSelMenuItem=$$('.omenu').indexOf(this);

		}
	}

},1200);

console.log('UI.js')
//PORT2
