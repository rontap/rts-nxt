tcx.packages.push("evalJS");
/**
 * @author rontap

 * @package TAPCALK EXPRESS for Tapcalk 6
 * @requires implemented tcx
 * @description Mathematical eval. Not JS Secure but catchable errors
 */


// JS EVALING MATH STUFF
tcx.allowedChar = function(call) {
  return (call.replace(/\/|\+|\-|\%|[0-9]|\*|\.|\,|\(|\)|\!|cos|sin|tan|random|randInt|dice|coin|floor|round|sqrt|rt|choose|PI|E/g,"").length > 0);
}
tcx.eval = function(call) {

    //checking for valid input
    if ( tcx.allowedChar(call) )
    return {  valid:false, error:'Invalid Input'  }

    //splitting number cores
    splitted = call.split(/[/+\-%*.\,]/g);
    protoSplitted = splitted.slice();

    for (i=0; i<splitted.length;i++) {
      if (splitted[i].has('PI')) { splitted[i] = splitted[i].replace('PI','Math.PI'); }
      if (splitted[i].has('E')) {  splitted[i] = splitted[i].replace('E','Math.E') }

      if (splitted[i].has('!')) { splitted[i]='Math.factorial(' + splitted[i].slice(0,splitted[i].length-1) +')'}
      else if (splitted[i].has(/cos|sin|tan|floor|round|sqrt/g)) { splitted[i]='Math.' + splitted[i] }
      if (splitted[i].has(/[^sq]rt/)) {
        temp=splitted[i].split('rt');
        console.info(temp);
        splitted[i]='Math.pow('+temp[1]+',1/'+temp[0]+')';
      }
      if (splitted[i].has('random'))  { splitted[i]='Math.random()*' + splitted[i].slice(11,splitted[i].length)}
      if (splitted[i].has('randInt')) { splitted[i]='Math.randInt(' + splitted[i].slice(13,splitted[i].length)}
      if (splitted[i].has('dice'))    { splitted[i]='Math.randInt(6)' }
      if (splitted[i].has('coin'))    { splitted[i]='Math.randInt(2)' }
      if (splitted[i].has('choose'))  {
        temp=splitted[i].split('choose');
        console.info(temp);
        splitted[i]='Math.choose('+temp[0]+','+temp[1]+')';
      }

    }


    //parsing everything back together
    var parsed = "";
    var splitPointer = 0;
    for (i=0; i<call.length;i++) {
        if (call[i].has(/[/,+,\-,%,*,.,\,]/g)) {
          parsed+=call[i];
          console.log(call[i]);
        }
        else {
          parsed+=splitted[splitPointer];
          i+=protoSplitted[splitPointer].length-1;
          splitPointer++;
        }
    }

console.log(splitted,parsed);
    //checking for evaluable input
    try   {  curr = eval(parsed); }
    catch(e) { return { valid:false,  error:e } }

    if (isNaN(curr)) return { valid:false, error:'NaN Result' };

    //default, valid case
    return {
      value : curr,
      valid : true
    }
};



//test cases
String.prototype.null = '';
Number.prototype.null = 1;
