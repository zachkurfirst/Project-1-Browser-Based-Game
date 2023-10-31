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

let score;
let highScore;

let timer;
let interval;

/*----- cached elements  -----*/
// Select and save elements in variables that need to be accessed in JS more than once

const scoreEl = document.querySelector("#current-score");
console.log("score element: ", scoreEl);

const highScoreEl = document.querySelector("#high-score");
console.log("high score element: ", highScoreEl);

const gameOverEl = document.querySelector("#game-over");
console.log("game over message: ", gameOverEl);

const gameBtnEls = document.querySelectorAll("#game-choices button");
console.log("button elements: ", gameBtnEls);

const tryAgainBtnEl = document.querySelector("#try-again");
console.log("try again button: ", tryAgainBtnEl);

const introMsgEl = document.querySelector("#description");
console.log("intro message: ", introMsgEl);

/*----- event listeners -----*/
// Event listener for player button click
gameBtnEls.forEach(function (btn) {
  // console.log('button value: ', btn.value)
  btn.addEventListener("click", playerTurn);
});

tryAgainBtnEl.addEventListener("click", restartGame);

/*----- functions -----*/
// init -> start game when JS loads
init();

function init() {
  //reset choices arrays and set level back to start
  computerChoices = [];
  playerChoices = [];
  score = 0;
  // TODO: shouldn't be set to 0, should be set to existing high score
  highScore = 0;

  //   console.log("computer turn: ", computerChoices);
  //   console.log("player turn: ", playerChoices);
  //   console.log("score: ", score);
  //   console.log("high score: ", highScore);
  console.log("game has started!");

  runGame();
  render();
}

// runGame -> game loop function -> the game logic lives here
function runGame() {
  console.log("game is running!");

  computerTurn();
  //   render(); // as the game is changing, the render is effecting what is displayed on the page
}

// render -> trigger all render helper functions (updating stats, etc.)
function render() {
  console.log("game is rendering");

  renderScoreboard();
}

// renderScoreboard
function renderScoreboard() {
  console.log("render scoreboard totals");
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
}

// computerTurn
function computerTurn() {
  // TODO: Need to start by repeating existing choices, then add one additional random choice
  const rdmChoice = Math.floor(Math.random() * options.length);
  //   console.log("random computer choice index: ", rdmChoice);
  //   console.log("random computer choice: ", options[rdmChoice]);
  computerChoices.push(options[rdmChoice]);
  console.log("computer choice array: ", computerChoices);
  computerString = computerChoices.join("-"); // -> turn computerChoices array into a string
  console.log("computer choice string: ", computerString);
  return computerString;
}

// playerTurn -> start with logging the name of the option on click
function playerTurn(event) {
  //   console.log(event.target.id);

  playerChoices.push(event.target.id);
  console.log("player choice array: ", playerChoices);
  playerString = playerChoices.join("-"); // -> turn playerChoices array into a string
  console.log("player choice string: ", playerString);
  compareChoices();
}

// compareChoices
// Once both computerChoices and playerChoices are strings, compare the string values
// If ===, call computerTurn function
// If !==, game over
function compareChoices() {
  if (playerString === computerString) {
    score++;
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      highScore = localStorage.getItem("highScore");
      console.log(localStorage, highScore);
    }
    updateScoreboard();
  } else {
    gameOver();
  }
}

// updateScoreboard -> advance to next level, update high score (if applicable)
function updateScoreboard() {
  console.log("update scoreboard totals");
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  computerTurn();
}

// nextLevel

// gameOver
function gameOver() {
  console.log("game over!");
  gameOverEl.classList.remove("hidden");
  tryAgainBtnEl.classList.remove("hidden");
  introMsgEl.classList.add("hidden");
}

//restartGame
function restartGame() {
  introMsgEl.classList.remove("hidden");
  gameOverEl.classList.add("hidden");
  tryAgainBtnEl.classList.add("hidden");
  init();
}
