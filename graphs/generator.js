//generating
function genGraphFromInput() {

  loadInd.classList.add('load');
  setTimeout(()=>{
  genGraph({freqNode:Number(frqN.value)/100,
            tbreplaced:true,
            freqCon:Number(frqC.value)/1000,
            sizeNode:Number(weiN.value),
          sizeCon:Number(weiC.value)}).then(()=>loadInd.classList.remove('load'))
            generator.close();
        }  ,100);


}
Math.randSign = ()=> Math.randInt(3)-1;
genGraph = function(setup) {
  return new Promise((resolve,reject)=> {
    setup = setup || { //default graph
      tbreplaced:true,
      freqNode:.3,
      freqCon:.01,
      sizeNode:1, //0-30
      sizeCon:1,
    }

  graph = new Graph();


  sizeX=innerWidth;
  sizeY=innerHeight-toolBarHeight;
  getSizeNode = () => Math.abs(10-Math.randInt(setup.sizeNode)*Math.randSign());
  getSizeCon  = () => Math.abs(10-Math.randInt(setup.sizeCon )*Math.randSign());

  let maxNodes= Math.round((sizeX/(RADIUS*4))*(sizeY/(RADIUS*4)));
  let sumNodes = Math.round(maxNodes*setup.freqNode);
  let sumCons = Math.round(sumNodes*(sumNodes*setup.freqCon-1));

  //adding new nodes
  for (let i=0;i<sumNodes;i++) {
    do {
      xy = getxy();
    } while( getGNDistance(xy.x,xy.y) !== false )
    graph.addNode( new Node( graph.nodes.size , {...xy,text:null} ), false);
    graph.nodes.get(graph.nodes.size-1).weight=getSizeNode()
  }

  //adding new connections
  let maxTerr=0;
  for (let i=0;i<sumCons;i++) {
    let dept=1;
    el = Math.randInt(graph.nodes.size);
    let toE = getClosestNodes(el,Infinity).data;

    do {

     to = toE.splice(0,dept).random();
     dept+=2;

   } while( graph.nodes.get(el).edges.has(to))
    let conWeight = getSizeCon();
     graph.nodes.get( to ).edges.set( el , conWeight);
     graph.nodes.get( el ).edges.set( to , conWeight);

    }
    graph.validity = graph.validate(true);
    resolve(true);

  function getxy() {
    return {  x:Math.randInt(sizeX-RADIUS*4)+RADIUS*2,
              y:Math.randInt(sizeY-RADIUS*4)+RADIUS*2 };
  }


  render(null,{which:3});
})//promise
}//fn
function genGraphRandom() {

}
