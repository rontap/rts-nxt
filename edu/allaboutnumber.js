// dual-connection to tapcalk and API
// TAPCALK EXPRESS
// forked from calknew.js 

tcx = {};
tcx.tellMe = function(call) {
    in1 = call;
    althist = true;
    ahc = in1;
    pesz = false;
    console.log('storySTART' + in1);
    kim = 'The number <b>' + in1 + '</b> is ';
    //prs prtl
    if (in1 % 2 == 0)    kim += 'even ';   
    else                kim += 'odd '
    
        //besorolás
    if (Math.floor(in1) == in1) { //egész
        if (in1 == 0) {
            kim += ' not positive and not negative ';
        } else if (Math.abs(in1) == in1) {
            kim += 'natural (positive) ';
            pesz = true;
        } else kim += 'negative ';

        kim += ' whole number (Z) ';
    } else { //nem egész
        if (Math.abs(in1) == in1) kim += ' positive ';
        else kim += ' negative ';
        kim += ' racional number ';
    }

    kim += ', which '
    //prím e a szám
    prim = true;

    console.log(in1, Math.isPrime( in1 ));
    if ( ! Math.isPrime( in1 ) ) {
        kim += ' is not a prime, because it is dividable by<wbr> ' + Math.prime( in1 ) + '<br>  ';
    } else {
        kim += ' is a prime.<br><br>';
    }
    //tokeletes szam
    if ((in1 == 6) || (in1 == 28) || (in1 == 496) || (in1 == 8128)) {
        kim += ' This is a perfect number (a szám sum of its dividers is the number itself).';
    }

    //négyzetszám
    if (Math.floor(Math.sqrt(in1)) == Math.sqrt(in1)) {
        kim += ' The number is a square number, it is the square of ' + Math.sqrt(in1) + ''
    } else if (pesz) {
        kim += ' The numbers Square Root is ' + Math.round(Math.sqrt(in1)) + ' . ';
    }
    kim += ' The root of the number is ' + in1 * in1 + ' .<br>';
    
    //fakt
    if (pesz) {
        fakt = 1;
        for (i = in1; i > 0; i--) {
            fakt = i * fakt;
        }
        if (fakt < 1000000000) {
            kim += " The factorial of the number is" + fakt;
        }
        if (in1 >= 700000000000000000000) {
            kim += " This number is greater than the number of atoms in the universe.";
        }
    }
    //fibo
    var f, fel, fe2;
    f = 1;
    fel = 0;
    for (i = 1; i < in1; i++) {
        fe2 = fel;
        fel = f;
        if (f == in1) {
            kim += ' This number is the ' + i + 'th element of the fibonacci numbers. '
        }
        f = fel + fe2;
    }
    //szamosszad/osszeg
    ins = in1.toString();
    if (ins[0] == "-") {
        ins = ins.slice(1, ins.length);
        console.log(ins);
    }
    szor = "1";
    for (i = 0; i < ins.length; i++) {
        szor = szor * Number(ins[i]);
    }
    kim += " The sum of its numbers is " + Math.sum( ins.split("") ) + " , the PI is " + szor + " .";
    //per
    if (prt[in1 - 1] != undefined) {
        kim += "<br>In the periodic table the " + in1 + "th element is " + prt[in1 - 1] + " . ";
    }
    if (ins.length == 3) {
        kim += '<div id="outmen" style="background:rgb(' + (ins[0] * 26 + 21) + "," + (ins[1] * 26 + 21) + "," + (ins[2] * 26 + 21) + ")" + '"> This number has a Color</div>';
    }

    if (in1 == 42) {
        kim += "<b>This number is tte ultimate answer</b>"
    }
    console.log(kim);
    return kim;
    
}

Math.tellMe = function(call) {
    var in1 = call;
    tcx.tellMe(call);
}
function meselj() { // TC 6 Design Update
    tcx.tellMe(in1);
    ouo1.innerHTML = kim;
}



// periodic table

prt=new Array("H	Hidrogén","He	Hélium","Li	Lítium","Be	Berillium","B	Bór","C	Szén","N	Nitrogén","O	Oxigén","F	Fluor","Ne	Neon	","Na	Nátrium	","Mg	Magnézium	","Al	Alumínium	","Si	Szilícium","P	Foszfor","S	Kén","Cl	Klór","Ar	Argon","K	Kálium","Ca	Kálcium","Sc	Szkandium	","Ti	Titán	","V	Vanádium	","Cr	Króm	","Mn	Mangán	","Fe	Vas	","Co	Kobalt	","Ni	Nikkel	","Cu	Réz	","Zn	Cink	","Ga	 Gallium","Ge	Germánium	","As	Arzén	","Se	Szelén	","Br	Bróm	","Kr	Kripton	","Rb	Rubídium	","Sr	Stroncium	","Y	Ittrium	","Zr	Cirkónium	","Nb	Nióbium	","Mo	Molibdén	","Tc	Technécium	","Ru	Ruténium	","Rh	Ródium	","Pd	Palládium	","Ag	Ezüst	","Cd	Kadmium	","In	Indium	","Sn	Ón	","Sb	Antimon	","Te	Tellúr	","I	Jód	","Xe	Xenon	","Cs	Cézium	","Ba	Bárium	","La	Lantán	","Ce	Cérium	","Pr	Prazeodímium	","Nd	Neodímium	","Pm	Prométium	","Sm	Szamárium	","Eu	Európium	","Gd	Gadolínium	","Tb	Terbium	","Dy	Diszprózium	","Ho	Holmium	","Er	Erbium	","Tm	Túlium	","Yb	Itterbium	","Lu	Lutécium	","Hf	Hafnium	","Ta	Tantál	","W	Volfrám	","Re	Rénium	","Os	Ozmium	","Ir	Irídium	","Pt	Platina	","Au	Arany	","Hg	Higany	","Tl	Tallium	","Pb	Ólom	","Bi	Bizmut	","Po	Polónium	","At	Asztácium	","Rn	Radon	","Fr	Francium	","Ra	Rádium	","Ac	Aktínium	","Th	Tórium	","Pa	Protaktínium	","U	Urán	","Np	Neptúnium	","Pu	Plutónium	","Am	Amerícium	","Cm	Kűrium	","Bk	Berkélium	","Cf	Kalifornium	","Es	Einsteinium	","Fm	Fermium	","Md	Mendelévium	","No	Nobélium	","Lr	Laurencium	","Rf	Radzerfordium	","Db	Dubnium	","Sg	Sziborgium	","Bh	Borium	","Hs	Hasszium	","Mt	Meitnerium	","Ds	Darmstadtium	","Rg	Röntgenium	","Cn	Kopernícium	","Uut	Ununtrium	","Fl	Flerovium	","Uup	ununpentium	","Lv	Livermorium	","Uuh	Ununszeptium	","Uuo	Ununoktium	","Uue	Ununennium	","Ubn	Unbinilium	","Ubu	Unbiunium");