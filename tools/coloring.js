
/*number */

currentColor='';
function randomColor() {
  let a= new Color();
  currentColor = a;

  $$('#colorMixer input:not([type="range"])')[0].value=a.r
  $$('#colorMixer input:not([type="range"])')[1].value=a.g
  $$('#colorMixer input:not([type="range"])')[2].value=a.b
  updateColor(false,0);
  updateColor(false,1);
  updateColor(false,2);
}


function updateColor(call,nth) {//random color tool updater main function
  if (call) range=$$('#colorMixer input[type="range"]')
  else      range=$$('#colorMixer input:not([type="range"])')

  let a= new Color(range[0].value, range[1].value, range[2].value)
  currentColor = a;
  $('#colorResult').style.background=a.rgb;

  if (!call) $$('#colorMixer input[type="range"]')[nth].value=range[nth].value
  else      $$('#colorMixer input:not([type="range"])')[nth].value=range[nth].value


  if (a.shade)  $('#colorResult').style.color="#FFF";
  else $('#colorResult').style.color="#000";

  $('#colorResult').innerHTML=a.hex;
}

function saveColor() {
  let color="black";
  if (currentColor.shade) color="white";
  $('#colorResults').innerHTML+='<div class=colorResults style=color:'+color+';background:'+currentColor.hex+'>'+currentColor.hex+'</div>';

}



/*timer*/


/*text Editor CLASS*/

function updateTextStats(forElement, to) {
  input = $(forElement).innerHTML;

  countOfDots = input.replace(/\.\.\./g,'.').replace(/\.\./g,'.').split('.').length;
  countOfExmM = input.replace(/\!\!\!/g,'!').replace(/\!\!/g,'!').split('!').length;
  countOfQues = input.replace(/\?\?\?/g,'?').replace(/\?\?/g,'?').split('?').length;
  countOfSent = countOfDots + countOfExmM + countOfQues -2 ;

  countOfLines = input.split(/\r\n|\r|\n/g).length
  $(to).innerHTML=input.length+' characters | ' +  input.split(' ').length + " Words | "+ countOfSent +' Sentences | '+ countOfLines +' Lines.';
}
