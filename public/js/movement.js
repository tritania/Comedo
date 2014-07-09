function hasArrived() {
    if (active &&
            (Math.abs(tracker.x) >= dest.x - 10 && Math.abs(tracker.x) <= dest.x + 10) &&
            (Math.abs(tracker.y) >= dest.y - 10 && Math.abs(tracker.y) <= dest.y + 10)
            ) {
        enviroment.setAll('body.velocity.x', 0);
        enviroment.setAll('body.velocity.y', 0);
        tracker.x = 0;
        tracker.y = 0;
    }
}

function movePlayer(pointer) {
    
    tracker.x = 0;
    tracker.y = 0;
    
    enviroment.setAll('body.velocity.x', 0);
    enviroment.setAll('body.velocity.y', 0);
    
    var x = pointer.x,
        y = pointer.y,
        dx = distanceBetween(x, player.x),
        dy = distanceBetween(y, player.y),
        angle = Math.atan(dy / dx),
        vX = Math.abs(Math.cos(angle) * 300),
        vY = Math.abs(Math.sin(angle) * 300);
    
    dest = {x: dx, y: dy};
    
    if (x > player.x) {
        enviroment.setAll('body.velocity.x', -vX);
    } else if (x === player.x) {
        enviroment.setAll('body.velocity.x', 0);
    } else {
        enviroment.setAll('body.velocity.x', vX);
    }
   
    if (y > player.y) {
        enviroment.setAll('body.velocity.y', -vY);
    } else if (y === player.y) {
        enviroment.setAll('body.velocity.y', 0);
    } else {
        enviroment.setAll('body.velocity.y', vY);
    }
}

function moveEnemy(pointer, index) {
    var x = pointer.x,
        y = pointer.y,
        dx = distanceBetween(x, enemies[index].x),
        dy = distanceBetween(y, enemies[index].y),
        angle = Math.atan(dy / dx),
        vX = Math.abs(Math.cos(angle) * 125),
        vY = Math.abs(Math.sin(angle) * 125);
    
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
        enemies[index].body.velocity.y = 0;
    } else {
        enemies[index].body.velocity.y = -vY;
    }
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2 - point1, 2) + Math.pow(point2 - point1, 2));
    
}function distanceBetweenObj(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
