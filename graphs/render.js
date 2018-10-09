// MAIN RENDERING FUNCTION

function render(type,e) {//main rendering funcion

  if (type=='click') isMouseDown = true;
  else if (type=='up')isMouseDown=false;

  if (type=='down' && !isMouseDown) return;

  if (e.which == 3) {
    if (type=='click') e.preventDefault();
    type='alt';
  }

  let x = e.offsetX + translateCoords[0] || 0;
  let y = e.offsetY + translateCoords[1] || 0;

//->
  if (MODE == 'Move' &&type!='alt') translateRender(type,e,x,y);
  //drawing connection lines
  if (lastClickedElement!=null && type=="down" && MODE == "Place") {
      if (e.altKey) { //moving a node
      /*if(getGraphNodeDistance(x,y)==false ||
         getGraphNodeDistance(x,y)==lastClickedElement)// keeping distance not implemented
        {*/
          lastClickedElement.name.x = x;
          lastClickedElement.name.y = y;
          changeStruct();
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
    updateShortcutKeys(type);
    //console.log(clickArea);


  if (type=='click' && clickArea == false  && MODE=='Place') {
      graph.addNode( new Node( graph.nodes.size , {x:x,y:y,text:null} ));
      changeStruct();
  }

  ctx.clearAll();
  //rendering everything out
  if (clickArea.type == 'Node' && type=='up' && drawingLine && MODE == "Place") {
      // connecting two things

      if(clickArea!=lastClickedElement){
         // toggling
         if ( ! graph.nodes.get( lastClickedElement.id ).edges.has( clickArea.id ) ) {
           graph.nodes.get( lastClickedElement.id ).edges.set( clickArea.id , 10);
           graph.nodes.get( clickArea.id ).edges.set( lastClickedElement.id , 10);
           changeStruct()
         }
         sidebar.showLine(lastClickedElement.id,clickArea.id);

         if (e.ctrlKey) sidebar.removeCurrLine();

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
      //
      mainColor = renderSelectedColor(val);

      if (val == clickArea && type!='up') {//clicking on elementt
        ctx.fillStyle = 'red';
        sidebar.showEl(val,'#properties');
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

      let cRadius = (RADIUS / 10) * val.weight;
      ctx.arc(val.name.x,val.name.y,cRadius,0,2*Math.PI);
      ctx.fill();


      if (val.name.text != null) {
        ctx.fillStyle="#222";
        ctx.font = '12px sans-serif';
        ctx.textAlign='center';

        ctx.fillText(val.name.text, val.name.x, val.name.y+val.weight*2.5);
      }


      ctx.stroke();

      val.edges.forEach( (w,edgeId) => {
        connectedEdge = graph.nodes.get(edgeId);
        //console.log(connectedEdge,edgeId);
        ctxbg.beginPath();

        if (CONNECTION_MODE=="Manual") {
          ctxbg.lineWidth= (val.edges.get(edgeId) + 1)/5;
        }
        else {
          dst =  distance(val.name.x,connectedEdge.name.x,val.name.y,connectedEdge.name.y,true) ;
          console.log(dst);
          let temp = 10 + (30 - Math.sqrt(dst)*5)/5;
          temp = (temp<4) ? 3 : temp;
          val.edges.set(edgeId,temp);
          ctxbg.lineWidth = temp;
          changeStruct();
        }

        if (val == clickArea) {
            ctxbg.lineWidth=6; //currSelNode
            ctxbg.strokeStyle=MAT_COLORS['blue-500'];
        }
        else {
          ctxbg.strokeStyle="#222222"
        }

        ctxbg.moveTo(val.name.x,val.name.y);
        ctxbg.lineTo(connectedEdge.name.x,connectedEdge.name.y);
        //later adding width (weight)

        ctxbg.stroke();
      });
  });


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
       if ( distance(currX,x,currY,y,val.weight) == -1) /*pithagoras*/
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
