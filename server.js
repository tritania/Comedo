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
    socket.on('join', function (data) {
        
    });
    socket.on('getmap', function (data) {
        console.log(socket.id + " is requesting a map");
        var map = worldgen.createCentral();
        console.log("Server Map " + JSON.stringify(map));
        socket.emit("map", map);
    });
});