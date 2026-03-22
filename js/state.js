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
      if (!this.worldVenuesUnlocked) this.worldVenuesUnlocked = ['duisburg'];
    }
  }
};

STATE.load();