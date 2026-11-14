
import * as THREE from "https://unpkg.com/three@0.170.0/build/three.module.js";

// =====================================
// ESCENA
// =====================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03000c);

// =====================================
// CÁMARA
// =====================================

const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 27, 65);
camera.lookAt(0, 0, 0);

// =====================================
// RENDERIZADOR
// =====================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// =====================================
// GRUPO PRINCIPAL
// =====================================

const galaxyGroup = new THREE.Group();
scene.add(galaxyGroup);

// =====================================
// GALAXIA ESPIRAL
// =====================================

const galaxyCount = 30000;

const galaxyGeometry = new THREE.BufferGeometry();

const positions = new Float32Array(galaxyCount * 3);
const colors = new Float32Array(galaxyCount * 3);

const colorInside = new THREE.Color("#ffb0e8");
const colorMiddle = new THREE.Color("#ec55ff");
const colorOutside = new THREE.Color("#7660ff");

for (let i = 0; i < galaxyCount; i++) {

    const i3 = i * 3;

    const radius = Math.random() * 34;

    const spin = radius * 0.32;

    const arm = (i % 5) * (Math.PI * 2 / 5);

    const angle = arm + spin;

    const spread = radius * 0.045;

    positions[i3] =
        Math.cos(angle) * radius +
        (Math.random() - 0.5) * spread;

    positions[i3 + 1] =
        (Math.random() - 0.5) * 1.8;

    positions[i3 + 2] =
        Math.sin(angle) * radius +
        (Math.random() - 0.5) * spread;

    const color = colorInside.clone();

    if (radius < 12) {
        color.lerp(colorMiddle, radius / 12);
    } else {
        color.copy(colorMiddle);
        color.lerp(colorOutside, (radius - 12) / 22);
    }

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
}

galaxyGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

galaxyGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
);

const galaxyMaterial = new THREE.PointsMaterial({
    size: 0.17,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const galaxy = new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

galaxyGroup.add(galaxy);

// =====================================
// POLVO ESTELAR
// =====================================

function createDust(count, spread, color, size, opacity) {

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        const i3 = i * 3;

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * spread;

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = (Math.random() - 0.5) * 3;
        positions[i3 + 2] = Math.sin(angle) * radius;
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
}

const dust = createDust(
    6000,
    38,
    0xffb5ef,
    0.045,
    0.4
);

galaxyGroup.add(dust);

// =====================================
// NEBULOSA
// =====================================

const nebulaGroup = new THREE.Group();
scene.add(nebulaGroup);

const nebulaPink = createDust(
    4500,
    32,
    0xff45cc,
    0.16,
    0.12
);

const nebulaPurple = createDust(
    4500,
    35,
    0x914cff,
    0.20,
    0.10
);

nebulaPink.scale.set(1.3, 0.8, 1.3);
nebulaPurple.scale.set(1.5, 0.7, 1.5);

nebulaGroup.add(nebulaPink);
nebulaGroup.add(nebulaPurple);

// =====================================
// ESTRELLAS DEL FONDO
// =====================================

const backgroundStars = createDust(
    3500,
    100,
    0xffd9ff,
    0.055,
    0.8
);

backgroundStars.position.y = 0;
scene.add(backgroundStars);

// =====================================
// NÚCLEO LUMINOSO
// =====================================

const coreGeometry = new THREE.SphereGeometry(
    0.65,
    32,
    32
);

const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xffa6e8
});

const core = new THREE.Mesh(
    coreGeometry,
    coreMaterial
);

galaxyGroup.add(core);

// =====================================
// HALO DEL NÚCLEO
// =====================================

const haloGeometry = new THREE.SphereGeometry(
    1.8,
    32,
    32
);

const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0xff55dd,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const halo = new THREE.Mesh(
    haloGeometry,
    haloMaterial
);

galaxyGroup.add(halo);

// =====================================
// LUCES
// =====================================

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambient);

const coreLight = new THREE.PointLight(
    0xff77dd,
    5,
    35
);

coreLight.position.set(0, 0, 0);
galaxyGroup.add(coreLight);

// =====================================
// PARTÍCULAS ORBITALES
// =====================================

// ❤️ CORAZÓN 3D FORMADO POR PARTÍCULAS
const heartCount = 5000;
const heartGeometry = new THREE.BufferGeometry();
const heartPositions = [];
const heartColors = [];

const heartColor1 = new THREE.Color("#ff4fa3");
const heartColor2 = new THREE.Color("#ffb6e6");

for (let i = 0; i < heartCount; i++) {
    const t = Math.random() * Math.PI * 2;

    // Forma matemática del corazón
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    const fill = Math.sqrt(Math.random());

    heartPositions.push(
        x * 0.12 * fill,
        y * 0.12 * fill,
        (Math.random() - 0.5) * 0.7
    );

    const color = heartColor1.clone().lerp(
        heartColor2,
        Math.random()
    );

    heartColors.push(color.r, color.g, color.b);
}

heartGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(heartPositions, 3)
);

heartGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(heartColors, 3)
);

const heartMaterial = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const heart = new THREE.Points(heartGeometry, heartMaterial);
galaxyGroup.add(heart);

const orbitGeometry = new THREE.BufferGeometry();

const orbitPositions = [];

for (let i = 0; i < 800; i++) {

    const angle = Math.random() * Math.PI * 2;
    const radius = 1.5 + Math.random() * 2;

    orbitPositions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.8,
        Math.sin(angle) * radius
    );
}

orbitGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        orbitPositions,
        3
    )
);

const orbitMaterial = new THREE.PointsMaterial({
    color: 0xffb0ee,
    size: 0.045,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const orbitParticles = new THREE.Points(
    orbitGeometry,
    orbitMaterial
);

galaxyGroup.add(orbitParticles);

// =====================================
// ANIMACIÓN PRINCIPAL
// =====================================

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Giro lento de la galaxia
    galaxyGroup.rotation.y = time * 0.025;

    heart.rotation.y = Math.sin(time * 0.5) * 0.12;
heart.rotation.x = Math.sin(time * 0.7) * 0.04;

const heartPulse = 1 + Math.sin(time * 2) * 0.035;
heart.scale.setScalar(heartPulse);

    // Giro del polvo estelar
    dust.rotation.y = time * 0.012;

    // Movimiento de la nebulosa
    nebulaGroup.rotation.y = Math.sin(time * 0.12) * 0.04;

    nebulaGroup.position.x =
        Math.sin(time * 0.18) * 0.35;

    nebulaGroup.position.y =
        Math.cos(time * 0.15) * 0.12;

    // Movimiento de las estrellas
    backgroundStars.rotation.y = time * 0.003;

    // Latido del núcleo
    const pulse = 1 + Math.sin(time * 1.5) * 0.10;

    core.scale.setScalar(pulse);

    // Respiración del halo
    halo.scale.setScalar(1.3 + pulse * 0.18);

    halo.material.opacity =
        0.12 + Math.sin(time * 1.5) * 0.04;

    // Rotación de partículas orbitales
    orbitParticles.rotation.y = time * 0.18;
    orbitParticles.rotation.x = Math.sin(time * 0.2) * 0.08;

    // Brillo del núcleo
    coreLight.intensity =
        4.5 + Math.sin(time * 1.5) * 1;

    // Parpadeo de las estrellas
    backgroundStars.material.opacity =
        0.65 + Math.sin(time * 1.2) * 0.15;

    renderer.render(scene, camera);
}

// =====================================
// ADAPTACIÓN A PANTALLAS
// =====================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );
});

// =====================================
// INICIAR
// =====================================

document.getElementById("loading").classList.add("oculto");

console.log("Galaxia 3D iniciada correctamente");

animate();
