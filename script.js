alert("SCRIPT.JS FUNCIONANDO");

// Escena
const scene = new THREE.Scene();

// CÃ¡mara
const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 7;

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
const radius = 15;

for (let i = 0; i < galaxyCount; i++) {

    const r = Math.random() * radius;
    const arm = (i % arms) * (Math.PI * 2 / arms);

    const angle = arm + r * 1.2;

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
    color: 0xffb3ff,
    size: 0.03,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
const stars = new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

scene.add(stars);
stars.scale.set(1.15, 1.15, 1.15);
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
    color: 0xcc66ff,
    size: 0.08,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
const nebula = new THREE.Points(
    nebulaGeometry,
    nebulaMaterial
);

scene.add(nebula);
nebula.scale.set(1.5, 1.1, 1.5);
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
    color: 0xffccff,
    size: 0.02,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: false
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

const coreGlowGeometry = new THREE.SphereGeometry(0.8, 32, 32);

const coreGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff66cc,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const coreGlow = new THREE.Mesh(
    coreGlowGeometry,
    coreGlowMaterial
);

scene.add(coreGlow);

const coreParticlesGeometry = new THREE.BufferGeometry();
const coreParticlesCount = 500;

const coreParticlesPositions = new Float32Array(
    coreParticlesCount * 3
);

for (let i = 0; i < coreParticlesCount; i++) {
    const radius = 1.2 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;

    coreParticlesPositions[i * 3] =
        Math.cos(angle) * radius;

    coreParticlesPositions[i * 3 + 1] =
        (Math.random() - 0.5) * 1.5;

    coreParticlesPositions[i * 3 + 2] =
        Math.sin(angle) * radius;
}

coreParticlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(coreParticlesPositions, 3)
);

const coreParticlesMaterial = new THREE.PointsMaterial({
    color: 0xffa6df,
    size: 0.025,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const coreParticles = new THREE.Points(
    coreParticlesGeometry,
    coreParticlesMaterial
);

scene.add(coreParticles);

backgroundStars.rotation.x = 0.2;
backgroundStars.rotation.z = 0.1;

// Halo brillante
const glowGeometry = new THREE.SphereGeometry(0.45, 32, 32);

const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff66cc,
    transparent: true,
    opacity: 0.45
});

const glow = new THREE.Mesh(
    glowGeometry,
    glowMaterial
);

scene.add(glow);
// Halo exterior de la galaxia
const galaxyHaloGeometry = new THREE.SphereGeometry(5, 64, 64);

const galaxyHaloMaterial = new THREE.MeshBasicMaterial({
    color: 0xaa44ff,
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide
});

const galaxyHalo = new THREE.Mesh(
    galaxyHaloGeometry,
    galaxyHaloMaterial
);

scene.add(galaxyHalo);
// ❤️ Corazón 3D formado por partículas
const heartGeometry = new THREE.BufferGeometry();
const heartPositions = [];

const heartParticles = 10000;

for (let i = 0; i < heartParticles; i++) {

    let x, y;

    // Buscar un punto dentro de la forma del corazón
    do {

        x = Math.random() * 2.8 - 1.4;
        y = Math.random() * 2.5 - 1.2;

        const hx = x;
        const hy = y;

        const formula =
            Math.pow(
                hx * hx + hy * hy - 1,
                3
            )
            - hx * hx * Math.pow(hy, 3);

        if (formula <= 0) {
            break;
        }

    } while (true);

    // Distancia aproximada desde el centro
    const distancia =
        Math.sqrt(x * x + y * y);

    // Da volumen redondeado al corazón
    const profundidad =
        Math.sqrt(
            Math.max(
                0,
                1 - distancia / 1.6
            )
        );

    const z =
        (Math.random() - 0.5)
        * profundidad
        * 1.5;

    heartPositions.push(
        x * 2.2,
        y * 2.2,
        z * 2.2
    );
}

heartGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        heartPositions,
        3
    )
);

// Material de las partículas
const heartMaterial = new THREE.PointsMaterial({
    color: 0xff66cc,
    size: 0.035,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const heart = new THREE.Points(
    heartGeometry,
    heartMaterial
);

heart.position.set(0, 0, 1);

heart.scale.set(
    0.18,
    0.18,
    0.18
);

scene.add(heart);
// Corazón luminoso

// Luz del núcleo
const coreLight = new THREE.PointLight(
    0xff88dd,
    6,
    25
);
coreLight.position.set(0, 0, 0);

scene.add(coreLight);
const ambientGlow = new THREE.PointLight(
    0xaa66ff,
    1.8,
    40
);

ambientGlow.position.set(0, 0, 0);

scene.add(ambientGlow);
// Partículas alrededor del núcleo
const orbitGeometry = new THREE.BufferGeometry();
const orbitPositions = [];

for (let i = 0; i < 300; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.8 + Math.random() * 0.4;

    orbitPositions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.2,
        Math.sin(angle) * radius
    );
}

orbitGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(orbitPositions, 3)
);

const orbitMaterial = new THREE.PointsMaterial({
    color: 0xff66ff,
    size: 0.05,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const orbitParticles = new THREE.Points(
    orbitGeometry,
    orbitMaterial
);

scene.add(orbitParticles);

// AnimaciÃ³n
function animate() {

    requestAnimationFrame(animate);

    // Giro del núcleo
galaxyCore.rotation.y += 0.002;
heart.rotation.x += 0.0003;
// Latido del núcleo
const pulse =
    1 + Math.sin(Date.now() * 0.003) * 0.25;

galaxyCore.scale.set(
    pulse,
    pulse,
    pulse
);

coreGlow.rotation.y += 0.001;

coreGlow.scale.set(
    pulse * 1.5,
    pulse * 1.5,
    pulse * 1.5
);

coreGlow.position.copy(galaxyCore.position);

coreParticles.rotation.y += 0.0015;
coreParticles.rotation.x += 0.0005;

   coreGlow.position.copy(galaxyCore.position);

coreParticles.rotation.y += 0.0015;
coreParticles.rotation.x += 0.0005; 

// Latido del corazón
const heartPulse =
    0.18 + Math.sin(Date.now() * 0.003) * 0.02;

heart.scale.set(
    heartPulse,
    heartPulse,
    heartPulse
);

heart.rotation.y += 0.01;
    // Movimiento de la nebulosa
    nebula.rotation.y += 0.00005;
nebula.rotation.x += 0.00002;
nebula.rotation.z += 0.00001;

backgroundStars.rotation.y += 0.00002;

    // Latido del halo
    glow.scale.set(
        pulse * 1.6,
        pulse * 1.6,
        pulse * 1.6
    );
    
    coreLight.intensity = 3.5 + Math.sin(Date.now() * 0.003) * 1;
    ambientGlow.intensity =
    1.8 + Math.sin(Date.now() * 0.003) * 0.4;

    glow.rotation.y += 0.001;
    galaxyHalo.rotation.y += 0.0003;
galaxyHalo.rotation.x += 0.0001;

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
const showCard = document.getElementById("showCard");

button.onclick = () => {

    button.style.display = "none";

    card.classList.add("open");

};

card.onclick = () => {

    if (button.style.display !== "none") return;

    card.classList.add("minimized");
    showCard.style.display = "block";

};

showCard.onclick = () => {

    card.classList.remove("minimized");
    showCard.style.display = "none";

};
