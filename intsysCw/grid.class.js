class Grid {
  constructor(x,y,start,...blocks) {
    //error catching
    if (start[0]>x || start[1]>y) throw Error('Invalid Dimensions');


    this.x=x || 3;
    this.y=y || 3;
    this.agent = start;
    this.field=[];
    for (let i=0;i<x;i++) {
      this.field[i] = [];
      for (let j=0; j<y;j++) {
        this.field.xy([i,j], new Tile('empty'));
      }
    }
    this.field.xy(start, new Tile('agent'))
    blocks.map(x => this.field.xy(x, new Tile('block')))
  }
  moveTo(a,b) {
    if (Math.abs(a)+Math.abs(b) != 1) throw Error('Invalid Move');

    let temp = this.field.xy(a);
    this.field.xy(a, this.field.xy(b));
    this.field.xy(b, temp);
  }
  move(direction) {
    switch (direction) {
      case 'up': break;
      case 'left': break;
      case 'right': break;
      case 'down': break;
      default: throw Error('Invalid Direction');
    }
  }

}


Array.prototype.xy = function(n,to=null) {
  if (to!=null) return  this[n[0]][n[1]]=to;
  return this[n[0]][n[1]];
}
