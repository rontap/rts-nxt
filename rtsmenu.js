
searchMe = [
    ['get random text generator password security','random.html#l=10','build','Password Generators'],
    ['set music player vlc sound playlist media','random.html#l=14','album','Music Players'],
    ['get color colour swatch random generator','random.html#l=11','invert_colors', "Random Color Generator"],
    ['set hour clock timer stopwatch','random.html#l=6','alarm','Clocks'],
    ['text editor format word write','random.html#l=2','format_color_text','Text Editor'],
    ['habits track multiple idea unique write task note','random.html#l=3','playlist_add_check','Habits'],
    ['meause habit change quit smoking unique counter','random/smoke.html','smoke_free','Quit Smoking'],
    ['language l1 speaking compare mother foreing','random.html#l=12','languages','Language Tools'],

    ['text notes editor save word idea write','random/noteio.html','border_color','Note IO'],
    ['text edit multiple send email idea unique write','random/multiplix.html','format_shapes','Mulitplix'],

    ['time timeflow clock color screensaver','clock/clock.html','query_builder','Timeflow Clock for Background'],
    ['time binary fancy clock hourglass','clock/binary.html','query_builder','Binary Clock'],
    ['timer round stopper fancy clock hourglass wecker wake stopwatch','clock/round.html','query_builder','Round Clock Stopper, Watch'],

    ['mek oszk parser explorer reader text literature redesign','explore/mek.php','book','MEK Explorer '],
    ['wikipedia parser explorer read redesign learn','explore/mek.php','domain','RE:WIKI Wikipedia'],

    ['tapcalk caluclator numbers maths','edu/tapcalk.html','view_carousel','TapCalk 6'],

    ['games play simulation superfarmer','games/superfarmer/main.html','recent_actors','Super Farmer Simulation'],
    ['games play card speed fun','games/speed/main.html','credit_card','Speed Card Game'],
    ['games play color reaction fun','games/colorize/index.html','gamepad','Color Game'],


];

    searchCurrSelected=0;
    searchResultsPrevelance=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
                searchResultsPrevelance[j]++;
                searchResultsList.innerHTML+="<div onclick='location.href=\" "+searchMe[j][1]+" \"' onmousemove='csSs("+(searchResultCount++)+");'><i class='material-icons'>"+searchMe[j][2]+"</i>"+searchMe[j][3]+"</div>";
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

    document.onscroll = function(event) {
        if ($('html').scrollTop>87) a = 87; 
        else a = $('html').scrollTop

        $('nav').style.top = -a + "px";
    }