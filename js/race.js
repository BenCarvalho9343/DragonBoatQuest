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
  distanceMode: '500m',
  maxDistance: 500,
  bends: [],
  bendActive: false,
  bendTimer: 0,
  bendWindowDuration: 1.2,
  bendProgress: 0,
  bendGradeText: '',
  bendGradeTimer: 0,
  totalBendPenalty: 0,
  finishPosition: 0,
  rivalDistance: 0,
  weather: null,
  weatherTimer: 0,
  windOffset: 0,
  freeplayMode: false,

  getRivalSpeeds() {
    const m = this.distanceMode;
    const isWorld = STATE.inWorldChamps;

    if (isWorld && STATE.currentWorldVenue === 'racice') {
      return [
        { name:'Fire',   colour:'#ff4400', s200:0.97, s500:0.95, s2000:0.92 },
        { name:'Viking', colour:'#4488ff', s200:0.95, s500:0.96, s2000:0.94 },
        { name:'CGCSA',  colour:'#cc0000', s200:0.98, s500:0.97, s2000:0.96 },
        { name:'Paddle', colour:'#00aa44', s200:0.94, s500:0.95, s2000:0.93 },
        { name:'Golden', colour:'#ffcc00', s200:0.96, s500:0.94, s2000:0.95 },
      ].map(r => ({
        ...r,
        speed: m === '200m' ? r.s200 : m === '2000m' ? r.s2000 : r.s500,
      }));
    }

    return [
      { name:'Soaring',    colour:'#cc2222', s200:0.88, s500:0.87, s2000:0.84 },
      { name:'Anaconda',   colour:'#6600aa', s200:0.90, s500:0.86, s2000:0.83 },
      { name:'St Neots',   colour:'#2255cc', s200:0.85, s500:0.88, s2000:0.86 },
      { name:'Powerhouse', colour:'#ff6600', s200:0.94, s500:0.85, s2000:0.80 },
      { name:'Amathus',    colour:'#cc0000', s200:0.89, s500:0.90, s2000:0.88 },
      { name:'Thames Val', colour:'#1D9E75', s200:0.91, s500:0.89, s2000:0.87 },
    ].map(r => ({
      ...r,
      speed: m === '200m' ? r.s200 : m === '2000m' ? r.s2000 : r.s500,
    }));
  },

  getSingleRivalSpeed() {
    const isWorld = STATE.inWorldChamps;
    const base = this.distanceMode === '200m' ? 0.92
      : this.distanceMode === '2000m' ? 0.82 : 0.85;
    return isWorld ? base + 0.08 : base;
  },

  getWeather() {
    if (!STATE.inWorldChamps) return null;
    const venue = WORLD_VENUES[STATE.currentWorldVenue];
    return venue ? venue.weather : null;
  },

  start(mode) {
    this.distanceMode = mode || '500m';
    this.maxDistance = mode === '200m' ? 200
      : mode === '2000m' ? 2000 : 500;
    this.active = true;
    this.beats = [];
    this.boatX = 20;
    this.boatSpeed = mode === '200m' ? 30 : 20;
    this.lastBeatTime = 0;
    this.gradeText = '';
    this.gradeTimer = 0;
    this.synergyGauge = 0;
    this.distance = 0;
    this.finished = false;
    this.perfectStreak = 0;
    this.bends = [];
    this.bendActive = false;
    this.bendTimer = 0;
    this.bendProgress = 0;
    this.bendGradeText = '';
    this.bendGradeTimer = 0;
    this.totalBendPenalty = 0;
    this.finishPosition = 0;
    this.rivalDistance = 0;
    this.weather = this.getWeather();
    this.weatherTimer = 0;
    this.windOffset = 0;
    this.freeplayMode = false;

    Achievements.trackRaceStart();

    const isWorldFinal = STATE.inWorldChamps &&
      STATE.currentWorldVenue === 'racice';

    if (mode === '2000m') {
      if (isWorldFinal) {
        this.bends = [
          { at: 400,  triggered: false, complete: false },
          { at: 800,  triggered: false, complete: false },
          { at: 1300, triggered: false, complete: false },
          { at: 1700, triggered: false, complete: false },
        ];
      } else {
        this.bends = [
          { at: 500,  triggered: false, complete: false },
          { at: 1100, triggered: false, complete: false },
          { at: 1700, triggered: false, complete: false },
        ];
      }
      this.bpm = 90;
    } else if (mode === '200m') {
      this.bpm = 120;
    } else {
      this.bpm = 100;
    }

    if (this.weather === 'crosswind') {
      this.bendWindowDuration = 1.0;
    } else {
      this.bendWindowDuration = 1.2;
    }

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

  tapBend() {
    if (!this.bendActive) return;
    const centre = this.bendWindowDuration / 2;
    const dist = Math.abs(this.bendProgress - centre);
    const ratio = dist / centre;
    if (ratio < 0.15) {
      this.bendGradeText = 'PERFECT LINE';
      this.bendGradeTimer = 1.0;
      Achievements.trackBend('PERFECT LINE');
    } else if (ratio < 0.35) {
      this.bendGradeText = 'GOOD LINE';
      this.boatSpeed = Math.max(10, this.boatSpeed - 2);
      this.totalBendPenalty += 2;
      this.bendGradeTimer = 1.0;
      Achievements.trackBend('GOOD LINE');
    } else {
      this.bendGradeText = 'WIDE LINE';
      this.boatSpeed = Math.max(10, this.boatSpeed - 5);
      this.totalBendPenalty += 5;
      this.bendGradeTimer = 1.0;
      Achievements.trackBend('WIDE LINE');
    }
    this.bendActive = false;
  },

  update(deltaTime, timestamp) {
    if (!this.active || this.finished) return;

    this.weatherTimer += deltaTime;
    if (this.weather === 'crosswind') {
      this.windOffset = Math.sin(this.weatherTimer * 1.5) * 8;
    }

    const interval = (60 / this.bpm) * 1000;
    if (timestamp - this.lastBeatTime > interval) {
      this.beats.push({ x: 480, hit: false, missed: false });
      this.lastBeatTime = timestamp;
    }

    this.beats.forEach(b => b.x -= 150 * deltaTime);

    this.beats.forEach(b => {
      if (!b.hit && b.x < 44) {
        b.missed = true;
        const missPenalty = this.weather === 'choppy' ? 3 : 2;
        this.boatSpeed = Math.max(10, this.boatSpeed - missPenalty);
        this.perfectStreak = 0;
        this.synergyGauge = Math.max(0, this.synergyGauge - 10);
      }
    });

    this.beats = this.beats.filter(b => b.x > -20);

    this.distance += this.boatSpeed * deltaTime;
    this.boatX = 20 + (this.distance / this.maxDistance) * 400;

    const rivalBaseSpeed = this.distanceMode === '200m' ? 28
      : this.distanceMode === '2000m' ? 22 : 25;
    const weatherBonus = this.weather === 'choppy' ? 2 : 0;
    this.rivalDistance += (rivalBaseSpeed + weatherBonus) * deltaTime;

    if (this.gradeTimer > 0) this.gradeTimer -= deltaTime;
    if (this.bendGradeTimer > 0) this.bendGradeTimer -= deltaTime;

    if (this.distanceMode === '2000m') {
      this.bends.forEach(bend => {
        if (!bend.triggered && this.distance >= bend.at - 80) {
          bend.triggered = true;
          this.bendActive = true;
          this.bendTimer = 0;
          this.bendProgress = 0;
        }
      });

      if (this.bendActive) {
        this.bendTimer += deltaTime;
        this.bendProgress = this.bendTimer / this.bendWindowDuration;
        if (this.bendTimer >= this.bendWindowDuration) {
          if (this.bendGradeText === '' || this.bendGradeTimer <= 0) {
            this.bendGradeText = 'MISSED BEND!';
            this.bendGradeTimer = 1.0;
            this.boatSpeed = Math.max(10, this.boatSpeed - 8);
            this.totalBendPenalty += 8;
            Achievements.trackBend('MISSED');
          }
          this.bendActive = false;
          const incompleteBend = this.bends.find(
            b => b.triggered && !b.complete
          );
          if (incompleteBend) incompleteBend.complete = true;
        }
      }
    }

    if (this.synergyGauge >= 100) {
      this.boatSpeed = this.maxBoatSpeed;
      this.synergyGauge = 0;
      this.gradeText = 'SYNERGY!';
      this.gradeTimer = 1.0;
      AudioManager.playSFX('synergy');
      Achievements.trackSynergy();
    }

    if (this.distance >= this.maxDistance) {
      this.finished = true;
      this.active = false;
      this.saveResult();
    }
  },

  saveResult() {
    Achievements.trackRaceFinish(this.maxDistance);

    if (this.freeplayMode) return;

    const isFinale = VENUES[STATE.currentVenue] &&
      VENUES[STATE.currentVenue].isFinale;
    const isWorldFinale = STATE.inWorldChamps &&
      STATE.currentWorldVenue === 'racice';
    const isWorldRegular = STATE.inWorldChamps && !isWorldFinale;

    let result = 'loss';

    if (isFinale || isWorldFinale) {
      const rivals = this.getRivalSpeeds();
      const rivalPositions = rivals.map(r =>
        20 + (this.rivalDistance * r.speed / this.maxDistance) * 400
      );
      const position = rivalPositions.filter(
        rx => rx > this.boatX
      ).length + 1;
      this.finishPosition = position;
      result = position <= 2 ? 'win' : 'loss';
    } else {
      const rivalSpeed = this.getSingleRivalSpeed();
      const rivalX = 20 + (this.rivalDistance * rivalSpeed /
        this.maxDistance) * 400;
      result = this.boatX > rivalX ? 'win' : 'loss';
    }

    if (isWorldFinale) {
      if (this.distanceMode === '200m') {
        STATE.worldFinal200Result = result;
        STATE.worldFinalStage = 'after200';
      } else if (this.distanceMode === '500m') {
        STATE.worldFinal500Result = result;
        STATE.worldFinalStage = 'after500';
      } else if (this.distanceMode === '2000m') {
        STATE.worldFinal2000Result = result;
        STATE.worldFinalStage = 'complete';
        STATE.racedWorldFinal = true;
      }
      STATE.worldPoints += result === 'win' ? 15 : 5;
    } else if (isWorldRegular) {
      const venue = WORLD_VENUES[STATE.currentWorldVenue];
      if (venue) {
        STATE[venue.raceStateFlag] = true;
        STATE[venue.raceResultFlag] = result;
        STATE.worldPoints += result === 'win' ? 15 : 5;
        if (STATE.currentWorldVenue === 'duisburg' &&
            !STATE.worldVenuesUnlocked.includes('yueyang')) {
          STATE.worldVenuesUnlocked.push('yueyang');
        }
        if (STATE.currentWorldVenue === 'yueyang' &&
            !STATE.worldVenuesUnlocked.includes('racice')) {
          STATE.worldVenuesUnlocked.push('racice');
        }
      }
    } else if (isFinale) {
      if (this.distanceMode === '200m') {
        STATE.london200Result = result;
        STATE.londonStage = 'after200';
      } else if (this.distanceMode === '500m') {
        STATE.london500Result = result;
        STATE.londonStage = 'after500';
      } else if (this.distanceMode === '2000m') {
        STATE.london2000Result = result;
        STATE.londonStage = 'complete';
        STATE.racedLondon = true;
      }
      STATE.trophyPoints += result === 'win' ? 10 : 3;
    } else {
      const venue = VENUES[STATE.currentVenue];
      if (venue) {
        STATE[venue.raceStateFlag] = true;
        STATE[venue.raceResultFlag] = result;
        STATE.trophyPoints += result === 'win' ? 10 : 3;
        const unlockMap = {
          caldecotte:    'loughborough',
          loughborough:  'nottingham',
          nottingham:    'stneots',
          stneots:       'middlesbrough',
          middlesbrough: 'liverpool',
          liverpool:     'london',
        };
        const next = unlockMap[STATE.currentVenue];
        if (next && !STATE.venuesUnlocked.includes(next)) {
          STATE.venuesUnlocked.push(next);
        }
      }
    }

    STATE.save();
    Achievements.check();
  },

  tap() {
    if (this.showTutorial) {
      this.dismissTutorial();
      return;
    }
    if (!this.active || this.finished) return;

    const hitZone = 60 + (this.weather === 'crosswind' ?
      this.windOffset : 0);
    const hitRange = this.weather === 'crosswind' ? 28 : 40;

    const nearest = this.beats.find(
      b => !b.hit && !b.missed && Math.abs(b.x - hitZone) < hitRange
    );

    if (!nearest) {
      this.gradeText = 'MISS';
      this.gradeTimer = 0.6;
      this.boatSpeed = Math.max(10, this.boatSpeed - 2);
      this.perfectStreak = 0;
      this.synergyGauge = Math.max(0, this.synergyGauge - 5);
      AudioManager.playSFX('miss');
      Achievements.trackHit('MISS');
      return;
    }

    nearest.hit = true;
    const dist = Math.abs(nearest.x - hitZone);
    const perfectThresh = this.weather === 'crosswind' ? 5 : 8;
    const greatThresh   = this.weather === 'crosswind' ? 14 : 20;

    if (dist < perfectThresh) {
      this.gradeText = 'PERFECT';
      this.boatSpeed = Math.min(this.maxBoatSpeed, this.boatSpeed + 4);
      this.perfectStreak++;
      const synergyGain = this.weather === 'humid' ? 10 : 15;
      this.synergyGauge = Math.min(100, this.synergyGauge + synergyGain);
      AudioManager.playSFX('perfect');
      Achievements.trackHit('PERFECT');
    } else if (dist < greatThresh) {
      this.gradeText = 'GREAT';
      this.boatSpeed = Math.min(this.maxBoatSpeed, this.boatSpeed + 2);
      this.perfectStreak++;
      const synergyGain = this.weather === 'humid' ? 5 : 8;
      this.synergyGauge = Math.min(100, this.synergyGauge + synergyGain);
      AudioManager.playSFX('great');
      Achievements.trackHit('GREAT');
    } else {
      this.gradeText = 'OK';
      this.boatSpeed = Math.min(this.maxBoatSpeed, this.boatSpeed + 1);
      this.perfectStreak = 0;
      Achievements.trackHit('OK');
    }

    this.gradeTimer = 0.6;
  },

  drawBendMechanic(ctx) {
    if (!this.bendActive) return;

    ctx.fillStyle = '#ff9900';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BEND AHEAD — press Z!', 240, 310);

    const barX = 100;
    const barY = 318;
    const barW = 280;
    const barH = 10;

    ctx.fillStyle = '#222';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = '#5ae0a8';
    ctx.fillRect(barX + barW * 0.15, barY, barW * 0.70, barH);
    ctx.fillStyle = '#1D9E75';
    ctx.fillRect(barX + barW * 0.35, barY, barW * 0.30, barH);

    const cursorX = barX + this.bendProgress * barW;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cursorX - 2, barY - 3, 4, barH + 6);

    ctx.strokeStyle = '#888';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(barX, barY, barW, barH);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '7px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('WIDE', barX, barY + barH + 8);
    ctx.textAlign = 'center';
    ctx.fillText('PERFECT', 240, barY + barH + 8);
    ctx.textAlign = 'right';
    ctx.fillText('WIDE', barX + barW, barY + barH + 8);
  },

  drawTutorial(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.82)';
    ctx.fillRect(0, 0, 480, 432);
    ctx.fillStyle = '#111';
    ctx.fillRect(60, 60, 360, 300);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(60, 60, 360, 300);
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('HOW TO RACE', 240, 90);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 100);
    ctx.lineTo(400, 100);
    ctx.stroke();

    const lines = [
      { y:125, col:'#f0c040', text:'Yellow beats scroll right to left.' },
      { y:142, col:'#ffffff', text:'Press SPACE when a beat hits the white line.' },
      { y:166, col:'#1D9E75', text:'PERFECT  -- exactly on the line' },
      { y:180, col:'#88ddbb', text:'GREAT    -- close to the line' },
      { y:194, col:'#aaaaaa', text:'OK       -- near the line' },
      { y:208, col:'#cc3333', text:'MISS     -- too early or too late' },
      { y:230, col:'#ff9900', text:'Fill SYNERGY for a speed burst!' },
      { y:254, col:'#f0c040', text:'2000m ONLY -- bend mechanic:' },
      { y:270, col:'#ffffff', text:'When a bend appears, press Z' },
      { y:284, col:'#ffffff', text:'at the right moment to take' },
      { y:298, col:'#ffffff', text:'a clean line through the corner.' },
      { y:312, col:'#1D9E75', text:'Perfect line = no speed loss.' },
      { y:326, col:'#cc3333', text:'Missed bend = big speed penalty!' },
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
    ctx.fillText('[ Space ] to start racing', 240, 348);
  },

  draw(ctx) {
    if (!this.active && !this.finished && !this.showTutorial) return;

    const isWorldFinale = STATE.inWorldChamps &&
      STATE.currentWorldVenue === 'racice';
    const isFinale = !STATE.inWorldChamps &&
      VENUES[STATE.currentVenue] &&
      VENUES[STATE.currentVenue].isFinale;

    let rivalName = 'Rival';
    if (STATE.inWorldChamps) {
      const wv = WORLD_VENUES[STATE.currentWorldVenue];
      rivalName = wv ? wv.raceRival : 'Rival';
    } else {
      const v = VENUES[STATE.currentVenue];
      rivalName = v ? v.raceRival : 'Rival';
    }

    // Background
    ctx.fillStyle = '#1a5a8a';
    ctx.fillRect(0, 0, 480, 432);
    ctx.fillStyle = '#3a7d2c';
    ctx.fillRect(0, 0, 480, 40);
    ctx.fillRect(0, 320, 480, 112);

    // Weather overlay
    if (this.weather === 'choppy') {
      ctx.fillStyle = 'rgba(100,150,200,0.08)';
      ctx.fillRect(0, 40, 480, 280);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let w = 0; w < 8; w++) {
        ctx.beginPath();
        const wy = 60 + w * 32 + Math.sin(this.weatherTimer + w) * 3;
        ctx.moveTo(0, wy);
        ctx.lineTo(480, wy);
        ctx.stroke();
      }
    } else if (this.weather === 'humid') {
      ctx.fillStyle = 'rgba(200,150,50,0.06)';
      ctx.fillRect(0, 40, 480, 280);
    } else if (this.weather === 'crosswind') {
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let w = 0; w < 6; w++) {
        const wy = 50 + w * 45;
        const offset = (this.weatherTimer * 60 + w * 30) % 480;
        ctx.beginPath();
        ctx.moveTo(offset, wy);
        ctx.lineTo(offset + 40, wy);
        ctx.stroke();
      }
    }

    // Weather badge
    if (this.weather) {
      const wLabels = {
        choppy:    'CHOPPY WATER',
        humid:     'HOT + HUMID',
        crosswind: 'CROSSWIND',
      };
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(160, 2, 160, 16);
      ctx.fillStyle = '#ffcc44';
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(wLabels[this.weather] || '', 240, 13);
    }

    // Freeplay badge
    if (this.freeplayMode) {
      ctx.fillStyle = 'rgba(29,158,117,0.3)';
      ctx.fillRect(2, 2, 60, 14);
      ctx.fillStyle = '#1D9E75';
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FREEPLAY', 32, 12);
    }

    // Lane lines
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

    if (isFinale || isWorldFinale) {
      const rivals = this.getRivalSpeeds();
      rivals.forEach((rival, i) => {
        const laneY = 48 + i * 38;
        const rx = 20 + (this.rivalDistance * rival.speed /
          this.maxDistance) * 400;

        ctx.fillStyle = rival.colour;
        ctx.fillRect(rx, laneY + 6, 48, 7);
        ctx.fillRect(rx + 46, laneY + 7, 4, 5);
        ctx.fillRect(rx - 2, laneY + 7, 4, 5);

        for (let p = 0; p < 2; p++) {
          const px = rx + 8 + p * 18;
          ctx.fillStyle = rival.colour;
          ctx.fillRect(px, laneY + 1, 3, 5);
          ctx.fillStyle = '#f4c07a';
          ctx.fillRect(px, laneY - 1, 3, 3);
        }

        ctx.fillStyle = rival.colour;
        ctx.font = '6px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(rival.name, Math.min(rx, 390), laneY + 4);
      });

      const seckY = 285;
      ctx.fillStyle = '#8B1A1A';
      ctx.fillRect(this.boatX, seckY + 6, 52, 8);
      ctx.fillStyle = '#6B0A0A';
      ctx.fillRect(this.boatX + 50, seckY + 7, 4, 6);
      ctx.fillRect(this.boatX - 2, seckY + 7, 4, 6);
      for (let p = 0; p < 4; p++) {
        const px = this.boatX + 6 + p * 11;
        ctx.fillStyle = '#8B1A1A';
        ctx.fillRect(px, seckY, 4, 6);
        ctx.fillStyle = '#f4c07a';
        ctx.fillRect(px + 1, seckY - 3, 3, 4);
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(px - 2, seckY + 2, 2, 6);
        ctx.fillRect(px + 4, seckY + 2, 2, 6);
      }
      ctx.fillStyle = '#f4c07a';
      ctx.fillRect(this.boatX + 2, seckY - 2, 3, 4);
      ctx.fillStyle = '#f0c040';
      ctx.fillRect(this.boatX + 1, seckY, 5, 5);
      ctx.fillStyle = '#ffaaaa';
      ctx.font = '7px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('SECKLOW', Math.min(this.boatX, 390), seckY - 1);

    } else {
      const singleSpeed = this.getSingleRivalSpeed();
      const singleRivalX = 20 + (this.rivalDistance * singleSpeed /
        this.maxDistance) * 400;

      ctx.fillStyle = '#8B1A1A';
      ctx.fillRect(this.boatX, 164, 52, 8);
      ctx.fillStyle = '#6B0A0A';
      ctx.fillRect(this.boatX + 50, 165, 4, 6);
      ctx.fillRect(this.boatX - 2, 165, 4, 6);
      for (let p = 0; p < 4; p++) {
        const px = this.boatX + 6 + p * 11;
        ctx.fillStyle = '#8B1A1A';
        ctx.fillRect(px, 158, 4, 6);
        ctx.fillStyle = '#f4c07a';
        ctx.fillRect(px + 1, 155, 3, 4);
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(px - 2, 160, 2, 6);
        ctx.fillRect(px + 4, 160, 2, 6);
      }
      ctx.fillStyle = '#f4c07a';
      ctx.fillRect(this.boatX + 2, 156, 3, 4);
      ctx.fillStyle = '#f0c040';
      ctx.fillRect(this.boatX + 1, 158, 5, 5);

      ctx.fillStyle = '#1a1a8B';
      ctx.fillRect(singleRivalX, 194, 52, 8);
      ctx.fillStyle = '#0a0a6B';
      ctx.fillRect(singleRivalX + 50, 195, 4, 6);
      ctx.fillRect(singleRivalX - 2, 195, 4, 6);
      for (let p = 0; p < 4; p++) {
        const px = singleRivalX + 6 + p * 11;
        ctx.fillStyle = '#1a1a8B';
        ctx.fillRect(px, 188, 4, 6);
        ctx.fillStyle = '#c68642';
        ctx.fillRect(px + 1, 185, 3, 4);
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(px - 2, 190, 2, 6);
        ctx.fillRect(px + 4, 190, 2, 6);
      }
      ctx.fillStyle = '#c68642';
      ctx.fillRect(singleRivalX + 2, 186, 3, 4);
      ctx.fillStyle = '#cc2222';
      ctx.fillRect(singleRivalX + 1, 188, 5, 5);

      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffaaaa';
      ctx.fillText('SECKLOW', Math.min(this.boatX, 400), 158);
      ctx.fillStyle = '#aaaaff';
      ctx.fillText(rivalName.toUpperCase(),
        Math.min(singleRivalX, 400), 188);
    }

    // Finish line
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

    // Crosswind moving hit zone
    if (this.weather === 'crosswind' && this.active) {
      const hitZone = 60 + this.windOffset;
      ctx.strokeStyle = 'rgba(100,200,255,0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(hitZone, 370);
      ctx.lineTo(hitZone, 402);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Distance bar
    const distPct = Math.min(this.distance / this.maxDistance, 1);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(20, 330, 440, 8);
    ctx.fillStyle = '#8B1A1A';
    ctx.fillRect(20, 330, distPct * 440, 8);

    if (this.distanceMode === '2000m') {
      this.bends.forEach(bend => {
        const bx = 20 + (bend.at / this.maxDistance) * 440;
        ctx.fillStyle = bend.complete ? '#555' : '#ff9900';
        ctx.fillRect(bx - 1, 328, 3, 12);
      });
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(this.distanceMode, 20, 348);
    ctx.textAlign = 'right';
    ctx.fillText(Math.floor(this.distance) + 'm', 460, 348);

    // Points tracker
    if (STATE.inWorldChamps) {
      ctx.fillStyle = '#4488ff';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('WC: ' + STATE.worldPoints + 'pts', 20, 360);
    }

    // Synergy gauge
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(20, 354, 200, 6);
    ctx.fillStyle = this.weather === 'humid' ? '#ff9900' : '#f0c040';
    ctx.fillRect(20, 354, (this.synergyGauge / 100) * 200, 6);
    ctx.fillStyle = '#f0c040';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SYNERGY', 228, 361);

    // Rhythm lane
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

    this.drawBendMechanic(ctx);

    if (this.gradeTimer > 0) {
      const colours = {
        'PERFECT':  '#f0c040',
        'GREAT':    '#1D9E75',
        'OK':       '#ffffff',
        'MISS':     '#cc3333',
        'SYNERGY!': '#ff9900',
      };
      ctx.fillStyle = colours[this.gradeText] || '#ffffff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(this.gradeText, 240, 368);
    }

    if (this.bendGradeTimer > 0) {
      const bcols = {
        'PERFECT LINE': '#1D9E75',
        'GOOD LINE':    '#f0c040',
        'WIDE LINE':    '#cc3333',
        'MISSED BEND!': '#cc3333',
      };
      ctx.fillStyle = bcols[this.bendGradeText] || '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(this.bendGradeText, 240, 298);
    }

    if (this.distanceMode === '2000m' && !this.bendActive) {
      ctx.fillStyle = '#333';
      ctx.font = '7px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('[ Z ] bend', 472, 368);
    }

    if (this.showTutorial) {
      this.drawTutorial(ctx);
      return;
    }

    if (this.finished) {
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(80, 130, 320, 160);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(80, 130, 320, 160);

      if ((isFinale || isWorldFinale) && this.finishPosition > 0) {
        const posLabels = ['','1ST','2ND','3RD','4TH','5TH','6TH','7TH'];
        const posColour = this.finishPosition === 1 ? '#f0c040'
          : this.finishPosition === 2 ? '#c0c0c0'
          : this.finishPosition === 3 ? '#c08040' : '#aaaaaa';
        ctx.fillStyle = posColour;
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(posLabels[this.finishPosition] + ' PLACE',
          240, 165);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText('Secklow finish ' +
          posLabels[this.finishPosition].toLowerCase() +
          ' in the ' + this.distanceMode, 240, 182);
        const wins = isWorldFinale ?
          STATE.getWorldWins() : STATE.getLondonWins();
        ctx.fillStyle = '#aaaaaa';
        ctx.fillText(wins + ' final' +
          (wins !== 1 ? 's' : '') + ' won so far', 240, 197);
      } else {
        const singleSpeed = this.getSingleRivalSpeed();
        const finalRivalX = 20 + (this.rivalDistance * singleSpeed /
          this.maxDistance) * 400;
        const won = this.boatX > finalRivalX;
        ctx.fillStyle = won ? '#f0c040' : '#aaaaaa';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(won ? 'SECKLOW WIN!' :
          rivalName.toUpperCase() + ' WIN!', 240, 165);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(this.distanceMode + ' complete.', 240, 182);
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      const pts = STATE.inWorldChamps ?
        STATE.worldPoints : STATE.trophyPoints;
      const ptsLabel = STATE.inWorldChamps ?
        'World points: ' : 'Trophy points: ';
      ctx.fillText(ptsLabel + pts, 240, 215);

      if (this.freeplayMode) {
        ctx.fillStyle = '#1D9E75';
        ctx.font = '8px monospace';
        ctx.fillText('FREEPLAY — no progress saved', 240, 230);
      } else if (this.distanceMode === '2000m' &&
                 this.totalBendPenalty > 0) {
        ctx.fillStyle = '#cc3333';
        ctx.fillText('Bend penalty: -' + this.totalBendPenalty +
          ' speed', 240, 230);
      }

      ctx.fillStyle = '#aaaaaa';
      ctx.fillText('[ Space ] to return', 240, 268);
    }
  }
};