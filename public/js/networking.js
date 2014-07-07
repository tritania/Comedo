/*jslint node: true*/
/*global io*/
/*jslint plusplus: true */
var socket = io.connect();
var centerMap;

socket.on("map", function (data) {
    "use strict";
    centerMap = data;
    createGame();
});

function getMap() {
    "use strict";
    socket.emit("getmap", {val: true});
}

