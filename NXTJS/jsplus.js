//JS EMCASCRIPT 5/6 Additions

//GNU GPL v3 Licence

//Created by Aron Tatai, 2017/2018
//base for all RONTAP - NXTJS applications.

//-----------------NXT-JS-MAIN-CONFIG------------------------------

'use strict';					                 //we use strict so everything is clear and no unexpected errors occur
const nxtjs__proto__BuildNumber = 2015;  //build number for modules
const nxtjs__proto__CodeName = null;
// use nxt.build instead.

//-----------------------------------------------------------------
//-----------------BASE-PROTOTYPE-EXTENSIONS-----------------------
//-----------------------------------------------------------------

//DOM interaction like JQuery
var $    = (call)    =>  document.querySelector(call);
var $$   = (call)    =>  document.querySelectorAll(call);

Node.prototype.$$ = function (query) {
  return this.querySelectorAll(query);
};

//for some reason, NodeList didnt have an indexOf in its prototype.
NodeList.prototype.indexOf = function(element) {
    return [...this].indexOf(element);
}

//implementing JQuery-style attribute set and get.
Element.prototype.attr = function(check, to) {
    if (to == undefined)
        return this.getAttribute(check);

    return this.setAttribute(check,to);
}

//toggle DOM interaction within nxt.
//Used by high performance applications
var $DOMInteraction = function (call) {
	if (call) {
		$    = (call)    =>  document.querySelector(call)
		$$   = (call)    =>  document.querySelectorAll(call)
    nxt.domInteraction = true;
	}
	else {
	    $ = function(){ throw 'NXT.JS Feature Off: DOM Interaction is turned off'; }
	   $$ = $ ;
     nxt.domInteraction = false;
	}
}

//-----------------ARRAY-PROTOTYPE-EXENSIONS-------------------------

//quick extensions
Array.prototype.max = function()  {    return Math.max(...this);    }
Array.prototype.min = function()  {    return Math.min(...this);    }
Array.prototype.last = function() {    return this[this.length-1];  }

Array.prototype.shuffle = function() { //shuffle the array compleately
	for (let i = this.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
	return this;
}
Array.prototype.isSame = function() {
  //this is not perfect. when all elements are false or 0, this will fail.
  //useful for checking whether even one element is valid/on.
  return !!this.reduce((a, b) => (a === b) ? a : NaN );
}

Array.prototype.copy = function() {
  //returns deep copy of element. doesnt work if the array contains functions.
  return  JSON.parse ( JSON.stringify(this) ) ;
}

//JS is loosely typed, but this will not stop us from checking types...
  Array.prototype.type = "Array";
 String.prototype.type = "String";
Boolean.prototype.type = "Boolean";
 Number.prototype.type = "Number";
 Object.prototype.type = "Object";


//-----------------------------------------------------------------
//-----------------MATHEMATIC-OPERATIONS---------------------------
//-----------------------------------------------------------------

//supporting RTS4 Websites
const Inf = Infinity;
// </support>

Math.spread =  function(/*array*/ call)
{
   let avg = Math.avg(call);
   let temp = [];
   for (i=0;i<call.length;i++) {
       temp[i]=Math.pow(call[i]-avg,2);
   }
   return /*number*/ Math.sqrt(Math.sum(temp)/(temp.length));
}

Math.sum = function(/*array*/ call ) {
    return call.reduce((acc,curr) => acc+curr , 0);
}
Math.product = function(/*array*/ call ) {
    return call.reduce((acc,curr) => acc*curr , 1);
}
Math.avg = function(/*array*/ call ) {
    let a=0;
    for (let i=0; i<call.length;i++) {
        a+=call[i];
    }
    return /*number*/ Math.round(a/call.length);
}
Math.prime = /*returns array*/ function(/*number*/ call) {
  let divide=[];
  for (let q = 2; q < (call / 2); q++) {
      if (call % q == 0) divide.push(q);
  }
  return divide; /*array of dividers, all of them*/
}

Math.isPrime = /*returns boolean*/ function(/*number*/ call) {
  if (Math.prime(call).length==0) return true;
  else return false;

}
Math.randInt = function(/*number*/ upTo) {
  return Math.floor(Math.random()*upTo);
}

Math.factorial = function(number /*int*/, serialise/*not needed if doing full !*/) { /*factorisation*/
  if (typeof serialise === 'undefined')     return Math.factorial(number,number);
  else if (serialise>1)                     return Math.factorial(number*(--serialise),serialise);
  else if (number!=0)                       return number
  else                                      return 1
}
Math.fibonacci = function(n) {/*charioteer*/
  if (n<3) return 1;
  else return (Math.fibonacc(n-1) + Math.fibonacci(n-2));
}

Math.choose = function( n , k ) { /* permutation, n under k*/
  if (k>n) throw 'NXT.JS RangeError: in (n choose k) , n must be >= than k';  //fancy error handling
  return ( Math.factorial(n) / ( Math.factorial(k) * Math.factorial(n-k) ) )
}

Number.prototype.pad = function() { /*padding number for dates and stuff*/
  if (this<10) return String("0"+this);
  else return String(this);
}

//returns binary
String.prototype.has = function(str) {
  return (this.search(str)>=0)
}
Array.prototype.has = function(str) {
  return (this.indexOf(str)>=0)
}

//-----------------------------------------------------------------
//-----------------DRAWING-STUFF-----------------------------------
//-----------------------------------------------------------------


class Color {                   //simple generation of colors. Finally
  constructor(r,g,b) {          // can create random numbers
     if (r!=undefined) this.r=Number(r); else this.r = Math.floor(Math.random()*255);
     if (g!=undefined) this.g=Number(g); else this.g = Math.floor(Math.random()*255);
     if (b!=undefined) this.b=Number(b); else this.b = Math.floor(Math.random()*255);

     this.rgb="rgb(" + this.r + ',' + this.g + ',' + this.b + ')';
     this.hex='#'+this.r.toString(16)+this.g.toString(16)+this.b.toString(16);

     //whether to add BLACK = true or WHITE = false  text color
     if ((this.r+this.g+this.b)>360) this.shade=false;
     else this.shade=true;
  }

}

CanvasRenderingContext2D.prototype.clearAll = function() {
  this.clearRect(0,0, Number.MAX_SAFE_INTEGER , Number.MAX_SAFE_INTEGER );
  return true;
}

//-----------------------------------------------------------------
//-----------------JS-GET/from-PHP---------------------------------
//---------------------original-version-co-written-with-deesnow97--

function $_GET(args,set_to) {
    args = args || 'null' ; //args is only used for asking specific argument
    set_to = set_to || 'null'; //if you wanna set sth...

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
            'length' : function () { return location.hash.split("=").length -1 }  //returns the length of arguments. to be used with arguumentList to loop
        }
    }

}

var $_SET = ()=> false;

//-----------------------------------------------------------------
//-----------------COMPARISON-FUNCTIONS----------------------------
//-----------------------------------------------------------------


Number.Compare = (a,b) => {
  if (Number(a)>Number(b)) return 1;
  else if (Number(a)<Number(b)) return -1;
  else return 0;
}

//-----------------------------------------------------------------
//-----------------STRING-STATISTICS-------------------------------
//-----------------------------------------------------------------

String.prototype.stat = function(call) {
   switch (call) {
       case  'LNS' :
       case  'LengthNoSpace' :	//how long is this without spaces
         return this.length-this.split(" ").length;

      case  'WC' :
      case  'wc' :	//word count
         return this.split(/\s+/).length;

      case 'letters' : //sort the letters
       let a=this.toLowerCase();
       let letterStore=[];//where we store the actual letters
       let   letterCount=[];//where we store those
       for (i=0;i<a.length;i++) {
           let index=letterStore.indexOf(a[i]);//to save power, we calculate this here
           if (index<0) { //if not
               letterStore[letterStore.length]=a[i];
               letterCount[letterCount.length]=1;
           }
           else {
               if (letterCount[index]===undefined)     letterCount[index]=0;
               else                                    letterCount[index]++;
           }
       }
       return [ letterCount , letterStore ];

      case 'max' :
      case 'letterMax' :    //     get the most  freq. letter from the index of the most used letter
       let textLM=this.stat('letters');
       return textLM[1][ textLM[0].indexOf( textLM[0].max() ) ]

      // letter min is deprecated


      case 'letterSort' :
      case 'sort' :
       let text=this.stat('letters');
       let output=[[],[]];
       for (let xi=0;xi<text[0].length;xi++)
           {
                output[0][output[0].length] = text[0][ text[0].indexOf( text[0].max() ) ]
                output[1][output[1].length] = text[1][ text[0].indexOf( text[0].max() ) ]
                text[0][ text[0].indexOf( text[0].max() ) ] = 0 ;
           }
       return output;

      default: return null; //invalid or unsupported
   }
}


//-----------------------------------------------------------------
//-----------------NXT-JS-MAIN-DEFAULT-FNS-------------------------
//-----------------------------------------------------------------

if (localStorage.nxtDataStore==undefined) {
    //setting default nxtjs storage values
    let temp = {
      nightMode : false,
      desktopMode : false,
      mobileEnabled : true
    }
    localStorage.nxtDataStore = JSON.stringify(temp);
}

//defining main variable
var nxt = {
  jsgetFrom : [],
  jsGetTo : [],
  build : nxtjs__proto__BuildNumber,
  modules : ["core"],
  location : "NXTJS/", //default location, can be overwritten
  //loading JS packages
  requireJS : function(url) {
    console.info("[NXTJS][PACKAGES] loading module "+url);
    if ( nxt.modules.indexOf(url)<0 ) {  //do not import twice if already defined
      let script = document.createElement('script');
      script.src = nxt.location+url;
      $('head').appendChild(script);    //appending new script
      nxt.modules.push(url);
      return true;
    }
    else return false;
  },
  requireCSS : function(url) {
    console.info("[NXTJS][PACKAGES] loading CSS "+url);
    if ( nxt.modules.indexOf(url)<0 ) {  //do not import twice if already defined
      let style = document.createElement('style');
      style.href = nxt.location+url;
      style.rel="stylesheet";
      $('head').appendChild(style);    //appending new script
      return true;
    }
    else return false;
  },

  // examples
  notify : function() { nxt.requireJS("notifications.js");  nxt.requireCSS("elements.css"); setTimeout( ()=> nxt.notify(arguments[0]), 10) ;},


  openMenu : function(call) {
    $$('#NineDotMenu')[0].classList.add("on");
    $$('body')[0].classList.add("NineDotMenuTransition");
      setTimeout(function() {
        location.href=call+"rtsmenu.html"
      },550)
  },
   closeSidebar : function(e) {
     $('body').classList.add('sidebarMinimised')
   },

   internalNXTStorage : JSON.parse(localStorage.nxtDataStore),
   //this is strictly READ ONLY. use getStore and setStore.

   getStore : function(elem){
     return nxt.internalNXTStorage[elem];
    },
   setStore : function(elem, to) {
      nxt.internalNXTStorage[elem] = to;
      localStorage.nxtDataStore = JSON.stringify(nxt.internalNXTStorage);
   },
   store : function(elem, to) { // NEW in 1900; replaces get and set store
     to = to || 'null';
     if (to == 'null')  return nxt.getStore(elem);
     else nxt.setStore(elem,to);
   },

   setNormalisation : function(call) { //extended by sets
     let temp = [];
     for (var i=0 ; i<call.length ; i++ ) {
       if (temp.indexOf(call[i])==-1) temp.push( call[i] );
     } //very hard...........................................
     return temp;
   }
,
   //critial error settings, when parsing goes Wrong
   die : function(message="",title="") {
      document.writeln(`<style>body {font-family:monospace;margin:60px;}</style><title>ParseError</title>
                        <br><h1>NXT JS Runtime Error ${title}</h1>
                        The page cannot be parsed. Please reload or go back to the previous site.<br>${message}
                        <br><hr>nxt.js build version: ${nxt.build} <br>Timestamp:  ${new Date().getTime()}`);
      throw "NXT.JS Fatal Parse Error.";
   },
   dieFromVersion : function(ver) {
      setTimeout(function() {nxt.die("Required version: "+ver ,": Incompatible module version") } , 100);
   },
   domInteraction : true,


}; // </NXT MAIN OBJECT>


nxt.toggle = function(is,elem) { //toggle variables and objects
  if (elem.type == 'Object')   $(elem).toggleClass('on');
  if (window[is].type != 'Boolean') return null;
  return window[is] = window[is] ? false : true
};

nxt.ajax  = function nxtAjaxFn(setup) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", setup.url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

nxt.seed = (seed,within=1,skew=1) => {
  let chr = '0' + nxt.build;

  seed.toString().split('').map( x => {
    chr+=x.charCodeAt();
  });
  chr = Math.sin( (Number(chr*skew) ))*(chr * skew/Math.PI);

  return Math.round( Math.abs(chr))%within;
}
// Sets and Maps are parsed correctly by default.
// Use this function to map them correctly
// usage: JSON.stringify( ObjectWithMaps , nxt.mapper );
nxt.mapper = (k,v) =>  v instanceof Set || v instanceof Map ? Array.from(v) : v
nxt.parser = (k,v,es) => es.indexOf(k) != -1 ?  new Map(v) : v;
