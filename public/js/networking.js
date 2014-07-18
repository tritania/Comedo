/*jslint node: true*/
/*global io, createGame, width, height, game*/
/*jslint plusplus: true */
var socket = io.connect();
var centerMap;

socket.on("map", function (data) {
    "use strict";
    centerMap = data;
    createGame();
});


socket.on("player_join", function (data) {
    "use strict";
    var tmp;
    tmp = game.add.sprite(width / 2, height / 2, 'player');
    game.physics.arcade.enable(tmp);
    tmp.body.immovable = true;
});

socket.on("player_move", function (data) {
    "use strict";
});

socket.on("join_result", function (data) { //data will either be false or will be the map
    "use strict";
});

socket.on("player_interact", function (data) {
    "use strict";
});

socket.on("player_leave", function (data) {
    "use strict";
});

socket.on("player_prejoin", function (data) {
    "use strict";
    socket.emit("coremap", centerMap);
});

function getMap() {
    "use strict";
    socket.emit("getmap", {val: true});
}

function getChunks() { //will send the chunk id's it needs for the player
    "use strict";
}

function joinGame() {
    "use strict";
    var id = document.getElementById("gid").value;
    socket.emit("join_request", id);
}
    


