// Create a scene
const scene = new THREE.Scene();

// Set up a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3); // Position the camera back from the origin

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Append the renderer to the body

// Create a normal material
const material = new THREE.MeshNormalMaterial();

// Create geometry using BufferGeometry
const geometry = new THREE.BufferGeometry();

// Define the vertices
const vertices = new Float32Array([
    1, 1, 1,   // Vertex A
    -1, -1, 1, // Vertex B
    -1, 1, -1, // Vertex C
    1, -1, -1  // Vertex D
]);

// Define the indices for the faces
const indices = new Uint16Array([
    2, 1, 0, // Face CBA
    0, 3, 2, // Face ADB
    1, 3, 0, // Face BDA
    2, 3, 1  // Face CDB
]);

// Set the attributes
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

// Create a mesh with the geometry and material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // Add the mesh to the scene

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate); // Call animate recursively
    mesh.rotation.x += 0.01; // Rotate the mesh on the x-axis
    mesh.rotation.y += 0.01; // Rotate the mesh on the y-axis
    renderer.render(scene, camera); // Render the scene
}
animate(); // Start the animation loop
