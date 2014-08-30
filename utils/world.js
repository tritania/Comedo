/*global module, exports, console*/
/*jslint plusplus: true */

function getRandomInt(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    
    if (depth > final) {
        return arr;
    }
    
    var size = arr.length,
        it = 0, //rows
        itt = 0, //columns
        fill = 1, //finds the elements that need to be filled
        spacer = 0, //defines where to place arr values
        tmp = array2d(size), //create tmp array for width expansion
        tmp2;// = array2d(depth + 3); //create tmp array for width expansion
    
    console.log(JSON.stringify(tmp2));
    
    //expand matrix's width
    for (it = 0; it < size; it++) {
        for (itt = 0; itt < size; itt++) {
            tmp[it][spacer] = arr[it][itt];
            spacer = spacer + 2;
        }
        spacer = 0;
    }
    
    console.log("Step One" + JSON.stringify(tmp));
    
    //fill matrix width
    for (it = 0; it < size; it++) {
        for (itt = 0; itt < size; itt++) {
            tmp[it][fill] = (tmp[it][fill - 1] + tmp[it][fill + 1]) / 2;
            fill = fill + 2;
        }
        fill = 1;
        tmp[it].splice(tmp[it].length - 1, 1);
    }
    
    console.log("Step Two" + JSON.stringify(tmp));
    
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
    
    console.log("Step Three" + JSON.stringify(tmp2));
    
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
    
    console.log("Step Four" + JSON.stringify(tmp2));
    
    //fill center
    for (it = 1; it < size; it++) { //start on second row as the center will be in the middle
        for (itt = 1; itt < size; itt++) { //itt starts at 1 to get the center
            tmp2[it][itt] = (tmp2[it - 1][itt] + tmp2[it + 1][itt] + tmp2[it][itt + 1] + tmp2[it][itt - 1]) / 4;
            itt++;
        }
        it++;
    }
    
    console.log("Step Five" + JSON.stringify(tmp2));
    
    depth++;
    
    diamondSquare(tmp2, depth, final);
}

exports.createCentral = function () { //once sent the player can keep the core chunk loaded and pass it any other players that join
    "use strict";
     
    var core; //core map chunk
    
    return core;
};

exports.getChunk = function (id, core) { //for use once the core chunk has been generated and the game has started
    "use strict";
    
};