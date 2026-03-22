const NPC_APPEARANCES = {
  'Coach Tim': {
    skinColour:    '#f4a460',
    hairColour:    '#888888',
    hairStyle:     'bald',
    kitColour:     '#2255aa',
    kitSecondary:  '#ffffff',
    eyeColour:     '#4a6b3a',
    hasBeard:      true,
  },
  'Soaring Captain': {
    skinColour:    '#c68642',
    hairColour:    '#1a1a1a',
    hairStyle:     'short',
    kitColour:     '#cc2222',
    kitSecondary:  '#000000',
    eyeColour:     '#3a2a1a',
  },
  'River Marshal': {
    skinColour:    '#ffe4c4',
    hairColour:    '#ffaa00',
    hairStyle:     'curly',
    kitColour:     '#ffaa00',
    kitSecondary:  '#ffffff',
    eyeColour:     '#5a8a3a',
  },
  'Ada': {
    skinColour:    '#f4c07a',
    hairColour:    '#4a2a0a',
    hairStyle:     'ponytail',
    kitColour:     '#cc2222',
    kitSecondary:  '#ffffff',
    eyeColour:     '#3a2a1a',
    hairHighlight: '#8B6914',
  },
  'Anaconda Captain': {
    skinColour:    '#c68642',
    hairColour:    '#1a1a1a',
    hairStyle:     'spiky',
    kitColour:     '#6600aa',
    kitSecondary:  '#ffffff',
    eyeColour:     '#1a1a1a',
  },
  'Trent Marshal': {
    skinColour:    '#ffe4c4',
    hairColour:    '#cc8800',
    hairStyle:     'short',
    kitColour:     '#cc8800',
    kitSecondary:  '#ffffff',
    eyeColour:     '#5a3a1a',
    hasBeard:      true,
  },
  'Supporter': {
    skinColour:    '#f4c07a',
    hairColour:    '#2a1a0a',
    hairStyle:     'curly',
    kitColour:     '#cc8800',
    kitSecondary:  '#1a1200',
    eyeColour:     '#3a2a1a',
  },
  'St Neots Captain': {
    skinColour:    '#ffe4c4',
    hairColour:    '#884422',
    hairStyle:     'short',
    kitColour:     '#2255cc',
    kitSecondary:  '#ffffff',
    eyeColour:     '#3a6b8a',
  },
  'Festival MC': {
    skinColour:    '#f4c07a',
    hairColour:    '#1a1a1a',
    hairStyle:     'ponytail',
    kitColour:     '#44cc44',
    kitSecondary:  '#ffffff',
    eyeColour:     '#1a6b1a',
  },
  'Local Fan': {
    skinColour:    '#c68642',
    hairColour:    '#3a2a1a',
    hairStyle:     'long',
    kitColour:     '#2255cc',
    kitSecondary:  '#88ccff',
    eyeColour:     '#3a2a1a',
  },
  'Powerhouse Captain': {
    skinColour:    '#f4a460',
    hairColour:    '#1a1a1a',
    hairStyle:     'bald',
    kitColour:     '#ff6600',
    kitSecondary:  '#ffffff',
    eyeColour:     '#1a1a1a',
    hasBeard:      true,
  },
  'Tees Marshal': {
    skinColour:    '#ffe4c4',
    hairColour:    '#aaaaaa',
    hairStyle:     'short',
    kitColour:     '#888888',
    kitSecondary:  '#ffffff',
    eyeColour:     '#5a5a8a',
    hasBeard:      true,
  },
  'Steel Worker': {
    skinColour:    '#c68642',
    hairColour:    '#2a1a0a',
    hairStyle:     'spiky',
    kitColour:     '#ff9944',
    kitSecondary:  '#1a1a2a',
    eyeColour:     '#3a2a1a',
  },
  'Amathus Captain': {
    skinColour:    '#c68642',
    hairColour:    '#1a1a1a',
    hairStyle:     'short',
    kitColour:     '#cc0000',
    kitSecondary:  '#ffffff',
    eyeColour:     '#1a1a1a',
    hasBeard:      true,
  },
  'Dock Marshal': {
    skinColour:    '#ffe4c4',
    hairColour:    '#4444cc',
    hairStyle:     'curly',
    kitColour:     '#4444cc',
    kitSecondary:  '#ffffff',
    eyeColour:     '#4444cc',
  },
  'Mersey Local': {
    skinColour:    '#f4c07a',
    hairColour:    '#1a1a1a',
    hairStyle:     'long',
    kitColour:     '#6688ff',
    kitSecondary:  '#ffffff',
    eyeColour:     '#3a3a8a',
  },
  'Thames Captain': {
    skinColour:    '#ffe4c4',
    hairColour:    '#888888',
    hairStyle:     'short',
    kitColour:     '#1D9E75',
    kitSecondary:  '#ffffff',
    eyeColour:     '#3a6b3a',
    hasBeard:      true,
  },
  'BDA Official': {
    skinColour:    '#f4c07a',
    hairColour:    '#888888',
    hairStyle:     'bald',
    kitColour:     '#1a1a2a',
    kitSecondary:  '#f0c040',
    eyeColour:     '#3a3a3a',
    hasBeard:      true,
  },
  'Fire Captain':   { skinColour:'#ffe4c4', hairColour:'#ff4400', hairStyle:'spiky', kitColour:'#ff4400', kitSecondary:'#ffffff', eyeColour:'#cc2200' },
  'World Official': { skinColour:'#f4c07a', hairColour:'#1a1a1a', hairStyle:'short', kitColour:'#4488ff', kitSecondary:'#f0c040', eyeColour:'#4488ff' },
  'CGCSA Captain':  { skinColour:'#c68642', hairColour:'#1a1a1a', hairStyle:'short', kitColour:'#cc0000', kitSecondary:'#ffff00', eyeColour:'#1a1a1a' },
  'Local Guide':    { skinColour:'#c68642', hairColour:'#1a1a1a', hairStyle:'long',  kitColour:'#ffaa00', kitSecondary:'#cc0000', eyeColour:'#3a2a1a' },
  'Viking Captain': { skinColour:'#ffe4c4', hairColour:'#ffcc00', hairStyle:'long',  kitColour:'#4488ff', kitSecondary:'#ffffff', eyeColour:'#4488ff', hasBeard:true },
  'IDBF Official':  { skinColour:'#f4c07a', hairColour:'#aaaaaa', hairStyle:'bald',  kitColour:'#1a1a4a', kitSecondary:'#f0c040', eyeColour:'#3a3a3a', hasBeard:true },
};

const DEFAULT_APPEARANCE = {
  skinColour:   '#f4c07a',
  hairColour:   '#3a2a1a',
  kitColour:    '#446688',
  kitSecondary: '#ffffff',
};

function getVenueNPCs() {
  if (STATE.inWorldChamps) {
    const venue = WORLD_VENUES[STATE.currentWorldVenue];
    return venue ? venue.npcs : WORLD_VENUES.duisburg.npcs;
  }
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

    if (nearby && keys[' '] && activeNPCIndex === null &&
        !npc.justPressed) {
      activeNPCIndex = i;
      activeLineIndex = 0;
      npc.justPressed = true;
      AudioManager.playSFX('dialogue');
    } else if (keys[' '] && activeNPCIndex === i &&
               !npc.justPressed) {
      activeLineIndex++;
      if (activeLineIndex >= npc.lines.length) {
        if (npc.name === 'Coach Tim') {
          // Caldecotte first meeting
          if (STATE.currentVenue === 'caldecotte') {
            STATE.metTim = true;
          }
          // London finale debriefs
          if (STATE.currentVenue === 'london') {
            if (STATE.londonStage === 'after200') {
              STATE.londonStage = '200debriefed';
            } else if (STATE.londonStage === 'after500') {
              STATE.londonStage = '500debriefed';
            }
          }
          // World final debriefs
          if (STATE.inWorldChamps &&
              STATE.currentWorldVenue === 'racice') {
            if (STATE.worldFinalStage === 'after200') {
              STATE.worldFinalStage = '200debriefed';
            } else if (STATE.worldFinalStage === 'after500') {
              STATE.worldFinalStage = '500debriefed';
            }
          }
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