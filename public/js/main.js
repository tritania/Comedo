/*jslint node: true*/
/*global io, Phaser, preload, create, update*/
/*jslint plusplus: true */
"use strict";
 
var width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight,
    player,
    world,
    active = false,
    dest = {x: 150, y: 150}, //destination
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    //keyinput = game.input.keyboard.createCursorKeys();

function preload() {
    game.load.spritesheet('player', 'assets/player.png', 30, 45);
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
}
 
function update() {
    game.physics.arcade.collide(player, world);
    hasArrived();
}

function hasArrived() {
    if (active &&
            (player.x >= dest.x - 10 && player.x <= dest.x + 10) &&
            (player.y >= dest.y - 10 && player.y <= dest.y + 10)
            ) {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        console.log("arrived!");
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
    console.log(x + ' ' + player.x + ' ' + y + ' ' + player.y);
    console.log(dx + ' ' + dy + ' ' + angle);
    
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

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2 - point1, 2) + Math.pow(point2 - point1, 2));
}