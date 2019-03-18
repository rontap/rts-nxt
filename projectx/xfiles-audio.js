var playURL;

connectedFilter = function(){};

  function loadFile() {
      var fileReader  = new FileReader;
        fileReader.onload = function(){
            var FRbuffer = this.result;
            STATUS="fileReaderResponse";
            }
     fileReader.readAsArrayBuffer(audioFile.files[0]);

     url = URL.createObjectURL(audioFile.files[0]);
     loadSound(url);
     //audio_player.play();
     console.log("RD");
}

if (! window.AudioContext) {
    if (! window.webkitAudioContext) {
        alert('no audiocontext found');
    }
    window.AudioContext = window.webkitAudioContext;
}
var context = new AudioContext();
var audioBuffer;
var sourceNode;
var analyser;
var javascriptNode;

audio_player.onplay = function() {
    technocheck()

};


    // get the context from the canvas to draw on
    var ctx = $("#canvas").getContext("2d");

    // create a gradient for the fill. Note the strange
    // offset, since the gradient is calculated based on
    // the canvas, not the specific element we draw
    var gradient = ctx.createLinearGradient(0,300,0,0);


    gradient.addColorStop(0, 'hsl(0,50%,50%)');
    gradient.addColorStop(1 / 6, 'hsl(40,50%,50%)');
    gradient.addColorStop(2 / 6, 'hsl(90,50%,50%)');
    gradient.addColorStop(3 / 6, 'hsl(140,50%,50%)')
    gradient.addColorStop(4 / 6, 'hsl(190,50%,50%)');
    gradient.addColorStop(5 / 6, 'hsl(240,50%,50%)');
    gradient.addColorStop(1, 'hsl(320,50%,50%)');


    // load the sound

    var cloneNode;
    var STATUS ="pre-init";
    var bufferAtPos=0;
    var beginStamp;
    var endStamp;
    var diffTimeStamp;
    javascriptNode = context.createScriptProcessor(2048, 1, 1);

    function setupAudioNodes() {
        var bufferAtPos = 0;
        // setup a javascript node

        // connect to destination, else it isn't called
        javascriptNode.connect(context.destination);


        // setup a analyzer
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.1;
        analyser.fftSize = 256;
        //analyser.

        // create a buffer source node
        sourceNode = context.createBufferSource();
        sourceNode.connect(analyser);
        analyser.connect(javascriptNode);

        sourceNode.connect(context.destination);

    }

    function updateUIPlay() {
      statusbox.innerHTML=STATUS;

      $('#part_load').style.maxHeight='0px';
      $('#part_analyse').style.maxHeight='400px';
      $('#part_analyse').style.opacity='1';
      $('#part_load').style.opacity='0';
      $$('#progress h1')[0].classList.remove('on');
      $$('#progress h1')[1].classList.add('on');
    }
    // load the specified sound
    function loadSound(url,at) {
        playURL = url;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        STATUS="loading music";
        updateUIPlay();
        // When loaded decode the data
        request.onload = function() {

            // decode the data
            context.decodeAudioData(request.response, function(buffer) {
                // when the audio is decoded play the sound
                STATUS="reading filebuffer";
                statusbox.innerHTML=STATUS;
                setupAudioNodes();
                console.log(buffer);
                playSound(buffer,at);
                beginStamp = new Date().getTime();
                bufferAtPos=0; //resetting buffer
              //updating UI

            }, onError );
        }
       
          onError = e => alert('Error, could not connect to music.\n');
          request.onerror = onError;
          request.send();
        
        
    }


    function playSound(buffer,at) {
        sourceNode.buffer = buffer;
        sourceNode.start(at);
        cloneNode = sourceNode.buffer;
    }

    // log if an error occurs
    function onError(e) {
        console.log(e);
        STATUS="E:MediaNotFound"
        statusbox.innerHTML=STATUS;
    }

    // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume
    javascriptNode.onaudioprocess = function() {
        bufferAtPos++;
        // get the average for the first channel
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);

        // clear the current state
        ctx.clearRect(0, 0, 600, 300);

        // set the fill style
        ctx.fillStyle=gradient;
        connectedFilter(array);
        drawSpectrum(array);

    }


    function drawSpectrum(array) {
      temp = [];
        for ( var i = 0; i < (array.length); i++ ){
            var value = array[i];

            ctx.fillRect(i*7,300-value,6,300);
            //  console.log([i,value])
        }


        addlnr(array);
        checkIfEnd();
    };

    function checkIfEnd() {
      // current sourceNode.context.currentTime
      //
      try {
        if (sourceNode.buffer.duration<=sourceNode.context.currentTime)
        {
          stopIt();
        }
      }
       catch (e) {

         STATUS="Playing..";
         statusbox.innerHTML=STATUS;
       }

    }
      const maxsound = 170;
    var ODM="";
    var devMode = true;
    TDV = 1;//SAMPLE TICK SIZE  [HORIZONTAL WIDTH]
    SPL = 8;//SPLIT             [VERTICAL WIDTH]
    DLW = 6;//DEFAULT LINE WIDTH

    function setDLW(to) {
      DLW=to;
      $('#styles').innerHTML="<style>#ssum span { width:"+DLW+"px !important;}</style>";
      drawCanvas(); //updating canvas
      return DLW;
    }
    function addlnr(arr) {

        //SUMMING UP STUFF
        sound = arr.reduce((a, b) => a + b, 0) / arr.length;

        for (s=0;s<SPL;s++) {
          if (ticks%TDV==0) storage[s][Math.floor(ticks/TDV)]=0;
        }

        parts=64/SPL;
        for (k=0;k<SPL;k++) {
          storage[k][Math.floor(ticks/TDV)] += arr.slice(parts*k, parts*(k+1)  ).reduce((a, b) => a + b, 0);
        }



        eqsound = Math.round ( ( sound / maxsound )*255 );
        ODM+='<span style="background:hsl('+eqsound+',50%,50%)" nth='+ticks+' tabindex='+ticks+'> </span>';
        ticks++;
        if (devMode) {
          ssumLINE.innerHTML=ODM;
          if (ticks%10==0) drawCanvas();
          ssum.scrollLeft=99999;
        }
    }
    var ticks = 0;

    $$ = (calle)=>document.querySelectorAll(calle);
    storage=[...new Array(128)].map(x => []);
    ctx2="";

    function drawCanvas() {
      runin.setAttribute('width',ticks*DLW+'px');
          ctx2 = $("#runin").getContext("2d");
          ctx.clearRect(0, 0, ticks*TDV, 100);
        for (s=0;s<SPL;s++) {
          for (i=0;i<storage[0].length;i++) {

              eqsound = Math.round ( ( storage[s][i]*(SPL/2) / (maxsound*TDV*64) )*255 );
              //ssum.innerHTML+='<span style="background:hsl('+eqsound+',50%,50%)" f> </span>';
              ctx2.fillStyle='hsl('+eqsound+',50%,50%)';
              if (SPL>32) {
                  ctx2.fillRect(i*DLW*TDV,s*2,DLW*TDV,2);
              }
              else {
                  ctx2.fillRect(i*DLW*TDV,s*(10-SPL/4),DLW*TDV,(10-SPL/4));
              }


          }
        }
    }
    function stopIt() {
      $('#part_analyse').style.maxHeight='0px';
      $('#part_edit').style.maxHeight='400px';

      $('#part_edit').style.opacity='1';
      $('#part_analyse').style.opacity='0';
      $$('#progress h1')[1].classList.remove('on');
      $$('#progress h1')[2].classList.add('on');


      $('#audioHolder').style.opacity=1;

      javascriptNode.disconnect();
      sourceNode.disconnect();
      analyser.disconnect();

      if (isMicrophoneOn) {
        recorder.stop();
        STATUS="converting Blob";
        statusbox.innerHTML=STATUS;
      }
      else {
        duration = sourceNode.buffer.duration;
        audio_player.src=playURL;
        STATUS="processing";
        statusbox.innerHTML=STATUS;
      }

      endStamp = new Date().getTime();

      diffTimeStamp = ( endStamp - beginStamp ) / 1000;
      if (!devMode)   ssumLINE.innerHTML=ODM;

      //ssum.innerHTML+='<br><br><br>';

      setTimeout(function(){
        drawCanvas();
        console.log('CTX2');
        STATUS="Done";
        statusbox.innerHTML=STATUS;
        //ssum.innerHTML+=eq.innerHTML;
      },500)

    }
//   location.hash = "#q="+btoa( JSON.stringify( parser.record ));
    function exportToX(array) {
      let temp=[];
      for (i=0;i<array.length;i++) {
        temp[i] = {
          'time' : Math.round((array[i]/ticks)*diffTimeStamp*1000,.001),
          'bars' : '*',
          'theme': '*'
        }
      }
      return temp;
    }
    function sendToX(array) {
      temp =  exportToX(array)
      val = "#q="+btoa( JSON.stringify( exportToX(array) ));

      STATUS="Exported!";
      statusbox.innerHTML=STATUS;

      window.open("projectx.html"+val);
    }
    STATUS="ready";
    statusbox.innerHTML=STATUS;

    //values=8
    autoTuneVaules=[];
    function updateAutoTune() {
      temp=[];
      for (i=0;i<$$('dialog input[type="range"]').length;i++) {
          temp.push( Number( $$('dialog input[type="range"]')[i].value ) );
      }
      autoTuneVaules=temp;
    }
    function autoTune(values,update) {
      positions=[[],[],[],[],[],[],[],[]];
      posActive = [...new Array(ticks)].map(x => 0);

      for (i=1;i<SPL;i++) {

        count=0;
        index=0;
        storage[i].map( function(x){
          if(x> ((values[i]/100) * (maxsound*SPL*TDV) )) {
            positions[i].push(index);
            posActive[index]++;
            count++;
          }
          index++;

        });
        console.log(count);
      }
      return autoDraw(positions,posActive);
    }

    function autoDraw(delimiter,sum) {
      shift = sum.xdiff();
      runin.setAttribute('width',ticks*DLW+'px');
      ctx2 = $("#runin").getContext("2d");
        ctx.clearRect(0, 0, ticks*TDV, 100);
        for (s=0;s<SPL;s++) {
          for (i=0;i<ticks;i++) {
              currShift = Math.pow(shift[i],1/2)*15;
              if (delimiter[s].indexOf(i)>=0) {   ctx2.fillStyle='hsl('+((200+currShift))+',50%,'+(50+currShift/4)+'%)'; }
              else {  ctx2.fillStyle='hsla(0,0%,50%,0)'; }

              ctx2.fillRect(i*DLW*TDV,s*(10-SPL/4),DLW*TDV,(10-SPL/4));
          }
        }
        console.log(sum,shift);
        return sum.xdiff();

    }


    function autoMix(min) {
        mix = autoTune(autoTuneVaules,0);
        worthy=[];
        for (i=0;i<mix.length;i++) {
          if (mix[i]>min) worthy.push(i*TDV);
        }
        console.log(worthy)
        renderKeyframes(worthy);
    }
    Array.prototype.xdiff = function() {
     temp=[];
     for (i=0;i<this.length;i++) {
        if (i==0)                  temp[i] =  Math.toPos(this[i]  - (this[i+1])  )
        else if (i==this.length-1) temp[i] =  Math.toPos(this[i]  - (this[i-1])  )
        else                       temp[i] =  Math.toPos(this[i]  - (this[i-1] + this[i+1])/2  )

     }
     return temp;
    }
    Math.toPos = function(call) {
      if(call<0) return 0;
      else return call;
    }
