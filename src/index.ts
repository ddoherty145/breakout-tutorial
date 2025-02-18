/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/*  global document, requestAnimationFrame */
/*  eslint no-undef: "error" */
/*  eslint no-alert: "error" */

import {
  canvas,
  ctx,
  ballRadius,
  paddleHeight,
  paddleWidth,
  brickRowCount,
  brickColumnCount,
  brickWidth,
  brickHeight,
  brickPadding,
  brickOffsetTop,
  brickOffsetLeft,
} from './constants';

import Ball from './Ball';
import Brick from './Brick';
import Paddle from './Paddle';
import Label from './Label';

let gameOver = false;

const bricks: Brick[][] = [];

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, '#0095DD');
    console.log(`Brick at [${c}][${r}] created at (${brickX}, ${brickY})`); // Debugging
  }
}

if (!canvas) {
  throw new Error('Canvas element not found');
}
const paddleX = ((canvas as HTMLCanvasElement).width - paddleWidth) / 2;
const paddle = new Paddle(paddleX, (canvas as HTMLCanvasElement).height - paddleHeight, paddleWidth, paddleHeight, '#0095DD');
console.log('Paddle initialized:', paddle); // Debugging

const ball = new Ball((canvas as HTMLCanvasElement).width / 2, (canvas as HTMLCanvasElement).height - 30, ballRadius, '#0095DD');

let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

// Create labels for score and lives
const scoreLabel = new Label(8, 20, `Score: ${score}`, '#0095DD', '16px Arial');
const livesLabel = new Label((canvas as HTMLCanvasElement).width - 65, 20, `Lives: ${lives}`, '#0095DD', '16px Arial');

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e: KeyboardEvent) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e: KeyboardEvent) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e: MouseEvent) {
  if (canvas) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < (canvas as HTMLCanvasElement).width) {
      paddle.x = relativeX - paddleWidth / 2;
    }
  }
}

function collisionDetection() {
  bricks.forEach((column) => {
    column.filter((brick) => brick.status === 1).forEach((brick) => {
      if (
        ball.x > brick.x && ball.x < brick.x + brickWidth
        && ball.y > brick.y && ball.y < brick.y + brickHeight
      ) {
        ball.dy = -ball.dy;
        brick.status = 0;
        score += 1;
        if (score === brickRowCount * brickColumnCount) {
          displayWinMessage();
        }
      }
    });
  });
}

function draw() {
  console.log('Drawing frame...'); // Debugging
  if (!ctx || !canvas) {
    console.error('Canvas or context is not available');
    return;
  }
  ctx.clearRect(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height);

  if (gameOver) {
    console.log('Game over!'); // Debugging
    const gameOverLabel = new Label(150, 150, 'GAME OVER!', '#0095DD', '32px Arial');
    gameOverLabel.render(ctx);
    return;
  }

  console.log('Drawing ball...'); // Debugging
  if (ball && ball.draw) {
    ball.draw(ctx);
  } else {
    console.error('Ball is undefined or does not have a draw method');
  }

  console.log('Drawing paddle...'); // Debugging
  if (paddle && paddle.render) {
    paddle.render(ctx);
  } else {
    console.error('Paddle is undefined or does not have a render method');
  }

  console.log('Drawing bricks...'); // Debugging
  bricks.forEach((column, c) => {
    column.forEach((brick, r) => {
      if (brick.status === 1) {
        if (brick && brick.render) {
          brick.render(ctx);
        } else {
          console.error(`Brick at [${c}][${r}] is undefined or does not have a render method`);
        }
      }
    });
  });

  console.log('Checking collisions...'); // Debugging
  collisionDetection();

  // Update and render the score and lives labels
  console.log('Updating labels...'); // Debugging
  scoreLabel.text = `Score: ${score}`;
  livesLabel.text = `Lives: ${lives}`;
  scoreLabel.render(ctx);
  livesLabel.render(ctx);

  // Ball movement logic (fixing game over condition)
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy; // Ball hits the top
  } else if (ball.y + ball.dy > (canvas as HTMLCanvasElement).height - ballRadius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      ball.dy = -ball.dy; // Ball hits the paddle
    } else {
      // Ball misses the paddle
       lives--;
      if (lives === 0) {
        gameOver = true;
      } else {
        ball.reset((canvas as HTMLCanvasElement).width / 2, (canvas as HTMLCanvasElement).height - 30);
        paddle.x = ((canvas as HTMLCanvasElement).width - paddleWidth) / 2;
      }
    }
  }

  // Wall collision
  if (ball.x + ball.dx > (canvas as HTMLCanvasElement).width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }

  // Fix duplicate paddle movement logic
  if (rightPressed) {
    paddle.move('right', (canvas as HTMLCanvasElement).width);
  } else if (leftPressed) {
    paddle.move('left', (canvas as HTMLCanvasElement).width);
  }

  // Move the ball **after** all calculations
  ball.move();

  console.log('Requesting next frame...'); // Debugging
  requestAnimationFrame(draw);
}

function startGame() {
  draw();
}

const runButton = document.getElementById('runButton');
if (runButton) {
  runButton.addEventListener('click', function () {
    startGame();
    (this as HTMLButtonElement).disabled = true;
  });
}

function displayWinMessage() {
  const winMessage = document.createElement('div');
  winMessage.innerText = 'Congratulations! You win!';
  winMessage.style.position = 'absolute';
  winMessage.style.top = '50%';
  winMessage.style.left = '50%';
  winMessage.style.transform = 'translate(-50%, -50%)';
  winMessage.style.backgroundColor = '#0095DD';
  winMessage.style.color = '#fff';
  winMessage.style.padding = '20px';
  winMessage.style.fontSize = '24px';
  winMessage.style.borderRadius = '10px';
  document.body.appendChild(winMessage);

  setTimeout(() => {
    document.location.reload();
  }, 3000);
}
