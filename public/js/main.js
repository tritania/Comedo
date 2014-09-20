/*jslint node: true*/
/*global Phaser, core, movePlayer, hasArrived*/
/*jslint plusplus: true */

/**
 * Stops the canvas from scrolling in other browsers
 */
window.addEventListener("keydown", function (e) {
    "use strict";
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

var width = document.documentElement.clientWidth,
    height = window.innerHeight,
    game,
    active,
    tiles,
    fulcrum,
    viewer,
    tracker, //keeps track of the top leftmost tile
    player,
    active, //viewable tiles should be a 2d array
    preloaded; //preloaded chunks


function round(num) {
    "use strict";
    num = Math.ceil(num);
    while (num % 50 !== 0) {
        if (num > 0) {
            num++;
        } else {
            num--;
        }
    }
    return num;
}

function tileRound(num) {
    "use strict";
    while (num % 50 !== 0) {
            num--;
    }
    return num;
}


function getTile(x, y) {
    "use strict";
    
}

//kills sprites that are no longer viewable can improve performance by only running on player movement
function updateViewable() {
    "use strict";

}

function preload() {
    "use strict";
    game.load.spritesheet('player', 'assets/player.png', 30, 45);
    game.load.spritesheet('dest', 'assets/destination.png', 15, 15);
    game.load.spritesheet('test1', 'assets/test1.png', 30, 45);
    game.load.spritesheet('test2', 'assets/test2.png', 30, 45);
    game.load.spritesheet('test3', 'assets/test3.png', 30, 45);
    game.load.spritesheet('test4', 'assets/test4.png', 30, 45);
    game.load.spritesheet('test5', 'assets/test5.png', 30, 45);
}

function create() {
    "use strict";

    //game.world.setBounds(-10000, -10000, 10000, 10000);
    //set up the canvas
    game.stage.backgroundColor = '#bbe6a7';
    game.physics.startSystem(Phaser.Physics.P2JS);

    //player movement accross all devices
    game.input.onDown.add(movePlayer, this);

    //load the player and push to players array
    player = game.add.sprite(0, 0, 'player');

    game.physics.p2.enable(player);
    player.body.collideWorldBounds = false;
    //players.push(tmp_player);

    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    game.camera.bounds = null;

    active = true;

    game.stage.smoothed = true;

    tracker = new Phaser.Pointer(game, 37);
    tracker.clientX = 0;
    tracker.clientY = 0;
}

function update() {
    "use strict";
    updateViewable();
    hasArrived();
}

function render() {
    "use strict";
    //game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, height - 100);
}

/**
 * Creates the html5 canvas
 * @param {Object} core The first chunks of the map.
 */
function createGame(core) {
    "use strict";
    preloaded = core;

    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, false, false);
}
