/*global module*/
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

exports.createCentral = function () {
    "use strict";
    var size = 4000,
        roadSize = size - 275,
        coreConnections,
        core = {
            roads: []
        },
        coreSides = Array.apply(null, new Array(4)).map(Number.prototype.valueOf, 0);
    
    coreConnections = rand(3, 6);
    
    while (sumArray(coreSides) < coreConnections) {
        var side = rand(0, 4),
            con  = rand(0, 2);
        
        coreSides[side] += con;
    }
    
    var i,
        pos,
        j;
    
    for (i = 0; i < coreSides.length; i++) {
        for (j = 0; j < coreSides[i]; j++) {
            pos = rand(0, roadSize);
            switch (i) {
            case 0:
                core.roads.push({start: {x: pos, y: 0}, stop: {x: 0, y: 0}});
                break;
            case 1:
                core.roads.push({start: {x: roadSize, y: pos}, stop: {x: 0, y: 0}});
                break;
            case 2:
                core.roads.push({start: {x: pos, y: roadSize}, stop: {x: 0, y: 0}});
                break;
            case 3:
                core.roads.push({start: {x: 0, y: pos}, stop: {x: 0, y: 0}});
                break;
            }
        }
    }
    return core;
};