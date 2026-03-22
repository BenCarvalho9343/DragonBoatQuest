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
  london200Result: null,
  london500Result: null,
  london2000Result: null,
  currentVenue: 'caldecotte',

  getLondonWins() {
    let wins = 0;
    if (this.london200Result === 'win') wins++;
    if (this.london500Result === 'win') wins++;
    if (this.london2000Result === 'win') wins++;
    return wins;
  },

  getLondonEnding() {
    const wins = this.getLondonWins();
    if (wins === 3) return 'champion';
    if (wins === 2) return 'champion';
    if (wins === 1) return 'runnersup';
    return 'spirit';
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
      currentVenue: this.currentVenue,
    }));
  },
  load() {
    const saved = localStorage.getItem('dbq_save');
    if (saved) Object.assign(this, JSON.parse(saved));
  }
};

STATE.load();