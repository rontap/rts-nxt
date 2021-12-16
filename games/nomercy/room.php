<br><h1>Redirecting to lobby...</h1>
<style>
    h1 {
        font-family:monospace;
        text-align:center;
    }
</style>
<?php
  function randomString($length = 6 , $num = true) {
    $str = "";
    $characters = $num ? array_merge(range('a','z'), range('0','9')) : range('a','z');
    $max = count($characters) - 1;
    for ($i = 0; $i < $length; $i++) {
          $rand = mt_rand(0, $max);
          $str .= $characters[$rand];
      }
        return $str;
  }

$excludedCards = 9;
//  $_GET['action'] = new / join
$ID = randomString(6);
$userName = ($_GET['name']=='' ? randomString(5,false) : $_GET['name']);

if ( $_GET['action'] == 'new') {
    // creating new file
    
    // an ADMIN CREATES A NEW 
    $_ID = './files/' . $ID . '.json';
    $_UD = './files/' . $ID . 'users.json';
    //echo $ID . ' is the GameId<hr>';
    
    $shuffled = explode(',', $_GET['cards'] );
    shuffle($shuffled);

    $_BASE_JSON = '
    {
        "cards" : ['. implode(',',array_slice($shuffled,9)) .'],
        "currPlayer" : "'.$userName.'",
        "currCoinsOnCard": 0,
        "excludedCards" : ['. implode(',',array_slice($shuffled, 0,9)).'],
        "hasGameStarted" : false
    }';
    $_USER_JSON = '[{
                "name" : "'.$userName.'",
                "cards": [],
                "coins": 11
            },';
    
    file_put_contents($_ID, $_BASE_JSON);
    file_put_contents($_UD, $_USER_JSON);
    
    //echo $_BASE_JSON;
    
    ?>
    <script>
    localStorage.setItem('nomercyID','<?php echo $userName ?>');
    localStorage.setItem('nomercyGame','<?php echo $_GET['ID'] ?>');
   

    </script><?php
    
   
}
else /*$_GET['action'] == join*/{
    // JOINING THE GAME
    $ID = $_GET['gameID'];
    
    $_UD = './files/'.$ID.'users.json';
    
    if (is_file($_UD)) {
    $pre_file = fopen( $_UD , 'r' );
    $file = fread(  $pre_file , filesize($_UD) );
    //echo $file;
    fclose($pre_file);
    

    $file = $file . '{
                "name" : "'.$userName.'",
                "cards": [],
                "coins": 11
            },';
    
    $file_write = fopen( $_UD , 'w+' ) ;

    //echo '<br>' . $file;
   
    fwrite( $file_write , (string) $file );
    fclose( $file_write );
    }
    else {
        // invalid ID
        
        ?>
        <center><h1>Error! Invalid Room Name</h1></center>
<meta http-equiv="refresh" content="1;URL='/nomercy/room.html#!invalid-room-name'" /> 

        <?php
        die();
    }
}

 

 
?>
<title>Redirecting..</title>

<meta http-equiv="refresh" content="1;URL='/nomercy/lobby.html#<?php echo $ID ?>&<?php echo $userName ?>'" /> 
