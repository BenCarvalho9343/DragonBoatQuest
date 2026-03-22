const Menu = {
  open: false,
  selectedOption: 0,
  confirmingRestart: false,

  options: [
    { label: 'Resume',        action: 'resume'  },
    { label: 'League Table',  action: 'league'  },
    { label: 'Music volume',  action: 'music'   },
    { label: 'SFX volume',    action: 'sfx'     },
    { label: 'Restart game',  action: 'restart' },
  ],

  toggle() {
    this.open = !this.open;
    this.confirmingRestart = false;
    this.selectedOption = 0;
    if (this.open) {
      AudioManager.playTrack('menu');
    } else {
      AudioManager.playTrack(
        AudioManager.getTrackForVenue(STATE.currentVenue)
      );
    }
  },

  close() {
    this.open = false;
    this.confirmingRestart = false;
    AudioManager.playTrack(
      AudioManager.getTrackForVenue(STATE.currentVenue)
    );
  },

  restart() {
    localStorage.clear();
    location.reload();
  },

  handleKey(key) {
    if (!this.open) return;

    if (this.confirmingRestart) {
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        this.selectedOption = this.selectedOption === 0 ? 1 : 0;
      }
      if (key === ' ' || key === 'Enter') {
        if (this.selectedOption === 0) {
          this.restart();
        } else {
          this.confirmingRestart = false;
          this.selectedOption = 0;
        }
      }
      if (key === 'Escape') {
        this.confirmingRestart = false;
        this.selectedOption = 0;
      }
      return;
    }

    if (key === 'ArrowUp') {
      this.selectedOption = Math.max(0, this.selectedOption - 1);
    }
    if (key === 'ArrowDown') {
      this.selectedOption = Math.min(
        this.options.length - 1, this.selectedOption + 1
      );
    }
    if (key === 'ArrowLeft') {
      this.adjustValue(-1);
    }
    if (key === 'ArrowRight') {
      this.adjustValue(1);
    }
    if (key === ' ' || key === 'Enter') {
      this.selectOption();
    }
    if (key === 'Escape') {
      this.close();
    }
  },

  adjustValue(dir) {
    const opt = this.options[this.selectedOption];
    if (opt.action === 'music') {
      AudioManager.musicVolume = Math.max(0,
        Math.min(1, AudioManager.musicVolume + dir * 0.1));
      AudioManager.musicVolume = Math.round(
        AudioManager.musicVolume * 10) / 10;
      Object.values(AudioManager.tracks).forEach(t => {
        t.volume = AudioManager.musicVolume;
      });
    }
    if (opt.action === 'sfx') {
      AudioManager.sfxVolume = Math.max(0,
        Math.min(1, AudioManager.sfxVolume + dir * 0.1));
      AudioManager.sfxVolume = Math.round(
        AudioManager.sfxVolume * 10) / 10;
      Object.values(AudioManager.sfx).forEach(s => {
        s.volume = AudioManager.sfxVolume;
      });
    }
  },

  selectOption() {
    const opt = this.options[this.selectedOption];
    if (opt.action === 'resume') {
      this.close();
    }
    if (opt.action === 'league') {
      LeagueTable.open = true;
      this.open = false;
      this.confirmingRestart = false;
    }
    if (opt.action === 'restart') {
      this.confirmingRestart = true;
      this.selectedOption = 1;
    }
  },

  draw(ctx) {
    if (!this.open) return;

    // Dim background
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, 480, 432);

    // Menu box
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(120, 80, 240, 270);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(120, 80, 240, 270);

    // Title
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', 240, 108);

    // Divider
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(140, 118);
    ctx.lineTo(340, 118);
    ctx.stroke();

    if (this.confirmingRestart) {
      // Restart confirmation
      ctx.fillStyle = '#cc3333';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Restart game?', 240, 155);

      ctx.fillStyle = '#aaaaaa';
      ctx.font = '9px monospace';
      ctx.fillText('All progress will be lost.', 240, 172);
      ctx.fillText('You will start from Caldecotte.', 240, 186);

      // Yes / No buttons
      const yesSelected = this.selectedOption === 0;
      const noSelected  = this.selectedOption === 1;

      ctx.fillStyle = yesSelected ?
        'rgba(200,50,50,0.8)' : 'rgba(255,255,255,0.1)';
      ctx.fillRect(140, 210, 80, 32);
      ctx.strokeStyle = yesSelected ? '#cc3333' : '#444';
      ctx.lineWidth = 1;
      ctx.strokeRect(140, 210, 80, 32);
      ctx.fillStyle = yesSelected ? '#ffffff' : '#888';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('YES', 180, 231);

      ctx.fillStyle = noSelected ?
        'rgba(30,158,117,0.8)' : 'rgba(255,255,255,0.1)';
      ctx.fillRect(260, 210, 80, 32);
      ctx.strokeStyle = noSelected ? '#1D9E75' : '#444';
      ctx.lineWidth = 1;
      ctx.strokeRect(260, 210, 80, 32);
      ctx.fillStyle = noSelected ? '#ffffff' : '#888';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NO', 300, 231);

      ctx.fillStyle = '#555';
      ctx.font = '8px monospace';
      ctx.fillText('[ arrows ] select    [ Space ] confirm', 240, 270);
      return;
    }

    // Menu options
    this.options.forEach((opt, i) => {
      const oy = 138 + i * 48;
      const isSelected = this.selectedOption === i;

      ctx.fillStyle = isSelected ?
        'rgba(240,192,64,0.15)' : 'transparent';
      ctx.fillRect(130, oy - 14, 220, 36);

      if (isSelected) {
        ctx.strokeStyle = '#f0c040';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(130, oy - 14, 220, 36);
      }

      // Arrow indicator
      if (isSelected) {
        ctx.fillStyle = '#f0c040';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('›', 136, oy + 4);
      }

      ctx.fillStyle = isSelected ? '#f0c040' : '#aaaaaa';
      ctx.font = isSelected ? 'bold 11px monospace' : '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(opt.label, 150, oy + 4);

      // Value display for volume options
      if (opt.action === 'music') {
        const vol = Math.round(AudioManager.musicVolume * 10);
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('◄ ' + vol + '/10 ►', 338, oy + 4);
        // Volume bar
        ctx.fillStyle = '#222';
        ctx.fillRect(150, oy + 10, 180, 6);
        ctx.fillStyle = isSelected ? '#f0c040' : '#555';
        ctx.fillRect(150, oy + 10,
          AudioManager.musicVolume * 180, 6);
      }

      if (opt.action === 'sfx') {
        const vol = Math.round(AudioManager.sfxVolume * 10);
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('◄ ' + vol + '/10 ►', 338, oy + 4);
        ctx.fillStyle = '#222';
        ctx.fillRect(150, oy + 10, 180, 6);
        ctx.fillStyle = isSelected ? '#1D9E75' : '#555';
        ctx.fillRect(150, oy + 10,
          AudioManager.sfxVolume * 180, 6);
      }

      if (opt.action === 'restart') {
        ctx.fillStyle = isSelected ? '#cc3333' : '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('clear all progress', 338, oy + 4);
      }
    });

    // Controls hint
    ctx.fillStyle = '#333';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ arrows ] navigate    [ Esc ] close', 240, 336);
  },
};