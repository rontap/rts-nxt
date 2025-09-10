class Graph {
    constructor(Node) {

        this.nodes = new Map(/*[...Node]*/);
        this.subgraphCount = 0;
        this.validity = undefined;
        this.characteristics = [];


        this.type = "Graph";

        return this;
    }

    reset() {
        this.nodes = new Map();
        this.subgraphCount = 0;
        this.validity = undefined;
        this.characteristics = [];
    }

    addNode(Node, checking = true) { // overriding by default;

        this.nodes = this.nodes.set(Node.id, Node);
        if (checking) this.validity = this.validate();
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
        /**
         * @type {boolean}
         */
        let force = forceCall || true;
        //when force called, it will automatically remove all invalid nodes and connections
        // 11b makes this on by default.
        let valid = true;
        let graph = this;
        this.nodes.forEach(function (currNode, key) { // this is a single node
            currNode.edges.forEach(function (val, currEdge) { //this is a single connection
                if (graph.nodes.has(currEdge) == false)
                    force ? currNode.edges.delete(currEdge) : valid = false;
            });
        });

        this.subgraphCount = 0;
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
        this.nodes.forEach(function (currNode, key) {
            currNode.subgraph = null;
        });
    }

    mirrorConnections() {
        //will transform the graph to a directed graph
        let graph = this;
        this.nodes.forEach(function (currNode, key) {
            // this is a single node

            currNode.edges.forEach(function (currWeigth, currEdge) {
                //console.log(currNode,currEdge);
                graph.nodes.get(currEdge).edges.set(currNode.id, currNode.edges.get(currEdge))

            });
        })
    }

    getDirectedSubgraph() {
        let graph = this;
        this.nodes.forEach(function (currNode) {
            if (currNode.subgraph == null)
                graph.isConnected(currNode, graph.subgraphCount++);
        });
    }

    isConnected(Node, representedSubgraph) {
        let graph = this;
        Node.edges.forEach(function (key, currNode) {

            if (graph.nodes.get(currNode).subgraph == null) {
                graph.nodes.get(currNode).subgraph = representedSubgraph;
                graph.isConnected(graph.nodes.get(currNode), representedSubgraph);
            } else {
                //we meet an other node, which is already in a subgraph
                //graph.mergeSubgraphIds(currNode.subgraph , representedSubgraph);
                // [small bug] subgraph IDs may not be strictly growing
            }
        });
    }

    //this.isConnected();
    getRoute(Node1, Node2) {
        if (Node1.subgraph != Node2.subgraph) return false;
        //if they are not in the same subgraphs, we know there is no connection
        dijkstra(Node1, Node2);

    }

    //getValami() {}
    dijkstra(sourceNode, targetNode, shouldTarget = true) {
        // dijkstra pathfinding algorithm
        // source and target node are Nodes
        // shouldTarget = true means we search for a path between them
        //                false we build a tree from that
        // @returns path and this.trackback 
        let Q = [];

        // setting ._ variables
        this.nodes.forEach((el) => {
            if (el.subgraph == sourceNode.subgraph) {
                el._dist = Infinity;
                el._prev = undefined;
                delete el.tree;
                delete el.treeRoot;
                Q.push(el);
            }

        })
        sourceNode._dist = 0;
        sourceNode.depth = 0;


        // while we have elements in the array
        while (Q.length > 0) {
            // getting the node with the closest distance fn
            let u = Q.sort((a, b) => (a._dist > b._dist) ? -1 : 1).pop()

            if (u == targetNode && shouldTarget) {
                // only applicable if we are searching for a path
                this.backTrackDijkstra(u, [])
                return (this.trackback).concat(sourceNode.id);
            }

            u.edges.forEach((edgeWeight, edgeId) => {
                // selected node gets updated distance values
                let alt = u._dist + edgeWeight;
                if (alt < this.nodes.get(edgeId)._dist) {
                    this.nodes.get(edgeId)._dist = alt;
                    this.nodes.get(edgeId)._prev = u;
                    this.nodes.get(edgeId).depth = u.depth + 1;
                }
            })
        }

        console.log(Q);
        // returns the Graph only if we are not searching for a path

        this.nodes.forEach((el) => {
            //console.log(el);
            if (el.subgraph == sourceNode.subgraph) {
                if (el._prev != undefined) {
                    let specialEdgeWeight = el.edges.get(el._prev.id);
                    el.edges = new Map().set(el._prev.id, specialEdgeWeight);
                } else {
                    el.edges = new Map();
                }
            }

        })
        this.mirrorConnections();
        return this;
    }

    backTrackDijkstra(fromNode, chain) {
        // backtracking from end node all the way up to sourceNode
        if (fromNode._prev == undefined) {
            this.trackback = chain;
        } else {
            chain.push(fromNode.id)
            this.backTrackDijkstra(fromNode._prev, chain)
        }

    }


    getGroup(by) {
        let groupable = Object.keys({...graph.nodes.values().next().value});
        //get all of the groups available
        let groups = new Map();
        this.nodes.forEach(val => {
            if (groups.has(val[by])) {
                let t = [...groups.get(val[by]), val];
                groups.set(val[by], t) //adding to the chain
            } else groups.set(val[by], [val]);
        });
        return groups;
    }

}


//do not tács
Map.prototype.sort = () => new Map([...this.entries()].sort((a, b) => b[1] - a[1]));

Map.prototype.min = () => Array.from(map).sort((x, y) => x[1] > y[1])[0];
Map.prototype.max = () => Array.from(map).sort((x, y) => x[1] < y[1])[0];
