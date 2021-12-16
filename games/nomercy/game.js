// MAIN GAME JS
currPlayer = null //current player
timeStep=700
gameID =   location.hash.slice(1).split('&')[0]
userName = location.hash.slice(1).split('&')[1]
state = null;
singlePlayer = false
whichPlayersCardsAreShown = null;
lastChipgroup=''
yourLastChipgroup=''

startTime = new Date().getTime()

//redirecting if not viewing
if (location.hash.length < 2) location.pathname = "room.html";

function main(){
    
    timeStamp= new Date().getTime()-startTime
    
    /*console.log('gameID: '+gameID)
    console.log('userName: '+userName)
    console.log('timeStamp: '+timeStamp)*/
    
    nxt.ajax({
        url:'./game.php?gameID='+gameID+'&user='+userName+'&fetch-only=game&time-stamp='+timeStamp
    }).then((file)=>{
        readFile(file)
        renderAll()
        
        changedState = (state.gameField.currPlayer != currPlayer) 
        
        if (userName == state.gameField.currPlayer) {
            // when its your turn suddenly
            hugecard.classList.remove('disabled') 
            if (changedState)   nxt.nofify('#toast-yourturn');
             
        }
        else hugecard.classList.add('disabled');
        
        if (singlePlayer) userName = currPlayer //pitboss mode
        
        if (hasGameEnded()) endGame()
        else setTimeout(main,timeStep)
        
        
    })
}

var changedState = false;
function hasGameEnded() {
    if (topCard===false) return true
}
skipResults = false;
function endGame(){ 
    nxt.notify("#toast-finished",12000);
    hugecard.innerHTML="End"
    cardsLeft.innerHTML="No Cards left"
    setTimeout(function(){
        if (!skipResults)    location.pathname = 'results.html'
        else nxt.notify("#toast-finished-fv",1e10);
    },12000)
    
    
}


function action(put){
    if (currPlayer==userName) {
        if (put) put = "place-coin"
        else put = "pull-card"
    
        nxt.ajax({
            url:'./game.php?gameID='+gameID+'&user='+userName+'&action='+put+'&seed='+timeStamp
        }).then((file) => {
            readFile(file)
        })
    }
    else { //it's not your turn
        //console.log('not your turn!')
        nxt.notify(3500,'Not so fast! It\'s not your turn yet. ');
    }
    
}
function renderTopCard(){
    hugecard.innerHTML = topCard
    coinsOnCard.innerHTML = state.gameField.currCoinsOnCard
}


function renderCards(inputArray, isYourCard) {
    
    let sorted = partition(inputArray);
    let chipgroup = ''
    if (sorted.length == 0 && isYourCard) {
        //chipgroup ="No Cards Here.<br><br>"
    }
    for ( i = 0; i< sorted.length; i++){
        chipgroup += '<div class="chipgroup">'
    
        for ( k = 0; k< sorted[i].length; k++){
            //console.log(i,k)
            chipgroup += '<div class="chip">' + sorted[i][k] + '</div>'
        }
        chipgroup+='</div>'
    }
    //console.log(chipgroup)
    if (chipgroup!=lastChipgroup || chipgroup!=yourLastChipgroup){ //only renders if data has been changed
        //console.log("last:"+lastChipgroup!=chipgroup)
        //console.log("your last:"+yourLastChipgroup!=chipgroup)
        if (isYourCard) {
            $("#yourCards").innerHTML = chipgroup
            yourLastChipgroup = chipgroup
        }
        else {
            $("#cards").innerHTML=chipgroup
            lastChipgroup = chipgroup
        }
    }
    
}


function renderCoins(coins) {
    let div = '<div>'+ coins +'</div>'
    $("#coins").innerHTML=div
}


function renderAll(){
    let renderedUser = state.users.filter( (el) => el.name == whichPlayersCardsAreShown)[0]
    let yourUser = state.users.filter( (el) => el.name == userName)[0]
    let adminUser = state.users[0].name;
    renderCards(yourUser.cards,true)
    
    if (renderedUser!=yourUser) renderCards(renderedUser.cards,false)
    
    else renderCards([],false)
    //if you want to watch your own cards
    
    renderCoins(yourUser.coins)
    
    renderTopCard()
    renderUsers()
    
    cardsLeft.innerHTML = state.gameField.cardsLeft == -1 ? '' : state.gameField.cardsLeft + " Cards Left";
}


function init() {
    playerId.innerHTML = userName
    whichPlayersCardsAreShown = userName
    main()
}
function renderUsers() {
    let userNames = state.users.map( (el) => el.name)
    let output ='';
    let admin = state.users[0].name;
    let yourIndex=userNames.indexOf(userName);
    ownArray=[]
    /*for (i=0;i<userNames.length;i++){
        if (i-yourIndex<0){
            ownArray[i]=userNames[(i-yourIndex)+userNames.length]
        }
        else{
            ownArray[i]=userNames[i-yourIndex]
        }
    }*/
    ownArray=ownArray.concat(userNames.slice(yourIndex),userNames.slice(0,yourIndex))
    ownArray.forEach(name=> {
        let extraClass = (name==userName) ? 'you' : '';
        if (whichPlayersCardsAreShown == name) extraClass+=" selected"
        
        if (name != currPlayer) {
            output+=`${(admin==name) ? '<i title="He is the Admin of this room"admin class="material-icons">person_outline</i>' : ''}<div userCard class="material-pseudo ${extraClass} " onclick="whichPlayersCardsAreShown='${name}';renderAll()">${name}</div>`
        }
        else {
            output+=`${(admin==name) ? '<i title="He is the Admin of this room"admin class="material-icons">person_outline</i>' : ''}<div userCard class="material-pseudo current  ${extraClass} "  onclick="whichPlayersCardsAreShown='${name}';renderAll()">${name}</div>`
        }
    })
    //console.log(output);
    otherUsers.innerHTML = output;
}
function caesar(array, yourname){
    
}

setTimeout(init,100)