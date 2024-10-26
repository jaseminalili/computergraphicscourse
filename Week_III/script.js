import * as THREE from 'three';
import GSAP from 'gsap'

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial
(
    { 
        color: 0xff0f73
    }
);
const cubemesh = new THREE.Mesh(geometry, material);
const sizes = {
    width: 800,
    height: 600
}
const animate = () => {
    requestAnimationFrame(animate);
    // cubemesh.rotation.x += 0.005;
    cubemesh.rotation.y += 0.01;
    // cubemesh.rotation.z += 0.02;
    renderer.render(scene, camera);
};


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
camera.position.x = 1;

//GSAP ANIMATION
GSAP.to ( cubemesh.position,
    {
        duration: 2,
        x: 2,
        repeat: -1,
        yoyo: true
    }
)

scene.add(camera);
scene.add(cubemesh)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);


animate();

    