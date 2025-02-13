import Sprite from './Sprite';

class Brick extends Sprite {
  status: number;
  color: string;

  constructor(x, y, width, height, color = 'tomato', status = 1) {
    super(x, y, width, height, color);
    this.status = status;
    this.color = color;
  }
}

export default Brick;
