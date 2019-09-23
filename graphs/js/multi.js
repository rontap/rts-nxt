// multi selection module

ms = {}; //master multiselect object

ms.selected = new Set(); //array of IDS

ms.update = function() {
  ms.sumstore = [[],[],[],[],[]];
  box = (data,title,props=[]) => {
    title = title || data;
    data = isNaN(data) ? String(data) : data;

    return `<d dbox ${props.toString().replace(/,/g,' ')} title='${title}'>${['NaN','',NaN,undefined,null].has(data) ? '-' : data}</d>`
  }
  //updating selection
  let hasRun = false;
  temp='';
    msCurrList.innerHTML=`<span class='elem head'>${
      box('ID','ID of Node',['montserrat'])+
      box('Text','Displayed Name',['montserrat'])+
      box('Weight','Weight of Node',['montserrat'])+
      box('No. Edges','Number of Edges from Node',['montserrat'])+
      box('Avg Weight','Average weight of nodes',['montserrat'])+
      box('Subgraph','Subgraph Member',['montserrat'])}</span>`;

  ms.selected.forEach( id => {
    let e = graph.nodes.get(id);
    if (e != undefined) {
      let en = e.name;
      let edgeSum =0;

      e.edges.forEach( val => edgeSum+=val   );
      temp+=`<span onclick="sidebar.showEl(graph.nodes.get(${e.id}),'#properties')" class='elem'>${box('&nbsp;&nbsp;'+e.id) +
                                  box(en.text ) +
                                  box(e.weight)+
                                  box(e.edges.size)+
                                  box(edgeSum/(e.edges.size),'Sum:'+edgeSum)+
                                  box(e.subgraph)}</span>`
     ms.summary([id,en.text,e.weight,e.edges.size,edgeSum/(e.edges.size)])
     hasRun = true;
     }
  })

  if (hasRun) ms.getsum();
  msCurrList.innerHTML+='<div id="multirows">'+temp+'</div>';
  }
ms.sumstore = [[],[],[],[],[],[]];
ms.summary = function(arr) {
  for (let i=0; i<arr.length; i++) {
    ms.sumstore[i].push(arr[i]);
  }
}
ms.getsum = function() {
  let temp='';
  let temp2='';

    let arr = ms.sumstore;

    temp+=`<span class='elem'>${box('SUM:','Sum of All Selected Node Values',['montserrat']) +
                                box(Math.sum(arr[1])) +
                                box(Math.sum(arr[2]))+
                                box(Math.sum(arr[3]))+
                                box(Math.sum(arr[4]),'Sum:')+
                                box('N/A','Not Applicable Here')}</span>`;


    temp2+=`<span class='elem'>${box('AVG:','Average of All Selected Node Values',['montserrat']) +
                                box(Math.avg(arr[1])) +
                                box(Math.avg(arr[2]))+
                                box(Math.avg(arr[3]))+
                                box(Math.avg(arr[4]),'Sum:')+
                                box('N/A')}</span>`;


  msCurrList.innerHTML+=temp+temp2;
}
ms.flush = function() {
  ms.selected = new Set();
}
