/*
class ELEMENT
    OBJECT TYPES:
        LINE
            x1,y1,x2,y2
        CIRCLE
            x,y,r
        OVAL SHAPES
            x1,y1,x2,y2,r
        N SIDED POLYGON (W/SIDE LENGTH OR DIAMETER)
            x,y,n or a
        POLYGON
            [LINE]
        FREE DRAWING
            x1,y1...xn,yn
    FILLING TYPES
        SOLID color (color PICKER OR MANUAL ENTER)
        color TRANSITION
        UPLOADABLE IMAGE

*/


// INITIAL CONFIG
ctx   = canv.getContext('2d');
ctxo   = canvOverlay.getContext('2d');

const toolBarHeight = 65;
const width = 800;
const height = 600;
const dpi = 2; //needs to be changed to dynamic dpi setup

//setting resolution
[canv,canvOverlay].map(curr => {
  curr.height = (innerHeight-toolBarHeight)*dpi;
  curr.style.height = (innerHeight-toolBarHeight);
  curr.width = (innerWidth-2)*dpi;
  curr.style.width = innerWidth-2;
  curr.getContext('2d').scale(dpi,dpi);
});


// class Vertex a->b r color
// class


/*
onmousedown
onmousemove
onmouseup

*/

var isMouseDown = false;
var SELECTED_TYPE = 'line';
var LINE_COLOR = 'black';
var FILL_COLOR =  'transparent';
var CANVAS_COLOR = "#444";
var LINE_WIDTH = 2;
var MOUSE_DOWN = [0,0];

var obj = new History(); //storing all of the obbjects here

//MEASURES THE DISTANCE BETWEEN TWO GIVEN POINTS
function distance(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}

function render(e) {


    x = e.offsetX || 0;
    y = e.offsetY || 0;
    type = e.type || null;

    if (e.type=="mousedown")  {
        isMouseDown = true;
        MOUSE_DOWN = [e.offsetX,e.offsetY];
    }
    if (e.type=="mouseup")    isMouseDown = false;
    if (e.type=="mousemove" && !isMouseDown) return;

    ctxo.clearAll();
    ctx.clearAll();


    if(e.type=="mousemove") {
        switch (SELECTED_TYPE) {
            case 'line' : {
                drawVertex(new Vertex(...MOUSE_DOWN,x,y),ctx);
                break;
            }
            case 'circle' : {
                drawCircle(new Circle(...MOUSE_DOWN,distance(...MOUSE_DOWN,x,y)),ctx)
            }

        }
    }

    else if (e.type=="mouseup") {
        switch (SELECTED_TYPE) {
         case 'line':  obj.push(new Vertex(...MOUSE_DOWN,x,y,LINE_WIDTH,LINE_COLOR)); break;
         case 'circle':obj.push(new Circle(...MOUSE_DOWN,distance(...MOUSE_DOWN,x,y),LINE_WIDTH,LINE_COLOR,FILL_COLOR)); break;
        }
    }
    displayAll();


}

 
function displayAll(){

    // render all elements out wow
    for (let i=0;i<obj.pointer+1;i++) {

        switch (obj.data[i].type) {
            case 'vertex': drawVertex(obj.data[i],ctxo); break;
            case 'circle': drawCircle(obj.data[i],ctxo); break;

            default:break;
                // code
        }
    };
}

function undo(){
     obj.undo();
     displayAll();

}

function redo(){
     obj.redo();
     displayAll();
}


function drawVertex(vertex,canvas) {
    canvas.beginPath();
    canvas.lineWidth=vertex.width || LINE_WIDTH;
    canvas.strokeStyle=vertex.color || LINE_COLOR;
    canvas.moveTo(vertex.x1,vertex.y1);
    canvas.lineTo(vertex.x2,vertex.y2);
    canvas.stroke();

    return vertex;
}

function drawCircle(circle,canvas) {
    canvas.beginPath();
    canvas.lineWidth=circle.width || LINE_WIDTH;
    canvas.strokeStyle=circle.color || LINE_COLOR;
    canvas.fillStyle=circle.fill || FILL_COLOR;
    canvas.arc(circle.x,circle.y,circle.r,0,Math.TAU);
    canvas.fill();
    canvas.stroke();

    return circle;
}

class Vertex {
    constructor(x1,y1,x2,y2,width,color) {
        this.x1 = x1;
        this.y1 = y1
        this.x2 = x2;
        this.y2 = y2;
        this.width = width;
        this.color = color;
        this.type='vertex';
    }
}
class Circle {
    constructor(x,y,r,width,color,fill) {
        this.x=x;
        this.y=y;
        this.r=r;
        this.width = width;
        this.color = color;
        this.fill=fill;
        this.type="circle";
    }
}
class Ellipse {
    constructor(x,y,rX,rY) {

    }
}

Math.TAU = Math.PI*2;

/*
click to bring on top
drag and drop


*/
