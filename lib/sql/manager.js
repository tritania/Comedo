/*jshint multistr:true, node:true */
module.exports.initUsersDatabase = initUsersDatabase;
module.exports.initMapsDatabase = initMapsDatabase;
module.exports.destroyUsersDatabase = destroyUsersDatabase;
module.exports.destroyMapsDatabase = destroyMapsDatabase;
module.exports.backupUsersDatabase = backupUsersDatabase;
module.exports.backupMapsDatabase = backupMapsDatabase;
module.exports.restoreUsersDatabase = restoreUsersDatabase;
module.exports.restoreMapsDatabase = restoreMapsDatabase;

fs = require('fs');
sqlite3 = require('sqlite3');

/**
* Creates a new Users database
*
* @param (function(err)) callback - callback
**/
function initUsersDatabase(callback) {
    if (!checkDB() || fs.existsSync('./db/users.db')) return callback(new Error('Users.db exists'));

   var user = new sqlite3.Database('./db/users.db');

    user.run('\
      CREATE TABLE users (\
        userID TEXT,\
        userName TEXT,\
        email TEXT,\
        gameOwner TEXT,\
        password TEXT\
    )', function(err){
        if (err) return callback(err);
        user.close();
        return callback(null);
    });
}

/**
* Destroys a Users database
*
* @param (function(err)) callback - callback
**/
function destroyUsersDatabase(callback) {
    if (!fs.existsSync('./db/users.db')) return callback(null);
    fs.unlink('./db/users.db', function (err) {
        return callback(err);
    });
}

/**
* Backs up a database to a given location
*
* @param (string) backup - name and location of backup file
* @param (function(err)) callback - callback
**/
function backupUsersDatabase(backup, callback) {
    if (fs.existsSync(backup)) return callback(new Error('Backup Exists'));
    if (!fs.existsSync('./db/users.db')) return callback(new Error('No users.db'));

    var rd = fs.createReadStream('./db/users.db');
    rd.on('error', function(err){
        callback(err);
    });
    var wr = fs.createWriteStream(backup);
    wr.on('error', function(err){
        callback(err);
    });
    wr.on('close', function(){
        callback(null);
    });
    rd.pipe(wr);
}

/** Restores a database from a given location deleting the current
*
* @param (string) backup - database folder relative to server.js
* @param (function(err)) callback - callback
**/
function restoreUsersDatabase(backup, callback) {
    if (!fs.existsSync(backup)) return callback(new Error('Backup Does Not Exist'));
    if (fs.existsSync('./db/users.db')) {
        destroyUsersDatabase(function() {
            restore();
        });
    } else
        restore();

    function restore() {
        var rd = fs.createReadStream(backup);
        rd.on('error', function(err){
            callback(err);
        });
        var wr = fs.createWriteStream('./db/users.db');
        wr.on('error', function(err){
            callback(err);
        });
        wr.on('close', function(){
            callback(null);
        });
        rd.pipe(wr);
    }
}

/**
* Creates a new Maps database
*
* @param (function(err)) callback - callback
**/
function initMapsDatabase(callback) {
    if (!checkDB() || fs.existsSync('./db/maps.db')) return callback(new Error('Users.db exists'));

    var maps = new sqlite3.Database('./db/maps.db');

    maps.run('\
      CREATE TABLE maps (\
        mapID TEXT,\
        ownerID TEXT,\
        authorizedUsers TEXT\
    )', function(err){
        if (err) return callback(err);
        maps.close();
        return callback(null);
    });
}

/**
* Destroys a Mas database
*
* @param (function(err)) callback - callback
**/
function destroyMapsDatabase(callback) {
    if (!fs.existsSync('./db/maps.db')) return callback(null);
    fs.unlink('./db/maps.db', function (err) {
        return callback(err);
    });
}

/**
* Backs up a database to a given location
*
* @param (string) backup - name and location of backup file
* @param (function(err)) callback - callback
**/
function backupMapsDatabase(backup, callback) {
    if (fs.existsSync(backup)) return callback(new Error('Backup Exists'));
    if (!fs.existsSync('./db/maps.db')) return callback(new Error('No maps.db'));

    var rd = fs.createReadStream('./db/maps.db');
    rd.on("error", function(err){
        callback(err);
    });
    var wr = fs.createWriteStream(backup);
    wr.on("error", function(err){
        callback(err);
    });
    wr.on('close', function(){
        callback(null);
    });
    rd.pipe(wr);
}

/** Restores a database from a given location deleting the current
*
* @param (string) backup - backup relative to server.js
* @param (function(err)) callback - callback
**/
function restoreMapsDatabase(backup, callback) {
    if (!fs.existsSync(backup)) return callback(new Error('Backup Does Not Exist'));
    if (fs.existsSync('./db/maps.db')) {
        destroyUsersDatabase(function() {
            restore();
        });
    } else
        restore();

    function restore() {
        var rd = fs.createReadStream(backup);
        rd.on("error", function(err){
            callback(err);
        });
        var wr = fs.createWriteStream('./db/maps.db');
        wr.on("error", function(err){
            callback(err);
        });
        wr.on('close', function(){
            callback(null);
        });
        rd.pipe(wr);
    }
}

/**
* Checks to ensure the ./db folder exists and creates it if missiqng
*
* @return boolean based on success
**/
function checkDB() {
    if(fs.existsSync('./db')) return true;
    fs.mkdirSync('./db');
    return true;
 }
