const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

AudioManager.init();

let gameStarted = false;
const keys = {};
let selectedDistance = '500m';
const distances = ['200m', '500m', '2000m'];

function getLondonRaceDistance() {
  if (!STATE.londonStage || STATE.londonStage === null) return '200m';
  if (STATE.londonStage === '200debriefed') return '500m';
  if (STATE.londonStage === '500debriefed') return '2000m';
  return null;
}

function drawStartScreen() {
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, 480, 432);

  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = 'rgba(255,255,255,' + (0.3 + (i % 5) * 0.14) + ')';
    ctx.fillRect((i * 73) % 460 + 10, (i * 47) % 200 + 10, 1, 1);
  }

  ctx.fillStyle = '#8B1A1A';
  ctx.fillRect(180, 140, 120, 16);
  ctx.fillStyle = '#6B0A0A';
  ctx.fillRect(298, 142, 6, 12);
  ctx.fillRect(176, 142, 6, 12);
  for (let p = 0; p < 6; p++) {
    const px = 188 + p * 17;
    ctx.fillStyle = '#8B1A1A';
    ctx.fillRect(px, 130, 4, 10);
    ctx.fillStyle = '#f4c07a';
    ctx.fillRect(px + 1, 127, 3, 4);
  }
  ctx.fillStyle = '#f0c040';
  ctx.fillRect(183, 131, 5, 5);

  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('DRAGON BOAT QUEST', 240, 220);

  ctx.fillStyle = '#aaaaaa';
  ctx.font = '10px monospace';
  ctx.fillText('Secklow Hundred — National League', 240, 240);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px monospace';
  ctx.fillText('Click or tap to start', 240, 290);

  ctx.fillStyle = '#444';
  ctx.font = '8px monospace';
  ctx.fillText('Arrow keys to move  •  Space to interact', 240, 316);
  ctx.fillText('C = crew  •  M = map  •  ` = mute', 240, 330);
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  AudioManager.unlocked = true;
  AudioManager.playTrack(
    AudioManager.getTrackForVenue(STATE.currentVenue)
  );
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', startGame);
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  startGame();
}, { passive: false });

function drawCeremony(ctx) {
  const ending = STATE.getLondonEnding();
  const wins = STATE.getLondonWins();

  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, 480, 432);

  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = 'rgba(255,255,255,' + (0.3 + (i % 5) * 0.14) + ')';
    ctx.fillRect((i * 73) % 460 + 10, (i * 47) % 200 + 10, 1, 1);
  }

  ctx.fillStyle = '#0a1a3a';
  ctx.fillRect(0, 200, 480, 120);

  if (ending === 'champion') {
    ctx.fillStyle = '#f0c040';
    ctx.fillRect(210, 130, 60, 50);
    ctx.fillRect(200, 175, 80, 10);
    ctx.fillRect(220, 185, 40, 15);
    ctx.fillRect(205, 200, 70, 8);
    ctx.fillStyle = '#c0a030';
    ctx.fillRect(195, 140, 15, 30);
    ctx.fillRect(270, 140, 15, 30);
    ctx.fillStyle = '#fff8aa';
    ctx.fillRect(218, 138, 8, 20);
  } else if (ending === 'runnersup') {
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(215, 145, 50, 50);
    ctx.fillStyle = '#a0a0a0';
    ctx.fillRect(220, 150, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('2', 240, 178);
  } else {
    ctx.fillStyle = '#cc2222';
    ctx.fillRect(210, 150, 60, 10);
    ctx.fillStyle = '#2222cc';
    ctx.fillRect(210, 163, 60, 10);
    ctx.fillStyle = '#f0c040';
    ctx.fillRect(210, 176, 60, 10);
  }

  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';

  if (ending === 'champion') {
    ctx.fillText('NATIONAL CHAMPIONS!', 240, 240);
  } else if (ending === 'runnersup') {
    ctx.fillText('NATIONAL RUNNERS-UP', 240, 240);
  } else {
    ctx.fillText('SPIRIT OF THE SPORT', 240, 240);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = '10px monospace';
  ctx.fillText('Secklow Hundred', 240, 258);
  ctx.fillText(wins + '/3 finals won  •  ' +
    STATE.trophyPoints + ' season points', 240, 273);

  const r200 = STATE.london200Result === 'win' ? 'WIN' : 'LOSS';
  const r500 = STATE.london500Result === 'win' ? 'WIN' : 'LOSS';
  const r2k  = STATE.london2000Result === 'win' ? 'WIN' : 'LOSS';

  ctx.font = '9px monospace';
  ctx.fillStyle = STATE.london200Result === 'win' ? '#1D9E75' : '#cc3333';
  ctx.fillText('200m: ' + r200, 240, 295);
  ctx.fillStyle = STATE.london500Result === 'win' ? '#1D9E75' : '#cc3333';
  ctx.fillText('500m: ' + r500, 240, 308);
  ctx.fillStyle = STATE.london2000Result === 'win' ? '#1D9E75' : '#cc3333';
  ctx.fillText('2000m: ' + r2k, 240, 321);

  ctx.fillStyle = '#aaaaaa';
  ctx.font = '8px monospace';
  if (ending === 'champion') {
    ctx.fillText('"I\'ve never been prouder of a crew."', 240, 345);
  } else if (ending === 'runnersup') {
    ctx.fillText('"We\'ll be back. And we\'ll win it."', 240, 345);
  } else {
    ctx.fillText('"This club is going places. Trust me."', 240, 345);
  }

  ctx.fillStyle = '#555';
  ctx.font = '8px monospace';
  ctx.fillText('[ Space ] return to the dock', 240, 380);

  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = 'rgba(255,255,200,0.06)';
    ctx.fillRect(i * 80, 0, 40, 432);
  }
}

window.addEventListener('keydown', e => {
  if (!gameStarted) { startGame(); return; }
  keys[e.key] = true;
  e.preventDefault();

  if (e.key === '`') {
    AudioManager.toggleMute();
    return;
  }

  if (e.key === 'z' || e.key === 'Z') {
    if (race.active && race.distanceMode === '2000m') {
      race.tapBend();
    }
    return;
  }

  if (e.key === 'm' || e.key === 'M') {
    if (!race.active && !race.showTutorial &&
        !isDialogueActive() && !crewScreen.open) {
      const venue = VENUES[STATE.currentVenue];
      const raced = venue && STATE[venue.raceStateFlag];
      if (raced && !venue.isFinale) {
        travelMap.open ? travelMap.close() : travelMap.open_map();
      }
    }
    return;
  }

  if (travelMap.open) {
    travelMap.handleKey(e.key);
    return;
  }

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

  if (crewScreen.open) {
    crewScreen.handleKey(e.key);
    return;
  }

  if (e.key === 'Tab') {
    if (STATE.currentVenue !== 'london') {
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
    }
    return;
  }

  if (e.key === ' ') {
    if (STATE.currentVenue === 'london' &&
        STATE.londonStage === 'complete' &&
        !race.active && !race.finished) {
      STATE.londonStage = 'done';
      STATE.save();
      return;
    }

    if (race.showTutorial) { race.tap(); return; }
    if (race.active) { race.tap(); return; }

    if (race.finished) {
      race.finished = false;
      AudioManager.playTrack(
        AudioManager.getTrackForVenue(STATE.currentVenue)
      );
      return;
    }

    if (!isDialogueActive()) {
      const venue = VENUES[STATE.currentVenue];
      if (!venue) return;

      const b = venue.dockBounds;
      const onDock = player.x > b.x1 && player.x < b.x2 &&
                     player.y > b.y1 && player.y < b.y2;

      if (venue.isFinale) {
        const nextDist = getLondonRaceDistance();
        const needsDebrief =
          STATE.londonStage === 'after200' ||
          STATE.londonStage === 'after500';

        if (onDock && nextDist && !needsDebrief) {
          race.start(nextDist);
          AudioManager.playTrack('race');
          return;
        }
        if (onDock && needsDebrief) {
          activeNPCIndex = 0;
          activeLineIndex = 0;
          return;
        }
        return;
      }

      const alreadyRaced = STATE[venue.raceStateFlag];
      const needsTim = STATE.currentVenue === 'caldecotte' &&
                       !STATE.metTim;

      if (onDock && !alreadyRaced && !needsTim) {
        race.start(selectedDistance);
        AudioManager.playTrack('race');
        return;
      }
      if (onDock && needsTim) {
        activeNPCIndex = 0;
        activeLineIndex = 0;
        return;
      }
    }
  }
});

window.addEventListener('keyup', e => { keys[e.key] = false; });

function update(deltaTime, timestamp) {
  if (!gameStarted) return;
  if (race.active) {
    race.update(deltaTime, timestamp);
    return;
  }
  travelMap.update(deltaTime);
  if (travelMap.open) return;
  if (crewScreen.open) return;
  player.update(deltaTime, keys);
  updateNPCs(keys, player);

  const venue = VENUES[STATE.currentVenue];
  const raced = venue && STATE[venue.raceStateFlag];
  if (raced && venue && !venue.isFinale &&
      isAtMapEdge(player) && !travelMap.open) {
    travelMap.open_map();
  }
}

function draw() {
  if (!gameStarted) {
    drawStartScreen();
    return;
  }

  if (STATE.currentVenue === 'london' &&
      STATE.londonStage === 'complete') {
    AudioManager.playTrack('ceremony');
    drawCeremony(ctx);
    return;
  }

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

    if (venue.isFinale) {
      const nextDist = getLondonRaceDistance();
      const needsDebrief =
        STATE.londonStage === 'after200' ||
        STATE.londonStage === 'after500';
      const complete = STATE.londonStage === 'complete' ||
                       STATE.londonStage === 'done';

      if (onDock && !complete) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(60, 6, 360, 34);
        ctx.strokeStyle = '#f0c040';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(60, 6, 360, 34);

        if (needsDebrief) {
          ctx.fillStyle = '#f0c040';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('Talk to Coach Tim before the next race',
            240, 20);
          const wins = STATE.getLondonWins();
          ctx.fillStyle = '#aaaaaa';
          ctx.font = '8px monospace';
          ctx.fillText(wins + ' final' + (wins !== 1 ? 's' : '') +
            ' won so far', 240, 32);
        } else if (nextDist) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('[ Space ] ' + nextDist +
            ' final — vs Thames Valley Dragons', 240, 20);
          const wins = STATE.getLondonWins();
          ctx.fillStyle = '#aaaaaa';
          ctx.font = '8px monospace';
          ctx.fillText(wins + ' final' + (wins !== 1 ? 's' : '') +
            ' won  •  ' + STATE.trophyPoints + ' season pts', 240, 32);
        }
      }

      if (onDock && complete) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(80, 8, 320, 20);
        ctx.fillStyle = '#1D9E75';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Season complete. Well done Secklow.', 240, 21);
      }

    } else {
      const alreadyRaced = STATE[venue.raceStateFlag];
      const needsTim = STATE.currentVenue === 'caldecotte' &&
                       !STATE.metTim;

      if (onDock && !alreadyRaced && !needsTim) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(60, 6, 360, 34);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(60, 6, 360, 34);
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('[ Tab ] change distance    [ Space ] race',
          240, 18);
        distances.forEach((d, i) => {
          const dx = 110 + i * 100;
          const isSel = d === selectedDistance;
          ctx.fillStyle = isSel ? '#f0c040' : '#555';
          ctx.font = isSel ? 'bold 10px monospace' : '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(d, dx, 32);
          if (isSel) {
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
  }

  const raced = venue && STATE[venue.raceStateFlag];
  if (raced && venue && !venue.isFinale &&
      player.x > 380 && !travelMap.open) {
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
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#333';
    ctx.fillText('[ C ] crew', 8, 424);
    if (raced && venue && !venue.isFinale) {
      ctx.textAlign = 'center';
      ctx.fillStyle = '#333';
      ctx.fillText('[ M ] map', 240, 424);
    }
    ctx.textAlign = 'right';
    ctx.fillStyle = '#222';
    ctx.fillText('[ ` ] mute', 472, 424);
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
requestAnimationFrame(function startLoop() {
  if (!gameStarted) {
    drawStartScreen();
    requestAnimationFrame(startLoop);
  }
});