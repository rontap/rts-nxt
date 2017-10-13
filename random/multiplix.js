//MULTIPLIX JS

snippetStorage=["Hey Jude SNS"];


function refreshSnippet(call) {
   snippetStorage[call.id.slice(6,Infinity)]=call.innerHTML
}

userCount=0;
currSelUser=0;
function newUser() {
 $('#userNamesHolder').innerHTML+='<div onclick="changeUserTo('+(userCount++)+')">Hey</div>';
 changeUserTo(userCount-1);
}
function changeUserTo(call) {
  $$('#userNamesHolder div')[currSelUser].classList.remove('on');
  $$('#userNamesHolder div')[call].classList.add('on');
  $('#userTitle span span').innerHTML=$$('#userNamesHolder div')[call].innerHTML;
  currSelUser=call;
} 
function editNameSpan(call) {
  call=call.innerHTML
  console.log(call.length);
  if (call.length==0) call="&nbsp;";
  if (call.length>20) call=call.slice(0,20);

  $$('#userNamesHolder div')[currSelUser].innerHTML=call;
}
function newSnippet() {
$('#snippetTextareaHolder').innerHTML+='<textinput ondragover="" draggable="true" ondrag="dragContent(event)" contenteditable id="snipNo'+
snippetStorage.length+'" onkeyup="refreshSnippet(this);"></textinput>';

let elems=$$('#snippetTextareaHolder textinput');
elems[elems.length-1].focus();
}

dragging=false;
function dragContent(event) {
  dragging=($$('textinput').indexOf(event.target));
}
function dropContent(ev,direction) {
    //if dropped to the same one, reordering (easy way of saing replacing HTML)
    if ((event.target.id=="userCurrText") && ($$('textinput')[dragging].classList[0]=="inside")) {
        //moving inside
        for (i=0;i<$$('#userCurrText textinput').length ; i++) {
            if (event.offsetY<$$('#userCurrText textinput')[i].offsetTop) {
              console.log(dragging,i);
              temp=$$('textinput')[dragging].innerHTML
              $$('textinput')[dragging].innerHTML=$$('#userCurrText textinput')[i].innerHTML;
              $$('#userCurrText textinput')[i].innerHTML=temp;
              i=Infinity;
            }
        }
    }//actially muving textinputs
    else {
      ev.preventDefault();
      if (!direction) {$$('textinput')[dragging].classList.add('inside');}
      else {$$('textinput')[dragging].classList.remove('inside');}
      ev.target.appendChild($$('textinput')[dragging]);
    }
}
function prevDef(event) { //not letting cancer growww yaayy;
    $$('textinput')[dragging].classList.remove('moving');
  if ($$('textinput').indexOf(event.target)<0)
  event.preventDefault()
}

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
},false;
