//NXT JS CONTEXT MENU ELEMENTS

//Created by Aron Tatai, 2018 [Challanger]

/*requires: jsplus.js
            input.css is
            contextmenu.js

  @package: contextmenu

*/
nxt.modules.push("contextmenu.js");

nxt.clearChip = function(call,event) {
  if (event.offsetX > call.offsetWidth-30)
      call.remove();
}
for (i =0; i< $$('chip[close]').length ; i++) {
    $$('chip[close]')[i].onmouseup = function(){nxt.clearChip(this,event);}
}

ctxmenu = {
    close : function(e) {
        console.log(e.path[e.path.length-6],e);
         if (e.path[e.path.length-7]!=$('#ctxElementHolder')) {
         $('#ctxElementHolder').classList.remove('on');
         setTimeout(function(){
            $('#ctxElementHolder').innerHTML="";
            $('#ctxElementHolder').style.display="none";
         },200);
         }

    },
    preset: {}
}
class Ctxmenu {
constructor(obj) {
    this.content=obj;
}
click(e) {
    console.log(e);
    if (e.ctrlKey) return true;
    console.log(e.clientX, e.clientY);
    $('#ctxElementHolder').classList.add("on");
    $('#ctxElementHolder').style.display="block";

    $('#ctxElementHolder').style.top=e.clientY+'px';
    $('#ctxElementHolder').style.left=e.clientX+'px';

    $('body').onclick=function(){eval(ctxmenu.close(event))};
    e.preventDefault();
   console.log('prevdef');
    this.fillInfo();
}
open(e) {

   e.preventDefault();
   this.fillInfo() ;



}
fillInfo() {
    this.temp="<table>";

    for (let fi=0 ; this.content.length>fi ; fi++) {
        if (this.content[fi].field==undefined) this.content[fi].field=1;
        this.temp+="<tr class='ctx-element-count"+ this.content[fi].field.length+"'>";

        if (this.content[fi].field==1)
        {
            console.log(this.content[fi]);
            this.temp+="<td colspan=12>"
            this.addElement(this.content[fi]);
            this.temp+="</td>"
        }
        else {

            for (let fj = 0 ; this.content[fi].field.length>fj ; fj++)
            {
                  this.temp+="<td colspan="+12/this.content[fi].field.length+">"
                  this.addElement(this.content[fi].field[fj]);
                  this.temp+="</td>"
            }

        }
         this.temp+="</tr>"
    }
    $('#ctxElementHolder').innerHTML=this.temp;
}
close() {
  console.log('close');
}
addElement(element) {

    if (element.disabled==undefined) element.disabled=false;
    this.temp+="<el "+element.flags+" disabled="+element.disabled+' onclick="'+element.fn+'" ';
    if (element.icon!=undefined) {
        //console.log(element.icon);
        this.temp+='icon><i class="material-icons">'+element.icon+"</i>";
    }
    else {
        this.temp+='>';
    }
    this.temp+='<span >'+element.text+'<span></el>';


}
default() {
  //opens the default
}
}


ctxmenu.preset.editor = new Ctxmenu([

{   text:'Setup Text',  icon:'settings'},
{   text:'Clear Selection'},
{   text:'Invert Selection'},
{   field:
    [
        { text: 'Copy', icon: 'content_copy' , fn: 'alert()' , disabled:true},
        { text: 'Cut', icon: 'content_cut' , fn:  'document.execCommand("cut")'  },
        { text: 'Paste', icon: 'content_paste' , fn:  'document.execCommand("paste")'  }
    ]},

{   field:
    [
        { text: 'Undo', icon: 'undo' ,fn:  'document.execCommand("undo")'},
        { text: 'Redo', icon: 'redo' ,fn:  'document.execCommand("redo")'}
    ]},

{    text: 'More Options' , icon:'more_vert' , fn: 'ctxmenu.preset.sth.open(event)'}

]);
ctxmenu.preset.sth = new Ctxmenu([

{   text:'Go Back',  icon:'keyboard_arrow_left' , flags:'back', fn: 'ctxmenu.preset.editor.open(event)' },
{   text:'Search Google'},
{   text:'Invert Selection'},
{   text:'use Definition'},
{   field:
    [
        { text: 'Copy', icon: 'content_copy' , fn: 'alert()' , disabled:true},
        { text: 'Cut', icon: 'content_cut' , fn:  'document.execCommand("cut")'  },

    ]}

]);
