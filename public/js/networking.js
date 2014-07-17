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

socket.on("player_interact", function (data) {
    "use strict";
});

function getMap() {
    "use strict";
    socket.emit("getmap", {val: true});
}

