class Sprite {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  vx: number; // Horizontal velocity
  vy: number; // Vertical velocity
  angle: number; // Rotation angle in radians
  image: HTMLImageElement | null; // Optional image for the sprite

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = 'tomato',
    image: HTMLImageElement | null = null
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.image = image;
  }

  // Move to a specific position
  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Move by a relative offset
  moveBy(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  // Update position based on velocity
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // Check if the sprite is within canvas bounds
  isWithinBounds(canvasWidth: number, canvasHeight: number): boolean {
    return (
      this.x >= 0 &&
      this.y >= 0 &&
      this.x + this.width <= canvasWidth &&
      this.y + this.height <= canvasHeight
    );
  }

  // Render the sprite
  render(ctx: CanvasRenderingContext2D) {
    ctx.save(); // Save the current canvas state
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Move origin to sprite center
    ctx.rotate(this.angle); // Apply rotation

    if (this.image) {
      // Draw image if provided
      ctx.drawImage(
        this.image,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    } else {
      // Draw colored rectangle
      ctx.beginPath();
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    ctx.restore(); // Restore the canvas state
  }
}

export default Sprite;