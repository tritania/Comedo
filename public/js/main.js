window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
 
var width = document.documentElement.clientWidth,
    height = window.innerHeight,
    player,
    world,
    enviroment,
    enemies = [],
    hostiles = [],
    monster,
    z,
    p,
    tracker,
    move = false,
    active = false,
    dest = {x: 0, y: 0}, //destination
    game;
    //keyinput = game.input.keyboard.createCursorKeys();

function createGame() {
    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
}

function preload() {
    game.load.spritesheet('player', 'assets/player.png', 30, 45);
    game.load.spritesheet('zombie1', 'assets/zombie1.png', 30, 45);
    game.load.image('road', 'assets/road.png');
    game.load.image('tracker', 'assets/tracker.png');
    game.load.image('destination', 'assets/destination.png');
}
 
function create() {
    game.stage.backgroundColor = '#bbe6a7';
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.input.onDown.add(movePlayer, this);
    
    enviroment = game.add.group();
    enviroment.enableBody = true;
    
    var i,
        multiple = 275,
        road,
        x,
        y;
        
    tracker = enviroment.create(0, 0, 'tracker');
        
    for (i = 0; i < centerMap.tiles.length; i++) {
        x = (i % 10);
        if (x === 0) {
            y = i;
        } else {
            y = ((i - x) / 10);
        }
        x = x * multiple;
        y = y * multiple;
        
        switch (centerMap.tiles[i].type) {
        
        case 'road':
            road = enviroment.create(x, y, centerMap.tiles[i].type);
            break;
        default:
            break;

        }
    }
    
    monster = game.add.group();
    monster.enableBody = true;
    
    player = game.add.sprite(width / 2, height / 2, 'player');
    game.physics.arcade.enable(player);
    
    active = true;
    
    z = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    p = game.input.keyboard.addKey(Phaser.Keyboard.P);
    
    game.physics.arcade.overlap(player, enviroment, tileTracker, null, this);
}
 
function update() {
    //game.physics.arcade.collide(player, world, colhandle); commented out until the world group is added to terrain generation.
    game.physics.arcade.collide(player, monster, comhandle);
    hasArrived();
    if (z.isDown) {
        var tmp = monster.create(150, 150, 'zombie1');
        game.physics.arcade.enable(tmp);
        enemies.push(tmp);
    }
    if (p.isDown) {
        if (game.paused === true) {
            game.paused = false;
        } else {
            game.paused = true;
        }
        
    }
    combatStart();
    combat();
}

function combat() {
    var i;
    for (i = 0; i < hostiles.length; i++) {
        if (distanceBetweenObj(player, hostiles[i].sprite) > 500) {
            hostiles.splice(i, i - 1);
        } else {
            moveEnemy(player, enemies[hostiles[i].index]);
        }
    }
}

function combatStart() {
    var i,
        cr = 220;
    for (i = 0; i < enemies.length; i++) {
        if (distanceBetweenObj(enemies[i], player) < cr) {
            console.log("combat");
            hostiles.push({sprite: enemies[i], index: i});
            moveEnemy(player, enemies[i]);
        }
    }
}

function colhandle() {
    enviroment.setAll('body.velocity.x', 0);
    enviroment.setAll('body.velocity.y', 0);
}

function comhandle() {
    enviroment.setAll('body.velocity.x', 0);
    enviroment.setAll('body.velocity.y', 0);
}

function tileTracker(player, tile) {
  //use to keep track of current chunk tile.
}

