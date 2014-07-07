/*jslint node: true*/
/*global io, Phaser, preload, create, update*/
/*jslint plusplus: true */
"use strict";
 
var width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight,
    player,
    world,
    enemies = [],
    z,
    active = false,
    dest = {x: 150, y: 150}, //destination
    game;
    //keyinput = game.input.keyboard.createCursorKeys();

function createGame() {
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
}

function preload() {
    game.load.spritesheet('player', 'assets/player.png', 30, 45);
    game.load.spritesheet('zombie1', 'assets/zombie1.png', 30, 45);
    game.load.image('bush', 'assets/bush.png');
}
 
function create() {
    game.stage.backgroundColor = '#bbe6a7';
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    player = game.add.sprite(150, 150, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    
    
    
    game.input.onDown.add(movePlayer, this);
    
    world = game.add.group();
    world.enableBody = true;
    var testBush = world.create(20, 20, "bush");
    testBush.body.immovable = true;
    
    active = true;
    
    z = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}
 
function update() {
    game.physics.arcade.collide(player, world, colhandle);
    hasArrived();
    if (z.isDown) {
        var tmp = game.add.sprite(150, 150, 'zombie1');
        game.physics.arcade.enable(tmp);
        tmp.body.collideWorldBounds = true;
        enemies.push(tmp);
    }
    combat();
}

function combat() {
    var i,
        xe,
        ye,
        y = player.y,
        x = player.x,
        cr = 120;
    for (i = 0; i < enemies.length; i++) {
        xe = enemies[i].x;
        ye = enemies[i].y;
        if ((x >= (xe - cr) && x <= (xe + cr)) &&  (y >= (ye - cr) && y <= (ye + cr))) {
            console.log("combat started");
            moveEnemy({x: x, y: y}, i);
        }
    }
}

function colhandle() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
}

function hasArrived() {
    if (active &&
            (player.x >= dest.x - 10 && player.x <= dest.x + 10) &&
            (player.y >= dest.y - 10 && player.y <= dest.y + 10)
            ) {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
    }
}

function movePlayer(pointer) {
    
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    var x = pointer.x,
        y = pointer.y,
        dx = distanceBetween(x, player.x),
        dy = distanceBetween(y, player.y),
        angle = Math.atan(dy / dx),
        vX = Math.abs(Math.cos(angle) * 300),
        vY = Math.abs(Math.sin(angle) * 300);
    
    dest = {x: x, y: y};
    
    if (x > player.x) {
        player.body.velocity.x = vX;
    } else if (x === player.x) {
        player.body.velocity.x = 0;
    } else {
        player.body.velocity.x = -vX;
    }
   
    if (y > player.y) {
        player.body.velocity.y = vY;
    } else if (y === player.y) {
        player.body.velocity.xy = 0;
    } else {
        player.body.velocity.y = -vY;
    }
}

function moveEnemy(pointer, index) {
    console.log(pointer.x + ' ' + pointer.y + ' ' + index);
    var x = pointer.x,
        y = pointer.y,
        dx = distanceBetween(x, enemies[index].x),
        dy = distanceBetween(y, enemies[index].y),
        angle = Math.atan(dy / dx),
        vX = Math.abs(Math.cos(angle) * 200),
        vY = Math.abs(Math.sin(angle) * 200);
    
    if (x > enemies[index].x) {
        enemies[index].body.velocity.x = vX;
    } else if (x === enemies[index].x) {
        enemies[index].body.velocity.x = 0;
    } else {
        enemies[index].body.velocity.x = -vX;
    }
   
    if (y > enemies[index].y) {
        enemies[index].body.velocity.y = vY;
    } else if (y === enemies[index].y) {
        enemies[index].body.velocity.xy = 0;
    } else {
        enemies[index].body.velocity.y = -vY;
    }
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2 - point1, 2) + Math.pow(point2 - point1, 2));
}