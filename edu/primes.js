
    function tbld(call) {

        a = Math.ceil(Math.sqrt(call));
        if (a % 2 == 0) {
            a++;
        }
        kim = '';
        for (i = 0; i < a; i++) {
            kim += '<tr>'
            for (j = 0; j < a; j++) {
                kim += '<td id="a">' + j + i + '</td>';
            }
            kim += '</tr>';
        }

        $('#tfill #prime_tbl').innerHTML = kim;


        cent = Math.ceil(a / 2); //középpont
        x = '0';
        y = 1; //milyen iranyba megy
        loc = [cent - 1, cent - 1]; //hol van
        k = 2;
        goseb = 0;

        //mennyivel megy
        $$('#tfill #prime_tbl tr')[cent - 1].getElementsByTagName('td')[cent - 1].innerHTML = 1;
        console.log(loc);

        for (i = 0; i < call; i++) {

            if ((x == "0") && (y == "-1")) {

                cg("-1", "0");
            } else if ((x == "-1") && (y == "0")) {

                cg("0", "1");
            } else if ((x == "0") && (y == "1")) {

                cg("1", "0");
            } else if ((x == "1") && (y == "0")) {

                cg("0", "-1");
            }

            if (i % 2 == 0) {
                goseb++;

            }
        }
    }



    function cg(xx, yy) {
        for (y = 0; y < goseb; y++) {
            loc[0] = loc[0] + Number(xx);
            loc[1] = loc[1] + Number(yy);
            //console.log(loc);
            try {
                $$('#tfill #prime_tbl tr')[loc[0]].getElementsByTagName('td')[loc[1]].innerHTML = k;
            } catch (e) {};
            if (Math.isPrime(k)) {
              $$('#tfill #prime_tbl tr')[loc[0]].getElementsByTagName('td')[loc[1]].style.background = "#48F";
            }

            k++;



        }
        x = Number(xx);
        y = Number(yy);

    }


    function showmeit() {
     if ($('#tfill #ulammegjel').getAttribute('checked')=="true")
           $('#tfill #prime_tbl').style.fontSize="16px";
    else   $('#tfill #prime_tbl').style.fontSize="0px";

    }
