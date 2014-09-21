/*jslint node: true*/
/*global io, createGame, width, height, game*/
/*jslint plusplus: true */
var socket = io.connect();

socket.on("map", function (data) {
    "use strict";
    var core = data.map;
    seed = data.core;
    createGame(core);
});

socket.on("chunk", function (data) {
    "use strict";
    console.log(JSON.stringify(data));

    var i = data.length;
    while (i--) {
        preloaded.push(data[i]);
    }
});

function getMap() {
    "use strict";
    socket.emit("getmap", {val: true}); //send all data
}

function downChunk(ranges) { //will send the chunk id's it needs for the player
    "use strict";
    var tmp = {
        ranges: ranges,
        seed: seed
    }
    socket.emit("getchunk", tmp);
}
