// SHARED JS Functionality

function openSharedMenu() {
$('body').classList.add('run-on');
$('body').onmouseup = ()=> $('body').classList.remove('run-on');

}

setTimeout( ()=>
linkBack.innerHTML +=  $$("link[rel=import][document]")[0].import.$$('html body')[0].innerHTML,100)
