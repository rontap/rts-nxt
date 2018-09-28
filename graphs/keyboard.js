function handleKeys(e) {
  switch (e.code) {
    case 'Escape' : render(null,{which:3}); break;
    case 'Delete' : graph.nodes.delete( clickArea.id ); graph.validate(true); render(null,{which:3}); break;
  }
}
