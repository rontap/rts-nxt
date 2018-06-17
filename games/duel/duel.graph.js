//graph algorithm
var subtreeCount;
var subtrees;

function updateConnectionStats() {
  subtrees = [];
  subtreeCount = -1;
  fieldFlat = field.merge();
  for (s=0;s<fieldFlat.length; s++) {
    fieldFlat[s].subtree=-1;
  }

  for (s = 0 ;s<fieldFlat.length; s++) {
    if (fieldFlat[s].owner > 0 && fieldFlat[s].subtree == -1) {//it is actually owned by someone
      fieldFlat[s].subtree = ++subtreeCount;
      subtrees[subtreeCount]=[];
        //console.log("checking",fieldFlat[s]);
      greedyNextNode(fieldFlat[s]);


    }
  }
}


function greedyNextNode(node) {

    subtrees[subtreeCount].push(node);
  for (var sto = 0; sto< node.connected().length; sto++) {
        node.subtree=subtreeCount;
        if ( node.connected()[sto].subtree != subtreeCount) {


          greedyNextNode( node.connected()[sto] );
        }
  }
}


// greedily detect circles
function updateCircleness() {
  fieldFlat = field.merge();
  for (i=0;i<fieldFlat.length;i++) {//resetting everything
    fieldFlat[i].circle=undefined;
    fieldFlat[i].waypoint=undefined;
  }

  for (var loop=0; loop< subtrees.length; loop++) {
      //each subtree
      subtrees[loop][0].circle=[]; //startin out
      breathNextCircleDetect(subtrees[loop],0);

  }
  finalCircles=[];
  for (cdet = 0; cdet<circles.length;cdet++) {
    xDiffArr = xdiffCircle(circles[cdet][0], circles[cdet][1]);
    if (xDiffArr.length > 2)
    finalCircles.push( xDiffArr )
  }
  return finalCircles;

}
var circleContainer;
function drawTerritory() {

    circles = [];

    circleContainer = updateCircleness();
    console.log(circleContainer);

        territoryOpacity=0;
        updateTerritoryPaint();





}

function updateTerritoryPaint() {

  //  console.log(territoryOpacity);
    ctx2.clearRect(0,0,DIMENSION*2,DIMENSION*2);
    ctxCalc.clearRect(0,0,DIMENSION*2,DIMENSION*2);
    ctxCalc.strokeWidth=0;
    ctxCalc.strokeStyle='transparent';

    for (drawi=0;drawi<circleContainer.length;drawi++) {
        ctx2.beginPath();
        ctxCalc.beginPath();


      for (drawj=0;drawj<circleContainer[drawi].length;drawj++) {
        currNode = circleContainer[drawi][drawj];
        ctx2.fillStyle= colors[ currNode.owner ] ;
        ctxCalc.fillStyle= ['white','red','green','blue'][ currNode.owner ];
        ctx2.strokeStyle="transparent";
        ctx2.lineTo(p2l(currNode.x),p2l(currNode.y));
        ctxCalc.lineTo(p2l(currNode.x),p2l(currNode.y));


      }
      ctx2.fill(); ctxCalc.fill();
      ctx2.closePath(); ctxCalc.closePath();
      ctx2.stroke(); ctxCalc.stroke();
    }



}

//extracting areal data from content
// NOTE: THIS DOES LIMIT THE APP CURRENTLY TO MAX 3 USERS....
function xTract() {
  //extracting the values..
  let calcImageData = ctxCalc.getImageData(0,0,DIMENSION*2,DIMENSION);
  console.log(calcImageData.data);
  return reduceImageData(calcImageData.data);
}
function reduceImageData(UintArray) {
  cumul = [0,0,0,0];
  console.warn(UintArray,UintArray.length);
  for (let i=0;i<UintArray.length / 4;i++) {
    cumul[0] += UintArray[i*4]   > 0 ? 1 : 0 ;
    cumul[1] += UintArray[i*4+1] > 0 ? 1 : 0;
    cumul[2] += UintArray[i*4+2] > 0 ? 1 : 0;


  }
  return cumul;
}

function breathNextCircleDetect(currSubtree,line) {

  fieldFlat = field.merge();

  finished = true;

  for (var sto = 0; sto< currSubtree.length ; sto++) {

       currNode = currSubtree[sto];
       if (currNode.circle == undefined) continue;

       if ( currNode.circle.length == line ) {

         for (var child = 0; child< currNode.connected().length ; child++) {//looping through its children
           compareNode = currNode.connected()[child];
           if ( currNode.connected()[child].circle == undefined ) {

                currNode.connected()[child].circle= currNode.circle.concat(currNode) ;
                finished = false;

              }
            else if ( ! currNode.circle.includes( currNode.connected()[child] ) ){//circle
                console.log(currNode,'[CIRCLE]');
                currNode.waypoint="circle";
                if (compareNode.waypoint != "circle") {
                  circles.push( [ currNode.circle.concat(currNode) , compareNode.circle.concat(compareNode) ]);

                }
                else {

                }


            }
         }
       }

          /*else if ( node.connected()[sto].circle >= line){
          node.connected()[sto].circle=++line;
          found = node.connected()[sto];


          ctx2.fillStyle = "blue";
          ctx2.beginPath();
          ctx2.arc(p2l(found.x),p2l(found.y), SIZE , 0, 2 * Math.PI);
          ctx2.fill();

          console.log(node.connected()[sto],node);
          partOneX = backtrackCircle(node.connected()[sto] , [node]); ///
          console.log('----');
          partTwoX = backtrackCircle(node, [node.connected()[sto]]);
          console.log("THING:",partOneX,partTwoX);

        }*/
        if (!finished)  breathNextCircleDetect(currSubtree,line+1);

  }

}





function xdiffCircle(first,second) {

  let parting = 0;
  let isParted = false;

  while (!isParted) {

    parting++;
    if ( first[parting] != second[parting] || (first[parting] == undefined &&second[parting] == undefined)) {
      isParted=true;
      parting--;

    }
  }


  return [].concat( first.slice(parting+1,first.length) ).concat( second.slice(parting,second.length).reverse() )


}
