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

function getTile(arr, x, y) {
    "use strict";
    var xmax = x + 1,
        xmin = x - 1,
        ymax = y + 1,
        ymin = y - 1;
    if (arr[x][y] === 'POI') {
        return false; //can't overwrite a building
    } else if (arr[x][y] === 'road') {
        return true; //if its a road its already valid
    } else if (xmin < 0 || ymin < 0) {
        return false; //check bounds of tile array
    } else if (arr[xmin][y] === 'road' && arr[xmin][ymin] === 'road' && arr[x][ymin]) { //zone checking begins
        return false;
    } else if (arr[x][ymin] === 'road' && arr[xmax][ymin] === 'road' && arr[xmax][y]) {
        return false;
    } else if (arr[x][ymax] === 'road' && arr[xmax][ymax] === 'road' && arr[xmax][y]) {
        return false;
    } else if (arr[x][ymax] === 'road' && arr[xmin][ymax] === 'road' && arr[x][ymax]) {
        return false;
    } else {
        return true;
    }
}

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
    var core,
        minlim = rand(2, 10), //min and max lim for POI generation
        maxlim = rand(11, 21),
        total = rand(minlim, maxlim),
        tiles = array2d(10), //creates all the tiles in the chunk
        i,
        j,
        x,
        y;
    
    for (i = 0; i < 10; i++) { //prevents the need for undefined checks
        for (i = 0; i < 10; i++) {
            tiles[i][j] = null;
        }
    }
    
    for (i = 0; i < total; i++) { //fills out the POI's
        x = rand(0, 9);
        y = rand(0, 9);
        
        if (tiles[x][y] === null) {
            tiles[x][y] = 'POI';
        } else {
            i--;
        }
    }
    
    return core;
};

exports.getChunk = function (id, core) { //for use once the core chunk has been generated and the game has started
    "use strict";
    
};