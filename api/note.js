//NOTE.JS created by rontap 2015
// cc-by-sa

Array.prototype.max = function() {
    return Math.max.apply(null, this)
    };

    Array.prototype.min = function() {
      return Math.min.apply(null, this)
    };
     
    appId="10";
    
    notes=[];
    //for (i=0;i<100;i++) { notes[i] = {}; };
 note = {
        length:0,
        
    objects:[],
    elements : [ 'name' , 'content' ,'created' ,'modified' ,'status'],
    parse : function( id ) { return JSON.parse(localStorage['note'+appId+'_'+id]) ;}  ,  
    //stringify : function( id ) { return JSON.stringify(localStorage['note'+appId+'_'+id]) ;}  ,  
current:0,
    sel : function(what) {//important preprocessor
        var what;    
        
        if (!isNaN(Number(what)) ){return note.getById(what); console.log('hm');}
        else if  (what=="") {return notes[note.current];}
        else {return what;}
    },
    new : function(name,content)
    {
       notes[notes.length]= {
           id:notes.length,
           name:name,
           content:content,
           created: new Date(),
           modified: '0',
           status : 21
       }
       note.length++;
    } ,
    getById : function(id) {
        return notes[id];
    } , 
    edit : function(what,toWhat) {
        what = note.sel(what);
        notes[what.id].name = toWhat.name;
        notes[what.id].content = toWhat.content;
        notes[what.id].modified = new Date();
        notes[what.id].status = 20 ;
        },
    status :  function(status,what,life) {
        if (typeof(life)==='undefined') life = false;      
        console.log(what);
        //te=note.sel(what);
        te=   notes[note.current];

         console.log(te);
         if (life) { 
             prevstat= notes[te.id].status ;
             setTimeout(function(){
                notes[te.id].status=prevstat  ;
                note.load(te); 
             },250)      
         }     
        notes[te.id].status = status; 
        note.load(te); 
    },
    save : function(what) {
		
	},
    load : function(what)  {
        what=note.sel(what);
	//	console.log(what);
        note.current=what.id;
           
           for (i=0;i<note.elements.length;i++) {
               note.loadhelp(note.elements[i], what);
               //console.log(note.elements[i],what);
           }
        },
    loadhelp : function(query,what) { 
		//console.log(what);
        document.getElementsByClassName('note-object')[0].querySelector('[is="'+query+'"]').value = what[query]; 
    },
    push: function(what) {
        note.status(35,'',true);
        localStorage['note'+appId+'_'+what.id]= JSON.stringify(what);
        },
    pull: function(id,what) { //we need ID
	note.status(30,'',true);
        note.edit(note.current, note.parse(id));
        ext.updated();
        note.load(what, note.elements);
        return notes[id]
        },
    sync: function (what) {
        if (what.modified <= note.parse(what.id).modified ) {note.push(what); } 
        else { note.pull(what.id,what); alert("syncing down");}
        ext.updated();
    },
    stat : {
            cc        : function(what) {   return what.content.length;  },
            ccNoSpace : function(what) {   return what.content.length-what.content.split(" ").length;  },
            wc        : function(what) {   return what.content.split(/\s+/).length;  },
            letters   : function(what) {    //sort the letters
                a=what.content.toLowerCase();
                letterStore=[];//where we store the actual letters
                letterCount=[];//wwhere we store those
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
                
            },
            letterMax  : function(what) { 
                text=note.stat.letters(what);
                return text[1][ text[0].indexOf( text[0].max() ) ] 
                //     get the most freq. letter from the index of the most used letter
            }, 
            letterMin  : function(what) { 
                text=note.stat.letters(what);
                return text[1][ text[0].indexOf( text[0].min() ) ] 
                //     get the most freq. letter from the index of the most used letter
            },
            letterSort : function(what) { 
                text=note.stat.letters(what);
                output=[[],[]];
                for (i=0;i<text[0].length;i++)
                    {
                         output[0][output[0].length] = text[0][ text[0].indexOf( text[0].max() ) ]
                         output[1][output[1].length] = text[1][ text[0].indexOf( text[0].max() ) ]
                         text[0][ text[0].indexOf( text[0].max() ) ] = 0 ;
                    }
               return output;
            },
            ultrastat : function(what) {
                ab=[];
                ab[ab.length] = note.stat.cc(what);
                ab[ab.length] = note.stat.ccNoSpace(what);
                ab[ab.length] = note.stat.wc(what);
                ab[ab.length] = note.stat.letterMax(what);
                ab[ab.length] = note.stat.letterMin(what);
                ab[ab.length] = note.stat.letterSort(what);
                return ab ;
            }
        
            
        }//stat
    
    } 
    if (localStorage['note'+appId+'_length']==undefined) { localStorage['note'+appId+'_length']='0'; }
    else note.length=localStorage['note'+appId+'_length'];
    
    ext = {
        updated : function() {
             modis.value=note.getById(0).modified;
			creatis.value=note.getById(0).created;
			statusis.value=note.getById(0).status;
        }
    }