(function(){

  var pressKey = function(key)
  {
    var event = new Event('keydown');
    event.which = key;
    event.bubbles = true;
    event.cancelable = true;
    
    document.body.dispatchEvent(event);
  };
  
  var releaseKey = function(key)
  {
    var event = new Event('keyup');
    event.which = key;
    event.bubbles = true;
    event.cancelable = true;
    
    document.body.dispatchEvent(event);
  };
  
  var pressedKeys = [];
  
  var threshold = 0.2;
  
  var tick = function()
  {
    var keys = [];
    
    var addKey = function(key)
    {
      if(keys.indexOf(key)==-1)
      {
        keys.push(key);
      }
    }
    
    var gamepads = navigator.getGamepads();
    
    for(var i in gamepads)
    {      
      if(!gamepads[i] || !gamepads[i].axes)
      {
        continue;
      }
      
      if(gamepads[i].axes[0]<-threshold)
      {
        addKey(65);
      }
      
      if(gamepads[i].axes[0]>threshold)
      {
        addKey(68);
      }
      
      if(gamepads[i].axes[1]<-threshold)
      {
        addKey(87);
      }
      
      if(gamepads[i].axes[1]>threshold)
      {
        addKey(83);
      }
    }
    
    for(var i in pressedKeys)
    {
      if(keys.indexOf(pressedKeys[i])==-1)
      {
        releaseKey(pressedKeys[i]);
      }
    }
    
    for(var i in keys)
    {
      if(pressedKeys.indexOf(keys[i])==-1)
      {
        pressKey(keys[i]);
      }
    }
    
    pressedKeys = JSON.parse(JSON.stringify(keys));
    
    if(keys.length)
    {
      console.log(keys);
    }
    
    setTimeout(tick,15);
  }
  
  tick();
  
})();
