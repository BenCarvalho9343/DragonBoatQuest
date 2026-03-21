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

  // Travel map
  if (e.key === 'm' || e.key === 'M') {
    if (!race.active && !race.showTutorial &&
        !isDialogueActive() && !crewScreen.open &&
        STATE.racedCaldecotte) {
      if (travelMap.open) {
        travelMap.close();
      } else {
        travelMap.open_map();
      }
    }
    return;
  }

  // Pass keys to travel map if open
  if (travelMap.open) {
    travelMap.handleKey(e.key);
    return;
  }

  // Crew screen
  if (e.key === 'c' || e.key === 'C') {
    if (!race.active && !race.showTutorial && !isDialogueActive()) {
      crewScreen.open = !crewScreen.open;
    }
    return;
  }

  // Crew screen navigation
  if (crewScreen.open) {
    crewScreen.handleKey(e.key);
    return;
  }

  if (e.key === ' ') {
    if (race.showTutorial) {
      race.tap();
      return;
    }
    if (race.active) {
      race.tap();
      return;
    }
    if (race.finished) {
      race.finished = false;
      return;
    }
    if (!isDialogueActive()) {
      const onDock = player.x > 64 && player.x < 160 &&
                     player.y > 96 && player.y < 160;
      if (onDock && STATE.metTim && !STATE.racedCaldecotte) {
        race.start();
        return;
      }
      if (onDock && !STATE.metTim) {
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
  travelMap.update(deltaTime);
  if (travelMap.open) return;
  player.update(deltaTime, keys);
  updateNPCs(keys, player);

  // Auto open travel map at right edge after race
  if (STATE.racedCaldecotte && isAtMapEdge(player) &&
      !travelMap.open && !crewScreen.open) {
    travelMap.open_map();
  }
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
    ctx.fillText('Next race: Loughborough — head right for map', 240, 21);
  }

  // Edge prompt
  if (STATE.racedCaldecotte && player.x > 380 && !travelMap.open) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(100, 380, 280, 18);
    ctx.fillStyle = '#f0c040';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Keep going → to open travel map', 240, 392);
  }

  crewScreen.draw(ctx);
  travelMap.draw(ctx);

  // HUD hints
  if (!crewScreen.open && !travelMap.open) {
    ctx.fillStyle = '#333';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('[ C ] crew', 8, 424);
    if (STATE.racedCaldecotte) {
      ctx.textAlign = 'right';
      ctx.fillText('[ M ] map', 472, 424);
    }
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