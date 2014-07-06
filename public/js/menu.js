function join() {
    "use strict";
    document.getElementById("joined").style.visibility = "hidden";
    var value = document.getElementById("gid").value;
    if (value === "") {
        createGame();
    } else {
        createGame();
    }
}