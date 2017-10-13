<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700|Noto+Serif:400,700&subset=latin,cyrillic,greek,latin-ext' rel='stylesheet' type='text/css'>
<script src="../api/note.js"></script>
<link href='https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700|PT+Sans&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

	
	
</head>
<body >
<nav id="mnav">
	.4
	<div onclick=location.search=''><!--POWER MEK --></div>
	|
	<button>go back</button>
	<button onclick="goUp();">go up</button>
	|
	<button onclick="$('html, body').animate({scrollTop: '0px'}, 800);">scroll top</button>
	<button onclick="chapter(-1);">last chapter</button>
	<button onclick="chapter(1);">next chapter</button>
	<input type="number" style="width:50px;" id="currChapter" value="0">
	|
	<input type="checkbox" label="NightMode"
		   onchange="$('body').toggleClass('night');"
		   >NightMode
	|
	<button onclick="makefav();alert('Added to Favourites!')">add to favourites</button>
	<select id="favs">
		<option>favourites</option>
	</select>
	<button onclick='alert("clearing all favourites");localStorage.removeItem("MEKfav");location.reload()'>X</button>
	|
	<button onclick="makestat();">stat</button>
	|
	<button onclick="">search MEK</button>
</nav>
	
	
<footer>
	<div id="progressbar" data="0"></div>
	<div id="progressbar-fill" ></div>
</footer>
<aside></aside>

<style>
	#progressbar {
	height:30px;
		width:160px;
		border:1px solid rgba(50,50,50,.6);
	
	}
	#progressbar::after {
	    content: attr(data) '%';
    position: absolute;
    margin-top: 5px;
    color: white;
    font-size: 14px;
    margin-left: 120px;
    z-index: 99;
    text-shadow: 2px 0px 0px #222;
	}
	#progressbar-fill {

			background-image:linear-gradient(45deg,transparent 25%, rgba(50,50,50,.6) 25%,rgba(50,50,50,.6) 50%,transparent 50%,transparent 75%,rgba(50,50,50,.6) 75%,rgba(50,50,50,.6));
		    background-size: 20px 20px;
		position:absolute;
		margin-top:-31px;
		height:30px;
		width:0px;
		border-right:1px solid rgba(50,50,50,.6);
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
	background:#795548;
	height:30px;
    font-family: 'PT Sans', sans-serif;
	padding:10px;
	}
	nav {
		 top:0;right:0;
	}
	footer {
	left:0; 
		bottom:0; height:30px;	background:#48F;
		margin:10px;
		min-width:165px;
		opacity:0.7;
		width:165px;
		transition:.2s;
	}
	footer:hover {
	opacity:1;	
		width:50%;
		min-width:600px;
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
	
	}
	.night CONTAINER {

		background:#444;		
		color:#ddd;	
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
	$('#favs').change(function(){
		location.search=favs.options[favs.selectedIndex].value;
	});
	
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

	$html = file_get_contents('http://mek.oszk.hu/' .  $_GET['q'] );
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
	
<meta charset="UTF-8">
<script>
//removing	
	
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
	$('img[src]').each(function(){
				$(this).attr('src', 'http://mek.oszk.hu/'+ location.search.slice(2,Infinity) + '/' +$(this).attr('src'));
			})	


	$("img").error(function () { 
		$(this).hide(); 
	});
	$('a[href]').each(function(){
		if ( $(this).attr('href').search('#')<0)
		{
	
		$(this).attr('href', 'mek.php?q=' 
		 + location.search.slice(3,Infinity) 	
		 + '/' 
		 +$(this).attr('href'));
	}
	else if ( $(this).attr('href').search('#')>0 ){
		console.log(this);
		alert();
		$(this).attr('href', 'mek.php?q='  +$(this).attr('href'));
	}
	
        })	
	$('form[action]').each(function(){
            $(this).attr('action', 'mek.php?q='+$(this).attr('action'));
        })	

	
	//SCROLL
	document.onscroll = function(){
		
			a=offsetChecker(scrollY);
			chapterCurrent=a;
			console.log(a);
			currChapter.value=chapterCurrent;
			var at= (document.body.scrollTop +658)/ document.body.offsetHeight ;
			$('#progressbar-fill').css('width', 160 * at +'px');
		$('#progressbar').attr('data', Math.round(100* at) );
		//$('html, body').animate({scrollTop: chapterOffset[a]-60+'px'}, 100);
		
	};
	function offsetChecker(call) {
		
		for (var i=0; i<chapterNumbers; i++) {
			if 	(chapterOffset[i]>call) return i;
		}	
	}
	
	//CHAPTER
	chapterNumbers=$('p[align="center"],h3').length;
	chapterOffset=[];
	chapterCurrent=0;
	secI=0;
	for (var i=0;i<chapterNumbers;i++) {
		// i = elemeents secI = elements we need.
		chapterOffset[secI]=$($('p[align="center"],h3')[i]).offset().top	;
		if (chapterOffset[secI]-chapterOffset[secI-1]<100) secI--; //if two anchors are too close, we ignore
		secI++;
	}

		
	function chapter(call) {
		chapterCurrent+=call;
		var temp= chapterOffset[chapterCurrent];
		$('html, body').animate({scrollTop: temp-60+'px'}, 100);
		
	}
	//epic text selector 
	$('container').click(function(){
		$('container span').removeClass('glow');
	});
							
	$('container').dblclick(function(){
		$('container span').removeClass('glow');
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
</script>