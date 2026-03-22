const STATE = {
  trophyPoints: 0,
  venuesUnlocked: ['caldecotte'],
  metTim: false,
  racedCaldecotte: false,
  caldecotteResult: null,
  racedLoughborough: false,
  loughboroughResult: null,
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
      currentVenue: this.currentVenue,
    }));
  },
  load() {
    const saved = localStorage.getItem('dbq_save');
    if (saved) Object.assign(this, JSON.parse(saved));
  }
};

STATE.load();