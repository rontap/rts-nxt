class Graph {
  constructor() {
    this.edges=[];
    this.nodes=[];
    this.type='nxt.Graph';
  }
  addEdge(edges,b,isReverse) {
    if (edges.type == 'Array')  {
      if (edges.length > 0)
        if ( (edges[0]).type == 'Array') {
          this.addEdge( ...edges.pop(),,isReverse);
          this.addEdge( edges ,,isReverse);
        }
        else this.addEdge( ...edges ,isReverse);
    }
    else {
      if (is )
      this.edges.push([edges,b]);
    }
  }
  addNode(Node) {
    //if (Node) {
        this.nodes.push(Node.name);
        Node.to.map( x => this.addEdge(Node.name,x) );
        Node.to.map( x => this.addEdge(x,Node.name) );
    }
  }
}


class Node {
  constructor(name,connecting) {
    this.type="nxt.Node";
    this.name = name;
    this.to = connecting;
  }
}
