const race = {
  active: false,
  beats: [],
  bpm: 100,
  boatX: 20,
  boatSpeed: 0,
  maxBoatSpeed: 60,
  lastBeatTime: 0,
  gradeText: '',
  gradeTimer: 0,
  synergyGauge: 0,
  distance: 0,
  finished: false,
  perfectStreak: 0,
  showTutorial: false,
  tutorialDismissed: false,

  start() {
    this.active = true;
    this.beats = [];
    this.boatX = 20;
    this.boatSpeed = 20;
    this.lastBeatTime = 0;
    this.gradeText = '';
    this.gradeTimer = 0;
    this.synergyGauge = 0;
    this.distance = 0;
    this.finished = false;
    this.perfectStreak = 0;
    if (!this.tutorialDismissed) {
      this.showTutorial = true;
      this.active = false;
    }
  },

  dismissTutorial() {
    this.showTutorial = false;
    this.tutorialDismissed = true;
    this.active = true;
    this.lastBeatTime = performance.now();
  },

  update(deltaTime, timestamp, keys) {
    if (!this.active || this.finished) return;

    const interval = (60 / this.bpm) * 1000;
    if (timestamp - this.lastBeatTime > interval) {
      this.beats.push({ x: 480, hit: false, missed: false });
      this.lastBeatTime = timestamp;
    }

    this.beats.forEach(b => b.x -= 150 * deltaTime);

    this.beats.forEach(b => {
      if (!b.hit && b.x < 44) {
        b.missed = true;
        this.boatSpeed = Math.max(10, this.boatSpeed - 2);
        this.perfectStreak = 0;
        this.synergyGauge = Math.max(0, this.synergyGauge - 10);
      }
    });

    this.beats = this.beats.filter(b => b.x > -20);

    this.distance += this.boatSpeed * deltaTime;
    this.boatX = 20 + (this.distance / 500) * 400;

    if (this.gradeTimer > 0) this.gradeTimer -= deltaTime;

    if (this.distance >= 500) {
      this.finished = true;
      this.active = false;
      const venue = VENUES[STATE.currentVenue];
      if (venue) {
        STATE[venue.raceStateFlag] = true;
        let rivalX = 20 + (this.distance * 0.85 / 500) * 400;
        const result = this.boatX > rivalX ? 'win' : 'loss';
        STATE[venue.raceResultFlag] = result;
        STATE.trophyPoints += result === 'win' ? 10 : 3;
        if (STATE.currentVenue === 'caldecotte') {
          if (!STATE.venuesUnlocked.includes('loughborough')) {
            STATE.venuesUnlocked.push('loughborough');
          }
        }
        if (STATE.currentVenue === 'loughborough') {
          if (!STATE.venuesUnlocked.includes('nottingham')) {
            STATE.venuesUnlocked.push('nottingham');
          }
        }
        STATE.save();
      }
    }
  },

  tap() {
    if (this.showTutorial) {
      this.dismissTutorial();
      return;
    }

    if (!this.active || this.finished) return;
    const hitZone = 60;
    const nearest = this.beats.find(
      b => !b.hit && !b.missed && Math.abs(b.x - hitZone) < 40
    );

    if (!nearest) {
      this.gradeText = 'MISS';
      this.gradeTimer = 0.6;
      this.boatSpeed = Math.max(10, this.boatSpeed - 2);
      this.perfectStreak = 0;
      this.synergyGauge = Math.max(0, this.synergyGauge - 5);
      return;
    }

    nearest.hit = true;
    const dist = Math.abs(nearest.x - hitZone);

    if (dist < 8) {
      this.gradeText = 'PERFECT';
      this.boatSpeed = Math.min(this.maxBoatSpeed, this.boatSpeed + 4);
      this.perfectStreak++;
      this.synergyGauge = Math.min(100, this.synergyGauge + 15);
    } else if (dist < 20) {
      this.gradeText = 'GREAT';
      this.boatSpeed = Math.min(this.maxBoatSpeed, this.boatSpeed + 2);
      this.perfectStreak++;
      this.synergyGauge = Math.min(100, this.synergyGauge + 8);
    } else {
      this.gradeText = 'OK';
      this.boatSpeed = Math.min(this.maxBoatSpeed, this.boatSpeed + 1);
      this.perfectStreak = 0;
    }

    this.gradeTimer = 0.6;

    if (this.synergyGauge >= 100) {
      this.boatSpeed = this.maxBoatSpeed;
      this.synergyGauge = 0;
      this.gradeText = 'SYNERGY!';
      this.gradeTimer = 1.0;
    }
  },

  drawTutorial(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.82)';
    ctx.fillRect(0, 0, 480, 432);
    ctx.fillStyle = '#111';
    ctx.fillRect(60, 80, 360, 260);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(60, 80, 360, 260);
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('HOW TO RACE', 240, 110);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 120);
    ctx.lineTo(400, 120);
    ctx.stroke();

    const lines = [
      { y: 148, col: '#f0c040', text: 'Yellow beats scroll from right to left.' },
      { y: 168, col: '#ffffff', text: 'Press SPACE when a beat reaches' },
      { y: 184, col: '#ffffff', text: 'the white line on the left.' },
      { y: 210, col: '#1D9E75', text: 'PERFECT  — tap exactly on the line' },
      { y: 226, col: '#88ddbb', text: 'GREAT    — tap close to the line' },
      { y: 242, col: '#aaaaaa', text: 'OK       — tap near the line' },
      { y: 258, col: '#cc3333', text: 'MISS     — tap too early or too late' },
      { y: 284, col: '#ff9900', text: 'Fill the SYNERGY gauge for a speed burst!' },
    ];

    lines.forEach(l => {
      ctx.fillStyle = l.col;
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(l.text, 84, l.y);
    });

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ Space ] to start racing', 240, 322);
  },

  draw(ctx) {
    if (!this.active && !this.finished && !this.showTutorial) return;

    const venue = VENUES[STATE.currentVenue];
    const rivalName = venue ? venue.raceRival : 'Soaring Dragons';

    ctx.fillStyle = '#1a5a8a';
    ctx.fillRect(0, 0, 480, 432);
    ctx.fillStyle = '#3a7d2c';
    ctx.fillRect(0, 0, 480, 40);
    ctx.fillRect(0, 320, 480, 112);

    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.setLineDash([10, 10]);
      ctx.moveTo(0, 40 + i * 70);
      ctx.lineTo(480, 40 + i * 70);
      ctx.stroke();
    }
    ctx.setLineDash([]);

// Secklow boat hull
    ctx.fillStyle = '#8B1A1A';
    ctx.fillRect(this.boatX, 164, 52, 8);
    // Bow point
    ctx.fillStyle = '#6B0A0A';
    ctx.fillRect(this.boatX + 50, 165, 4, 6);
    // Stern
    ctx.fillStyle = '#6B0A0A';
    ctx.fillRect(this.boatX - 2, 165, 4, 6);
    // Paddlers (tiny figures)
    for (let p = 0; p < 4; p++) {
      const px = this.boatX + 6 + p * 11;
      // Body
      ctx.fillStyle = '#8B1A1A';
      ctx.fillRect(px, 158, 4, 6);
      // Head
      ctx.fillStyle = '#f4c07a';
      ctx.fillRect(px + 1, 155, 3, 4);
      // Paddle left side
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(px - 2, 160, 2, 6);
      // Paddle right side
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(px + 4, 160, 2, 6);
    }
    // Drummer at front
    ctx.fillStyle = '#f4c07a';
    ctx.fillRect(this.boatX + 2, 156, 3, 4);
    ctx.fillStyle = '#f0c040';
    ctx.fillRect(this.boatX + 1, 158, 5, 5);

const rivalX = 20 + (this.distance * 0.85 / 500) * 400;
    // Rival boat hull
    ctx.fillStyle = '#1a1a8B';
    ctx.fillRect(rivalX, 194, 52, 8);
    ctx.fillStyle = '#0a0a6B';
    ctx.fillRect(rivalX + 50, 195, 4, 6);
    ctx.fillStyle = '#0a0a6B';
    ctx.fillRect(rivalX - 2, 195, 4, 6);
    // Rival paddlers
    for (let p = 0; p < 4; p++) {
      const px = rivalX + 6 + p * 11;
      ctx.fillStyle = '#1a1a8B';
      ctx.fillRect(px, 188, 4, 6);
      ctx.fillStyle = '#c68642';
      ctx.fillRect(px + 1, 185, 3, 4);
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(px - 2, 190, 2, 6);
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(px + 4, 190, 2, 6);
    }
    ctx.fillStyle = '#c68642';
    ctx.fillRect(rivalX + 2, 186, 3, 4);
    ctx.fillStyle = '#cc2222';
    ctx.fillRect(rivalX + 1, 188, 5, 5);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(420, 40);
    ctx.lineTo(420, 320);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FINISH', 420, 36);

    const distPct = Math.min(this.distance / 500, 1);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(20, 330, 440, 8);
    ctx.fillStyle = '#8B1A1A';
    ctx.fillRect(20, 330, distPct * 440, 8);
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('500m', 20, 348);
    ctx.textAlign = 'right';
    ctx.fillText(Math.floor(this.distance) + 'm', 460, 348);

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(20, 354, 200, 6);
    ctx.fillStyle = '#f0c040';
    ctx.fillRect(20, 354, (this.synergyGauge / 100) * 200, 6);
    ctx.fillStyle = '#f0c040';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SYNERGY', 228, 361);

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 370, 480, 32);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 370);
    ctx.lineTo(60, 402);
    ctx.stroke();

    this.beats.forEach(b => {
      ctx.fillStyle = b.hit ? '#1D9E75' : b.missed ? '#555' : '#f0c040';
      ctx.fillRect(b.x - 6, 378, 12, 16);
    });

    if (this.gradeTimer > 0) {
      const colours = {
        'PERFECT': '#f0c040',
        'GREAT':   '#1D9E75',
        'OK':      '#ffffff',
        'MISS':    '#cc3333',
        'SYNERGY!':'#ff9900',
      };
      ctx.fillStyle = colours[this.gradeText] || '#ffffff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(this.gradeText, 240, 368);
    }

    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffaaaa';
    ctx.fillText('SECKLOW', this.boatX, 158);
    ctx.fillStyle = '#aaaaff';
    ctx.fillText(rivalName.toUpperCase(), rivalX, 188);

    if (this.showTutorial) {
      this.drawTutorial(ctx);
      return;
    }

    if (this.finished) {
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(80, 140, 320, 130);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(80, 140, 320, 130);
      const won = this.boatX > rivalX;
      ctx.fillStyle = won ? '#f0c040' : '#aaaaaa';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(won ? 'SECKLOW WIN!' : rivalName.toUpperCase() + ' WIN!', 240, 175);
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText('Race complete.', 240, 200);
      ctx.fillText('Return to the overworld.', 240, 218);
      ctx.fillStyle = '#aaaaaa';
      ctx.fillText('[ Space ] to return', 240, 248);
    }
  }
};