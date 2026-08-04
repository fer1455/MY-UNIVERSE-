alert("SCRIPT NUEVO FUNCIONANDO");

// =======================
// ESCENA
// =======================

const scene = new THREE.Scene();

// =======================
// CÁMARA
// =======================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 12;

// =======================
// RENDER
// =======================

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("galaxy"),
    antialias: true
});

renderer.setClearColor(0x000010);

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

// =======================
// FONDO
// =======================

scene.background = new THREE.Color(0x000010);
// =======================
// GALAXIA
// =======================

const galaxyGeometry = new THREE.BufferGeometry();

const galaxyCount = 25000;
const galaxyPositions = [];

for (let i = 0; i < galaxyCount; i++) {

    const radius = Math.random() * 15;
    const spin = radius * 1.8;
    const branch = (i % 5) * (Math.PI * 2 / 5);

    const randomX = (Math.random() - 0.5) * 0.4;
    const randomY = (Math.random() - 0.5) * radius * 0.15;
    const randomZ = (Math.random() - 0.5) * 0.4;

    galaxyPositions.push(
        Math.cos(branch + spin) * radius + randomX,
        randomY,
        Math.sin(branch + spin) * radius + randomZ
    );

}

galaxyGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(galaxyPositions, 3)
);

const galaxyMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    transparent: true,
    opacity: 0.9,
    vertexColors: false
});

const galaxy = new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

scene.add(galaxy);

// =======================
// NÚCLEO
// =======================

const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);

const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xff33aa
});

const galaxyCore = new THREE.Mesh(
    coreGeometry,
    coreMaterial
);

scene.add(galaxyCore);

// =======================
// HALO DE LUZ
// =======================

const glowGeometry = new THREE.SphereGeometry(0.9, 32, 32);

const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff66cc,
    transparent: true,
    opacity: 0.18
});

const glow = new THREE.Mesh(
    glowGeometry,
    glowMaterial
);

scene.add(glow);
// =======================
// PARTÍCULAS DEL NÚCLEO
// =======================

const orbitGeometry = new THREE.BufferGeometry();

const orbitPositions = [];

for (let i = 0; i < 600; i++) {

    const angle = Math.random() * Math.PI * 2;
    const distance = 0.8 + Math.random() * 1.2;

    orbitPositions.push(
        Math.cos(angle) * distance,
        (Math.random() - 0.5) * 0.3,
        Math.sin(angle) * distance
    );

}

orbitGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(orbitPositions, 3)
);

const orbitMaterial = new THREE.PointsMaterial({
    color: 0xff99dd,
    size: 0.035
});

const orbitParticles = new THREE.Points(
    orbitGeometry,
    orbitMaterial
);

scene.add(orbitParticles);
// =======================
// REDIMENSIONAR
// =======================

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// =======================
// ANIMACIÓN
// =======================

function animate(){

    requestAnimationFrame(animate);

    galaxy.rotation.y += 0.00008;
galaxy.rotation.x = Math.sin(Date.now() * 0.0002) * 0.15;

    galaxyCore.rotation.y += 0.003;
galaxyCore.scale.x = 1 + Math.sin(Date.now() * 0.003) * 0.08;
galaxyCore.scale.y = galaxyCore.scale.x;
galaxyCore.scale.z = galaxyCore.scale.x;
    glow.rotation.y += 0.0005;

const glowScale = 1 + Math.sin(Date.now() * 0.0025) * 0.15;

glow.scale.set(
    glowScale,
    glowScale,
    glowScale
    orbitParticles.rotation.y += 0.004;
orbitParticles.rotation.x += 0.0005;
);
const glowScale = 1 + Math.sin(Date.now() * 0.002) * 0.15;

glow.scale.set(
    glowScale,
    glowScale,
    glowScale
);
    renderer.render(
        scene,
        camera
    );

}

animate();
