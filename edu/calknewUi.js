// TCX Module: Calknew UI

function fillt(c) {

  tfill2.style.display="none";
  tfill.style.opacity=0;
  setTimeout(function(){tfill.style.opacity=1;
	makeinput(10,10);
	eventfire='';
    textinp="<p>Ebbe a mezőbe, az adatokat VESSZŐVEL elválasztva kell beírni. A tizedesvessző helyett tizedespont van.</p><br><textarea class='inp-text' placeholder='2,3,9,3.1415' id='area'></textarea>";
    graphis(false);
switch (c)
{
	case "base_" :
        tfill.innerHTML ='<h1 class="covered indigo-disabled">express calculator</h1>';
				tfill.innerHTML+='<h2 >input the formula:</h2><div id="AIO">'+input1+ "<br><br>"+output1+"</div>  ";

				break;
	case "hatv_" :
                tfill.innerHTML ='<h1 class="covered indigo-disabled">Gyökvonás</h1>';
				tfill.innerHTML+='<br><br>√'+input1+"="+output1+"<br>";
				tfill.innerHTML+='<h2 >Köbgyök:</h2>√<sup>3</sup>'+input2+"= "+output2+"<br>";
				tfill.innerHTML+='<h2 >N-edik gyök:</h2>√<sup>'+input3+"</sup>"+input4+"= "+output3+"<br>";
				ino3.style.width="40px";
		    tfill2.style.display="block";
                tfill2.innerHTML ='<h1 class="covered green ">Hatványozás</h1>';
				tfill2.innerHTML+='<h2>Négyzetre emelés:</h2>'+input9+"<sup>2</sup>="+output9+"<br>";
				tfill2.innerHTML+='<h2>N-edikre emelés</h2>'+input5+"<sup>"+input6+"</sup>= "+output5+"<br>";
				tfill2.innerHTML+='<br><button onClick="fillt('+"'negyzet'"+');">Négyzetszámok</button>';
				ino3.style.width="40px";
				break;
		case "besz" :
				tfill.innerHTML ='<h1 class="covered yellow" >Kiemelés és beszorzás</h1><br><br>(x+y)<sup>2</sup>:<br>('+input1+'+'+input2+")<sup>2</sup>="+output1+"<br>";
				tfill.innerHTML+='(x-y)<sup>2</sup>:<br>('+input3+'-'+input4+")<sup>2</sup>="+output2+"<br>";
	tfill.innerHTML+='x<sup>2</sup>-y<sup>2</sup>:<br>'+input5+'<sup>2</sup>-'+input6+"<sup>2</sup>="+output3+"<br>";
				ino1.style.width="40px";
				ino2.style.width="40px";
				ino3.style.width="40px";
				ino4.style.width="40px";
				ino5.style.width="40px";
				ino6.style.width="40px";
				break;
	case "toa" :tfill.innerHTML='<h1 class="covered indigo-disabled" >Sum of Expression (∑)</h1><br>from x='+input1+" | to:"+input2+" <br><br>Using expression (x is the variable) "+input3+"<br><hr> Result: "+output1 ;
							tfill2.style.display="block";
							tfill2.innerHTML='<h1 class="covered indigo-disabled" >Product of Expression (Π)</h1><br>from x='+input4+" | to:"+input5+" <br><br>Using expression (x is the variable) "+input6+"<br><hr> Result: "+output2 ;
							validatenumber=false;

							  graphis(true)

				break;
	case "fakt" : tfill.innerHTML ='<h1 class="covered blue" >Faktorális</h1><br>'+input1+'!='+output1+"<hr>";
                graphis(true);
				ino1.style.width="40px";
				break;

	case "szamtani" : tfill.innerHTML ='<h1 class="covered indigo-disabled" >Számtani sorozat</h1><br>Első szám : a<sub>1</sub>'+input1;
					  tfill.innerHTML+='<br><br>Növekmény: d'+input2+'<br><br>Utolsó szám: '+input3+"<br><br>"+output1;
				ino3.style.width="40px";
                graphis(true);
				break;

	case "mertani" : tfill.innerHTML ='<h1 class="covered indigo-disabled" >Mértani sorozat</h1><br>első szám : a<sub>1</sub>'+input1;
					  tfill.innerHTML+='<br><br>Növekmény: q'+input2+'<br><br>Meddig generálja: '+input3+"<br><br>"+output1;
				ino3.style.width="40px";
                graphis(true);
				break;

	case "gorbe" : tfill.innerHTML ='<h1 class="covered indigo-disabled" >Görbe sorozat</h1><br>első szám : a<sub>1</sub>'+input1;
					  tfill.innerHTML+='<br><br>Növekmény: d'+input2+'<br><br>Növekmény növekménye: e '+input3+'<br><br>Meddig generálja:'+input4+"<br><br>"+output1;
				ino4.style.width="40px";
				break;

	case "fibo" : tfill.innerHTML ='<h1 class="covered indigo-disabled" >Fibonacci sorozat</h1><br>Első '+input1+'elem<br><br>'+output1+"<br>";
                 graphis(true)
				ino1.style.width="40px";
				break;

	case "negyzet" : tfill.innerHTML ='<h1 class="covered indigo-disabled" >Négyzetszámok</h1><br>Az Első '+input1+' db négyzetszám listázása<br><br>'+output1+"<br>";
				ino1.style.width="40px";
                graphis(true)
				break;
	case "spin" : tfill.innerHTML ='<h1 class="covered indigo-disabled" >Spinkvantumszám</h1><br>Az atomok héjain lévő atomok összege<br>1-től '+input1+'. héjig <br>'+output1+"<br>";
				ino1.style.width="40px";
				break;
	case "prim_" :
				tfill.innerHTML ='<h1 class="covered indigo-disabled" >Prímtényezőkre bontás</h1><h2 class="covered subtitle indigo-disabled-300"> Prím-e a szám?</h2><br>a szám: '+input1+' <br>'+output1+"<br>";
				break;
  case "primgrid":
        tfill.innerHTML=primeListGrid.innerHTML;
        break;
	case "primlist" :
				tfill.innerHTML ='<h1 class="covered indigo-disabled" >Prímszámok listázása</h1><br> '+input1+'-ig.  <br>'+output1+"<br>";
                graphis(true);
				break;

			//SZAMRENDSZER

	case "szamrend" :
				tfill.innerHTML ='<h1 class="covered indigo-disabled" >Number Systems</h1>';
				tfill.innerHTML+='<br>';
				tfill.innerHTML+='Change from '+input1+' To: '+input2+'<br><br>The Number:  '+input3+' <br>'+output1;
				//GEOMETRIE
				break;
	//MESELJ
	case "mesel" :
				tfill.innerHTML ='<h1 class="covered indigo-disabled" >Everything about a number</h1>';
				tfill.innerHTML+='<br><br>';
				tfill.innerHTML+='Tell me everything about this number:  '+input1+'<br><br><br>' +output1;
				//in1*in1+in2*in2+2*in2*in
				//mennyiD*mennyiD-mennyiD2*mennyiD2
				break;
	case "masodfok" :
				tfill.innerHTML='<h1 class="covered indigo-disabled" >Másodfokú egyenlet megoldás</h1><br><br>';
				tfill.innerHTML+=input1+'*X<sup>2</sup> + '+input2+'*X +'+input3+'=0<br>'+output1;
				ino2.style.width="40px";
				ino1.style.width="40px";
				ino3.style.width="40px";
				break;
	case 'pir' :
				tfill.innerHTML='<h1 class="covered indigo-disabled" >Pireneusi számok</h1>';
				tfill.innerHTML+='számok generálása'+input1+'<br>'+output1;
                graphis(true)
				break;
	case 'kamat' :
				tfill.innerHTML='<h1 class="covered indigo-disabled" >Katamszámítás</h1><br><br>';
				tfill.innerHTML+='Alaptőke: '+input1+'<br><br>Kamat (%): '+input2+' <br><br>futamidő (egység): '+input3+' <br><br>'+output1;
				ino2.style.width="40px";
				break;
	case 'atl_' :
				makeinput(50,10);
				tfill.innerHTML='<h1 class="covered indigo-disabled" >Átlagok</h1>';
				tfill.innerHTML+='<span id="inpns">'+textinp+'</span><br>átlag:'+output1;

				tfill.innerHTML+='<br>mértani átlag: '+output2;

				tfill.innerHTML+='<br>harmónikus átlag: '+output3;

				tfill.innerHTML+='<br>négyzetes átlag: '+output4;
				break;
	case 'sintg' :
				tfill.innerHTML='<h1 class="covered indigo-disabled" >Szögfüggvények (sin, cosin, tg, ctg)</h1>Háromszög<br>';
				tfill.innerHTML+='a oldal '+input1+'<br>b oldal '+input2+' <br>c oldal (átfogó) '+input3+'<br><img src="haromszogek.png"> <br>'+output1;
				break;
	case 'random' :

				tfill.innerHTML='<h1 class="covered indigo-disabled" >Véletlenszerű szám generálása</h1><br>'+input1+' - '+input2+ ' tartományban.<br><br>'+output1+'<br>';
				tfill.innerHTML+='<switch checked="true"><span>Any Number</span><span>Integer</span></switch>';
				tfill.innerHTML+='<switch checked="true"><span>Positive and Negative</span><span>Only Positive</span></switch>';
				//tfill.innerHTML+='<br><button onClick="window.location='+"'http://rontap.netne.net/#lipusm.html'"+';" style="width:auto;">véletlengeneráló</button>';
				break;
	case 'valszam' :
				tfill.innerHTML='<h1 class="covered indigo-disabled" >Kombinatorika</h1>bemenő adatok:'+input1+input2+input3+input4+input5+'<br>ezeknek az összes kombiációja:<br>'+output1;
				ino1.style.width="40px";
				ino2.style.width="40px";
				ino3.style.width="40px";
				ino4.style.width="40px";
				ino5.style.width="40px";

				break;
	case 'pi' :
		tfill.innerHTML='<h1 class="covered" >Contsants in tapcalk</h1><br>'
		tfill.innerHTML+='<b>Pi</b><br>value: 3.14159265359<br>How to use in Tapcalk: =PI';
		tfill.innerHTML+='<hr><br><b>sqrt 2</b><br>value: 1.41421356237<br>How to use in Tapcalk: =SQRT2';
		tfill.innerHTML+='<hr><br><b>Euler\'s number </b><br>value: 2.71828<br>How to use in Tapcalk: =E';

	break;
	case 'formula' :
				tfill.innerHTML='<h1 class="covered indigo-disabled" >formula beírása.</h1><br> Az = kötelező az elejére!<br>'+input1+'<br>'+output1;
				ino1.style.width="250px";
				ino1.placeholder="=2*5+(4/8)";
				tfill.innerHTML+='<br>Jelenleg támogatott függvények:<br>=PI<br>=E<br>(szám)! <br>=SQRT2<br>=RANDOM (szám közvetlen utána)<br>=RANDF (szám közvetlen utána)';
				break;
	case 'halmaz' :

				tfill.innerHTML="Halmazok<br><br><span id='thalm'>A = { "+input1+"  }<br>B = { "+input2+"  }<br></span><button class='inp-text' style='width=20px;' onclick='addhalm()'>Új Halmaz</button><br>&cup;&and;\\"+output1;
				ino1.style.width="300px";
				ino1.placeholder="1;5;szöveg;hörcsög;125"
				ino1.value="1;2;hörcsög;értékek"
				validatenumber=false;
				break;
	case 'atv' :
				tfill.innerHTML=valtkod;
				break;
	case 'lkkt':
				tfill.innerHTML='<h1 class="covered indigo-disabled" >LKKT: Legkisebb Közös Többszörös</h1><br>1. szám: ' + input1 + "<br><br>2. szám: " +input2 + '<br>'+ output1;
				break;
	case 'lnko':
				tfill.innerHTML='<h1 class="covered indigo-disabled" >LNKO: Legnagyobb Közös Osztó</h1><br>1. szám: ' + input1 + "<br><br>2. szám: " +input2 + '<br>'+ output1;
				break;
    case 'stat' :
                tfill.innerHTML="<h1 class='covered indigo-disabled' ><br>Statisztika</h1><p>Ebbe a mezőbe, az adatokat VESSZŐVEL elválasztva kell beírni. A tizedesvessző helyett tizedespont van.</p><br><textarea class='inp-text' placeholder='2,3,9,3.1415' id='area'></textarea>"+output1;
                break;
    case 'happy' :
                tfill.innerHTML='<h1 class="covered indigo-disabled" >Boldog-boldogtalan számok</h1><br>'+input1+"<br>"+output1;
        break;
    case 'romai' :
                tfill.innerHTML='<h1 class="covered indigo-disabled" >Átváltás római számokra és vissza</h1><br>'+
                    input1+'<br><br><input type="radio" name="witch" value="ar" id="egy" checked>Arabról  Rómaira<br><input type="radio" name="witch" value="ra">Rómairól Arabra<br>'+output1;
                validatenumber=false;
}//switch-c
	eventfire=c;
	location.href="#tmain";
	info(eventfire);

	},200);
					}//function
