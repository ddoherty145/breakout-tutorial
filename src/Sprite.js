class Sprite {
  constructor(x, y, width, height, color = 'tomato') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;
