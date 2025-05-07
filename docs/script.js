// Importar Three.js como módulo jb
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.module.js';

// Configuración inicial de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, -2000, 1000);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz en la escena
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2000, 1000);
scene.add(light);

// Esfera para representar el USBL
const usblGeometry = new THREE.SphereGeometry(20, 32, 32);
const usblMaterial = new THREE.MeshStandardMaterial({ color: 0x007bff });
const usblSphere = new THREE.Mesh(usblGeometry, usblMaterial);
scene.add(usblSphere);

// Animación de la escena
function animate(time) {
    usblSphere.rotation.x = time / 2000;
    usblSphere.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
