const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const keys = {};

// Race distance selection
let selectedDistance = '500m';
const distances = ['200m', '500m', '2000m'];

window.addEventListener('keydown', e => {
  keys[e.key] = true;
  e.preventDefault();

  // Z key — bend mechanic
  if (e.key === 'z' || e.key === 'Z') {
    if (race.active && race.distanceMode === '2000m') {
      race.tapBend();
    }
    return;
  }

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

  // Distance selector on dock — Tab cycles through distances
  if (e.key === 'Tab') {
    const venue = VENUES[STATE.currentVenue];
    if (venue) {
      const b = venue.dockBounds;
      const onDock = player.x > b.x1 && player.x < b.x2 &&
                     player.y > b.y1 && player.y < b.y2;
      const alreadyRaced = STATE[venue.raceStateFlag];
      if (onDock && !alreadyRaced) {
        const idx = distances.indexOf(selectedDistance);
        selectedDistance = distances[(idx + 1) % distances.length];
      }
    }
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
        const needsTim = STATE.currentVenue === 'caldecotte' &&
                         !STATE.metTim;

        if (onDock && !alreadyRaced && !needsTim) {
          race.start(selectedDistance);
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
    race.update(deltaTime, timestamp);
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
    const needsTim = STATE.currentVenue === 'caldecotte' &&
                     !STATE.metTim;

    if (onDock && !alreadyRaced && !needsTim) {
      // Distance selector
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(60, 6, 360, 34);
      ctx.strokeStyle = '#f0c040';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(60, 6, 360, 34);

      ctx.fillStyle = '#aaaaaa';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('[ Tab ] change distance    [ Space ] race', 240, 18);

      // Distance options
      distances.forEach((d, i) => {
        const dx = 110 + i * 100;
        const isSelected = d === selectedDistance;
        ctx.fillStyle = isSelected ? '#f0c040' : '#555';
        ctx.font = isSelected ? 'bold 10px monospace' : '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(d, dx, 32);
        if (isSelected) {
          ctx.fillStyle = '#f0c040';
          ctx.fillRect(dx - 12, 34, 24, 2);
        }
      });

     ctx.fillStyle = '#aaaaaa';
      ctx.font = '8px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('vs ' + venue.raceRival, 410, 18);
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