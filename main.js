let scene, camera, renderer, controls;
let bullets = [];
let bots = [];
let health = 100;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");

startBtn.onclick = () => {
  startScreen.style.display = "none";
  initGame();
  animate();
};

function initGame() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202020);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("game") });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Controls
  controls = new THREE.PointerLockControls(camera, document.body);
  document.body.addEventListener("click", () => controls.lock());
  scene.add(controls.getObject());

  // 3D Gun (Simple Box for Now)
  const gun = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.2, 1),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
  );
  gun.position.set(0.5, -0.5, -1);
  camera.add(gun);

  // Spawn Bots
  for (let i = 0; i < 5; i++) {
    spawnBot(Math.random() * 60 - 30, Math.random() * 60 - 30);
  }

  // Input
  window.addEventListener("mousedown", shoot);

  const keys = {};
  document.addEventListener("keydown", e => keys[e.code] = true);
  document.addEventListener("keyup", e => keys[e.code] = false);

  function updateMovement() {
    const speed = 0.1;
    if (keys["KeyW"]) controls.moveForward(speed);
    if (keys["KeyS"]) controls.moveForward(-speed);
    if (keys["KeyA"]) controls.moveRight(-speed);
    if (keys["KeyD"]) controls.moveRight(speed);
  }

  function updateBullets() {
    bullets.forEach((b, i) => {
      b.position.add(b.velocity);
      bots.forEach(bot => {
        if (bot.health > 0 && b.position.distanceTo(bot.position) < 1) {
          bot.health -= 50;
          scene.remove(b);
          bullets.splice(i, 1);
        }
      });
    });
  }

  function updateBots() {
    bots.forEach(bot => {
      if (bot.health <= 0) {
        scene.remove(bot);
        return;
      }
      const dir = new THREE.Vector3().subVectors(controls.getObject().position, bot.position).normalize();
      bot.position.add(dir.multiplyScalar(0.03));
      if (bot.position.distanceTo(controls.getObject().position) < 1.5) {
        health -= 0.05;
        if (health <= 0) {
          alert("Game Over! You died.");
          location.reload();
        }
      }
    });
  }

  window.gameLoop = () => {
    updateMovement();
    updateBullets();
    updateBots();
    renderer.render(scene, camera);
  };
}

function animate() {
  requestAnimationFrame(animate);
  if (window.gameLoop) window.gameLoop();
}

function shoot() {
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
}

function spawnBot(x, z) {
  const bot = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.5, 1, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0xff4444 })
  );
  bot.position.set(x, 1, z);
  bot.health = 100;
  scene.add(bot);
  bots.push(bot);
}
