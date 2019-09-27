let CONST = {};

let schemeStore = [
    ["f44336", "3F51B5", "009688", "FFEB3B", "795548", "8E24AA", "039BE5", "7CB342", "F4511E", "546E7A", "212121"],
    ["E74856", "00CC6A", "0078D7", "C239B3", "FF8C00", "00B7C3", "6B69D6", "FFB900", "4C4A48", "515C6B", "212121"],
    ["e74c3c", "2ecc71", "3498db", "e67e22", "9b59b6", "34495e", "1abc9c", "f1c40f", "95a5a6", "#ecf0f1", "212121"],
    ["c62828", "e53935", "6A1B9A", "F06292", "E91E63", "C2185B", "f44336", "b71c1c", "d50000", "#9C27B0", "212121"]
];

CONST.schemeWallColor = ["000000"];
CONST.maxWallPercent = .25;
CONST.defaultColorRange = 3;
CONST.defaultScheme = 2;
CONST.schemeStore = schemeStore;

CONST.size = 10;
CONST.cellWidth = 10;

window.onload = () => {
    if (nxt.getStore('populistic-' + CURR_VER) === undefined) {
        nxt.setStore('populistic-'+  CURR_VER, {
            isEpicUnlocked : false
        });
    }
    else {
        CONST.store = nxt.getStore('populistic-' + CURR_VER);
    }
};


CONST.m = {
  epicLocked : "You need to unlock the epic difficulty first!"
};