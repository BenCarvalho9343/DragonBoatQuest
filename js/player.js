function drawCharacter(ctx, x, y, options = {}) {
  const {
    skinColour    = '#f4c07a',
    hairColour    = '#3a2a1a',
    hairStyle     = 'short',
    kitColour     = '#8B1A1A',
    kitSecondary  = '#ffffff',
    eyeColour     = '#3a2a1a',
    facingLeft    = false,
    hasBeard      = false,
    hairHighlight = null,
    walkFrame     = 0,
    withPaddle    = false,
  } = options;

  const ex = facingLeft ? x + 5 : x + 10;
  const mx = x + 7;

  // Walk cycle — 3 frames
  // frame 0: neutral, frame 1: left foot forward, frame 2: right foot forward
  const legL = walkFrame === 1 ? -2 : walkFrame === 2 ? 2 : 0;
  const legR = walkFrame === 1 ? 2 : walkFrame === 2 ? -2 : 0;
  const bodyBob = walkFrame === 0 ? 0 : 1;

  const by = y + bodyBob;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(x + 2, y + 17, 14, 3);

  // --- LEGS ---
  ctx.fillStyle = kitColour;
  ctx.fillRect(x + 3, by + 11 + legL, 4, 6 - Math.abs(legL));
  ctx.fillRect(x + 9, by + 11 + legR, 4, 6 - Math.abs(legR));

  // Shoes
  ctx.fillStyle = '#222';
  ctx.fillRect(facingLeft ? x + 1 : x + 3,
    by + 16 + legL, 5, 3);
  ctx.fillRect(facingLeft ? x + 8 : x + 9,
    by + 16 + legR, 5, 3);

  // --- BODY ---
  ctx.fillStyle = kitColour;
  ctx.fillRect(x + 2, by + 5, 13, 7);

  // Kit stripe
  ctx.fillStyle = kitSecondary;
  ctx.fillRect(x + 2, by + 7, 13, 2);

  // Kit number
  ctx.fillStyle = kitSecondary;
  ctx.font = '4px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('1', x + 8, by + 13);

  // --- ARMS ---
  // Arm swing opposite to legs
  const armL = walkFrame === 1 ? 2 : walkFrame === 2 ? -2 : 0;
  const armR = walkFrame === 1 ? -2 : walkFrame === 2 ? 2 : 0;

  if (withPaddle) {
    // Paddle version (race only)
    const paddleX = facingLeft ? x - 4 : x + 17;
    const paddleHandX = facingLeft ? x + 1 : x + 15;
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(paddleX, by + 2, 2, 14);
    ctx.fillStyle = '#6B4F10';
    ctx.fillRect(facingLeft ? paddleX - 2 : paddleX + 2,
      by + 10, 4, 6);
    ctx.fillStyle = skinColour;
    ctx.fillRect(paddleHandX, by + 5, 3, 3);
    ctx.fillRect(paddleHandX, by + 10, 3, 3);
    ctx.fillStyle = kitColour;
    ctx.fillRect(facingLeft ? x + 12 : x, by + 5, 3, 5);
    ctx.fillStyle = skinColour;
    ctx.fillRect(facingLeft ? x + 12 : x, by + 9, 3, 2);
  } else {
    // Walking arms
    ctx.fillStyle = kitColour;
    ctx.fillRect(x, by + 5 + armL, 3, 5);
    ctx.fillRect(x + 13, by + 5 + armR, 3, 5);
    ctx.fillStyle = skinColour;
    ctx.fillRect(x, by + 9 + armL, 3, 2);
    ctx.fillRect(x + 13, by + 9 + armR, 3, 2);
  }

  // --- NECK ---
  ctx.fillStyle = skinColour;
  ctx.fillRect(x + 6, by + 3, 4, 3);

  // --- HEAD ---
  ctx.fillStyle = skinColour;
  ctx.fillRect(x + 4, by - 2, 9, 7);

  // Ears
  ctx.fillStyle = skinColour;
  ctx.fillRect(x + 3, by, 2, 3);
  ctx.fillRect(x + 13, by, 2, 3);
  ctx.fillStyle = '#c8956a';
  ctx.fillRect(x + 3, by + 1, 1, 1);
  ctx.fillRect(x + 14, by + 1, 1, 1);

  // --- HAIR ---
  ctx.fillStyle = hairColour;

  if (hairStyle === 'short') {
    ctx.fillRect(x + 4, by - 2, 9, 2);
    ctx.fillRect(x + 4, by - 1, 2, 2);
    ctx.fillRect(x + 11, by - 1, 2, 2);
  } else if (hairStyle === 'long') {
    ctx.fillRect(x + 4, by - 2, 9, 2);
    ctx.fillRect(x + 3, by - 1, 2, 6);
    ctx.fillRect(x + 13, by - 1, 2, 6);
    ctx.fillRect(x + 4, by - 1, 2, 2);
    ctx.fillRect(x + 11, by - 1, 2, 2);
  } else if (hairStyle === 'curly') {
    ctx.fillRect(x + 4, by - 3, 9, 3);
    ctx.fillRect(x + 3, by - 2, 2, 3);
    ctx.fillRect(x + 13, by - 2, 2, 3);
    ctx.fillRect(x + 5, by - 4, 2, 2);
    ctx.fillRect(x + 9, by - 4, 2, 2);
    ctx.fillRect(x + 7, by - 5, 3, 2);
  } else if (hairStyle === 'bald') {
    ctx.fillStyle = skinColour;
    ctx.fillRect(x + 4, by - 2, 9, 1);
  } else if (hairStyle === 'ponytail') {
    ctx.fillRect(x + 4, by - 2, 9, 2);
    ctx.fillRect(x + 4, by - 1, 2, 2);
    ctx.fillRect(x + 11, by - 1, 2, 2);
    ctx.fillRect(facingLeft ? x + 12 : x + 3, by - 2, 2, 8);
  } else if (hairStyle === 'spiky') {
    ctx.fillRect(x + 4, by - 2, 9, 2);
    ctx.fillRect(x + 5, by - 4, 2, 3);
    ctx.fillRect(x + 9, by - 4, 2, 3);
    ctx.fillRect(x + 7, by - 3, 2, 2);
    ctx.fillRect(x + 3, by - 3, 2, 2);
    ctx.fillRect(x + 12, by - 3, 2, 2);
  }

  if (hairHighlight && hairStyle !== 'bald') {
    ctx.fillStyle = hairHighlight;
    ctx.fillRect(x + 6, by - 2, 3, 1);
  }

  // --- FACE ---
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(ex, by + 1, 3, 2);
  ctx.fillStyle = eyeColour;
  ctx.fillRect(facingLeft ? ex : ex + 1, by + 1, 2, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(facingLeft ? ex + 1 : ex + 2, by + 1, 1, 1);
  ctx.fillStyle = hairColour;
  ctx.fillRect(ex, by, 3, 1);
  ctx.fillStyle = '#c8956a';
  ctx.fillRect(x + 7, by + 3, 1, 1);
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(mx, by + 4, 3, 1);
  ctx.fillStyle = '#c8956a';
  ctx.fillRect(mx - 1, by + 4, 1, 1);
  ctx.fillRect(mx + 3, by + 4, 1, 1);

  if (hasBeard) {
    ctx.fillStyle = hairColour;
    ctx.fillRect(x + 5, by + 4, 7, 1);
    ctx.fillRect(x + 4, by + 3, 1, 2);
    ctx.fillRect(x + 12, by + 3, 1, 2);
  }

  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(x + 4, by - 2, 9, 7);
}

var player = {
  x: 64,
  y: 80,
  width: 16,
  height: 16,
  speed: 80,
  facingLeft: false,
  walkFrame: 0,
  walkTimer: 0,
  walkInterval: 0.18,
  isMoving: false,

  update(deltaTime, keys) {
    if (isDialogueActive()) return;

    const newX = this.x + (keys['ArrowRight'] ? this.speed * deltaTime : 0)
                        - (keys['ArrowLeft']  ? this.speed * deltaTime : 0);
    const newY = this.y + (keys['ArrowDown']  ? this.speed * deltaTime : 0)
                        - (keys['ArrowUp']    ? this.speed * deltaTime : 0);

    if (keys['ArrowLeft'])  this.facingLeft = true;
    if (keys['ArrowRight']) this.facingLeft = false;

    this.isMoving = keys['ArrowLeft'] || keys['ArrowRight'] ||
                    keys['ArrowUp']   || keys['ArrowDown'];

    // Advance walk animation
    if (this.isMoving) {
      this.walkTimer += deltaTime;
      if (this.walkTimer >= this.walkInterval) {
        this.walkTimer = 0;
        this.walkFrame = (this.walkFrame + 1) % 3;
      }
    } else {
      this.walkFrame = 0;
      this.walkTimer = 0;
    }

    const canMoveX = isWalkable(newX, this.y) &&
                     isWalkable(newX + this.width - 1, this.y) &&
                     isWalkable(newX, this.y + this.height - 1) &&
                     isWalkable(newX + this.width - 1, this.y + this.height - 1);

    const canMoveY = isWalkable(this.x, newY) &&
                     isWalkable(this.x + this.width - 1, newY) &&
                     isWalkable(this.x, newY + this.height - 1) &&
                     isWalkable(this.x + this.width - 1, newY + this.height - 1);

    if (canMoveX) this.x = newX;
    if (canMoveY) this.y = newY;
  },

  draw(ctx) {
    drawCharacter(ctx, this.x, this.y, {
      skinColour:   '#c68642',
      hairColour:   '#1a1a1a',
      hairStyle:    'short',
      kitColour:    '#8B1A1A',
      kitSecondary: '#ffffff',
      eyeColour:    '#3a6b8a',
      facingLeft:   this.facingLeft,
      walkFrame:    this.walkFrame,
      withPaddle:   false,
    });
  }
};

window.player = player;