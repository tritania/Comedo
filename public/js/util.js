function pointDistance(x, y, xp, yp) {
    "use strict";
    var dx,
        dy,
        distance;
	dx = (xp - x);
	dy = (yp - y);
	distance = Math.sqrt(dx * dx + dy * dy);
	return distance;
}