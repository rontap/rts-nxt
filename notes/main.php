<?php

  function randomString($length = 6 /*if no input specified, this should be the default URL length*/) {
      $str = "";
      $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
      $max = count($characters) - 1;
      for ($i = 0; $i < $length; $i++) {
        $rand = mt_rand(0, $max);
        $str .= $characters[$rand];
          }
          return $str;
    }
// . +   += .=

//if we want to access sth
if ( isset( $_GET['id'] ) ) {
    
    //echo 'ID: <b>'.$_GET['id'] .'</b><br><br>';
    $_ID = 'files/' . $_GET['id'] . '.json';
    $password_md5 = md5( $_GET["id"] . $_GET['password']);
    
    
    if ( is_file($_ID) )
    {
        //if file exists
        $pre_file = @fopen( $_ID , 'r' ) or die('{"error": "Error: Cannot Oead this file"}');
        if (filesize($_ID)==0) {
            die('{"error": "Error: Error: Corrupt File"}');
        }
        $file = fread(  $pre_file , filesize($_ID) ) or die('{"error": "Error: Cannot Open this file"}');
        //echo $file;
        fclose($pre_file);
        
        //decoding 
        $entries = json_decode($file);
        $entry_vars = get_object_vars($entries); //storing the retrieved JSON data
        
        // =====================================
        // == CHECKING PRIVACY SETTINGS ========
        // =====================================
        

        if ($_GET['title'] == '' && $_GET['text'] == '') { //just getting
            if ( $entry_vars['privacy'] != 'private' || $password_md5 == $entry_vars['password']) {
                echo $file;
            } else {
                echo '{"error": "Authentication Error! This note is private."}';
            }
        }
        else {  //writing
            if ( $entry_vars['privacy'] == 'public' || $password_md5 == $entry_vars['password']) {
                //echo 'Rewriting File..<br>';
                $file_write = fopen( $_ID , 'w+' ) or die('{"error": "Error Opening file for writing"}');
                //echo $file_write;
                
                // " \" \'  '
                $_BASE_JSON_EDIT = '
                    {
                        "title" : "' . addslashes($_GET['title']) . '",
                        "password" : "' . $password_md5 . '",
                        "text" : "' . addslashes($_GET['text']) . '",
                        "privacy" : "' . $entry_vars['privacy'] . '"
                    }';
                    //echo '<br>New JSON: ';
                    echo ($_BASE_JSON_EDIT);
                fwrite( $file_write , (string)$_BASE_JSON_EDIT ) or die('{"error": "Error Writing File. Type Mismatch?"}');
                fclose( $file_write);
                
                
            } else {
                echo '{"error": "Authentication Error! You need password to edit."}';
            }
        }
        
        echo  $entry_vars["id"];
        //entry_vars["id"]
    }
    else {
        //if file doesnt exist
        $_BASE_JSON = '
            {
                "title" : "' . addslashes($_GET['title']) . '",
                "password" : "' . $password_md5 . '",
                "text" : "' . addslashes($_GET['text']) . '",
                "privacy" : "' . $_GET['privacy'] . '"
            }';
        file_put_contents($_ID, $_BASE_JSON);
        echo $_BASE_JSON;
    }
    
    
    
// main.php?id=volo&password=file&title=file&text=file&privacy=protected
    
}
else {
?>



<?php
}


// M W C Model-json Wiew-html-js-css Control-php
/*
{ 
csinálás, tartama, jelszó(md5)
}
*/
//echo "<br><hr>Compiled w/o Errors.";
?>
