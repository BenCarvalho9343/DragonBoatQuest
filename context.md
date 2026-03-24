# Dragon Boat Quest - Developer Context & Vision

## Personal Background

**Developer:** Ben Carvalho
- Active paddler for **Secklow Hundred Dragon Boat Club** (Milton Keynes)
- Competed for **Team GB** in international dragon boating for the last 2 years (2024-2026)
- **Two-time National League champion** with Secklow Hundred before transitioning to Team GB
- Personal connection to the sport informs all design and authenticity decisions

---

## Game Origin & Motivation

**Primary Purpose:** Share the game with teammates to introduce dragon boating to a broader audience

**Why a Game?**
- Personal passion for the sport combined with game development interest
- Wanted to capture the essence of competitive dragon boating
- Needed something concise enough that teammates would finish playing it

**Development Timeline:**
- **Duration:** ~1 week to reach v2.6.1
- **Team:** Solo developer with AI assistance for debugging and error resolution
- **Approach:** Iterative development with feedback incorporation

---

## Design Philosophy

### Core Mechanics Rationale

**Rhythm-Based Beat-Tapping System**
- **Why:** In actual dragon boating, synchronization between crew members is THE critical factor
- **Reality:** If even one person is out of time, the entire boat immediately feels the slowdown
- **Implementation:** Players tap beats to simulate maintaining crew cohesion
- **Authenticity:** This is the most accurate representation of what makes a boat fast IRL

**Three Race Distances (200m, 500m, 2000m)**
- These are the standard distances in official dragon boat racing
- Each distance has different pacing strategies and endurance requirements
- BPM adjusts per distance to reflect realistic race rhythms

### Player Experience Goals

**Short, Focused Gameplay Loop**
- **Intentional design:** Game completable in 1-2 sessions
- **Reasoning:** Teammates won't stick with something that drags on
- **Result:** National League + World Championships provides satisfying progression without exhaustion

**Accessible Progression**
- Campaign structure mirrors Ben's real journey (National → Team GB international)
- Story beats feel authentic because they're grounded in actual experience
- Unlocking World Championships after National success mirrors real competitive pathways

---

## Narrative Arc

### Campaign Structure (Intentionally Designed This Way)

**National League**
- 6 venue circuit + London 3-race finale
- Mirrors the BDA (British Dragon Boat Association) National League structure
- Player progression: win races → unlock new venues → accumulate trophy points

**World Championships**
- Currently 3 international venues (Duisburg, Yueyang, Racice)
- Separate points system (National points don't carry over)
- Finals structure different from National League

**Why This Arc?**
- Ben's personal progression (won Nationals → selected for Team GB → competing internationally)
- Felt realistic to implement
- Provides natural pacing and story escalation
- Authenticity makes it engaging for the actual dragon boating community

### Future Expansion Plans

**Current Limitation:** World Championships feels short with only 3 races

**Planned Additions:**
- More races/venues between National and World Championships
- Possibly different race formats beyond standard distance races
- More narrative development in World Championships arc
- Team dinners, training montages, character development scenes (speculative)

---

## Feature Details & Design Decisions

### Crew System

**Current Implementation:**
- 14-member roster with individual stats (Power, Rhythm, Stamina)
- Each member has assigned role (Striker, Engine, Anchor)
- Detailed appearances and backstories

**Stats Classification:**
- **Power:** Burst strength and force generation
- **Rhythm:** Timing consistency and beat alignment
- **Stamina:** Endurance for longer races

**Original Concept > Current State:**
- Originally planned: Crew stats would upgrade as you progressed
- Decision to change: Felt it complicated the design unnecessarily
- Current status: Cosmetic/informational, enhance crew menu appearance
- Ben's view: Comfortable with current implementation, serves narrative purpose

### Pixel Art & Aesthetic

**Visual Direction:**
- Retro pixel art inspired by classic Gameboy/Pokemon generation
- **All graphics procedurally generated via Canvas API** (not sprite sheets)
- Chosen over sprite sheets due to:
  - Difficulty in managing large sprite sheet system
  - Discovered preference for the retro generated look
  - Simplistic style matches gameplay simplicity

**Technical Implementation:**
- No external image assets (excluding audio)
- Character appearances generated from parameters
- Venue tiles drawn procedurally
- Minimal DOM footprint (single canvas element)

**Original Vision:**
- Game originally conceived as Pokemon-inspired with Gameboy graphics
- That vision evolved into the current retro dragon boating aesthetic
- Simpler, more authentic to the game's actual identity

### Achievement System (Newest Feature)

**Status:** Brand new, added in v2.6.0 (today)

**Known Issues:**
- "Talk to every NPC" achievement not tracking correctly (main bug)
- Some achievements unreachable on second playthrough (e.g., "lose first 2 races and win last")
- Implementation details need refinement

**Future Revisions Planned:**
- **"Rebirth" system** - Allow replayability while preserving achievement progress
  - Players restart story campaign
  - All previously unlocked achievements remain unlocked
  - New achievements can be earned if conditions are met again
  - Solves problem of one-time-only achievements becoming permanently locked
  - Would allow players to attempt previously-missed achievements on replay

**Current Structure:**
- ~15+ achievements across categories
- Venue win achievements
- Milestone achievements (National Champion, World Champion)
- Gameplay skill achievements (Perfect Rhythm, Long Haul)
- NPC interaction achievement (currently buggy)
- Queue system for multiple unlocks
- 3-second popup notifications (in progress)
- Persistent localStorage tracking

---

## Technical Choices

### Why Vanilla JavaScript + Canvas?

**Simplicity:**
- No framework overhead
- Full control over game loop and rendering
- Smaller file size
- Faster development iteration

**Aesthetic Match:**
- Canvas-based procedural rendering matches the desired pixel art look
- Retro nature of approach fits retro visual style
- Constraints breed creativity (forced creative solutions)

### Empty Scene Files

**Status:** Leftover from exploration phase
- Originally planned: Custom sprite sheets for each character/scene
- Discovery: Procedural generation preferred
- Current: Empty files not yet cleaned up
- Action: Planned cleanup, not critical

---

## Team Reception & Feedback

**Intended Audience:** Secklow Hundred teammates

**Playtesters:**
- Best friend Ada (actual Soaring Dragons paddler - featured as NPC in game)
- Multiple other teammates
- Selection of friends/colleagues

**Feedback Summary:**
- **Overall response:** Overwhelmingly positive across all playtesters
- **Standout feature:** Rhythm mechanic clicks immediately
- **Connection element:** Seeing themselves/friends as NPCs resonates strongly
- **Engagement:** Players want to complete and replay

**Feature Requests from Community:**
- **Multiplayer:** Real-time competitive racing feature where each player controls a boat
  - Multiple requests for this feature from playtesters
  - Would enable local/remote competitive play
  - High priority based on interest

**Note on NPC Representation:**
- Ada as actual Soaring Dragons paddler creates authentic connection
- In-game portrayal validates the game's authenticity for real players
- Personal touches like this significantly boost engagement

---

## Future Vision

### High Priority Features

**Rebirth System** (Replayability)
- Allow players to restart the campaign after completion
- Preserve all unlocked achievements across playthroughs
- Enables players to pursue previously-missed achievements
- Fixes the "one-time-only achievement" problem
- Potentially branded as a specific game mode (New Game+, Speedrun, etc.)

**World Championships Expansion**
- Current: 3 venues (Duisburg, Yueyang, Racice)
- Planned: Multiple races per country
  - Germany route: Duisburg → Munich → Berlin → Brandenburg, etc.
  - Similar expansion for other countries
  - Creates longer, richer World Championships arc
  - Reduces feeling of abrupt ending
  - More character development and rivalry building

### Community-Requested Features

**Multiplayer Racing** (High Interest)
- Multiple playtesters requesting real-time competitive mode
- Concept: Each player controls a boat, race simultaneously
- Could be:
  - Local multiplayer (same device, split controls)
  - Remote multiplayer (online, WebSocket-based)
  - Leaderboard integration
- Would require backend infrastructure if online
- Peer-to-peer option also viable

### Confirmed Medium-Term

**Mobile App Deployment**
- Full mobile support already implemented
  - Custom D-pad for mobile devices
  - Touch controls fully functional
  - UI responsive on all screen sizes
- Currently web-only deployment
- Next step: PWA or app store distribution
- No technical barriers, mainly distribution decision

### Possible Long-Term Additions

**Narrative Branching**
- Minor branching acceptable
- Linear progression currently preferred
- Could introduce small decision points without major story divergence

**Additional Race Types**
- Beyond standard distance races
- Team events, relay races, mixed crew formats
- Would leverage existing rhythm mechanic in new contexts

**Crew Progression Alternative System**
- Considered but decided against stat upgrades
- Alternative: Unlock new crew members as you progress
- Alternative: Individual crew members improve/develop over time
- Alternative: Friendship/rivalry system with other crews

---

## Current Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| National League Campaign | ✅ Complete | 7 venues, 3-race London finale |
| World Championships | ✅ Core, but short | 3 venues, needs expansion |
| Rhythm Racing Mechanic | ✅ Complete | 3 distances, BPM scaling |
| Crew System | ✅ Complete | 14 members, cosmetic stats |
| Achievement System | ⚠️ In Progress | Bugs exist, rebirth system pending |
| NPC Dialogue | ✅ Complete | Context-aware, real player cameos |
| Travel/Map System | ✅ Complete | National & World travel maps |
| Audio System | ✅ Complete | 4 tracks, 6 SFX, volume control |
| Mobile Support | ✅ Complete | Full touch controls, PWA-ready |
| Freeplay Mode | ✅ Complete | Replay unlocked races |
| Leaderboard | ❌ Not Started | Tracked as potential feature |
| Multiplayer | ❌ Not Started | High community interest |
| Sprite System | ❌ Abandoned | Replaced with procedural generation |

---

## Authenticity Elements

### Sport Accuracy

- **Crew roles:** Striker, Engine, Anchor - standard boat classes
- **Distances:** 200m, 500m, 2000m are actual competitive distances
- **Venues:** Multiple real-world dragon boat racing locations
  - Caldecotte Lake (Milton Keynes) - Secklow's home
  - River Soar (Loughborough)
  - River Trent (Nottingham)
  - River Great Ouse (St Neots)
  - Teesside (Middlesbrough)
  - Merseyside (Liverpool)
  - Royal Albert Dock (London)
  - Duisburg Regattabahn (Germany) - world championship venue
  - Yueyang (China) - birthplace of dragon boating
  - Racice (Czech Republic) - IDBF world championship venue

- **Rival Clubs:** Mix of Ben's personal experience and known teams
  - Soaring Dragons, Notts Anaconda, St Neots DBT, etc.
  - Reflects actual competitive environment

### Mechanic Accuracy

- **Rhythm system:** Core truth of dragon boating (any timing desynchronization = slower boat)
- **Distance formats:** Match real competitive structure
- **Progression path:** National → International reflects actual competitive pathways
- **Weather effects:** Real factor in outdoor water racing

---

## Development Philosophy

**Key Principles (Observed):**
1. **Authenticity first** - Ground game in real experience
2. **Accessibility over complexity** - Keep it accessible for non-gamers
3. **Iterative refinement** - Launch with core, improve based on feedback
4. **Solo craft** - Maintain full control and vision
5. **Leverage AI tools** - Use technology to speed up debugging without compromising design vision
6. **Team-centric** - Always keep teammates' experience in mind

---

## Version History Context

- **v2.6.0** - Added achievements (released today, has known bugs)
- **v2.6.1** - Current version (minor polish on v2.6.0)
- Steady development cycle with regular feature additions
- Git workflow: commit → tag → push (professional practices)

---

## Personal Notes

**Why This Game Matters:**
- Combines personal passion (dragon boating) with creative expression (game dev)
- Bridges the gap between niche sport community and potential players
- Authentic representation validates the sport community
- Shareable format builds community connection
- Personal investment in quality because it represents actual lived experience

**Design Restraint:**
- Could have made a 10+ hour epic
- Deliberately chose focused, complete experience
- Respects player time while delivering authentic narrative

**Next Chapter:**
- Expanding World Championships content
- Fixing achievement system bugs
- Gathering teammate feedback
- Planning future features based on reception
