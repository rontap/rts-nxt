// conversion
function toTree() {
    propEl = propEl || _gid(0);
    graph.dijkstra( propEl , _gid(0) ,false);
    propEl.treeRoot = true;
    circle.calculate();
    render(null,{which:3});
    $('body').classList.remove('node-selection')
}