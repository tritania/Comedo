function generate() {
    "use strict";
    var x,
        y;
    x = Math.floor((Math.random() * 40) + 1);
    y = Math.floor((Math.random() * 40) + 1);
    loadEnemy(x, y);
}