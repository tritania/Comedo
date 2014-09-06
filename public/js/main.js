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
    tiles,
    players = [],
    active, //viewable tiles should be a 2d array
    preloaded = []; //preloaded chunks


//kills sprites that are no longer viewable
function updateViewable() {
    "use strict";
    

}

function preload() {
    "use strict";
    game.load.spritesheet('player', 'assets/player.png', 30, 45);
    game.load.spritesheet('test1', 'assets/test1.png', 30, 45);
    game.load.spritesheet('test2', 'assets/test2.png', 30, 45);
    game.load.spritesheet('test3', 'assets/test3.png', 30, 45);
    game.load.spritesheet('test4', 'assets/test4.png', 30, 45);
    game.load.spritesheet('test5', 'assets/test5.png', 30, 45);
    
    updateViewable(); //call update viewable to make sure the correct tiles are seen on load
}
 
function create() {
    "use strict";
    //set up the canvas
    var tmp_player;
    game.stage.backgroundColor = '#bbe6a7';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //player movement accross all devices
    game.input.onDown.add(movePlayer, this);
    
    //load the player and push to players array
    tmp_player = game.add.sprite(width / 2, height / 2, 'player');
    
    game.camera.focusOnXY(tmp_player.x, tmp_player.y);
    
    game.physics.arcade.enable(tmp_player);
    players.push(tmp_player);
}
 
function update() {
    "use strict";
    updateViewable();
}

function round(num) {
    "use strict";
    while (num % 50 !== 0) {
        num++;
    }
    num = num + 50;
    return num;
}

function getMapData() {
    "use strict";
    
    //generate canvas size;
    width = round(width);
    height = round(height);
    
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
    
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
}

