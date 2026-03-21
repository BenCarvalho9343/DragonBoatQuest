const crewScreen = {
  open: false,
  selectedIndex: null,
  scroll: 0,

  roster: [
    { name: 'Jess',   role: 'Striker', power: 75, rhythm: 68, stamina: 62, colour: '#e05a5a', bio: 'Former sprinter. Explosive start, fades slightly late race.' },
    { name: 'Marcus', role: 'Engine',  power: 82, rhythm: 60, stamina: 78, colour: '#5a8ae0', bio: 'Workhorse of the boat. Never misses a session.' },
    { name: 'Priya',  role: 'Engine',  power: 70, rhythm: 80, stamina: 72, colour: '#e0a85a', bio: 'Brilliant rhythm. Keeps the boat stable in rough water.' },
    { name: 'Dan',    role: 'Anchor',  power: 68, rhythm: 85, stamina: 70, colour: '#5ae0a8', bio: 'Steady as a rock. Best timing in the club.' },
    { name: 'Fatima', role: 'Engine',  power: 74, rhythm: 72, stamina: 80, colour: '#c05ae0', bio: 'Iron stamina. Gets stronger the longer the race goes.' },
    { name: 'Tom',    role: 'Engine',  power: 78, rhythm: 65, stamina: 75, colour: '#e0c05a', bio: 'Raw power. Still learning the rhythm but improving fast.' },
  ],

  draw(ctx) {
    if (!this.open) return;

    // Full screen dark overlay
    ctx.fillStyle = 'rgba(0,0,0,0.92)';
    ctx.fillRect(0, 0, 480, 432);

    // Header
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SECKLOW HUNDRED — CREW', 240, 24);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 32);
    ctx.lineTo(460, 32);
    ctx.stroke();

    // Hint
    ctx.fillStyle = '#555';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ C ] close      [ Arrow keys ] navigate      [ Space ] select', 240, 424);

    // Draw each crew member
    this.roster.forEach((member, i) => {
      const x = 20;
      const y = 44 + i * 58;
      const w = 440;
      const h = 52;

      // Card background
      const isSelected = this.selectedIndex === i;
      ctx.fillStyle = isSelected ? '#1a1a2e' : '#111';
      ctx.fillRect(x, y, w, h);

      // Selected border
      ctx.strokeStyle = isSelected ? '#f0c040' : '#222';
      ctx.lineWidth = isSelected ? 1.5 : 0.5;
      ctx.strokeRect(x, y, w, h);

      // Colour dot
      ctx.fillStyle = member.colour;
      ctx.fillRect(x + 8, y + 8, 10, 10);

      // Name and role
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(member.name, x + 26, y + 17);

      ctx.fillStyle = '#888';
      ctx.font = '9px monospace';
      ctx.fillText(member.role, x + 26, y + 30);

 

      // Stat bars
      const barX = x + 200;
      const barW = 220;

      const stats = [
        { label: 'PWR', value: member.power,   col: '#e05a5a', by: y + 16 },
        { label: 'RHY', value: member.rhythm,  col: '#5ae0a8', by: y + 28 },
        { label: 'STA', value: member.stamina, col: '#5a8ae0', by: y + 40 },
      ];

      stats.forEach(s => {
        // Label
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(s.label, barX, s.by);

        // Track
        ctx.fillStyle = '#222';
        ctx.fillRect(barX + 24, s.by - 7, barW - 24, 7);

        // Fill
        ctx.fillStyle = s.col;
        ctx.fillRect(barX + 24, s.by - 7, (s.value / 100) * (barW - 24), 7);

        // Value
        ctx.fillStyle = '#666';
        ctx.textAlign = 'right';
        ctx.fillText(s.value, barX + barW, s.by);
      });
    });

// Trophy points display
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('TROPHY PTS: ' + STATE.trophyPoints, 460, 24);

    // Bio panel at bottom for selected crew member
    if (this.selectedIndex !== null) {
      const member = this.roster[this.selectedIndex];
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(20, 398, 440, 20);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(20, 398, 440, 20);
      ctx.fillStyle = '#aaaaaa';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(member.bio, 28, 411);
    }
  },

  handleKey(key) {
    if (!this.open) return;

    if (key === 'ArrowDown') {
      this.selectedIndex = this.selectedIndex === null ? 0
        : Math.min(this.selectedIndex + 1, this.roster.length - 1);
    }
    if (key === 'ArrowUp') {
      this.selectedIndex = this.selectedIndex === null ? 0
        : Math.max(this.selectedIndex - 1, 0);
    }
  }
};