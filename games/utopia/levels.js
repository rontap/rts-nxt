level.setField(10,10);
//no levels yet 
level.register( {
    w:15, h:7,
    id:1,
    run: function() {
        setRule('laser(2)',[[3,4],[7,4]],[1000,3000]);
        setRule('laser(4)',[[3,8],[6,8]],[1200,800]);
        setRule('portal(4)',[[3,7],[8,10]],["top","right"]);
        setRule('block()',[[3,4],[7,4],[3,6],[3,7],[6,8],[6,10],[7,13],[7,8],[8,8],[7,10],[8,10],[3,8]]);  
        setRule('key("#62c")',[[1,6],[3,10]],'#62c');
        setRule('key("#f44")',[[7,5]],'#F44');
        setRule('door("#62c")',[[6,9],[7,12]],'#62c');
        setRule('door("#f44")',[[4,12]],'#f44');
        setRule('money()',[[8,9],[4,14]]);
        setRule('fire()',[[7,14]]);
        setRule('checkpoint()',[[2,12],[1,3]]);
        setRule('mine()',[[5,15]]);
        setRule('wall("top")',[[4,13],[4,14]],"top");
        setRule('wall("right")',[[4,14]],"right");
    }
})




//level.setField(15,7); 

 

window.onresize = function() {
$('#particles , #field , #playercube').css('margin-left',window.innerWidth/2-$('#field').width()/2);
}


/*
setLevel(
 {
    name:'Hals',
    id:453,
    blocks: [
     ['key("#62c")',[[1,6],[3,10]],'#62c'],
     
    ]
 }
)
call.blocks[i][2][0][1]

*/