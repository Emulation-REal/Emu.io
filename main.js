const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("game")});
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Controls
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener("click", () => controls.lock());
scene.add(controls.getObject());

// Player
const bullets = [];
let health = 100;

// Bots
const bots = [];
function spawnBot(x, z) {
  const bot = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  bot.position.set(x, 1, z);
  bot.health = 100;
  scene.add(bot);
  bots.push(bot);
}

// Spawn multiple bots
for (let i = 0; i < 5; i++) {
  spawnBot(Math.random() * 40 - 20, Math.random() * 40 - 20);
}

// Shoot
window.addEventListener("mousedown", () => {
  const bullet = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
  );
  bullet.position.copy(camera.position);
  bullet.velocity = new THREE.Vector3();
  camera.getWorldDirection(bullet.velocity);
  bullet.velocity.multiplyScalar(1.5);
  scene.add(bullet);
  bullets.push(bullet);
});

// Movement
const keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Movement
  const speed = 0.1;
  if (keys["KeyW"]) controls.moveForward(speed);
  if (keys["KeyS"]) controls.moveForward(-speed);
  if (keys["KeyA"]) controls.moveRight(-speed);
  if (keys["KeyD"]) controls.moveRight(speed);

  // Bullet movement
  bullets.forEach((b, i) => {
    b.position.add(b.velocity);
    // Collision with bots
    bots.forEach(bot => {
      if (b.position.distanceTo(bot.position) < 1 && bot.health > 0) {
        bot.health -= 50;
        scene.remove(b);
        bullets.splice(i, 1);
      }
    });
  });

  // Bot AI
  bots.forEach(bot => {
    if (bot.health <= 0) return scene.remove(bot);

    const dir = new THREE.Vector3().subVectors(controls.getObject().position, bot.position).normalize();
    bot.position.add(dir.multiplyScalar(0.02));

    // "Attack" player
    if (bot.position.distanceTo(controls.getObject().position) < 1.5) {
      health -= 0.1;
      if (health <= 0) alert("You died!");
    }
  });

  renderer.render(scene, camera);
}
animate();
