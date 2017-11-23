//#uses nxtJS

if (localStorage.theme !== null)
	{
		setTheme(localStorage.theme);
		setLang(localStorage.lang);
		$('body').style.background = localStorage.bg;
	}
	else
	{
		localStorage.theme = "";
		localStorage.lang = "";
		localStorage.background = '#DDD';
	}
opened=false; //settings

function setLang(code)
{
        switch (code)
        {
        case 'en' : lang=['days of the year','month','day','day of the week','hour','minute','second'];
         break;
        case 'ge' : lang=['Tagen des Jahres','Monat','Tag','Tag der Woche','Stunde','Minute','Sekunde'];
         break;
        case 'hu': lang=['év napja','hó','nap','hét napja','óra','perc','másodperc'] ;		 
	 break;
	case 'bg' : lang=['']
	 break;
		case 'none' : lang=['','','','','','',''];
         break;
		
        default: lang=['év napja','hó','nap','hét napja','óra','perc','másodperc'] ;
        }
        for (i=0;i<lang.length;i++)
        {
        $$(".mutato")[i].innerHTML=lang[i];
        }
		localStorage.lang = code;
}

function set(call,width) {
    window[call].style.width=width+'%';
}
i=0;

function time() {
        datum = new Date()
        var start = new Date(datum.getFullYear(), 0, 0);
        var diff = datum - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);

        set('y',(day/365)*100);
        set('mo',((datum.getMonth()+1)/12)*100);
        set('d',(datum.getDate()/31)*100);
    
        if (datum.getDay()==0)  set('w',100);
        else                    set('w',(datum.getDay()/7)*100)
               
        set('h',(datum.getHours()/24)*100+(datum.getMinutes()/60)*4.1)
        set('m',((datum.getMinutes()/60)*100)+(datum.getSeconds()/40))
        set('s',(datum.getSeconds()/60)*100)

        y_.innerHTML=day;
        mo_.innerHTML=datum.getMonth()+1;
        d_.innerHTML=datum.getDate();
        w_.innerHTML=datum.getDay();
        if (datum.getDay()==0) {w_.innerHTML=7};
        h_.innerHTML=datum.getHours();
        m_.innerHTML=datum.getMinutes();
        s_.innerHTML=datum.getSeconds();

        ho=["január", "január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "november","december"]

        tit=datum.getHours() + ":" + datum.getMinutes() + ":" + datum.getSeconds() + " " + datum.getDate() + "-" + ho[datum.getMonth()] + "-" + datum.getFullYear();


        title.innerHTML = tit;

        console.log(i)

            setTimeout(
                    function(){time()}
                    ,1000
                    );
	};
time();
rti=0;
    function rtp()
    {
          if (rti<255)   rti++; 
          else           rti=0; 
          setTheme(rti)
          setTimeout(      
            function(){rtp()}
            ,500
            );
    }
function setTheme(call)
{
        if (!isNaN(call))
        {
       setUI('hsl('+call+', 20%,15%)','hsl('+call+', 35%,25%)','hsl('+call+', 50%,35%)','hsl('+call+', 60%,45%)','hsl('+call+', 70%,55%)','hsl('+call+', 80%,60%)','hsl('+call+', 90%,65%)');
        
        }
        else {
        switch (call)
            {
            case 'rjsx'       || 0 : setUI('#62c','#f44','#666','#9c6','#f84','#ebb035','#48f'); break;
            case 'monochrome' || 1 : setUI('#000','#333','#666','#888','#999','#aaa','#bbb'); break;
            case 'simple'     || 2 : setUI('#000','red','green','blue','orange','purple','brown'); break;
            case 'rtp'        || 3 : setTimeout(function(){
                setUI(rand(),rand(),rand(),rand(),rand(),rand(),rand()); setTheme('rtp')},500); break;
            default :                setUI("#48F","#192823","#D0C6B1","#218559","#0A2CB","#Ebb035","#DD1E2F")
            break;
            }
        }
		localStorage.theme = call;
}
function rand()
{
r=Math.floor(Math.random()*255);
g=Math.floor(Math.random()*255);
b=Math.floor(Math.random()*255);
return 'rgb(' + r + ',' + g + ',' + b + ')' 
}
function setUI(aw,bw,cw,dw,ew,fw,gw)
{
    y.style.background=""+aw;
    mo.style.background=""+bw;
    d.style.background=""+cw;
    w.style.background=""+dw;
    h.style.background=""+ew;
    m.style.background=""+fw;
    s.style.background=""+gw;
}

function settingso() {
    if (opened)
    {
        
        setTimeout(function(){
        settings.classList.add('on');
        },50);
        opened=false;
        
    }
    else {
        //settings.style.display="none";
        settings.classList.remove('on');
        opened=true;
    }
}

var loading;

window.oncontextmenu = function ()
{
	settingso();
    return false;     // cancel default menu
}
csikocskak.onclick = function ()
{
	settingso();
    return false;     // cancel default menu
}
settingso();
