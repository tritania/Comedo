/*jslint node: true*/
/*global Phaser, core, movePlayer, hasArrived*/
/*jslint plusplus: true */

/**
 * Stops the canvas from scrolling in browser
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
    fulcrum,
    fulcrump, //old fulcrum data
    viewer,
    tracker, //keeps track of the top leftmost tile
    player,
    active,
    activet = [], //viewable tiles should be a 2d array
    oactive= [],
    preloaded; //preloaded chunks


function round(num) {
    "use strict";
    while (num % 50 !== 0) {
        num++;
    }
    return num;
}

function tileRound(num) {
    "use strict";
    num = Math.ceil(num); //might need to round down
    while (num % 50 !== 0) {
        num--;
    }
    return num;
}


function getTile(x, y) {
    "use strict";
    var i,
          xp = x,
          yp = y;

    while (xp % 850 != 0) {
        xp = xp - 50;
    }

    while (yp % 850 != 0) {
        yp = yp - 50;
    }

    i = preloaded.length;
    while (i--) {
        if (preloaded[i].range.x == xp && preloaded[i].range.y == yp) {
            if (x > 0) {
                x = (x % 850) / 50;
            } else {
                x = Math.abs(x);
                x = 17 - ((x % 850) / 50);
            }

            if (y > 0) {
                y = (y % 850) / 50;
            } else {
                y = Math.abs(y);
                y = 17 - ((y % 850) / 50);
            }

            if (x == 17) {
                x = 0;
            }

            if (y == 17) {
                y = 0;
            }
            return preloaded[i].tiles[y][x];

        }
    }
}

//kills sprites that are no longer viewable, can improve performance by only running on player movement
function updateViewable() {
    "use strict";

    var tmp, //new viewable tiles
        tmp2,
        i,
        j,
        k;

    fulcrum = {
        x: tileRound(tracker.worldX),
        y: tileRound(tracker.worldY)
    };

    //only redraw the tiles if its needed.
    if (fulcrum.x != fulcrump.x || fulcrum.y != fulcrump.y) {
        for (i = 0; i < tiles.y; i++) {
            for (j = 0; j < tiles.x; j++) {
                tmp = getTile( (fulcrum.x + (j * 50)), (fulcrum.y + (i * 50)) );
                tmp2 = game.add.sprite( (fulcrum.x + (j * 50)), (fulcrum.y + (i * 50)), 'test1');
                activet.push(tmp2);
            }
        }
        k = oactive.length;
        while(k--) {
            oactive[k].destroy();
        }

        oactive = activet;
        activet = [];
    }



    fulcrump = fulcrum;

}

function preload() {
    "use strict";
    game.load.spritesheet('player', 'assets/player.png', 30, 45);
    game.load.spritesheet('dest', 'assets/destination.png', 15, 15);
    game.load.spritesheet('test1', 'assets/test1.png', 50, 50);
    game.load.spritesheet('test2', 'assets/test2.png', 50, 50);
    game.load.spritesheet('test3', 'assets/test3.png', 50, 50);
    game.load.spritesheet('test4', 'assets/test4.png', 50, 50);
    game.load.spritesheet('test5', 'assets/test5.png', 50, 50);
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

    //setup the fulcrum tracker
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
    //player pos debug info
    game.debug.spriteCoords(player, 32, height - 100);
}

/**
 * Creates the html5 canvas
 * @param {Object} core The first chunks of the map.
 */
function createGame(core) {
    "use strict";
    preloaded = core;

    fulcrump = {
        x: 0,
        y: 0
    };

    tiles = {
        x: (round(width) / 50),
        y: (round(height) / 50)
    };

    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, false, false);
}
