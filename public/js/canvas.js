/*jslint node: true*/
/*global io, THREE, THREEx, TWEEN, onDocumentMouseDown, requestAnimationFrame, pointDistance, generate, combat*/
/*jslint plusplus: true */

var clock = new THREE.Clock(),
    selection = null,
    
    active,
    movement = null,
    
    objects = [],
    player = [],
    enemies = [],
    
    materials = [],
    geometrys = [],
    scene = new THREE.Scene(),
    socket = io.connect("comedo.glaciem.com:9090"),
    projector = new THREE.Projector(),
    mouse = { x: 0, y: 0 },
    INTERSECTED,
    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.5, 100);
camera.position.set(0, 0, 20); //x,y,z

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xBBE6A7, 1);
document.body.appendChild(renderer.domElement);
document.addEventListener('mousedown', onDocumentMouseDown, false);
    
THREEx.WindowResize(renderer, camera);



function render() {
    "use strict";
    TWEEN.update();
    renderer.render(scene, camera);
}

function animate() {
    "use strict";
    combat();
    requestAnimationFrame(animate);
    render();
}

function cachePlayer() {
    "use strict";
    var loader = new THREE.JSONLoader();
    
    loader.load('data/models/entity.js', function (geometry) {
        var player = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('data/textures/Player.png')  //specify and load the texture
            }),
            enemy = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('data/textures/Enemy.png')  //specify and load the texture
            });
        geometrys.push(geometry);
        materials.push(player);
        materials.push(enemy);
    });
}

function loadPlayer(x, y) {
    "use strict";
    var mesh = new THREE.Mesh(
        geometrys[0],
        materials[0]
    );
    generate();
    mesh.position.set(x, y, 0);
    scene.add(mesh);
    player.push(mesh);
    active = true;
    animate();
}

function loadEnemy(x, y) {
    "use strict";
    console.log("Enemy added at " + x + " " + y);
    var mesh = new THREE.Mesh(
        geometrys[0],
        materials[1]
    );
    mesh.position.set(x, y, 0);
    scene.add(mesh);
    enemies.push(mesh);
    animate();
}

animate();
cachePlayer();

function onDocumentMouseDown(event) {
    "use strict";
    event.preventDefault();
    if (movement !== null) {
        movement.stop();
    }
		
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5),
        mousevec,
        dir,
        distance,
        pos,
        time;
    
    projector.unprojectVector(vector, camera);
        
    mousevec = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );

    projector.unprojectVector(mousevec, camera);

    dir = mousevec.sub(camera.position).normalize();
    distance = -camera.position.z / dir.z;
    pos = camera.position.clone().add(dir.multiplyScalar(distance));

    time = (pointDistance(player[0].position.x, player[0].position.y, pos.x, pos.y)) / 0.0125;

    movement = new TWEEN.Tween(player[0].position, {override: true}).to({
        x: pos.x,
        y: pos.y
    }, time)
        .easing(TWEEN.Easing.Linear.None).start();
}





