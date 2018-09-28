{ "value" : "

<?php

$_ID = "./counts/" . $_GET["id"] . ".count";

if (is_file($_ID)) {
    //file already exist

    $myfile = @fopen(  $_ID  , "r") or die('Error Accessing File"}');
    $prevContainer = fread($myfile,filesize( $_ID )) or die('Error Opening File Stream"}');
    $_parsedNumber = intval($prevContainer);
    fclose($myfile);


    if (isset($_GET["inc"])) {
      $addAmount = 1;
        if ($_GET["inc"] != "") {
          $addAmount = $_GET["inc"];
          }
        $writefile = @fopen(  $_ID  , "w+") or die('Error Writing File Stream"}');
        fwrite($writefile, $_parsedNumber+ $addAmount);
        fclose($writefile);
        echo $_parsedNumber+$addAmount . '"';
    }
    else {
        echo $_parsedNumber . '"';
    }
}
else {
    //creating new file
    echo '1" , "is" : "new"';
    file_put_contents($_ID, '1') or die('Error Creating File Stream"}');;

}




?>
 }
