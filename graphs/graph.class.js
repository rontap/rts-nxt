class Graph {
    constructor(Node) {

        this.nodes = new Map(/*[...Node]*/);
        this.subgraphCount = 0;
        this.validity = undefined;
        this.characteristics = [];


        this.type = "Graph";

        return this;
    }
    addNode(Node,checking =true) { // overriding by default;
        this.nodes = this.nodes.set(Node.id, Node);
        if (checking)  this.validity = this.validate();
        else this.validity = false;

        return this;
    }
    fromJS(jsGraph) {//getting data from regural Object
      this.nodes = new Map(jsGraph.nodes);
      this.characteristics = jsGraph.characteristics;
      this.validity = this.validate();
    }
    toText() {//converting to CSV text

    }
    createNode() {
        // later
    }
    removeNode() {
      //removing a node and all of its
    }
    validate(forceCall) {
        let force = forceCall || false;
          //when force called, it will automatically remove all invalid nodes and connections
        let valid = true;
        let graph = this;
        this.nodes.forEach( function(currNode,key) { // this is a single node
            currNode.edges.forEach( function(val, currEdge) { //this is a single connection
                if (graph.nodes.has(currEdge) == false)
                    force ? currNode.edges.delete(currEdge) : valid=false;
                });
        });

        this.subgraphCount=0;
        this.clearSubgraphs();
        this.getDirectedSubgraph();
        return valid;
    }
    getSubgraphs() {
        return "arrayOfGraphs";
    }
    
    copy() {

    }
    clearSubgraphs() {
        this.nodes.forEach( function(currNode,key) {
            currNode.subgraph = null;
        });
    }
    mirrorConnections() {
        //will transform the graph to a directed graph
        let graph = this;
        this.nodes.forEach( function(currNode,key) {
            // this is a single node

            currNode.edges.forEach( function(currWeigth, currEdge) {
                console.log(currNode,currEdge);
                graph.nodes.get( currEdge ).edges.set( currNode.id , currNode.edges.get(currEdge))

            });
        })
    }
    getDirectedSubgraph() {
        let graph = this;
        this.nodes.forEach( function(currNode) {
           if (currNode.subgraph == null)
            graph.isConnected(currNode, graph.subgraphCount++ );
        });
    }
    isConnected(Node,representedSubgraph) {
        let graph = this;
        Node.edges.forEach( function(key, currNode) {

           if (graph.nodes.get(currNode).subgraph == null) {
               graph.nodes.get(currNode).subgraph  = representedSubgraph;
               graph.isConnected(graph.nodes.get(currNode), representedSubgraph);
           }
           else {
               //we meet an other node, which is already in a subgraph
               //graph.mergeSubgraphIds(currNode.subgraph , representedSubgraph);
           }
        });
    }
        //this.isConnected();
    getRoute(Node1,Node2) {
        if (Node1.subgraph != Node2.subgraph) return false;
        //if they are not in the same subgraphs, we know there is no connection
        dijkstra(Node1,Node2);

    }
    //getValami() {}
    dijkstra(sourceNode,targetNode) {
        
        let Q = [];

        this.nodes.forEach((el) => {
            el._dist = Infinity;
            el._prev = undefined;
            Q.push(el);
        })
        sourceNode._dist = 0;

        while (Q.length > 0) {
            let u = Q.sort((a,b) => (a._dist > b._dist) ? -1 : 1).pop()
    
           if (u == targetNode) {
               this.backTrackDijkstra(u,[])
                
                return (this.trackback).concat(sourceNode.id);
           }

            u.edges.forEach((edgeWeight,edgeId) => {
                let alt = u._dist + edgeWeight;
                if (alt < this.nodes.get(edgeId)._dist) {
                    this.nodes.get(edgeId)._dist = alt;
                    this.nodes.get(edgeId)._prev = u;
                }
            })
        }

        console.log(Q);
    }
    backTrackDijkstra(fromNode,chain) {
       
        if (fromNode._prev == undefined) { 
            this.trackback = chain;
        }
        else {
            chain.push(fromNode.id)
            this.backTrackDijkstra(fromNode._prev,chain)
        }
        
    }


    getGroup(by) {
      let groupable = Object.keys( {...graph.nodes.values().next().value} );
      //get all of the groups available
      let groups = new Map();
      this.nodes.forEach(val=>{
          if (groups.has(val[by])) {
            let t = [...groups.get(val[by]),val];
            groups.set(val[by],t) //adding to the chain
          }
          else groups.set(val[by],[val]);
      });
      return groups;
    }

}




//do not tács
Map.prototype.sort = () => new Map([...this.entries()].sort((a, b) => b[1] - a[1]));

Map.prototype.min = () => Array.from(map).sort((x,y) => x[1]>y[1])[0];
Map.prototype.max = () => Array.from(map).sort((x,y) => x[1]<y[1])[0];
