// for random tools 3 


/*random text and password*/

textDataSheet = {   //STRICT ORDER BEACUSE OF checkbox order
  text:"qwertyuiopasdfghjklzxcvbnm",
  numbers:"0123456789",
  uppercase:"QWERTYUIOPASDFGHJKLZXCVBNM",
  spec:"#;!£$%^&*()_+-=[]{}@~~,./<>?|¬¦€ ",
  ext:"АБВГҐДЂЃЕЀЁЄЖЗЗ́ЅИЍІЇЙЈКЛЉМНЊОПРСС́ТЋЌУЎФХЦЧЏШЩЪЫЬЭЮЯöüóőúűáéíŁłŒŔĀĐŠŴŮŬŨŜŘŌ"
};
textDataSheetValues=[0.75,0.85,0.80,1,1.125];
usedValues=0;

setTimeout(function(){
  Object.prototype.attr = function(call) { console.log(this.getAttribute("checked")); return this.getAttribute(call) }
  console.log($$("#passwordHolder checkbox")[0].attr("checked"))
},10000)


function generateAllPwd(length,times) {
  let possibleVariaions =1;
  inputs=$$("#passwordHolder checkbox");
  allow=["true",inputs[0].getAttribute("checked"),inputs[1].getAttribute("checked"),inputs[2].getAttribute("checked"),inputs[3].getAttribute("checked")]
  console.log(allow);
  currTextDataSheet = "";
    for (j=0;j<allow.length;j++) {
        if (allow[j]=="true") {
          currTextDataSheet+=textDataSheet[Object.keys(textDataSheet)[j]];
          possibleVariaions+=textDataSheet[Object.keys(textDataSheet)[j]].length;
          usedValues+=textDataSheetValues[j];
        }
    }
  console.log(possibleVariaions);
  possibleVariaions = Math.pow(Math.pow(possibleVariaions,length),1/10);
  console.log(possibleVariaions);


  if (possibleVariaions<18) possibleVariaions="Very Poor!";
  else if (possibleVariaions<30) possibleVariaions="Not good enugh!";
  else if (possibleVariaions<40) possibleVariaions="Alright. Try adding more letters!";
  else if (possibleVariaions<60) possibleVariaions="Good password!";
  else if (possibleVariaions<140) possibleVariaions="Strong password!";
  else if (possibleVariaions<280) possibleVariaions="Very strong password. No improvement needed";
  else possibleVariaions="This password is unnecesarly long or complicated.";

  if (length<Math.round(12-usedValues)) possibleVariaions+="<br>It is good practice to use passwords longer than this password";
  $("#passwordOutput").innerHTML=" Password Security Level: "+possibleVariaions+"<hr><br>";
  for (let i=0 ; i<times ; i++) { generatePwd(length);  }
}

function generatePwd(length) {
  let output="";
  for (k=0;k<length;k++) {    //adding LENGTH times random characters
      randomIndex = Math.floor(Math.random()*currTextDataSheet.length);
      output+=currTextDataSheet[randomIndex];
  }
  $("#passwordOutput").innerHTML+=output+"<br>";
}

//-----------------------------------------------
//---GROUPING------------------------------------
//-----------------------------------------------

function distributeToGroups() {
    var mixedArray = groupHolder.value.split(",").shuffle();
    let output ='<li>';
    let splitOn = Number(groupNo.value);
    
    let remains = mixedArray.length % splitOn ;//only used if we distribute groups
    
    console.log(remains);
    //error handling)
    if (splitOn>mixedArray.length) {
        nxt.notify("#group-toomuch",3500);
        return false;
    }
    
    for (i=0;i<mixedArray.length;i++) {
        
        if ((i>0)&&(i%splitOn == 0))  {  //distributing extra elements
            if (($('#groupOptions').attr('checked')=='false')&&((remains)>0)) {
                output+= " , "+mixedArray.pop();
                remains--;             
            }
            output+= "</li><li>"; 
        }
        else if (i>0) output+=  " , ";
        
        if (mixedArray.length>0) output+= mixedArray[i];
    }
    $("#groupOutput").innerHTML = output + "</li>";
}

//enter ->start
setTimeout(() =>
$('#groupHolder').onkeydown = function(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        distributeToGroups();
    }
}, 1000 );