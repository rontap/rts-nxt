
searchMe = [
    ['text editor format word write markdown','random.html#l=2','format_color_text','Text Editor'],
    ['habits track multiple idea unique write task note','random.html#l=3','playlist_add_check','Habits'],
    ['set hour clock timer stopwatch','random.html#l=6','alarm','Clocks'],
    ['get random text generator password security','random.html#l=10','build','Password Generators'],
    ['get color colour swatch random generator','random.html#l=11','invert_colors', "Random Color Generator"],
    ['language l1 speaking compare mother foreing','random.html#l=12','languages','Language Tools'],
    ['group grouping team member','random.html#l=13','group_work','Grouping'],
    ['set music player vlc sound playlist media','random.html#l=15','album','Music Players'],
    ['meause habit change quit smoking unique counter','random/smoke.html','smoke_free','Quit Smoking'],

    ['text notes editor word idea write','tools/noteio.html','border_color','Basic Local Notepad'],
    ['text edit multiple send email idea unique write','tools/multiplix.html','format_shapes','Mulitplix'],
    ['text notes editor save share private keep write','notes/index.html','edit','Notes++'],


    ['time timeflow clock color screensaver','clock/clock.html','query_builder','Timeflow Clock for Background'],
    ['time binary fancy clock hourglass','clock/binary.html','query_builder','Binary Clock'],
    ['timer round stopper fancy clock hourglass wecker wake stopwatch','clock/round.html','query_builder','Round Clock Stopper, Watch'],
    ['timer round stopper animation clock circle ','clock/priest.html','query_builder','Priest round, fancy clock'],

    ['mek oszk parser explorer reader text literature redesign','explore/mek.html','book','MEK Explorer '],
    ['wikipedia parser explorer read redesign learn','explore/mek.php','domain','RE:WIKI Wikipedia'],

    ['tapcalk calculator numbers maths','edu/tapcalk.html','view_carousel','TapCalk 6'],
    ['tapcalk calculator numbers maths x pwa mobile convert','tapcalk/index.html','view_carousel','TapCalk X (in development)'],

    ['games play multiplayer flamewar debate random','flamewar.html','new_releases','Flamewar Debate Generator'],
    ['games play simulation superfarmer','games/superfarmer/main.html','recent_actors','Super Farmer Simulation'],
    ['games play card speed fun multiplayer','games/speed/main.html','credit_card','Speed Card Game'],
    ['games play color reaction fun pwa','games/colorize/index.html','gamepad','Color Game (colorize)'],
    ['games play color puzzle challange pwa fun','games/cancer/index.html','trip_origin','Cancer Expansion Game'],
    ['games play color puzzle fun multiplayer dots','games/duel/index.html','grain','Duel Conqueror'],
    ['games singleplayer minesweeper classig play','games/mine.html','all_out','Minesweeper'],


    ['api nxt js material design','NXTJS/showcase.html','web','NXT.JS API'],
    ['api nxt js ultron url shortener design','api/ultron/index.html','short_text','Ultron URL Shortener'],
    ['party szemkieg projectX rontapparty color','projectx.html','graphic_eq','Project X']
    ['party projectX Xfiles rontapparty music record analyse edit','projectx.html','graphic_eq','Project X']

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
    else if (tcx.eval(keywords[0]).valid) { // TAPCALK X EVAL
        console.log(tcx.eval(keywords[0]).value);

        searchResultsList.innerHTML="<b class='imp'>Tap Calk Express calculator</b>";
        searchResultsList.innerHTML+= "<div style='border:2px solid #1E88E5;background:white;color:#222;'><br>The result for you input is:<br><br><b>" +  tcx.eval(keywords[0]).value + "</b><br><br></div>";


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
    if (e.key=="Enter") {
      $('#searchResultsList div.on').click();
      e.preventDefault();
    }
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
        if ($('html').scrollTop>72) a = 72;
        else a = $('html').scrollTop

        $('nav').style.top = -a + "px";
    }
