/*jslint node: true*/
/*global io, Phaser, preload, create, update*/
/*jslint plusplus: true */
"use strict";
 
var width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight,
    player,
    world,
    enviroment,
    enemies = [],
    hostiles = [],
    monster,
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
    game.load.image('road', 'assets/road.png');
}
 
function create() {
    game.stage.backgroundColor = '#bbe6a7';
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.input.onDown.add(movePlayer, this);
    
    world = game.add.group();
    enviroment = game.add.group();
    world.enableBody = true;
/*    var testBush = world.create(20, 20, "bush");
    testBush.body.immovable = true;*/
    
    var i,
        j,
        mutliple = 275,
        road;
    for (i = 0; i < centerMap.roads.length; i++) {
        road = game.add.tileSprite(centerMap.roads[i].start.x, centerMap.roads[i].start.y, centerMap.roads[i].size.width, centerMap.roads[i].size.height, "road");
    }
    
    monster = game.add.group();
    monster.enableBody = true;
    
    player = game.add.sprite(150, 150, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    
    //currently for testing
    var tmp = monster.create(150, 150, 'zombie1');
    game.physics.arcade.enable(tmp);
    tmp.body.collideWorldBounds = true;
    tmp.bringToTop();
    enemies.push(tmp);
    
    active = true;
    
    z = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}
 
function update() {
    game.physics.arcade.collide(player, world, colhandle);
    game.physics.arcade.collide(player, monster, comhandle);
    hasArrived();
    if (z.isDown) {
        var tmp = monster.create(150, 150, 'zombie1');
        game.physics.arcade.enable(tmp);
        tmp.body.collideWorldBounds = true;
        enemies.push(tmp);
    }
    combatStart();
    combat();
}

function combat() {
    var i;
    for (i = 0; i < hostiles.length; i++) {
        if (distanceBetweenObj(player, hostiles[i].sprite) > 500) {
            console.log("end combat");
            hostiles[i].sprite.body.velocity.x = 0;
            hostiles[i].sprite.body.velocity.y = 0;
            hostiles.splice(i, i - 1);
        } else {
        moveEnemy({x: player.x, y: player.y}, hostiles[i].index);
        }
    }
}

function combatStart() {
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
            hostiles.push({sprite: enemies[i], index: i});
            moveEnemy({x: x, y: y}, i);
        }
    }
}

function colhandle() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
}

function comhandle() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
}

