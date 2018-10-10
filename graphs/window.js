// handling window functions

window.onunload=()=>delete localStorage[''+NAME+VERSION+'Lock'];

window.onresize=()=>{setupCanv();render(null,{which:3});}

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
    return false;
    //DISABLED FOR NOW
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
