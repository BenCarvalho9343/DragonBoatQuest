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
  currentVenue: 'caldecotte',

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
      currentVenue: this.currentVenue,
    }));
  },
  load() {
    const saved = localStorage.getItem('dbq_save');
    if (saved) Object.assign(this, JSON.parse(saved));
  }
};

STATE.load();