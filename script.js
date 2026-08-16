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

const galaxyMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uColor: {
            value: new THREE.Color(0xfb3fff)
        }
    },

    vertexShader: `
        void main() {

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            float variation = 0.7 +
                fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453) * 1.3;

            gl_PointSize = variation * 1.8;

            gl_Position = projectionMatrix * mvPosition;
        }
    `,

    fragmentShader: `
        uniform vec3 uColor;

        void main() {

            float distanceToCenter = distance(
                gl_PointCoord,
                vec2(0.5)
            );

            if (distanceToCenter > 0.5) discard;

            float glow = 1.0 - distanceToCenter * 2.0;

            gl_FragColor = vec4(
                uColor,
                glow * 0.9
            );
        }
    `,

    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
const stars = new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

scene.add(stars);
// Polvo estelar
const dustGeometry = new THREE.BufferGeometry();
const dustPositions = [];

for (let i = 0; i < 5000; i++) {

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 14;

    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 1.5;
    const z = Math.sin(angle) * radius;

    dustPositions.push(x, y, z);
}

dustGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dustPositions, 3)
);

const dustMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.025,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const dust = new THREE.Points(
    dustGeometry,
    dustMaterial
);

scene.add(dust);
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
/// Estrellas de fondo
const bgGeometry = new THREE.BufferGeometry();
const bgPositions = [];

for (let i = 0; i < 3000; i++) {

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 45 + Math.random() * 35;

    bgPositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
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
    blending: THREE.AdditiveBlending
});

const backgroundStars = new THREE.Points(
    bgGeometry,
    bgMaterial
);

scene.add(backgroundStars);

backgroundStars.rotation.x = 0.2;
backgroundStars.rotation.z = 0.1;

// Núcleo de la galaxia
const coreGeometry = new THREE.SphereGeometry(0.25, 32, 32);

const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xff66cc
});

const galaxyCore = new THREE.Mesh(
    coreGeometry,
    coreMaterial
);

scene.add(galaxyCore);

// Brillo del núcleo
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

// Mantener el corazón visible delante del núcleo
heart.renderOrder = 10;

if (heart.material) {
    heart.material.depthTest = false;
    heart.material.depthWrite = false;
}
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

    nebula.rotation.y += 0.00005;
nebula.rotation.x += 0.00002;
nebula.rotation.z += 0.00001;

    nebula.position.x = Math.sin(Date.now() * 0.0003) * 0.08;
nebula.position.y = Math.cos(Date.now() * 0.00025) * 0.05;

    requestAnimationFrame(animate);
const twinkle = 0.75 + Math.sin(Date.now() * 0.003) * 0.25;

stars.material.opacity = twinkle;
    
    stars.rotation.y += 0.0008;

    // Giro del núcleo
galaxyCore.rotation.y += 0.002;
// Latido del núcleo
const pulse =
    1 + Math.sin(Date.now() * 0.003) * 0.25;

galaxyCore.scale.set(
    pulse,
    pulse,
    pulse
);

    // Halo luminoso del corazón
const haloPulse =
    1 + Math.sin(Date.now() * 0.003) * 0.18;

coreGlow.scale.set(
    haloPulse * 1.5,
    haloPulse * 1.5,
    haloPulse * 1.5
);

coreGlow.material.opacity =
    0.12 + Math.sin(Date.now() * 0.003) * 0.05;

    // Destello suave del núcleo
const coreShine =
    0.5 + Math.sin(Date.now() * 0.003) * 0.15;

galaxyCore.material.opacity = coreShine;

// Giro orgánico del halo
coreGlow.rotation.y +=
    0.001 + Math.sin(Date.now() * 0.0005) * 0.0001;;

coreGlow.scale.set(
    pulse * 1.5,
    pulse * 1.5,
    pulse * 1.5
);

    // Brillo suave del halo del núcleo
const glowOpacity =
    0.14 + Math.sin(Date.now() * 0.0025) * 0.04;

coreGlow.material.opacity = glowOpacity;

    // Respiración suave del halo
const glowBreath =
    1 + Math.sin(Date.now() * 0.0018) * 0.04;

coreGlow.scale.set(
    pulse * 1.5 * glowBreath,
    pulse * 1.5 * glowBreath,
    pulse * 1.5 * glowBreath
);

coreGlow.position.copy(galaxyCore.position);

    // Oscilación suave del halo
coreGlow.position.y =
    galaxyCore.position.y +
    Math.sin(Date.now() * 0.0007) * 0.025;

    // Oscilación lateral suave del halo
coreGlow.position.x =
    galaxyCore.position.x +
    Math.cos(Date.now() * 0.0006) * 0.025;

    // Oscilación de profundidad del halo
coreGlow.position.z =
    galaxyCore.position.z +
    Math.sin(Date.now() * 0.0005) * 0.02;

// Giro orbital orgánico de las partículas
coreParticles.rotation.y +=
    0.0015 + Math.sin(Date.now() * 0.0005) * 0.0003;
// Giro orgánico en X de las partículas
coreParticles.rotation.x +=
    0.0005 + Math.cos(Date.now() * 0.0006) * 0.0001;

// Giro orgánico en Z de las partículas
coreParticles.rotation.z +=
    0.0002 + Math.cos(Date.now() * 0.0008) * 0.00008;
    
// Flotación suave de las partículas del núcleo
coreParticles.position.y =
    Math.sin(Date.now() * 0.0004) * 0.025;

    // Movimiento orbital suave de las partículas
const orbitTime = Date.now();

coreParticles.position.x =
    Math.cos(orbitTime * 0.00035) * 0.025;

coreParticles.position.y =
    Math.sin(orbitTime * 0.00035) * 0.025;

// Movimiento de profundidad de las partículas del núcleo
coreParticles.position.z =
    Math.sin(Date.now() * 0.0003) * 0.025 +
    Math.cos(Date.now() * 0.0007) * 0.008;
// Brillo suave de las partículas del núcleo
const coreParticleGlow =
    0.65 + Math.sin(Date.now() * 0.002) * 0.25;

    // Tamaño pulsante de las partículas del núcleo
const coreParticleSize =
    0.045 + Math.sin(Date.now() * 0.0025) * 0.01;

coreParticles.material.size = coreParticleSize;

    // Respiración luminosa de las partículas
const particleBreath =
    0.85 + Math.sin(Date.now() * 0.0017) * 0.15;

// Destello suave de las partículas
const particleTwinkle =
    0.9 + Math.sin(Date.now() * 0.005) * 0.1;

coreParticles.material.opacity =
    coreParticleGlow * particleBreath * particleTwinkle;

    // Cambio suave de color de las partículas
const colorShift =
    (Math.sin(Date.now() * 0.0004) + 1) / 2;

coreParticles.material.color.setHSL(
    0.82 + colorShift * 0.08,
    1,
    0.65
);

// Expansión y pulso de las partículas del núcleo
const coreOrbitPulse =
    1 + Math.sin(Date.now() * 0.0008) * 0.035;

const particleWave =
    1 + Math.sin(Date.now() * 0.0011) * 0.015;

const finalParticleScale =
    coreOrbitPulse * particleWave;

coreParticles.scale.set(
    finalParticleScale,
    finalParticleScale,
    finalParticleScale
);

// Latido del corazón
// const heartPulse =
//     0.18 + Math.sin(Date.now() * 0.003) * 0.02;

// heart.scale.set(
//     heartPulse,
//     heartPulse,
//     heartPulse
// );

heart.rotation.y += 0.01;

    // Inclinación suave en X
heart.rotation.x =
    Math.sin(Date.now() * 0.001) * 0.05;

    // Inclinación suave del corazón
heart.rotation.z =
    Math.sin(Date.now() * 0.0012) * 0.08;

    // Brillo suave del corazón
const heartGlow =
    0.75 + Math.sin(Date.now() * 0.0025) * 0.15;

heart.material.opacity = heartGlow;

    // Respiración suave de las partículas del corazón
const heartParticlePulse =
    0.035 + Math.sin(Date.now() * 0.002) * 0.004;

heart.material.size = heartParticlePulse;

    // Movimiento de la nebulosa
    // Giro orgánico de la nebulosa
nebula.rotation.y +=
    0.00005 + Math.sin(Date.now() * 0.0004) * 0.00001;
    
// Inclinación orgánica de la nebulosa
nebula.rotation.x +=
    0.00002 + Math.cos(Date.now() * 0.00035) * 0.000008;

// Giro orgánico en Z de la nebulosa
nebula.rotation.z +=
    0.00001 + Math.sin(Date.now() * 0.0005) * 0.000004;
    // Oscilación suave de la nebulosa
nebula.rotation.z =
    Math.sin(Date.now() * 0.0002) * 0.02;

// Movimiento orgánico de la nebulosa en X
const nebulaTime = Date.now();

nebula.position.x =
    Math.sin(nebulaTime * 0.0003) * 0.08 +
    Math.cos(nebulaTime * 0.0007) * 0.015;
    
nebula.position.y = Math.cos(Date.now() * 0.00025) * 0.05;

    // Oscilación lateral suave de la nebulosa
nebula.position.z =
    Math.sin(Date.now() * 0.0002) * 0.04;

    // Respiración orgánica de la nebulosa
const nebulaPulse =
    1 + Math.sin(Date.now() * 0.00035) * 0.025;

const nebulaWave =
    1 + Math.cos(Date.now() * 0.0006) * 0.01;

const nebulaScale =
    nebulaPulse * nebulaWave;

nebula.scale.set(
    nebulaScale,
    nebulaScale,
    nebulaScale
);

    // Brillo orgánico de la nebulosa
const nebulaGlow =
    0.65 + Math.sin(Date.now() * 0.0012) * 0.15;

const nebulaShimmer =
    1 + Math.cos(Date.now() * 0.002) * 0.08;

nebula.material.opacity =
    nebulaGlow * nebulaShimmer;
    
    dust.rotation.y += 0.00008;
    
dust.rotation.x += 0.00002;

// Giro suave del polvo en Z
dust.rotation.z += 0.000015;
    
    // Movimiento vertical del polvo
dust.position.y = Math.sin(Date.now() * 0.0004) * 0.03;

// Movimiento lateral del polvo
dust.position.x =
    Math.cos(Date.now() * 0.0003) * 0.04;

   // Movimiento suave de profundidad del polvo
dust.position.z =
    Math.sin(Date.now() * 0.00025) * 0.02; 

    // Respiración suave del polvo
const dustScale =
    1 + Math.sin(Date.now() * 0.0005) * 0.015;

dust.scale.set(
    dustScale,
    dustScale,
    dustScale
);

    // Movimiento suave de la cámara
camera.position.x =
    Math.sin(Date.now() * 0.00015) * 0.03;

camera.position.y =
    Math.cos(Date.now() * 0.00012) * 0.02;

    // Balanceo suave de la cámara
camera.rotation.z =
    Math.sin(Date.now() * 0.00012) * 0.003;

    // Parpadeo suave de las estrellas de fondo
const starPulse =
    0.85 + Math.sin(Date.now() * 0.002) * 0.15;

backgroundStars.material.opacity = starPulse;

    // Respiración suave de las estrellas
const backgroundPulse =
    1 + Math.sin(Date.now() * 0.0004) * 0.015;

backgroundStars.scale.set(
    backgroundPulse,
    backgroundPulse,
    backgroundPulse
);

    // Pulso muy suave de las estrellas
const starsSizePulse =
    1 + Math.sin(Date.now() * 0.0007) * 0.02;

backgroundStars.material.size =
    0.04 * starsSizePulse;

    // Movimiento suave de profundidad de las estrellas
backgroundStars.position.z =
    Math.sin(Date.now() * 0.00012) * 0.05;

    // Giro suave de las estrellas de fondo
backgroundStars.rotation.z += 0.00001;

    // Balanceo suave de las estrellas
backgroundStars.rotation.x =
    Math.sin(Date.now() * 0.0001) * 0.03;

    // Balanceo suave en Y de las estrellas
backgroundStars.rotation.y =
    Math.cos(Date.now() * 0.00012) * 0.03;

    // Movimiento de profundidad del polvo
dust.position.z =
    Math.sin(Date.now() * 0.00025) * 0.03;

nebula.scale.set(
    nebulaPulse,
    nebulaPulse,
    nebulaPulse
);

    // Movimiento vertical adicional de la nebulosa
nebula.position.y +=
    Math.sin(Date.now() * 0.00015) * 0.02;

// Desplazamiento horizontal suave de la nebulosa
nebula.position.x =
    Math.sin(Date.now() * 0.0002) * 0.12;
                                 
    // Rotación suave de la galaxia
stars.rotation.y += 0.00012;
stars.rotation.x += 0.00002;

    // Movimiento suave de las estrellas
stars.rotation.z = Math.sin(Date.now() * 0.0002) * 0.03;
stars.position.y = Math.sin(Date.now() * 0.0003) * 0.04;

    // Movimiento de profundidad de las estrellas
stars.position.z =
    Math.sin(Date.now() * 0.00025) * 0.06;

    // Ondulación suave de la galaxia
stars.rotation.y +=
    Math.sin(Date.now() * 0.00015) * 0.00002;

    // Parpadeo suave de las estrellas
const starGlow =
    0.75 + Math.sin(Date.now() * 0.002) * 0.15;

stars.material.opacity = starGlow;

    // Movimiento suave de profundidad
stars.position.z = Math.sin(Date.now() * 0.00025) * 0.04;
    // Brillo del polvo estelar
dust.material.opacity =
    0.25 + Math.sin(Date.now() * 0.0015) * 0.10;
    
    backgroundStars.rotation.y += 0.001;
    backgroundStars.rotation.x += 0.0001;

    backgroundStars.material.opacity =
    0.8 + Math.sin(Date.now() * 0.001) * 0.2;

    backgroundStars.position.z = Math.sin(Date.now() * 0.0002) * 2;
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

    // Movimiento suave del halo
glow.rotation.z += 0.00002;
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
