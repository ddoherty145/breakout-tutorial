import Sprite from './Sprite';

class Ball extends Sprite {
  radius: number;
  dx: number;
  dy: number;

  constructor(x: number, y: number, radius: number, color: string) {
    super(x - radius, y - radius, radius * 2, radius * 2, color);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  reset(x, y) {
    this.x = x - this.radius;
    this.y = y - this.radius;
    this.dx = 2;
    this.dy = -2;
  }
}

export default Ball;
