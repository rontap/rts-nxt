    
searchMe = [
    ['get random text generator password security','tools.html#rpt','build','Password Generators'],
    ['set music player vlc sound playlist media','tools.html#clock','album','Music Players'],
    ['get color colour swatch random generator','tools.html#clock','invert_colors', "Random Color Generator"],
    ['set hour clock timer stopwatch','tools.html#clock','alarm','Clocks'],
    ['text editor format word write','tools.html#te','format_color_text','Text Editor'],
    ['text notes editor save word idea write','tools/noteio.html','border_color','Note IO'],
    ['text edit multiple send email idea unique write','tools/multiplix.html','format_shapes','Mulitplix'],
    ['habits track multiple idea unique write task note','tools.html#habits','playlist_add_check','Habits'],
    ['meause habit change quit smoking unique counter','tools/smoke.html','smoke_free','Quit Smoking'],
    
    ['time timeflow clock color screensaver','clock/clock.html','query_builder','Timeflow Clock for Background'],
    ['time binary fancy clock hourglass','clock/binary.html','query_builder','Binary Clock'],
    ['timer round stopper fancy clock hourglass wecker wake stopwatch','clock/round.html','query_builder','Round Clock Stopper, Watch'],
    ['mek oszk parser explorer reader text literature redesign','explore/mek.php','book','MEK Explorer '],
    ['wikipedia parser explorer read redesign learn','explore/mek.php','domain','RE:WIKI Wikipedia'],
    
];
    
    searchCurrSelected=0;
function updateTextSearch(e) {
    keywords = search.value.split(" ");
    searchResultsList.innerHTML="";
    searchResultCount=0;
    let i;
    
    if (!isNaN(keywords[0])) {
        searchResultsList.innerHTML="<b class='imp'>Tap Calk Express results</b>";
        searchResultsList.innerHTML+= "<div style='border:2px solid #455A64;background:white;color:#222;'><br>" +  tcx.tellMe( Number( keywords[0] ) ) + "<br><br></div>";
    }
    else
    for (i=0; i<keywords.length;i++) {
        for (j=0; j<searchMe.length; j++) {
            
            if ( 0 <= searchMe[j][0].indexOf(keywords[i]) ) {
                
                searchResultsList.innerHTML+="<div onmousemove='csSs("+(searchResultCount++)+");'><i class='material-icons'>"+searchMe[j][2]+"</i>"+searchMe[j][3]+"</div>";
            }
        }
    }
    console.log(e);
    
    $$('#searchResults div')[searchCurrSelected].classList.remove('on');
    if (e.key=="ArrowDown") {
       searchCurrSelected++; 
    }
    else if (e.key=="ArrowUp") {
      searchCurrSelected--; 
      e.preventDefault();
    }
    $$('#searchResults div')[searchCurrSelected].classList.add('on');  
    $('body').classList.add('search');
    
    if (keywords[0] == "") {
        $('body').classList.remove('search');
    }
}
    function csSs(e) {
        console.log(e);
        $$('#searchResults div')[searchCurrSelected].classList.remove('on');
        searchCurrSelected=e;
        $$('#searchResults div')[searchCurrSelected].classList.add('on');  
    }
    