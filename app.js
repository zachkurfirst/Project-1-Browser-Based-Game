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
let countdown;
let timer;
let interval;

/*----- cached elements  -----*/
// Select and save elements in variables that need to be accessed in JS more than once

const scoreEl = document.querySelector("#current-score");
console.log("score element: ", scoreEl);

const highScoreEl = document.querySelector("#high-score");
console.log("high score element: ", highScoreEl);

const gameOverEl = document.querySelector("#game-over");
console.log("game over message element: ", gameOverEl);

const gameBtnEls = document.querySelectorAll("#game-choices button");
console.log("button elements: ", gameBtnEls);

const tryAgainBtnEl = document.querySelector("#try-again");
console.log("try again button element: ", tryAgainBtnEl);

const introMsgEl = document.querySelector("#description");
console.log("intro message element: ", introMsgEl);

const coffeeBtnEl = document.querySelector("#coffee");
console.log("coffee btn element: ", coffeeBtnEl);

const bagelBtnEl = document.querySelector("#bagel");
console.log("bagel btn element: ", bagelBtnEl);

const pizzaBtnEl = document.querySelector("#pizza");
console.log("pizza btn element: ", pizzaBtnEl);

const sushiBtnEl = document.querySelector("#sushi");
console.log("sushi btn element: ", sushiBtnEl);

const countdownEl = document.querySelector("#countdown");
console.log("countdown element: ", countdownEl);

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
  if ((highScore = undefined)) {
    highScore = 0;
  } else {
    highScore = localStorage.getItem("highScore");
  }
  console.log("remember high score: ", highScore);

  //   console.log("computer turn: ", computerChoices);
  //   console.log("player turn: ", playerChoices);
  //   console.log("score: ", score);
  //   console.log("high score: ", highScore);

  countdown = 10;

  console.log("game has started!");

  runGame();
  render();
}

// startCountdown
// function startCountdown() {
//   setInterval(function() {
//     countdown --
//     console.log(countdown)
//     if (countdown < 1) {
//       clearInterval(countdown);
//       computerTurn();
//     }
//   }, 1000)
// }

const myInterval = setInterval(startCountdown, 1000) // setting interval to run every 1000 ms

function startCountdown() { // -> start, until < 1 and then run stop countdown to clear interval
  countdown --
  console.log(countdown)
  if (countdown < 1) {
    computerTurn();
    stopCountdown();
  }
}

function stopCountdown() {
  clearInterval(myInterval)
}

// runGame -> game loop function -> the game logic lives here
function runGame() {
  console.log("game is running!");

  // startCountdown();

  // computerTurn();
  //   render(); // as the game is changing, the render is effecting what is displayed on the page
}

// render -> trigger all render helper functions (updating stats, etc.)
function render() {
  console.log("game is rendering");

  renderScoreboard();
  renderCountdown();
}

// renderScoreboard
function renderScoreboard() {
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  console.log("render score: ", score, "render high score: ", highScore);
}

function renderCountdown() {
  countdownEl.textContent = countdown;
  console.log("render countdown: ", countdown);
}

// computerTurn
function computerTurn() {
  // TODO: Need to start by repeating existing choices, then add one additional random choice
  const rdmChoice = Math.floor(Math.random() * options.length);
  //   console.log("random computer choice index: ", rdmChoice);
  //   console.log("random computer choice: ", options[rdmChoice]);

  // ATTEMPT: setTimeout on function start
  // let rdmChoice;
  // setTimeout(function(){
  //     rdmChoice = Math.floor(Math.random() * options.length);
  //     computerChoices.push(options[rdmChoice]), 2000
  //   })

  computerChoices.push(options[rdmChoice]);
  console.log("computer choice array: ", computerChoices);
  computerString = computerChoices.join("-"); // -> turn computerChoices array into a string
  console.log("computer choice string: ", computerString);
  // for of loop with set timeout

  computerChoices.forEach(function (computerChoice, i) {
    // for (let i = 1; i <= computerChoices.length; i++) {
    setTimeout(function () {
      // check computer choice value and set the shake class
      if (computerChoice === "coffee") {
        coffeeBtnEl.classList.add("shake");
      }
      if (computerChoice === "bagel") {
        bagelBtnEl.classList.add("shake");
      }
      if (computerChoice === "pizza") {
        pizzaBtnEl.classList.add("shake");
      }
      if (computerChoice === "sushi") {
        sushiBtnEl.classList.add("shake");
      }
      // console.log("computer choice iterated: ", computerChoice);
    }, i * 1000);
    // console.log("testing", computerChoices, i);
    coffeeBtnEl.classList.remove("shake");
    bagelBtnEl.classList.remove("shake");
    pizzaBtnEl.classList.remove("shake");
    sushiBtnEl.classList.remove("shake");
  });

  // on each new computer turn, erase player history
  playerChoices = [];
  playerString = "";
  return computerString;
}

// playerTurn -> start with logging the name of the option on click
function playerTurn(event) {
  //   console.log(event.target.id);

  playerChoices.push(event.target.id);
  console.log("player choice array: ", playerChoices);
  playerString = playerChoices.join("-"); // -> turn playerChoices array into a string
  console.log("player choice string: ", playerString);

  if (
    computerString.startsWith(playerString) &&
    playerString !== computerString
  ) {
    console.log("let player continue turn");
  } else {
    compareChoices();
  }
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
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  console.log("update score: ", score, "update highScore: ", highScore);
  computerTurn();
}

// nextLevel

// gameOver
function gameOver() {
  setTimeout(function () {
    console.log("game over!");
    gameOverEl.removeAttribute("hidden");
    tryAgainBtnEl.removeAttribute("hidden");
    introMsgEl.setAttribute("hidden", "");
  }, 500);
}

//restartGame
function restartGame() {
  introMsgEl.removeAttribute("hidden");
  gameOverEl.setAttribute("hidden", "");
  tryAgainBtnEl.setAttribute("hidden", "");
  init();
}
