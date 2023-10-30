console.log("js:loaded");

/*----- constants -----*/
// Define constants (variables to reduce hard-coding)
// Initial data states

const options = ["coffee", "bagel", "pizza", "sushi"];

// const INIT_STATE = {
//   computerTurn: [],
//   playerTurn: [],
// };

/*----- state variables -----*/
// Data that will change while the game is running

let computerTurn = []; // array of options
let playerTurn = []; // array of options

let level;
let highScore;

/*----- cached elements  -----*/
// Select and save elements in variables that need to be accessed in JS more than once

const levelEl = document.querySelector("#current-level");
console.log("level element: ", levelEl);

const highScoreEl = document.querySelector("#high-score");
console.log("high score element: ", highScoreEl);

const messageEl = document.querySelector("#game-message");
console.log("game message: ", messageEl);

const gameBtnEls = document.querySelectorAll("#game-choices button");
console.log("button elements: ", gameBtnEls);

const restartBtnEl = document.querySelector("#restart");
console.log("restart button: ", restartBtnEl);

/*----- event listeners -----*/

/*----- functions -----*/
// init
init(); // -> starts game when JS loads

function init() {
  computerTurn = [];
  playerTurn = [];
  level = 1;

  console.log('computer turn: ', computerTurn)
  console.log('level: ', level)
  console.log("game has started!");

  runGame();
  render();
}

// runGame
function runGame() {
    console.log('game is running!')
}

// render
// trigger all render helper functions (updating stats, etc.)
function render() {
    console.log('game is rendering!')
}

// renderStats
// updateStats -> advance to next level, update high score (if applicable)
// continueGame
// gameOver
