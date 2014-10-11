var openpgp = require('openpgp');

/**
 * @param user Username of new user
 * @param pass Password of new user
 * @param email Email of new user
 */
function createKey(user, pass, email) {
    var key = openpgp.generateKeyPair({numBits: 512, userId: user, passphrase: pass});
    console.log(openpgp.key.readArmored(key));
    //save to file
}

/**
 * @param user Username for login
 * @param pass Password for login
 */
function login(user, pass) {

}
