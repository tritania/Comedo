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

var rooms = []; //rooms need to contain maps, and socket ids

io.sockets.on('connection', function (socket) {
    
    socket.on('join', function (data) {
        console.log("User " + socket.id + " has connected");
    });
    
    socket.on('getmap', function (data) {
        rooms[socket.id] = {players: 1}; //no point in creating a room until they click play
        var map = worldgen.createCentral(); //should save central chunk
        socket.emit("map", map);
    });
    
    socket.on('join_request', function (data) {
        //check if room is around
    });
    
    socket.on('disconnect', function () { //will also need to check if player is active in anyone elses room
        var pos = rooms.indexOf(socket.id);
        console.log("User " + rooms[socket.id] + " disconnected with id " + socket.id);
        rooms.splice(pos, pos - 1);
    });
});
