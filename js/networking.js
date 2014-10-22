var socket; //need to find a way to easily kill and reasign this value

/**
 * socket.close and socket.open to reassign to a new server
 */

function tryserver() {
    var url = document.getElementById("surl").value;
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
        url = "http://" + url;
    }
    console.log("Attempt to join " + url);
    socket = io.connect(url);
    setTimeout(function() {
        checkConnection();
    }, 3000);
}

function checkConnection() {
    if (socket.connected === false) {
        //reset the server connection
    } else {
        console.log("`12`");
        loginUI();
    }

    socket.on("map", function (data) {
        "use strict";
        var core = data.map;
        seed = data.core;
        createGame(core);
    });

    //Listens for additional chunks
    socket.on("chunk", function (data) {
        "use strict";
        var i = data.length;
        while (i--) {
            preloaded.push(data[i]);
        }
    });

    //Listens for a loginevent
    socket.on("loginevent", function (data) {
        if (data === true) {
            getMap();
            //login valid from server
        } else {
            document.getElementById("logtxt").innerHTML = "Login Failed.";
            document.getElementById("logtxt").style.color="#ac3333";
            document.getElementById("gid").value  = "";
            document.getElementById("gpass").value  = "";
            //login not valid
        }
    });

    //Listens for a failed registration
    socket.on("regfailed", function (data) {
        document.getElementById("regtxt").innerHTML = "Username already in use!";
        document.getElementById("regtxt").style.color="#ac3333";
    });
}
/**
 * Initial function to ask the server for the first part of the map
 **/
function getMap() {
    "use strict";
    document.getElementById("joined").style.visibility = "hidden";
    document.getElementById("regis").style.visibility = "hidden";
    socket.emit("getmap", true); //send all data
}

/**
 * Asks the server for more chunks
 * @param {Object} ranges An array of integer rangers for chunks bounds
 **/
function downChunk(ranges) { //will send the chunk id's it needs for the player
    "use strict";
    var tmp = {
        ranges: ranges,
        seed: seed
    };
    socket.emit("getchunk", tmp);
}

/**
 * Asks the server for a login check
 * @param {Object} data JSON object containing username and password
 **/
function trylogin(data) {
    "use strict";
    socket.emit("login", data);
}

/**
 * Asks the server to register a new user
 * @param {Object} data JSON object containing username and password and email
 **/
function tryregister(data) {
    "use strict";
    socket.emit("register", data);
}
