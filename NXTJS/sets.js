  /**
   * NXT JS / Maths / Set expansion class
   * GNU GPL v3 Licence.
   * @date: 2017/12/01
   * @requirements: jsplus.js build 1322
   * @author: rontap
   *
   * description: extends JS SETS with math functionality
   **/
Array.prototype.normalise = function() {
    return nxt.setNormalisation( this );
}
Array.prototype.elements = function() {
   return this;
}
Array.prototype.flatout = function()  {
  return this.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

//sets behave like arrays but with the main difference of having one value only once.
//when a Set is created, it can be manipulated with Arrays, and can return arrays.
//arrays have a new function called normalise, which effectively converts them into non-class sets
function toSets() {
  console.log(arguments);
  let temp = arguments.flatout();
  for (i=0;i<arguments.length-1;i++) {
    temp.push( arguments[i] )
  }
  return new Sets( temp ).elements();
}

class Sets {
  normalise() {
    return this.get =  nxt.setNormalisation(this.get);
    //extending the normalisation method of sets and arrays
  }
  elements() {
    return this.get
  }
  constructor(call) {
    this.get = call;
    this.normalise(call);
    this.variableType = "NXT.JS Set"
  }
  add(call) {
    this.get = this.get.concat(call);
    this.normalise();
  }
  remove(call) {
    if ( this.get.indexOf(call) != -1)  this.get.splice( this.get.indexOf(call) , 1);
  }
  includes(element) {
    if (this.get.indexOf(element) != -1) return true
    else return false
  }
  union(set /*type set or array*/) {
    this.get = set.elements();
    return this.normalise();
  }
  intersect(set /*type set or array*/) {
    let temp = [];
    for ( i = 0; i<this.get.length; i++) {
      if ( set.includes(this.get[i]))  temp.push( this.get[i] );
    }
    this.get = temp;
    return this.normalise();
  }

















  //


}
