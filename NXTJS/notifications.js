nxt.notify = function(id , time) {
    var time = time ? time : 3000;

    if (!isNaN(id)) {//dynamic notification creation
      timeTemp=id;
      let el = document.createElement("toast");
        el.id = 'notification_' + Math.floor(Math.random()*100000);
        id='#'+el.id;
      let content = document.createTextNode(time);
      el.appendChild(content);

      document.body.append(el);
      setTimeout(function(){
        console.log('notify>>>',id,timeTemp);
          return nxt.notify(id,timeTemp);

      },150);
    }

    else {

    try { $(id).tagName } //making sure it exists
    catch (e) { return false; }

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
       else return true;  //notification already in progress

    }
    else return false; //invalid notification ID
    }

    $(id).onmouseover= function() {
        clearTimeout(  this.notifitcationTimeout );
        console.log("lalala");
      }
    $(id).onmouseleave= function() {
        $(id).notificationInProgress = false;
        nxt.notify('#'+this.id, 1000);
    }
    return id;
}
