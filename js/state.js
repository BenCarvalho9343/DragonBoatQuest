const STATE = {
  trophyPoints: 0,
  venuesUnlocked: ['caldecotte'],
  metTim: false,
  racedCaldecotte: false,
  caldecotteResult: null,
  racedLoughborough: false,
  loughboroughResult: null,
  racedNottingham: false,
  nottinghamResult: null,
  racedStneots: false,
  stneotResult: null,
  racedMiddlesbrough: false,
  middlesbroughResult: null,
  racedLiverpool: false,
  liverpoolResult: null,
  racedLondon: false,
  londonStage: null,
  london2000Result: null,
  currentVenue: 'caldecotte',
  london500Result: null,
  london2000Result: null,

  // World Championships
  worldUnlocked: false,
  worldPoints: 0,
  worldVenuesUnlocked: ['duisburg'],
  racedDuisburg: false,
  duisburgResult: null,
  racedYueyang: false,
  yueyangResult: null,
  worldFinalStage: null,
  worldFinal200Result: null,
  worldFinal500Result: null,
  worldFinal2000Result: null,
  racedWorldFinal: false,
  inWorldChamps: false,
  currentWorldVenue: 'duisburg',

  // Rebirth System
  rebirths: 0,
  rebirthUnlocked: false,
  lifetimeStats: {
    totalTrophyPoints: 0,
    playtimeSeconds: 0,
    playthroughs: []
  },
  currentPlaythroughStats: {
    startTime: null,
    endTime: null,
    finalTrophyPoints: 0,
    londonEnding: null,
    worldEnding: null
  },

  getLondonWins() {
    let wins = 0;
    if (this.london200Result === 'win') wins++;
    if (this.london500Result === 'win') wins++;
    if (this.london2000Result === 'win') wins++;
    return wins;
  },

  getLondonEnding() {
    const wins = this.getLondonWins();
    if (wins >= 2) return 'champion';
    if (wins === 1) return 'runnersup';
    return 'spirit';
  },

  getWorldWins() {
    let wins = 0;
    if (this.worldFinal200Result === 'win') wins++;
    if (this.worldFinal500Result === 'win') wins++;
    if (this.worldFinal2000Result === 'win') wins++;
    return wins;
  },

  getWorldEnding() {
    const wins = this.getWorldWins();
    if (wins >= 2) return 'champion';
    if (wins === 1) return 'silver';
    return 'honour';
  },

  startNewPlaythrough() {
    this.currentPlaythroughStats.startTime = performance.now();
  },

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
  },

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
    
    // Reset rebirth unlock for next cycle
    this.rebirthUnlocked = false;
    
    // Start new playthrough
    this.startNewPlaythrough();
    
    // Save
    this.save();
  },

  save() {
    localStorage.setItem('dbq_save', JSON.stringify({
      trophyPoints: this.trophyPoints,
      venuesUnlocked: this.venuesUnlocked,
      metTim: this.metTim,
      racedCaldecotte: this.racedCaldecotte,
      caldecotteResult: this.caldecotteResult,
      racedLoughborough: this.racedLoughborough,
      loughboroughResult: this.loughboroughResult,
      racedNottingham: this.racedNottingham,
      nottinghamResult: this.nottinghamResult,
      racedStneots: this.racedStneots,
      stneotResult: this.stneotResult,
      racedMiddlesbrough: this.racedMiddlesbrough,
      middlesbroughResult: this.middlesbroughResult,
      racedLiverpool: this.racedLiverpool,
      liverpoolResult: this.liverpoolResult,
      racedLondon: this.racedLondon,
      londonStage: this.londonStage,
      london200Result: this.london200Result,
      london500Result: this.london500Result,
      london2000Result: this.london2000Result,
      worldUnlocked: this.worldUnlocked,
      worldPoints: this.worldPoints,
      worldVenuesUnlocked: this.worldVenuesUnlocked,
      racedDuisburg: this.racedDuisburg,
      duisburgResult: this.duisburgResult,
      racedYueyang: this.racedYueyang,
      yueyangResult: this.yueyangResult,
      worldFinalStage: this.worldFinalStage,
      worldFinal200Result: this.worldFinal200Result,
      worldFinal500Result: this.worldFinal500Result,
      worldFinal2000Result: this.worldFinal2000Result,
      racedWorldFinal: this.racedWorldFinal,
      inWorldChamps: this.inWorldChamps,
      currentWorldVenue: this.currentWorldVenue,
      rebirths: this.rebirths,
      rebirthUnlocked: this.rebirthUnlocked,
      lifetimeStats: this.lifetimeStats,
      currentPlaythroughStats: this.currentPlaythroughStats,
    }));
  },

load() {
    const saved = localStorage.getItem('dbq_save');
    if (saved) {
      const data = JSON.parse(saved);
      Object.assign(this, data);
      // Safety defaults for critical fields
      if (!this.currentVenue) this.currentVenue = 'caldecotte';
      if (!this.currentWorldVenue) this.currentWorldVenue = 'duisburg';
      if (!this.venuesUnlocked) this.venuesUnlocked = ['caldecotte'];
      if (!this.worldVenuesUnlocked) this.worldVenuesUnlocked = ['duisburg'];      if (!this.lifetimeStats) this.lifetimeStats = { totalTrophyPoints: 0, playtimeSeconds: 0, playthroughs: [] };
      if (!this.currentPlaythroughStats) this.currentPlaythroughStats = { startTime: null, endTime: null, finalTrophyPoints: 0, londonEnding: null, worldEnding: null };    }
  }
};

STATE.load();