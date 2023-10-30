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
  //reset turn arrays and set level back to start
  computerTurn = [];
  playerTurn = [];
  level = 1;

  // TODO: shouldn't be set to 0, should be set to existing high score
  highScore = 0;

  console.log("computer turn: ", computerTurn);
  console.log("player turn: ", playerTurn);
  console.log("level: ", level);
  console.log("high score: ", highScore);
  console.log("game has started!");

  runGame();
  render();
}

// runGame
// game loop function -> the game logic lives here
function runGame() {
  console.log("game is running!");

  computerChoice();
  render(); // as the game is changing, the render is effecting what is displayed on the page
}

// render
// trigger all render helper functions (updating stats, etc.)
function render() {
  console.log("game is rendering!");

  renderScoreboard();
}

// computerChoice
function computerChoice() {
    // TODO: Need to start by repeating existing choices, then add one additional random choice
  const rdmChoice = Math.floor(Math.random() * options.length);
  console.log("random computer choice index: ", rdmChoice);
  // return options[rdmChoice];
  console.log("random computer choice: ", options[rdmChoice]);
  computerTurn.push(options[rdmChoice])
  console.log(computerTurn)
}

// playerChoice

// compareChoices

// renderScoreboard
function renderScoreboard() {
  console.log("render scoreboard totals!");
  levelEl.textContent = level;
  highScoreEl.textContent = highScore;
}

// updateScoreboard -> advance to next level, update high score (if applicable)
// nextLevel
// gameOver
