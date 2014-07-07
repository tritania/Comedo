/*jslint node: true*/
/*global io*/
/*jslint plusplus: true */
var socket = io.connect();

socket.on("map", function (data) {
    "use strict";
    console.log("map!");
    console.log(JSON.stringify(data));
});

function getMap() {
    "use strict";
    socket.emit("getmap", {val: true});
}

