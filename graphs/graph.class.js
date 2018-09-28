class Graph {
    constructor(Node) {

        this.nodes = new Map(/*[...Node]*/);
        this.subgraphCount = 0;
        this.validity = undefined;
        this.characteristics = [];
        

        this.type = "Graph";

        return this;
    }
    addNode(Node) { // overriding by default;
        this.nodes = this.nodes.set(Node.id, Node);
        this.validity = this.validate();

        return this;
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
            console.log(currNode);
           if (graph.nodes.get(currNode).subgraph == null) {
               graph.nodes.get(currNode).subgraph  = representedSubgraph;
               graph.isConnected(graph.nodes.get(currNode), representedSubgraph);
           }
           else {
               //we meet an other node, which is already in a subgraph
               //graph.mergeSubgraphIds(currNode.subgraph , representedSubgraph);
           }
        });
        //this.isConnected();

    }

}
