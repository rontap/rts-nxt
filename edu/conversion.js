/**
 * Legacy TapCalk Conversion Module
 * CC-BY-NC Licence
 * used by Tapcalk and created by its contributors
 * @author: rontap, bobarna
 *
 * description: converting different content
 **/


e=""; //eredmény

function melyik(call){
 if (egy.checked)  valtar(call);
 else         		 valtra(call);
}

function valtar(call)
{
 e="";
 while (call>0) {
      if (call>=1000) {
          call-=1000;
          e+="M";
      }
      else if (call>=500) {
          call-=500;
          e+='D';
      }
      else if (call>=100) {
          call-=100;
          e+='C';
      }
      else if (call>=50) {
          call-=50;
          e+='L';
      }
      else if (call>=10) {
          call-=10;
          e+='X';
      }
      else if (call>=5) {
          call-=5;
          e+='V';
      }
      else if (call>=1) {
          call-=1;
          e+='I';
      }
 }

     //csere=['IIII','XXXX','CCCC'];
     //csere2=['IV','XL','CD'];
     //MDCCCCLXXXXVIIII
     //M.D.CD.L.XL.IX.
     //MCMXCIX
     console.log(e);
     e = e.replace(/CCCC/g,'CD');
     e = e.replace(/XXXX/g,'XL');
     e = e.replace(/XXXX/g,'XL');
     e = e.replace(/VIIII/g,'IX');
     e = e.replace(/IIII/g,'IV');
     console.log(e);

 outcall(e);
}

e="";
 ertek=[1,5,10,50,100,500,1000];
 romak=['I','V','X','L','C','D','M'];
 asd=[];

function valtra(call) {

 e=0;
 ertek=[1,5,10,50,100,500,1000];
 romak=['I','V','X','L','C','D','M'];
 asd=[];

 for ( i = 0; i < call.length; i++) {

         if (romak.indexOf(call.charAt(i)) < romak.indexOf(call.charAt(i+1)))
         {

             e += ertek[romak.indexOf(call.charAt(i+1))] - ertek[romak.indexOf(call.charAt(i))];
             i++;
         }
         else {
         //MCD
             if (call.charAt(i)=='I')                  e+=1;
             else if (call.charAt(i)=='V')                 e+=5;
             else if (call.charAt(i)=='X')                e+=10;
             else if (call.charAt(i)=='L')                e+=50;
             else if (call.charAt(i)=='C')              e+=100;
             else if (call.charAt(i)=='D')              e+=500;
             else if (call.charAt(i)=='M')               e+=1000;

         }
 }//nagyelse
outcall(e);
}



//----------------------------------------------------------------------
//ATVALT---------------------------------------------------------------------------------------------ATVALT---------
//----------------------------------------------------------------------
changeObj = {
         'tomeg' : {
             'szam': [1,1000,0.1,0.01,0.31103,0.373241,20411,100],
             'nev' : ['kilogramm (kg)','tonna (t)','dekakilogramm (dkg)','gramm (g)','uncia','font','barge','mázsa [metrikus]']

         },
         'terfogat' : {
             'szam': [1000,1,0.001,0.005,0.015,4.54609],
             'nev' : ['köbméter','köbdeciméter/liter','milliliter','teáskanál','evőkanál','gallon']

         },
         'terulet' : {
             'szam': [1,100,10000,1000000, 0.83612736],
             'nev' : ['négyzetméter','ár','hektár','négyzetkilóméter','négyzetyard']

         },
         'hossz' : {
             'szam': [1,1000,0.01,0.001,0.3048,1609.344,0.0245,149597870691,9460730472580800,0.000375,0.000000001],
             'nev' : ['méter','kilóméter','centiméter','miliméter','láb','mérföld','hüvelyk (Inch)/ Kaliber','csillagászati egység','fényév','pont','ångström / nanométer']

         },
         'ido' : {
             'szam': [1,60,3600,86400,604800,2592000,31536000],
             'nev' : ['másodperc(s)','perc (min)','óra','nap','hét','hónap(30 napos)','év (365 nap)']

         },
         'sebesseg' : {
             'szam': [1,0.00008466667,0.000423333,0.00508,0.0254,0.2777778,0.3048,0.44704,0.514444,26.8224,1609.344,],
             'nev' : ['méter per másodperc (m/s)','láb per óra (ft/h)','hüvelyk per perc (in/min)','láb per perc (ft/min)','hüvelyk per másodperc (in/s)',
                             'kilométer per óra (km/h)','láb per másodperc (ft/s)','mérföld per óra (mi/h)','csomó(NM/h)','mérföld per perc (mi/min)',
                             'mérföld per másodperc (mi/s)']

         }
     }
     function valt(mennyit)
     {
         return Number(Number(mennyit)*Number( mirol.options[mirol.selectedIndex].value));
     }

     function valt2(mennyit)
     {
         return Number(Number(mennyit)/Number( mire.options[mire.selectedIndex].value));
     }
     function ir() {
         console.log(valt2(valt(Number(rol.value))));
         kime.innerHTML=valt2(valt(Number(rol.value)))
     }
     function kat(call) {

         mire.innerHTML="";  //innerhtml nullázása
         mirol.innerHTML=""; //innerhtml nullázása

         for (i = 0; i < changeObj[call].szam.length; i++)
         {
              mire.innerHTML+='<option value="'+changeObj[call].szam[i]+'">'+changeObj[call].nev[i]+'</option>';
             mirol.innerHTML+='<option value="'+changeObj[call].szam[i]+'">'+changeObj[call].nev[i]+'</option>';//innerhtml átállítása
         }
     }
     //alap();
