// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera to view the scene from an angle
camera.position.set(0, 80, 100);
camera.lookAt(0, 0, 0);

// Create the green ground plane
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x7CFC00 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Create road material
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

// Horizontal road
const horizontalRoad = new THREE.Mesh(new THREE.PlaneGeometry(200, 20), roadMaterial);
horizontalRoad.rotation.x = -Math.PI / 2;
horizontalRoad.position.y = 0.1;
scene.add(horizontalRoad);

// Vertical road
const verticalRoad = new THREE.Mesh(new THREE.PlaneGeometry(20, 200), roadMaterial);
verticalRoad.rotation.x = -Math.PI / 2;
verticalRoad.position.y = 0.1;
scene.add(verticalRoad);

// Function to create a building
function createBuilding(color, x, z, width, height, depth) {
    const material = new THREE.MeshBasicMaterial({ color: color });
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const building = new THREE.Mesh(geometry, material);
    building.position.set(x, height / 2, z);
    scene.add(building);
}

// Add buildings
// White buildings (top-left and top-right)
createBuilding(0xffffff, -30, 30, 20, 20, 20);
createBuilding(0xffffff, 30, 30, 20, 20, 20);

// Blue buildings (bottom-left and right-center)
createBuilding(0x0000ff, -30, -30, 40, 20, 20);
createBuilding(0x0000ff, 30, -30, 20, 20, 40);

// OrbitControls for interactive camera movement
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Adjust the scene on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
