const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  e.preventDefault();

  // Travel map toggle
  if (e.key === 'm' || e.key === 'M') {
    if (!race.active && !race.showTutorial &&
        !isDialogueActive() && !crewScreen.open) {
      const venue = VENUES[STATE.currentVenue];
      const raced = venue && STATE[venue.raceStateFlag];
      if (raced) {
        travelMap.open ? travelMap.close() : travelMap.open_map();
      }
    }
    return;
  }

  // Travel map navigation
  if (travelMap.open) {
    travelMap.handleKey(e.key);
    return;
  }

  // Crew screen toggle
  if (e.key === 'c' || e.key === 'C') {
    if (!race.active && !race.showTutorial && !isDialogueActive()) {
      crewScreen.open = !crewScreen.open;
      if (!crewScreen.open) {
        crewScreen.selectedIndex = null;
        crewScreen.scrollOffset = 0;
      }
    }
    return;
  }

  // Crew screen navigation
  if (crewScreen.open) {
    crewScreen.handleKey(e.key);
    return;
  }

  // Space actions
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
      const venue = VENUES[STATE.currentVenue];
      if (venue) {
        const b = venue.dockBounds;
        const onDock = player.x > b.x1 && player.x < b.x2 &&
                       player.y > b.y1 && player.y < b.y2;
        const alreadyRaced = STATE[venue.raceStateFlag];
        const needsTim = STATE.currentVenue === 'caldecotte' && !STATE.metTim;

        if (onDock && !alreadyRaced && !needsTim) {
          race.start();
          return;
        }
        if (onDock && needsTim) {
          activeNPCIndex = 0;
          activeLineIndex = 0;
          return;
        }
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
  if (crewScreen.open) return;
  player.update(deltaTime, keys);
  updateNPCs(keys, player);

  // Auto open travel map at right edge
  const venue = VENUES[STATE.currentVenue];
  const raced = venue && STATE[venue.raceStateFlag];
  if (raced && isAtMapEdge(player) && !travelMap.open) {
    travelMap.open_map();
  }
}

function draw() {
  if (race.active || race.finished || race.showTutorial) {
    race.draw(ctx);
    return;
  }

  const venue = VENUES[STATE.currentVenue];
  const bgColour = venue ? venue.bgColour : '#1a6b9e';

  ctx.fillStyle = bgColour;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx);
  drawNPCs(ctx);
  player.draw(ctx);
  drawDialogue(ctx);

  if (venue) {
    const b = venue.dockBounds;
    const onDock = player.x > b.x1 && player.x < b.x2 &&
                   player.y > b.y1 && player.y < b.y2;
    const alreadyRaced = STATE[venue.raceStateFlag];
    const needsTim = STATE.currentVenue === 'caldecotte' && !STATE.metTim;

    if (onDock && !alreadyRaced && !needsTim) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(80, 8, 320, 20);
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('[ Space ] Race — Secklow vs ' + venue.raceRival, 240, 21);
    }
    if (onDock && needsTim) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(80, 8, 320, 20);
      ctx.fillStyle = '#f0c040';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Talk to Coach Tim first', 240, 21);
    }
    if (onDock && alreadyRaced) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(80, 8, 320, 20);
      ctx.fillStyle = '#aaaaaa';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Head right for the travel map', 240, 21);
    }
  }

  // Edge prompt
  const raced = venue && STATE[venue.raceStateFlag];
  if (raced && player.x > 380 && !travelMap.open) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(100, 380, 280, 18);
    ctx.fillStyle = '#f0c040';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Keep going → for travel map', 240, 392);
  }

  crewScreen.draw(ctx);
  travelMap.draw(ctx);

  if (!crewScreen.open && !travelMap.open) {
    ctx.fillStyle = '#333';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('[ C ] crew', 8, 424);
    if (raced) {
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