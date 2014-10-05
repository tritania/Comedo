function login() {
    var user = document.getElementById("gid").value,
          pass = document.getElementById("gpass").value,
          logindata;

          if (user.length > 1 && pass.length > 1) {
              logindata = {
                  username: user,
                  password: pass
              };
              trylogin(logindata);
          } else {
              document.getElementById("logtxt").innerHTML = "Invalid username or password";
              document.getElementById("logtxt").style.color="#ac3333";
          }
}

function showcase() {

}

function createUI() {

}

function register() {
    document.getElementById("joined").style.visibility = "hidden";
    document.getElementById("regis").style.visibility = "visible";
}

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
        } else if (!checkEmail()) {
            document.getElementById("regtxt").innerHTML = "Improper email given";
            document.getElementById("regtxt").style.color="#ac3333";
          } else {
              data = {
                username: user,
                password: pass,
                email: email
              };
              tryregister(data);
          }
}

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
