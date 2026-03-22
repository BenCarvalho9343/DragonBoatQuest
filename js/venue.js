const VENUES = {
  caldecotte: {
    name: 'Caldecotte Lake',
    bgColour: '#1a6b9e',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Coach Tim',
        x: 80, y: 112,
        colour: '#4a90d9',
        get lines() {
          if (!STATE.metTim) {
            return [
              "Welcome to Secklow Hundred.",
              "We haven't finished top three in four years.",
              "You're going to help fix that. Probably.",
              "Head to the dock and press Space to race.",
              "Tap Space in time with the beat to power the boat.",
              "Good luck. You'll need it.",
            ];
          }
          if (STATE.racedCaldecotte && STATE.caldecotteResult === 'win') {
            return [
              "Not bad. Not bad at all.",
              "Soaring Dragons won't be happy about that.",
              "We earned " + STATE.trophyPoints + " trophy points.",
              "Loughborough is next. River Soar — tricky current.",
              "Get some rest. Thursday, six AM.",
            ];
          }
          if (STATE.racedCaldecotte && STATE.caldecotteResult === 'loss') {
            return [
              "We lost. But we finished.",
              "Soaring Dragons are good. We need to be better.",
              "Still earned " + STATE.trophyPoints + " points for showing up.",
              "Loughborough is next. River Soar — tricky current.",
              "We'll be ready this time.",
            ];
          }
          return [
            "The dock is just south of here.",
            "Press Space when you're on it to start the race.",
            "Don't overthink it. Just feel the beat.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'Soaring Dragons',
    raceStateFlag: 'racedCaldecotte',
    raceResultFlag: 'caldecotteResult',
  },

  loughborough: {
    name: 'River Soar, Loughborough',
    bgColour: '#1a4a2a',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0],
      [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
      [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,1,1,1,4,0],
      [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,1,1,1,4,0],
      [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
      [0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
      [0,4,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
      [0,4,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
      [0,4,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
      [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Soaring Captain',
        x: 320, y: 80,
        colour: '#cc2222',
        get lines() {
          if (!STATE.racedLoughborough) {
            return [
              "Secklow. Long trip from Milton Keynes.",
              "Hope it was worth it.",
              "We train on this river every week.",
              "You don't know water until you know the Soar.",
            ];
          }
          if (STATE.loughboroughResult === 'win') {
            return [
              "Well raced. I mean it.",
              "Don't expect the same result next time.",
            ];
          }
          return [
            "Good effort. The Soar beat you as much as we did.",
            "Come back when you've trained on a real river.",
          ];
        },
      },
      {
        name: 'River Marshal',
        x: 120, y: 60,
        colour: '#ffaa00',
        get lines() {
          return [
            "Welcome to the River Soar.",
            "Watch the current on the far bank — it pulls left.",
            "Soaring Dragons have home advantage here.",
            "But home advantage only gets you so far.",
          ];
        },
      },
      {
        name: 'Ada, Local Paddler',
        x: 200, y: 112,
        colour: '#88aaff',
        get lines() {
          if (!STATE.racedLoughborough) {
            return [
              "Oh, you're Secklow? Small world.",
              "I actually paddle for Soaring Dragons.",
              "Their rhythm section is terrifying. Fair warning.",
              "Good luck though — genuinely.",
            ];
          }
          return [
            "Well raced. Told you they were good.",
            "Come train with us sometime. Just kidding.",
            "...mostly.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'Soaring Dragons',
    raceStateFlag: 'racedLoughborough',
    raceResultFlag: 'loughboroughResult',
  },
};