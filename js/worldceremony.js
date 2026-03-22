function drawWorldCeremony(ctx) {
  const ending = STATE.getWorldEnding();
  const wins = STATE.getWorldWins();

  ctx.fillStyle = '#020210';
  ctx.fillRect(0, 0, 480, 432);

  // Stars — more dramatic than London
  for (let i = 0; i < 80; i++) {
    const brightness = 0.2 + (i % 7) * 0.1;
    ctx.fillStyle = 'rgba(255,255,255,' + brightness + ')';
    ctx.fillRect((i * 47) % 470 + 5,
      (i * 31) % 300 + 5, i % 3 === 0 ? 2 : 1,
      i % 3 === 0 ? 2 : 1);
  }

  // Water reflection
  ctx.fillStyle = '#0a1a3a';
  ctx.fillRect(0, 210, 480, 100);

  // Podium
  if (ending === 'champion') {
    // Gold podium — centre top
    ctx.fillStyle = '#f0c040';
    ctx.fillRect(190, 155, 100, 60);
    ctx.fillStyle = '#c0a030';
    ctx.fillRect(190, 155, 100, 5);
    ctx.fillStyle = '#fff8aa';
    ctx.fillRect(196, 161, 10, 20);

    // Trophy
    ctx.fillStyle = '#f0c040';
    ctx.fillRect(220, 120, 40, 35);
    ctx.fillRect(210, 150, 60, 8);
    ctx.fillRect(225, 158, 30, 10);
    ctx.fillRect(215, 168, 50, 5);
    ctx.fillStyle = '#c0a030';
    ctx.fillRect(208, 128, 12, 22);
    ctx.fillRect(260, 128, 12, 22);
    ctx.fillStyle = '#fff8aa';
    ctx.fillRect(228, 126, 6, 16);

    // Union Jack on podium
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(215, 170, 50, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(215, 183, 50, 4);
    ctx.fillRect(237, 170, 6, 30);
    ctx.fillStyle = '#0000cc';
    ctx.fillRect(219, 170, 38, 12);
    ctx.fillRect(219, 188, 38, 12);

    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WORLD CHAMPIONS!', 240, 250);

  } else if (ending === 'silver') {
    // Silver medal
    ctx.fillStyle = '#c0c0c0';
    ctx.beginPath();
    ctx.arc(240, 160, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a0a0a0';
    ctx.beginPath();
    ctx.arc(240, 160, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('2', 240, 168);

    ctx.fillStyle = '#c0c0c0';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WORLD SILVER MEDALLISTS', 240, 250);

  } else {
    // Spirit ribbon — three colours
    ctx.fillStyle = '#cc2222';
    ctx.fillRect(200, 145, 80, 14);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(200, 161, 80, 14);
    ctx.fillStyle = '#2244cc';
    ctx.fillRect(200, 177, 80, 14);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('COMPETED WITH HONOUR', 240, 250);
  }

  // Club name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Secklow Hundred', 240, 270);

  ctx.fillStyle = '#aaaaaa';
  ctx.font = '9px monospace';
  ctx.fillText('Great Britain', 240, 284);

  // Results breakdown
  const r200 = STATE.worldFinal200Result === 'win' ? 'WIN' : 'LOSS';
  const r500 = STATE.worldFinal500Result === 'win' ? 'WIN' : 'LOSS';
  const r2k  = STATE.worldFinal2000Result === 'win' ? 'WIN' : 'LOSS';

  ctx.font = '9px monospace';
  ctx.fillStyle = STATE.worldFinal200Result === 'win' ?
    '#1D9E75' : '#cc3333';
  ctx.fillText('200m final: ' + r200, 240, 304);
  ctx.fillStyle = STATE.worldFinal500Result === 'win' ?
    '#1D9E75' : '#cc3333';
  ctx.fillText('500m final: ' + r500, 240, 317);
  ctx.fillStyle = STATE.worldFinal2000Result === 'win' ?
    '#1D9E75' : '#cc3333';
  ctx.fillText('2000m final: ' + r2k, 240, 330);

  // Season summary
  ctx.fillStyle = '#555';
  ctx.font = '8px monospace';
  ctx.fillText('National League: ' + STATE.trophyPoints +
    ' pts  |  World Champs: ' + STATE.worldPoints + ' pts',
    240, 350);

  // Tim's words
  ctx.fillStyle = '#888';
  ctx.font = '8px monospace';
  if (ending === 'champion') {
    ctx.fillText('"World. Champions. I have no more words."',
      240, 368);
  } else if (ending === 'silver') {
    ctx.fillText('"No one will ever forget this season."',
      240, 368);
  } else {
    ctx.fillText('"This club will never be the same again."',
      240, 368);
  }

  ctx.fillStyle = '#333';
  ctx.font = '8px monospace';
  ctx.fillText('[ Space ] — play again from the menu', 240, 392);

  // Floodlights
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = 'rgba(255,255,220,0.04)';
    ctx.fillRect(i * 60, 0, 30, 432);
  }
}