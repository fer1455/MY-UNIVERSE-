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

// Núcleo de la galaxia

const galaxyCoreGeometry = new THREE.SphereGeometry(1.5, 64, 64);

const galaxyCoreMaterial = new THREE.MeshBasicMaterial({
    color: 0xff66cc
});

const galaxyCore = new THREE.Mesh(
    galaxyCoreGeometry,
    galaxyCoreMaterial
);

scene.add(galaxyCore);
// Campo de estrellas

const starsGeometry = new THREE.BufferGeometry();

const starCount = 5000;

const starPositions = [];

for (let i = 0; i < starCount; i++) {

    starPositions.push((Math.random() - 0.5) * 40);
starPositions.push((Math.random() - 0.5) * 40);
starPositions.push((Math.random() - 0.5) * 40);

}

starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPositions, 3)
);

const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2
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

    galaxyCore.rotation.y += 0.01;
galaxyCore.rotation.x += 0.005;
stars.rotation.y += 0.0003;
    renderer.render(scene, camera);

}

animate();

// Redimensionar
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});
