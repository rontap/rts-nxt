<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700|Noto+Serif:400,700&subset=latin,cyrillic,greek,latin-ext' rel='stylesheet' type='text/css'>
<script src="../api/note.js"></script>
<link href='https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700|PT+Sans&subset=latin,latin-ext' rel='stylesheet' type='text/css'>


<script src="../NXTJS/jsplus.js" type="text/javascript"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>
<body >
<nav id="mnav">
	<div id="title">MEK:READER
		<i class="material-icons" id="arr_back">arrow_backward</i>
	</div>
	<div onclick=location.search=''><!--POWER MEK --></div>


	<!--button onclick="goUp();">go up</button--->

	<input class="holo" placeholder="navigate in power MEK">
	<button onclick="$('html, body').animate({scrollTop: '0px'}, 800);"  id="upChap"><i class="material-icons">vertical_align_top</i></button>
	<button onclick="chapter(-1);" id="prevChap"><i class="material-icons">arrow_upward</i></button>
	<button onclick="chapter(1);" id="nextChap"><i class="material-icons">arrow_downward</i></button>
	<input type="number" id="currChapter" value="0">

	<switch checked="true" onmouseup="$('body').classList.toggle('night');" id="lightSwitch"><span>Light Mode</span><span>Night Mode</span></switch>


	<!--button onclick="">search MEK</button-->
</nav>

<div id="favbar">
	favourites
	<!--button onclick="makefav();alert('Added to Favourites!')" id="addStar">add to favourites</button-->
	<select id="favs">
		<option>favourites: </option>
	</select>
	<button onclick='alert("clearing all favourites");localStorage.removeItem("MEKfav");location.reload()' id="clearStar">remove</button>
	<!--button real onclick="makestat();" style="margin-left:42px;">show statistics</button-->


	<i class="material-icons fab h1-connect-fab" style="background: #607d8b;    color: white;    margin-top: -27px;">star</i>
</div>

<footer>
	<status value="100" block="" id="progressbar"><div></div></status>

	<i id="expandBtn" class="material-icons">keyboard_arrow_up</i>
</footer>
<aside></aside>

<style>
#expandBtn {
	margin-top: -29px;
margin-left: 790px;
color: #222;
}
status {
	    width: 200px;
}
#lightSwitch {
	margin-top:0;
	margin-left:130px;
	position:absolute;
	padding: 6px 15px;
}
input.holo {
margin-top: -40px !important;
	position: absolute;
border: none !important;
width: 80%;
max-width: 700px;
min-width: 400px;
display: block;
font-size: 17px;
padding:10px !important;
margin-left: -38px;
color: black;
    right: 5px;
background: white !important;
box-shadow: 0px 3px 4px var(--darker-primary);
opacity: .9;
left:560px;
}


#arr_back { position: absolute;
    border-radius: 4px;
    border: 1px solid #8D6E63;
    width: 25px;
    left: 187px;
    display: block;
    top: 5px;
		padding:10px;

}
#title {
	display: inline-block;
	background:red;
	padding: 16px 17px 15px 18px;
	margin:-10px;
	background: #8D6E63;
}
#clearStar {
	background:#ddd;
	border-radius: 4px;
	color:#444;
	border:none;
	padding: 5px;
	text-align:center;
	display: inline-block;
	margin-left:10px;
}
#favs {

	height: 60px;
border: none;
border-bottom: 2px solid #607d8b;
}
#favbar {
	position:absolute;

		padding:0 40px;
	background:white;
	top:50px;
	height:60px;
	left:0; right:0;
}
:root {
	--dark-primary:#795548 !important;
	--primary:#8D6E63 !important;
	--darker-primary: #5D4037 !important;
}
#prevChap, #nextChap, #currChapter, #upChap {
	margin-left: calc( 50% - 530px);
	position:fixed;
	left:30px;
	top:200px;
	background:#f1f1f1;
	border-radius: 4px;
	border:none;
	border:1px solid #bbb;
}
#currChapter {
  top:255px;
	width:62px;
	text-align: center;
}
#nextChap {
	top:287px;
}
#upChap {
	bottom:14px;
	top:auto;
}
.night .fab {
	    box-shadow: 0px 3px 4px #222 !important;
}
	CONTAINER, CONTAINER a, CONTAINER table {
	transition:.4s;
	}
	CONTAINER, aside {
		font-family: 'PT Serif', serif;
		display:block;
		font-size:18px;
		background:#ddd;
		max-width:1000px;
		margin:0 auto;
		margin-top:80px;
		padding:10px;
	}
	aside:empty { display:none; }
	aside {
	max-height:200px;
		overflow-y:scroll;
		border:3px solid #48F;
	}
	nav, footer {
	position:fixed;
	left:0;
	background:white;
	height:30px;

	padding:10px;
	border-top:1px solid #ddd;
	}
	.night footer {
		background:#222;
		border-top:1px solid #666;
	}
	.night #expandBtn {
		background:#ddd;
	}
	nav {
		 top:0;right:0;
		 box-shadow:0px 2px 4px #666;
		 padding-top:10px !important;

	}
	footer {
	left:calc(50% - 425px);
	width:830px;
		bottom:0; height:25px;	background:#48F;
		min-width:165px;
		opacity:0.98 !important;
		transition:.2s;
	background:white;
	}
	footer#expandBtn {

	}
	footer:hover {
	opacity:1;

	}

	nav div {
	color:white;
		font-size:20px;
		display:inline-block;

	}
	.glow {
		transition:.4s;
		background:#48F;
		color:white;
		animation:glower 2s infinite ;
		box-shadow:0px 0px 2px #aaa;
	}
	@keyframes glower {
		0%   {box-shadow:0px 0px 2px #aaa; opacity:1;}
		50%  {box-shadow:0px 0px 6px #666; opacity:0.9;}
		100% {box-shadow:0px 0px 2px #aaa; opacity:1;}
	}
	/*night mode*/
	.night {
			background:#444 !important;
	}
	.night CONTAINER {
		    box-shadow: 0px 2px 4px #000 !important;
		background:#222;
		color:#ddd;
	}
	.night h3 * , .night center * {
		color:#f1f1f1 !important;
	}
	.night nav  {
		 box-shadow:0px 2px 4px #333;
	}
	.night CONTAINER table * {

		color:#ddd;
	}
	.night CONTAINER a {
		color:#aaa;
	}
	.night CONTAINER a:visited {
		color:#a7719f !important;
	}
	.night {
		background:#444;
	}
	CONTAINER {
		margin-top:170px !important;
		font-family: 'Open Sans', sans-serif;
		padding:25px;
		background:#f1f1f1;
	}
	body {
		background:#ddd !important;
	}
	.dont-show-image {
		display: none;
	}
</style>
<script>
//navigation code


console.log('hello');
	function makestat() {
			temp = { content: $("container").text() }
			var s=note.stat.ultrastat(temp);//we store briefly this
		a='<table>';
		a+='<tr><td>characters</td><td>'+s[0]+'</td></tr>';
	    a+='<tr><td>characters (no space)</td><td>'+s[1]+'</td></tr>';
		a+='<tr><td>words</td><td>'+s[2]+'</td></tr></table><br>characters<table>';
		for (i=0;i<s[5][0].length;i++) {
			a+='<tr><td>'+s[5][1][i]+'</td><td>'+s[5][0][i]+'</td></tr>';
		}
		$('aside').prepend(a);
	}

	//favourites
	$('#favs').onchange = function(){
		location.search=favs.options[favs.selectedIndex].value;
	};

	favourites ={a:[]};
	if ( localStorage.MEKfav !== undefined ) {
			favourites.a=JSON.parse(localStorage.MEKfav);
		for ( i=0; i< favourites.a.length ;i++) {
				favs.innerHTML+="<option value="+
					favourites.a[i][0]+">" +
					favourites.a[i][1] + "</option>"
		}
	}
	function makefav() {
	 	favourites.a[favourites.a.length]=[location.search, $('font[size=6]').text() ];
		favs.innerHTML+="<option value="+
			favourites.a[favourites.a.length-1][0]+">" +
			favourites.a[favourites.a.length-1][1] + "</options>";

		localStorage.MEKfav=JSON.stringify(favourites.a);
	}


	//go up
	function goUp() {
	var text = location.search	;
	if ( 0>(text=location.search.search('//'))) 	{
		output = location.search.slice(
			3 ,location.search.lastIndexOf('/')
			)
	}
	else {
		output = location.search.slice(
			3 ,location.search.lastIndexOf('//')
			)
	}

	location.href="mek.php?q="	+ output
	}


</script>

<CONTAINER >
<?php

	$html = file_get_contents( $_GET['q'] );
	libxml_use_internal_errors(true); //Prevents Warnings, remove if desired
	$dom = new DOMDocument();
	$dom->loadHTML($html);
	$body = "";
	foreach($dom->getElementsByTagName("body")->item(0)->childNodes as $child) {



		$body .= $dom->saveHTML($child);
	}
	echo $body;
?>
</CONTAINER>
<error-container>
	<div class="card">
<h1 class="covered large dgrey-500 expand" style="color:white;">Something Went Wrong</h1>
<br>
<p> The Page couldn't be rendered correctly! This is either due to incompatible website or a broken link.<br>
	Sorry About that. Why not try some alternative links, that might work:<br>

</p>

<br>
<hr>

<details>
  <summary>Error Details</summary>
	<div id="error_placeholder">Unknown Error</div>
</details>
	</div>

</error-container>
<style>
error-container {
	display:none;
	margin-top:150px;
}
error-container h1 {
	padding-top:100px !important;
	display:block;
}
.error_on_loading>nav>button ,.error_on_loading>nav>input  {
	display: none !important;
}
</style>
<meta charset="UTF-8">
<script>
//removing
	$$ = function(call) {return document.querySelectorAll(call)};
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

  try {
	$('img[src]').each(function(){
				$(this).attr('src', 'http://mek.oszk.hu/'+ location.search.slice(2,Infinity) + '/' +$(this).attr('src'));
			})


	$("img").error(function () {
		$(this).hide();
	});






	$('form[action]').each(function(){
            $(this).attr('action', 'mek.php?q='+$(this).attr('action'));
        })

}

catch(e) {
	console.log("JQUERY : ERROR : DISABLED PARTS");
}
//error handling
if ($('container').innerHTML.search("HTTP/1.1 404")>0) {
	$("error-container").style.display="block";
	$("#error_placeholder").innerHTML=$("container").innerHTML
	$("container").style.display="none";
	$("body").classList.add("error_on_loading");
}
for (i=0; i<$$('a[href]').length;i++) {
			if ( $$('a[href]')[i].getAttribute('href').search('#')<0)
			{

					$$('a[href]')[i].setAttribute('href', 'mek.php?q='
					 + location.search.slice(3,Infinity)
					 + '/'
					 +$$('a[href]')[i].getAttribute('href'));
		}
		else if ($$('a[href]')[i].getAttribute('href').search('#')>0){
			console.log(this);
			//alert();
			$$('a[href]')[i].setAttribute('href', 'mek.php?q='  +$$('a[href]')[i].href);
		}
}
for (i=0; i<$$('img').length;i++) {
	$$("img")[i].onerror = function() {
		this.classList.add("dont-show-image");
	}
}
	//SCROLL
	document.onscroll = function(){


			chapterCurrent=offsetChecker($('body').scrollTop);

			currChapter.value=chapterCurrent;
			var at= (document.body.scrollTop-100)/ document.body.offsetHeight ;
			console.log(at);
			$('#progressbar').setSwitchData(Math.round(at*100));
		//$('#progressbar').setAttribute('data', Math.round(100* at) );
		//$('html, body').animate({scrollTop: chapterOffset[a]-60+'px'}, 100);

	};
	function offsetChecker(call) {

		for (var i=0; i<chapterNumbers; i++) {
			if 	(chapterOffset[i]>call) return i;
		}
	}

	//CHAPTER
	chapterNumbers=$$('p[align="center"]').length + $$('center').length;
	chapterOffset=[];
	chapterCurrent=0;
	secI=0;
	for (var i=0;i<chapterNumbers;i++) {
		// i = elemeents secI = elements we need.
		chapterOffset[secI]=$$('p[align="center"],h3')[i].offsetTop	;
		if (chapterOffset[secI]-chapterOffset[secI-1]<100) secI--; //if two anchors are too close, we ignore
		secI++;
	}


	function chapter(call) {
		chapterCurrent+=call;
		let  temp= chapterOffset[chapterCurrent];
		$('body').scrollTop=  temp-50;

	}
	try {
	//epic text selector
	$('container').click(function(){
		$('container span').removeClass('glow');
	});

	$('container').dblclick(function(){
		$('container span').classList.remove('glow');
		sel=window.getSelection().toString();
		if (sel.slice(sel.length-1,Infinity)==' ') {
			sel=sel.slice(0,sel.length-1);
		}
		console.log(sel);
		selObj=$('container p:contains("'+sel+'")');
		for (i=0;i<selObj.length;i++) {
			startPosition=selObj[i].innerHTML.search(sel);
			endPosition=sel.length;
			console.log(startPosition,endPosition);
			$(selObj[i]).html(
					$(selObj[i]).html().slice(0,startPosition) + '<span class="glow">' +
					$(selObj[i]).html().slice(startPosition,startPosition+endPosition) + '</span>' +
					$(selObj[i]).html().slice(startPosition+endPosition,Infinity)
				)
		}
		});

	}
	catch (e) {
		console.log("JQUERY : ERROR : XRAY")
	}
</script>


<link rel="stylesheet" href="../NXTJS/elements-design.css">
<link rel="stylesheet" href="../NXTJS/design.css">
<link rel="stylesheet" href="../NXTJS/input-design.css">
<link rel="stylesheet" href="../NXTJS/mobile.css">
<script src="../NXTJS/design-input.js" type="text/javascript"></script>
