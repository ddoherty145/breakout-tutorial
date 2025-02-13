/* eslint-disable no-use-before-define */
/*  eslint no-undef: "error" */
/*  eslint no-alert: "error" */

// eslint-disable-next-line no-undef
export const canvas = document.getElementById('myCanvas');
export const ctx = canvas instanceof HTMLCanvasElement ? canvas.getContext('2d') : null;
export const ballRadius = 10;
export const paddleHeight = 10;
export const paddleWidth = 75;
export const brickRowCount = 3;
export const interval = 0;
export const brickColumnCount = 5;
export const brickWidth = 75;
export const brickHeight = 20;
export const brickPadding = 10;
export const brickOffsetTop = 30;
export const brickOffsetLeft = 30;
