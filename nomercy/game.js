//cards = [17, 16, 31, 21, 35, 13, 27, 6, 8, 12, 28, 22, 24, 9, 15, 23, 26, 3, 18, 4, 10, 20, 34, 33, 29, 30, 5, 25, 7, 19, 32, 14, 11];

users = [
        {
            name: "Jani",
            cards: [12,31,56],
            coins: 4
        },
        {
            name: 'Jani',
            cards: [16,41,16],
            coins: 5
        },
    ];

currPlayer = 0;
currCoins = 5;
currCard = 0;


function draw_card(){
    currCard = cards.pop()
    
}

function action(put){
    if (put){
        users[currPlayer].coins-=1
    }
    else{
        users[currPlayer].cards.push(currCard)
        
    }
}
function partition(inputArray){
    let userCards = inputArray.sort((a, b) => b - a);
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

function renderCards(inputArray){
    let sorted = partition(inputArray);
    let chipgroup = ''
    for ( i = 0; i< sorted.length; i++){
        chipgroup += '<div class="chipgroup">'
    
        for ( k = 0; k< sorted[i].length; k++){
            console.log(i,k)
            chipgroup += '<div class="chip">' + sorted[i][k] + '</div>'
        }
        chipgroup+='</div>'
    }
    console.log(chipgroup)
    $("#cards").innerHTML=chipgroup
}