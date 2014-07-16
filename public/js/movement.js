var destination = null;

function hasArrived() {
    var tmp = distanceBetweenObj(tracker, {x: 0, y: 0});
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

function moveEnemy(pointer, enemy) {

    enemy.body.velocity.x = 0;
    enemy.body.velocity.y = 0;
    
    console.log("velocity is: " + enemy.body.velocity.x);
    
    var dx = Math.abs(pointer.x - enemy.x),
        dy = Math.abs(pointer.y - enemy.y),
        angle = Math.atan(dy / dx),
        vX = Math.abs(Math.cos(angle) * 200),
        vY = Math.abs(Math.sin(angle) * 200);
        
    if (pointer.x > enemy.x) { 
        enemy.body.velocity.x + vX;
    }else {
        enemy.body.velocity.x - vX;
    }
   
    if (pointer.y > enemy.y) {
        enemy.body.velocity.y + vY;
    } else {
        enemy.body.velocity.y - vY;
    }
    
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2 - point1, 2) + Math.pow(point2 - point1, 2));
    
}function distanceBetweenObj(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
