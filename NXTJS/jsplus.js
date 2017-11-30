//JS EMCASCRIPT 5 Additions

//GNU GPL v3 Licence

//Created by Aron Tatai, 2017
//base for all RONTAP - NXTJS applications.

'use strict';

//-----------------------------------------------------------------
//-----------------BASE-PROTOTYPE-EXTENSIONS-----------------------
//-----------------------------------------------------------------


var $    = (call)    =>  document.querySelector(call);
var $$   = (call)    =>  document.querySelectorAll(call);

NodeList.prototype.indexOf = function(element) {
    return [...this].indexOf(element);
}

Array.prototype.max = function(){  return Math.max(...this); }
Array.prototype.min = function(){  return Math.min(...this); }

Array.prototype.shuffle = function() { //shuffle the array compleately
	for (let i = this.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
	return this;
}
Array.prototype.isSame = function() {
  return !!this.reduce(function(a, b){ return (a === b) ? a : NaN; });
}
Array.prototype.last = function() {
    return this[this.length-1];
}


//-----------------------------------------------------------------
//-----------------MATHEMATIC-OPERATIONS---------------------------
//-----------------------------------------------------------------

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
    let temp=0;
    for (i=0; i<call.length;i++) {
        temp+=Number(call[i]);
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
}
Math.randInt = function(upTo /*int*/) {
  return Math.floor(Math.random()*upTo);
}

Number.prototype.pad = function() {/*padding number for dates and stuff*/
  if (this<10) return String("0"+this);
  else return String(this);
}


//-----------------------------------------------------------------
//-----------------COLOR-GENERATION--------------------------------
//-----------------------------------------------------------------


class Color {                   //simple generation of colors. Finally
  constructor(r,g,b) {          // can create random numbers
     if (r!=undefined) this.r=Number(r); else this.r = Math.floor(Math.random()*255);
     if (g!=undefined) this.g=Number(g); else this.g = Math.floor(Math.random()*255);
     if (b!=undefined) this.b=Number(b); else this.b = Math.floor(Math.random()*255);

     this.rgb="rgb(" + this.r + ',' + this.g + ',' + this.b + ')';
     this.hex='#'+this.r.toString(16)+this.g.toString(16)+this.b.toString(16)
     //whether to add BLACK = true or WHITE = false  text color
     if ((this.r+this.g+this.b)>360) this.shade=false;
     else this.shade=true;
  }

}


//-----------------------------------------------------------------
//-----------------JS-GET/from-PHP---------------------------------
//------------------------------original-version-by-deesnow97------

function $_GET(args) {
    args = args || 'null' ; //args is only used for asking specific argument
    var hash = location.hash.slice(1,Infinity);

    if (args!='null') {
        var startLoc =hash.indexOf(args + '=');
        var endLoc = hash.slice(startLoc,Infinity).indexOf('&');
            if (endLoc==-1) endLoc = Infinity;
        return hash.slice(startLoc + args.length + 1,endLoc);

    }
    //return other functions of JSGET
    else {
        return {
            'argumentList' : function() {   //list all of the arguments
                let arr = [ hash.slice( 0 , hash.indexOf('=') ) ];
                for (i=0; i< $_GET().length() -2 ; i++) {
                    var tempCont = /&([^=]+)=/g.exec(hash);
                    //RegExp: search whole where &×××= is the syntax, with any × inbetween
                    arr.push(tempCont[1]);
                    hash = hash.replace(tempCont[0],'');
                    //remove text from hash and put in arr.
                }
                return arr;
            },
            'length' : function () { return location.hash.split("=").length }
        }
    }

}

//-----------------------------------------------------------------
//-----------------STRING-STATISTICS-------------------------------
//-----------------------------------------------------------------

String.prototype.stat = function(call) {
   switch (call) {
      case  'LengthNoSpace' :
         return this.length-this.split(" ").length;

      case  'wc' :
         return this.split(/\s+/).length;

      case 'letters' : //sort the letters
       a=this.toLowerCase();
       letterStore=[];//where we store the actual letters
       letterCount=[];//where we store those
       for (i=0;i<a.length;i++) {
           index=letterStore.indexOf(a[i]);//to save power, we calculate this here
           if (index<0) { //if not
               letterStore[letterStore.length]=a[i];
               letterCount[letterCount.length]=1;
           }
           else {
               if (letterCount[index]===undefined)     letterCount[index]=0;
               else                                    letterCount[index]++;
           }
       }
       return [letterCount,letterStore];

      case 'letterMax' :    //     get the most freq. letter from the index of the most used letter
       text=this.stat('letters');
       return text[1][ text[0].indexOf( text[0].max() ) ]


      case 'letterMin'  :   //     get the most freq. letter from the index of the most used letter
       text=this.stat('letters');
       return text[1][ text[0].indexOf( text[0].min() ) ]

      case 'letterSort' :
       text=this.stat('letters');
       output=[[],[]];
       for (let xi=0;xi<text[0].length;xi++)
           {
                output[0][output[0].length] = text[0][ text[0].indexOf( text[0].max() ) ]
                output[1][output[1].length] = text[1][ text[0].indexOf( text[0].max() ) ]
                text[0][ text[0].indexOf( text[0].max() ) ] = 0 ;
           }
        return output;

   }
}


//-----------------------------------------------------------------
//-----------------NXT-JS-MAIN-DEFAULT-FNS-------------------------
//-----------------------------------------------------------------

if (localStorage.nxtDataStore==undefined) {
    let temp = {
      nightMode : false,
      desktopMode : false,
      mobileEnabled : true
    }
    localStorage.nxtDataStore = JSON.stringify(temp);
}
var nxt = {
  build : 1401, 

  openMenu : function(call) {
    $$('#NineDotMenu')[0].classList.add("on");
      setTimeout(function() {

        location.href=call+"rtsmenu.html"
      },550)
  },
   closeSidebar : function(e) {
      if (document.body.offsetWidth<640) {
          $('body').classList.add('sidebarMinimised');
      }
   },

   internalNXTStorage : JSON.parse(localStorage.nxtDataStore),
   //this is strictly READ ONLY

   getStore : function(elem){
     return nxt.internalNXTStorage[elem];
    },
   setStore : function(elem, to) {
      nxt.internalNXTStorage[elem] = to;
      localStorage.nxtDataStore = JSON.stringify(nxt.internalNXTStorage);
   }

}

//-----------------------------------------------------------------
//-----------------KEYBOARD-CONTROL--------------------------------
//-----------------------------------------------------------------
