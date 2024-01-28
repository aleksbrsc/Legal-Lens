import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);
// scene.background = new THREE.Color(0x333333);

const camera = new THREE.PerspectiveCamera(6, 500 / 500, 0.1, 2000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(250, 250);

document.getElementById('canvas-container').appendChild(renderer.domElement);

// // light sources
// const light = new THREE.PointLight(0xffffff, 0.01); // white
// light.position.set(0, 2, 2);
// scene.add(light);

// const blueLight = new THREE.PointLight(0x0000FF, 0.1); // blue
// blueLight.position.set(2, 2, 0);
// scene.add(blueLight);

// const redLight = new THREE.PointLight(0xFF0000, 0.1); // red
// redLight.position.set(0, 2, 0);
// scene.add(redLight);

// const purpleLight = new THREE.PointLight(0x702963, 0.1); // purple
// purpleLight.position.set(2, 2, 2);
// scene.add(purpleLight);

// loading magnifying lens gltf model
const loader = new GLTFLoader().setPath('models/lens/');
loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(0, 0, 0);
    mesh.rotation.x -= 0;

    // Set the roughness of the material to reduce glossiness
    mesh.traverse((child) => {
        if (child.isMesh) {
            child.material.roughness = 0.5; // Adjust the roughness value here (0.0 to 1.0)
        }
    });

    scene.add(mesh);

    function animate() {
        requestAnimationFrame(animate);
    
        mesh.rotation.y += 0.01;  
        mesh.rotation.z += 0.01;    
        
        renderer.render(scene, camera);
    }

    animate();
});