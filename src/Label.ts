import Sprite from './Sprite';

class Label extends Sprite {
  text: string;
  font: string;

  constructor(x, y, text, color = 'black', font = '16px Fantasy') {
    super(x, y, 0, 0, color);
    this.text = text;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

export default Label;
