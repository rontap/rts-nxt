

function renderEverything() {

  $$('em').forEach(e => {
    e.innerHTML="-"
  });

  // haxing
  for (let i = 0; i<$$('.node a').length; i++) {
    //setting the ID of each node
    $$('.node a')[i].setAttribute('id',  $$('.node a')[i].style.backgroundImage.split('/').last().slice(0,-6).replace(/-/g,'_')      )
  }

  for (let i = 0; i<playerTanks.length;i++) {
    cTankId=playerTanks[i].tank_id

    if ( allTanks[cTankId] == undefined ) continue;

    let parseId = (allTanks[cTankId].nation + '_' +allTanks[cTankId].short_name_i18n.replace(' short','')).replace(/[\s,-]/g,'_')
    allTanks[cTankId].uuid = parseId;

    try {
        $('#'+parseId).parentNode.classList.add('owned');
        $('#'+parseId).parentNode.style.filter="grayscale(0%)"
    }
    catch(E) {   }

  }

    console.log(wn8List)



}//renderEverything


//

// noobmeter data extractor
/*
1 -> games played
3 -> winrate
4 -> wn8

*/
