//listMEnu
function selectMenu(fn) {
  $('body').classList.remove('conversion');
  $('body').classList.remove('write-in');
  $('body').classList.remove('all-holder');
  $('body').classList.remove('menu-on');
  setTimeout(function(){
  $('body').classList.add(fn);
},80)


}

for (i=0; i<$$('element').length;i++) {
  $$('element')[i].onclick = function(event) {
    console.log(this.getBoundingClientRect());
    save = this.getBoundingClientRect().y;
    bottom = window.innerHeight - this.getBoundingClientRect().bottom;
    this.classList.add('transition');

    this.style.top = save;
    this.style.bottom = bottom;
    setTimeout(function(self) {
      self.classList.add('on');
      setTimeout(function(){
      $('#backArrow').classList.add('on');

      },300)
      $('body').classList.add('twoSpirit');
      $('.transition.on div.list').$$('span')[0].style.top = 58 + 125 + "px";
      $('.transition.on div.list').onscroll = ()=> scrollTubeElement($('.transition.on div.list'));
    },200 ,this);
  }
}
function removeAllElementActive() {
          $('body').classList.remove('twoSpirit','scrolledToPeek');
    for (i=0; i<$$('element').length;i++) {
      $$('element')[i].classList.remove('on');

    }
    setTimeout(function() {
      for (i=0; i<$$('element').length;i++) {
        $$('element')[i].classList.remove('transition');

      }
    },500);
      $('#backArrow').classList.remove('on');
}

/////

scrollTubeElement = function(element) {
  console.log(element.scrollTop);
  if (element.scrollTop < 125 ) {

    element.$$('span')[0].style.top = 58 + 125 - element.scrollTop +"px";
$('body').classList.remove('scrolledToPeek');
  }
  else {
    element.$$('span')[0].style.top = 58;
      $('body').classList.add('scrolledToPeek');
  }
}
