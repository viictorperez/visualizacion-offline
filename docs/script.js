// script.js

// Configuración inicial de la escena Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0, -2000, 1000);
camera.lookAt(0, 0, 0);

// Luz en la escena
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2000, 1000);
scene.add(light);

// Esfera para representar el USBL
const usblGeometry = new THREE.SphereGeometry(20, 32, 32);
const usblMaterial = new THREE.MeshStandardMaterial({ color: 0x007bff });
const usblSphere = new THREE.Mesh(usblGeometry, usblMaterial);
scene.add(usblSphere);

// Manejar carga del archivo CSV
document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                // Limpiar puntos anteriores
                scene.traverse((object) => {
                    if (object.isMesh && object !== usblSphere) {
                        scene.remove(object);
                    }
                });

                // Tomar solo el último dato
                const lastRow = results.data[results.data.length - 2]; // -2 para ignorar la línea en blanco
                const direction = parseFloat(lastRow.direccion);
                const azimut = parseFloat(lastRow.azimut);
                const maxRange = 1000; // Rango máximo en metros

                // Convertir a radianes
                const phi = (direction * Math.PI) / 180;
                const theta = (azimut * Math.PI) / 180;

                // Calcular coordenadas 3D
                const r = maxRange * Math.cos(phi);
                const z = maxRange * Math.sin(phi);
                const x = r * Math.cos(theta);
                const y = r * Math.sin(theta);

                // Crear el punto 3D
                const pointGeometry = new THREE.SphereGeometry(5, 16, 16);
                const pointMaterial = new THREE.MeshStandardMaterial({ color: 0xff4141 });
                const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
                pointMesh.position.set(x, y, -z); // -z porque profundidad es hacia abajo
                scene.add(pointMesh);
            }
        });
    }
});

// Animación de la escena
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
