// installing service manager
const CURR_VER = 3.21;


var STATUS = null;
var response = {};
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service.js').then(function(registration) {
      // Registration was successful
      console.log('[ServiceWorker] REGISTERED', registration.scope);
    }, function(err) {
      // registration failed :(
      console.warn('[ServiceWorker] registration failed: ', err);
    });
  });
}


//checking upate
// defining request to check newest version
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // if we reached it, check whether its a newer version
        response = JSON.parse(this.responseText);
        if (Number(response.version) > CURR_VER) resetService(response.version);
    }
};

if ( navigator.onLine ) {
  // if we are online try to reach the newest version
  STATUS = "online";
  now = new Date().getTime()
  xmlhttp.open("GET", 'version.json?'+now, true);
  xmlhttp.send();
}
else {
  STATUS = "offline";
}

//resetting all the services
function resetService(to) {
  alert("Updating from version "+CURR_VER+" to "+to);
  navigator.serviceWorker.getRegistration().then(function(reg) {
    reg.unregister().then(function() { window.location.reload(true); })
    // removing all cache and reloading the site
  })
}

//updating version in the footer
setTimeout( () => $('footer').innerHTML="version " + CURR_VER , 1000 );
