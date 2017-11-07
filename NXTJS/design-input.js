


//checkbox loopbacks
  for (let checkboxI=0; checkboxI<$$('checkbox').length;checkboxI++) {
 $$('checkbox')[checkboxI].innerHTML=  '<i class="material-icons"></i>'+$$('checkbox')[checkboxI].innerHTML;
 $$('checkbox')[checkboxI].onclick=function(){changeChBox(this)};
 $$('checkbox')[checkboxI].children[0].innerText='add_circle';
 changeChBox($$('checkbox')[checkboxI]);
}

for (let switchI=0; switchI<$$('switch').length;switchI++) {
 $$('switch')[switchI].onclick=function(){changeSwitch(this)};
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


function changeSwitch(call) {
   if (Boolean(call.getAttribute('disabled')!='true')) {
     if (Boolean(call.getAttribute('checked')=='true'))
                 call.setAttribute('checked','false');
     else        call.setAttribute('checked','true');
 }
}



