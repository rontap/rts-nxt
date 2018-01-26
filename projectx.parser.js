// parsing 
console.log('px parser inclided');

/*
[
    { time: 20, color:0 , ... , }, 

]




*/
parser = {};
parser.record = [];
party.initialTimestamp = new Date().getTime();
parser.reg = function() {
    
    console.log('reg');
    let currTimeStap = new Date().getTime();
    if (parser.record.length==0) {
        party.initialTimestamp = new Date().getTime();
        parser.record[0] = {time:0};
    }
    parser.record[ parser.record.length ] = {
        time: currTimeStap - party.initialTimestamp ,
        bars : "*",
        theme : "*"
        //this time: current time minus starting time minus time of the last one
    }
    console.log( currTimeStap - party.initialTimestamp, parser.record.last().time );
    parser.update();
}

parser.update = function() {
    $('#debugInfo').innerHTML=''
    for (i=1;i<parser.record.length;i++) {
        el = parser.record[i];
        $('#debugInfo').innerHTML+= String(i).padStart(3).replace(/\s/g,"&nbsp;")
        + ' - ' + String(Math.round(el.time/100)/10).padStart(4).replace(/\s/g,"&nbsp;")
         + " . " + String((el.time - parser.record[i-1].time) ).padStart(4).replace(/\s/g,"&nbsp;")
        + " | <span onblur='parser.record["+i+"].time=Number(this.innerHTML);console.log(this.innerHTML)' contenteditable>"+ el.time + "</span> "
        + " | <span onblur='parser.record["+i+"].bars=Number(this.innerHTML);console.log(this.innerHTML)' contenteditable>"+ el.bars + "</span> "
        + " | <span onblur='parser.record["+i+"].theme=this.innerHTML;console.log(this.innerHTML)' contenteditable>"+ el.theme + "</span> "
        +"<br>" ;

    }
    debug.scrollTop=99999
}


if ( $_GET().length() >= 2 ) {
    parser.record = JSON.parse(atob( $_GET("q")) ) ;
    parser.update();
}

function toURL() {
    console.log(JSON.stringify(parser.record))
    location.hash = "#q="+btoa( JSON.stringify( parser.record ));
}