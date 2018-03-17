var baseText='';
function openNote(id,pw) {//or create

        var xmlhttp = new XMLHttpRequest();
         
        xmlhttp.onreadystatechange = function() {
                
                if ( (this.status==200) && (this.readyState==3) ) {


                       try {    currentNote = JSON.parse(this.responseText);  }
                       catch(e) { errorMsg='Error: Corrupted File, JSON error.';   }
                       
                       console.log(this.responseText);
                       if (currentNote.error!=undefined) {
                               
                       }
                       else {
                               $('#title').innerHTML = currentNote.title;
                               $('#perTitle').innerHTML = currentNote.title;
                               $('#text').innerHTML = currentNote.text;
                        
                       }
                       //$('#noteTitle')
                }
                
                //console.log(this.readyState,this.status /*404 200 501*/);

        };
        //?id=volo&password=fildfgdfge&title=file&text=file&privacy=protected
       
       
        //checking security
     baseText = "id=" + id + "&privacy=private" ;
        if ( pw != undefined) {
               baseText += "&password="+ pw; 
        }
         parsedText = "main.php?" + baseText;
        
        
        console.log(parsedText);
        xmlhttp.open("GET", parsedText , true);
        xmlhttp.send();
        
         
        
        return false;
        //???

}

nxt.location="../NXTJS/"