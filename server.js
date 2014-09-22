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
var manager = require('./lib/sql/manager');
var users = require('./lib/sql/manager');

manager.destroyUsersDatabase(function(){
    manager.initUsersDatabase(function(){
        start();
    });
});

function start() {
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

            users.authUser(data.username, data.password, function(err, res) {
                if (res) socket.emit("loginevent", true);
                else {
                    socket.emit("loginevent", false);
                }
            });
        });

        socket.on('register', function (data) {

            users.userExists(data.username, function(err, res){
                if (err || !res) socket.emit("regfailed", false);
                else {
                    users.createUser(data.username, data.email, data.password, function(){
                        if (err) socket.emit("regfailed", false);
                        else
                            socket.emit("loginevent", true);
                     });
                 }
            });

        });

        socket.on('disconnect', function () { //will also need to check if player is active in anyone elses room
            console.log("User disconnected with id " + socket.id);
        });
    });
}
