/*global module*/
/*jslint plusplus: true */

function rand(x, xp) {
    "use strict";
    return Math.floor((Math.random() * xp) + x);
}

function sumArray(arr) {
    "use strict";
    var sum,
        i;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

var createCentral = function () {
    "use strict";
    var size = 10000,
        coreConnections,
        chunkSides,
        coreChunk = [4];
    
    coreConnections = rand(3, 5);
    
    while (sumArray(coreChunk) < coreConnections) {
        var side = rand(0, 3),
            con  = rand(0, 1);
        
        switch (side) {
        case 0:
            coreChunk[0] += con;
            break;
        case 1:
            coreChunk[1] += con;
            break;
        case 2:
            coreChunk[2] += con;
            break;
        case 3:
            coreChunk[3] += con;
            break;
        }
    }
    
    var i,
        j;
    
    for (i = 0; i < coreChunk.length; i++) {
        for (j = 0; j < coreChunk[i]; j++) {
            
        }
    }
};

module.exports = createCentral;