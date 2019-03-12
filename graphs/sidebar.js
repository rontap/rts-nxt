// property settings
var sidebar ={};
var propEl ;
var propLine = [];
sidebar.showLine = function(first,second) {
  if (first === false) closeWindow('line');
  else openWindow('line');
  propLine = [first,second];
  let firstNode  = graph.nodes.get( propLine[0])
  let secondNode =graph.nodes.get( propLine[1])
  $('#linkRef').innerHTML=`Connection from <a onclick=sidebar.showEl(graph.nodes.get(${firstNode.id}),'#properties') nxt>${firstNode.name.text == null ? firstNode.id  : firstNode.name.text}</a> to <a onclick=sidebar.showEl(graph.nodes.get(${secondNode.id}),'#properties') nxt>${secondNode.name.text == null ? secondNode.id  : secondNode.name.text}</a>`;
  rangeLP.value = textLP.value = graph.nodes.get( propLine[0]).edges.get( propLine[1]);


}
sidebar.toggleLineWidth = function(el) {
  el.classList.toggle('on');
  //---
}
sidebar.updateLineWidth = function(val) {

  val = Number(val);
  textLP.value= val  ;
  rangeLP.value=val  ;
  graph.nodes.get( propLine[0]).edges.set( propLine[1] ,val);
  graph.nodes.get( propLine[1]).edges.set( propLine[0] ,val);
}
sidebar.removeCurrLine = function() {
  graph.nodes.get( propLine[0]).edges.delete( propLine[1]);
  graph.nodes.get( propLine[1] ).edges.delete(propLine[0]);
  closeWindow('line');
}
sidebar.showEl = function(el,motherId) {
  setTimeout(()=>{
  propEl = el;
  //console.log(el);
  $(motherId).innerHTML ='';


  openWindow('sidebarProp');


  Object.keys(el).map( (key) => {
      if (el[key] != null) {
        if (el[key].type == 'Object') {
            Object.keys(el[key]).map( (keyName) => {
             
              if (graphPV.wp == graphProps[key][keyName]) // special parsing
              $(motherId).innerHTML+=`<span class="elem"><span>${keyName}</span><input value=${String(el[key][keyName])} onkeyup="sidebar.updateElName('${keyName}',this.value)" class="non-expand"><i class="inPropIcon material-icons">tune</i></span>`;
              else 
              $(motherId).innerHTML+=`<span class="elem"><span>${keyName}</span><input value=${el[key][keyName]} onkeyup="sidebar.updateElName('${keyName}',this.value)"></span>`;

            });
        }
        else  if (key!='edges'){
            if (graphProps[key] == graphPV.w)
            $(motherId).innerHTML+=`<span class="elem"><span>${key}</span><input value=${el[key]} onkeyup="sidebar.updateEl('${key}',this.value)"></span>`;
            else if (graphProps[key] == graphPV.r)
            $(motherId).innerHTML+=`<span class="elem"><span>${key}</span><input value=${el[key]} disabled></span>`;
            else if (graphProps[key] == graphPV.wp)
            $(motherId).innerHTML+=`<span class="elem"><span>${key}/span><input value=${el[key]} onkeyup="sidebar.updateEl('${key}',this.value)"></span>`;



        }
      }
  });
},0);//settimeout
}

sidebar.updateEl = (el,to) =>   propEl[el]=to;
sidebar.updateElName = (el,to) =>   propEl.name[el]=to;

var highlightChanged = false;
sidebar.highlightChanged = function(toggle) {
  if (toggle) {
    saveElems.style.opacity=1;
    highlightChanged = true;
  }
  else {
    highlightChanged = false;
    saveElems.style.opacity=0;
  }
 

}


//values
//R-readable W-writable H-hidden

const graphPV = {
  r : 'read',
  w : 'read-write',
  wp :'read-write-rich',
  h : 'hidden'
}
const graphProps = {
  id:    graphPV.r,
  name:{
    x:   graphPV.w,
    y:   graphPV.w,
    text:graphPV.wp
  },
  subgraph:graphPV.r,
  type:    graphPV.h,
  weight:  graphPV.w
}
sidebar.highlightChanged(false);