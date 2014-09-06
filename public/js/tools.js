//file for small functions to keep main files cleaner

function array2d(rows) {
    "use strict";
    var arr = new Array(rows),
        i;
    for (i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}