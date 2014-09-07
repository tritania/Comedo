/*jslint node: true*/
/*global Phaser, core,*/
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
    player,
    active, //viewable tiles should be a 2d array
    preloaded = []; //preloaded chunks


//kills sprites that are no longer viewable
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
    
    updateViewable(); //call update viewable to make sure the correct tiles are seen on load
}
 
function create() {
    "use strict";
    
    game.world.setBounds(0, 0, 10000, 10000);
    //set up the canvas
    game.stage.backgroundColor = '#bbe6a7';
    game.physics.startSystem(Phaser.Physics.P2JS);
    
    //player movement accross all devices
    game.input.onDown.add(movePlayer, this);
    
    //load the player and push to players array
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    
    game.physics.p2.enable(player);
    player.body.collideWorldBounds = false;
    //players.push(tmp_player);
    
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    game.camera.bounds = null;
    
    active = true;
    
    game.stage.smoothed = true;
}
 
function update() {
    "use strict";
    updateViewable();
    hasArrived();
}

function render() {
    //game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, height - 100);
}

function round(num) {
    "use strict";
    while (num % 50 !== 0) {
        num++;
    }
    return num;
}

function getMapData() {
    "use strict";
    
    //generate canvas size;
    var c_width = round(width),
        c_height = round(height);
    
    tiles = { //need to subtract
        x: width / 50,
        y: height / 50
    };
    
    var request = {
        x1: 0,
        x2: tiles.x,
        y1: 0,
        y2: tiles.y
    };
    
    
    getMap(); //send data
}

/**
 * Creates the html5 canvas 
 * @param {Object} core The first chunk of the map.
 */
function createGame(core) {
    "use strict";
    preloaded.push(core);
    
    console.log("test");
    
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, false, false);
}

