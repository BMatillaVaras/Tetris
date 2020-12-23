"use strict";

const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div"));
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#start- button");

const width = 10;

// The tetrominoes

const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const uTetromino = [
  [0, 1, width + 1, width * 2 + 1],
  [2, width, width + 1, width + 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width, width + 1, width + 2, width * 2],
];

const zTetromino = [
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
];

const sTetromino = [
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [2, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [2, width + 1, width + 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 2, width * 2 + 1, width * 3 + 1],
];

const theTetrominoes = [
  lTetromino,
  uTetromino,
  zTetromino,
  sTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

//randomly select a tetromino and its first rotation

let random = Math.floor(Math.random() * theTetrominoes.length);
console.log(random);

let current = theTetrominoes[random][0];

//draw the tetromino

function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

//undraw the tetromino

function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

//make the tetromino move down every second
let timerId = setInterval(moveDown, 1000);

//asign functions to keyCodes

function control(ev) {
  if (ev.keyCode === 37) {
    moveLeft();
  } else if (ev.keyCode === 38) {
    rotate();
  } else if (ev.keyCode === 39) {
    moveRight();
  } else if (ev.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener("keyup", control);

//moveDown function

function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

//freeze function

function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    // start a new tetromino falling
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
  }
}

//move the tetromino left, unless is at the edge or there is a blockage

function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );
  if (!isAtLeftEdge) {
    currentPosition -= 1;
  }
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  draw();
}

// move the tetromino right, unless is at the edge or there is a blockage

function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) {
    currentPosition += 1;
  }
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

// rotate te tetromino

function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) {
    //if currentRotation === 4 make it go back to 0
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw;
}
