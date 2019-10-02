

// ---------------------------------
// ---- PWA FUNCTIONALITY ----------
// ---------------------------------
import nxt from '../nxtjs/jsplus';
nxt.export();
/*eslint eqeqeq:0*/
/*eslint-disable*/
import CONST from '../constants';
function confirmForceUpdate() {
    if (!navigator.onLine) {
        return window.confirm('You are currently offline, if you force update, you will need internet connection to start the application again!\nContinue?')
    }
    return true
}
function forceUpdate() {
    if (confirmForceUpdate()) {
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {

                console.log('Updating');
                caches.delete(key);

            }));
        });
    }

    if (navigator.onLine) {
        window.alert('Force Updating App...');
        location.reload();
    }

}


function checkIfUnlocked(variable,callback,callbackFalse) {
    if (CONST.store[variable]) callback(); else callbackFalse();
}

function difficultySelChange(event) {
    let selected = event.target.value ;
    if (selected === "-3" && !CONST.store.epicUnlocked) {
        window.alert(CONST.m.epicLocked);
        difficultySelection.value = 1;
    }
    else {
        plusChange=Number(selected);
    }

}

Array.prototype.isSameOrZero = function() {
    let validValue = this.filter($=>$)[0];
    return this.every( el =>  el === validValue || el === 0 );
};

let plusChange = 0;
let timeAttackSpace = 3;
let reqMoves = [14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 34, 38, 42, 46, 50, 55, 60, 65, 70, 76, 82, 88, 100];

function setDifficulty() {
    reqMoves = reqMoves.map(x => x + plusChange);
    timeAttackSpace += plusChange / 2;
}
let prevColor = '';
document.body.onkeypress = function (event) {
    if (!isNaN(Number(event.key) + 1)) {
        if (isGameStarted)
            clickTo(Number(event.key));
        else startGame();
    } else if ((event.key === "Enter") || (event.keyCode === 32)) {
        startGame();
    }
}
let isGameStarted = false;

webconnectstatus.innerHTML = (navigator.onLine ? 'online' : 'offline')