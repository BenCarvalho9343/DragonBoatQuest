function isWalkable(x, y) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  if (row < 0 || row >= MAP_DATA.length) return false;
  if (col < 0 || col >= MAP_DATA[0].length) return false;
  return MAP_DATA[row][col] !== 0;
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.setAttribute('tabindex', '0');
canvas.focus();

ctx.imageSmoothingEnabled = false;

const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  e.preventDefault();
});
window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

function update(deltaTime) {
  player.update(deltaTime, keys);
  updateNPCs(keys, player);
}

function draw() {
  ctx.fillStyle = '#1a6b9e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx);
  drawNPCs(ctx);
  player.draw(ctx);
  drawDialogue(ctx);
}

let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  update(deltaTime);
  draw();
  requestAnimationFrame(gameLoop);
}

console.log('Dragon Boat Quest loaded!');
requestAnimationFrame(gameLoop);