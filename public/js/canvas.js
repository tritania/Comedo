/*jslint node: true*/
/*global io, THREE, THREEx, TWEEN, onDocumentMouseDown, requestAnimationFrame, pointDistance*/
/*jslint plusplus: true */

var clock = new THREE.Clock(),
    selection = null,
    objects = [],
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
    objects.push(mesh);
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
    objects.push(mesh);
    animate();
}

animate();
cachePlayer();

function onDocumentMouseDown(event) {
    "use strict";
    event.preventDefault();
		
		//generate vector based off mouse position
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5),
        raycaster,
        intersects,
        mousevec,
        dir,
        distance,
        pos,
        time;
    
    projector.unprojectVector(vector, camera);
    raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    intersects = raycaster.intersectObjects(objects);
 
    if (selection !== null) {
        mousevec = new THREE.Vector3(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5
        );

        projector.unprojectVector(mousevec, camera);

        dir = mousevec.sub(camera.position).normalize();
        distance = -camera.position.z / dir.z;
        pos = camera.position.clone().add(dir.multiplyScalar(distance));

        time = (pointDistance(selection.position.x, selection.position.y, pos.x, pos.y)) / 0.0125;

        new TWEEN.Tween(selection.position, {override: true}).to({
            x: pos.x,
            y: pos.y
        }, time)
            .easing(TWEEN.Easing.Linear.None).start();
        selection = null;
    } else if (intersects.length > 0) {
        selection = intersects[0].object;
    } else {
        selection = null;
    }
}





