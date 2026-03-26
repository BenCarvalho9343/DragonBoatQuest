# Dragon Boat Quest

A pixel art RPG about dragon boat racing, built from scratch in HTML and JavaScript by Ben Carvalho of Secklow Hundred Dragon Boat Club.

**Play it now:** [bencarvalho9343.github.io/DragonBoatQuest](https://bencarvalho9343.github.io/DragonBoatQuest)

---

## The Story Behind the Game

Dragon Boat Quest started as a conversation about what kind of game would capture the sport of dragon boating — a sport that is genuinely unknown to most people outside the paddling community, but one that has an incredibly passionate and tight-knit following across the UK and the world.

The developer, Ben Carvalho, is a GB dragon boater and member of **Secklow Hundred Dragon Boat Club** based in Milton Keynes, England. Secklow train on Caldecotte Lake and compete in the BDA National League against clubs from across the country. The game grew directly out of that world — the real venues, the real rival clubs, the real people.

The idea was simple: what if you could play through a dragon boat racing season, starting at home on Caldecotte Lake, travelling to Loughborough, Nottingham, St Neots, Middlesbrough, and Liverpool, and finishing at the BDA National Championships at the Royal Albert Dock in London? What if the rival clubs were the actual clubs — Soaring Dragons, Notts Anaconda, St Neots DBT, Powerhouse Dragons, Amathus, Thames Valley Dragons? What if your crew were the real Secklow paddlers?

That is exactly what this game is.

The entire game was built from scratch with no engine, no framework, and no prior game development experience — just HTML5 Canvas, JavaScript, and a lot of determination. It started as a single HTML file and grew into a complete two-act RPG with a full National League season, a World Championships postgame, pixel art characters with walking animations, a rhythm race mechanic, weather effects, achievements, freeplay mode, mobile touch controls, and more.

The game was shared with the Secklow club and received an enthusiastic response.

---

## What's In the Game

### Act 1 — The BDA National League

Race through seven venues across England, each based on a real location where the real club competes:

| Venue | Location | Rival Club |
|---|---|---|
| Caldecotte Lake | Milton Keynes | Soaring Dragons |
| River Soar | Loughborough | Soaring Dragons |
| River Trent | Nottingham | Notts Anaconda |
| River Great Ouse | St Neots | St Neots DBT |
| Teesside | Middlesbrough | Powerhouse Dragons |
| Merseyside | Liverpool | Amathus |
| Royal Albert Dock | London | Thames Valley Dragons + all rivals |

The London finale is the BDA National Championships — three finals in one day (200m, 500m, 2000m) with all seven clubs racing simultaneously. Between each final you return to the overworld, debrief with Coach Tim, and head back to the dock for the next race.

### Act 2 — The IDBF World Championships

Unlocked after completing the National League. Secklow Hundred are nominated to represent Great Britain at the World Championships. Three international venues, significantly harder rivals, and new weather mechanics:

| Venue | Location | Rival | Weather |
|---|---|---|---|
| Duisburg Regatta | Germany | Fire Dragons | Choppy water |
| Yueyang | China | CGCSA Dragons | Hot and humid |
| Racice Grand Final | Czech Republic | All 5 international rivals | Crosswind |

The Racice 2000m has four bends instead of three. Win two of the three World Championship finals to become World Champions.

### The Crew

The game features 14 real Secklow Hundred crew members in the crew roster, each with unique stats, a bio, and their own pixel art character:

Lesley, Marcus, Todd, Dan, Naomi, Tom, Rachel, Jason, Ben, Brendan, Marlee, Amelia, Liz, and Steve.

---

## How to Play

### Desktop Controls

| Key | Action |
|---|---|
| Arrow keys | Move character |
| Space | Interact with NPCs / tap race beats / advance dialogue |
| Z | Bend mechanic (2000m races only) |
| Tab | Cycle race distance on dock |
| M | Open travel map (after racing a venue) |
| C | Open crew screen |
| L | Open league table |
| Escape | Pause menu |
| ` (backtick) | Mute / unmute |

### Mobile Controls

A touch control overlay appears automatically on mobile devices:

- **D-pad** (bottom left) — move your character
- **ACT button** (bottom right, gold) — interact with NPCs, start races, advance dialogue
- **TAP button** (bottom right, during race) — tap in time with the beat
- **BEND button** (bottom left, during 2000m) — tap at the right moment on bends
- **DIST button** (appears on dock) — cycle through 200m / 500m / 2000m
- **Top bar** — CREW, TABLE, MUTE, II (pause), MAP buttons

### The Race Mechanic

Races use a rhythm system. Yellow beats scroll from right to left across the bottom of the screen. Press Space (or TAP on mobile) when a beat crosses the white hit line.

| Grade | Timing | Effect |
|---|---|---|
| PERFECT | Exactly on the line | +4 speed, +15 synergy |
| GREAT | Close to the line | +2 speed, +8 synergy |
| OK | Near the line | +1 speed |
| MISS | Too early or too late | -2 speed, -5 synergy |

Fill the **SYNERGY gauge** to 100 for a speed burst. In the 2000m, **bend markers** appear on the distance bar — press Z (or BEND on mobile) at the right moment when the bend timing bar appears. A perfect line costs no speed; a missed bend causes a big penalty.

### Weather Effects (World Championships only)

| Weather | Effect |
|---|---|
| Choppy water (Duisburg) | Rivals move faster, misses hurt more |
| Hot and humid (Yueyang) | Synergy gauge fills slower |
| Crosswind (Racice) | Hit window is narrower, the white line moves |

### Distance Modes

| Distance | BPM | Bends |
|---|---|---|
| 200m | 120 | None |
| 500m | 100 | None |
| 2000m | 90 | 3 (National League) / 4 (World Final) |

---

## Menu Features

Access the pause menu with **Escape** on desktop or the **II button** on mobile.

- **Freeplay** — replay any completed race at any distance, no progress saved
- **Achievements** — 19 achievements to unlock across all categories
- **Credits** — full credits for the game
- **League table** — BDA National League standings (unlocks after first race)
- **Music volume / SFX volume** — adjust audio levels
- **Restart game** — clear all progress and start from Caldecotte

---

## Achievements

There are 19 achievements including 9 secret ones:

**Standard achievements:**
- First Blood — win your first race
- Home Water — win at Caldecotte Lake
- River Soar Conqueror — win at Loughborough
- Trent Tamer — win at Nottingham
- Meadow Victory — win at St Neots
- Northern Grit — win at Middlesbrough
- Mersey Marvel — win at Liverpool
- National Champion — win the BDA National League
- Going Global — unlock the World Championships
- World Champion — win the IDBF World Championships
- Perfect Rhythm — complete a race with all PERFECT hits
- Long Haul — race a total of 10,000m

**Secret achievements** — discover these yourself.

---

## Version History

| Version | What's new |
|---|---|
| v1.0 | Complete National League, all 7 venues, London finale |
| v1.1 | Mobile touch controls, music, sound effects, start screen |
| v1.2 | Competitive rival AI — races are now actually loseable |
| v1.3 | Detailed pixel art characters with 3-frame walk animation |
| v1.4 | Pause menu, volume controls, restart game |
| v1.5 | League table screen |
| v2.0 | Full World Championships — Duisburg, Yueyang, Racice |
| v2.1 | Mobile NPC interaction fixes at World Finals |
| v2.6.1 | Achievements, credits, freeplay mode, scrollable menus |

---

## Built With

- **HTML5 Canvas** — all rendering, no game engine
- **Pure JavaScript** — no frameworks
- **Electron** — desktop packaging
- **Royalty free music** from OpenGameArt.org
- **Sound effects** from sfxr.me

---

## Credits

**Developed by** Ben Carvalho — Secklow Hundred Dragon Boat Club, Milton Keynes

**Crew** — Lesley, Marcus, Todd, Dan, Naomi, Tom, Rachel, Jason, Ben, Brendan, Marlee, Amelia, Liz, Steve

**Characters** — Coach Tim (based on no one in particular), Ada (Soaring Dragons — real paddler)

**Rival clubs** — Soaring Dragons (Loughborough), Notts Anaconda (Nottingham), St Neots Dragon Boat Trust (St Neots), Powerhouse Dragons (Middlesbrough), Amathus (Liverpool), Thames Valley Dragons (London)

**International rivals** — Fire Dragons (Germany), CGCSA Dragons (Hong Kong), Viking Dragons (Norway), Paddle Power (Canada), Golden Dragons (Australia)

Thank you to everyone at Secklow Hundred who played, tested, and gave feedback. To the BDA and all the clubs who make British dragon boating great.

---

*Dragon Boat Quest is a fan-made tribute to the sport and the people who race it. All club names are used with respect and affection.*