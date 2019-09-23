// circle detection and calculation
// usage:
// - circle.calculate();
// - returns: array of connections that form a circle
// limitations: duplicates occur.

circle = {};

circle.calculate = function() {
  circle.subGraphHas = new Set();
  let sgs = graph.getGroup('subgraph'); //getting all subgraphs
  circle.data = [];
  graph.nodes.forEach(val => { //resetting
    delete val.circle;
    val.inCircle = false;
  });
  sgs.forEach((val,key)=>{
    if (key!==null) { //skip ones without subgraph.
      val[0].circle=[/*literal starting point*/];
      circle.dfs(val[0],[]); //starting at any node
    };
  });
  return circle.asPairs();
};

circle.dfs = function(node,route,parentNodeEl=-1) { // depth first search

  node.edges.forEach( function(key, currNodeId) {
    currNode = graph.nodes.get(currNodeId);
      if (currNode.circle == undefined) {
        // it has not been visited so far
        currNode.circle = route.concat(node.id);
        circle.dfs(currNode, route.concat(node.id) , node);
        // visit it
      }
      else if (currNodeId == parentNodeEl.id || parentNodeEl == -1) {
        //it has been visited but its the parent
      }
      else {
        // meeting an other node
        //console.log([...route,node.id, currNode.id],'VS',[...currNode.circle])
        // XOR-ing out the previous route
        circle.data.push([...route,node.id, currNode.id].xor([...currNode.circle]));
      }

  });
}

circle.data = [];
circle.subGraphHas = new Set();

circle.asPairs = function(data = circle.data) {
  //return circle data as connection pairs
  let pairs = [];
  for (let h = 0; h<data.length; h++) {
    for (let i = 0; i<data[h].length-1 ; i++) {
      graph.nodes.get(data[h][i]).inCircle = true;
      graph.nodes.get(data[h][i+1]).inCircle = true;
      circle.subGraphHas.add( graph.nodes.get(data[h][i]).subgraph);
      pairs.push([data[h][i],data[h][i+1]]);
    }
  }

  return pairs;
}


Array.prototype.xor = function(to) {
  return to.concat(this).filter( val => to.has(val) ^ this.has(val))
}
