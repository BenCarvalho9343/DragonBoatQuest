const LeagueTable = {
  open: false,

  // Points each rival club earns based on their speed profiles
  // They race every venue too — we simulate their season results
  getRivalPoints() {
    const rivals = [
      {
        name: 'Secklow Hundred',
        shortName: 'Secklow',
        isSecklow: true,
        points: STATE.trophyPoints,
        wins: [
          STATE.caldecotteResult === 'win',
          STATE.loughboroughResult === 'win',
          STATE.nottinghamResult === 'win',
          STATE.stneotResult === 'win',
          STATE.middlesbroughResult === 'win',
          STATE.liverpoolResult === 'win',
          STATE.london200Result === 'win',
          STATE.london500Result === 'win',
          STATE.london2000Result === 'win',
        ].filter(Boolean).length,
        losses: [
          STATE.caldecotteResult === 'loss',
          STATE.loughboroughResult === 'loss',
          STATE.nottinghamResult === 'loss',
          STATE.stneotResult === 'loss',
          STATE.middlesbroughResult === 'loss',
          STATE.liverpoolResult === 'loss',
          STATE.london200Result === 'loss',
          STATE.london500Result === 'loss',
          STATE.london2000Result === 'loss',
        ].filter(Boolean).length,
        colour: '#8B1A1A',
        bestDistance: '500m',
      },
      {
        name: 'Soaring Dragons',
        shortName: 'Soaring',
        points: 68,
        wins: 5,
        losses: 2,
        colour: '#cc2222',
        bestDistance: '200m',
      },
      {
        name: 'Notts Anaconda',
        shortName: 'Anaconda',
        points: 62,
        wins: 4,
        losses: 3,
        colour: '#6600aa',
        bestDistance: '500m',
      },
      {
        name: 'St Neots DBT',
        shortName: 'St Neots',
        points: 58,
        wins: 4,
        losses: 3,
        colour: '#2255cc',
        bestDistance: '2000m',
      },
      {
        name: 'Powerhouse Dragons',
        shortName: 'Powerhouse',
        points: 55,
        wins: 3,
        losses: 4,
        colour: '#ff6600',
        bestDistance: '200m',
      },
      {
        name: 'Amathus',
        shortName: 'Amathus',
        points: 72,
        wins: 6,
        losses: 1,
        colour: '#cc0000',
        bestDistance: '2000m',
      },
      {
        name: 'Thames Valley Dragons',
        shortName: 'Thames Val',
        points: 78,
        wins: 6,
        losses: 1,
        colour: '#1D9E75',
        bestDistance: '500m',
      },
    ];

    // Sort by points descending
    return rivals.sort((a, b) => b.points - a.points);
  },

  toggle() {
    this.open = !this.open;
  },

  close() {
    this.open = false;
  },

  draw(ctx) {
    if (!this.open) return;

    // Background
    ctx.fillStyle = 'rgba(0,0,0,0.88)';
    ctx.fillRect(0, 0, 480, 432);

    // Panel
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(20, 20, 440, 392);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, 440, 392);

    // Title
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BDA NATIONAL LEAGUE', 240, 46);

    ctx.fillStyle = '#555';
    ctx.font = '8px monospace';
    ctx.fillText('Season standings', 240, 58);

    // Divider
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 66);
    ctx.lineTo(440, 66);
    ctx.stroke();

    // Column headers
    ctx.fillStyle = '#666';
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('POS', 32, 80);
    ctx.fillText('CLUB', 62, 80);
    ctx.textAlign = 'center';
    ctx.fillText('BEST', 290, 80);
    ctx.textAlign = 'right';
    ctx.fillText('W', 340, 80);
    ctx.fillText('L', 368, 80);
    ctx.fillText('PTS', 446, 80);

    ctx.strokeStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(40, 84);
    ctx.lineTo(446, 84);
    ctx.stroke();

    // Rows
    const clubs = this.getRivalPoints();
    clubs.forEach((club, i) => {
      const ry = 98 + i * 42;
      const isTop3 = i < 3;
      const isSecklow = club.isSecklow;

      // Row highlight
      if (isSecklow) {
        ctx.fillStyle = 'rgba(139,26,26,0.25)';
        ctx.fillRect(24, ry - 14, 432, 36);
        ctx.strokeStyle = 'rgba(139,26,26,0.5)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(24, ry - 14, 432, 36);
      } else if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fillRect(24, ry - 14, 432, 36);
      }

      // Position medal
      const posColour = i === 0 ? '#f0c040'
        : i === 1 ? '#c0c0c0'
        : i === 2 ? '#c08040'
        : '#555';

      ctx.fillStyle = posColour;
      ctx.font = i < 3 ? 'bold 11px monospace' : '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(i + 1, 38, ry + 4);

      // Medal circle for top 3
      if (isTop3) {
        ctx.strokeStyle = posColour;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(38, ry, 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Club colour dot
      ctx.fillStyle = club.colour;
      ctx.beginPath();
      ctx.arc(56, ry, 5, 0, Math.PI * 2);
      ctx.fill();

      // Club name
      ctx.fillStyle = isSecklow ? '#ffffff' : '#cccccc';
      ctx.font = isSecklow ? 'bold 10px monospace' : '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(club.shortName, 66, ry + 4);

      // YOU label for Secklow
      if (isSecklow) {
        ctx.fillStyle = '#8B1A1A';
        ctx.fillRect(170, ry - 7, 24, 14);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 7px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('YOU', 182, ry + 3);
      }

      // Best distance badge
      const distColour = club.bestDistance === '200m' ? '#ff9900'
        : club.bestDistance === '2000m' ? '#1D9E75' : '#4488ff';
      ctx.fillStyle = distColour + '44';
      ctx.fillRect(262, ry - 8, 46, 16);
      ctx.strokeStyle = distColour;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(262, ry - 8, 46, 16);
      ctx.fillStyle = distColour;
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(club.bestDistance, 285, ry + 3);

      // Wins
      ctx.fillStyle = '#1D9E75';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(club.wins, 340, ry + 4);

      // Losses
      ctx.fillStyle = '#cc3333';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(club.losses, 368, ry + 4);

      // Points
      ctx.fillStyle = isSecklow ? '#f0c040' : '#ffffff';
      ctx.font = isSecklow ? 'bold 12px monospace' : '11px monospace';
      ctx.fillText(club.points, 446, ry + 4);

      // Points bar
      const maxPts = 100;
      const barW = Math.min((club.points / maxPts) * 60, 60);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(384, ry - 6, 60, 8);
      ctx.fillStyle = isSecklow ? '#8B1A1A' : club.colour + 'aa';
      ctx.fillRect(384, ry - 6, barW, 8);

      // Row divider
      if (i < clubs.length - 1) {
        ctx.strokeStyle = '#1a1a2a';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(40, ry + 22);
        ctx.lineTo(440, ry + 22);
        ctx.stroke();
      }
    });

    // Footer
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 388);
    ctx.lineTo(440, 388);
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ L ] close', 240, 403);
  },
};