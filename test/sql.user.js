var tape = require('tape');
var fs = require('fs');
var manager = require('../lib/sql/manager');
var users = require('../lib/sql/users');

tape.test('initUsersDatabase', function(t){
    manager.initUsersDatabase(function(err){
    t.error(err);
        fs.exists('./db/users.db', function(exists){
            t.equals(exists, true);
            t.end();
        });
    });
});

tape.test('userExists - False', function(t){
    users.userExists('test', function(err, result){
        t.error(err);
        t.equals(result, false);
        t.end();
    });
});

tape.test('userId - False', function(t){
    users.userIdExists('098f6bcd4621d373cade4e832627b4f6', function(err, result) {
        t.error(err);
        t.equals(result, false);
        t.end();
    });
});

tape.test('createUser', function(t){
    users.createUser('test', 'test', 'test@gmail.com', function(err, result){
        t.error(err);
        t.equals(result, true);
        t.end();
    });
});

tape.test('createUser2', function(t){
    users.createUser('test2', 'test2', 'test2@gmail.com', function(err, result){
        t.error(err);
        t.equals(result, true);
        t.end();
    });
});

tape.test('createUser - already exists', function(t){
    users.createUser('test', 'test', 'test@gmail.com', function(err, result){
        t.ok(err);
        t.notOk(result);
        t.end();
    });
});

tape.test('deleteUser', function(t){
    users.deleteUser('test2', function(err, result){
        t.error(err);
        t.equals(result, true);
        t.end();
    });
});

tape.test('deleteUserId', function(t){
    users.deleteUserId('098f6bcd4621d373cade4e832627b4f6', function(err, result){
        t.error(err);
        t.equals(result, true);
        t.end();
    });
});

//module.exports.authUser = authUser;
//module.exports.authUserId = authUserId;


tape.test('destroyUsersDatabase', function(t){
    manager.destroyUsersDatabase(function(err){
        t.error(err);
        fs.exists('./db/users.db', function(exists){
            t.equals(exists, false);
            t.end();
        });
    });
});
