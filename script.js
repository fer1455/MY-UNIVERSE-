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

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

// =======================
// FONDO
// =======================

scene.background = new THREE.Color(0x000010);

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

    renderer.render(
        scene,
        camera
    );

}

animate();
