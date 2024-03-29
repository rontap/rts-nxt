
/**
 * @author rontap

 * package: rontap NXT
 * #CALKNEW.JS
 * #tapcalk.html
 * #canvas.html
 */

/*
 * 2018 version for Tapcalk Classic
 */

//PROGRAM
//INITALIZING--------------------------------------------------------------------


tcx = {}; //initialising TapCalk Express -> all of the API functions will be slowly ported
tcx.packages=["calknew-core","calknew-core-classic"];
abc = ["a","b","c","d","e","f","g","h","i","j"];
fn=["Írd be!","Összeadás és kivonás","Szorzás és osztás","Gyökvonás","Hatványozás","Kiemelés és beszorzás","Tömeges összeadás ","Faktoriális ","Számtani ","Mértani","Görbe","Fibonacci","Négyzetszámok","Spinkvantmszám","Szögfüggvények (sin)","Számtani közép (aritmetikai)","Mértani közép (geomatriai)","Harmonikus közép (reciprok)","Négyzetes közép","Prím-e a szám","Prímek listázása","Prímtényezős felbontás","Univerzális átváltás","Átváltás ","Mindent a számról ","Véletlenszerű szám","Kamatszámító","Másodfok","Pireneusi számok","π (pi)","√2 (gyök kettő)"];
halmszam=2;
happyhome=[4,37,58,89,42,145,20,16];
inpn=2; //inputszám a HaMiSaN-hoz
halmaz=[];
functions=[];
validatenumber=true;
	for (a=0;a<5;a++) {
	halmaz[a]=[];
	}
inpnadd='<button class="inp-text" onClick="addinpn();">Új szám</button>';
a =new Date();
chart='';//grafikonos kirajzoláshoz szűkséges változó
kim=null;
histlength=0;//előzmények
tprim=[];
eventfire='';//a SZAMOLD-ra uteskor alkalmazza

function makeinput(mal,out) {//legeneralja az input mezőket
for (i=1;i<=mal;i++)
	{

		window['input'+i]='<input type="text" class="inp-text-short"  placeholder="'+Math.randInt(100)+'"  ondragenter="return dragEnter(event)" ondrop="return dragDrop(event)"  ondragleave="return dragOver(event)" ondragover="event.preventDefault()"  id="ino'+i+'" >';
	}

for (i=1;i<=out;i++)
	{

		window['output'+i]='<span class="outputtext" ran="'+Math.random()+'" id="ouo'+i+'"></span>';
	}
}


// --- DELETING UNDEFINED DATA
function outcall(call,x) {
    var x;
    if (x===undefined) {x=1;}
    window['ouo'+x].innerHTML=call;
    addnum(call);
    if (isGraphOn)  $("#graph_iframe").src="tapcalkgraph.html#"+chart;
}

//---------------------------------------------------
//------CALCULATION----------------------------------
//---------------------------------------------------

function calkr(call)
	{
	console.log("calk: "+eventfire);

//-=-CONVERSION--------------------------------------
	for (j=1;j<=10;j++)
	{
		if ((window['ino'+j]!=undefined))
		{
				if (window['ino'+j].value!=undefined) {
					console.log(window['ino'+j].value);
					if ( tcx.eval(window['ino'+j].value).valid )
						window['in'+j]=tcx.eval(window['ino'+j].value).value;// a szamokat atalakitja
						//new using tcx eval
					else
						window['in'+j]=window['ino'+j].value;
						//if "invalid" input for evaling, it must be something special
				// NXT charioteer replaced conversion with new tcx.eval
				}
			}//validate
		}


	validatenumber=true;
	chart='';
	althist=false;
	precalkr(call); //PRE Calculation
	nxt.parseDocument(); //reparsing everything
	}

//-MAIN-CALCULATION----------------------------------

	function precalkr(call) {
		console.log(eventfire,call);
	switch (eventfire)
{
		//ALAPMŰVELETEK
	case "base_" :
					outcall(in1,1);
				 break;

		case "hatv_" :
         outcall(Math.pow(in1, 1/2));
				 outcall(Math.pow(in2, 1/3),2);
				 outcall(Math.pow(in4, 1/in3),3);

         outcall(in9*in9,9);
				 outcall(Math.pow(in2,in3),5);
				 break;
		case "besz" :

				 outcall(in1*in1+in2*in2+2*in2*in1)	;
				 outcall(in3*in3+in4*in4-2*in4*in3,2)	;
				 outcall(in5*in5-in6*in6,3);
				 break;

		case "toa": kim=0;
		      validatenumber=false;
					kim1 = tcx.sum({
						start:in1,
						end:in2,
						expression:in3
					});
					kim2 = tcx.product({
						start:in4,
						end:in5,
						expression:in6
					});
					outcall(kim1,1);
					outcall(kim2,2);
				break;
		case "fakt": fakt=1;
					for (i=in1; i>0; i--) {
						chart+=parseInt(fakt)+'-';
						fakt=i*Number(fakt);
					}
					outcall(fakt);
				break;
				//SOROZATOK

		case "szamtani" :
                     ouo1.innerHTML="";
					for (i=1;i<=in3;i++)	{
					 	ouo1.innerHTML+='<span class="l"onClick="rjsx.notify('+"'Ez a sorozat "+i+". eleme'"+');addnum(\''+in1+'\')">'+in1+'</span> ';
					 	in1=Number(in1+in2);
                        chart+=in1+'-';
					}
					break;

		case "mertani" :
                     ouo1.innerHTML="";
					for (i=1;i<=in3;i++)
					{

					 	ouo1.innerHTML+='<span class="l"onClick="rjsx.notify('+"'Ez a sorozat "+i+". eleme'"+');addnum(\''+in1+'\')">'+in1+'</span> ';
					 	in1=Number(in1*in2);
                         chart+=in1+'-';
					}
					break;
		case "gorbe" :
					for (i=1;i<=in4;i++)
					{

	ouo1.innerHTML+='<span class="l"onClick="rjsx.notify('+"'Ez a sorozat "+i+". eleme. Itt a növekmény."+in3+"'"+');addnum(\''+in1+'\')">'+in1+'</span> ';
					 	in1=Number(in1+in2);
					 	in2=Number(in2+in3);
					}
					break;
		case "fibo" :
                    ouo1.innerHTML="";
					var f,fel,fe2;
					f=1;
					fel=0;
					for (i=0; i<in1; i++) {
						fe2=fel;
						fel=f;
						ouo1.innerHTML+='<span class="l"onClick="rjsx.notify('+"'Ez a sorozat "+i+". eleme'"+');addnum(\''+f+'\')">'+f+'</span> ';
						f=Number(fel)+Number(fe2);
						chart+=f+'-';
						}
					break;

		case "negyzet" :
					var negyzet;
					for (i=0; i<in1; i++) {
						negyzet=i;
						negyzet=negyzet*negyzet;
						chart+=negyzet+'-';
						ouo1.innerHTML+='<span  class="l"onClick="rjsx.notify('+"'Ez a sorozat "+i+". eleme, és egyben a szám gyöke.'"+');addnum(\''+negyzet+'\')">'+negyzet+'</span> ';
						}
					break;
		case "spin" :
					kn=2;
					nelozo=2;
					n=2
					nov=4;
					ouo1.innerHTML+=kn + ' ';
					kn=kn+nov;
					ouo1.innerHTML+=kn+nelozo + ' ';
					nelozo=nelozo+kn;
					for (i=2; i<in1; i++)
					{
						kn=kn+nov;
						n=kn+nelozo;

						nelozo=nelozo+kn;
						ouo1.innerHTML+=n + ' ';
						if (i==7)
						{
						ouo1.innerHTML+="<br>ennél több atomhéjjal rendelkező atomot még nem fedeztek fel :/<br>"
						}
					}
					break;
					//GEOMETRIA
			//PRÍMSZÁMOK
	case "prim_" :
				tpk = new Array();//kitevős
				tpe = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);//másik
				talal=0;
		sqrtis=false;
			call=in1;
			i=call;
            ouo1.innerHTML="";
            addnum(call);
			/*while (i>0)
			{*/
			if (Math.sqrt(call)==Math.floor(Math.sqrt(call)))
			{
				call=Math.sqrt(call);
				sqrtis=true;
			}
				for (y=2;y<i;y++)
				{
					if (call%y==0)
					{
					talal++;
					tpk[talal]=y;
					//console.log('call:'+call+'@y'+y);//logging
					ouo1.innerHTML+='('+call+') # '+y+'<br>';
					call=call/y;

						if (call%y==0) y--;//ha a kövi is ua. akkor ne menjen fel a mérce
						if (tpk[talal]==tpk[talal-1])//kitevőrendezés
						{
							tpe[talal]=tpe[talal]+1;
							talal--;
						}
					}
				}

			//console.log('TPK is:'+tpk);//fine
			output='';
			for (i=1;i<tpk.length;i++)
			{
				writSUBP(tpk[i],tpe[i+1]);
				//console.log('i@'+i+'SUPB '+tpk[i]+'_SUP:'+tpe[i+1]);//lassst
			}

			prim=true;
			kim='';
			szam=in1;
            addnum(in1);
			for (i=2;i<szam;i++) {
				if (szam%i==0)
				{
				kim+=' , '+i;
				prim=false;
				}
			}

				if (prim==false)
				{
					/*if (mennyiD>1023) {
						nagye='<br>A szám 1024-nél nagyobb, nem tudjuk megmutatni az összes osztóját';
					}*/
					ouo1.innerHTML='a szám nem prím<br>osztható: '+kim+' -val.';
				}
			else 	ouo1.innerHTML='A szám prím';


			  ouo1.innerHTML+="<br>Prímtényezős felbontás:<br><br>"
				ouo1.innerHTML+=output+'1';
			  if (sqrtis) {ouo1.innerHTML+='×'+output+'×1';}


				break;

		break;
		case "primgrid":
			setTimeout(() => tbld($('#tfill #ulamgen').value),150); //separate genetor out of context. added 2017Uni
		break;
		case "primlist" :
				kimt= new Array;
					parprim=0;

				primek=0;
				kim='';
				szam=in1;
        addnum(szam);
				for (i=2;i<=szam;i++)
				{
				if ( Math.isPrime(i) )
					{
							primek++;
							tprim[primek]=i;

							if (tprim[primek]==tprim[primek-1]+2) {kim+='<span class="red">';}//ha párrim, piros
							kim+='&nbsp;<span class="l" onclick="addnum('+i+')">'+i+"</span>&nbsp;";
							kimt[primek]=i;
							chart+=i+'-';
							if (tprim[primek]==tprim[primek-1]+2) {kim+='</span>'; parprim++;}//lezárás és növelés

					}

				}
				ouo1.innerHTML=kim+'<hr>'+szam+'-ig '+primek+' prímszám található.';
				ouo1.innerHTML+=' Ez a számok '+100*primek/in1+' százaláka';
				ouo1.innerHTML+='<br>The red primes represent pair-primes';

				althist=true;
				ahc= in1;
			break;

		case "szamrend" :

				in3=parseInt(in3,in1);
				in3=(in3).toString(in2);
				ouo1.innerHTML=in3+'<sub>('+in2+')</sub>';
                addnum(in3);
				break;

		case "mesel" : meselj(); break;

		case "masodfok" :
				meg1=((-1*in2)+Math.sqrt(in2*in2-4*in1*in3))/(2*in1);
				meg2=((-1*in2)-Math.sqrt(in2*in2-4*in1*in3))/(2*in1);
				ouo1.innerHTML='';
				if (!(isNaN(meg1)))            ouo1.innerHTML+='X<sub>1</sub>: '+meg1;addnum(meg1);
				if (!(isNaN(meg2)))   		     ouo1.innerHTML+='<br>X<sub>2</sub>: '+meg2;addnum(meg1);
				if (ouo1.innerHTML=='')				 ouo1.innerHTML+='Nincs megoldás!';


				/* ouo1.innerHTML+='<hr>Kibontott alak:<br>';
				 ouo1.innerHTML+=*/
				break;
		case "pir":
				can=1;
				kim="";
                addnum(in1);
				segm = 0; segm2 = 0;
				for (i=1;i<=in1;i++)
				{
				can=i/can;
				chart+=Number(can)+'-';

				kim+='<br>'+i+'.: &nbsp;<span onClick="alert('+"'Ez a  "+i+"-nak/nek a pireneusa'"+')">'+can+'</span>';
					if (i==256) {kim+='<hr><b>innentől minimális a növekvény</b><hr>'}
				}
				ouo1.innerHTML=kim;
					break;
		case 'kamat' :
				kim='';
				for (i=0;i<in3;i++)
				{
				kim+=i+'. hó : '+(Math.round(in1*1000)/1000)+'<br>';
				in1=Number(in1)+(Number(in1)*(Number(in2)/100));
				}
				ouo1.innerHTML='A(z) '+i+'. hónapban: '+(Math.round(in1*10000)/10000)+kim;
				break;
		case 'atl_' :
				kim=0;
        a=JSON.parse("["+area.value+"]");

				for (i=0;i<a.length;i++)  {
					kim=kim+a[i];
					console.log(kim+' '+a);
				}
				kim=kim/a.length;
				outcall(kim);


				kim=1;
				for (i=0;i<a.length;i++)  {
					kim=kim*a[i];
					console.log(kim+' '+inpn);
				}
				kim=Math.sqrt(kim);
				outcall(kim,2);


				kim=0;
				for (i=0;i<a.length;i++)  {
					kim=kim+1/a[i];
					console.log(kim+' '+a);
				}
				kim=1/(kim/2);
				outcall(kim,3);

				kim=0;inpn=2;
				for (i=0;i<a.length;i++)  {
					kim=kim+a[i]*a[i];
					console.log(kim+' '+a);
				}
				kim=kim/a.length;
				outcall('W I P' +Math.sqrt(kim),4);

				break;

		case 'sintg' :
				if (ino3.value=="")
				{
				in3=Math.sqrt(in1*in1+in2*in2);
				ino3.value=in3;
				}
				sin=in1/in3;
				cos=in2/in3;
				tan=in1/in2;
				ctg=in2/in1;

				ouo1.innerHTML=' sin: '+sin+'<br> cosin: '+cos+'<br> tan: '+tan+'<br> cotan: '+ctg;
				break;
		case 'random' :
				outcall(Math.random()*(in2-in1)+in1);
				break;
		case 'valszam':
		   t = [];
    for (i=0;i<=4;i++)
    {
        t[i]=window['in'+(i+1)];
    }
    i=1;
    kim="";
    for (a=0;a<=4;a++)
    {
      for (b=0;b<=4;b++)
            {
             for (c=0;c<=4;c++)
             {
                for (d=0;d<=4;d++)
                {
                  for (e=0;e<=4;e++)
                  {
                   if ((a!=b)&&(a!=c)&&(a!=d)&&(a!=e)&&(b!=c)&&(b!=d)&&(b!=e)&&(c!=d)&&(c!=e)&&(d!=e)) {
                   aa=t[a];
                   aa+=' '+t[b];
                   aa+=' '+t[c];
                   aa+=' '+t[d];
                   aa+=' '+t[e];
                     kim+=aa+ ' : '+i+'<br>';
                     i++;
                   }

                  }
              }
          }
      }
    }
  ouo1.innerHTML=kim;
  break;
  case 'halmaz'   :
  	t=[]

  	for (i=1;i<=halmszam;i++)
  	{
  		console.log(window['in'+i]);
  		t[i]=window['in'+i].split(";");
  	}
  	break;
  case 'formula' :
                outcall(eval(in1));

        break;
  case 'lkkt' :
				a=new Sets( Math.prime(in1) ).union( new Sets(Math.prime(in2)) );
				kim = Math.product(a.get);
				ouo1.innerHTML=kim+' a két szám LKKT-e.';
        addnum(kim);
	break;
	case 'lnko' :
				a=new Sets( Math.prime(in1) ).diff( new Sets(Math.prime(in2)) );
				kim = Math.product(a.get);
				ouo1.innerHTML=kim+' a két szám LNKO-ja.';
        addnum(kim);
	break;
    case 'stat':
        swhat=[];
        squant=[];
        a=JSON.parse("["+area.value+"]");
        a.sort(sortit);
        sum=0;
        se="<br><TABLE><tr><td>Rendezett minta:</td><td>"
        for (i=0;a.length>i;i++) {
            se+=a[i]+", ";
            sum+=a[i];

            if (swhat.indexOf(a[i])>-1)/*módusz*/
            {
             squant[swhat.indexOf(a[i])]++;
            }
            else {
             swhat[swhat.length]=a[i];
             squant[swhat.length-1]=1;
            }
        };
        se+="</td></tr><tr><td>Átlag:</td><td>"+sum/a.length+"</td></tr>";
        if (a.length%2==0) { median=(a[a.length/2-1]+a[a.length/2])/2; }
				else 							 { median=a[a.length/2-.5]; };
        se+="<tr><td>Medián:</td><td> "+median+"</td></tr>";

        selectedindex=0;
        modus=[];
        for (i=0;i<swhat.length;i++)
        {
           if (squant[i]>selectedindex) selectedindex=squant[i];
        }
        se+="<tr><td>Módusz:</td><td>";
        for (i=0;i<swhat.length;i++)
        {
	         if (squant[i]==selectedindex)	se+=swhat[i]+", ";
        }
        se+="</td></tr></TABLE>"
        ouo1.innerHTML=se;
    break;
        case  'happy' :
        kim='';
        istrue=true;
            while (istrue)
            {

            hold=0;
            for (i=0;i<String(in1).length;i++)
                {
                hold+=Number(String(in1).charAt(i))*Number(String(in1).charAt(i));
                }

            in1=Number(hold);
                kim+='<span class="l" onclick="addnum('+hold+'">'+hold+"</span>  »";
            for (i=0;i<happyhome.length;i++)
                {
                    if (happyhome[i]==in1)
                    {
                        istrue=false;
                        kim+="<br><br>Ez a szám nem boldog szám :( innentől a Boldogtalanság gyűrűben megy körbe-körbe:<br><grey>58<br>89<br>145<br>42 <br>20<br>4<br>16<br>37</grey>";
                        i=Infinity;
                    }
                    if (in1==1) {
                     istrue=false;
                        kim+="<br>Ez egy boldog szám!<br>";
                        i=Infinity;
                    }
                }


            console.log(in1);
            }
        ouo1.innerHTML=kim;
    break;

    case 'romai' : melyik(ino1.value); break;
}//switchú

//-END OF FUNCTION SWITCH-----------------------------------------------FUNCTION-SWITCH-----------------------------

	vanouo=true;i=0;
        reloadGraphFrame();

		}
function sortit(a,b){
return(a-b)
}
//---------------------------------------------------
//-INFORMATION-TEXT----------------------------------
//---------------------------------------------------

f='';
function info(eventfire) {

	switch (eventfire)
	{
	case 'add' : f='Összeadás: Megadja a számok összegét. (pl.: 2+3=5)<br>Kivonás: Megadja a számok különbségét. Az összeadás ellentéte (pl.: 5-3=2)'; break;
	case 'szor': f="Szorzás:Megadja a számok szorzatát. Egyazon szám többszöri összeadását rövidítő alapművelet. (pl.: 2*3=6 , ami 2+2+2)<br>Osztás: Megadja a számok hányadosát. Egy 'a' elemű halmazban egyforma méretű 'b' csoportot képzünk. (pl.: 6/3=2)"; break;
	case 'gyok': f='Ha egy számból n-edik gyököt vonunk, akkor megadja azt a számot, melyet az n-edik hatványra emelve megajda az eredeti számot. (pl: gyök(4)=2, mert 2*2=4)'; break;
	case 'negyz': f="('a' a 'b'-ediken) Pozitív egész 'b' szám esetén 'a' szám 'b'-szeri összeszorzását jelenti önmagával. (pl.  6^3= 6*6*6)"; break;
/*	case
kiemelés/		: Műveleti sorrend megváltoztatása zárójel segítségével.
	beszorzás	: ?*/
 	case 'toa'	: f='Sorozat, amely összeadja 1-től a kívánt számig található számokat.<br> pl.: (1+2+3+4+5+6+7+8+9=45)'; break;
	case 'fakt': f='Sorozat, amely összeszorozza a számokat 1-től a kívánt számig.'; break;
//sorozatok		: Számok halmaza, amely kívánt kezdő számtól haladva 'n' értékkel növekszik.
	case 'szamtani'	: f='sorozat, melyben az egymást követő tagok különbsége állandó.<br>	pl.: ( 1,3,5,7)	'; break;
	case 'mertani'	: f='sorozat, melyben a ‘n’ számtól kezdve mindig ‘q’-val szorzunk (pl: 3,9,27)'; break;
	case 'fibo'		: f="Sorozat, melyben a következő tagot mindig az azt megelőző két elem összegéből kapjuk"; break;
	case 'negyzet'	: f="Listázza az első 'n' négyzetszámot. Négyzetszám alatt olyan egész számot értünk, melynek a gyöke egész. <br> a 16 például négyzetszám, mert 4*4=16 "; break;
	case 'spin'		: f='Elektront jellemző, kémiában használt szám.'; break;

//prímszámok		: Egy prímszám alatt olyan természetes (pozitív, egész) számot értünk, amelynek pontosan 2 pozitív osztója van (önmaga és az egy).

	case 'primis'	: f="Egy prímszám alatt olyan természetes (pozitív, egész) számot értünk, amelynek pontosan 2 pozitív osztója van (önmaga és az egy). <br>Megvizsgálja, hogy a választott szám prím-e, avagy sem."; break;
	case 'primlist'	: f="Listázza a  prímszámokat n-ig"; break;
	case 'primfel'	: f='Felírja a választott számot prímek szorzataként. (ez hasznos lehet például két szám legnagyobb közös osztójának megtalálásában) '; break;


	case 'szamrend' :f=' Átváltja a számot egyik számrendszerből egy másikba. Más számrendszerben más ‘számok’ vannak. Például 8-as számrendszerben nem létezik a ‘9’, helyette az a ‘10’. A 16-os számrendszerben pedit van A,B,C,D,E,F-szám is'; break;

//műveletek végzése	: Műveletek elvégzése más számrendszerben.
//színek			: -
//egyéb			: -
	case 'mesel': f='Elmond mindent a választott számról, amire csak szükségünk lehet.'; break;
	case 'pir' : f='Az első tag 1/1, aminek 1 az eredménye a második tag 2/1 azaz 2, mert a második tagról van szó<br>a harmadik már 3/2 azaz 1.5. Tehát az n-edik tag: (n/az azt megelőző tag)';break;


	case 'mertani' : f='Értéke egyenlő a számok szorzatának négyzetgyökével. A mértani közepet olyan számok esetén alkalmazzuk,  amelyek összeszorozhatóak. (pl.: banki kamatok, infláció, stb...)';break;
case 'happy' : f='A szám akkor boldog, ha a számjegyeit négyzetre emelve és összeadva többször egymás után előbb-utóbb 1 lesz az eredmény.<br>Például:  28 az boldog szám, mert: 2*2+8*8=68 majd 6*6+8*8=100 és 1*1=1. <br> Amennyiben egy szám nem boldog, akkor a boldogtalanság gyűrűben köt ki.';break;
/*véletlenszerű szám	: Generál egy számot választott halmazból
π (pi)			: A pi egy irracionális szám. Az egységnyi átmérőjű kör kerületével egyenlő.
√2 (gyök kettő)		: A gyök kettő egy irracionális szám, amely azt a számot jelenti, melyet önmagával megszorozva 2-t kapunk.
*/
	default : f='ehhez nem tartozik súgó :/';


	}
	//console.log(f);
	infopanell.innerHTML=f;
}

//---------------------------------------------------
//--ADDITIONAL-HELPING-FUNCTS------------------------
//---------------------------------------------------

//500
function writSUBP(base,sup) {
	output+=base+'<sup>'+sup+'</sup>×';
	}

function addinpn() {
inpn++;
inpns.innerHTML+='<br>szám '+(inpn)+' '+window['input'+inpn];

}

function addhalm()
{
	halmszam++;
	thalm.innerHTML+=abc[halmszam-1].toUpperCase()+" = { "+window['input'+halmszam]+" } <br>";

}


//---------------------------------------------------
//----HALMAZMŰVELETEK--------------------------------
//--------------------REPLACED-WITH-SETS-in-TC6X-----

//1000 sor 2013 12 14 TC4.5.6
//1000 sor 2014-02-10

function kutat(hiv) {
for (i=1;i<fn.length;i++)
{
	console.log(hiv);
if (fn[i].toUpperCase().search(hiv.toUpperCase())!=-1)
	{
	$(".omenu")[i].style.opacity='1';
	$(".omenu")[i].style.minHeight='23px';
	$(".omenu")[i].style.padding='5px';

	}
else {
	$(".omenu")[i].style.opacity='.2';
	$(".omenu")[i].style.height='0';
	$(".omenu")[i].style.minHeight='0px';
	$(".omenu")[i].style.padding='0';
	}
}
}

/**END OF FILE**/

/* 1367 TC6 Design begins*/
/* 968  TC6 eXpress First 17-12 TCX*/
/* 900  TC6 eXpress Update II 18/Marc/26  **  tcx.eval added */
/* 690  TC6 Classic File Split 18/Sept/07 ***/
