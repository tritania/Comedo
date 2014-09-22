/*jshint multistr:true, node:true */
module.exports.userExists = userExists;
module.exports.userIdExists = userIdExists;
module.exports.createUser = createUser;
module.exports.deleteUserId = deleteUserId;
module.exports.deleteUser = deleteUser;
module.exports.authUser = authUser;
module.exports.authUserId = authUserId;

fs = require('fs');
MD5 = require('MD5');
sqlite3 = require('sqlite3');
bcrypt = require('bcrypt-nodejs');

/**
* Checks whether the user is in the database
* Wrapper around userIdExists
*
* @param (string) userName - The users name
* @param (function(err, result)) callback - callback
**/
function userExists(userName, callback) {
    return userIdExists(MD5(userName), callback);
}

/**
* Checks whether the userID is in the database
*
* @param (string) userID - The users MD5 ID
* @param (function(err, result)) callback - callback
**/
function userIdExists(userID, callback) {
        users = new sqlite3.Database('./db/users.db');
        users.all("SELECT * FROM users WHERE userID = ? LIMIT 1", userID, function (err, rows) {
            if (err) return callback(err);
            if (rows.length === 0) return callback(null, false);

            return callback(null, true);
        });
        users.close();
}

/**
* Creates a new user in the database
*
* @param (string) userName - The users name
* @param (string) email - The user's email
* @param (function(err, res)) callback - callback
**/
function createUser(userName, email, password, callback) {
    userExists(userName, function(err, result) {
        if (err) return callback(err);
        if (result) return callback(new Error('User Exists'));

        users = new sqlite3.Database('./db/users.db');
        users.run("\
            INSERT INTO users (userid, username, email, password)\
            VALUES ( $userid, $username, $email, $password)",
            {
                $userid: MD5(userName),
                $username: userName,
                $email: email,
                $password: bcrypt.hashSync(password)
            });
        users.close();
        return callback(null, true);
    });
}

/**
* Deletes a user in the database
* Wrapper around deleteUserId()
*
* @param (string) userName - the user's name
* @param (function(err)) callback - callback
**/
function deleteUser(userName, callback){
    deleteUserId(MD5(userName), callback);
}

/**
* Deletes a user in the database
*
* @param (string) userId - the user's id
* @param (function(err)) callback - callback
**/
function deleteUserId(userId, callback){
    userIdExists(userId, function(err, result) {
        if (err) return callback(err);
        if (!result) return callback(new Error('User Does Not Exist'));

        users = new sqlite3.Database('./db/users.db');
        users.run("DELETE FROM users WHERE userID = ?", userId);
        users.close();
        return callback(null, true);
    });
}


/**
* Authorizes a user
* Wrapper around authUserId()
*
* @param (string) userName - username
* @param (string) password - password
* @param (function(err,res)) callback - callback
**/
function authUser(userName, password, callback){
    authUserId(MD5(userName, password), callback);
}

/**
* Authorizes a user
*
* @param (string) userName - username
* @param (string) password - password
* @param (function(err,res)) callback - callback
**/
function authUserId(userID, password, callback){
    userIdExists(userID, function(err, result) {
        if (err) return callback(err);
        if (!result) return callback(new Error('User Does Not Exist'));

        users = new sqlite3.Database('./db/users.db');
        users.all("SELECT * FROM users WHERE userID = $userID AND pasword = $password",
            { $userID: userID, $password: bcrypt.hashSync(password)}, function (err, rows) {

            if (err) return callback(err);
            if (rows.length === 1) return callback(null, true);

            return callback(null, false);
        });
        users.close();
    });
}
