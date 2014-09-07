var dest = {x: 0, y: 0},
    dest_e;

function hasArrived() {
    if (active &&
            (player.x >= dest.x - 10 && player.x <= dest.x + 10) &&
            (player.y >= dest.y - 10 && player.y <= dest.y + 10)
            ) {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        dest_e.destroy();
    }
}

function movePlayer(pointer) {
    
    console.log(pointer.x + " " + pointer.y);
    
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    var x = pointer.worldX,
        y = pointer.worldY,
        dx = distanceBetween(x, player.x),
        dy = distanceBetween(y, player.y),
        angle = Math.atan(dy / dx),
        vX = Math.abs(Math.cos(angle) * 300),
        vY = Math.abs(Math.sin(angle) * 300);
    
    dest = {x: x, y: y};
    dest_e = game.add.sprite(dest.x, dest.y, 'dest');
    
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
    
}function distanceBetweenObj(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
