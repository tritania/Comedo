/*jslint node: true*/
/*global io*/
/*jslint plusplus: true */
"use strict";
var express = require("express"),
    app = express(),
    worldgen = require('./utils/world'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    port = 9090;
var io = require('socket.io').listen(app.listen(port));

app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

console.log("Comedo is initializing...");

io.sockets.on('connection', function (socket) {
    console.log("User " + socket.id + " has connected");

    socket.on('getmap', function (data) {
        var map = worldgen.createCentral(); //should save central chunk
        console.log("user is requesting a map");
        socket.emit("map", map);
        console.log("map sent");
    });

    socket.on('getchunk', function (data) {
        var chunks = worldgen.getChunks(data.ranges, data.seed);
        socket.emit("chunk", chunks);
    });

    socket.on('login', function (data) {
        var valid;
        socket.emit("loginevent", valid);
    });

    socket.on('register', function (data) {
        var valid;
        if (valid) {
            socket.emit("loginevent", valid); //if registration is good pass a login event
        } else {
            socket.emit("regfailed", valid); //else pass a registration failed event
        }
    });

    socket.on('usercheck', function (data) {
        var valid;
        socket.emit("userchecked", valid); //return bool
    });

    socket.on('disconnect', function () { //will also need to check if player is active in anyone elses room
        console.log("User disconnected with id " + socket.id);
    });
});
