const Freeplay = {
  open: false,
  selectedVenue: 0,
  selectedDistance: '500m',
  distances: ['200m', '500m', '2000m'],

  getAvailableVenues() {
    const venues = [];
    if (STATE.racedCaldecotte)
      venues.push({ id:'caldecotte', name:'Caldecotte Lake',
        rival:'Soaring Dragons', type:'national' });
    if (STATE.racedLoughborough)
      venues.push({ id:'loughborough', name:'River Soar',
        rival:'Soaring Dragons', type:'national' });
    if (STATE.racedNottingham)
      venues.push({ id:'nottingham', name:'River Trent',
        rival:'Notts Anaconda', type:'national' });
    if (STATE.racedStneots)
      venues.push({ id:'stneots', name:'River Great Ouse',
        rival:'St Neots DBT', type:'national' });
    if (STATE.racedMiddlesbrough)
      venues.push({ id:'middlesbrough', name:'Teesside',
        rival:'Powerhouse Dragons', type:'national' });
    if (STATE.racedLiverpool)
      venues.push({ id:'liverpool', name:'Merseyside',
        rival:'Amathus', type:'national' });
    if (STATE.racedLondon)
      venues.push({ id:'london', name:'Royal Albert Dock',
        rival:'All clubs', type:'finale' });
    if (STATE.racedDuisburg)
      venues.push({ id:'duisburg', name:'Duisburg Regatta',
        rival:'Fire Dragons', type:'world', weather:'Choppy' });
    if (STATE.racedYueyang)
      venues.push({ id:'yueyang', name:'Yueyang',
        rival:'CGCSA Dragons', type:'world', weather:'Humid' });
    if (STATE.racedWorldFinal)
      venues.push({ id:'racice', name:'Racice Grand Final',
        rival:'All international rivals', type:'worldfinale',
        weather:'Crosswind' });
    return venues;
  },

  toggle() {
    this.open = !this.open;
    this.selectedVenue = 0;
    this.selectedDistance = '500m';
  },

  close() { this.open = false; },

  handleKey(key) {
    if (!this.open) return;
    const venues = this.getAvailableVenues();
    if (key === 'ArrowUp')
      this.selectedVenue = Math.max(0, this.selectedVenue - 1);
    if (key === 'ArrowDown')
      this.selectedVenue = Math.min(
        venues.length - 1, this.selectedVenue + 1);
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const idx = this.distances.indexOf(this.selectedDistance);
      const dir = key === 'ArrowLeft' ? -1 : 1;
      this.selectedDistance =
        this.distances[(idx + dir + 3) % 3];
    }
    if (key === ' ' || key === 'Enter') this.startFreeplay(venues);
    if (key === 'Escape') this.close();
  },

  startFreeplay(venues) {
    if (!venues) venues = this.getAvailableVenues();
    if (venues.length === 0) return;
    const venue = venues[this.selectedVenue];
    if (!venue) return;
    this.close();

    const isWorld = venue.type === 'world' ||
                    venue.type === 'worldfinale';
    if (isWorld) {
      STATE.inWorldChamps = true;
      STATE.currentWorldVenue = venue.id;
    } else {
      STATE.inWorldChamps = false;
      STATE.currentVenue = venue.id;
    }

    race.freeplayMode = true;
    race.start(this.selectedDistance);
    AudioManager.playTrack('race');
  },

  draw(ctx) {
    if (!this.open) return;

    ctx.fillStyle = 'rgba(0,0,0,0.88)';
    ctx.fillRect(0, 0, 480, 432);
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(20, 20, 440, 392);
    ctx.strokeStyle = '#1D9E75';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, 440, 392);

    ctx.fillStyle = '#1D9E75';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FREEPLAY', 240, 46);
    ctx.fillStyle = '#555';
    ctx.font = '8px monospace';
    ctx.fillText('Replay completed races — no progress saved', 240, 58);

    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(40, 64);
    ctx.lineTo(440, 64);
    ctx.stroke();

    const venues = this.getAvailableVenues();

    if (venues.length === 0) {
      ctx.fillStyle = '#444';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Complete races to unlock freeplay venues', 240, 220);
      ctx.fillStyle = '#333';
      ctx.font = '8px monospace';
      ctx.fillText('[ Esc ] close', 240, 402);
      return;
    }

    venues.forEach((v, i) => {
      const vy = 74 + i * 28;
      const isSelected = i === this.selectedVenue;

      if (isSelected) {
        ctx.fillStyle = 'rgba(29,158,117,0.15)';
        ctx.fillRect(28, vy - 2, 424, 24);
        ctx.strokeStyle = '#1D9E75';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(28, vy - 2, 424, 24);
      }

      const badgeColour = v.type === 'world' ||
        v.type === 'worldfinale' ? '#4488ff' : '#8B1A1A';
      ctx.fillStyle = badgeColour;
      ctx.fillRect(34, vy + 2, 4, 14);

      ctx.fillStyle = isSelected ? '#ffffff' : '#aaaaaa';
      ctx.font = isSelected ? 'bold 9px monospace' : '9px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(v.name, 44, vy + 11);

      ctx.fillStyle = '#555';
      ctx.font = '7px monospace';
      ctx.fillText('vs ' + v.rival, 44, vy + 20);

      if (v.weather) {
        ctx.fillStyle = '#ffcc44';
        ctx.font = '7px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(v.weather, 444, vy + 11);
      }
    });

    // Distance selector
    const maxRows = Math.min(venues.length, 11);
    const dy = 74 + maxRows * 28 + 8;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(28, dy, 424, 34);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(28, dy, 424, 34);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Distance:', 40, dy + 13);

    this.distances.forEach((d, i) => {
      const dx = 120 + i * 80;
      const isSel = d === this.selectedDistance;
      ctx.fillStyle = isSel ? '#1D9E75' : '#444';
      ctx.font = isSel ? 'bold 10px monospace' : '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(d, dx, dy + 13);
      if (isSel) {
        ctx.fillStyle = '#1D9E75';
        ctx.fillRect(dx - 14, dy + 17, 28, 2);
      }
    });

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ left/right ] change distance', 360, dy + 28);

    ctx.fillStyle = '#1D9E75';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ Space ] race    [ Esc ] close', 240, 402);
  },
};