function login() {
    document.getElementById("joined").style.visibility = "hidden";
    var user = document.getElementById("gid").value,
          pass = document.getElementById("gpass").value,
          logindata = {
              username: user,
              password: pass
          };
          trylogin(logindata);
    getMap(); //for now always serve the map
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

}
