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
        name: 'Ada',
        x: 200, y: 112,
        colour: '#cc2244',
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

  nottingham: {
    name: 'River Trent, Nottingham',
    bgColour: '#1a1200',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
      [0,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,0],
      [0,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,7,7,1,1,1,6,0],
      [0,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,7,7,1,1,1,6,0],
      [0,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,0],
      [0,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,0],
      [0,6,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,0],
      [0,6,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,0],
      [0,6,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,0],
      [0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Anaconda Captain',
        x: 320, y: 80,
        colour: '#9900cc',
        get lines() {
          if (!STATE.racedNottingham) {
            return [
              "Secklow. We've been expecting you.",
              "The Trent doesn't forgive mistakes.",
              "Neither do we.",
              "See you on the water.",
            ];
          }
          if (STATE.nottinghamResult === 'win') {
            return [
              "...fine. Well raced.",
              "The Trent was kind to you today.",
              "It won't be next time.",
            ];
          }
          return [
            "The river chose us today.",
            "It usually does.",
          ];
        },
      },
      {
        name: 'Trent Marshal',
        x: 120, y: 60,
        colour: '#ffaa00',
        get lines() {
          return [
            "Welcome to the River Trent.",
            "Choppier than it looks — stay central.",
            "Notts Anaconda train here year round.",
            "They know every ripple on this stretch.",
          ];
        },
      },
      {
        name: 'Supporter',
        x: 200, y: 112,
        colour: '#cc8800',
        get lines() {
          if (!STATE.racedNottingham) {
            return [
              "Anaconda are strongest in the middle 200m.",
              "They hit a power surge around the 150m mark.",
              "If you can stay close through that, you're in it.",
            ];
          }
          return [
            "Good race. The Trent's tough on visitors.",
            "You did well to stay with them.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'Notts Anaconda',
    raceStateFlag: 'racedNottingham',
    raceResultFlag: 'nottinghamResult',
  },

  stneots: {
    name: 'River Great Ouse, St Neots',
    bgColour: '#1a3a1a',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0],
      [0,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,0],
      [0,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,1,1,1,8,0],
      [0,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,1,1,1,8,0],
      [0,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,0],
      [0,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,0],
      [0,8,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,0],
      [0,8,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,0],
      [0,8,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,0],
      [0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'St Neots Captain',
        x: 320, y: 80,
        colour: '#2255cc',
        get lines() {
          if (!STATE.racedStneots) {
            return [
              "Welcome to the Regatta Meadow.",
              "We've been racing here since 1997.",
              "The Ouse looks calm. Don't be fooled.",
              "Flat water is fast water. We know it well.",
            ];
          }
          if (STATE.stneotResult === 'win') {
            return [
              "Well done. The Ouse was kind to you.",
              "Come back next year — we'll be ready.",
            ];
          }
          return [
            "Home water. Every time.",
            "Safe travels back to Milton Keynes.",
          ];
        },
      },
      {
        name: 'Festival MC',
        x: 120, y: 60,
        colour: '#44cc44',
        get lines() {
          return [
            "Welcome to the St Neots Dragon Boat Festival!",
            "Food stalls open until six, racing until five.",
            "St Neots DBT — founded 1997, still going strong.",
            "Enjoy the Ouse, enjoy the day!",
          ];
        },
      },
      {
        name: 'Local Fan',
        x: 200, y: 112,
        colour: '#88ccff',
        get lines() {
          if (!STATE.racedStneots) {
            return [
              "St Neots are deceptively consistent.",
              "No flashy surges — just relentless pace.",
              "The 2000m is where they really shine.",
              "Watch your bend technique on the far turn.",
            ];
          }
          return [
            "Brilliant race. The crowd loved it.",
            "You'll always be welcome here.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'St Neots DBT',
    raceStateFlag: 'racedStneots',
    raceResultFlag: 'stneotResult',
  },

  middlesbrough: {
    name: 'Teesside, Middlesbrough',
    bgColour: '#1a1a2a',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0],
      [0,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0],
      [0,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,11,11,11,1,1,1,10,0],
      [0,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,11,11,11,1,1,1,10,0],
      [0,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0],
      [0,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0],
      [0,10,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0],
      [0,10,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0],
      [0,10,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,0],
      [0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Powerhouse Captain',
        x: 320, y: 80,
        colour: '#ff6600',
        get lines() {
          if (!STATE.racedMiddlesbrough) {
            return [
              "Secklow. Southern club.",
              "Hope you packed a jacket.",
              "Wind off the Tees is something else.",
              "We'll see how you handle it.",
            ];
          }
          if (STATE.middlesbroughResult === 'win') {
            return [
              "Fair enough. Good sprint.",
              "Come back in January. Different story.",
            ];
          }
          return [
            "Northern water. Northern result.",
            "No shame in it.",
          ];
        },
      },
      {
        name: 'Tees Marshal',
        x: 120, y: 60,
        colour: '#aaaaaa',
        get lines() {
          return [
            "Welcome to Teesside.",
            "Wind forecast is strong from the north today.",
            "Powerhouse Dragons train in all weathers.",
            "They actually prefer it rough.",
          ];
        },
      },
      {
        name: 'Steel Worker',
        x: 200, y: 112,
        colour: '#ff9944',
        get lines() {
          if (!STATE.racedMiddlesbrough) {
            return [
              "Powerhouse are unstoppable in the 200m.",
              "Fastest start in the league. By a distance.",
              "But they fade in the 2000m — hit the bends hard.",
              "That's where you can take them.",
            ];
          }
          return [
            "Good effort against Powerhouse.",
            "Not many clubs come up here and race like that.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'Powerhouse Dragons',
    raceStateFlag: 'racedMiddlesbrough',
    raceResultFlag: 'middlesbroughResult',
  },

  liverpool: {
    name: 'Merseyside, Liverpool',
    bgColour: '#0a0a2a',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,0],
      [0,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,12,0],
      [0,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,13,13,13,13,1,1,1,12,0],
      [0,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,13,13,13,13,1,1,1,12,0],
      [0,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,12,0],
      [0,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,12,0],
      [0,12,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,12,0],
      [0,12,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,12,0],
      [0,12,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,12,0],
      [0,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Amathus Captain',
        x: 320, y: 80,
        colour: '#cc0000',
        get lines() {
          if (!STATE.racedLiverpool) {
            return [
              "Secklow Hundred. We know your club.",
              "We raced at the World Championships in 1995.",
              "This is not a warm-up. This is the real thing.",
              "Show us what Milton Keynes is made of.",
            ];
          }
          if (STATE.liverpoolResult === 'win') {
            return [
              "Extraordinary. Genuinely.",
              "We haven't been beaten here in three years.",
              "London will be something special.",
            ];
          }
          return [
            "Well raced. You gave us a fight.",
            "London is next. We'll both be ready.",
            "May the best crew win.",
          ];
        },
      },
      {
        name: 'Dock Marshal',
        x: 120, y: 60,
        colour: '#4444cc',
        get lines() {
          return [
            "Welcome to Merseyside.",
            "Amathus have been racing since the early 90s.",
            "One of the founding clubs of British dragon boating.",
            "You're racing history today.",
          ];
        },
      },
      {
        name: 'Mersey Local',
        x: 200, y: 112,
        colour: '#6688ff',
        get lines() {
          if (!STATE.racedLiverpool) {
            return [
              "Amathus are complete. No weak phase.",
              "Power, rhythm, stamina — all elite.",
              "The 2000m bends are their strongest point.",
              "You'll need perfect lines to stay with them.",
            ];
          }
          return [
            "That was one of the best races I've seen here.",
            "London's going to be electric.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'Amathus',
    raceStateFlag: 'racedLiverpool',
    raceResultFlag: 'liverpoolResult',
  },
};