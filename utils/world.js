/*global module, exports*/
/*jslint plusplus: true */

function rand(x, xp) {
    "use strict";
    return Math.floor((Math.random() * xp) + x);
}

function sumArray(arr) {
    "use strict";
    var sum = 0,
        i;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

exports.createCentral = function () { //once sent the player can keep the core chunk loaded and pass it any other players that join
    "use strict";
    var core;
    
    return core;
};