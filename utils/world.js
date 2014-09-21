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

function reseed(seed) {
    var seeds = [];

    for (i = 0; i < 4; i++) {
        seed[i] = Math.random() * 1111;
        tmp = Math.sin(seed[i]++) * 10000;
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

function typer(chunk) {
    "use strict";
    var i,
          k,
          tmp;

    for (i = 0; i < chunk.length; i++) {
        for (k = 0; k < chunk[i].length; k++) {
            tmp = {
                type: null,
                active: false
            };
            if (chunk[i][k] < 20) {
                tmp.type = '1';
            } else if (chunk[i][k] < 40) {
                tmp.type = '2';
            } else if (chunk[i][k] < 60) {
                tmp.type = '3';
            } else if (chunk[i][k] < 80) {
                tmp.type = '4';
            } else  {
                tmp.type = '5';
            }

            chunk[i][k] = tmp;

        }
    }
    return chunk;
}

function diamondSquare(arr, depth, final) { //first depth is always 0
    "use strict";

    var size = arr.length,
        posttyped,
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

exports.getChunks = function (range, core) {
    "use strict";
    var i,
          chunks = [];

    for (i = 0; i < range.length; i++) {
        var tmp = {
            x: range[i].x,
            y: range[i].y
        };

        var chunk = {
            range: {
                x: range[i].x,
                y: range[i].y
            },
            tiles: getChunk(tmp, core),
        };
        chunks.push(chunk);
    }
    return chunks;
}

/**
 * @param range Range of the chunk being requested
 * @param core Core seeds
 * @return {Object} Requested Chunk
 */
function getChunk(range, core) {
    "use strict";
    var chunk,//coords of core chunk
        post,
        seeds,
        reseeds,
        h = range.x / 850, //horizontal chunks from core
        v = range.y / 850, //vertical chunks from core
        tmp = [0, 1, 2, 3],
        i;

    for (i = 0; i < Math.abs(h); i++) {
        if (h > 0) {
            tmp[0] = core[1];
            tmp[2] = core[3];
            tmp[1] = ((core[0] + core[1]) / 2);
            tmp[3] = ((core[2] + core[3]) / 2);
            //expanding right of core
        } else {
            tmp[1] = core[0];
            tmp[3] = core[2];
            tmp[1] = ((core[0] + core[1]) / 2);
            tmp[3] = ((core[2] + core[3]) / 2);
            //expanding left of core
        }
        core = tmp.slice(0);
    }

    for (i = 0; i < Math.abs(v); i++) {
        if (v > 0) {
            tmp[0] = core[2];
            tmp[1] = core[3];
            tmp[2] = ((core[0] + core[2]) / 2);
            tmp[3] = ((core[1] + core[3]) / 2);
            //expanding south of core
        } else {
            tmp[2] = core[0];
            tmp[3] = core[1];
            tmp[0] = ((core[0] + core[2]) / 2);
            tmp[1] = ((core[1] + core[3]) / 2);
            //expanding north of core
        }
        core = tmp.slice(0);
    }

    reseeds = reseed(core);
    seeds = [[reseeds[0], reseeds[1]], [reseeds[2], reseeds[3]]];
    chunk = diamondSquare(seeds, 0, 3);
    chunk = typer(chunk);

    return chunk;
}


exports.createCentral = function () { //once sent the player can keep the core chunk loaded and pass it any other players that join
    "use strict";

    var seeds = seed(),
        data,
        i,
        j,
        tmp,
        tmp_chunk,
        preCore = array2d(2),
        postDS,
        primeC = [], //the first 25 chunks
        core;  //core map chunk

    preCore = [[seeds[0], seeds[1]], [seeds[2], seeds[3]]];

    postDS = diamondSquare(preCore, 0, 3);
    postDS = typer(postDS);

    core = {
        range: {
            x: 0,
            y: 0
        },
        tiles: postDS,
    };

    primeC.push(core);

    for (i = -2; i < 3; i++) {
        for (j = -2; j < 3; j++) {
            tmp = {
                x: i * 850,
                y: j * 850
            };

            if (tmp.x === 0 && tmp.y === 0) {
                //do nothing as chunk has already been generated
            } else {
                tmp_chunk = {
                    range: {
                        x: tmp.x,
                        y: tmp.y
                    },
                    tiles: getChunk(tmp, seeds),
                };
                primeC.push(tmp_chunk);
            }
        }
    }

    data = {
        map: primeC,
        core: seeds
    };

    return data;
};
