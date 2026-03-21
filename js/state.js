const STATE = {
  trophyPoints: 0,
  venuesUnlocked: ['caldecotte'],
  metTim: false,
  racedCaldecotte: false,
  caldecotteResult: null, // 'win' or 'loss'

  save() {
    localStorage.setItem('dbq_save', JSON.stringify({
      trophyPoints: this.trophyPoints,
      venuesUnlocked: this.venuesUnlocked,
      metTim: this.metTim,
      racedCaldecotte: this.racedCaldecotte,
      caldecotteResult: this.caldecotteResult,
    }));
  },
  load() {
    const saved = localStorage.getItem('dbq_save');
    if (saved) Object.assign(this, JSON.parse(saved));
  }
};

STATE.load();