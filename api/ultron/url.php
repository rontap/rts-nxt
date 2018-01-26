




<?php

function randomString($length = 6) {
  $str = "";
  $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
  $max = count($characters) - 1;
  for ($i = 0; $i < $length; $i++) {
    $rand = mt_rand(0, $max);
    $str .= $characters[$rand];
  }
  return $str;
}
/* RETURN CODES

  0 = succesfull operation, URL available
  1 = not enugh parameters
  2 = fatal file IO error
  3 = succesfully deleted [not used]
  4 =
  9 = invalid acces key

    FLAGS

    for redirecting:
    q=[FROM_LINK]

    for setting new link:
    from=[FROM_LINK]
    to=[TO_LINK]
    key=[ACCES_KEY]

    additional flags:
    devmode (doesnt automatically forward)

*/
   $_minUrlLength = 5;
   //try to open file for reating
   $myfile = fopen("url.json", "r") or die(", code:2, message:'Unable to Acces JSON'}");

   //copy file contents to a variable, replacing closing
   $prevContainer = fread($myfile,filesize("url.json"));

   $entries = json_decode($prevContainer);
   $entry_vars = get_object_vars($entries);




   if (isset($_GET["q"]) ) {
    ?>
    <style>
      html,body{ background:#ddd;font-family:monospace;padding:20px;font-size:20px;margin:0;}
    </style>
  <?php
      if (!(isset($entry_vars[ $_GET["q"] ]))) {
        echo '<br><b>Broken Link! Sorry About that.</b><br>';
      }
      else {
        if  (!(isset($_GET["devmode"]))) {
          echo '<script> setTimeout(function(){location.href="' . $entry_vars[ $_GET["q"] ][0] .'"},0);</script>';
        }
        else {
          echo '<b>developer info:</b><br>';
          echo $_GET["q"] . '<br>' . $entry_vars[ $_GET["q"] ][0] . '<br>MD5 key: '. $entry_vars[ $_GET["q"] ][1] . '<br><hr>';
        }

        echo '<div>You are getting redirected to:<i>'  . $entry_vars[ $_GET["q"] ][0] . '</i><br><br>';
        echo 'If not redirected please <a href='. $entry_vars[ $_GET["q"] ][0]. '>click here</a><br><br>';
      }


      echo "<br>RTS NXT <i>Ultron Redirect</i></div>";
   }  else {

   ?>
   { "version" : "2"
<?php

//if no URL is set, do not run
  if (!(isset($_GET["to"]))) echo  ', "code":"1" , "message": "No Final URL set"}';

  else {


    //write out information
    //echo  'from:'. $_GET["from"] ;
    //echo 'to:' . $_GET["to"] ."<br><hr>";

    //creating a salty acces key
    $acc_key =   substr( rand() . md5( $_GET["from"] ) , 0 , 10);

    //echo $acc_key;


    $prevContainer = substr(  $prevContainer , 0, -1);
    //print_r($entries);
    //echo '<br><hr>';

    //making sure the reqired length is given
    $redir_from = $_GET["from"];

    if (!(is_numeric($redir_from)) && strlen($redir_from)<$_minUrlLength) {
      die(', "code":"4", "message":"Custom URL Too Short!"}');
    }//if desired a number
    else if (is_numeric($redir_from)) {
      if ( $redir_from < $_minUrlLength ) $redir_from = $_minUrlLength + 1; //doesnt allow for very short URLs
      $redir_from = randomString($redir_from);
    }


    if ( array_key_exists($redir_from , $entries) ) {

      echo ', "overlap":"true"';
      if ( substr(md5( @$_GET["key"] ), 0 , 10) != $entry_vars[ $redir_from ][1] ) {
        die(', "code":"9", "message":"Invalid Acces Key!"}');
      }
    }

    //try to open file for writing, earasing original file
    $myfile = fopen("url.json", "w+") or die("Unable to write to file!");






    //adding current URL shortening to the list and closing }
    $prevContainer = $prevContainer . ',"' . $redir_from . '":["' . $_GET["to"] . '" , "'. substr(md5($acc_key) , 0 , 10). '"]}';

    //write out for debug
    echo ', "key":"'. $acc_key.'"';
    echo ', "url":"' . $redir_from.'"';


    //write variable to file and close.
    fwrite($myfile, $prevContainer);
    fclose($myfile);

    echo ',"code":"0"}';
    }  //end of Else




  }//largeElse
?>
