alert("MAIN.JS ACTUALIZADO");
// Escena
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 10;

// Renderizador
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);


// Crear estrellas
// Crear galaxia espiral
const starsGeometry = new THREE.BufferGeometry();

const starsCount = 8000;
const positions = [];

for (let i = 0; i < starsCount; i++) {

    const radius = Math.random() * 25;

    const branchAngle = (i % 3) * (Math.PI * 2 / 3);

    const spin = radius * 0.25;

    const angle = branchAngle + spin + (Math.random() - 0.5) * 0.8;

    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * (radius * 0.15);
    const z = Math.sin(angle) * radius;

    positions.push(x, y, z);
}


starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        positions,
        3
    )
);


const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.06
});


const stars = new THREE.Points(
    starsGeometry,
    starsMaterial
);


scene.add(stars);


// Núcleo de la galaxia
const coreGeometry = new THREE.SphereGeometry(
    2,
    32,
    32
);

const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2
});


const core = new THREE.Mesh(
    coreGeometry,
    coreMaterial
);


scene.add(core);


// Animación
function animate(){

    requestAnimationFrame(animate);

    stars.rotation.y += 0.001;
    core.rotation.y += 0.01;

    renderer.render(
        scene,
        camera
    );
}


animate();

setTimeout(() => {
    document.getElementById("loading").style.display = "none";
}, 3000);

// Ajuste de pantalla
window.addEventListener(
    "resize",
    () => {

        camera.aspect =
        window.innerWidth /
        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
