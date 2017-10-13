addUIElement();
waitBetweenTicks=0;
var curr;
UserList[0] = new user(0,function(){
         new Promise((resolve) => {
         if (waitBetweenTicks==0) 
            {
                aif(UserList[gameTickVar]);
               
            }
         else 
            setTimeout( () => {
                aif(UserList[gameTickVar]);
               
            }, waitBetweenTicks);
     }).then(gameTick());
     
});

   
aif = async function(curr){
    //console.log(curr);
      for (i=curr.has.length;i>0;i--) {
            if (curr.has[i]==0) isGameWon=false;
            if (i==1) {
                 curr.doRound(0,true,true);
            }
            if ((curr.has[1]>2)&&(curr.has[0]>6)&&(curr.has[5]==0)) {
                curr.doRound(2,true,true); i=0;
            }
            else if ((curr.has[3]>1)&&(curr.has[0]>1)&&(curr.has[6]==0)) {
                curr.doRound(2,false,true);  i=0;
            }
            else if (curr.has[i]+2>upgradeCost[i]) {
                curr.doRound(1,i,true);
                i=0; 
            }
        }
       
}