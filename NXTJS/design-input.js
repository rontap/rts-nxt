


//checkbox loopbacks
  for (let checkboxI=0; checkboxI<$$('checkbox').length;checkboxI++) {
 $$('checkbox')[checkboxI].innerHTML=  '<i class="material-icons"></i>'+$$('checkbox')[checkboxI].innerHTML;
 $$('checkbox')[checkboxI].onclick=function(){changeChBox(this)};
 $$('checkbox')[checkboxI].children[0].innerText='add_circle';
 changeChBox($$('checkbox')[checkboxI]);
}

  for (let radioI=0; radioI<$$('radio').length;radioI++) {
 $$('radio')[radioI].innerHTML=  '<i class="material-icons"></i>'+$$('radio')[radioI].innerHTML;
 $$('radio')[radioI].onmouseup=function(){changeRadio(this)};
 $$('radio')[radioI].children[0].innerText='radio_button_unchecked';
 changeRadio($$('radio')[radioI]);
}


for (let switchI=0; switchI<$$('switch').length;switchI++) {
 $$('switch')[switchI].onclick=function(){changeSwitch(this)};
}

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
   if (Boolean(call.getAttribute('disabled')!='true')) {
     if (Boolean(call.getAttribute('checked')=='true'))
                 call.setAttribute('checked','false');
     else        call.setAttribute('checked','true');
 }
}



