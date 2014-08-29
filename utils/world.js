/*global module, exports*/
/*jslint plusplus: true */

function array2d(rows) {
    "use strict";
    var arr = [],
        i;
    for (i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

exports.createCentral = function () { //once sent the player can keep the core chunk loaded and pass it any other players that join
    "use strict";
    var core;
    
    return core;
};

exports.getChunk = function (id, core) { //for use once the core chunk has been generated and the game has started
    "use strict";
    
};