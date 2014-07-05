function join() {
    "use strict";
    document.getElementById("joined").style.visibility = "hidden";
    loadPlayer(1, 1);
    var value = document.getElementById("gid").value;
    if (value === "") {
        //create a new game
    } else {
        //join an existing game
    }
}