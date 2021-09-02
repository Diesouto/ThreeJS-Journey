import './style.css';
import * as THREE from 'three';
import { Object3D } from 'three';

console.log(THREE);

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,5,5,5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;

camera.lookAt(mesh.position)
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock(); 

// Animation
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update object and render
    mesh.rotation.y = elapsedTime;
    renderer.render(scene, camera);

    // Call each tick
    window.requestAnimationFrame(tick);
}

tick();