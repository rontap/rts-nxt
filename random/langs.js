lcont=["1","Mandarin","官話/官话","955","193","2","Spanish","Español","436","91","3","English","-","370","611","4","Hindi","हिन्दी","329","215","5","Arabic","العربية","295","145","6","Portuguese","Português","215","11","7","Bengali","বাংলা","240","19","8","Russian","Русский","155","113","9","Japanese","日本語","125","1","10","Punjabi","ਪੰਜਾਬੀ پنجابى","102","0","11","German","Deutsch","76","52","12","Javanese","-","82","0","13","Wu","吳語 / 吴语","80","0","14","Malay/Indonesian","Bahasa Melayu","77","204","15","Telugu","తెలుగు","76","5.5","16","Vietnamese","Tiếng Việt","76","0","17","Korean","한국어 / 조선말","76","0","18","French","Français","74","153","19","Marathi","मराठी","73","3","20","Tamil","தமிழ்","74","8","21","Urdu","اُردُو","66","0","22","Persian","Persian","65","62","23","Turkish","Türkçe","63","0","24","Italian","Italiano","60","0","25","Cantonese","粵語 / 粤语","59","0","26","Thai","ภาษาไทย","56","0","27","Gujarati","ગુજરાતી","49","0","28","Jin","晉語 / 晋语","48","0","29","Min Nan","閩南語 / 闽南语","47","0","30","Polish","Polski","40","0","31","Pashto","پښتو","39","0","32","Kannada","ಕನ್ನಡ","38","0","33","Xiang","湘語 / 湘语","38","0","34","Malayalam","മലയാളം","38","5","35","Sundanese","-","38","0","36","Hausa","هَرْشَن هَوْسَ","34","0","37","Oriya","ଓଡ଼ିଆ","33","0","38","Burmese","မြန်မာစာ","33","0","39","Hakka","客家話 / 客家话","31","0","40","Ukrainian","українська мова","30","0","41","Bhojpuri","भोजपुरी","29","0","42","Tagalog","Wikang Tagalog","28","0","43","Yoruba","Èdè Yorùbá","28","0","44","Maithili","मैथिली /মৈথিলী","27","0","45","Swahili","Kiswahili","16","91","46","Uzbek","Oʻzbek /Ўзбек","26","0","47","Sindhi","سنڌي / िन्धी","26","0","48","Amharic","አማርኛ","25","0","49","Fula","Fulfulde","25","0","50","Romanian","Română","24","0","51","Oromo","Afaan Oromo","24","0","52","Igbo","Asụsụ Igbo","24","0","53","Azerbaijani","Azərbaycan","23","0","54","Awadhi","अवधी","22","0","55","Gan","贛語 / 赣语","22","0","56","Cebuano","Binisaya","21","0","57","Dutch","Nederlands","21","0","58","Kurdish","كوردی","21","0","59","Lao","ພາສາລາວ","20","0","60","Serbo-Croatian","Srpskohrvatski / hrvatskosrpski / хрватскосрпски","19","0","61","Malagasy","Malagasy","18","0","62","Saraiki","سرائیکی","17","0","63","Nepali","नेपाली","17","0","64","Sinhalese","සිංහල","16","0","65","Chittagonian","টগাঁইয়া বুলি","16","0","66","Zhuang","Vahcuengh","16","0","67","Khmer","ភាសាខ្មែរ","16","0","68","Assamese","অসমীয়া","15","0","69","Madurese","Madhura","15","0","70","Somali","Af-Soomaali","15","0","71","Marwari","मारवाड़ी","14","0","72","Magahi","मगही","14","0","73","Haryanvi","हरियाणवी","14","0","74","Hungarian","Magyar","13","0","75","Chhattisgarhi","छत्तीसगढ़ी","12","0","76","Greek","ελληνικά","12","0","77","Chewa","Nyanja","12","0","78","Deccan","دکنی","11","0","79","Akan","Twi / Fante","11","0","80","Kazakh","Qazaqşa / Қазақша","11","0","81","Min Bei","閩北語 / 闽北语","10.9","0","82","Sylheti","ছিলটী","10.7","0","83","Zulu","isiZulu","10.4","0","84","Czech","Čeština","10","0","85","Kinyarwanda","Ikinyarwanda","9.8","0","86","Dhundhari","-","9.6","0","87","Haitian Creole","Kreyòl Ayisyen","9.6","0","88","Min Dong","閩東語 / 闽东语","9.5","0","89","Ilokano","-","9.1","0","90","Quechua","-","8.9","0","91","Kirundi","-","8.8","0","92","Swedish","-","8.7","0","93","Hmong","-","8.4","0","94","Shona","-","8.3","0","95","Uyghur","ئۇيغۇرچە","8.2","0","96","Hiligaynon","-","8.2","0","97","Mossi","-","7.6","0","98","Xhosa","-","7.6","0","99","Belarusian","беларуская мова","7.6","0","100","Balochi","بلوچی","7.6","0"];


writingType=["Latin","Cyrill","Eastern"," Arab","N/A"];
writingList="200230212200222220223300222220322243222122020134004444444444444444444444444444444444444444444444444444444444444";
function parseTable() {
  let temp="<table>";
  temp+="<tr><th>?</th><th>No</th><th>English Name</th><th>Local Name</th><th>L1</th><th>L2</th><th>Writing</th></tr>"
  for (i=0;i<lcont.length;i=i+5) {
      temp+="<tr class='list'><td><input type='checkbox' name='lang"+i+"' nxt><label nxt for='lang"+i+"' class='material-icons' >check_box_outline_blank</label> "
      temp+="</td><td>"+lcont[i]+"</td><td>"+lcont[i+1]+"</td><td>"+lcont[i+2]+"</td><td>"+lcont[i+3]+"</td><td>"+lcont[i+4]+"</td><td style='text-align:right;'>"+writingType[writingList[i/5]]+"</td></tr>";
  }
  return temp+"</table>";
}


function checkboxNxt() {
  for (i = 0; i<$$('input[nxt]').length; i++) {
      $$('label[nxt]')[i].onclick=function() {
        if (this.checked) {this.innerHTML="check_box_outline_blank" ; this.checked=false; this.style.color="#222"; }
        else  { this.innerHTML="check_box" ; this.checked=true; this.style.color="var(--primary)"; }
        updateLang();
      }
  }

}
const popul = 6700.0 ;
const l1sum = 5754.5 ;
const l2sum = 1281.5 ;

function updateLang() {
  console.log('UL');
  let l1 = 0;
  let l2 = 0;
  for (let y = 0; y<$$('table tr label[nxt]').length; y++) {
      if ($$('table tr label[nxt]')[y].checked) {//$$('table tr label[nxt]')[i].checked
          l1+=Number(lcont[y*5+3]);
          l2+=Number(lcont[y*5+4]);
      }
  }
  console.log(l1,l2);
  $("#g_l1").style.width=(l1/popul)*100+"%";
  $("#g_l2").style.width=(l2/popul)*100+"%";

  return [l1,l2];
}
