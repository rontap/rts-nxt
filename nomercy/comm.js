function fetch() {
    gameID = localStorage.nomercyGame
    userName = localStorage.nomercyID
    
    nxt.ajax({
        url:  './files/' + gameID + '.json'
    }).then((file) => {gameData = JSON.parse(file)})
    return gameData
}