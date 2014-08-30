/*global module, exports, console*/
/*jslint plusplus: true */

function seed() {
    "use strict";
    var seeds = [],
        x,
        i,
        tmp,
        val;
    
    for (i = 0; i < 4; i++) {
        val = Math.random() * 1111;
        tmp = Math.sin(val++) * 10000;
        tmp = (tmp - Math.floor(tmp)) * 100;
        seeds.push(tmp);
    }
    
    return seeds;
}

function array2d(rows) {
    "use strict";
    var arr = new Array(rows),
        i;
    for (i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}
    
function diamondSquare(arr, depth, final) { //first depth is always 0
    "use strict"; //do it by expanding grids
        
    var size = arr.length,
        it = 0, //rows
        itt = 0, //columns
        fill = 1, //finds the elements that need to be filled
        spacer = 0, //defines where to place arr values
        tmp = array2d(size), //create tmp array for width expansion
        tmp2;// = array2d(depth + 3); //create tmp array for width expansion
    
    //expand matrix's width
    for (it = 0; it < size; it++) {
        for (itt = 0; itt < size; itt++) {
            tmp[it][spacer] = arr[it][itt];
            spacer = spacer + 2;
        }
        spacer = 0;
    }
    
    
    //fill matrix width
    for (it = 0; it < size; it++) {
        for (itt = 0; itt < size; itt++) {
            tmp[it][fill] = (tmp[it][fill - 1] + tmp[it][fill + 1]) / 2;
            fill = fill + 2;
        }
        fill = 1;
        tmp[it].splice(tmp[it].length - 1, 1);
    }
    
    
    //expand matrix height
    tmp2 = array2d(tmp[0].length);
    spacer = 0;
    size = tmp.length;
    for (it = 0; it < size; it++) {
        for (itt = 0; itt < tmp[0].length; itt++) {
            tmp2[spacer][itt] = tmp[it][itt];
        }
        spacer = spacer + 2;
    }
    
    
    //fill sides
    fill = 0;
    size = tmp2.length;
    for (it = 1; it < size; it++) { //start on second row as the first will be full
        for (itt = 0; itt < size; itt++) {
            tmp2[it][itt] = (tmp2[it - 1][itt] + tmp2[it + 1][itt]) / 2;
            itt++;
        }
        it++;
    }
    
    
    //fill center
    for (it = 1; it < size; it++) { //start on second row as the center will be in the middle
        for (itt = 1; itt < size; itt++) { //itt starts at 1 to get the center
            tmp2[it][itt] = (tmp2[it - 1][itt] + tmp2[it + 1][itt] + tmp2[it][itt + 1] + tmp2[it][itt - 1]) / 4;
            itt++;
        }
        it++;
    }
    
    if (depth === final) {
        return tmp2;
    } else {
        depth++;
        return diamondSquare(tmp2, depth, final);
    }
}

exports.createCentral = function () { //once sent the player can keep the core chunk loaded and pass it any other players that join
    "use strict";
    
    var seeds = seed(),
        preCore = array2d(2),
        core;  //core map chunk
    
    preCore = [[seeds[0], seeds[1]], [seeds[2], seeds[3]]];
    
    core = diamondSquare(preCore, 0, 3);
    
    return core;
};

exports.getChunk = function (id, core) { //for use once the core chunk has been generated and the game has started
    "use strict";
    
};