# Dragon Boat Quest - Comprehensive Analysis

## Project Overview

**Dragon Boat Quest** is a narrative-driven, browser-based dragon boat racing game built entirely in vanilla JavaScript with HTML5 canvas rendering. The game simulates a competitive season through the perspective of the Secklow Hundred dragon boat club, with a story arc that progresses from a National League championship campaign to an international World Championships journey.

**Current Version:** 2.6.1

---

## Core Architecture

### Technology Stack
- **Frontend:** Vanilla JavaScript (ES6), HTML5 Canvas
- **Rendering:** 2D Canvas API with pixel-perfect rendering (`image-rendering: crisp-edges`)
- **Storage:** Browser localStorage for game state persistence
- **Audio:** Native HTML5 Audio API with MP3 (background music) and WAV (SFX)
- **Input Handling:** Keyboard events + Touch events (with multi-touch touch pad support)
- **Layout:** Responsive canvas (480×432 pixels, displayed at 720×648px scaled)

### Code Organization
```
- index.html (single-page entry point)
- style.css (minimal styling, mostly canvas-focused)
- js/
  ├── main.js (game loop, main logic orchestrator)
  ├── state.js (persistent game state object)
  ├── player.js (player character rendering & movement)
  ├── race.js (combat/racing mechanics engine)
  ├── venue.js (venue data & map definitions - National League)
  ├── worldvenue.js (venue data - World Championships)
  ├── map.js (tile-based map rendering system)
  ├── npc.js (NPC definitions & dialogue)
  ├── crew.js (crew roster with stats)
  ├── menu.js (in-game menu system)
  ├── travelmap.js (National League venue selection)
  ├── worldtravelmap.js (World Championships venue selection)
  ├── leaguetable.js (competitive standings display)
  ├── achievements.js (achievement system)
  ├── freeplay.js (free race mode selector)
  ├── audio.js (audio manager)
  ├── touch.js (touch input handler)
  ├── credits.js (credits scroll)
  ├── worldceremony.js (World Championships victory screen)
- scenes/ (placeholder - empty files, logic is in main.js)
- assets/
  ├── audio/music/ (background tracks)
  ├── audio/sfx/ (sound effects)
  ├── sprites/ (not yet utilized)
  ├── tiles/ (not yet utilized)
```

---

## Game Structure

### Campaign Flow

#### Phase 1: National League (BDA National League)
1. **Starting Venue:** Caldecotte Lake (Milton Keynes - home)
2. **Circuit:** 6 racing venues across England + London finale
3. **Progression Logic:**
   - Win races to unlock new venues and earn trophy points
   - Each venue has associated rival clubs with difficulty scaling
   - London is a 3-race finale (200m, 500m, 2000m distances)
   - Accumulate trophy points to determine ending tier

#### Phase 2: World Championships (IDBF)
- **Unlock Condition:** Win London finale OR display sufficient performance
- **Starting World Venue:** Duisburg, Germany
- **World Circuit:** Multiple international venues with weather effects
- **Final:** Racice Grand Final with all international rivals
- **Ending Tier:** Based on wins in World Championship races

### State Management

**STATE object** (state.js) tracks:
- Trophy points accumulation
- Unlocked venues (for both leagues)
- Race results and progression flags
- Current venue position
- London stage tracking (200m, 500m, 2000m completion states)
- World Championships unlock status and stage tracking
- Player metadata (met Tim, etc.)

**Key Methods:**
- `getLondonWins()` - Count finals won
- `getLondonEnding()` - Returns "champion", "runnersup", or "spirit"
- `getWorldWins()` - Count world finals won
- `getWorldEnding()` - Returns "champion", "silver", or "honour"
- `save()` - Serializes entire state to localStorage under key `dbq_save`

---

## Venue System

### National League Venues (VENUES object)

Each venue contains:
- **name** - Display name
- **bgColour** - Background color (hex)
- **mapData** - Tile-based 2D array (30×13 grid, each tile = 16×16px)
- **npcs** - Array of NPC definitions with dialogue
- **dockBounds** - Interaction zone bounding box for race starting
- **raceRival** - Rival team name for this venue
- **raceStateFlag** - STATE property tracking race completion (e.g., `racedCaldecotte`)
- **raceResultFlag** - STATE property tracking race outcome

**Venues:**
1. **Caldecotte Lake** (Milton Keynes) - Home, unlocked by default, rival: Soaring Dragons
2. **River Soar** (Loughborough) - rival: Soaring Dragons
3. **River Trent** (Nottingham) - rival: Notts Anaconda
4. **River Great Ouse** (St Neots) - rival: St Neots DBT
5. **Teesside** (Middlesbrough) - rival: Powerhouse Dragons
6. **Merseyside** (Liverpool) - rival: Amathus
7. **Royal Albert Dock** (London) - 3-race finale, rival: Thames Valley Dragons + all others

### World Championship Venues (WORLD_VENUES object)

Structure similar to national venues with additions:
- **weather** - Affects race mechanics ("choppy", "humid", "crosswind")
- **weatherLabel** - Description for UI display
- **isWorld** - Boolean flag
- **isWorldFinale** - For finale venue (Racice)

**Venues:**
1. **Duisburg Regatta** (Germany) - Weather: Choppy, rival: Fire Dragons
2. **Yueyang** (China) - Weather: Humid, rival: CGCSA Dragons
3. **Racice Grand Final** (Czech Republic) - Weather: Crosswind, rivals: All international crews

---

## Racing Mechanics

### Race System (race.js)

The race mechanic is a **rhythm-based tapping game** where players maintain tempo with audio beats to propel their boat.

#### Core Properties:
- **bpm** - Beats per minute (120 for 200m, 100 for 500m, 90 for 2000m)
- **maxDistance** - Race distance in meters (200, 500, or 2000)
- **boatSpeed** - Current forward velocity (starts at 20-30 depending on distance)
- **synergyGauge** - Crew cohesion meter (0-100+)
- **perfectStreak** - Consecutive perfect hits counter
- **distance** - Current distance traveled

#### Beat System:
- Beats appear at x=480 (right edge) and move left at 150px/frame
- Player must tap Space when beat reaches the hit zone (x≈44)
- Hit timing window: centered on the beat position

#### Hit Grades:
- **PERFECT** - Exact timing (+2 speed, +5 synergy, perfect streak bonus)
- **GREAT** - Within tolerance (+1 speed, +3 synergy)
- **MISS** - Failed beat (-2 to -3 speed depending on weather, synergy penalty)

#### Distance Mechanics:
- **200m races** - Fastest BPM (120), higher initial speed, short race
- **500m races** - Medium BPM (100), balanced gameplay
- **2000m races** - Slowest BPM (90), includes bend mechanics for obstacle avoidance

#### Bends (2000m races only):
- Special timing challenges at predetermined race distances
- Window duration: 1.2 seconds normally, 1.0 seconds on crosswind
- Three grades: PERFECT LINE, GOOD LINE, WIDE LINE
- Penalties range from 0 to -5 speed on line quality

#### Weather Effects:
- **Choppy water** - Rivals faster, misses hurt more (-3 speed vs -2)
- **Humid** - No special mechanics observed
- **Crosswind** - Reduced bend window (1.0s vs 1.2s), wind offset visual effect

#### Rival System:
Each race has 4-6 rival teams determined by venue. Rivals have:
- **Speed profile** - Separate coefficients for 200m, 500m, 2000m
- **Colour** - UI display color (hex)
- Rivals' speed scales 80-98% of player's max speed

#### Race Result:
- Player finishes when reaching maxDistance
- Final position determined by comparing final speeds vs rivals
- Result stored as 'win' or 'loss'
- Win conditions: Finish with higher final speed than primary rival

#### Tutorial System:
- First race shows interactive tutorial (can be dismissed)
- Tutorial state persists in `tutorialDismissed` flag

---

## Character System

### Player Character

The player is rendered via **drawCharacter()** function (player.js) with:
- **Position:** (x, y) on the tile map
- **Movement:** Arrow keys, 1 tile = 16 pixels
- **Walk cycle:** 3-frame animation (neutral, left-foot-forward, right-foot-forward)
- **Customizable appearance:** Skin colour, hair style, kit colour (currently hardcoded)

**Appearance Options Supported (but not exposed in UI):**
- Skin colours (various hex values)
- Hair styles: short, long, ponytail, curly, spiky, bald
- Hair colours and highlights
- Kit/uniform colours
- Beard option
- Eye colours
- Paddle pose for race vs walking pose

### Crew Roster (crew.js)

Secklow Hundred has 11 crew members, each with stats and role:

**Stats:**
- **Power** (0-100) - Burst strength
- **Rhythm** (0-100) - Beat timing consistency
- **Stamina** (0-100) - Endurance

**Roles:**
- Striker (front seat, sets pace)
- Engine (mid-crew, provides power)
- Anchor (rear seat, steering & stability)

**Crew Members:**
1. Lesley (Striker, Power 75, Rhythm 68, Stamina 62)
2. Marcus (Engine, Power 82, Rhythm 60, Stamina 78)
3. Todd (Engine, Power 70, Rhythm 80, Stamina 72)
4. Dan (Anchor, Power 68, Rhythm 85, Stamina 70)
5. Naomi (Engine, Power 74, Rhythm 72, Stamina 80)
6. Tom (Engine, Power 78, Rhythm 65, Stamina 75)
7. Rachel (Striker, Power 72, Rhythm 74, Stamina 65)
8. Jason (Engine, Power 85, Rhythm 62, Stamina 76)
9. Ben (Engine, Power 66, Rhythm 88, Stamina 74)
10. Brendan (Anchor) - bio partial in roster
11. Marlee (Engine) - bio partial
12. Amelia (Engine)
13. Liz (Drummer)
14. Steve (Sweep)

**Crew Screen (C key):** Scrollable roster display showing member details and role descriptions.

---

## NPC System

### NPC Definitions (npc.js)

NPCs have:
- **name** - Display name
- **x, y** - Position on venue map
- **colour** - Hexadecimal color for rendering
- **lines** - Arrays of dialogue strings (dynamically generated based on game state)

### NPC Appearance System

Each NPC has a custom appearance definition in `NPC_APPEARANCES`:
- Encodes hair, skin, kit colors
- Different appearances for different crew members

### Dialogue System

NPCs display context-dependent lines based on game state:
- Pre-race conversations (preparation, strategy hints)
- Post-race (victory/defeat reactions)
- Story progression dialogue
- Environmental exposition

**Key NPCs:**
- **Coach Tim** - Guide/mentor character, appears at every venue
- **Ada** - Soaring Dragons member, provides rival team perspective
- **River Marshal** - Venue-specific official character
- Various rival team captains and supporters

### Dialogue Interaction

- Press Space near NPC to initiate dialogue
- Lines display one-by-one at bottom of screen
- Pressing Space advances through dialogue
- Player can walk away to exit conversation

---

## MapITile System

### Map Rendering (map.js)

- **Tile size:** 16×16 pixels
- **Grid:** 30 columns × 13 rows = 480×208 pixels playable area
- **Coordinate system:** (0,0) at top-left

### Tile Type Numbers & Colors

Maps use numeric tile IDs mapped to hex colors:
- 0: Water/boundary (varies by venue)
- 1: Grass/walkable area
- 2: Dock/race area (specific shade for each venue)
- 3-21: Various themed tiles (forest, sand, river, structure colors)

### Walkability

`isWalkable(x, y)` checks if position is on non-zero tile type.

### Map Edge Detection

`isAtMapEdge(player)` - Triggers when player.x > 440, used to unlock new venues.

---

## Input System

### Keyboard Input

**Movement:**
- Arrow Up/Down/Left/Right - Move player

**Action Keys:**
- Space - Interact with NPCs, start races, advance dialogue
- C - Toggle crew screen
- M - Toggle travel map
- L - Toggle league table
- Tab - Cycle distance selection on dock
- Z - Perform bend action in 2000m races
- ` (backtick) - Mute/unmute audio
- Escape - Close menus/cancel

**Menu Navigation:**
- Arrow Up/Down - Select menu option
- Arrow Left/Right - Adjust values (volume sliders)
- Space/Enter - Confirm selection

### Touch Input (touch.js)

Game detects touch capability via:
```javascript
('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
```

**Touch Zones:**
- **Left side:** D-pad emulation (70, 385 center point, 4-directional)
- **Right side:** Tap button (for race tapping)
- **Menu buttons:** Clickable rectangles for menu interaction
- **Start screen:** Any touch to start

**Touch Handling:**
- Multi-touch support (tracks individual fingers)
- Prevents default browser behavior
- Emulates keyboard events through `keys` object

---

## Menu System

### Main Menu (menu.js)

**Options:**
1. Resume - Close menu
2. Freeplay - Unlock races previous venues (one per playthrough)
3. Achievements - View achievement progress
4. Credits - Scroll through credits
5. League table - View competitive standings
6. Music volume - Adjust 0-100% (0.1 increment steps)
7. SFX volume - Adjust 0-100% (0.1 increment steps)
8. Restart game - Clear localStorage and reload (with confirmation)

**Controls:**
- Arrow Up/Down - Navigate options
- Arrow Left/Right - Adjust sliders
- Space/Enter - Select option
- Escape - Close menu

---

## Achievement System

### Achievement Tracking (achievements.js)

Achievements support:
- Progress tracking (partial unlock conditions)
- Unlock notifications (popup system with 3-second duration)
- Queue system for multiple achievement unlocks
- Persistent storage to localStorage

**Achievement Categories:**

**Venue Wins (7):**
- First Blood (any win)
- Home Water (Caldecotte win)
- River Soar Conqueror (Loughborough)
- Trent Tamer (Nottingham)
- Meadow Victory (St Neots)
- Northern Grit (Middlesbrough)
- Mersey Marvel (Liverpool)

**Milestone:**
- National Champion (National League victory)
- Going Global (World Championships unlock)
- World Champion (World Championships victory)

**Gameplay:**
- Perfect Rhythm (all hits perfect in single race)
- Long Haul (cumulative 10,000m distance)
- Synergy Master (high crew cohesion)
- Bend Specialist (bend accuracy tracking)
- Undefeated (maintain win streak)

**Display:** Achievements screen scrollable list with icons and descriptions.

---

## Travel/Navigation System

### National League Travel Map (travelmap.js)

- Displays 7 venues on pseudo-map (x,y coordinates)
- Shows unlock status (locked venues grayed out)
- Smooth 2.5-second transition animation between venues
- Selection highlights current venue
- Activated with M key (after first race)

**Unlocking logic:**
- Venues unlock sequentially as you progress and win races
- Track state: `venuesUnlocked` array

### World Championships Travel Map (worldtravelmap.js)

- Similar to national map but 3 international venues
- Unique weather descriptions for each location
- Only accessible during world championship phase
- Separate state tracking from national map

---

## Audio System

### Audio Manager (audio.js)

**Background Music:**
- `menu` - Menu theme
- `overworld` - Exploration theme
- `race` - Racing theme
- `ceremony` - Victory theme

**Sound Effects:**
- `perfect` - Perfect hit sound
- `great` - Great hit sound
- `miss` - Miss sound
- `synergy` - Crew synergy boost sound
- `dialogue` - Text appearance sound
- `ceremony` - Ceremony/victory fanfare

**Features:**
- Background music loops
- Volume control independent for music (0-1.0) and SFX (0-1.0)
- Mutable with ` key → toggles `muted` flag
- Auto-plays when game starts (requires user interaction for browser autoplay policy)
- Catches audio play promise errors gracefully

---

## League Table

### Competitive Standings (leaguetable.js)

Displays 7 rival clubs + Secklow with:
- **Points** - Running total (6 points per venue win)
- **Wins/Losses** - Record across the season
- **Best Distance** - Preferred race length
- **Colour** - Team identification color

**Rivals:**
1. Thames Valley Dragons (78 pts) - Strong team
2. Amathus (72 pts) - Liverpool-based strong performer
3. Soaring Dragons (68 pts) - Early rival
4. Notts Anaconda (62 pts)
5. St Neots DBT (58 pts)
6. Powerhouse Dragons (55 pts)
7. Secklow Hundred (dynamic based on player wins)

Dynamic calculation vs. simulated rival performance based on speed profiles.

---

## Freeplay Mode

### Freeplay Races (freeplay.js)

Allows replaying previously completed races:

**Available Venues Unlocked By:**
- Each venue only appears after first race there
- All three distance options available
- Separate win/loss tracking (not affecting campaign)

**Selection Interface:**
- Arrow Up/Down - Select venue
- Arrow Left/Right - Select distance
- Space/Enter - Start race
- Escape - Exit freeplay

---

## Game Loop Architecture

### Main Game Loop (main.js: gameLoop function)

Orchestrates all game logic each frame:

1. **Input Processing:**
   - Read keyboard state (`keys` object)
   - Process arrow keys for movement

2. **Player Update:**
   - Update position based on input
   - Check bounds (map edges)
   - Update walk animation frame

3. **NPC Management:**
   - Update active NPC tracking
   - Handle proximity-based dialogue triggers
   - Auto-start dialogues at specific story points

4. **Race Update:**
   - If active: update race physics
   - Calculate boat speed changes
   - Track distance traveled
   - Handle beat timing

5. **UI Update:**
   - Menu state transitions
   - Travel map animation
   - Achievements popup queue
   - Screen state machine (title → overworld → race → ceremony, etc.)

6. **Rendering:**
   - Clear canvas
   - Draw map tiles
   - Draw NPCs
   - Draw player character
   - Draw UI overlays (race HUD, menus, etc.)
   - Draw race if active
   - Draw ceremony screen if needed
   - Draw transitions and popups

7. **Audio Management:**
   - Play appropriate track for current screen
   - Handle volume changes

### State Machine Patterns

The game uses implicit state via boolean/null flags rather than explicit state enum:
- `race.active` - In active race
- `race.finished` - Race completed, waiting to resume
- `race.showTutorial` - First race tutorial
- `Menu.open` - Menu overlay visible
- `CrewScreen.open` - Crew roster visible
- `travelMap.open` - Travel map visible
- `STATE.inWorldChamps` - World championship phase

### Frame Timing

- RequestAnimationFrame for smooth 60fps
- DeltaTime calculation from timestamps
- Used for animation timing (walk cycles, beat movement, transitions)

---

## Visual & Rendering Design

### Art Style
- **Pixel art aesthetic** - Low-resolution pixel-based characters and environments
- **Monospace fonts** - Retro computer aesthetic
- **Limited color palette** - Hex colors specific to each venue/team
- **No sprite assets** - Everything drawn procedurally with canvas fill/stroke

### Character Rendering
- 16×16 pixel bounding box per character
- Layered body parts (shadow, legs, body, arms, head, accessories)
- Walk cycle with leg and arm swinging
- Customizable appearance via color parameters

### UI Rendering
- Text-based menus with monospace font
- Outlined rectangles for UI boxes
- Minimal animations (fades, position tweens)
- Information density over aesthetics

### Color Scheme
- Dark backgrounds (#050510, #020210) - Reduces eye strain
- High contrast text (white, gold #f0c040)
- Team-specific colors in standings
- Venue-specific background colors

---

## Notable Technical Details

### Optimization
- Pixel-perfect rendering with `crisp-edges`
- Minimal DOM (single canvas element)
- No framework overhead (vanilla JS)
- Efficient beat calculation using timestamp intervals

### Data Persistence
- Single localStorage entry: `dbq_save`
- Serializes entire STATE object as JSON
- Persists all progress, settings, achievements
- No server communication (entirely client-side)

### Browser Compatibility
- Requires ES6 support
- Canvas API (IE 9+)
- LocalStorage (all modern browsers)
- Touch events (mobile/tablet browsers)
- No WebGL (uses 2D context)

### Accessibility Considerations
- Full keyboard control
- Touch support
- High contrast text
- No rapid flashing

### Known Limitations/Design Choices
- No sprite sheets (renders everything procedurally)
- No particle effects
- No visual physics simulation
- Linear progression (no branching paths)
- Single-player only (no multiplayer)

---

## File Size Analysis

**Main JS Files (~200KB combined):**
- main.js - Game loop orchestrator
- race.js - Complex race mechanics
- state.js - State management
- venue.js & worldvenue.js - Venue data (largest due to mapData arrays)
- Audio, menu, UI subsystems

**Assets:**
- Audio files likely exceed code size (4 music tracks + 6 SFX)
- No image assets (pure canvas rendering)

---

## Version History Indicators

**Current: v2.6.1**
- Recent commits: "credits and achievements"
- Tag: v2.6.0
- Suggests active development

---

## Conclusion

Dragon Boat Quest is a well-structured, narrative-driven indie game that balances gameplay mechanics with storytelling. The architecture prioritizes clarity and maintainability with clear separation between game state, rendering, and input. The rhythm-based race mechanic is the core gameplay loop, while the National League → World Championships campaign structure provides narrative progression. The game successfully combines real-world context (actual UK dragon boat clubs and International venues) with engaging mechanics and character development, all while maintaining a tiny footprint through procedural rendering and minimal dependencies.

The codebase demonstrates solid game development patterns:
- Clear state management
- Abstractedrenderer subsystems
- Modular audio handling
- Cross-platform input support
- Data persistence layer

This game serves as an excellent case study for minimalist, accessible indie game development using web standards.
