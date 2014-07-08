/*global module*/
/*jslint plusplus: true */

function getTile(direction, index) { //false means the tile does not exist in this chunk
    "use strict";
    switch (direction) {
    case 'NORTH':
        if (index < 10) {
            return false;
        } else {
            return index - 10;
        }
    case 'SOUTH':
        if (index > 89) {
            return false;
        } else {
            return index + 10;
        }
    case 'EAST':
        if ((index + 1) % 10 === 0) {
            return false;
        } else {
            return index + 1;
        }
    case 'WEST':
        if (index % 10 === 0) {
            return false;
        } else {
            return index - 1;
        }
    }
}

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
    var coreConnections,
        core = {
            id: 1,
            tiles: new Array(100)
        },
        coreSides = Array.apply(null, new Array(4)).map(Number.prototype.valueOf, 0), //0 north, 1 South, 2 East, 3 West
        north = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        south = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
        east = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],
        west = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    
    coreConnections = rand(3, 6);
    
    while (sumArray(coreSides) < coreConnections) {
        var side = rand(0, 4),
            con  = rand(0, 2);
        
        coreSides[side] += con;
    }
    
    var i,
        pos,
        j,
        k,
        length;
    
    for (i = 0; i < core.tiles.length; i++) {
        core.tiles[i] = {type: 'grass'};
    }
    
    for (i = 0; i < coreSides.length; i++) {
        for (j = 0; j < coreSides[i]; j++) {
            pos = rand(0, 9);
            switch (i) {
            case 0:
                core.tiles[north[pos]] = {
                    type: 'road',
                    orientation: 'v',
                    subtype: 'none',
                    direction: 'SOUTH'
                };
                break;
            case 1:
                core.tiles[south[pos]] = {
                    type: 'road',
                    orientation: 'v',
                    subtype: 'none',
                    direction: 'NORTH'
                };
                break;
            case 2:
                core.tiles[east[pos]]  = {
                    type: 'road',
                    orientation: 'h',
                    subtype: 'none',
                    direction: 'WEST'
                };
                break;
            case 3:
                core.tiles[west[pos]]  = {
                    type: 'road',
                    orientation: 'h',
                    subtype: 'none',
                    direction: 'EAST'
                };
                break;
            }
        }
    }
    
    for (i = 0; i < core.tiles.length; i++) {
        if (core.tiles[i].type === 'road') {
            j = i;
            while (getTile(core.tiles[j].direction, j) !== false) {
                k = getTile(core.tiles[j].direction, j);
                core.tiles[k] = {
                    type: 'road',
                    orientation: core.tiles[j].orientation,
                    subtype: 'none',
                    direction: core.tiles[j].direction
                };
                j = k;
            }
        }
    }
    
    return core;
};