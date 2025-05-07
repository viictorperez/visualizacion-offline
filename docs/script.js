// Importar Three.js correctamente
import * as THREE from 'https://cdn.skypack.dev/three@0.146.0';

// Configuración inicial de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 500, 1000); // Ajusta la altura y profundidad de la cámara
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental para iluminar toda la escena
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Luz direccional para sombras y detalles
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1000, 1000);
scene.add(light);

// Esfera para representar el USBL
const usblGeometry = new THREE.SphereGeometry(20, 32, 32);
const usblMaterial = new THREE.MeshStandardMaterial({ color: 0x007bff });
const usblSphere = new THREE.Mesh(usblGeometry, usblMaterial);
usblSphere.position.set(0, 0, 0);
scene.add(usblSphere);

// Asegura que la cámara apunte al centro
camera.lookAt(usblSphere.position);

// Manejar el tamaño de la ventana para que sea responsivo
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animación de la escena
function animate() {
    usblSphere.rotation.x += 0.01;
    usblSphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
