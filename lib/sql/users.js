/*jshint multistr:true, node:true */
module.exports.userExists = userExists;
module.exports.userIdExists = userIdExists;
module.exports.createUser = createUser;

fs = require('fs');
MD5 = require('MD5');
sqlite3 = require('sqlite3');

/**
* Checks whether the user is in the database
* Wrapper around userIdExists
*
* @param (string) userName - The users name
* @param (function(err)) callback - callback
*/
function userExists(userName, callback) {
    return userIdExists(MD5(userName), callback);
}

/**
* Checks whether the userID is in the database
*
* @param (string) userID - The users MD5 ID
* @param (function(err, result)) callback - callback
*/
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
* @param (string) email - The users email
* @param (function(err)) callback - callback
*/
function createUser(userName, email, callback) {
    userExists(userName, function(err, result) {
        if (err) return callback(err);
        if (result) return callback(new Error('User Exists'));

        users = new sqlite3.Database('./db/users.db');
        users.run("\
            INSERT INTO users (userid, username, email)\
            VALUES ( $userid, $username, $email)",
            {
                $userid: MD5(userName),
                $username: userName,
                $email: email
            });
        users.close();
        return callback(null, true);
    });
}
