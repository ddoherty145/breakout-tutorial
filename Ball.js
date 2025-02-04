import Sprite from './Sprite';

class Ball extends Sprite {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color)
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}