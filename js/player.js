const player = {
  x: 64,
  y: 80,
  width: 16,
  height: 16,
  speed: 80,

  update(deltaTime, keys) {
    if (isDialogueActive()) return;

    const newX = this.x + (keys['ArrowRight'] ? this.speed * deltaTime : 0)
                        - (keys['ArrowLeft']  ? this.speed * deltaTime : 0);
    const newY = this.y + (keys['ArrowDown']  ? this.speed * deltaTime : 0)
                        - (keys['ArrowUp']    ? this.speed * deltaTime : 0);

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
    ctx.fillStyle = '#8B1A1A';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};