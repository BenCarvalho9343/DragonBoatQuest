const NPC_APPEARANCES = {
  'Coach Tim': {
    skinColour:   '#f4a460',
    hairColour:   '#888888',
    kitColour:    '#2255aa',
    kitSecondary: '#ffffff',
  },
  'Soaring Captain': {
    skinColour:   '#c68642',
    hairColour:   '#1a1a1a',
    kitColour:    '#cc2222',
    kitSecondary: '#000000',
  },
  'River Marshal': {
    skinColour:   '#ffe4c4',
    hairColour:   '#ffaa00',
    kitColour:    '#ffaa00',
    kitSecondary: '#ffffff',
  },
  'Ada': {
    skinColour:   '#f4c07a',
    hairColour:   '#4a2a0a',
    kitColour:    '#cc2222',
    kitSecondary: '#ffffff',
  },
  'Anaconda Captain': {
    skinColour:   '#c68642',
    hairColour:   '#1a1a1a',
    kitColour:    '#6600aa',
    kitSecondary: '#ffffff',
  },
  'Trent Marshal': {
    skinColour:   '#ffe4c4',
    hairColour:   '#cc8800',
    kitColour:    '#cc8800',
    kitSecondary: '#ffffff',
  },
  'Supporter': {
    skinColour:   '#f4c07a',
    hairColour:   '#2a1a0a',
    kitColour:    '#cc8800',
    kitSecondary: '#1a1200',
  },
};

const DEFAULT_APPEARANCE = {
  skinColour:   '#f4c07a',
  hairColour:   '#3a2a1a',
  kitColour:    '#446688',
  kitSecondary: '#ffffff',
};

function getVenueNPCs() {
  const venue = VENUES[STATE.currentVenue];
  return venue ? venue.npcs : VENUES.caldecotte.npcs;
}

var activeNPCIndex = null;
var activeLineIndex = 0;

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
    const appearance = NPC_APPEARANCES[npc.name] || DEFAULT_APPEARANCE;
    drawCharacter(ctx, npc.x, npc.y, appearance);

    if (activeNPCIndex !== i) {
      ctx.fillStyle = '#f0c040';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('!', npc.x + 8, npc.y - 6);
    }

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(npc.x - 10, npc.y - 18, 36, 10);
    ctx.fillStyle = '#ffffff';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(npc.name.split(' ')[0], npc.x + 8, npc.y - 10);
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