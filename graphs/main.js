
const RADIUS = 10;
const VERSION = 1.5;
const NAME = 'Graphisoft';
const INSTANCE = String(Math.randInt(1000)+1);

// -------------------------------------------
// ----CANVAS CONFIGURATION ------------------
// -------------------------------------------

ctx   = canv.getContext('2d');        //main canvas (z0)
ctxo  = canvOverlay.getContext('2d'); //canvas for overlays (z1) (dynamic)
ctxbg = canvBg.getContext('2d');      //canvas for background drawing (z-1)

const toolBarHeight = 65+30;
const width = 800;
const height = 600;
const dpi = 2; //needs to be changed to dynamic dpi setup

//setting resolution
[canvBg,canv,canvOverlay].map(curr =>{
  curr.height = (innerHeight-toolBarHeight)*dpi;
  curr.style.height = (innerHeight-toolBarHeight);
  curr.width = (innerWidth-2)*dpi;
  curr.style.width = innerWidth-2;
  curr.getContext('2d').scale(dpi,dpi);
});

var MODE = 'Place';
var SEL_MODE = 'Subgraph';
var CONNECTION_MODE = 'Manual';


var graph = new Graph();
var hist = new History();
var isMouseDown = false;        //checking mouseDown-ness
var lastClickedElement = null;  //last 'down' clicked element [null,Node]
var drawingLine = null;         //are we drawing a line? [Boolean]
var nodeNumber=0;
var downCoords = [];
var moveCoords = [0,0];
var translateCoords = [0,0];


function switchMode(mode) {
  MODE = mode;
  console.log(mode);
  $('body').classList.remove('move-mode','search-mode');
  switch (MODE) {
    case 'Move' : $('body').classList.add('move-mode'); break;
    case 'Place' : break;
    case 'Search' : $('body').classList.add('search-mode'); $('#line').classList.remove('on');break;
  }
}

function translateRender(type,e) {
  //translating everything
  //used for moving
  let x = e.offsetX;
  let y = e.offsetY;
  console.log(e,type,x,y);

  if (type=='click') {downCoords=[x,y]; moveCoords=[0,0];}

  ctx.translate(moveCoords[0],moveCoords[1]);
  ctxbg.translate(moveCoords[0],moveCoords[1]);
  ctxo.translate(moveCoords[0],moveCoords[1]);

  moveCoords=[downCoords[0]-x,downCoords[1]-y];
  console.log(moveCoords,x,y,downCoords);

  ctx.translate(-moveCoords[0],-moveCoords[1]);
  ctxbg.translate(-moveCoords[0],-moveCoords[1]);
  ctxo.translate(-moveCoords[0],-moveCoords[1]);

  if (type=='up') {
    translateCoords[0]+=moveCoords[0];
    translateCoords[1]+=moveCoords[1];
  }
}
//['green','blue','yellow','orange','magenta','brown','silver','salmon','fuschia','#cc6622','#66cc22']
const cols = MAT_COLORS.get.byHue(500);

Map.prototype.type = 'Map';

// addon sidebar can be disabled
sidebar = {
  showEl:()=>false,

};

function deSelectRender(e) {
  if (e.target.id != 'canv') {
    render(null,{which:3});
    //$('#properties').innerHTML ='';
  }

  // which 3 is right  click
}

//-------------------------------------


function updateSelMode(mode) {
  SEL_MODE=mode;
  render(null,{which:3});
}
function updateConnectionMode(mode) {
  CONNECTION_MODE=mode;
  render(null,{which:3});
}

function changeStruct(calle) {
  //gets called whenever the structure is to be changed ,
  console.log('strc');
  store.save();
}

LOCK_INSTANCE = localStorage[''+NAME+VERSION+'Lock'];
store = {
  save : ()=>{
    if (LOCK_INSTANCE == INSTANCE || LOCK_INSTANCE==undefined) {
      localStorage[''+NAME+VERSION+'MainStorage']= JSON.stringify(graph,nxt.mapper);
      statusHolder.innerHTML=  "Saving";
      hist.push(Array.from(graph.nodes));
      setTimeout(()=>{
        statusHolder.innerHTML=" Saved. ";
      },300);
    }
    else statusHolder.innerHTML='Not Saving!';

  },
  load:  ()=>{
    if (LOCK_INSTANCE == INSTANCE || LOCK_INSTANCE==undefined) {
      let temp=localStorage[''+NAME+VERSION+'MainStorage'];
      graph.fromJS( JSON.parse(temp) );
      render(null,{which:3});
      statusHolder.innerHTML="Loaded";
      localStorage[''+NAME+VERSION+'Lock']=INSTANCE;
    }
  },
  init : ()=>false,
  flush: (force=false)=>{
      delete localStorage[''+NAME+VERSION+'MainStorage'];
      if (force) location.reload();
  },
  download:()=>{
    let a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([JSON.stringify(graph,nxt.mapper)], {type: 'text/text'}));
    a.download = 'GraphiSoft-' + new Date().getTime() + '.graph.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  export:()=> store.download(),
  redo:()=> {
    if (hist.pointer+1 == hist.data.length) return false;
    graph.nodes = new Map(hist.redo());
    graph.validate();
  },
  undo:()=> {
    graph.nodes = new Map(hist.undo());
    graph.validate();
  }
}


window.onunload=()=>delete localStorage[''+NAME+VERSION+'Lock'];

function renderSelectedColor(val) {
  let mainColor = '#444';

  if (SEL_MODE=="Subgraph") {
    if (val.subgraph == null) mainColor = '#444'
    else  mainColor =  cols[val.subgraph % 10];

  }
  else if (SEL_MODE=="NodeWeight") {

    mainColor = 'hsl('+(Number(val.weight)+200)+','+(Number(val.weight)+50)+'%,60%)';

  }
  else if (SEL_MODE=="NodeConnection") {
      let acc = 0;
      val.edges.forEach( (val,key) => {
        acc+=val;
      });
     mainColor = 'hsl('+(Number(acc)*3+100)+','+(Number(acc)/2+50)+'%,60%)';

  }
  else if (SEL_MODE=="Random") {
    let o = val.id;
    let O = 256;
    mainColor = new Color( nxt.seed(o,O) , nxt.seed(o,O,5) , nxt.seed(o,O,7)  ).rgb;

  }



  return mainColor;
}



// returns:
// 1 if L*2 > r
// -1 if L < r
// 0 if not in node but in invalid location
function distance(x1,x2,y1,y2,r,reqDist){
  let dist = Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2)); //pithagoras

  if (r === true) return dist;
  if ( dist > r*2 )
    return 1 //you can draw
  else if ( dist > r )
    return 0 //intersect
  else
    return -1 //clicked at node
}
