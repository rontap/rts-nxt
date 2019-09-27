

// ---------------------------------
// ---- PWA FUNCTIONALITY ----------
// ---------------------------------

function confirmForceUpdate() {
    if (!navigator.onLine) {
        return confirm('You are currently offline, if you force update, you will need internet connection to start the application again!\nContinue?')
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
        alert('Force Updating App...');
        location.reload();
    }

}


function checkIfUnlocked(variable,callback,callbackFalse) {
    if (CONST.store[variable]) callback(); else callbackFalse();
}

function difficultySelChange(event) {
    let selected = event.target.value ;
    if (selected === "-3" && !CONST.store.epicUnlocked) {
        alert(CONST.m.epicLocked);
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
