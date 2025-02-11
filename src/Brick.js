import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, width, height, color = 'tomato', status = 1) {
    super(x, y, width, height, color);
    this.status = status;
    this.color = color;
  }
}

export default Brick;
