function allowDrop(ev) {
  ev.preventDefault();
 
}

function drag(ev) {
  
}

function drop(ev) {
  action(true);
}
let currDrag = null;

function hugeCardTouchEnd() {
  if (currDrag == 'coin') action(true);
}