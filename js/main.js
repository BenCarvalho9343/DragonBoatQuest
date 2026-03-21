function isWalkable(x, y) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  if (row < 0 || row >= MAP_DATA.length) return false;
  if (col < 0 || col >= MAP_DATA[0].length) return false;
  return MAP_DATA[row][col] !== 0;
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  e.preventDefault();

  if (e.key === ' ') {
    // Tutorial tap
    if (race.showTutorial) {
      race.tap();
      return;
    }

    // Rhythm tap during race
    if (race.active) {
      race.tap();
      return;
    }

    // Return from finished race
    if (race.finished) {
      race.finished = false;
      return;
    }

    // Start race from dock — only if Tim has been spoken to
    // and the race hasn't been done yet
    if (!isDialogueActive()) {
      const onDock = player.x > 64 && player.x < 160 &&
                     player.y > 96 && player.y < 160;
      if (onDock && STATE.metTim && !STATE.racedCaldecotte) {
        race.start();
        return;
      }
      if (onDock && !STATE.metTim) {
        // Nudge player to talk to Tim first
        npcs[0].active = true;
        npcs[0].currentLine = 0;
        return;
      }
    }
  }
});

window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

function update(deltaTime, timestamp) {
  if (race.active) {
    race.update(deltaTime, timestamp, keys);
    return;
  }
  player.update(deltaTime, keys);
  updateNPCs(keys, player);
}

function draw() {
  if (race.active || race.finished || race.showTutorial) {
    race.draw(ctx);
    return;
  }

  ctx.fillStyle = '#1a6b9e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx);
  drawNPCs(ctx);
  player.draw(ctx);
  drawDialogue(ctx);

  const onDock = player.x > 64 && player.x < 160 &&
                 player.y > 96 && player.y < 160;

  if (onDock && STATE.metTim && !STATE.racedCaldecotte) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(80, 8, 320, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ Space ] Race — Secklow vs Soaring Dragons', 240, 21);
  }

  if (onDock && !STATE.metTim) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(80, 8, 320, 20);
    ctx.fillStyle = '#f0c040';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Talk to Coach Tim first', 240, 21);
  }

  if (onDock && STATE.racedCaldecotte) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(80, 8, 320, 20);
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Next race: Loughborough — coming soon', 240, 21);
  }
}

let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  update(deltaTime, timestamp);
  draw();
  requestAnimationFrame(gameLoop);
}

console.log('Dragon Boat Quest loaded!');
requestAnimationFrame(gameLoop);