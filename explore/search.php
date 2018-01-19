<head>
	<meta charset="UTF-8">
</head>
<body>
	<nav class="fixed">
		<header>

			<div>MEK SEARCH</div></header>
	  <span id="pageTitle">Searching for <? echo $_GET['dc_title'] . 'by' . $_GET['dc_creator'] ?></span>

		<i class="material-icons" id="NineDotMenu" onclick="nxt.openMenu('');">apps</i>
	</nav>

	<div id="content">
<?php

	$html = file_get_contents('http://mek.oszk.hu/kozos-kereses.mhtml?' .  $_SERVER['QUERY_STRING'] );
	libxml_use_internal_errors(true); //Prevents Warnings, remove if desired
	$dom = new DOMDocument();
	$dom->loadHTML($html);
	echo $html;
?>
</div>

<style>
:root {
	--dark-primary:#795548 !important;
	--primary:#8D6E63 !important;
	--darker-primary: #5D4037 !important;
}
#content {
	margin-top:20px;

}
#content table {
	background:white;
	display: block;
}
#content>table {
	margin: -10px 0px;
	padding:20px;

}
#content table:first-child {
	margin-top:-8px;
	padding:20px;
	padding-bottom: 60px;
	box-shadow:0px 2px 3px #999;
}
input {
	width:150px !important;
	margin:5px !important;
	cursor: pointer;
}
table input[type="submit"] {
	vertical-align: -38px;
margin-top: 26px !important;
display: block;
}
.primary_nav_wrap>ul>li>ul  {/*legördülő menü*/
	box-shadow:0px 2px 4px #444;
	height:200px;
	position:absolute;
	overflow-y: scroll;
	overflow-x: hidden;
	border:3px solid var(--primary-dark);

}
.primary_nav_wrap>ul>li {
	padding:5px;
	border:1px solid var(--primary);
	border-radius:4px;
}
.coll a {
	color:#222;
	cursor: pointer;
}
/*specific code*/

.dka , .mek{
  padding-left:200px;
	transition: .2s;
	margin:-20px 0px;
padding-top:30px;
padding-bottom:30px;
display: block;
}
.dka:hover, .mek:hover {
	background:#Fefefe;
	cursor: pointer;
}
.dka .belyegkep ,  .mek .belyegkep{
	position:absolute;
	float:right;
	margin-left:-180px;
}
.focim {
	font-size:20px;
	font-family:'Montserrat';
}
.datum {
	position: absolute;
text-align: right;
margin-top: -22px;
display: block;
/* float: right; */
left: 0;
right: 0;
padding-right: 100px;
}
.szamozas {
	position: absolute;
right: 100px;
}
p {
	margin:40px !important;
	color:white;
	margin-top:-35px !important;
	height:5px;
}
</style>
<script src="../NXTJS/jsplus.js" type="text/javascript"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<script>
setTimeout( function(){
$$("p")[0].classList.add('card');
$$("p")[0].classList.add('dgrey-500');

for (i=50; i<$$('a').length;i++) {
	base = $$('a')[60].href.search('hu');
  pased =  "mek.php?q=" + $$('a')[i].href.slice(base+1,Infinity) + "/html";
	$$('a')[i].href= pased;
	console.log( $$('a')[i].href.slice(base+1,Infinity) );
	if (i>1000) nxt.die();
}
},1000);


</script>
</body>

<link rel="stylesheet" href="../NXTJS/elements-design.css">
<link rel="stylesheet" href="../NXTJS/design.css">
<link rel="stylesheet" href="../NXTJS/input-design.css">
<link rel="stylesheet" href="../NXTJS/mobile.css">
<script src="../NXTJS/design-input.js" type="text/javascript"></script>
