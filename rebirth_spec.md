# Rebirth System - Implementation Plan

## Overview
Implement a full rebirth/replayability system that allows players to restart the campaign while preserving achievements and tracking lifetime statistics across multiple playthroughs.

---

## Architecture

### 1. State Management (state.js)

**Add to STATE object:**

```javascript
// Rebirth tracking
rebirths: 0,  // Total number of times rebirthed
rebirthUnlocked: false,  // Unlocked after beating World Championships
lifetimeStats: {
  totalTrophyPoints: 0,  // Sum of all playthrough trophy points
  playtimeSeconds: 0,  // Total playtime across all runs
  playthroughs: []  // Array of individual run statistics
},
currentPlaythroughStats: {
  startTime: null,  // Timestamp when run started
  endTime: null,  // Timestamp when run completed
  finalTrophyPoints: 0,  // Trophy points at end
  londonEnding: null,  // 'champion', 'runnersup', or 'spirit'
  worldEnding: null,  // 'champion', 'silver', 'honour', or null if not reached
}
```

**Methods to add:**

```javascript
startNewPlaythrough() {
  this.currentPlaythroughStats.startTime = performance.now();
}

finishPlaythrough() {
  this.currentPlaythroughStats.endTime = performance.now();
  this.currentPlaythroughStats.finalTrophyPoints = this.trophyPoints;
  this.currentPlaythroughStats.londonEnding = this.getLondonEnding();
  this.currentPlaythroughStats.worldEnding = this.getWorldEnding();
  
  // Add to history
  this.lifetimeStats.playthroughs.push({...this.currentPlaythroughStats});
  this.lifetimeStats.totalTrophyPoints += this.trophyPoints;
  
  // Calculate playtime
  const playtimeMs = this.currentPlaythroughStats.endTime - this.currentPlaythroughStats.startTime;
  this.lifetimeStats.playtimeSeconds += Math.floor(playtimeMs / 1000);
}

rebirth() {
  // Finish current playthrough
  this.finishPlaythrough();
  
  // Increment rebirth counter
  this.rebirths++;
  
  // Reset campaign progress
  this.trophyPoints = 0;
  this.venuesUnlocked = ['caldecotte'];
  this.metTim = false;
  this.racedCaldecotte = false;
  this.caldecotteResult = null;
  this.racedLoughborough = false;
  this.loughboroughResult = null;
  this.racedNottingham = false;
  this.nottinghamResult = null;
  this.racedStneots = false;
  this.stneotResult = null;
  this.racedMiddlesbrough = false;
  this.middlesbroughResult = null;
  this.racedLiverpool = false;
  this.liverpoolResult = null;
  this.racedLondon = false;
  this.londonStage = null;
  this.london200Result = null;
  this.london500Result = null;
  this.london2000Result = null;
  
  // Reset world progress but keep world unlock
  this.worldUnlocked = false;
  this.worldPoints = 0;
  this.worldVenuesUnlocked = ['duisburg'];
  this.racedDuisburg = false;
  this.duisburgResult = null;
  this.racedYueyang = false;
  this.yueyangResult = null;
  this.worldFinalStage = null;
  this.worldFinal200Result = null;
  this.worldFinal500Result = null;
  this.worldFinal2000Result = null;
  this.racedWorldFinal = false;
  this.inWorldChamps = false;
  this.currentWorldVenue = 'duisburg';
  
  // Reset venue to home
  this.currentVenue = 'caldecotte';
  
  // Reset world championship progression
  this.rebirthUnlocked = false;
  
  // Start new playthrough
  this.startNewPlaythrough();
  
  // Save
  this.save();
}
```

**Update save/load to include lifetime stats:**

```javascript
// In save()
localStorage.setItem('dbq_save', JSON.stringify({
  // ... existing fields ...
  rebirths: this.rebirths,
  rebirthUnlocked: this.rebirthUnlocked,
  lifetimeStats: this.lifetimeStats,
  currentPlaythroughStats: this.currentPlaythroughStats,
}));

// In load()
if (data.rebirths) this.rebirths = data.rebirths;
if (data.rebirthUnlocked) this.rebirthUnlocked = data.rebirthUnlocked;
if (data.lifetimeStats) this.lifetimeStats = data.lifetimeStats;
if (data.currentPlaythroughStats) this.currentPlaythroughStats = data.currentPlaythroughStats;
```

---

### 2. Menu System (menu.js)

**Add to Menu.options array:**

```javascript
{ label: 'Rebirth',   action: 'rebirth'      },
```

**Add rebirth handling to handleKey():**

```javascript
selectOption() {
  const opt = this.options[this.selectedOption];
  
  if (opt.action === 'rebirth') {
    this.showRebirthMenu();
    return;
  }
  // ... rest of existing code ...
}

showRebirthMenu() {
  // Check if rebirth is unlocked
  if (!STATE.rebirthUnlocked) {
    // Show message that rebirth is locked
    this.rebirthLockedMessage = true;
    this.rebirthLockedTimer = 3.0;
    return;
  }
  
  // Show rebirth confirmation dialog
  this.showingRebirthConfirm = true;
  this.rebirthConfirmSelection = 1; // Default to "Cancel"
}

handleRebirthConfirm(key) {
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    this.rebirthConfirmSelection = this.rebirthConfirmSelection === 0 ? 1 : 0;
  }
  if (key === ' ' || key === 'Enter') {
    if (this.rebirthConfirmSelection === 0) {
      // Confirm rebirth
      STATE.rebirth();
      gameStarted = false;
      location.reload(); // Reload to reset game state cleanly
    } else {
      // Cancel
      this.showingRebirthConfirm = false;
    }
  }
  if (key === 'Escape') {
    this.showingRebirthConfirm = false;
  }
}
```

**Add UI rendering for rebirth:**

In the draw section of main game loop, add rebirth dialog drawing (similar to restart confirmation pattern already in code).

---

### 3. New Rebirth Stats Menu Component

**Create new object (stats_menu.js or add to menu.js):**

```javascript
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
    if (key === 'Escape' || key === ' ') {
      this.close();
    }
  },
  
  draw(ctx) {
    if (!this.open) return;
    
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
    
    ctx.fillText('Total Trophy Points: ' + STATE.lifetimeStats.totalTrophyPoints, 40, y);
    y += lineHeight;
    
    const hours = Math.floor(STATE.lifetimeStats.playtimeSeconds / 3600);
    const minutes = Math.floor((STATE.lifetimeStats.playtimeSeconds % 3600) / 60);
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
    }
    
    ctx.restore();
    
    // Instructions
    ctx.fillStyle = '#666';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Arrow keys to scroll  •  Escape to close', 240, 408);
  }
};
```

---

### 4. World Championship Ending Integration

**When player beats World Championships (in main.js or worldceremony.js):**

```javascript
// After World Championships complete
STATE.rebirthUnlocked = true;
STATE.save();

// Show rebirth unlock message (optional, can be done in ceremony screen)
// "Rebirth unlocked! Return to main menu to start again while keeping achievements."
```

---

### 5. Rendering Changes (main.js)

**Update game loop rendering:**

```javascript
function gameLoop(timestamp) {
  // ... existing code ...
  
  // After all normal rendering
  
  // Rebirth stats screen
  RebirthStats.draw(ctx);
  
  // Rebirth confirmation dialog
  if (Menu.showingRebirthConfirm) {
    drawRebirthConfirmDialog(ctx);
  }
  
  // Rebirth locked message
  if (Menu.rebirthLockedMessage) {
    Menu.rebirthLockedTimer -= deltaTime;
    if (Menu.rebirthLockedTimer <= 0) {
      Menu.rebirthLockedMessage = false;
    }
    // Draw message
    ctx.fillStyle = 'rgba(200, 100, 100, 0.8)';
    ctx.fillRect(100, 150, 280, 100);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('REBIRTH LOCKED', 240, 180);
    ctx.font = '10px monospace';
    ctx.fillText('Complete the World Championships first', 240, 200);
    ctx.fillText('to unlock rebirth.', 240, 215);
  }
}

function drawRebirthConfirmDialog(ctx) {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, 480, 432);
  
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(120, 150, 240, 140);
  ctx.strokeStyle = '#ff6666';
  ctx.lineWidth = 2;
  ctx.strokeRect(120, 150, 240, 140);
  
  ctx.fillStyle = '#ff6666';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CONFIRM REBIRTH?', 240, 175);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '9px monospace';
  ctx.fillText('All progress will reset.', 240, 195);
  ctx.fillText('Achievements will be preserved.', 240, 207);
  
  // Yes/No buttons
  const selY = 230;
  const buttonW = 70;
  const buttonH = 30;
  const gap = 20;
  
  // Yes button
  ctx.fillStyle = Menu.rebirthConfirmSelection === 0 ? '#ff8888' : '#666666';
  ctx.fillRect(140, selY, buttonW, buttonH);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CONFIRM', 175, selY + 20);
  
  // No button
  ctx.fillStyle = Menu.rebirthConfirmSelection === 1 ? '#88ff88' : '#666666';
  ctx.fillRect(270, selY, buttonW, buttonH);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('CANCEL', 305, selY + 20);
}
```

**Update Menu.handleKey() to handle rebirth confirmation:**

```javascript
handleKey(key) {
  if (!this.open) return;

  if (this.showingRebirthConfirm) {
    this.handleRebirthConfirm(key);
    return;
  }

  // ... rest of existing code ...
}
```

**Update keyboard input in main.js to open rebirth stats:**

```javascript
if (e.key === 'r' || e.key === 'R') {
  if (Menu.open && !Menu.showingRebirthConfirm) {
    RebirthStats.toggle();
  }
  return;
}
```

---

### 6. Bonus System (TBD - Implementation TBD)

Currently placeholder. Options discussed:
- New ability unlock
- Stat buff (e.g., +5% crew rhythm or power)
- Character appearance customization
- New minigame
- Speed run mode

**Recommendation for Phase 1:**
Skip the bonus in this first version, add it as separate feature after rebirth core is working. Otherwise scope will grow too large.

---

## Implementation Checklist

- [ ] Update STATE object with rebirth fields and methods
- [ ] Update localStorage save/load for lifetime stats
- [ ] Add "Rebirth" to menu options
- [ ] Implement rebirth confirmation dialog rendering
- [ ] Implement rebirth stats UI component
- [ ] Update world championship ending to set `rebirthUnlocked = true`
- [ ] Update main game loop to render new UI elements
- [ ] Handle rebirth keyboard input
- [ ] Test rebirth flow end-to-end
- [ ] Test that achievements persist after rebirth
- [ ] Test that stats tracking works correctly

---

## Files to Modify

1. **js/state.js** - Add rebirth state and methods
2. **js/menu.js** - Add rebirth option and dialogs
3. **js/main.js** - Add rebirth UI rendering and input handling
4. **js/worldceremony.js** - Set rebirth unlock flag (or in main.js race completion)

---

## Notes

- Rebirth option locked until World Championships are completed (checked via `STATE.rebirthUnlocked` flag)
- After rebirth, achievements screen still shows unlocked achievements
- Rebirth counter not visible during gameplay (only in stats tab)
- All venue progression resets, only achievements preserved
- Compatible with existing save system, just extends localStorage data

