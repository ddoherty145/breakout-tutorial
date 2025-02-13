import Sprite from './Sprite';

class Label extends Sprite {
  text: string;
  font: string;
  x: number;
  y: number;

  constructor(x:number, y:number, text:string, color = 'black', font = '16px Fantasy') {
    super(x, y, 0, 0, color);
    this.text = text;
    this.font = font;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

export default Label;
