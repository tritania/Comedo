/*jslint node: true*/
/*global io, createGame, width, height, game*/
/*jslint plusplus: true */
var socket = io.connect();

socket.on("map", function (data) {
    "use strict";
    var core = data;
    createGame(core);
    //never stops, probably why the disconnect
});

function getMap() {
    "use strict";
    socket.emit("getmap", {val: true}); //send all data
}

function getChunks() { //will send the chunk id's it needs for the player
    "use strict";
}
    


