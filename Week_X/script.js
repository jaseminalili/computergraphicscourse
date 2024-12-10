import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

cube.position.z = 2;
sphere.castShadow = true;
plane.receiveShadow = true;

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere);
scene.add(plane);
scene.add(cube);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.radius = 10;
scene.add(directionalLight);

const sizes = { width: 800, height: 600 };

const spotLight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(sizes.width, sizes.height);

document.getElementById("scene").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Fog Functions
function applyLinearFog() {
    scene.fog = new THREE.Fog('#262837', 1, 5); // Color, near, far
    console.log("Linear Fog Applied");
}

function applyExponentialFog() {
    scene.fog = new THREE.FogExp2('#262837', 0.4); // Color, density
    console.log("Exponential Fog Applied");
}

// Call the desired fog type (Uncomment one)
// applyLinearFog();       // Linear Fog
applyExponentialFog(); // Exponential Fog

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Sphere Animation: Bounce up and down
    sphere.position.y = 0.5 + Math.abs(Math.sin(elapsedTime)) * 1;

    // Cube Animation: Rotate around Y-axis
    cube.rotation.y += 0.02;
    cube.position.x = Math.sin(elapsedTime) * 2; // Move left to right

    // Plane Animation: Slight tilting effect
    plane.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
