# Dragon Boat Quest - Suggested Achievement System Changes

## Executive Summary
Found **2 critical bugs** in the "Social Butterfly" (talk_to_everyone) achievement preventing it from ever unlocking. Both are name mismatches in the `allNPCs` reference list.

---

## Bug #1: Invalid NPC Name - "River Marshal"

### The Problem
**Location:** `js/achievements.js`, line 228 in the `check()` function

The `allNPCs` array contains the string `'River Marshal'`, but this NPC does not exist in any venue.

```javascript
const allNPCs = [
  // ... other NPCs ...
  'River Marshal',  // ❌ DOES NOT EXIST IN GAME
  // ... other NPCs ...
];
```

### Root Cause
Looking through all venues (National League and World Championships), there is NO NPC named "River Marshal". The marsh-themed NPCs that do exist are:
- `'Trent Marshal'` (Nottingham)
- `'Tees Marshal'` (Middlesbrough)
- `'Dock Marshal'` (Liverpool)

"River Marshal" appears to be a placeholder or copy-paste error.

### Impact
**Severity:** Critical
- Players can talk to every actual NPC in the game, but the achievement will **never unlock**
- The check fails because `'River Marshal'` is in the requirement list but can never be added to `npcsMet`
- This makes the achievement permanently impossible to earn

### Solution
**Remove the non-existent NPC entirely** from the `allNPCs` list since no venue has a "River Marshal"—only venue-specific marshals.

### Implementation Details

**File:** `js/achievements.js`

**Current code (line 228-244):**
```javascript
const allNPCs = [
  'Coach Tim', 'Soaring Captain', 'River Marshal', 'Ada',
  'Anaconda Captain', 'holly', 'Supporter',
  'St Neots Captain', 'Festival MC', 'Local Fan',
  'Powerhouse Captain', 'Tees Marshal', 'Steel Worker',
  'Amathus Captain', 'Dock Marshal', 'Mersey Local',
  'Thames Captain', 'BDA Official', 'Fire Captain',
  'World Official', 'CGCSA Captain', 'Local Guide',
  'Viking Captain', 'IDBF Official',
];
```

**New code (remove 'River Marshal'):**
```javascript
const allNPCs = [
  'Coach Tim', 'Soaring Captain', 'Ada',
  'Anaconda Captain', 'holly', 'Supporter',
  'St Neots Captain', 'Festival MC', 'Local Fan',
  'Powerhouse Captain', 'Tees Marshal', 'Steel Worker',
  'Amathus Captain', 'Dock Marshal', 'Mersey Local',
  'Thames Captain', 'BDA Official', 'Fire Captain',
  'World Official', 'CGCSA Captain', 'Local Guide',
  'Viking Captain', 'IDBF Official',
];
```

**What Changes:**
- Removes non-existent NPC requirement
- Reduces total required NPCs from 24 to 23
- Achievement becomes attainable once players talk to all 23 valid NPCs

---

## Bug #2: Wrong NPC Name - "BDA Official" Should Be "Dave Bangs"

### The Problem
**Location:** `js/achievements.js`, line 236 in the `allNPCs` array

The list requires talking to `'BDA Official'`, but the actual NPC at London is named `'Dave Bangs'`.

```javascript
const allNPCs = [
  // ... other NPCs ...
  'Thames Captain', 'BDA Official', 'Fire Captain',  // ❌ Should be 'Dave Bangs'
  // ... other NPCs ...
];
```

### Root Cause
Looking at `js/venue.js` lines 875-920 (London venue), the London finale NPC is defined as:

```javascript
{
  name: 'Dave Bangs',  // ✅ Actual NPC name
  x: 200, y: 60,
  colour: '#f0c040',
  get lines() {
    if (!STATE.londonStage) {
      return [
        "Welcome to the BDA National Championships.",
        "my name's Dave Bangs, I am head of the BDA",
        // ... dialogue continues ...
      ];
    }
    // ... more dialogue ...
  },
},
```

The NPC's name is `'Dave Bangs'` (the character identifies himself as "head of the BDA"), not `'BDA Official'`.

### Impact
**Severity:** Critical
- Players can talk to Dave Bangs at London, but `trackNPC('Dave Bangs')` is called
- The achievement checks for `'BDA Official'` in the `npcsMet` array
- Since `'Dave Bangs'` ≠ `'BDA Official'`, the name never matches
- Achievement will never unlock even after talking to all NPCs

### Solution
**Change `'BDA Official'` to `'Dave Bangs'`** to match the actual NPC name in the game.

### Implementation Details

**File:** `js/achievements.js`

**Current code (line 228-244):**
```javascript
const allNPCs = [
  'Coach Tim', 'Soaring Captain', 'River Marshal', 'Ada',
  'Anaconda Captain', 'holly', 'Supporter',
  'St Neots Captain', 'Festival MC', 'Local Fan',
  'Powerhouse Captain', 'Tees Marshal', 'Steel Worker',
  'Amathus Captain', 'Dock Marshal', 'Mersey Local',
  'Thames Captain', 'BDA Official', 'Fire Captain',  // ❌ Wrong name
  'World Official', 'CGCSA Captain', 'Local Guide',
  'Viking Captain', 'IDBF Official',
];
```

**New code (replace 'BDA Official' with 'Dave Bangs'):**
```javascript
const allNPCs = [
  'Coach Tim', 'Soaring Captain', 'Ada',
  'Anaconda Captain', 'holly', 'Supporter',
  'St Neots Captain', 'Festival MC', 'Local Fan',
  'Powerhouse Captain', 'Tees Marshal', 'Steel Worker',
  'Amathus Captain', 'Dock Marshal', 'Mersey Local',
  'Thames Captain', 'Dave Bangs', 'Fire Captain',  // ✅ Correct name
  'World Official', 'CGCSA Captain', 'Local Guide',
  'Viking Captain', 'IDBF Official',
];
```

**What Changes:**
- String `'BDA Official'` replaced with `'Dave Bangs'`
- When player talks to Dave Bangs at London, `trackNPC('Dave Bangs')` correctly adds the name to `npcsMet`
- Achievement check now correctly recognizes Dave Bangs has been met

---

## Summary Table

| Bug | Current | Should Be | Type | Severity |
|-----|---------|-----------|------|----------|
| Bug #1 | `'River Marshal'` | Remove entirely | Non-existent NPC | Critical |
| Bug #2 | `'BDA Official'` | `'Dave Bangs'` | Name mismatch | Critical |

---

## All Valid NPCs (Updated List - 23 Total)

After applying both fixes, players must talk to these 23 NPCs:

**National League (17):**
1. Coach Tim (Caldecotte, London)
2. Soaring Captain (Loughborough)
3. Ada (Loughborough)
4. holly (Loughborough)
5. Anaconda Captain (Nottingham)
6. Trent Marshal (Nottingham)
7. Supporter (Nottingham)
8. St Neots Captain (St Neots)
9. Festival MC (St Neots)
10. Local Fan (St Neots)
11. Powerhouse Captain (Middlesbrough)
12. Tees Marshal (Middlesbrough)
13. Steel Worker (Middlesbrough)
14. Amathus Captain (Liverpool)
15. Dock Marshal (Liverpool)
16. Mersey Local (Liverpool)
17. Thames Captain (London)
18. **Dave Bangs** (London) ← Fixed

**World Championships (5):**
19. Fire Captain (Duisburg)
20. World Official (Duisburg)
21. CGCSA Captain (Yueyang)
22. Local Guide (Yueyang)
23. Viking Captain (Racice)
24. IDBF Official (Racice)

---

## Testing After Fix

**How to verify the fix works:**

1. Start new game
2. Visit each venue and talk to every NPC (press Space near them)
3. By the time you talk to Dave Bangs at London or any final World Championships NPC, the "Social Butterfly" achievement should unlock
4. You should see the achievement popup notification with the ✓ icon

**Achievement popup should display:**
- Name: "Social Butterfly"
- Description: "Talk to every NPC in the game"
- Icon: "C"
- Notification duration: 3 seconds

---

## Additional Notes

### Why This Bug Occurred
- Likely copy-paste error or incomplete refactoring when NPC names were changed
- "River Marshal" might have been a planned NPC that was never added to any venue
- "BDA Official" might have been a placeholder name that was later changed to "Dave Bangs" in the venue definition but not updated in the achievement list

### No Other Achievement Issues Found
All other achievements appear to have matching names and correct logic based on code review.

---

## Recommendation
**Approve and merge both fixes immediately** — they are low-risk changes that only correct strings, with no impact to game logic or other systems. This makes an impossible achievement possible without affecting any other gameplay.
