var destination = null;

function hasArrived() {
    var tmp = distanceBetweenObj(tracker, center = {x: 0, y: 0});
    if (active && move &&  (Math.abs(tmp - dest) < 20)) {
        
        destination.kill();
        destination = null;
        enviroment.setAll('body.velocity.x', 0);
        enviroment.setAll('body.velocity.y', 0);        
        monster.setAll('body.velocity.x', 0);
        monster.setAll('body.velocity.y', 0);
        tracker.x = 0;
        tracker.y = 0;
        dest.x = 0;
        dest.y = 0;
        move = false;
    }

}

function movePlayer(pointer) {
    
    if (destination !== null) {
        destination.kill();
    }
    destination = enviroment.create(pointer.x, pointer.y, 'destination');
    
    move = true;
    
    tracker.x = 0;
    tracker.y = 0;
    
    enviroment.setAll('body.velocity.x', 0);
    enviroment.setAll('body.velocity.y', 0);
    
    monster.setAll('body.velocity.x', 0);
    monster.setAll('body.velocity.y', 0);
    
    var dx = Math.abs(pointer.x - player.x),
        dy = Math.abs(pointer.y - player.y),
        angle = Math.atan(dy / dx),
        vX = Math.abs(Math.cos(angle) * 300),
        vY = Math.abs(Math.sin(angle) * 300);
    
    dest = distanceBetweenObj(pointer, player);
    
    if (pointer.x > player.x) { 
        enviroment.setAll('body.velocity.x', -vX);
        monster.setAll('body.velocity.x', -vX);
    }else {
        enviroment.setAll('body.velocity.x', vX);
        monster.setAll('body.velocity.x', vX);
    }
   
    if (pointer.y > player.y) {
        enviroment.setAll('body.velocity.y', -vY);
        monster.setAll('body.velocity.y', -vY);
    } else {
        enviroment.setAll('body.velocity.y', vY);
        monster.setAll('body.velocity.y', vY);
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
