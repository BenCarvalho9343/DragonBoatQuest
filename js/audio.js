const AudioManager = {
  tracks: {},
  sfx: {},
  musicVolume: 0.5,
  sfxVolume: 0.8,
  muted: false,
  currentTrack: null,
  unlocked: false,

  init() {
    const musicFiles = ['menu', 'overworld', 'race', 'ceremony'];
    const sfxFiles = ['perfect', 'great', 'miss', 'synergy', 'dialogue', 'ceremony'];

    musicFiles.forEach(name => {
      const a = new window.Audio('assets/audio/music/' + name + '.mp3');
      a.loop = true;
      a.volume = this.musicVolume;
      this.tracks[name] = a;
    });

    sfxFiles.forEach(name => {
      const a = new window.Audio('assets/audio/sfx/sfx_' + name + '.wav');
      a.volume = this.sfxVolume;
      this.sfx[name] = a;
    });
  },

  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
  },

  playTrack(name) {
    if (this.muted) return;
    if (this.currentTrack === name) return;
    Object.values(this.tracks).forEach(t => {
      t.pause();
      t.currentTime = 0;
    });
    if (this.tracks[name]) {
      this.tracks[name].play().catch(() => {});
      this.currentTrack = name;
    }
  },

  stopMusic() {
    Object.values(this.tracks).forEach(t => {
      t.pause();
      t.currentTime = 0;
    });
    this.currentTrack = null;
  },

  playSFX(name) {
    if (this.muted) return;
    if (!this.sfx[name]) return;
    this.sfx[name].currentTime = 0;
    this.sfx[name].play().catch(() => {});
  },

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      Object.values(this.tracks).forEach(t => t.pause());
    } else {
      if (this.currentTrack) {
        this.tracks[this.currentTrack].play().catch(() => {});
      }
    }
  },

  getTrackForVenue(venueId) {
    const map = {
      caldecotte:    'overworld',
      loughborough:  'overworld',
      nottingham:    'overworld',
      stneots:       'overworld',
      middlesbrough: 'overworld',
      liverpool:     'overworld',
      london:        'overworld',
    };
    return map[venueId] || 'overworld';
  },
};