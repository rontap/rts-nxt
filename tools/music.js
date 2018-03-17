function collectMusic(files) {
  loadedFiles=[];
  for (i=0;i<files.length;i++) {
    if (files[i].type.search("audio")>=0) {
      loadedFiles[loadedFiles.length] = {
        type : files[i].type,
        name : files[i].name,
        source : 'file:///'+musicDriveOpen.value+':/'+encodeURI(files[i].webkitRelativePath)
        //todo: load from other directories

      }
    }
  }
}




 musicControl = {
  savedVolume : 0,
  next : function() {
      this.load(++currentTrack);
  },
  prev : function() {
      this.load(--currentTrack);
  },
  load : function(no) {
    currentTrack=no;
    musicInput.src=loadedFiles[no].source;
    musicInput.type=loadedFiles[no].type;

    musicHolder.load();

    musicControl.toggle();

    currPlayedMusic.innerHTML=loadedFiles[no].name;


    musicControl.updateUI();
    musicControl.updatePlayList();
  },
    toggle : function() {
    if (!musicHolder.paused) { musicHolder.pause();  $('#musicPlayer .fab').innerHTML="pause"; $('body').classList.remove('musicPlaying'); }
    else {   musicHolder.play(); musicControl.updateUI();  $('#musicPlayer .fab').innerHTML="play_arrow"; $('body').classList.add('musicPlaying'); }
  },
  volume : function(call) {

    musicHolder.volume=call/100;
    if (call==0)  {
      volumeIcon.innerHTML="volume_off";
      $('#volumeIcon').classList.add('on');
      console.log('adding-on');
    }
    else {
      $('#volumeIcon').classList.remove('on');
    if (call<33) volumeIcon.innerHTML="volume_down";
    else volumeIcon.innerHTML="volume_up";
    }
  },
  toggleVolume : function() {
    if (musicHolder.volume==0) {
        musicControl.volume( musicControl.savedVolume );

    }
    else {
        musicControl.savedVolume=musicHolder.volume*100;
        musicControl.volume( 0 );  }
  },
  seek : function(call) {
    musicHolder.currentTime=(call/1000)*musicHolder.duration;
  },
   updateUI : function() {
     currPlayedTime.innerHTML = Math.floor(musicHolder.currentTime/60).pad() + ':' + Math.floor(musicHolder.currentTime%60).pad() +  " / "  + Math.floor(musicHolder.duration/60).pad() + ':' + Math.floor(musicHolder.duration%60).pad() ;
     currSeek.value=(musicHolder.currentTime*1000)/musicHolder.duration
     setTimeout(function(){
        musicControl.updateUI();
     },200);
   },
   updatePlayList : function() {
     temp="";
     for (i=0;i<loadedFiles.length;i++) {
        temp+="<div class='chip'id='track-play-id-"+i+"' onclick=musicControl.load(this.id.slice(14,Infinity))>"+loadedFiles[i].name+"</div>";
     };
     $('#currPlayListFull').innerHTML=temp;
   }

  }
