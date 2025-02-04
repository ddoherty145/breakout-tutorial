class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = 75;
    this.height = 20;
    this.color = 'tomato';
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
