<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700|Noto+Serif:400,700&subset=latin,cyrillic,greek,latin-ext' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="../NXTJS/elements-design.css">
<link rel="stylesheet" href="../NXTJS/design.css">
<link rel="stylesheet" href="../NXTJS/input-design.css">
<link rel="stylesheet" href="../NXTJS/mobile.css">
<link rel="import" href="wikidata/header.html">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>
<script>

console.log('hello');

function removeStyles(el) {
    el.removeAttribute('style');

    if(el.childNodes.length > 0) {
        for(var child in el.childNodes) {
            /* filter element nodes only */
            if(el.childNodes[child].nodeType == 1)
                removeStyles(el.childNodes[child]);
        }
    }

}


</script>



<container id="ULTRAC">
    <?php
    if (isset( $_GET['q']))
    {
        echo  file_get_contents( $_GET['q'] );
    }
    else {
         echo file_get_contents('wikidata/welcome.html');
    }
    ?>

</container>
<div id="ULTILOAD_WRAP">&nbsp;</div>
<img src="https://thomas.vanhoutte.be/miniblog/wp-content/uploads/spinningwheel.gif" id="ULTILOAD">

<style>
    body:not(.XRT-LOADED) #firstHeading {z-index:999; position:fixed; top:50px; left:0px; right:0px; text-align:center; border:none;}
    #ULTILOAD_WRAP, #ULTILOAD { transition:.4s;}
    #ULTILOAD_WRAP { position:fixed; top:0; left:0; right:0; bottom:0; background:#ededee;}
#ULTILOAD {position:fixed;top:0; left:calc(50% - 161px); top:calc(50% - 111px);}
    .XRT-LOADED #ULTILOAD,.XRT-LOADED #ULTILOAD_WRAP {opacity:0; !important; z-index:-2;}
</style>

<script>
setTimeout(function() {
	console.clear();
	removeStyles(ULTRAC);
	//$('#ULTRAC link[rel="stylesheet"]').remove();
	$('body').prepend('<mw-nav-header-element></mw-nav-header-element>');
	$('body').prepend('<mw-bottom-navigator></mw-bottom-navigator>');

	//definite
  $("#mw-head-base").append('<div id="mw-right-menu"></div>')
	$('#mw-right-menu').append('<div class="toc_nav"><i class="material-icons">view_day</i>');
  $('#mw-right-menu').append('<div class="plang_nav"><i class="material-icons">language</i>');
	$('#mw-right-menu').append('<div class="tools_nav"><i class="material-icons">bookmark</i>');

        $('.ujinfobox').addClass('card away maximise');



    $('.toc_nav').click(function(){
	   $('body').toggleClass('toctoggle_open');
    })
    $('.plang_nav').click(function(){
	   $('body').toggleClass('plangnav_open');
    })
	$('.tools_nav').click(function(){
	   $('body').toggleClass('ptb_open');
    })
    $('#mw-fr-revisiontag').html('');
    $('.mw-editsection').html('');


    $('.navbox').addClass('card away');
    $('body').addClass('XRT-LOADED');
},2500);

function setImageToSVG(img,svg){
  var xml = (new XMLSerializer).serializeToString(svg);
  img.src = "data:image/svg+xml;charset=utf-8,"+xml;
}
</script>
<div id="main-background">&nbsp;</div>

<div style="display:none;" id="new_age_images">
<svg id="more_info_bar" viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="pointer-events: none; display: block;"><g><path d="M22 3h-15c-.69 0-1.23.35-1.59.88l-5.41 8.12 5.41 8.11c.36.53.97.89 1.66.89h14.93c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-13 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#48F"></path></g></svg>

<svg id="expand_article_bar" viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="pointer-events: none; display: block;"><g><path d="M5 17.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm4-4.5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-6 12h18v-2h-18v2zm2-11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm0 4c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm4 3.5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8-.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-14-13.5v2h18v-2h-18zm14 5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm0 4c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-4-3.5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" fill="#f44"></path></g></svg>


    <svg id="warning_article_bar" viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="pointer-events: none; display: block;"><g><path d="M1 21h22l-11-19-11 19zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#f44"></path></g></svg>
</div>


 <link rel="stylesheet" href="wikidata/wiki-def-style.css">


<script>
	overcardCollapseHeight=1200;
function scrollSetTer(){
 document.body.onscroll=function(){
			console.log(window.scrollY);
            if (window.scrollY>overcardCollapseHeight) {
                $('html /deep/ nav').addClass('on');
				$('body').addClass('nav-on');
                $('html /deep/ nav span').html(firstHeading.innerHTML);
            }
            else {
                $('html /deep/ nav').removeClass('on');
				$('body').removeClass('nav-on');
            }
	 $('#main-background').css('top',(-1)*(window.scrollY/2));
        }


}
	function plsSetScroll() {

 setTimeout(function(){
       scrollSetTer();
	   plsSetScroll();
    },1000);

	}


	plsSetScroll();
	colorVariety=["26A69A","A1887F","29B6F6","7E57C2","BDBDBD","42A5F5","E57373","CE93D8","66BB6A","FFA726"];

	 setTimeout(function(){
		 /*BG randomiser*/
		 a=$('#firstHeading').text();
		 b=String(a.charCodeAt(0)*a.charCodeAt(1));
		 sel=b[b.length-1];
		 $('#main-background').css('background','#'+colorVariety[sel]);

		 if ($('.ujinfobox').length<1) {
		 	$('#main-background').css('opacity',0);
			overcardCollapseHeight=60;
		 }
	 },1000);

	 setTimeout(function(){

		 for (var isv=0;isv<$('img').length;isv++)
        {   console.log($($('img')[isv]).css('width'));
            if ($($('img')[isv]).attr('width')>600) {
                $($('img')[isv]).addClass('panorama');
                $($('img')[isv]).css('width',innerWidth);
            }
        }
        $('a[href*="wiki"]').each(function(){
            $(this).attr('href', 'wiki.php?q=http://hu.wikipedia.org'+$(this).attr('href'));
		});
		 },3500);
</script>

 <link rel="stylesheet" href="wikidata/wiki-def-style.css">
