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
    seed,
    need = [], //chunks to get from the server
    need_tracker, //keeps track of the four corners of the chunks
    fulcrum,
    fulcrump, //old fulcrum data
    viewer,
    tracker, //keeps track of the top leftmost tile
    player,
    active,
    activet = [], //viewable tiles should be a 2d array
    oactive = [],
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
    num = ~~num; //might need to round down
    while (num % 50 != 0) {
        num--;
    }
    return num;
}

function updateChunks() {
    "use strict";
    var i = preloaded.length,
          j,
          k,
          xp = player.x,
          yp = player.y,
          tmp; //tmp range storage
    while (i--) {
        if (Math.abs(preloaded[i].range.x - player.x) > 2550) {
            preloaded.splice(i, 1);
        } else if (Math.abs(preloaded[i].range.y - player.y) > 2550) {
            preloaded.splice(i, 1);
        }
    }

    if (Math.abs(need_tracker.TL.y - yp) < 850) {
        //get more chunks on top
        k = need_tracker.TL.y - 850;
        for (j = 0; j < 5; j++) {
            tmp = {
                x: (need_tracker.TL.x + (j * 850)),
                y: k
            };
        need.push(tmp);
        }
        need_tracker.TL.y = need_tracker.TL.y - 850;
        need_tracker.TR.y = need_tracker.TR.y - 850;
        need_tracker.BL.y = need_tracker.BL.y - 850;
        need_tracker.BR.y = need_tracker.BR.y - 850;
        downChunk(need);
        need = [];
    }

    if (Math.abs(need_tracker.BL.y - yp) < 850) {
        //get more chunks on top
        k = need_tracker.BL.y + 850;
        for (j = 0; j < 5; j++) {
            tmp = {
                x: (need_tracker.TL.x + (j * 850)),
                y: k
            };
        need.push(tmp);
        }
        need_tracker.TL.y = need_tracker.TL.y + 850;
        need_tracker.TR.y = need_tracker.TR.y + 850;
        need_tracker.BL.y = need_tracker.BL.y + 850;
        need_tracker.BR.y = need_tracker.BR.y + 850;
        downChunk(need);
        need = [];
    }

    if (Math.abs(need_tracker.TL.x - xp) < 850) {
        //get more chunks on top
        k = need_tracker.TL.x - 850;
        for (j = 0; j < 5; j++) {
            tmp = {
                x: k,
                y: (need_tracker.TL.y + (j * 850))
            };
        need.push(tmp);
        }
        need_tracker.TL.x = need_tracker.TL.x - 850;
        need_tracker.TR.x = need_tracker.TR.x - 850;
        need_tracker.BL.x = need_tracker.BL.x - 850;
        need_tracker.BR.x = need_tracker.BR.x - 850;
        downChunk(need);
        need = [];
    }


    if (Math.abs(need_tracker.TR.x - xp) < 850) {
        //get more chunks on top
        k = need_tracker.TR.x + 850;
        for (j = 0; j < 5; j++) {
            tmp = {
                x: k,
                y: (need_tracker.TL.y + (j * 850))
            };
        need.push(tmp);
        }
        need_tracker.TL.x = need_tracker.TL.x + 850;
        need_tracker.TR.x = need_tracker.TR.x + 850;
        need_tracker.BL.x = need_tracker.BL.x + 850;
        need_tracker.BR.x = need_tracker.BR.x + 850;
        downChunk(need);
        need =[];
    }

}

function getTile(x, y) {
    "use strict";
    var i,
          c_range,
          xp = x,
          yp = y;


    // if (xp > 0) {
    //     xp = Math.ceil(xp/850) * 850;
    // } else {
    //     xp = Math.floor(xp/850) * 850;
    // }
    //
    // if (yp > 0) {
    //     yp = Math.ceil(yp/850) * 850;
    // } else {
    //     yp = Math.floor(yp/850) * 850;
    // }

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

            return preloaded[i].tiles[y][x].type;
        }
    }
}


//kills sprites that are no longer viewable, can improve performance by only running on player movement
function updateViewable() {
    "use strict";

    fulcrum = { //get the new tile viewport
        x: tileRound(tracker.worldX),
        y: tileRound(tracker.worldY)
    };

    //only redraw the tiles if its needed.
    if (fulcrum.x != fulcrump.x || fulcrum.y != fulcrump.y) {
        var i = tiles.y,
              j,
              k,
              tmp,
              x,
              y;

        while (i--) {
            j = tiles.x;
            while (j--) {
                x = fulcrum.x + (j * 50);
                y =  fulcrum.y + (i * 50);
                tmp = game.add.sprite(x, y, getTile(x, y));
                activet.push(tmp);
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
    game.load.spritesheet('1', 'assets/test1.png', 50, 50);
    game.load.spritesheet('2', 'assets/test2.png', 50, 50);
    game.load.spritesheet('3', 'assets/test3.png', 50, 50);
    game.load.spritesheet('4', 'assets/test4.png', 50, 50);
    game.load.spritesheet('5', 'assets/test5.png', 50, 50);
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

    var i = tiles.y,
          j,
          x,
          tmp,
          y;

    for (i = 0; i < tiles.y; i++) {
        for (j = 0; j < tiles.x; j++) {
            x = (j * 50);
            y =  (i * 50);
            tmp = game.add.sprite(x, y, getTile(x, y));
            activet.push(tmp);
        }
    }

    fulcrump = {
        x: tileRound(tracker.worldX),
        y: tileRound(tracker.worldY)
    };

}

function update() {
    "use strict";
    updateViewable();
    hasArrived();
    updateChunks();
    player.bringToTop();
}

/**
 * Creates the html5 canvas
 * @param {Object} core The first chunks of the map.
 */
function createGame(core) {
    "use strict";
    preloaded = core;

    need_tracker = {
        TL: {
            x: core[1].range.x,
            y: core[1].range.y
        },
        BR: {
            x: core[24].range.x,
            y: core[24].range.y
        },
        BL: {
            x: core[5].range.x,
            y: core[5].range.y
        },
        TR: {
            x: core[20].range.x,
            y: core[20].range.y
        }
    };

    tiles = {
        x: (round(width) / 50) + 1,
        y: (round(height) / 50) + 1
    };

    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update,  }, false, false);
}
