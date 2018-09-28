

    <title>Ultron URL / Admin Panel</title>
    <meta charset="UTF-8">
<style>
    body {
        padding:20px;
        background:#eee;
        font-family: monospace;
        color:#222;
        max-width: 800px;
    }
    input, span, body, button {
        margin:5px;
    }
    input:not([type]) {
        width:200px;
    }
    #open {

    vertical-align: top;
    }
    div:not([not]) {
        border:2px solid #444;
        padding:7px;
        display: inline-block;
        background:#fff;
    }
    b {
        color:black;
    }
    body>div:last-child {
        display: none !important;
        opacity:0 !important;
        bottom:-90px !important;
    }
    h1 {
      background:#eee;position:fixed;top:-20px;padding:20px;left:10px;right:0;
    }
    </style>

    <h1 style="">
    Ultron Admin Panel
  </h1><br><br><br>
    <b>Quick Links:</b> <a href="newurl.html">Interface and API info</a> | <a href="url.php">main PHP</a>
    <br><br>

    <?php
        $password = @md5($_POST["key"]);

        $myfile = fopen( "admindata.json" , "r") ;
        $prevContainer = fread($myfile,filesize(   "admindata.json" ));


        if (  $prevContainer == $password ) {

            if ( isset($_POST["newkey"] )) {
                $myfile = fopen( "admindata.json" , "w+");
                $temp = md5($_POST["newkey"]);
                echo  $temp;
                fwrite( $myfile, $temp);
                fclose($myfile);
                unset($_POST["newkey"]);
                header("Refresh:0");
            }

            ?>
                Logged in as Admin<br><br>
                <hr><br>
                <!--?=count($entry_vars)?--> Elements in the database<br><br>
                You can always edit a link<br> using the Admin panel password as a key.<br><br>
                <button>Backup Database</button> |
                <button>Delete Database</button><br><br>
                <div>
                    <form>
                    <b>Link Creation Policies</b><br>
                    <label ><input type="checkbox" name="plc">Allow Public link creation</label><br><br>

                    <input type="submit" value="update policy">
                    </form>
                </div>
                <br><br>
                <div>
                    <b>Admin Account Control</b>
                    <br><br>
                    <form method="post"><input name="key" value="Log Out" type="submit"></form>
                    Set new password:
                    <form  method="post">
                    <input name="newkey">  <button>change</button>
                    </form>
             </div>
            <?php
        }
        else {
          //echo($password . "<br>" . $prevContainer);
            ?>
                Please Log in:<br><br>
                <form method="post">
                <input name="key" type="password"> <button>Log In</button>
                </form>
                <hr><br>
                The default password is <i>ultron</i><br><br>
               <details>
                 <summary>Forgot Admin Password</summary><br>
                   You'll need to change the contents of ultron/admindata.json in  to:<br>
                   ce0efa8f0b559c8923a1afef36c0b559<br>
                   This will reset the password to the default: <i>ultron</i>
               </details>
            <?php
        }


    ?>
<div></div>
</body>
