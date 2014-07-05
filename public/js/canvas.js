/*jslint node: true*/
/*global io, THREE, THREEx, TWEEN, onDocumentMouseDown, requestAnimationFrame*/
/*jslint plusplus: true */

var clock = new THREE.Clock(),
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

animate();
cachePlayer();

function render() {
    "use strict";
    renderer.render(scene, camera);
}

function animate() {
    "use strict";
    requestAnimationFrame(animate);
    render();
}

function onDocumentMouseDown(event) {
    "use strict";
}



function cachePlayer() {
    "use strict";
    var loader = new THREE.JSONLoader();
    
    loader.load('data/models/entity.js', function (geometry) {
        var material = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('data/textures/testEntity.png')  //specify and load the texture
            });
        geometrys.push(geometry);
        materials.push(material);
    });
}

function loadPlayer() {
    "use strict";
    var mesh = new THREE.Mesh(
        geometrys[0],
        materials[0]
    );
    mesh.position.set(1, 1, 0);
    scene.add(mesh);
    objects.push(mesh);
    animate();
}

