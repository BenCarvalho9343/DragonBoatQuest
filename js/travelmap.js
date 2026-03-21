const travelMap = {
  open: false,
  selectedVenue: 0,
  travelling: false,
  travelTimer: 0,
  travelDuration: 2.5,
  travelProgress: 0,

  venues: [
    {
      id: 'caldecotte',
      name: 'Caldecotte Lake',
      subtitle: 'Milton Keynes — Home',
      x: 230, y: 280,
      rival: 'Secklow Hundred',
      unlocked: true,
      completed: false,
    },
    {
      id: 'loughborough',
      name: 'River Soar',
      subtitle: 'Loughborough — Soaring Dragons',
      x: 245, y: 230,
      rival: 'Soaring Dragons',
      unlocked: false,
      completed: false,
    },
    {
      id: 'nottingham',
      name: 'River Trent',
      subtitle: 'Nottingham — Notts Anaconda',
      x: 255, y: 215,
      rival: 'Notts Anaconda',
      unlocked: false,
      completed: false,
    },
    {
      id: 'stneots',
      name: 'River Great Ouse',
      subtitle: 'St Neots — St Neots DBT',
      x: 260, y: 265,
      rival: 'St Neots DBT',
      unlocked: false,
      completed: false,
    },
    {
      id: 'middlesbrough',
      name: 'Teesside',
      subtitle: 'Middlesbrough — Powerhouse',
      x: 240, y: 155,
      rival: 'Powerhouse Dragons',
      unlocked: false,
      completed: false,
    },
    {
      id: 'liverpool',
      name: 'Merseyside',
      subtitle: 'Liverpool — Amathus',
      x: 185, y: 190,
      rival: 'Amathus',
      unlocked: false,
      completed: false,
    },
    {
      id: 'london',
      name: 'Royal Albert Dock',
      subtitle: 'London — Thames Valley Dragons',
      x: 285, y: 295,
      rival: 'Thames Valley Dragons',
      unlocked: false,
      completed: false,
    },
  ],

  open_map() {
    this.open = true;
    this.travelling = false;
    this.travelProgress = 0;
    // Sync completed status from STATE
    if (STATE.racedCaldecotte) {
      this.venues[0].completed = true;
      this.venues[1].unlocked = true;
    }
  },

  close() {
    this.open = false;
  },

  travelTo(venueId) {
    this.travelling = true;
    this.travelProgress = 0;
    this.travelTimer = 0;
    this.destinationId = venueId;
  },

  update(deltaTime) {
    if (!this.open || !this.travelling) return;
    this.travelProgress += deltaTime / this.travelDuration;
    if (this.travelProgress >= 1) {
      this.travelProgress = 1;
      this.travelling = false;
      this.open = false;
      // For now just close — later this loads the venue scene
      STATE.currentVenue = this.destinationId;
      STATE.save();
    }
  },

  handleKey(key) {
    if (!this.open || this.travelling) return;

    const unlocked = this.venues.filter(v => v.unlocked);

    if (key === 'ArrowDown' || key === 'ArrowRight') {
      this.selectedVenue = Math.min(
        this.selectedVenue + 1,
        unlocked.length - 1
      );
    }
    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      this.selectedVenue = Math.max(this.selectedVenue - 1, 0);
    }
    if (key === ' ' || key === 'Enter') {
      const venue = unlocked[this.selectedVenue];
      if (venue && !venue.completed) {
        this.travelTo(venue.id);
      }
    }
    if (key === 'Escape' || key === 'm' || key === 'M') {
      this.close();
    }
  },

  drawEngland(ctx) {
    // Simplified England outline as a series of points
    const pts = [
      [220,80],[235,72],[248,78],[258,88],[268,95],
      [275,110],[278,125],[272,138],[265,148],[260,158],
      [268,165],[272,175],[268,185],[258,192],[250,200],
      [255,210],[258,222],[255,232],[248,240],[245,252],
      [248,262],[250,272],[248,282],[242,290],[235,296],
      [228,300],[220,296],[212,288],[208,278],[210,268],
      [206,258],[200,248],[196,238],[192,228],[188,218],
      [185,208],[182,198],[186,188],[190,178],[188,168],
      [184,158],[186,148],[190,138],[188,128],[186,118],
      [190,108],[198,100],[208,92],[216,84],[220,80],
    ];

    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    pts.forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    ctx.fillStyle = '#2a4a2a';
    ctx.fill();
    ctx.strokeStyle = '#3a6a3a';
    ctx.lineWidth = 1;
    ctx.stroke();
  },

  draw(ctx) {
    if (!this.open) return;

    // Background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 480, 432);

    // Title
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('NATIONAL LEAGUE — RACE CIRCUIT', 240, 20);

    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 28);
    ctx.lineTo(460, 28);
    ctx.stroke();

    // Draw England
    this.drawEngland(ctx);

    // Draw route lines between unlocked venues
    const unlocked = this.venues.filter(v => v.unlocked);
    for (let i = 0; i < unlocked.length - 1; i++) {
      const a = unlocked[i];
      const b = unlocked[i + 1];
      ctx.strokeStyle = '#334433';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw venue pins
    this.venues.forEach((venue, i) => {
      const isSelected = this.venues.filter(
        v => v.unlocked)[this.selectedVenue] === venue;

      if (!venue.unlocked) {
        // Locked pin — grey dot
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(venue.x, venue.y, 4, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      // Unlocked pin
      const pinColour = venue.completed ? '#1D9E75'
        : isSelected ? '#f0c040' : '#ffffff';

      ctx.fillStyle = pinColour;
      ctx.beginPath();
      ctx.arc(venue.x, venue.y, isSelected ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      // Pin border
      ctx.strokeStyle = isSelected ? '#f0c040' : '#888';
      ctx.lineWidth = isSelected ? 1.5 : 0.5;
      ctx.stroke();

      // Completed tick
      if (venue.completed) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✓', venue.x, venue.y - 8);
      }
    });

    // Venue info panel — show selected venue details
    const unlocked2 = this.venues.filter(v => v.unlocked);
    const selected = unlocked2[this.selectedVenue];
    if (selected) {
      ctx.fillStyle = '#111';
      ctx.fillRect(20, 340, 440, 60);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(20, 340, 440, 60);

      ctx.fillStyle = '#f0c040';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(selected.name, 30, 358);

      ctx.fillStyle = '#aaaaaa';
      ctx.font = '9px monospace';
      ctx.fillText(selected.subtitle, 30, 372);

      if (selected.completed) {
        ctx.fillStyle = '#1D9E75';
        ctx.font = '9px monospace';
        ctx.fillText('COMPLETED', 30, 386);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px monospace';
        ctx.fillText('[ Space ] Travel here', 30, 386);
      }

      // Trophy points
      ctx.fillStyle = '#f0c040';
      ctx.textAlign = 'right';
      ctx.fillText('PTS: ' + STATE.trophyPoints, 450, 358);
    }

    // Controls hint
    ctx.fillStyle = '#444';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ arrows ] select    [ Space ] travel    [ M ] close', 240, 424);

    // Travel animation
    if (this.travelling && selected) {
      const from = this.venues[0];
      const to = selected;
      const bx = from.x + (to.x - from.x) * this.travelProgress;
      const by = from.y + (to.y - from.y) * this.travelProgress;

      // Minibus icon
      ctx.fillStyle = '#8B1A1A';
      ctx.fillRect(bx - 6, by - 4, 12, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(bx - 4, by - 2, 4, 4);

      // Travel text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Travelling...', 240, 320);

      // Progress bar
      ctx.fillStyle = '#222';
      ctx.fillRect(140, 328, 200, 6);
      ctx.fillStyle = '#8B1A1A';
      ctx.fillRect(140, 328, this.travelProgress * 200, 6);
    }
  }
};