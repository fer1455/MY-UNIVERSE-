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
    renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000010);
);


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
    color: 0xffccff,
    size: 0.02
});

const stars = new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

scene.add(stars);
// NÃºcleo de la galaxia
const coreGeometry = new THREE.SphereGeometry(0.25, 32, 32);

const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xff66cc
});

const galaxyCore = new THREE.Mesh(coreGeometry, coreMaterial);

scene.add(galaxyCore);

// AnimaciÃ³n
function animate(){

    requestAnimationFrame(animate);

    stars.rotation.y += 0.00012;
stars.rotation.x += 0.0001;

galaxyCore.rotation.y += 0.002;;
    renderer.render(
        scene,
        camera
    );
}

animate();


// BotÃ³n sorpresa

const button = document.getElementById("open");
const message = document.getElementById("message");

button.onclick = () => {
    message.style.display = "block";
};
