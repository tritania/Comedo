var tape = require('tape');
var fs = require('fs');
var manager = require('../lib/sql/manager');

tape('manager/users', function(t) {
    t.test('initUsersDatabase', function(s){
        manager.initUsersDatabase(function(err){
            s.error(err);
            fs.exists('./db/users.db', function(exists){
                s.equals(exists, true);
                s.end();
            });
        });
    });


    t.test('backupUsersDatabase', function(s){
        manager.backupUsersDatabase('./db/users.db_bk', function(err){
            s.error(err);
            fs.exists('./db/users.db_bk', function(exists){
                s.equals(exists, true);
                //destroy main database for restore test
                fs.unlink('./db/users.db', function (err) {
                    s.error(err);
                    s.end();
                });
            });
        });
    });

    t.test('restoreUsersDatabase', function(s){
        manager.restoreUsersDatabase('./db/users.db_bk', function(err){
            s.error(err);
            fs.exists('./db/users.db', function(exists){
                s.equals(exists, true);
                //destroy backup database
                fs.unlink('./db/users.db_bk', function (err) {
                    s.error(err);
                    s.end();
                });
            });
        });
    });

    t.test('destroyUsersDatabase', function(s){
        manager.destroyUsersDatabase(function(err){
            s.error(err);
            fs.exists('./db/users.db', function(exists){
                s.equals(exists, false);
                s.end();
            });
        });
    });
});

tape('manager/maps', function(t) {
    t.test('initMapsDatabase', function(s){
        manager.initMapsDatabase(function(err){
            s.error(err);
            fs.exists('./db/maps.db', function(exists){
                s.equals(exists, true);
                s.end();
            });
        });
    });


    t.test('backupMapsDatabase', function(s){
        manager.backupMapsDatabase('./db/maps.db_bk', function(err){
            s.error(err);
            fs.exists('./db/maps.db_bk', function(exists){
                s.equals(exists, true);
                //destroy main database for restore test
                fs.unlink('./db/maps.db', function (err) {
                    s.error(err);
                    s.end();
                });
            });
        });
    });

    t.test('restoreMapsDatabase', function(s){
        manager.restoreMapsDatabase('./db/maps.db_bk', function(err){
            s.error(err);
            fs.exists('./db/maps.db', function(exists){
                s.equals(exists, true);
                //destroy backup database
                fs.unlink('./db/maps.db_bk', function (err) {
                    s.error(err);
                    s.end();
                });
            });
        });
    });

    t.test('destroyMapsDatabase', function(s){
        manager.destroyMapsDatabase(function(err){
            s.error(err);
            fs.exists('./db/maps.db', function(exists){
                s.equals(exists, false);
                s.end();
            });
        });
    });
});
