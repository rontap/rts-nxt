
const excludeCards = 9;
const cards = new Array(33).fill(0).map( (x , i=0) => x = (3+(i++)))


function a(){}


//counting the point
function countPoints(cards, coins){
    let points = -coins
    partition(cards).map(x => points+=x.last())
    return points
}

function partition(inputArray){
    let userCards = inputArray.sort((a, b) => b - a)
    let temp = [userCards[0]];
    let sortedCards = [];
    for (i=0; i<userCards.length; i++){
        if (temp.last()-1==userCards[i+1]){
            temp.push(userCards[i+1])
        }
        else{
            sortedCards.push(temp);
            temp = [userCards[i+1]];
        }
    }
    return sortedCards
}

function readFile(file){
        console.log(file)
        try { state=JSON.parse(file) }
        catch (e) {
            console.log(e, 'FILE:',file);
            nxt.notify(2000,'Internal File Read Error.')
        }
        currPlayer=state.gameField.currPlayer
        topCard=state.gameField.topCard
}

// 3 + 3 + '3' 
//