const TouchControls = {
  active: false,
  dpad: { up: false, down: false, left: false, right: false },
  tapPressed: false,
  bendPressed: false,

  init() {
    this.active = ('ontouchstart' in window) ||
                  (navigator.maxTouchPoints > 0);
    if (!this.active) return;

    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      Array.from(e.changedTouches).forEach(t => {
        this.handleTouch(t, true);
      });
    }, { passive: false });

    canvas.addEventListener('touchend', e => {
      e.preventDefault();
      if (e.touches.length === 0) {
        this.dpad = { up:false, down:false, left:false, right:false };
        this.tapPressed = false;
        this.bendPressed = false;
        keys['ArrowUp']    = false;
        keys['ArrowDown']  = false;
        keys['ArrowLeft']  = false;
        keys['ArrowRight'] = false;
      }
    }, { passive: false });

    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      Array.from(e.changedTouches).forEach(t => {
        const pos = this.getCanvasPos(t);
        if (pos.x < 140 && pos.y > 300) {
          this.handleDpad(pos.x, pos.y);
        }
      });
    }, { passive: false });
  },

  getCanvasPos(touch) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };
  },

  handleDpad(x, y) {
    const cx = 70;
    const cy = 385;
    const dx = x - cx;
    const dy = y - cy;
    this.dpad.up    = dy < -15 && Math.abs(dy) > Math.abs(dx);
    this.dpad.down  = dy >  15 && Math.abs(dy) > Math.abs(dx);
    this.dpad.left  = dx < -15 && Math.abs(dx) > Math.abs(dy);
    this.dpad.right = dx >  15 && Math.abs(dx) > Math.abs(dy);
  },

  handleTouch(touch, isDown) {
    if (!isDown) return;
    const pos = this.getCanvasPos(touch);
    const x = pos.x;
    const y = pos.y;

    // Start screen
    if (!gameStarted) {
      startGame();
      return;
    }

    // --- MENU OPEN ---
    if (Menu.open) {
      if (Menu.confirmingRestart) {
        if (x < 240 && y > 200 && y < 260) {
          Menu.selectedOption = 0;
          Menu.handleKey(' ');
        } else if (x >= 240 && y > 200 && y < 260) {
          Menu.selectedOption = 1;
          Menu.handleKey(' ');
        } else if (x < 240) {
          Menu.handleKey('ArrowLeft');
        } else {
          Menu.handleKey('ArrowRight');
        }
        return;
      }
      // Tap an option
      if (y > 124 && y < 340) {
        const idx = Math.floor((y - 124) / 48);
        if (idx >= 0 && idx <= 3) {
          Menu.selectedOption = idx;
          const opt = Menu.options[idx];
          if (opt.action === 'music' || opt.action === 'sfx') {
            // Left half = down, right half = up
            if (x < 240) Menu.adjustValue(-1);
            else Menu.adjustValue(1);
          } else {
            Menu.selectOption();
          }
        }
      }
      // Close via top right
      if (x > 430 && y < 50) {
        Menu.close();
      }
      return;
    }

    // --- TOP BAR (y < 40) ---
    if (y < 40) {
      // Crew
      if (x < 90) {
        if (!race.active && !race.showTutorial && !isDialogueActive()) {
          crewScreen.open = !crewScreen.open;
          if (!crewScreen.open) {
            crewScreen.selectedIndex = null;
            crewScreen.scrollOffset = 0;
          }
        }
        return;
      }
      // Mute
      if (x >= 90 && x < 200) {
        AudioManager.toggleMute();
        return;
      }
      // Menu / pause
      if (x >= 200 && x < 290) {
        if (gameStarted) Menu.toggle();
        return;
      }
      // Map
      if (x >= 390) {
        const venue = VENUES[STATE.currentVenue];
        const raced = venue && STATE[venue.raceStateFlag];
        if (raced && !venue.isFinale && !isDialogueActive() &&
            !race.active) {
          travelMap.open ? travelMap.close() : travelMap.open_map();
        }
        return;
      }
      return;
    }

    // --- CREW SCREEN ---
    if (crewScreen.open) {
      if (x > 430 && y < 80) {
        crewScreen.open = false;
        crewScreen.selectedIndex = null;
        crewScreen.scrollOffset = 0;
        return;
      }
      if (y < 216) crewScreen.handleKey('ArrowUp');
      else crewScreen.handleKey('ArrowDown');
      return;
    }

    // --- TRAVEL MAP ---
    if (travelMap.open) {
      if (x > 430 && y < 80) {
        travelMap.close();
        return;
      }
      if (y > 380) {
        travelMap.handleKey(' ');
        return;
      }
      if (x < 240) travelMap.handleKey('ArrowLeft');
      else travelMap.handleKey('ArrowRight');
      return;
    }

    // --- RACE ---
    if (race.active || race.showTutorial || race.finished) {
      if (race.active && race.distanceMode === '2000m' &&
          x < 100 && y > 305 && y < 370) {
        race.tapBend();
        this.bendPressed = true;
        return;
      }
      this.tapPressed = true;
      if (race.showTutorial) { race.tap(); return; }
      if (race.active) { race.tap(); return; }
      if (race.finished) {
        race.finished = false;
        AudioManager.playTrack(
          AudioManager.getTrackForVenue(STATE.currentVenue)
        );
        return;
      }
      return;
    }

    // --- OVERWORLD ---

    // D-pad bottom left
    if (x < 140 && y > 300) {
      this.handleDpad(x, y);
      return;
    }

    // Distance button
    if (x > 300 && x < 390 && y > 340 && y < 420) {
      const venue = VENUES[STATE.currentVenue];
      if (venue && !STATE[venue.raceStateFlag] && !venue.isFinale) {
        const b = venue.dockBounds;
        const onDock = player.x > b.x1 && player.x < b.x2 &&
                       player.y > b.y1 && player.y < b.y2;
        if (onDock) {
          const idx = distances.indexOf(selectedDistance);
          selectedDistance = distances[(idx + 1) % distances.length];
        }
      }
      return;
    }

    // ACT button bottom right
    if (x > 370 && y > 330) {
      this.tapPressed = true;
      if (STATE.currentVenue === 'london' &&
          STATE.londonStage === 'complete' &&
          !race.active && !race.finished) {
        STATE.londonStage = 'done';
        STATE.save();
        return;
      }
      if (!isDialogueActive()) {
        const venue = VENUES[STATE.currentVenue];
        if (!venue) return;
        const b = venue.dockBounds;
        const onDock = player.x > b.x1 && player.x < b.x2 &&
                       player.y > b.y1 && player.y < b.y2;

        if (venue.isFinale) {
          const nextDist = getLondonRaceDistance();
          const needsDebrief =
            STATE.londonStage === 'after200' ||
            STATE.londonStage === 'after500';
          if (onDock && nextDist && !needsDebrief) {
            race.start(nextDist);
            AudioManager.playTrack('race');
            return;
          }
          if (onDock && needsDebrief) {
            activeNPCIndex = 0;
            activeLineIndex = 0;
            return;
          }
          return;
        }

        const alreadyRaced = STATE[venue.raceStateFlag];
        const needsTim = STATE.currentVenue === 'caldecotte' &&
                         !STATE.metTim;
        if (onDock && !alreadyRaced && !needsTim) {
          race.start(selectedDistance);
          AudioManager.playTrack('race');
          return;
        }
        if (onDock && needsTim) {
          activeNPCIndex = 0;
          activeLineIndex = 0;
          return;
        }

        const savedKey = keys[' '];
        keys[' '] = true;
        updateNPCs(keys, player);
        keys[' '] = savedKey;

      } else {
        const savedKey2 = keys[' '];
        keys[' '] = true;
        updateNPCs(keys, player);
        keys[' '] = savedKey2;
      }
      return;
    }
  },

  applyToKeys(keys) {
    if (!this.active) return;
    if (this.dpad.up)    keys['ArrowUp']    = true;
    if (this.dpad.down)  keys['ArrowDown']  = true;
    if (this.dpad.left)  keys['ArrowLeft']  = true;
    if (this.dpad.right) keys['ArrowRight'] = true;
  },

  draw(ctx) {
    if (!this.active) return;

    // --- TOP BAR ---
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, 480, 38);

    // Crew button
    ctx.fillStyle = crewScreen.open ?
      'rgba(240,192,64,0.9)' : 'rgba(255,255,255,0.2)';
    ctx.fillRect(3, 3, 84, 32);
    ctx.fillStyle = crewScreen.open ? '#1a1a1a' : '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CREW', 45, 23);

    // Mute button
    ctx.fillStyle = AudioManager.muted ?
      'rgba(200,50,50,0.7)' : 'rgba(255,255,255,0.2)';
    ctx.fillRect(91, 3, 106, 32);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(AudioManager.muted ? 'UNMUTE' : 'MUTE', 144, 23);

    // Menu / pause button
    ctx.fillStyle = Menu.open ?
      'rgba(240,192,64,0.9)' : 'rgba(255,255,255,0.2)';
    ctx.fillRect(201, 3, 78, 32);
    ctx.fillStyle = Menu.open ? '#1a1a1a' : '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('II', 240, 23);

    // Map button
    const venueM = VENUES[STATE.currentVenue];
    const racedM = venueM && STATE[venueM.raceStateFlag];
    if (racedM && venueM && !venueM.isFinale && !race.active) {
      ctx.fillStyle = travelMap.open ?
        'rgba(240,192,64,0.9)' : 'rgba(255,255,255,0.2)';
      ctx.fillRect(393, 3, 84, 32);
      ctx.fillStyle = travelMap.open ? '#1a1a1a' : '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('MAP', 435, 23);
    }

    // Close button for crew/map screens
    if (crewScreen.open || travelMap.open) {
      ctx.fillStyle = 'rgba(200,50,50,0.8)';
      ctx.fillRect(430, 42, 46, 32);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('X', 453, 62);
      return;
    }

    // Don't show movement controls during race
    if (race.active || race.showTutorial || race.finished) {
      if (race.active && race.distanceMode === '2000m') {
        ctx.fillStyle = this.bendPressed ?
          'rgba(255,153,0,0.9)' : 'rgba(255,153,0,0.5)';
        ctx.fillRect(4, 310, 90, 52);
        ctx.strokeStyle = '#ff9900';
        ctx.lineWidth = 2;
        ctx.strokeRect(4, 310, 90, 52);
        ctx.fillStyle = '#ff9900';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('BEND', 49, 333);
        ctx.font = '8px monospace';
        ctx.fillStyle = '#ffcc66';
        ctx.fillText('tap when', 49, 347);
        ctx.fillText('bend shows', 49, 358);
      }

      ctx.fillStyle = this.tapPressed ?
        'rgba(240,192,64,0.7)' : 'rgba(240,192,64,0.25)';
      ctx.beginPath();
      ctx.arc(415, 390, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(240,192,64,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#f0c040';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      const lbl = race.finished ? 'OK'
        : race.showTutorial ? 'START' : 'TAP';
      ctx.fillText(lbl, 415, 395);
      return;
    }

    // --- OVERWORLD ---

    // D-pad
    const cx = 70;
    const cy = 385;
    const dbtns = [
      { x:cx,    y:cy-38, label:'^', active:this.dpad.up },
      { x:cx,    y:cy+38, label:'v', active:this.dpad.down },
      { x:cx-38, y:cy,    label:'<', active:this.dpad.left },
      { x:cx+38, y:cy,    label:'>', active:this.dpad.right },
    ];
    dbtns.forEach(btn => {
      ctx.fillStyle = btn.active ?
        'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.arc(btn.x, btn.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(btn.label, btn.x, btn.y + 5);
    });

    // Distance cycle button
    const venueD = VENUES[STATE.currentVenue];
    if (venueD && !venueD.isFinale) {
      const b = venueD.dockBounds;
      const onDock = player.x > b.x1 && player.x < b.x2 &&
                     player.y > b.y1 && player.y < b.y2;
      const alreadyRaced = STATE[venueD.raceStateFlag];
      if (onDock && !alreadyRaced) {
        ctx.fillStyle = 'rgba(100,200,255,0.3)';
        ctx.fillRect(302, 338, 76, 76);
        ctx.strokeStyle = 'rgba(100,200,255,0.6)';
        ctx.lineWidth = 1;
        ctx.strokeRect(302, 338, 76, 76);
        ctx.fillStyle = '#88ddff';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DIST', 340, 358);
        ctx.font = 'bold 11px monospace';
        ctx.fillText(selectedDistance, 340, 376);
        ctx.font = '7px monospace';
        ctx.fillStyle = '#aaddff';
        ctx.fillText('tap to', 340, 392);
        ctx.fillText('change', 340, 403);
      }
    }

    // ACT button
    ctx.fillStyle = this.tapPressed ?
      'rgba(240,192,64,0.7)' : 'rgba(240,192,64,0.25)';
    ctx.beginPath();
    ctx.arc(432, 385, 38, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(240,192,64,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ACT', 432, 389);
  },
};