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
  download:(type='Save')=>{
    let a = window.document.createElement('a');
    if (type=="Save") {

      a.href = window.URL.createObjectURL(new Blob([JSON.stringify(graph,nxt.mapper)], {type: 'text/text'}));
      a.download = 'Graphene-' + new Date().getTime() + '.graph.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (type="Image/Png") {

    }
  },

  export:()=> store.download(DOWNLOAD),
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


fullscreen = ( a = document.body ) =>
  a.requestFullscreen ?           a.requestFullscreen()
  : a.mozRequestFullScreen ?      a.mozRequestFullScreen()
    : a.webkitRequestFullscreen?  a.webkitRequestFullscreen()
      : a.msRequestFullscreen ?   a.msRequestFullscreen()
       : false;

isFullscreen = ( a = document ) =>
  a.IsFullscreen ?           a.IsFullscreen
  : a.mozIsFullScreen ?      a.mozIsFullScreen
    : a.webkitIsFullScreen?  a.webkitIsFullScreen
      : a.msIsFullScreen ?   a.msIsFullScreen
       : false;

 exitFullscreen = ( a = document ) =>
   a.exitFullscreen ?           a.exitFullscreen()
   : a.mozExitFullscreen ?      a.mozExitFullScreen()
     : a.webkitExitFullscreen?  a.webkitExitFullscreen()
       : a.msExitFullscreen ?   a.msExitFullscreen()
        : false;

toggleFullscreen = (a = isFullscreen()) => a  ? exitFullscreen() : fullscreen()
