function getVenueNPCs() {
  const venue = VENUES[STATE.currentVenue];
  return venue ? venue.npcs : VENUES.caldecotte.npcs;
}

let activeNPCIndex = null;
let activeLineIndex = 0;

function updateNPCs(keys, player) {
  const npcs = getVenueNPCs();

  npcs.forEach((npc, i) => {
    const dx = Math.abs(player.x - npc.x);
    const dy = Math.abs(player.y - npc.y);
    const nearby = dx < 24 && dy < 24;

    if (nearby && keys[' '] && activeNPCIndex === null && !npc.justPressed) {
      activeNPCIndex = i;
      activeLineIndex = 0;
      npc.justPressed = true;
    } else if (keys[' '] && activeNPCIndex === i && !npc.justPressed) {
      activeLineIndex++;
      if (activeLineIndex >= npc.lines.length) {
        if (npc.name === 'Coach Tim') {
          STATE.metTim = true;
          STATE.save();
        }
        activeNPCIndex = null;
        activeLineIndex = 0;
      }
      npc.justPressed = true;
    }

    if (!keys[' ']) npc.justPressed = false;
  });
}

function drawNPCs(ctx) {
  const npcs = getVenueNPCs();
  npcs.forEach((npc, i) => {
    ctx.fillStyle = npc.colour;
    ctx.fillRect(npc.x, npc.y, 16, 16);
    if (activeNPCIndex !== i) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('!', npc.x + 8, npc.y - 4);
    }
  });
}

function drawDialogue(ctx) {
  if (activeNPCIndex === null) return;
  const npcs = getVenueNPCs();
  const npc = npcs[activeNPCIndex];
  if (!npc) return;

  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(8, 380, 464, 44);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 380, 464, 44);
  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(npc.name, 16, 394);
  ctx.fillStyle = '#ffffff';
  ctx.font = '10px monospace';
  ctx.fillText(npc.lines[activeLineIndex], 16, 410);
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText('[ Space ] continue', 16, 420);
}

function isDialogueActive() {
  return activeNPCIndex !== null;
}