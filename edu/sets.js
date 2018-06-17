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
Array.prototype.merge = function() {
  return [].concat.apply([], this);
}

//sets behave like arrays but with the main difference of having one value only once.
//when a Set is created, it can be manipulated with Arrays, and can return arrays.
//arrays have a new function called normalise, which effectively converts them into non-class sets
function toSets() {
  console.log(arguments);
  let temp = arguments[0].flatout();
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
    this.type = "Sets";
  }
  add(call) {
    return new Sets( this.get.concat(call) );
  }
  remove(call) {
    if ( this.get.indexOf(call) != -1)
      return new Sets( this.get.splice( this.get.indexOf(call) , 1) );
    else return null;
  }
  includes(element) {
    if (this.get.indexOf(element) != -1) return true
    else return false
  }
  union(set /*type set or array*/) {
    return new Sets( this.get.concat(set.elements()) );
  }
  intersect(set /*type set or array*/) {
    let temp = [];
    for ( i = 0; i<this.get.length; i++) {
      if ( set.includes(this.get[i]))  temp.push( this.get[i] );
    }
    return new Sets(temp);
  }
  diff(set /*type set or array*/) {
    let temp = this.get.filter( function( el ) {
      return set.get.indexOf( el ) < 0 ;
    });
    return new Sets(temp);
  }
  xdiff(set /*type setonly*/) {
    return (set.diff(this)).union(this.diff(set));
  }


  //


}
