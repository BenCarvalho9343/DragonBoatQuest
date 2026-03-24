const Achievements = {
  open: false,
  popupQueue: [],
  currentPopup: null,
  scrollY: 0,
  popupTimer: 0,
  popupDuration: 3.0,

  list: [
    {
      id: 'first_win',
      name: 'First Blood',
      desc: 'Win your first race',
      icon: '!',
      unlocked: false,
      secret: false,
    },
    {
      id: 'caldecotte_win',
      name: 'Home Water',
      desc: 'Win at Caldecotte Lake',
      icon: '~',
      unlocked: false,
      secret: false,
    },
    {
      id: 'loughborough_win',
      name: 'River Soar Conqueror',
      desc: 'Win at Loughborough',
      icon: '>',
      unlocked: false,
      secret: false,
    },
    {
      id: 'nottingham_win',
      name: 'Trent Tamer',
      desc: 'Win at Nottingham',
      icon: 'S',
      unlocked: false,
      secret: false,
    },
    {
      id: 'stneots_win',
      name: 'Meadow Victory',
      desc: 'Win at St Neots',
      icon: '*',
      unlocked: false,
      secret: false,
    },
    {
      id: 'middlesbrough_win',
      name: 'Northern Grit',
      desc: 'Win at Middlesbrough',
      icon: '#',
      unlocked: false,
      secret: false,
    },
    {
      id: 'liverpool_win',
      name: 'Mersey Marvel',
      desc: 'Win at Liverpool',
      icon: '@',
      unlocked: false,
      secret: false,
    },
    {
      id: 'national_champion',
      name: 'National Champion',
      desc: 'Win the BDA National League',
      icon: 'N',
      unlocked: false,
      secret: false,
    },
    {
      id: 'world_unlocked',
      name: 'Going Global',
      desc: 'Unlock the World Championships',
      icon: 'W',
      unlocked: false,
      secret: false,
    },
    {
      id: 'world_champion',
      name: 'World Champion',
      desc: 'Win the IDBF World Championships',
      icon: 'G',
      unlocked: false,
      secret: false,
    },
    {
      id: 'perfect_run',
      name: 'Perfect Rhythm',
      desc: 'Complete a race with all PERFECT hits',
      icon: 'P',
      unlocked: false,
      secret: false,
    },
    {
      id: 'distance_10000',
      name: 'Long Haul',
      desc: 'Race a total of 10,000m',
      icon: 'D',
      unlocked: false,
      secret: false,
    },
    {
      id: 'mk_represent',
      name: 'MK Represent',
      desc: 'Beat Thames Valley on their home water',
      icon: 'M',
      unlocked: false,
      secret: true,
    },
    {
      id: 'synergy_overload',
      name: 'Synergy Overload',
      desc: 'Trigger 5 synergy bursts in a single race',
      icon: 'Z',
      unlocked: false,
      secret: true,
    },
    {
      id: 'perfect_bends',
      name: 'Perfect Lines',
      desc: 'Hit perfect on all 4 bends at Racice',
      icon: 'B',
      unlocked: false,
      secret: true,
    },
    {
      id: 'globe_trotter',
      name: 'Globe Trotter',
      desc: 'Visit all 3 international venues',
      icon: 'T',
      unlocked: false,
      secret: true,
    },
    {
      id: 'tims_favourite',
      name: "Tim's Favourite",
      desc: 'Win every race in the National League',
      icon: 'F',
      unlocked: false,
      secret: true,
    },
    {
      id: 'against_all_odds',
      name: 'Against All Odds',
      desc: 'Win World Champs after losing 200m and 500m',
      icon: 'A',
      unlocked: false,
      secret: true,
    },
    {
      id: 'talk_to_everyone',
      name: 'Social Butterfly',
      desc: 'Talk to every NPC in the game',
      icon: 'C',
      unlocked: false,
      secret: true,
    },
  ],

  npcsMet: [],
  totalDistance: 0,
  currentRaceSynergyCount: 0,
  currentRacePerfectBends: 0,
  currentRaceAllPerfect: true,
  currentRaceHitCount: 0,

  load() {
    const saved = localStorage.getItem('dbq_achievements');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.unlocked) {
        data.unlocked.forEach(id => {
          const a = this.list.find(a => a.id === id);
          if (a) a.unlocked = true;
        });
      }
      if (data.npcsMet) this.npcsMet = data.npcsMet;
      if (data.totalDistance) this.totalDistance = data.totalDistance;
    }
  },

  save() {
    localStorage.setItem('dbq_achievements', JSON.stringify({
      unlocked: this.list.filter(a => a.unlocked).map(a => a.id),
      npcsMet: this.npcsMet,
      totalDistance: this.totalDistance,
    }));
  },

  unlock(id) {
    const a = this.list.find(a => a.id === id);
    if (!a || a.unlocked) return;
    a.unlocked = true;
    this.popupQueue.push(a);
    this.save();
  },

  check() {
    if (STATE.caldecotteResult === 'win' ||
        STATE.loughboroughResult === 'win' ||
        STATE.nottinghamResult === 'win' ||
        STATE.stneotResult === 'win' ||
        STATE.middlesbroughResult === 'win' ||
        STATE.liverpoolResult === 'win') {
      this.unlock('first_win');
    }
    if (STATE.caldecotteResult === 'win') this.unlock('caldecotte_win');
    if (STATE.loughboroughResult === 'win') this.unlock('loughborough_win');
    if (STATE.nottinghamResult === 'win') this.unlock('nottingham_win');
    if (STATE.stneotResult === 'win') this.unlock('stneots_win');
    if (STATE.middlesbroughResult === 'win') this.unlock('middlesbrough_win');
    if (STATE.liverpoolResult === 'win') this.unlock('liverpool_win');
    if (STATE.getLondonEnding && STATE.getLondonEnding() === 'champion')
      this.unlock('national_champion');
    if (STATE.worldUnlocked) this.unlock('world_unlocked');
    if (STATE.getWorldEnding && STATE.getWorldEnding() === 'champion')
      this.unlock('world_champion');
    if (STATE.london200Result === 'win' ||
        STATE.london500Result === 'win' ||
        STATE.london2000Result === 'win') {
      this.unlock('mk_represent');
    }
    if (STATE.caldecotteResult === 'win' &&
        STATE.loughboroughResult === 'win' &&
        STATE.nottinghamResult === 'win' &&
        STATE.stneotResult === 'win' &&
        STATE.middlesbroughResult === 'win' &&
        STATE.liverpoolResult === 'win') {
      this.unlock('tims_favourite');
    }
    if (STATE.racedDuisburg && STATE.racedYueyang && STATE.racedWorldFinal)
      this.unlock('globe_trotter');
    if (STATE.worldFinal200Result === 'loss' &&
        STATE.worldFinal500Result === 'loss' &&
        STATE.worldFinal2000Result === 'win') {
      this.unlock('against_all_odds');
    }
    if (this.totalDistance >= 10000) this.unlock('distance_10000');
    const allNPCs = [
      'Coach Tim', 'Soaring Captain', 'River Marshal', 'Ada',
      'Anaconda Captain', 'Trent Marshal', 'Supporter',
      'St Neots Captain', 'Festival MC', 'Local Fan',
      'Powerhouse Captain', 'Tees Marshal', 'Steel Worker',
      'Amathus Captain', 'Dock Marshal', 'Mersey Local',
      'Thames Captain', 'BDA Official', 'Fire Captain',
      'World Official', 'CGCSA Captain', 'Local Guide',
      'Viking Captain', 'IDBF Official',
    ];
    if (allNPCs.every(name => this.npcsMet.includes(name)))
      this.unlock('talk_to_everyone');
  },

  trackNPC(name) {
    if (!this.npcsMet.includes(name)) {
      this.npcsMet.push(name);
      this.save();
      this.check();
    }
  },

  trackRaceStart() {
    this.currentRaceSynergyCount = 0;
    this.currentRacePerfectBends = 0;
    this.currentRaceAllPerfect = true;
    this.currentRaceHitCount = 0;
  },

  trackHit(grade) {
    this.currentRaceHitCount++;
    if (grade !== 'PERFECT') this.currentRaceAllPerfect = false;
  },

  trackSynergy() {
    this.currentRaceSynergyCount++;
    if (this.currentRaceSynergyCount >= 5)
      this.unlock('synergy_overload');
  },

  trackBend(grade) {
    if (grade === 'PERFECT LINE') {
      this.currentRacePerfectBends++;
    } else {
      this.currentRacePerfectBends = -999;
    }
  },

  trackRaceFinish(distanceRaced) {
    this.totalDistance += distanceRaced;
    this.save();
    if (this.currentRaceAllPerfect && this.currentRaceHitCount > 0)
      this.unlock('perfect_run');
    if (STATE.inWorldChamps &&
        STATE.currentWorldVenue === 'racice' &&
        race.distanceMode === '2000m' &&
        this.currentRacePerfectBends === 4) {
      this.unlock('perfect_bends');
    }
    this.check();
  },

  update(deltaTime) {
    if (this.currentPopup) {
      this.popupTimer -= deltaTime;
      if (this.popupTimer <= 0) {
        this.currentPopup = null;
        if (this.popupQueue.length > 0) {
          this.currentPopup = this.popupQueue.shift();
          this.popupTimer = this.popupDuration;
        }
      }
    } else if (this.popupQueue.length > 0) {
      this.currentPopup = this.popupQueue.shift();
      this.popupTimer = this.popupDuration;
    }
  },

  drawPopup(ctx) {
    if (!this.currentPopup) return;
    const a = this.currentPopup;
    const fade = Math.min(1, this.popupTimer / 0.4);
    ctx.globalAlpha = fade;
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(100, 54, 280, 44);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 1;
    ctx.strokeRect(100, 54, 280, 44);
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 7px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('ACHIEVEMENT UNLOCKED', 114, 66);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('[' + a.icon + '] ' + a.name, 114, 80);
    ctx.fillStyle = '#888';
    ctx.font = '7px monospace';
    ctx.fillText(a.desc, 114, 91);
    ctx.globalAlpha = 1;
  },

  toggle() { this.open = !this.open; },
  close()  { this.open = false; },

handleKey(key) {
    if (!this.open) return;
    if (key === 'ArrowDown') this.scrollY += 26;
    if (key === 'ArrowUp') this.scrollY = Math.max(0, this.scrollY - 26);
    if (key === 'Escape') this.close();
  },

  close() {
    this.open = false;
    this.scrollY = 0;
  },

  toggle() {
    this.open = !this.open;
    this.scrollY = 0;
  },

  draw(ctx) {
    if (!this.open) return;

    ctx.fillStyle = 'rgba(0,0,0,0.88)';
    ctx.fillRect(0, 0, 480, 432);
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(20, 20, 440, 392);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, 440, 392);

    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ACHIEVEMENTS', 240, 46);

    const unlocked = this.list.filter(a => a.unlocked).length;
    ctx.fillStyle = '#555';
    ctx.font = '8px monospace';
    ctx.fillText(unlocked + ' / ' + this.list.length + ' unlocked',
      240, 58);

    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(40, 64);
    ctx.lineTo(440, 64);
    ctx.stroke();

    // Build display list
    const visible = this.list.filter(a => a.unlocked || !a.secret);
    const secretCount = this.list.filter(
      a => !a.unlocked && a.secret).length;
    const display = [...visible];
    if (secretCount > 0) {
      display.push({
        id: 'secret',
        name: secretCount + ' secret achievement' +
          (secretCount !== 1 ? 's' : '') + ' remaining',
        desc: 'Keep playing to unlock',
        icon: '?',
        unlocked: false,
        secret: true,
      });
    }

    // Clip scrollable area
    ctx.save();
    ctx.beginPath();
    ctx.rect(20, 66, 440, 340);
    ctx.clip();

    display.forEach((a, i) => {
      const ay = 72 + i * 26 - this.scrollY;
      if (ay < 60 || ay > 410) return;

      if (a.unlocked) {
        ctx.fillStyle = 'rgba(240,192,64,0.08)';
        ctx.fillRect(28, ay - 2, 424, 22);
      }

      ctx.fillStyle = a.unlocked ? '#f0c040' : '#333';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('[' + a.icon + ']', 34, ay + 10);

      ctx.fillStyle = a.unlocked ? '#ffffff' : '#444';
      ctx.font = a.unlocked ? 'bold 9px monospace' : '9px monospace';
      ctx.fillText(a.name, 58, ay + 10);

      ctx.fillStyle = a.unlocked ? '#666' : '#333';
      ctx.font = '7px monospace';
      ctx.fillText(a.desc, 58, ay + 19);

      if (a.unlocked) {
        ctx.fillStyle = '#1D9E75';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('DONE', 444, ay + 10);
      }
    });

    ctx.restore();

    // Fade top and bottom
    const fadeTop = ctx.createLinearGradient(0, 64, 0, 90);
    fadeTop.addColorStop(0, '#0a0a1a');
    fadeTop.addColorStop(1, 'rgba(10,10,26,0)');
    ctx.fillStyle = fadeTop;
    ctx.fillRect(20, 64, 440, 26);

    const fadeBot = ctx.createLinearGradient(0, 376, 0, 406);
    fadeBot.addColorStop(0, 'rgba(10,10,26,0)');
    fadeBot.addColorStop(1, '#0a0a1a');
    ctx.fillStyle = fadeBot;
    ctx.fillRect(20, 376, 440, 30);

    ctx.fillStyle = '#333';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ up/down ] scroll    [ Esc ] close', 240, 402);
  },
};