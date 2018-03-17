// ----------------------------------
// --- XMLHTTP CONNECTION------------
// ----------------------------------

//openNote()

//URL access input -  $('#openUrl');

currsite = "https://team-autism-rontap.c9users.io/notes/";
//password input  -  $('#passwordUrl');



function openNote() {//or create

        var xmlhttp = new XMLHttpRequest();
        selPrivacy = $("radio[name='privacy_settings'][checked='true']").attr('date');
        
        
        xmlhttp.onreadystatechange = function() {
                
                if ( (this.status==200) && (this.readyState==3) ) {


                       try {    currentNote = JSON.parse(this.responseText);  }
                       catch(e) { errorMsg='Error: Corrupted File, JSON error.';  nxt.notify('#not_err',4000); }
                       
                       console.log(this.responseText);
                       if (currentNote.error!=undefined) {
                               errorMsg = currentNote.error;
                               nxt.notify('#not_err',4000);
                       }
                       else {
                               $('#noteTitle').innerHTML = currentNote.title;
                               $('#content').innerHTML = currentNote.text;
                               $$('.omenu')[0].click();
                               
                               //share box
                               $('#shareEdit').value = currsite + "#id=" + $("#idUrl").value + "&password="+ $("#passwordUrl").value; 
                               $('#shareView').value = currsite + "#id=" + $("#idUrl").value;
                       }
                       //$('#noteTitle')
                }
                
                //console.log(this.readyState,this.status /*404 200 501*/);

        };
        //?id=volo&password=fildfgdfge&title=file&text=file&privacy=protected
        parsedText = "main.php?id=" + $("#idUrl").value + "&privacy="+selPrivacy ;
        //checking security
    
        if ( $('#passwordUrl').value != "") {
               parsedText += "&password="+ $("#passwordUrl").value; 
        }
        
        
        
        console.log(parsedText);
        xmlhttp.open("GET", parsedText , true);
        xmlhttp.send();
        
         
        
        return false;
        //???

}


function saveNote() {
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if ( (this.status==200) && (this.readyState==3) ) {
    
                try {    currentNote = JSON.parse(this.responseText);  }
                catch(e) { errorMsg='Error: Corrupted File, JSON error.';  nxt.notify('#not_err',4000); }
               
                console.log(this.responseText);
                if (currentNote.error!=undefined) {
                       errorMsg = currentNote.error;
                       nxt.notify('#not_err',4000);
                }
                else {
                         $("#saveIcon").innerHTML="radio_button_checked";
	                 $("#saveIcon").style.color="#4CAF50";
	                 nxt.notify('#not_save',1500);
                }
            }

        };
        //?id=volo&password=fildfgdfge&title=file&text=file&privacy=protected
        
        
        
        //
        
        parsedText = "main.php?id=" + $("#idUrl").value+"&password="+$('#passwordUrl').value+"&title="+$('#noteTitle').innerHTML+"&text="+$('#content').innerHTML;
        xmlhttp.open("GET", parsedText , true);
        xmlhttp.send();
        
        //???
        
}
// <input>


console.log( $_GET("id") );
console.log( $_GET("password") );

var currentNote="";

if ($_GET("id")!="") {
        $("#idUrl").value = $_GET("id");
        $("#passwordUrl").value = $_GET("password");
        $$('.omenu')[0].click();
        openNote();
}
