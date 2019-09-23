// CANDIDATE MODILE

checkpoints = ["Activist","Local Representative","Congressman","Senator","President","Supreme Leader"];
progretto = 375;
function startCampaign() {
  setTimeout(function(){
$('canvas').classList.add('in-camp');
},100);
  canv.width = innerWidth;
  canv.height = innerHeight;
  canv.style.top = 0;
  canv.style.left = 0;
  //
  ctx.fillStyle="#3f51b5";
  ctx.fillRect(0,0,1000,1000);

  ctx.fillStyle="white";

  ctx.lineStyle="#999999";
  ctx.strokeStyle="#eeeeee";
  ctx.lineCap="round";
  ctx.lineWidth=20;
  ctx.beginPath();
  ctx.moveTo(100, 185);
  ctx.lineTo(100, (checkpoints.length-1)*80+185);
  ctx.stroke();

  //name
  ctx.font = "35px Montserrat ";
  ctx.fillStyle="white";
  ctx.fillText("CAMPAIGN - year 2",80,100);
  ctx.stroke();
ctx.font = "18px Montserrat ";

ctx.strokeStyle="#43A047";
  ctx.lineWidth=12;
  ctx.beginPath();
  ctx.moveTo(100, 185);
  ctx.lineTo(100, ((checkpoints.length-1)*80+185)*(progretto/500));
  ctx.stroke();
  for (i =0;i<checkpoints.length;i++) {

    if (progretto/100 >= i)   { ctx.strokeStyle="#1B5E20";   ctx.lineWidth=4; }
    else {ctx.strokeStyle="#444444";   ctx.lineWidth=5; }

    ctx.beginPath();


    ctx.arc(100, 80*i+185, 1, 0, 2*Math.PI );

      ctx.stroke();
      ctx.fillStyle="white";
      ctx.fillText(checkpoints[i],150,80*i+190);
      ctx.stroke();
  }
  pageTitle.innerHTML+=" Candidate"
}
function runAsCandidateNow() {
  $('body').classList.remove('campaign');
  startGame();
}
