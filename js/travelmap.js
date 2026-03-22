const travelMap = {
  open: false,
  selectedVenue: 0,
  travelling: false,
  travelTimer: 0,
  travelDuration: 2.5,
  travelProgress: 0,
  fromX: 230,
  fromY: 280,
  destinationId: null,

  venues: [
    {
      id: 'caldecotte',
      name: 'Caldecotte Lake',
      subtitle: 'Milton Keynes — Home',
      x: 230, y: 280,
      unlocked: true,
      completed: false,
    },
    {
      id: 'loughborough',
      name: 'River Soar',
      subtitle: 'Loughborough — Soaring Dragons',
      x: 245, y: 230,
      unlocked: false,
      completed: false,
    },
    {
      id: 'nottingham',
      name: 'River Trent',
      subtitle: 'Nottingham — Notts Anaconda',
      x: 255, y: 215,
      unlocked: false,
      completed: false,
    },
    {
      id: 'stneots',
      name: 'River Great Ouse',
      subtitle: 'St Neots — St Neots DBT',
      x: 260, y: 265,
      unlocked: false,
      completed: false,
    },
    {
      id: 'middlesbrough',
      name: 'Teesside',
      subtitle: 'Middlesbrough — Powerhouse',
      x: 240, y: 155,
      unlocked: false,
      completed: false,
    },
    {
      id: 'liverpool',
      name: 'Merseyside',
      subtitle: 'Liverpool — Amathus',
      x: 185, y: 190,
      unlocked: false,
      completed: false,
    },
    {
      id: 'london',
      name: 'Royal Albert Dock',
      subtitle: 'London — Thames Valley Dragons',
      x: 285, y: 295,
      unlocked: false,
      completed: false,
    },
  ],

  open_map() {
    this.open = true;
    this.travelling = false;
    this.travelProgress = 0;
    this.venues.forEach(v => {
      v.unlocked = STATE.venuesUnlocked.includes(v.id);
      v.completed = !!STATE['raced' +
        v.id.charAt(0).toUpperCase() + v.id.slice(1)];
    });
    // Reset selected to current venue
    const idx = this.venues.findIndex(v => v.id === STATE.currentVenue);
    this.selectedVenue = idx >= 0 ? idx : 0;
  },

  close() {
    this.open = false;
  },

  travelTo(venueId) {
    this.travelling = true;
    this.travelProgress = 0;
    this.destinationId = venueId;
    const current = this.venues.find(v => v.id === STATE.currentVenue);
    this.fromX = current ? current.x : 230;
    this.fromY = current ? current.y : 280;
  },

  update(deltaTime) {
    if (!this.open || !this.travelling) return;
    this.travelProgress += deltaTime / this.travelDuration;
    if (this.travelProgress >= 1) {
      this.travelProgress = 1;
      this.travelling = false;
      this.open = false;
      STATE.currentVenue = this.destinationId;
      STATE.save();
      player.x = 64;
      player.y = 80;
      activeNPCIndex = null;
      activeLineIndex = 0;
AudioManager.playTrack(AudioManager.getTrackForVenue(this.destinationId));    }
  },

  handleKey(key) {
    if (!this.open || this.travelling) return;

    const unlocked = this.venues.filter(v => v.unlocked);

    if (key === 'ArrowDown' || key === 'ArrowRight') {
      this.selectedVenue = Math.min(this.selectedVenue + 1, unlocked.length - 1);
    }
    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      this.selectedVenue = Math.max(this.selectedVenue - 1, 0);
    }
    if (key === ' ' || key === 'Enter') {
      const venue = unlocked[this.selectedVenue];
      if (venue && venue.id !== STATE.currentVenue) {
        this.travelTo(venue.id);
      }
    }
    if (key === 'Escape' || key === 'm' || key === 'M') {
      this.close();
    }
  },

  drawEngland(ctx) {
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

    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 480, 432);

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

    this.drawEngland(ctx);

    // Route lines
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

    // Venue pins
    this.venues.forEach((venue) => {
      const isSelected = unlocked[this.selectedVenue] === venue;

      if (!venue.unlocked) {
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(venue.x, venue.y, 4, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      const isCurrent = venue.id === STATE.currentVenue;
      const pinColour = venue.completed ? '#1D9E75'
        : isCurrent ? '#8B1A1A'
        : isSelected ? '#f0c040' : '#ffffff';

      ctx.fillStyle = pinColour;
      ctx.beginPath();
      ctx.arc(venue.x, venue.y, isSelected ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isSelected ? '#f0c040' : '#888';
      ctx.lineWidth = isSelected ? 1.5 : 0.5;
      ctx.stroke();

      if (venue.completed) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✓', venue.x, venue.y - 8);
      }

      if (isCurrent) {
        ctx.fillStyle = '#ffaaaa';
        ctx.font = '7px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('YOU', venue.x, venue.y + 14);
      }
    });

    // Info panel
    const selected = unlocked[this.selectedVenue];
    if (selected) {
      ctx.fillStyle = '#111';
      ctx.fillRect(20, 340, 440, 64);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(20, 340, 440, 64);

      ctx.fillStyle = '#f0c040';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(selected.name, 30, 358);

      ctx.fillStyle = '#aaaaaa';
      ctx.font = '9px monospace';
      ctx.fillText(selected.subtitle, 30, 372);

      if (selected.id === STATE.currentVenue) {
        ctx.fillStyle = '#8B1A1A';
        ctx.font = '9px monospace';
        ctx.fillText('YOU ARE HERE', 30, 388);
      } else if (selected.completed) {
        ctx.fillStyle = '#1D9E75';
        ctx.font = '9px monospace';
        ctx.fillText('COMPLETED', 30, 388);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px monospace';
        ctx.fillText('[ Space ] Travel here', 30, 388);
      }

      ctx.fillStyle = '#f0c040';
      ctx.textAlign = 'right';
      ctx.fillText('PTS: ' + STATE.trophyPoints, 450, 358);
    }

    ctx.fillStyle = '#444';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ arrows ] select    [ Space ] travel    [ M ] close', 240, 424);

    // Travel animation
    if (this.travelling) {
      const to = this.venues.find(v => v.id === this.destinationId);
      if (to) {
        const bx = this.fromX + (to.x - this.fromX) * this.travelProgress;
        const by = this.fromY + (to.y - this.fromY) * this.travelProgress;

        ctx.fillStyle = '#8B1A1A';
        ctx.fillRect(bx - 6, by - 4, 12, 8);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bx - 4, by - 2, 4, 4);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Travelling to ' + to.name + '...', 240, 320);

        ctx.fillStyle = '#222';
        ctx.fillRect(140, 328, 200, 6);
        ctx.fillStyle = '#8B1A1A';
        ctx.fillRect(140, 328, this.travelProgress * 200, 6);
      }
    }
  }
};