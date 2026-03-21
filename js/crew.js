const crewScreen = {
  open: false,
  selectedIndex: null,
  scrollOffset: 0,
  visibleCount: 6,

  roster: [
    { name: 'Lesley',  role: 'Striker', power: 75, rhythm: 68, stamina: 62, colour: '#e05a5a', bio: 'Former sprinter. Explosive start, fades slightly late race.' },
    { name: 'Marcus',  role: 'Engine',  power: 82, rhythm: 60, stamina: 78, colour: '#5a8ae0', bio: 'Workhorse of the boat. Never misses a session.' },
    { name: 'Todd',    role: 'Engine',  power: 70, rhythm: 80, stamina: 72, colour: '#e0a85a', bio: 'Brilliant rhythm. Keeps the boat stable in rough water.' },
    { name: 'Dan',     role: 'Anchor',  power: 68, rhythm: 85, stamina: 70, colour: '#5ae0a8', bio: 'Steady as a rock. Best timing in the club.' },
    { name: 'Naomi',   role: 'Engine',  power: 74, rhythm: 72, stamina: 80, colour: '#c05ae0', bio: 'Iron stamina. Gets stronger the longer the race goes.' },
    { name: 'Tom',     role: 'Engine',  power: 78, rhythm: 65, stamina: 75, colour: '#e0c05a', bio: 'Raw power. Still learning the rhythm but improving fast.' },
    { name: 'Rachel',  role: 'Striker', power: 72, rhythm: 74, stamina: 65, colour: '#e05a9a', bio: 'Quick reactions. Always first to settle into a clean stroke.' },
    { name: 'Jason',   role: 'Engine',  power: 85, rhythm: 62, stamina: 76, colour: '#5ae05a', bio: 'Absolute unit. Rivals visibly wince when he gets in the boat.' },
    { name: 'Ben',     role: 'Engine',  power: 66, rhythm: 88, stamina: 74, colour: '#a05ae0', bio: 'Best rhythm in the engine room. The boat hums when he paddles.' },
    { name: 'Brendan', role: 'Anchor',  power: 71, rhythm: 82, stamina: 72, colour: '#5ac0e0', bio: 'Old school. Has forgotten more about dragon boating than most will ever know.' },
    { name: 'Marlee',  role: 'Engine',  power: 73, rhythm: 76, stamina: 82, colour: '#e0785a', bio: 'Marathon runner background. The 2000m pursuit is her race.' },
    { name: 'Amelia',  role: 'Engine',  power: 80, rhythm: 64, stamina: 70, colour: '#78e05a', bio: 'Competitive to a fault. Races every session like it is a final.' },
    { name: 'Liz',     role: 'Drummer', power: 45, rhythm: 94, stamina: 68, colour: '#f0c040', bio: 'The heartbeat of Secklow. Her timing is almost supernatural.' },
    { name: 'Steve',   role: 'Sweep',   power: 60, rhythm: 78, stamina: 80, colour: '#c0c0c0', bio: 'Reads the river like a book. Invaluable on technical courses.' },
  ],
  draw(ctx) {
    if (!this.open) return;

    // Full screen overlay
    ctx.fillStyle = 'rgba(0,0,0,0.92)';
    ctx.fillRect(0, 0, 480, 432);

    // Header
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SECKLOW HUNDRED — CREW', 240, 20);

    // Trophy points
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('TROPHY PTS: ' + STATE.trophyPoints, 460, 20);

    // Divider
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 28);
    ctx.lineTo(460, 28);
    ctx.stroke();

    // Scroll indicators
    if (this.scrollOffset > 0) {
      ctx.fillStyle = '#555';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▲ more above', 240, 40);
    }
    if (this.scrollOffset + this.visibleCount < this.roster.length) {
      ctx.fillStyle = '#555';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▼ more below', 240, 390);
    }

    // Draw visible crew members
    const visible = this.roster.slice(
      this.scrollOffset,
      this.scrollOffset + this.visibleCount
    );

    visible.forEach((member, i) => {
      const actualIndex = i + this.scrollOffset;
      const x = 20;
      const y = 44 + i * 54;
      const w = 440;
      const h = 50;

      const isSelected = this.selectedIndex === actualIndex;

      // Card background
      ctx.fillStyle = isSelected ? '#1a1a2e' : '#111';
      ctx.fillRect(x, y, w, h);

      // Border
      ctx.strokeStyle = isSelected ? '#f0c040' : '#222';
      ctx.lineWidth = isSelected ? 1.5 : 0.5;
      ctx.strokeRect(x, y, w, h);

      // Colour dot
      ctx.fillStyle = member.colour;
      ctx.fillRect(x + 8, y + 10, 10, 10);

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(member.name, x + 26, y + 18);

      // Role
      ctx.fillStyle = '#888';
      ctx.font = '9px monospace';
      ctx.fillText(member.role, x + 26, y + 30);

      // Scroll position indicator (e.g. 3/14)
      ctx.fillStyle = '#444';
      ctx.font = '8px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(
        (actualIndex + 1) + '/' + this.roster.length,
        x + w - 8, y + 18
      );

      // Stat bars
      const barX = x + 160;
      const barW = 260;

      const stats = [
        { label: 'PWR', value: member.power,   col: '#e05a5a', by: y + 16 },
        { label: 'RHY', value: member.rhythm,  col: '#5ae0a8', by: y + 28 },
        { label: 'STA', value: member.stamina, col: '#5a8ae0', by: y + 40 },
      ];

      stats.forEach(s => {
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(s.label, barX, s.by);

        ctx.fillStyle = '#222';
        ctx.fillRect(barX + 24, s.by - 7, barW - 24, 7);

        ctx.fillStyle = s.col;
        ctx.fillRect(barX + 24, s.by - 7, (s.value / 100) * (barW - 24), 7);

        ctx.fillStyle = '#555';
        ctx.textAlign = 'right';
        ctx.fillText(s.value, barX + barW, s.by);
      });
    });

    // Bio panel at bottom
    if (this.selectedIndex !== null) {
      const member = this.roster[this.selectedIndex];
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(20, 396, 440, 18);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(20, 396, 440, 18);
      ctx.fillStyle = '#aaaaaa';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(member.bio, 28, 408);
    }

    // Controls hint
    ctx.fillStyle = '#444';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ arrows ] navigate    [ C ] close', 240, 424);
  },

  handleKey(key) {
    if (!this.open) return;

    if (key === 'ArrowDown') {
      if (this.selectedIndex === null) {
        this.selectedIndex = 0;
      } else if (this.selectedIndex < this.roster.length - 1) {
        this.selectedIndex++;
        // Scroll down if selected goes below visible area
        if (this.selectedIndex >= this.scrollOffset + this.visibleCount) {
          this.scrollOffset++;
        }
      }
    }

    if (key === 'ArrowUp') {
      if (this.selectedIndex === null) {
        this.selectedIndex = 0;
      } else if (this.selectedIndex > 0) {
        this.selectedIndex--;
        // Scroll up if selected goes above visible area
        if (this.selectedIndex < this.scrollOffset) {
          this.scrollOffset--;
        }
      }
    }
  }
};