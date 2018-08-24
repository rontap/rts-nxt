//NXT JS MATERIAL DESIGN ELEMENT HANDLING

//Created by Aron Tatai, 2017/2018

//requires: jsplus.js
//          input.css is



nxt.modules.push("design-input.js");

//-----------------MATERIAL-PARSING------------------------------

//checkbox loopbacks

nxt.parseDocument = function() {

//parsing checkboxes
  for (let checkboxI=0; checkboxI<$$('checkbox').length;checkboxI++) {
 $$('checkbox')[checkboxI].innerHTML=  '<i class="material-icons"></i>'+$$('checkbox')[checkboxI].innerHTML;
 $$('checkbox')[checkboxI].onclick=function(){changeChBox(this)};
 $$('checkbox')[checkboxI].children[0].innerText='add_circle';
 changeChBox($$('checkbox')[checkboxI]);
}

//parsing radiobuttons
  for (let radioI=0; radioI<$$('radio').length;radioI++) {
 $$('radio')[radioI].innerHTML=  '<i class="material-icons"></i>'+$$('radio')[radioI].innerHTML;
 $$('radio')[radioI].onmouseup=function(){changeRadio(this)};
 $$('radio')[radioI].children[0].innerText='radio_button_unchecked';
 changeRadio($$('radio')[radioI]);
}

//parsing switches
for (let switchI=0; switchI<$$('switch').length;switchI++) {
 $$('switch')[switchI].onclick=function(){changeSwitch(this)};
}

//checkboxes
for (i = 0; i<$$('input[nxt][type="checkbox"]').length; i++) {
  $$('label[nxt]')[i].onclick=function() {
    if (this.checked) {this.innerHTML="check_box_outline_blank" ; this.checked=false; this.style.color="#222"; }
    else  { this.innerHTML="check_box" ; this.checked=true; this.style.color="var(--primary)"; }
  }
}

    //selector parsing
for (i=0; i<$$('selector').length; i++) {

  $$('selector')[i].onclick = function(call) {
  console.log(call.path[1].tagName)
  if (call.path[1].tagName=="SELECTOR") {
         nth = $$('selector.active span').indexOf(call.target);
            $('selector.active span.on').classList.remove('on');
        call.target.classList.add('on');
     }

  }
  $$('selector')[i].onmousedown = function(call) {
     call.path[1].classList.add('active');
  }
  $$('selector')[i].onmouseup = function(call) {
     setTimeout(function(){
         call.path[1].classList.remove('active');
     },20)

  }

}

// adding the possibility to switch STATUS data
Node.prototype.setSwitchData = function(call) {

    if (this.tagName=="STATUS") {
        if (call>100) call=100;
        if (call<0)   call=0;
        this.children[0].style.width="calc("+call+"% - 7px)";
        this.setAttribute('value',call);
    }
    else {
        throw "NXTJS TypeError: getSwitchData can only be run on status infos.";
    }
}
//otitle expand
for (resizeI=0; resizeI<$$('.otitle').length;resizeI++) {
    $$('.otitle')[resizeI].onclick = function(){
       this.parentNode.classList.toggle('o-expanded');
     }
}

for (statusI=0; statusI<$$('status').length;statusI++) {
  $$('status')[statusI].innerHTML="<div style='width:calc( "+$$('status')[statusI].getAttribute('value')+"% - 7px );'></div>";
}



//0I checkbox change content and class
function changeChBox(call) {

   if (Boolean(call.getAttribute('disabled')!='true')) {
     if (Boolean(call.getAttribute('checked')=='true')) {
       call.setAttribute('checked','false');
       call.children[0].innerText='remove_circle_outline';

     }
     else {
       call.setAttribute('checked','true');
       call.children[0].innerText='add_circle';
     }
 }
}


}//parseDocument

function changeRadio(call) {

   if (Boolean(call.getAttribute('disabled')!='true')) {
     if (Boolean(call.getAttribute('checked')=='false')) {

       nameSpace = call.getAttribute('name');

       for (let cri = 0 ; cri < $$('radio[name="'+nameSpace+'"').length; cri++)
           {
             $$('radio[name="'+nameSpace+'"')[cri].setAttribute('checked','false');
             $$('radio[name="'+nameSpace+'"')[cri].children[0].innerText='radio_button_unchecked';
               console.log($$('radio[name="'+nameSpace+'"')[cri]);
           }
       call.setAttribute('checked','true');
       call.children[0].innerText='radio_button_checked';
     }
       else {

           call.setAttribute('checked','false');
           call.children[0].innerText='radio_button_unchecked';
     }


 }
}


function changeSwitch(call) {
   // A-B Switch
   if (Boolean(call.attr('disabled')!='true')) {
     if (Boolean(call.attr('checked')=='true'))
                 call.attr('checked','false');
     else        call.attr('checked','true');
 }
}

//parsing everything
nxt.parseDocument();
