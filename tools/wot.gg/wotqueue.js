// ?


function getPlayer(name) {
  return nxt.ajax(
    {
      url:'http://api.worldoftanks.eu/wot/account/list/?application_id=ba2f514f39688ccc242e96b60a28e37b&search='+name
    }).then((stringE) => {

      let players = JSON.parse(stringE)
      let  player = players.data.filter((e) => e.nickname == name)

      return player[0].account_id
  })
}

function getPlayedTanks(name) {
  return nxt.ajax(
    {
      url:'https://api.worldoftanks.eu/wot/account/tanks/?application_id=ba2f514f39688ccc242e96b60a28e37b&account_id='+name
    }).then((stringE) => {

      let players = JSON.parse(stringE)
      let  player = players.data[name]

      return player
  })
}


playerID = null
allTanks = null
playerTanks = null
wn8List = null
wn8ListHTML = null


nxt.ajax({url:'https://api.worldoftanks.eu/wot/encyclopedia/tanks/?application_id=ba2f514f39688ccc242e96b60a28e37b'})
  .then( (r) => {
    allTanks = JSON.parse(r).data
    for (let x = 0; x< Object.keys(allTanks).length;x++) {
      let cTankId = Object.keys(allTanks)[x]

      let parseId = (allTanks[cTankId].nation + '_' +allTanks[cTankId].short_name_i18n.replace(' short','')).replace(/[\s,-]/g,'_')
      allTanks[cTankId].uuid = parseId;
    }


    getPlayer( location.hash.slice(1) ).then((retPlayId)=> {
      playerID = retPlayId

      getPlayedTanks(playerID).then((e) => {
        console.log(playerID,e)
        playerTanks = e

        nxt.ajax({url:'./noobmeter.php?name='+location.hash.slice(1)}).then( (r) => {
          wn8ListHTML = r
          rawHolder.innerHTML= r;
          console.log('?!')
          wn8List = listNoobmeter()

          setTimeout(function(){
            renderEverything()
            processNoobmeterList();
          },1000)
        })
      })
    })
  });
////

function listNoobmeter() {
  let valArr = new Map()
  let listNM = $$('#rawHolder tr')
  for (i=0; i<listNM.length ;i++) {
    try {
      let tId = listNM[i].$$('td a')[0].href.split('/').last()
      let tBtls = listNM[i].$$('td')[5].innerHTML
      let wRate = listNM[i].$$('td span')[0].innerHTML
      let wRateR = listNM[i].$$('td span')[0].classList[0]
      let tWn8 = listNM[i].$$('td')[8].innerHTML
      let tWn8R = listNM[i].$$('td')[8].classList[0]

      valArr.set(tId, {
        'battles':tBtls,
        'uuid' : allTanks[tId].uuid,
        'winrate':wRate,
        'winrateClass':classifyWR(wRate),
        'gamesClass' : classifyGS(tBtls),
        'wn8': tWn8,
        'wn8Class':tWn8R
      })
    }
    catch(e) {
      console.log(e)
    }

  }
  console.log(valArr)
  return valArr
}

function processNoobmeterList() {
 // proessing all the WN8 stuff and design
 console.log('>>',wn8List)
   wn8List.forEach(el => {
     try {

       let nodeEl = $('#'+el.uuid).parentNode;
       console.log('>>>',el,nodeEl)
       console.log(nodeEl,el.winrate,el.wn8)
       nodeEl.$$('a em')[0].innerHTML="<f>"+el.winrate + "</f><br><g>" + el.battles + ' </g>'
       nodeEl.$$('a span')[0].innerHTML="<e>"+nodeEl.$$('a span')[0].innerHTML+"</e><i>"+el.wn8+" WN8"+"</i>"
       nodeEl.$$('a span')[0].classList.add( el.wn8Class )
       nodeEl.classList.add( el.winrateClass )
       nodeEl.classList.add( el.gamesClass )
     } catch(e) {
       console.error(e)
     }
   })
}

// tanks.gg hax
updatePolicy = {
  'unresearched':false,
  'hideclasscolor':true,
  'wn8show':false
}

function updateView(el,to) {
  updatePolicy[el]=to;
  to ? document.body.classList.add(el) : document.body.classList.remove(el)

  rerender();
}

function rerender() {
  document.body.classList.remove("tShide","tSclasscolor","tSwinrate","tSbattles")
  document.body.classList.add( $('[name="topSetup"]:checked').value )
}

function classifyWR(c) {

  let percent = Number(c.slice(0,-1))
  if (percent < 46) return 'veryBad'
  if (percent < 47) return 'bad'
  if (percent < 48) return 'belowAverage'
  if (percent < 49) return 'average'
  if (percent < 51) return 'aboveAverage'
  if (percent < 53) return 'good'
  if (percent < 55) return 'veryGood'
  if (percent < 59) return 'great'
  if (percent < 64) return 'unicum'
  return 'superUnicum'


}

function classifyGS(c) {
  console.log('????',c)
  let battles = Number(c);
  if (battles <  50) return "BTLbad"
  if (battles <  100) return "BTLbelowAverage"
  if (battles <  250) return "BTLaverage"
  if (battles <  500) return "BTLaboveAverage"
  if (battles <  1000) return "BTLgood"
  if (battles <  1800) return "BTLunicum"
  return "unicum"
}
