/**
 * @author rontap

 * @package TAPCALK EXPRESS for Tapcalk 6
 * @requires CALKNEW.JS

 */

/*
 * Adds Sum and Product and other series functionality to tapcalk again.
 */
tcx.packages.push("serial");    //noting that the package has been loaded



tcx.sum = function(obj) {
  if (obj.type == "Array")   obj = {start:obj[0], end:obj[1], expresion:obj[2] };

  let value = 0;
  for (i= obj.start; i< obj.end ; i++) {
    value+=eval(obj.expression.replace(/x/g, i));
  }
  return value;
}
tcx.product = function(obj) {
  if (obj.type == "Array")   obj= {start:obj[0], end:obj[1], expresion:obj[2] };

  let value = 1;
  for (i= obj.start; i< obj.end ; i++) {
    value*=eval(obj.expression.replace(/x/g, i));
  }
  return value;
}

/* ADDING FUNCTIONS TO FNS */
Number.prototype.fact = function() {
  return Math.factorial(this);
}
