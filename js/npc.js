const npcs = [
  {
    name: 'Coach Tim',
    x: 80,
    y: 112,
    width: 16,
    height: 16,
    colour: '#4a90d9',

    get lines() {
      // Before meeting Tim
      if (!STATE.metTim) {
        return [
          "Welcome to Secklow Hundred.",
          "We haven't finished top three in four years.",
          "You're going to help fix that. Probably.",
          "Head to the dock and press Space to race.",
          "Tap Space in time with the beat to power the boat.",
          "Good luck. You'll need it.",
        ];
      }
      // After race — win
      if (STATE.racedCaldecotte && STATE.caldecotteResult === 'win') {
        return [
          "Not bad. Not bad at all.",
          "Soaring Dragons won't be happy about that.",
          "We earned " + STATE.trophyPoints + " trophy points.",
          "Loughborough is next. River Soar — tricky current.",
          "Get some rest. Thursday, six AM.",
        ];
      }
      // After race — loss
      if (STATE.racedCaldecotte && STATE.caldecotteResult === 'loss') {
        return [
          "We lost. But we finished.",
          "Soaring Dragons are good. We need to be better.",
          "Still earned " + STATE.trophyPoints + " points for showing up.",
          "Loughborough is next. River Soar — tricky current.",
          "We'll be ready this time.",
        ];
      }
      // Met Tim but hasn't raced yet
      return [
        "The dock is just south of here.",
        "Press Space when you're on it to start the race.",
        "Don't overthink it. Just feel the beat.",
      ];
    },

    currentLine: 0,
    active: false,
  }
];
function updateNPCs(keys, player) {
  npcs.forEach(npc => {
    const dx = Math.abs(player.x - npc.x);
    const dy = Math.abs(player.y - npc.y);
    const nearby = dx < 24 && dy < 24;

    if (nearby && keys[' '] && !npc.justPressed) {
      if (!npc.active) {
        npc.active = true;
        npc.currentLine = 0;
      } else {
        npc.currentLine++;
        if (npc.currentLine >= npc.lines.length) {
          npc.active = false;
          npc.currentLine = 0;
          // Mark Tim as met after finishing his dialogue
          if (npc.name === 'Coach Tim') {
            STATE.metTim = true;
            STATE.save();
          }
        }
      }
      npc.justPressed = true;
    }

    if (!keys[' ']) {
      npc.justPressed = false;
    }
  });
}

function drawNPCs(ctx) {
  npcs.forEach(npc => {
    ctx.fillStyle = npc.colour;
    ctx.fillRect(npc.x, npc.y, npc.width, npc.height);

    // Only show ! if not yet met
    if (npc.name === 'Coach Tim' && !STATE.metTim) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('!', npc.x + 8, npc.y - 4);
    }
  });
}

function drawDialogue(ctx) {
  const activeNPC = npcs.find(npc => npc.active);
  if (!activeNPC) return;

  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(8, 380, 464, 44);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 380, 464, 44);
  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(activeNPC.name, 16, 394);
  ctx.fillStyle = '#ffffff';
  ctx.font = '10px monospace';
  ctx.fillText(activeNPC.lines[activeNPC.currentLine], 16, 410);
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText('[ Space ] continue', 16, 420);
}

function isDialogueActive() {
  return npcs.some(npc => npc.active);
}