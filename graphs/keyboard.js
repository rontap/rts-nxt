function handleKeys(e) {
  switch (e.code) {
    case 'Escape' : render(null,{which:3});
                    $('#properties').innerHTML ='';
                    closeWindow('line');
                    closeWindow('sidebarProp');
                    FORCE_DND_END=true;
                    break;

    case 'Delete' : graph.nodes.delete( clickArea.id );
                    graph.validate(true); render(null,{which:3});

                    break;
  }
}


function updateShortcutKeys(type) {
  //updating shortcut key help
  let temp = '<i>ESC</i> to deselect. ';
  if ( MODE == 'Place' && clickArea.type == 'Node') {
    temp+=" <i>DEL</i> to delete. <i>Click</i> to add new Node. ";
  }
  if (MODE == 'Place' &&clickArea==false && type=='down') {
    temp+="<i>Drag to Node</i> to form connection. ";
  }
  if (MODE == 'Place') {
    temp+="<i>ALT+Drag</i> to move. ";
  }


  $('#shortcutHelp').innerHTML = temp;
}
