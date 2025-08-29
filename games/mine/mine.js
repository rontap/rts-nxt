 sin=[ "#22B94F","#48F",  "#62C", "#F84", "#F44",  "#444", "#222", "#000"];
    bomba=[];
    volte=[];
    endgame=false;
    var g_h;
    var g_v;
    var ido = 0;
    kivanth = newh;
    kivantv = 6;
    kivantb = 5;


    function start(h,v,b)
    {
		bomba=[];
		volte=[];
        ido = 0;
        g_v=v;
        g_h=h;
        create(h,v);
        bombh(h,v,b);
        endgame = false;
        win = false;
        difficulty.innerHTML = jatekter.getElementsByTagName("td").length / bomba.length;
    }

    function idotel() {

        idotelik = setInterval(function() {
            pontszam.innerHTML = Math.round((difficulty.innerHTML/Math.sqrt(ido))*100*jatekter.getElementsByTagName("td").length);
            ido++;
            checkwin();
            time.innerHTML=ido;
        }, 1000);
        }

    function bombh(h,v,b)
    {
        for (var i = 0; i < b; i++) { // ism b
            // i <---
            y = Math.floor(Math.random()*h); // 0 - height
            x = Math.floor(Math.random()*v); // 0 - width

            if (bomba[y][x] == false) {
                bomba[y][x] = true;
                //document.getElementsByTagName('tr')[y].getElementsByTagName('td')[x].style.background="red";
            } else {
               console.log(i+'_'+x+y);
               b++
            }
        }
    }

    function create(h,v) {

        a='<TABLE id="jatekter" ontontextmenu="alert();return false;" class="norjsx">'
        for (var sor = 0; sor < h; sor++) {

            bomba[sor] = [];
            volte[sor] = [];
            a+='<tr>';
            for (var oszlop = 0; oszlop < v; oszlop++) {

                bomba[sor][oszlop]=false; // minden egyes cellára
                volte[sor][oszlop]=false;
                a+='<td onClick="check('+sor+','+oszlop+')" onContextMenu="flag('+sor+','+oszlop+');return false;">-</td>';

            }
            a+='</tr>';
        }
        a+='</TABLE>';
        c.innerHTML = a;


    }//create

    function check(h,v)
    {

        if (endgame === false) {

            console.log(h+'-'+v+bomba[h][v]);

            if (bomba[h][v]) {
                end();
            }
            else {
               korulotte=hanypont(h,v);
                if (korulotte==0)
                {
                    cleartobb();
                    vanetobb(h,v);
                }
                else {
                    //document.getElementsByTagName('tr')[h].getElementsByTagName('td')[v].innerHTML=korulotte;
                }

                korulotte=0;
            }

            checkwin();
        }
    }

    function hanypont(h,v)//hany pontosa
    {
         korulotte = 0;
        try { if ((bomba[h-1][v])) {korulotte++;} } catch(a) {};
        try { if (bomba[h-1][v+1]) {korulotte++;} } catch(a) {};
        try { if (bomba[h-1][v-1]) {korulotte++;} } catch(a) {};
        try { if (bomba[h][v-1])   {korulotte++;} } catch(a) {};
        try { if (bomba[h][v+1])   {korulotte++;} } catch(a) {};
        try { if (bomba[h+1][v])   {korulotte++;} } catch(a) {};
        try { if (bomba[h+1][v+1]) {korulotte++;} } catch(a) {};
        try { if (bomba[h+1][v-1]) {korulotte++;} } catch(a) {};

        if (korulotte==0)
        {
        jatekter.getElementsByTagName('tr')[h].getElementsByTagName('td')[v].innerHTML="&nbsp";
        }
        else {
       jatekter.getElementsByTagName('tr')[h].getElementsByTagName('td')[v].innerHTML=korulotte;
        }
        jatekter.getElementsByTagName('tr')[h].getElementsByTagName('td')[v].style.color=sin[korulotte];
        return korulotte;
    }

    function vanetobb(h,v) {
        korulotte=0;
         if (!tenylegvolte(h,v)) {
                        korulotte=hanypont(h,v);

                if (korulotte==0)
                {
                    volte[h][v]=true;

                    //alert(h+'-'+v);
                    try {vanetobb(h-1,v);       } catch(a) {};
                    try {vanetobb(h-1,v+1);     } catch(a) {};
                    try {vanetobb(h-1,v-1);     } catch(a) {};
                    try {vanetobb(h,v-1);       } catch(a) {};
                    try {vanetobb(h,v+1);       } catch(a) {};
                    try {vanetobb(h+1,v);       } catch(a) {};
                    try {vanetobb(h+1,v+1);     } catch(a) {};
                    try {vanetobb(h+1,v-1);     } catch(a) {};
                }
            }

    }

    function cleartobb() {
        for (i=0;i<g_h;i++)
        {
            for (j=0;j<g_v;j++)
            {
               volte[i][j]=false;
            }
        }
    }

    function tenylegvolte(h,v)
    {
        if (  (h<g_h) && (h>=0) && (v<g_v) && (v>=0) )
              return volte[h][v];
        else  return true;
    }

    function end() {
        for (i=0;i<g_h;i++)
        {
            for (j=0;j<g_v;j++)
            {
               if (bomba[i][j]==true)
               {

                  jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background="#F22";
                   if (jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML!='<img src="flag.png" width="20px">')
                   { //if you lose the game
                   nxt.notify('#youDied',10000);
                   jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML="<img src='fuse-bomb.png' width='20px'>";
                   jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background="red";
                   }
               }
            }
        }

        endgame = true;
        //again();
    }

    function checkwin() {
        win=true;
        for (i=0;i<g_h;i++)
        {
            for (j=0;j<g_v;j++)
            {
               if (((bomba[i][j]==true) && (jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML!='<img src="flag.png" width="20px">')) || (bomba[i][j]==false) && (jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML=='<img src="flag.png" width="20px">'))
               {
                win=false;
               }
            }

    }
      if (win && endgame === false) {

          //alert('Gratulálunk! Megnyerted a játékot! \n Időd:' + time.innerHTML + '.');
          nxt.notify("#youWon",12000);
          clearInterval(idotelik);
        for (i=0;i<g_h;i++)
        {
            for (j=0;j<g_v;j++)
            {
               if (bomba[i][j]==true)
               {
                 jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background="#22B924";
               }
            }
        }
        //again();
      //idotel="";
      }//if
    }

     function flag(i,j)
    {

        if (  jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML.search('<img src="flag.png" width="20px">')>=0)
        {
            jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML="-";
             return false;
        }
        else {
             jatekter.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML='<img src="flag.png" width="20px">'
        }
        return true;
    }

    function again() {
        setTimeout(function(){
            start(newh.value,newv.value,newb.value);
        },300);
    }



    function newgame() {
        start(newh.value,newv.value,newb.value);

    }
    hs={};
    hs.score=[];
    hs.names=[];
    hs.load = function() {
		if (localStorage.highscore==undefined)
		{
			localStorage.highscore= JSON.stringify([900,500,400,100,20]);
			localStorage.highnames= JSON.stringify(['John','Matt','Mark','Stephen','Mose']);
			}

			hs.score=JSON.parse(localStorage.highscore);
			hs.names=JSON.parse(localStorage.highnames);

		}
    hs.write = function() {

		hstable.innerHTML="<span class='ubuntu big'>Top Highscores</span><a class='l'>show all</a><br>";
		a='<TABLE>';
		for (i=0;i<5;i++)
		{
			a+="<tr>";
				a+="<td>"+(i+1)+".</td>";
				a+="<td>"+hs.names[i]+"</td>";
				a+="<td>"+hs.score[i]+"</td>";
		a+="</tr>";
		}
		a+="</TABLE>";
		hstable.innerHTML+=a;
		}
	hs.check = function() {
		for (i=0;i<hs.score.length;i++)
		{
			if (Number(pontszam.innerHTML)>hs.score[i])
		{
			hs.score[i]=pontszam.innerHTML;
			hs.names[i]='ALADÁR'

			localStorage.highscore= JSON.stringify(hs.score);
			localStorage.highnames= JSON.stringify(hs.names);

			hs.write();
		}
			}
		}
	hs.start = function() {
		hs.load();
		hs.write();
		hs.check();
		}
    start(5,6,5);
    idotel();
