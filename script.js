import * as THREE from "three";

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000010);

// Cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cubo de prueba
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

const material = new THREE.MeshStandardMaterial({
    color: 0xff66cc
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
// Campo de estrellas

const starsGeometry = new THREE.BufferGeometry();

const starCount = 5000;

const starPositions = [];

for (let i = 0; i < starCount; i++) {

    starPositions.push((Math.random() - 0.5) * 400);
    starPositions.push((Math.random() - 0.5) * 400);
    starPositions.push((Math.random() - 0.5) * 400);

}

starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPositions, 3)
);

const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.4
});

const stars = new THREE.Points(starsGeometry, starsMaterial);

scene.add(stars);
// Luces
const light = new THREE.PointLight(0xffffff, 5);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Ocultar pantalla de carga
document.getElementById("loading").classList.add("hidden");

// Animación
function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

}

animate();

// Redimensionar
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});
