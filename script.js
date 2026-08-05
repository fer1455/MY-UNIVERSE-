alert("SCRIPT.JS FUNCIONANDO");

// Escena
const scene = new THREE.Scene();

// CÃ¡mara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 10;


// Render
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("galaxy"),
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000010);


// Galaxia espiral
const galaxyGeometry = new THREE.BufferGeometry();

const galaxyCount = 25000;
const positions = [];

const arms = 5;
const radius = 12;

for (let i = 0; i < galaxyCount; i++) {

    const r = Math.random() * radius;
    const arm = (i % arms) * (Math.PI * 2 / arms);

    const angle = arm + r * 0.7;

    positions.push(
        Math.cos(angle) * r + (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * r * 0.25,
        Math.sin(angle) * r + (Math.random() - 0.5) * 0.3
    );

}

galaxyGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
);

const galaxyMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.06,
    transparent: true,
    opacity: 0.9
});
const stars = new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

scene.add(stars);
// Nebulosa
const nebulaGeometry = new THREE.BufferGeometry();

const nebulaPositions = [];

for (let i = 0; i < 5000; i++) {

    nebulaPositions.push(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 40
    );

}

nebulaGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nebulaPositions, 3)
);

const nebulaMaterial = new THREE.PointsMaterial({
    color: 0xaa66ff,
    size: 0.08,
    transparent: true,
    opacity: 0.12
});
const nebula = new THREE.Points(
    nebulaGeometry,
    nebulaMaterial
);

scene.add(nebula);
// Estrellas de fondo
const bgGeometry = new THREE.BufferGeometry();

const bgPositions = [];

for (let i = 0; i < 3000; i++) {

    bgPositions.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
    );

}

bgGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bgPositions, 3)
);

const bgMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05
});

const backgroundStars = new THREE.Points(
    bgGeometry,
    bgMaterial
);

scene.add(backgroundStars);
// NÃºcleo de la galaxia
const coreGeometry = new THREE.SphereGeometry(0.25, 32, 32);

const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xff66cc
});

const galaxyCore = new THREE.Mesh(coreGeometry, coreMaterial);

scene.add(galaxyCore);
// Halo brillante
const glowGeometry = new THREE.SphereGeometry(0.45, 32, 32);

const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff99dd,
    transparent: true,
    opacity: 0.25
});

const glow = new THREE.Mesh(
    glowGeometry,
    glowMaterial
);

scene.add(glow);

// AnimaciÃ³n
function animate() {

    requestAnimationFrame(animate);

    // Giro de la galaxia
    stars.rotation.y += 0.00012;
    stars.rotation.x += 0.0001;

    // Giro del núcleo
    galaxyCore.rotation.y += 0.002;

    // Latido del núcleo
    const pulse = 1 + Math.sin(Date.now() * 0.003) * 0.15;

    galaxyCore.scale.set(
        pulse,
        pulse,
        pulse
    );

    // Movimiento de la nebulosa
    nebula.rotation.y += 0.00005;
    nebula.rotation.x += 0.00002;

    // Latido del halo
    glow.scale.set(
        pulse * 1.6,
        pulse * 1.6,
        pulse * 1.6
    );

    glow.rotation.y += 0.001;

    // Mostrar la escena
    renderer.render(
        scene,
        camera
    );
}

animate();

// BotÃ³n sorpresa

const button = document.getElementById("open");
const message = document.getElementById("message");
const card = document.querySelector(".card");

button.onclick = () => {

    button.style.display = "none";

    card.classList.add("open");

};

card.onclick = () => {

    if (button.style.display !== "none") return;

    message.classList.toggle("show");

};
