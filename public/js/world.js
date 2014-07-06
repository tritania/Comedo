/*jslint node: true*/
/*global enemies, player, loadEnemy, active, TWEEN, pointDistance*/
/*jslint plusplus: true */
var cr = 30; //combat range
var combatTrack = [];

function generate() {
    "use strict";
    var x,
        y;
    x = Math.floor((Math.random() * 40) + 1);
    y = Math.floor((Math.random() * 40) + 1);
    loadEnemy(x, y);
}

function combat() {
    "use strict";
    if (active) {
        var person = player[0],
            x = person.position.x,
            y = person.position.y,
            xe,
            ye,
            i,
            time;
        for (i = 0; i < enemies.length; i++) {
            xe = enemies[i].position.x;
            ye = enemies[i].position.y;
            if ((x >= (xe - cr) && x <= (xe + cr)) &&  (y >= (ye - cr) && y <= (ye + cr))) {
                time = (pointDistance(xe, ye, x, y) / 0.65);
                new TWEEN.Tween(enemies[i].position)
                    .to({ x: x, y: y }, time)
                    .easing(TWEEN.Easing.Linear.None).start();
            }
        }
    }
}