
const RADIUS = 8;

// -------------------------------------------
// ----CANVAS CONFIGURATION ------------------
// -------------------------------------------

ctx   = canv.getContext('2d');        //main canvas (z0)
ctxo  = canvOverlay.getContext('2d'); //canvas for overlays (z1) (dynamic)
ctxbg = canvBg.getContext('2d');      //canvas for background drawing (z-1)

const width = 800;
const height = 600;
const dpi = 2; //needs to be changed to dynamic dpi setup

//setting resolution
[canvBg,canv,canvOverlay].map(curr =>{
  curr.height = height*dpi;
  curr.style.height = height;
  curr.width = width*dpi;
  curr.style.width = width;
  curr.getContext('2d').scale(dpi,dpi);
});


var graph = new Graph();
var isMouseDown = false;        //checking mouseDown-ness
var lastClickedElement = null;  //last 'down' clicked element [null,Node]
var drawingLine = null;         //are we drawing a line? [Boolean]
var nodeNumber=0;

function render(type,e) {//main rendering funcion


  if (type=='click') isMouseDown = true;
  else if (type=='up')isMouseDown=false;

  if (type=='down' && !isMouseDown) return;
  if (e.which == 3) {
    if (type=='click') e.preventDefault();
    type='alt';

  }

  let x = e.offsetX || 0;
  let y = e.offsetY || 0;


  //drawing connection lines
  if (lastClickedElement!=null && type=="down") {
      if (e.altKey) { //moving a node
      /*if(getGraphNodeDistance(x,y)==false ||
         getGraphNodeDistance(x,y)==lastClickedElement)// keeping distance not implemented
        {*/
          lastClickedElement.name.x = x;
          lastClickedElement.name.y = y;
        //}

      }
      else { //  drawing connection line
        ctxo.clearAll();
        ctxo.beginPath();
        ctxo.moveTo(x,y);
        ctxo.lineTo(lastClickedElement.name.x,lastClickedElement.name.y);
        ctxo.stroke();
        drawingLine =true;
      }

  }
  //linking up eventinos

  //checking link locations
    //clickArea = false; //meaning -> we can draw


    clickArea = getGraphNodeDistance(x,y);
    //console.log(clickArea);


  if (type=='click' && clickArea == false ) {
      graph.addNode( new Node( nodeNumber , {x:x,y:y} ));
     nodeNumber++
  }

  ctx.clearAll();
  //rendering everything out
  if (clickArea.type == 'Node' && type=='up' && drawingLine ) {
      // connecting two things

      if(clickArea!=lastClickedElement){
         // toggling
         if ( ! graph.nodes.get( lastClickedElement.id ).edges.has( clickArea.id ) ) {
           graph.nodes.get( lastClickedElement.id ).edges.set( clickArea.id , 10);
           graph.nodes.get( clickArea.id ).edges.set( lastClickedElement.id , 10);
         }
         else {
           graph.nodes.get( lastClickedElement.id ).edges.delete( clickArea.id);
           graph.nodes.get( clickArea.id ).edges.delete(lastClickedElement.id);
         }

         graph.validate(true /*enforcing*/);
      }
      //else if (confirm('Do you want to connetct this node with itself?')){
      //   graph.nodes.get( lastClickedElement.id ).edges.set( clickArea.id , 10);
      //}
  }


  if (type=='up') {
      lastClickedElement=null;
      ctxo.clearAll();
      drawingLine =false;
  }



  // HOLY DRAWING THING
  ctxbg.clearAll();

  graph.nodes.forEach( (val,key) => {

      ctx.beginPath();

      if (val.subgraph == null) mainColor = '#444'
      else  mainColor =  cols[val.subgraph % 10];

      if (val == clickArea && type!='up') {//clicking on elementt
        ctx.fillStyle = 'red';
        sidebar.showEl(val);
        ctx.lineWidth=1;
        ctx.stokeStyle="black";
      }
      else if (val == clickArea && type=='up') {
        ctx.lineWidth=6;
        ctx.strokeStyle= MAT_COLORS['blue-800'];
        ctx.fillStyle = '#eeeeee';
      }
      else if (val == lastClickedElement) {
        ctx.lineWidth=6;
        ctx.strokeStyle= MAT_COLORS['green-500'];
        ctx.fillStyle = '#eeeeee';
      }
      else {
          ctx.fillStyle = mainColor;
          ctx.strokeStyle="black";
          ctx.lineWidth=1;
      }

      if (val == clickArea && e.altKey && type!='up') ctx.fillStyle = '#4488FF';

      ctx.arc(val.name.x,val.name.y,RADIUS,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();

      val.edges.forEach( (w,edgeId) => {
        connectedEdge = graph.nodes.get(edgeId);
        //console.log(connectedEdge,edgeId);
        ctxbg.beginPath();
        if (val == clickArea) {
            ctxbg.lineWidth=6; //currSelNode
        }
        else {
            ctxbg.lineWidth=2;
        }

        ctxbg.strokeStyle="#222222"
        ctxbg.moveTo(val.name.x,val.name.y);
        ctxbg.lineTo(connectedEdge.name.x,connectedEdge.name.y);
        //later adding width (weight)

        ctxbg.stroke();
      });
  });



// returns:
// 1 if L*2 > r
// -1 if L < r
// 0 if not in node but in invalid location
function distance(x1,x2,y1,y2,r){
  let dist = Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2)); //pithagoras

  if ( dist > r*2 )
    return 1 //you can draw
  else if ( dist > r )
    return 0 //intersect
  else
    return -1 //clicked at node
}

// in: X,Y coordinates
// @returns {ret} Boolean|Node
// - true if node in blocking range
// - NodeObject if clicked at node
// - false[default] if not blocked
function getGraphNodeDistance(x,y) {
  let ret = false;
  graph.nodes.forEach( (val,key) => {
       let currX = val.name.x;
       let currY = val.name.y;
       if ( distance(currX,x,currY,y,RADIUS) == -1) /*pithagoras*/
       {
           //we found a node

           if (type=='click') lastClickedElement = val;
           ret = val;

       }
       else if ( distance(currX,x,currY,y,RADIUS) == 0 )
       { //pithagorash
           //we found a node but not in range
           ret = true;
       }
  });
  return ret;
}



}//render
//const cols = ['green','blue','yellow','orange','magenta','brown','silver','salmon','fuschia','#cc6622','#66cc22']
const cols = MAT_COLORS.get.byHue(500);

Map.prototype.type = 'Map';

// addon sidebar can be disabled
sidebar = {
  showEl:()=>false,

};

function deSelectRender(e) {
  if (e.target.id != 'canv')
  render(null,{which:3});
  // which 3 is right  click
}
