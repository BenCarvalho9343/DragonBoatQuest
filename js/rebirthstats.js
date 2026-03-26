const RebirthStats = {
  open: false,
  scrollY: 0,

  toggle() {
    this.open = !this.open;
    this.scrollY = 0;
  },

  close() {
    this.open = false;
  },

  handleKey(key) {
    if (!this.open) return;

    if (key === 'ArrowUp') {
      this.scrollY = Math.max(0, this.scrollY - 20);
    }
    if (key === 'ArrowDown') {
      this.scrollY += 20;
    }
    if (key === 'r' || key === 'R') {
      // Check if rebirth is unlocked before allowing
      if (!STATE.rebirthUnlocked) {
        return; // Don't allow rebirth, game not completed yet
      }
      // Trigger rebirth
      Menu.open = true;
      RebirthStats.open = false;
      Menu.showingRebirthConfirm = true;
      Menu.rebirthConfirmSelection = 1;
    }
    if (key === 'Escape' || key === ' ') {
      this.close();
      Menu.open = false;
    }
  },

  draw(ctx) {
    if (!this.open) return;

    // Reset canvas state
    ctx.restore();
    ctx.save();
    ctx.resetTransform();

    // Dark overlay
    ctx.fillStyle = 'rgba(0,0,0,0.88)';
    ctx.fillRect(0, 0, 480, 432);
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(20, 20, 440, 392);
    ctx.strokeStyle = '#4488ff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, 440, 392);

    // Title
    ctx.fillStyle = '#4488ff';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('REBIRTH STATISTICS', 240, 45);

    // Stats content
    ctx.save();
    ctx.beginPath();
    ctx.rect(30, 60, 420, 330);
    ctx.clip();

    let y = 70 - this.scrollY;
    const lineHeight = 16;

    // Lifetime stats
    ctx.fillStyle = '#4488ff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('LIFETIME STATISTICS', 40, y);
    y += lineHeight * 1.5;

    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText('Rebirths: ' + STATE.rebirths, 40, y);
    y += lineHeight;

    ctx.fillText('Total Trophy Points: ' + (STATE.lifetimeStats.totalTrophyPoints || 0), 40, y);
    y += lineHeight;

    // Calculate total playtime including current session
    let totalPlaytimeSeconds = STATE.lifetimeStats.playtimeSeconds || 0;
    if (STATE.currentPlaythroughStats.startTime) {
      const currentSessionMs = performance.now() - STATE.currentPlaythroughStats.startTime;
      const currentSessionSeconds = Math.floor(currentSessionMs / 1000);
      totalPlaytimeSeconds += currentSessionSeconds;
    }
    const hours = Math.floor(totalPlaytimeSeconds / 3600);
    const minutes = Math.floor((totalPlaytimeSeconds % 3600) / 60);
    ctx.fillText('Total Playtime: ' + hours + 'h ' + minutes + 'm', 40, y);
    y += lineHeight * 2;

    // Playthroughs
    if (STATE.lifetimeStats.playthroughs.length > 0) {
      ctx.fillStyle = '#4488ff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('PLAYTHROUGH HISTORY', 40, y);
      y += lineHeight * 1.5;

      STATE.lifetimeStats.playthroughs.forEach((run, idx) => {
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '9px monospace';
        const runNum = idx + 1;
        const endingLabel = run.worldEnding ? run.worldEnding.toUpperCase() : 
                           (run.londonEnding ? run.londonEnding.toUpperCase() : 'INCOMPLETE');
        ctx.fillText('Run ' + runNum + ': ' + run.finalTrophyPoints + 
                    ' points • ' + endingLabel, 40, y);
        y += lineHeight;
      });
    } else {
      ctx.fillStyle = '#666666';
      ctx.font = '9px monospace';
      ctx.fillText('No completed playthroughs yet.', 40, y);
    }

    ctx.restore();

    // Rebirth button - only show if rebirth is unlocked
    const buttonWidth = 100;
    const buttonHeight = 24;
    const buttonX = 240 - buttonWidth / 2;
    const buttonY = 400;
    
    if (STATE.rebirthUnlocked) {
      ctx.fillStyle = '#1D9E75';
      ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('[ R ] REBIRTH', 240, buttonY + buttonHeight / 2);
    } else {
      ctx.fillStyle = '#666666';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Complete the game to rebirth', 240, buttonY + 12);
    }
    
    // Instructions
    ctx.fillStyle = '#666';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Arrow keys to scroll  •  Escape to close', 240, 425);
  }
};
