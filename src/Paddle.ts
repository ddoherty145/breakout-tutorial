import Sprite from './Sprite';

class Paddle extends Sprite {

  constructor(x:number, y:number, width:number, height:number, color = 'tomato') {
    super(x, y, width, height, color);
  }

  move(direction:string, canvasWidth:number) {
    if (direction === 'left') {
      this.x = Math.max(this.x - 7, 0);
    } else if (direction === 'right') {
      this.x = Math.min(this.x + 7, canvasWidth - this.width);
    }
  }
}

export default Paddle;
