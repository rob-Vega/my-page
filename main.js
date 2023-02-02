import * as THREE from "three";
import normal from "./img/textures/normal.jpg";

// GUI
// import * as dat from "dat.gui";

// Debug
// const gui = new dat.GUI();

// Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load(normal);

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 0;

renderer.render(scene, camera);

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);

// Lights
const pointLightOne = new THREE.PointLight(0xff0000, 2);
pointLightOne.position.x = 15;
pointLightOne.position.y = -15;
pointLightOne.position.z = -30;
scene.add(pointLightOne);

const pointLightTwo = new THREE.PointLight(0x00fffff, 10);
pointLightTwo.position.x = -15;
pointLightTwo.position.y = 15;
pointLightTwo.position.z = -30;
scene.add(pointLightTwo);

const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x2b2b2b,
  normalMap: normalTexture,
  roughness: 0.4,
  metalness: 1,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.z = -30;
scene.add(sphere);

window.addEventListener("scroll", () => {
  const top = document.body.getBoundingClientRect().top;

  camera.position.z = top * +0.008;
  camera.position.y = top * -0.0005;
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.x = 0.09 * elapsedTime;

  renderer.render(scene, camera);
}

animate();
