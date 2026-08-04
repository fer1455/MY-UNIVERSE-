alert("SCRIPT.JS FUNCIONANDO");

// Escena
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;


// Render
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("galaxy"),
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


// Estrellas
const geometry = new THREE.BufferGeometry();

const vertices = [];

for(let i = 0; i < 2000; i++){

    vertices.push(
        (Math.random()-0.5)*20,
        (Math.random()-0.5)*20,
        (Math.random()-0.5)*20
    );

}

geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices,3)
);


const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.03
});


const stars = new THREE.Points(
    geometry,
    material
);

scene.add(stars);


// Animación
function animate(){

    requestAnimationFrame(animate);

    stars.rotation.y += 0.001;

    renderer.render(
        scene,
        camera
    );
}

animate();


// Botón sorpresa

const button = document.getElementById("open");
const message = document.getElementById("message");

button.onclick = () => {
    message.style.display = "block";
};
