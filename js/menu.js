/**
 * HTML form verification and pass off to account.js
 */
function login() {
    var user = document.getElementById("gid").value,
          pass = document.getElementById("gpass").value;

          if (user.length > 1 && pass.length > 1) {
            login(user, pass);
          } else {
              document.getElementById("logtxt").innerHTML = "Invalid username or password";
              document.getElementById("logtxt").style.color="#ac3333";
          }
}

/**
 * Hides the connection form and displays the login form
 */
function loginUI() {
    document.getElementById("served").style.visibility = "hidden";
    document.getElementById("joined").style.visibility = "visible";
}

function registerUI() {
    document.getElementById("joined").style.visibility = "hidden";
    document.getElementById("regis").style.visibility = "visible";
}

/**
 * HTML form verification and pass off to account.js
 */
function checkreg() {
    var user = document.getElementById("ruser").value,
          pass = document.getElementById("rpass").value,
          cpass = document.getElementById("rcpass").value,
          email = document.getElementById("remail").value,
          data;

          if (pass !== cpass || pass === "") {
            document.getElementById("regtxt").innerHTML = "Passwords do not match";
            document.getElementById("regtxt").style.color="#ac3333";
          } else if (user === "") {
            document.getElementById("regtxt").innerHTML = "No username given";
            document.getElementById("regtxt").style.color="#ac3333";
        } else if (email.length > 0 && !checkEmail()) {
            document.getElementById("regtxt").innerHTML = "Improper email given";
            document.getElementById("regtxt").style.color="#ac3333";
          } else {
             createKey(user, pass, email);
          }
}

/**
 * HTML email value verification
 */
function checkEmail() {
    "use strict";
    var email = document.getElementById("remail").value,
          atpos = email.indexOf("@"),
          dotpos = email.lastIndexOf(".");
    if (email !== "") {
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            return false;
        } else {
            return true;
        }
    } else {
            return false;
        }
}

/**
 * Displays help for new players
 */
function help() {
    "use strict";
}
