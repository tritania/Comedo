/*jslint node: true*/
/*global io, THREE, THREEx, TWEEN, onDocumentMouseDown, requestAnimationFrame*/
/*jslint plusplus: true */

var clock = new THREE.Clock(),
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

function onDocumentMouseDown(event) {
    "use strict";
}

animate();



