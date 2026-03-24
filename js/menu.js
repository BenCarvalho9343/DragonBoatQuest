const Menu = {
  open: false,
  selectedOption: 0,
  confirmingRestart: false,

  options: [
    { label: 'Resume',       action: 'resume'       },
    { label: 'Freeplay',     action: 'freeplay'     },
    { label: 'Achievements', action: 'achievements' },
    { label: 'Credits',      action: 'credits'      },
    { label: 'League table', action: 'league'       },
    { label: 'Music volume', action: 'music'        },
    { label: 'SFX volume',   action: 'sfx'          },
    { label: 'Restart game', action: 'restart'      },
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
        if (this.selectedOption === 0) this.restart();
        else {
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

    if (key === 'ArrowUp')
      this.selectedOption = Math.max(0, this.selectedOption - 1);
    if (key === 'ArrowDown')
      this.selectedOption = Math.min(
        this.options.length - 1, this.selectedOption + 1);
    if (key === 'ArrowLeft') this.adjustValue(-1);
    if (key === 'ArrowRight') this.adjustValue(1);
    if (key === ' ' || key === 'Enter') this.selectOption();
    if (key === 'Escape') this.close();
  },

  adjustValue(dir) {
    const opt = this.options[this.selectedOption];
    if (opt.action === 'music') {
      AudioManager.musicVolume = Math.max(0,
        Math.min(1, AudioManager.musicVolume + dir * 0.1));
      AudioManager.musicVolume =
        Math.round(AudioManager.musicVolume * 10) / 10;
      Object.values(AudioManager.tracks).forEach(t => {
        t.volume = AudioManager.musicVolume;
      });
    }
    if (opt.action === 'sfx') {
      AudioManager.sfxVolume = Math.max(0,
        Math.min(1, AudioManager.sfxVolume + dir * 0.1));
      AudioManager.sfxVolume =
        Math.round(AudioManager.sfxVolume * 10) / 10;
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
    if (opt.action === 'freeplay') {
      Freeplay.open = true;
      this.open = false;
      this.confirmingRestart = false;
    }
    if (opt.action === 'achievements') {
      Achievements.open = true;
      this.open = false;
      this.confirmingRestart = false;
    }
    if (opt.action === 'credits') {
      Credits.open = true;
      this.open = false;
      this.confirmingRestart = false;
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

    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, 480, 432);

    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(100, 50, 280, 380);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(100, 50, 280, 380);

    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', 240, 76);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(120, 86);
    ctx.lineTo(360, 86);
    ctx.stroke();

    if (this.confirmingRestart) {
      ctx.fillStyle = '#cc3333';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Restart game?', 240, 180);
      ctx.fillStyle = '#aaaaaa';
      ctx.font = '9px monospace';
      ctx.fillText('All progress will be lost.', 240, 198);
      ctx.fillText('You will start from Caldecotte.', 240, 212);

      const yesSelected = this.selectedOption === 0;
      const noSelected  = this.selectedOption === 1;

      ctx.fillStyle = yesSelected ?
        'rgba(200,50,50,0.8)' : 'rgba(255,255,255,0.1)';
      ctx.fillRect(120, 235, 80, 32);
      ctx.strokeStyle = yesSelected ? '#cc3333' : '#444';
      ctx.lineWidth = 1;
      ctx.strokeRect(120, 235, 80, 32);
      ctx.fillStyle = yesSelected ? '#ffffff' : '#888';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('YES', 160, 256);

      ctx.fillStyle = noSelected ?
        'rgba(30,158,117,0.8)' : 'rgba(255,255,255,0.1)';
      ctx.fillRect(240, 235, 80, 32);
      ctx.strokeStyle = noSelected ? '#1D9E75' : '#444';
      ctx.lineWidth = 1;
      ctx.strokeRect(240, 235, 80, 32);
      ctx.fillStyle = noSelected ? '#ffffff' : '#888';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NO', 280, 256);

      ctx.fillStyle = '#555';
      ctx.font = '8px monospace';
      ctx.fillText('[ arrows ] select    [ Space ] confirm',
        240, 300);
      return;
    }

    this.options.forEach((opt, i) => {
      const oy = 98 + i * 36;
      const isSelected = this.selectedOption === i;

      ctx.fillStyle = isSelected ?
        'rgba(240,192,64,0.15)' : 'transparent';
      ctx.fillRect(110, oy - 12, 260, 30);

      if (isSelected) {
        ctx.strokeStyle = '#f0c040';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(110, oy - 12, 260, 30);
        ctx.fillStyle = '#f0c040';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('>', 116, oy + 4);
      }

      ctx.fillStyle = isSelected ? '#f0c040' : '#aaaaaa';
      ctx.font = isSelected ? 'bold 11px monospace' : '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(opt.label, 130, oy + 4);

      if (opt.action === 'music') {
        const vol = Math.round(AudioManager.musicVolume * 10);
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('< ' + vol + '/10 >', 368, oy + 4);
        ctx.fillStyle = '#222';
        ctx.fillRect(130, oy + 8, 180, 5);
        ctx.fillStyle = isSelected ? '#f0c040' : '#555';
        ctx.fillRect(130, oy + 8, AudioManager.musicVolume * 180, 5);
      }

      if (opt.action === 'sfx') {
        const vol = Math.round(AudioManager.sfxVolume * 10);
        ctx.fillStyle = '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('< ' + vol + '/10 >', 368, oy + 4);
        ctx.fillStyle = '#222';
        ctx.fillRect(130, oy + 8, 180, 5);
        ctx.fillStyle = isSelected ? '#1D9E75' : '#555';
        ctx.fillRect(130, oy + 8, AudioManager.sfxVolume * 180, 5);
      }

      if (opt.action === 'restart') {
        ctx.fillStyle = isSelected ? '#cc3333' : '#555';
        ctx.font = '8px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('clear all progress', 368, oy + 4);
      }
    });

    ctx.fillStyle = '#333';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ arrows ] navigate    [ Esc ] close', 240, 416);
  },
};