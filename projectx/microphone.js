// XFILES MICROPHONE ADDITIONS

isMicrophoneOn = false; //going back to home


function switchToMicrophoneInput() {
  isMicrophoneOn = true;
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(loadMicrophoneAudioNodes);
}


function loadMicrophoneAudioNodes(stream) {
    STATUS="listening to music";

    beginStamp = new Date().getTime();
    bufferAtPos=0; //resetting buffer
    sourceNode = context.createMediaStreamSource(stream);

    javascriptNode.connect(context.destination);
    updateUIPlay();

    analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.1;
    analyser.fftSize = 256;

    sourceNode.connect(analyser);
    analyser.connect(javascriptNode);

    sourceNode.connect(context.destination);

    toggleGain();//preventing back echo
    saveMicrophoneInput(stream);


  };

//BODGE

// appends an audio element to playback and download recording
function createAudioElement(blobUrl) {
    audio_player.src = blobUrl;
}


recorder = false;

function saveMicrophoneInput(stream) {

    const chunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
      // add stream data to chunks
      chunks.push(e.data);
      // if recorder is 'inactive' then recording has finished
      if (recorder.state == 'inactive') {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          createAudioElement(URL.createObjectURL(blob));
      }
    };
    recorder.start(0);

  };
