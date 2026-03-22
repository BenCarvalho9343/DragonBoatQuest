const WORLD_VENUES = {
  duisburg: {
    name: 'Duisburg Regatta, Germany',
    bgColour: '#1a1a2a',
    weather: 'choppy',
    weatherLabel: 'Choppy water — rivals faster, misses hurt more',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0],
      [0,16,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0],
      [0,16,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,17,17,17,17,1,1,1,16,0],
      [0,16,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,17,17,17,17,1,1,1,16,0],
      [0,16,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0],
      [0,16,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0],
      [0,16,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0],
      [0,16,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0],
      [0,16,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,16,0],
      [0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Coach Tim',
        x: 80, y: 112,
        colour: '#4a90d9',
        get lines() {
          if (!STATE.racedDuisburg) {
            return [
              "Duisburg. The Regattabahn.",
              "Every great dragon boat crew has raced here.",
              "The water is choppy — it will affect your rhythm.",
              "Fire Dragons have home advantage.",
              "But we've come too far to be intimidated.",
              "Get to the dock.",
            ];
          }
          if (STATE.duisburgResult === 'win') {
            return [
              "We beat them on their home water.",
              "The world is starting to notice Secklow.",
              "Yueyang is next. The home of dragon boating.",
              "This is what we came for.",
            ];
          }
          return [
            "Tough race. The Regattabahn is unforgiving.",
            "We move on. Yueyang is next.",
            "The home of the sport itself.",
            "We'll be ready.",
          ];
        },
      },
      {
        name: 'Fire Captain',
        x: 320, y: 80,
        colour: '#ff4400',
        get lines() {
          if (!STATE.racedDuisburg) {
            return [
              "Welcome to Duisburg, Secklow.",
              "We have raced here every year since 1993.",
              "The Regattabahn does not forgive visitors.",
              "We will see you on the water.",
            ];
          }
          if (STATE.duisburgResult === 'win') {
            return [
              "Remarkable. Truly.",
              "No British crew has beaten us here in eight years.",
              "Go well in Yueyang.",
            ];
          }
          return [
            "The Regattabahn chose us today.",
            "It usually does.",
            "Good luck in Yueyang.",
          ];
        },
      },
      {
        name: 'World Official',
        x: 200, y: 60,
        colour: '#4488ff',
        get lines() {
          return [
            "Welcome to the IDBF World Championships.",
            "Crews from 40 nations competing this week.",
            "Your National League points: " +
              STATE.trophyPoints + ".",
            "World Championship points start fresh.",
            "Good luck to Secklow Hundred.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'Fire Dragons',
    raceStateFlag: 'racedDuisburg',
    raceResultFlag: 'duisburgResult',
    isWorld: true,
  },

  yueyang: {
    name: 'Yueyang, China',
    bgColour: '#1a0a00',
    weather: 'humid',
    weatherLabel: 'Hot and humid — synergy fills slower',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,0],
      [0,18,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,18,0],
      [0,18,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,19,19,19,19,1,1,1,18,0],
      [0,18,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,19,19,19,19,1,1,1,18,0],
      [0,18,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,18,0],
      [0,18,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,18,0],
      [0,18,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,18,0],
      [0,18,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,18,0],
      [0,18,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,18,0],
      [0,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Coach Tim',
        x: 80, y: 112,
        colour: '#4a90d9',
        get lines() {
          if (!STATE.racedYueyang) {
            return [
              "Yueyang. The birthplace of dragon boating.",
              "Two thousand years of history on this water.",
              "The heat will slow your synergy build.",
              "Pace yourselves — don't burn out early.",
              "CGCSA Dragons are the fastest crew in the world.",
              "Let's show them what Britain can do.",
            ];
          }
          if (STATE.yueyangResult === 'win') {
            return [
              "We beat CGCSA in Yueyang.",
              "I never thought I'd say those words.",
              "Racice is next. The Grand Final.",
              "Win that and we're world champions.",
            ];
          }
          return [
            "CGCSA were extraordinary today.",
            "But we're still in this.",
            "Racice is next. The Grand Final.",
            "Everything we have. One last time.",
          ];
        },
      },
      {
        name: 'CGCSA Captain',
        x: 320, y: 80,
        colour: '#ff0000',
        get lines() {
          if (!STATE.racedYueyang) {
            return [
              "Secklow Hundred. Great Britain.",
              "You have come very far.",
              "Yueyang is our home. This river is our river.",
              "We have not lost here in eleven years.",
            ];
          }
          if (STATE.yueyangResult === 'win') {
            return [
              "...extraordinary.",
              "Eleven years. You broke eleven years.",
              "We will meet again in Racice.",
            ];
          }
          return [
            "Well raced, Secklow.",
            "You are worthy opponents.",
            "We will see you in Racice.",
          ];
        },
      },
      {
        name: 'Local Guide',
        x: 200, y: 60,
        colour: '#ffaa00',
        get lines() {
          return [
            "Welcome to Yueyang — home of Qu Yuan.",
            "Dragon boating began here 2000 years ago.",
            "The humidity today is very high.",
            "Even local crews find it saps their energy.",
            "Pace carefully and conserve your synergy.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'CGCSA Dragons',
    raceStateFlag: 'racedYueyang',
    raceResultFlag: 'yueyangResult',
    isWorld: true,
  },

  racice: {
    name: 'Racice, Czech Republic',
    bgColour: '#050520',
    weather: 'crosswind',
    weatherLabel: 'Crosswind — hit window is tighter',
    mapData: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,0],
      [0,20,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,0],
      [0,20,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,21,21,21,21,1,1,1,20,0],
      [0,20,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,21,21,21,21,1,1,1,20,0],
      [0,20,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,0],
      [0,20,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,0],
      [0,20,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,0],
      [0,20,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,0],
      [0,20,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,0],
      [0,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    npcs: [
      {
        name: 'Coach Tim',
        x: 80, y: 112,
        colour: '#4a90d9',
        get lines() {
          if (!STATE.worldFinalStage) {
            return [
              "Racice. The Grand Final.",
              "Three races. All five rivals. At once.",
              "The crosswind will narrow your hit window.",
              "Four bends in the 2000m — our strongest distance.",
              "Win two finals and we're world champions.",
              "Twenty years I've been coaching.",
              "This is what it was all for.",
              "Get on the water.",
            ];
          }
          if (STATE.worldFinalStage === 'after200') {
            const wins = STATE.getWorldWins();
            if (STATE.worldFinal200Result === 'win') {
              return [
                "200m final — Secklow win.",
                wins + " down. Two to go.",
                "Stay focused. The 500m is next.",
              ];
            }
            return [
              "Tough 200m. We move on.",
              "The 500m is next.",
              "Get back on the water.",
            ];
          }
          if (STATE.worldFinalStage === 'after500') {
            const wins = STATE.getWorldWins();
            if (wins === 2) {
              return [
                "Two finals won.",
                "Win the 2000m and we're world champions.",
                "Four bends. Hit every single one.",
                "This is it.",
              ];
            }
            if (wins === 1) {
              return [
                "One win. We need the 2000m.",
                "Four bends — the crosswind makes them hard.",
                "But this is our distance.",
                "Leave everything on the water.",
              ];
            }
            return [
              "Two losses. But the 2000m remains.",
              "Win it and we leave with something.",
              "Give everything.",
            ];
          }
          if (STATE.worldFinalStage === 'complete') {
            const ending = STATE.getWorldEnding();
            if (ending === 'champion') {
              return [
                "World Champions.",
                "Secklow Hundred.",
                "World. Champions.",
                "I have no more words.",
              ];
            }
            if (ending === 'silver') {
              return [
                "Silver medallists at the World Championships.",
                "From Milton Keynes.",
                "No one will ever forget this season.",
              ];
            }
            return [
              "We competed at the World Championships.",
              "We gave everything.",
              "This club will never be the same again.",
            ];
          }
          return ["Get to the dock."];
        },
      },
      {
        name: 'Viking Captain',
        x: 320, y: 80,
        colour: '#4488ff',
        get lines() {
          if (!STATE.worldFinalStage) {
            return [
              "Secklow Hundred. We have watched your season.",
              "Impressive. For a British crew.",
              "The crosswind today is strong from the north.",
              "Viking Dragons train in this every week.",
              "Good luck.",
            ];
          }
          return [
            "Good racing, Secklow.",
            "May the best crew win.",
          ];
        },
      },
      {
        name: 'IDBF Official',
        x: 200, y: 60,
        colour: '#f0c040',
        get lines() {
          if (!STATE.worldFinalStage) {
            return [
              "Welcome to the IDBF Grand Final.",
              "200m, 500m, and 2000m finals today.",
              "All five international rivals racing simultaneously.",
              "World Championship points: " +
                STATE.worldPoints + ".",
              "Good luck to all crews.",
            ];
          }
          if (STATE.worldFinalStage === 'complete') {
            const wins = STATE.getWorldWins();
            return [
              "Grand Final complete.",
              wins + " final" + (wins !== 1 ? "s" : "") +
                " won by Secklow Hundred.",
              "An extraordinary achievement for British dragon boating.",
            ];
          }
          return [
            "Racing continues at the dock.",
            "Good luck Secklow.",
          ];
        },
      },
    ],
    dockBounds: { x1: 64, x2: 160, y1: 96, y2: 160 },
    raceRival: 'International Field',
    raceStateFlag: 'racedWorldFinal',
    raceResultFlag: null,
    isWorld: true,
    isWorldFinale: true,
  },
};