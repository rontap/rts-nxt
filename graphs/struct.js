// Data structure modifying
should = {
  connections : false,
  nodes : false
};

function update() {
  if (should.connections) { //updated a connection
    should.nodes = false
  }

  if (should.nodes) {
    should.nodes = false
  }
 }
