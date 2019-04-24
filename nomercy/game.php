
<?php
//actual game communication PHP file

// inputs: $_GET['user'] $_GET['action'] 
// returns : gameState and gameStateUsers
$ID = $_GET['gameID'];

$_UD = './files/'.$ID.'users.json';
$_ID = './files/'.$ID.'.json';

$feedbacks = array();
$user = $_GET['user'];
$userData = getUserData(); //getting user data
$gameData = getData(); //getting game data

$cardsLeft = count($gameData['cards']);
$gameData['cardsLeft'] = $cardsLeft < 5 ? $cardsLeft : -1;

if (isset( $_GET['fetch-only']) ) {

    if ($_GET['fetch-only'] == 'game') {
        unset($gameData['excludedCards']);
        $gameData['topCard'] = end( $gameData['cards'] );
        unset($gameData['cards']);
        //echo json_encode($gameData);
    }
    else {
        foreach ( $userData as $value ) {
            if (count($value) == 0) {/*last empty object**/}
            elseif ($user == ($value['name'])) {
                //echo json_encode($value);
            }
    }
    }
    //we are only fetching this thing
    
        
}
elseif ( isset( $_GET['startGame'])) {
    // forcing game to start
    $_ID = './files/'.$ID.'.json';
    $file_write = fopen( $_ID , 'w+' ) ;
    
    $gameData['hasGameStarted'] = true;
    
    fwrite( $file_write ,  json_encode($gameData) );
    fclose( $file_write );
}
else {
    //echo '<hr>';
    $action = $_GET['action']; // PUT_COIN / DRAW_CARD / REQUEST_NEW_CARD
    // MANIPUATING GAME DATA <3
    //echo var_dump($userData) . '?<hr>';
    foreach ( $userData as $key => $value ) {
        if (count($value) == 0) {}
        elseif ($user == ($value['name'])) {
            if ($user == $gameData['currPlayer']) {
                
                if ($action == 'pull-card' || $value['coins'] == 0) {
                    //pulling a card
                    $value['coins'] = ($gameData['currCoinsOnCard']) + $value['coins']; 
                    $gameData['currCoinsOnCard'] = 0;
                    //print_r($gameData['cards']);
                    if (count($gameData['cards']) == 1) {
                        //no cards
                        array_push($feedbacks,'Game is Finished');
                    }
                    array_push($value['cards'], array_pop($gameData['cards']));
                    
           
                }
                else {
                    //putting a coin on the card
                    $value['coins']--; //placing a coin
                    $gameData['currCoinsOnCard']++; //on the middle thing
                    
                    //next player setup
                   
                    if ($key+2 >= count($userData)) {
                       
                        $gameData['currPlayer'] = $userData[0]['name'];
                    }
                    else {
                        $gameData['currPlayer'] = $userData[$key + 1]['name'];
                    }
                }
                
                $userData[$key] = $value;
            }
            else {
                array_push($feedbacks, "Non-Matching UserName");
                //echo 'Non-Matching IDS user:' . $user . ' vs currPlayer: ' . $gameData['currPlayer']; 
            }
            //echo '<br>beep boop';
            //echo '<'.$value['coins'].'>';
            //echo json_encode($value);
           
            
            
           
        }
    }
    $_ID = './files/'.$ID.'users.json';
    //echo '<hr><hr><h1>USER DATA</h1>';
    substr(json_encode($userData), 0, -3);
    $file_write = fopen( $_ID , 'w+' ) ;

    
    fwrite( $file_write ,  substr(json_encode($userData),0, -3) );
    fclose( $file_write );
    
    $_ID = './files/'.$ID.'.json';
    //echo '<hr><hr><h1>DATA</h1>';
    json_encode($gameData);
    $file_write = fopen( $_ID , 'w+' ) ;

    
    fwrite( $file_write ,  json_encode($gameData) );
    fclose( $file_write );
    
    
    
}



echo '{"users":' .substr(json_encode($userData),0, -4).'],' ;
echo '"gameField":'.json_encode($gameData).',';
echo '"feedback":'.json_encode($feedbacks).'}';
// FILE QUERY

function getUserData() {
    

    $_UD = './files/'.$_GET['gameID'].'users.json';
    $pre_file = fopen( $_UD , 'r' );
    $file = fread(  $pre_file , filesize($_UD) );

    fclose($pre_file);
    $file = '{"keys" :'. $file . "{}]}";
    //echo $file .'<hr>';
    
    $entries = json_decode($file,true);
    
    return $entries['keys']; //storing the retrieved JSON data
}
function getData() {
    $ID = $_GET['gameID'];
    $_ID = './files/'.$ID.'.json';
  

    
    $pre_file = fopen( $_ID , 'r' );
    $file = fread(  $pre_file , filesize($_ID) );

    fclose($pre_file);
   
    
    $entries = json_decode($file,true);
    return $entries;
}

?>