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

let computerChoices = []; // array of options
let playerChoices = []; // array of options

let computerString;
let playerString;

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
gameBtnEls.forEach(function (btn) {
  //    console.log('button value: ', btn.value)
  btn.addEventListener("click", playerTurn);
});

// imgEls.forEach(function (img) {
//     //    console.log('button value: ', btn.value)
//     img.addEventListener("click", playerTurn);
//   });

/*----- functions -----*/
// init
init(); // -> starts game when JS loads

function init() {
  //reset turn arrays and set level back to start
  computerChoices = [];
  playerChoices = [];
  level = 1;

  // TODO: shouldn't be set to 0, should be set to existing high score
  highScore = 0;

  //   console.log("computer turn: ", computerChoices);
  //   console.log("player turn: ", playerChoices);
  //   console.log("level: ", level);
  //   console.log("high score: ", highScore);
  console.log("game has started!");

  runGame();
  render();
}

// runGame
// game loop function -> the game logic lives here
function runGame() {
  console.log("game is running!");

  computerTurn();
  //   render(); // as the game is changing, the render is effecting what is displayed on the page
}

// render
// trigger all render helper functions (updating stats, etc.)
function render() {
  console.log("game is rendering");

  renderScoreboard();
}

// computerTurn
function computerTurn() {
  // TODO: Need to start by repeating existing choices, then add one additional random choice
  const rdmChoice = Math.floor(Math.random() * options.length);
  //   console.log("random computer choice index: ", rdmChoice);
  //   console.log("random computer choice: ", options[rdmChoice]);
  computerChoices.push(options[rdmChoice]);
  console.log('computer choices: ', computerChoices);
  computerString = computerChoices.join("-"); // -> turn computerChoices array into a string
  console.log('computer choices: ', computerString);
  return computerString;
}

// playerTurn
// start with logging the name of the option on click
function playerTurn(event) {
  //   console.log(event.target.id);
  playerChoices.push(event.target.id);
  console.log('player choices: ', playerChoices);
  playerString = playerChoices.join("-"); // -> turn playerChoices array into a string
  console.log('player choices: ', playerString);
  compareChoices();
}

// compareChoices
// Once both computerChoices and playerChoices are strings, compare the string values
// If ===, call computerTurn function
// If !==, game over
function compareChoices() {
  if (playerString === computerString) {
    level++;
    if (level > highScore) {
      highScore = level;
    }
    updateScoreboard();
  } else {
    gameOver();
  }
}

// renderScoreboard
function renderScoreboard() {
  console.log("render scoreboard totals");
  levelEl.textContent = level;
  highScoreEl.textContent = highScore;
}

// updateScoreboard -> advance to next level, update high score (if applicable)
function updateScoreboard() {
  console.log("update scoreboard totals");
  levelEl.textContent = level;
  highScoreEl.textContent = highScore;
  computerTurn();
}
// nextLevel
// gameOver
function gameOver() {
  console.log("game over!");
}
