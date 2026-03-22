function drawCharacter(ctx, x, y, options = {}) {
  const {
    skinColour   = '#f4c07a',
    hairColour   = '#3a2a1a',
    kitColour    = '#8B1A1A',
    kitSecondary = '#ffffff',
    facingLeft   = false,
  } = options;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(x + 2, y + 15, 12, 3);

  // Legs
  ctx.fillStyle = kitColour;
  ctx.fillRect(x + 3, y + 10, 4, 5);
  ctx.fillRect(x + 9, y + 10, 4, 5);

  // Feet
  ctx.fillStyle = '#222222';
  ctx.fillRect(x + 2, y + 14, 4, 2);
  ctx.fillRect(x + 9, y + 14, 4, 2);

  // Body / kit
  ctx.fillStyle = kitColour;
  ctx.fillRect(x + 2, y + 5, 12, 7);

  // Kit stripe
  ctx.fillStyle = kitSecondary;
  ctx.fillRect(x + 2, y + 7, 12, 2);

  // Arms
  ctx.fillStyle = kitColour;
  ctx.fillRect(x,      y + 5, 3, 5);
  ctx.fillRect(x + 13, y + 5, 3, 5);

  // Hands
  ctx.fillStyle = skinColour;
  ctx.fillRect(x,      y + 9, 3, 2);
  ctx.fillRect(x + 13, y + 9, 3, 2);

  // Neck
  ctx.fillStyle = skinColour;
  ctx.fillRect(x + 6, y + 3, 4, 3);

  // Head
  ctx.fillStyle = skinColour;
  ctx.fillRect(x + 4, y - 1, 8, 7);

  // Hair
  ctx.fillStyle = hairColour;
  ctx.fillRect(x + 4, y - 1, 8, 2);
  if (facingLeft) {
    ctx.fillRect(x + 4, y - 1, 2, 4);
  } else {
    ctx.fillRect(x + 10, y - 1, 2, 4);
  }

  // Eyes
  ctx.fillStyle = '#222222';
  if (facingLeft) {
    ctx.fillRect(x + 5, y + 2, 1, 1);
  } else {
    ctx.fillRect(x + 10, y + 2, 1, 1);
  }

  // Mouth
  ctx.fillStyle = '#c07050';
  ctx.fillRect(x + 6, y + 4, 3, 1);
}

var player = {
  x: 64,
  y: 80,
  width: 16,
  height: 16,
  speed: 80,
  facingLeft: false,

  update(deltaTime, keys) {
    if (isDialogueActive()) return;

    const newX = this.x + (keys['ArrowRight'] ? this.speed * deltaTime : 0)
                        - (keys['ArrowLeft']  ? this.speed * deltaTime : 0);
    const newY = this.y + (keys['ArrowDown']  ? this.speed * deltaTime : 0)
                        - (keys['ArrowUp']    ? this.speed * deltaTime : 0);

    if (keys['ArrowLeft'])  this.facingLeft = true;
    if (keys['ArrowRight']) this.facingLeft = false;

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
      skinColour:   '#f4c07a',
      hairColour:   '#1a1a1a',
      kitColour:    '#8B1A1A',
      kitSecondary: '#ffffff',
      facingLeft:   this.facingLeft,
    });
  }
};

window.player = player;