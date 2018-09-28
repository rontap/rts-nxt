class Node {
    constructor(id,name,edges) {
        this.id = id;
        this.name = name   || id;
        this.edges = new Map(edges) || new Map(); //Edges is a MAP : Id => Weight
        this.subgraph = null;
        this.type = "Node";
        this.weigth;

    }
    addEdge(to,weight) {
        if (to.type=="Map") {
            // weight is boolean which determines whether to override original edges
            // true -> Override
            if (weight) this.edges = new Map([...this.edges,...to]);
            else        this.edges = new Map([...to,...this.edges]);
        }
        else  {
            this.edges.set(to,weight);
        }

        return this.edges;
    }



}
