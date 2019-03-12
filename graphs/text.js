// Text Input Convert
function parseInfo(call,node ) {
    
    call = call.replace(/\[id\]/g , node.id)
               .replace(/\[x\]/g , node.name.x)
               .replace(/\[y\]/g , node.name.y)
               .replace(/\[subgraph\]/g , node.subgraph)
               .replace(/\[weight\]/g , node.weight)
               .replace(/\[edges\]/g , node.edges.size)
    return call
}

copiedNodeProps = null;
function copyProps( ofNode ) {
    copiedNodeProps = {...ofNode};
    pasteProps.disabled = false;
}
function pastePropsToCurrentNode() {
    propEl.weight = copiedNodeProps.weight;
    propEl.name.text = copiedNodeProps.name.text;

}