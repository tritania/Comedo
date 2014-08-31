/*jslint node: true*/
/*global Phaser, core*/
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
    players = [],
    active = [], //viewable tiles
    preloaded = []; //preloaded chunks

function preload() {
    "use strict";
    game.load.spritesheet('player', 'assets/player.png', 30, 45);
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
    game.physics.arcade.enable(tmp_player);
    players.push(tmp_player);
}
 
function update() {
    "use strict";
   
}

/**
 * Creates the html5 canvas 
 * @param {Object} core The first chunk of the map.
 */
function createGame(core) {
    "use strict";
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
}

