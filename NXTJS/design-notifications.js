nxt.notify = function(id , time, list) {
    var time = time ? time : 3000;
    console.log(time);
    if ( $(id).tagName=="TOAST" ) {
        if (! $(id).notificationInProgress ) {

          $(id).notificationInProgress = true;
          $(id).classList.add("on");
          $(id).style.bottom= (Number($$("toast.on").length)-1)*60+20+"px";

          $(id).notifitcationTimeout = setTimeout(function(){
            $(id).notificationInProgress = false;
            $(id).classList.remove("on");
            $(id).style.bottom="-120px";
          },time);
       }
       else return true;

    }
    else return false;

    $(id).onmouseover= function() {
        clearTimeout(  this.notifitcationTimeout );
        console.log("lalala");
      }
    $(id).onmouseleave= function() {
        $(id).notificationInProgress = false;
        nxt.notify('#'+this.id, 1000);
    }
}
