//JS EMCASCRIPT 5 Additions


$    = (call)    =>  document.querySelector(call)
$$   = (call)    =>  document.querySelectorAll(call)

NodeList.prototype.indexOf = function(element) {
    ArrayObj = new Array( ...this);
    return ArrayObj.indexOf(element);
}

Math.spread = function(call /*array*/)
{
   let avg = Math.avg(call);
   let temp = []
   for (i=0;i<call.length;i++) {
       temp[i]=Math.pow(call[i]-avg,2);
   }
   return Math.sqrt(Math.sum(temp)/(temp.length));
}

Math.sum = function(call /*array*/) {
    temp=0;
    for (i=0; i<call.length;i++) {
        temp+=call[i];
    }
    return temp;
}
Math.avg = function(call /*array*/) {
    let a=0;
    for (let i=0; i<call.length;i++) {
        a+=call[i];
    }
    return Math.round(a/call.length);
}
Math.prime = function(call /*single number*/) {
  let divide=[];
  for (let q = 2; q < Math.sqrt(call) + 1; q++) {
      if (call % q == 0) divide.push(q);
  }
  return divide; /*array of dividers, all of them*/
}

Math.isPrime = function(call /*single number*/) {
  if (Math.prime(call).length==0) return true;
  else return false;
  /*returns boolean*/
}

Number.prototype.pad = function() {/*padding number for dates and stuff*/
  if (this<10) return String("0"+this);
  else return String(this);
}

class Color { //simple generation of colors. Finally
  constructor(r,g,b) { // can create random numbers
     if (r!=undefined) this.r=Number(r); else this.r=Math.floor(Math.random()*255);
     if (g!=undefined) this.g=Number(g); else this.g=Math.floor(Math.random()*255);
     if (b!=undefined) this.b=Number(b); else this.b=Math.floor(Math.random()*255);

     this.rgb="rgb(" + this.r + ',' + this.g + ',' + this.b + ')';
     this.hex='#'+this.r.toString(16)+this.g.toString(16)+this.b.toString(16)
     //whether to add BLACK = true or WHITE = false  text color
     if ((this.r+this.g+this.b)>360) this.shade=false;
     else this.shade=true;
  }

}

//String.prototype
