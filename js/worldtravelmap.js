const worldTravelMap = {
  open: false,
  travelling: false,
  travelProgress: 0,
  travelDuration: 3.0,
  selectedVenueId: null,
  destinationId: null,

  venues: {
    duisburg: { x: 230, y: 148, name: 'Duisburg', country: 'Germany' },
    yueyang:  { x: 358, y: 178, name: 'Yueyang',  country: 'China'   },
    racice:   { x: 242, y: 140, name: 'Racice',   country: 'Czech Republic' },
  },

  open_map() {
    this.open = true;
    this.selectedVenueId = STATE.currentWorldVenue;
  },

  close() {
    this.open = false;
  },

  handleKey(key) {
    if (!this.open || this.travelling) return;
    const ids = Object.keys(this.venues).filter(
      id => STATE.worldVenuesUnlocked.includes(id)
    );
    const idx = ids.indexOf(this.selectedVenueId);

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      this.selectedVenueId = ids[(idx + 1) % ids.length];
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      this.selectedVenueId =
        ids[(idx - 1 + ids.length) % ids.length];
    }
    if (key === ' ' || key === 'Enter') {
      if (this.selectedVenueId !== STATE.currentWorldVenue) {
        this.destinationId = this.selectedVenueId;
        this.travelling = true;
        this.travelProgress = 0;
      }
    }
  },

  update(deltaTime) {
    if (!this.open || !this.travelling) return;
    this.travelProgress += deltaTime / this.travelDuration;
    if (this.travelProgress >= 1) {
      this.travelProgress = 1;
      this.travelling = false;
      this.open = false;
      STATE.currentWorldVenue = this.destinationId;
      STATE.save();
      player.x = 64;
      player.y = 80;
      activeNPCIndex = null;
      activeLineIndex = 0;
      AudioManager.playTrack('overworld');
    }
  },

  draw(ctx) {
    if (!this.open) return;

    ctx.fillStyle = 'rgba(0,0,0,0.88)';
    ctx.fillRect(0, 0, 480, 432);

    ctx.fillStyle = '#050520';
    ctx.fillRect(20, 20, 440, 392);
    ctx.strokeStyle = '#4488ff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, 440, 392);

    ctx.fillStyle = '#4488ff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WORLD CHAMPIONSHIPS', 240, 46);

    ctx.fillStyle = '#555';
    ctx.font = '8px monospace';
    ctx.fillText('International travel', 240, 58);

    // Simple world map
    ctx.fillStyle = '#1a2a1a';
    ctx.fillRect(180, 120, 120, 80);
    ctx.fillRect(300, 130, 120, 90);
    ctx.fillRect(200, 200, 80, 80);
    ctx.fillRect(60, 140, 90, 100);

    ctx.strokeStyle = '#2a3a2a';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(180, 120, 120, 80);
    ctx.strokeRect(300, 130, 120, 90);

    // Flight path lines
    const venues = this.venues;
    const unlocked = Object.keys(venues).filter(
      id => STATE.worldVenuesUnlocked.includes(id)
    );

    for (let i = 0; i < unlocked.length - 1; i++) {
      const a = venues[unlocked[i]];
      const b = venues[unlocked[i + 1]];
      ctx.strokeStyle = 'rgba(68,136,255,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Venue pins
    Object.entries(venues).forEach(([id, v]) => {
      const isUnlocked = STATE.worldVenuesUnlocked.includes(id);
      const isCurrent = id === STATE.currentWorldVenue;
      const isSelected = id === this.selectedVenueId;
      const isRaced = id === 'duisburg' ? STATE.racedDuisburg
        : id === 'yueyang' ? STATE.racedYueyang
        : STATE.racedWorldFinal;

      if (!isUnlocked) return;

      ctx.fillStyle = isRaced ? '#555'
        : isCurrent ? '#8B1A1A'
        : isSelected ? '#4488ff' : '#2a4a2a';
      ctx.beginPath();
      ctx.arc(v.x, v.y, isSelected ? 10 : 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isSelected ? '#4488ff' : '#aaaaaa';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isRaced ? '✓' : isCurrent ? '★' : '●',
        v.x, v.y + 3);

      ctx.fillStyle = isSelected ? '#ffffff' : '#aaaaaa';
      ctx.font = isSelected ?
        'bold 9px monospace' : '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(v.name, v.x, v.y + 20);
      ctx.fillStyle = '#555';
      ctx.font = '7px monospace';
      ctx.fillText(v.country, v.x, v.y + 30);

      if (isCurrent) {
        ctx.fillStyle = '#8B1A1A';
        ctx.font = '7px monospace';
        ctx.fillText('YOU ARE HERE', v.x, v.y - 16);
      }
    });

    // Travel animation
    if (this.travelling && this.destinationId) {
      const from = venues[STATE.currentWorldVenue];
      const to = venues[this.destinationId];
      const px = from.x + (to.x - from.x) * this.travelProgress;
      const py = from.y + (to.y - from.y) * this.travelProgress;
      ctx.fillStyle = '#f0c040';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Selected venue info
    if (this.selectedVenueId && !this.travelling) {
      const sv = venues[this.selectedVenueId];
      const wv = WORLD_VENUES[this.selectedVenueId];
      if (sv && wv) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(30, 290, 420, 80);
        ctx.strokeStyle = '#4488ff';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(30, 290, 420, 80);

        ctx.fillStyle = '#4488ff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(wv.name, 42, 308);

        ctx.fillStyle = '#ffcc44';
        ctx.font = '8px monospace';
        ctx.fillText('Weather: ' + wv.weatherLabel, 42, 322);

        const isRaced = this.selectedVenueId === 'duisburg' ?
          STATE.racedDuisburg
          : this.selectedVenueId === 'yueyang' ?
          STATE.racedYueyang : STATE.racedWorldFinal;

        ctx.fillStyle = isRaced ? '#555' : '#aaaaaa';
        ctx.fillText(isRaced ? 'Already raced' :
          'Not yet raced', 42, 336);

        if (this.selectedVenueId !== STATE.currentWorldVenue) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('[ Space ] travel here', 240, 356);
        } else {
          ctx.fillStyle = '#888';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('Current location', 240, 356);
        }
      }
    }

    ctx.fillStyle = '#333';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      '[ arrows ] select venue    [ Esc ] close', 240, 398);
  },
};