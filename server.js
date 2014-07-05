/*jslint node: true*/
/*global io*/
/*jslint plusplus: true */
"use strict";
var express = require("express"),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    port = 9090;
var io = require('socket.io').listen(app.listen(port));

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));