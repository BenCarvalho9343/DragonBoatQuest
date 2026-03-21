const npcs = [
  {
    name: 'Coach Tim',
    x: 80,
    y: 112,
    width: 16,
    height: 16,
    colour: '#4a90d9',
    lines: [
      "Welcome to Secklow Hundred.",
      "We haven't finished top three in four years.",
      "You're going to help fix that. Probably.",
    ],
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
    // Draw NPC as a coloured square
    ctx.fillStyle = npc.colour;
    ctx.fillRect(npc.x, npc.y, npc.width, npc.height);

    // Draw a small indicator above their head when player is nearby
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('!', npc.x + 8, npc.y - 4);
  });
}

function drawDialogue(ctx) {
  const activeNPC = npcs.find(npc => npc.active);
  if (!activeNPC) return;

  // Dialogue box background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fillRect(8, 380, 464, 44);

  // Border
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 380, 464, 44);

  // Speaker name
  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(activeNPC.name, 16, 394);

  // Dialogue line
  ctx.fillStyle = '#ffffff';
  ctx.font = '10px monospace';
  ctx.fillText(activeNPC.lines[activeNPC.currentLine], 16, 410);

  // Continue prompt
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText('[ Space ] continue', 16, 420);
}

function isDialogueActive() {
  return npcs.some(npc => npc.active);
}