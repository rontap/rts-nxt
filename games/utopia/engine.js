// UTOPIA ENGINE  

map=[];         //keys
move = {};      //anything related to moving
ui = {};
rules = {};     //triggered upon arriving on a block
 
ui.openlevel = function() {
    var oll = prompt("Level ID", "1");

    if (oll != null) {
        $('body').removeClass('main_menu');
        level.open(level.s[oll]);
        
    }
} 
ui.keymap= ['#48f','#62c','#f44'];
move.right =   function(a) {  if (!move.prevent()) player.posy++;  }   
move.left =    function(a) {  if (!move.prevent()) player.posy--;  }  
move.forward = function(a) {  if (!move.prevent()) player.posx--;  }  
move.back =    function(a) {  if (!move.prevent()) player.posx++;  }  
move.to  =     function(x,y) { 
                        player.posx=x;
                        player.posy=y; 
                        move.update();
                } 

move.isPrevented=false;
move.prevent = function(c) {
    var c;
    if (typeof(c)!="undefined") move.isPrevented=c;
    else return move.isPrevented;
} 


move.prelude = function() {}; //contains orders, that are excecuted upon movement
move.update= function () {
    play1.style.top=player.posx*50;
    play1.style.left=player.posy*50;

} 
move.doNotMove = function() {
     player.posx=player.befx;
     player.posy=player.befy;
     move.update();
}
move.hasMoved = function() {
    if ( (player.posy==player.befy) &&
         (player.posx==player.befx)  )
         return false;
  
    else{
        return true;
        }
}

player = {
    posx:0,
    posy:0,
    cpointx:0, //checkpoint
    cpointy:0
};    
player.checkpoint = function() {
    player.posx=player.cpointx;
    player.posy=player.cpointy;
    move.update();
}

level ={};
level.s=[];
level.set = function(e) {
    
}
level.height=0;
level.width=0;
grid=[];
level.setField= function(w,h) {
    field.style.width=(w+2)*50;
    field.style.height=(h+2)*50;
    level.width=w+1;
    level.height=h+1;
    $('#particles , #field , #playercube').css('margin-left',window.innerWidth/2-$('#field').width()/2);
    for (var isg=0;isg<=(h+1);isg++) 
    {
        //console.log(isg);
        grid[isg]=[];
        for (var s=0;s<=(w+1);s++) {
            grid[isg][s]=[];
        }
    }
}
level.register = function(data) {
    level.s[data.id]=data;
}
level.open = function(id) {
    level.setField(id.w,id.h);
    level.clear();
    player.checkpoint();
    id.run();
   
}
level.clear = function() {
    player.posx=0;  player.cpointx=0;
    player.posy=0;  player.cpointy=0;
    coll.keys={};   coll.money=0;
               elements.laser.count=0;     elements.laser.obj=[];
               elements.portal.count=0;    elements.portal.obj=[];
    
    $('.collkey tr').removeClass('a1 a2 a3');
    field.innerHTML="";
    particles.innerHTML="";
}
dbg={};
dbg.is=true;
dbg.click = function(e) {
    if (dbg.is) {
    var xc = Math.round((e.layerX-25)/50);
    var yc = Math.round((e.layerY-25)/50);
    console.log(Math.round(e.layerX/50),Math.round(e.layerY/50));
    var a=eval(spesheet[nowsel])
    setRule(fncsheet[nowsel],[[yc,xc]],a);
    }
    } 




 $("td").click(function(){
        $(this).html(next);
        $.checkforwin();
        if (next=='X') next='O'
        else next='X'
    });