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
        core = {
            roads: []
        },
        coreSides = [4];
    
    coreConnections = rand(3, 5);
    
    while (sumArray(coreSides) < coreConnections) {
        var side = rand(0, 3),
            con  = rand(0, 1);
        
        switch (side) {
        case 0:
            coreSides[0] += con;
            break;
        case 1:
            coreSides[1] += con;
            break;
        case 2:
            coreSides[2] += con;
            break;
        case 3:
            coreSides[3] += con;
            break;
        }
    }
    
    var i,
        pos,
        j;
    
    for (i = 0; i < coreSides.length; i++) {
        for (j = 0; j < coreSides[i]; j++) {
            pos = rand(0, size);
            switch (i) {
            case 0:
                core.roads.push({start: {x: pos, y: 0}, stop: {x: 0, y: 0}});
                break;
            case 1:
                core.roads.push({start: {x: size, y: pos}, stop: {x: 0, y: 0}});
                break;
            case 2:
                core.roads.push({start: {x: pos, y: size}, stop: {x: 0, y: 0}});
                break;
            case 3:
                core.roads.push({start: {x: 0, y: pos}, stop: {x: 0, y: 0}});
                break;
            }
        }
    }
    
    return core;
};

module.exports = createCentral;