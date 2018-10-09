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
  $('#linkRef').innerHTML=`Connection from ${firstNode.name.text == null ? firstNode.id  : firstNode.name.text} to ${secondNode.name.text == null ? secondNode.id  : secondNode.name.text}`;
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
  propEl = el;
  //console.log(el);
  $(motherId).innerHTML ='';


  openWindow('sidebarProp');
  Object.keys(el).map( (key) => {
      if (el[key] != null) {
        if (el[key].type == 'Object') {
            Object.keys(el[key]).map( (keyName) => {
              $(motherId).innerHTML+=`<span class="elem"><span>${keyName}</span><input value=${el[key][keyName]} onkeyup="sidebar.updateElName('${keyName}',this.value)"></span>`;

            });
        }
        else  if (key!='edges'){
            if (graphPropWritable[key])
            $(motherId).innerHTML+=`<span class="elem"><span>${key}</span><input value=${el[key]} onkeyup="sidebar.updateEl('${key}',this.value)"></span>`;
            else
            $(motherId).innerHTML+=`<span class="elem"><span>${key}</span><input value=${el[key]} disabled></span>`;


        }
      }
  });
}

sidebar.updateEl = (el,to) => {
  //console.log(el,to);
  propEl[el]=to;
}

sidebar.updateElName = (el,to) => {
  //console.log(el,to);
  propEl.name[el]=to;
}

const graphPropWritable = {
  id:false,
  name:{
    x:true,
    y:true,
    text:true
  },
  subgraph:false,
  type:false,
  weight:true
}
