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

let computerString = "";
let playerString = "";

let score;
let highScore;
let countdown;
let timer;
let interval;

let arrPos = 0; // -> begin array position at 0 to indicate first choice
let animateTimer;

/*----- cached elements  -----*/
// Select and save elements in variables that need to be accessed in JS more than once

const scoreEl = document.querySelector("#current-score");
console.log("score element: ", scoreEl);

const highScoreEl = document.querySelector("#high-score");
console.log("high score element: ", highScoreEl);

const gameOverEl = document.querySelector("#game-over");
console.log("game over message element: ", gameOverEl);

const gameBtnEls = document.querySelectorAll("#gameboard button");
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

const countdownPromptEl = document.querySelector("#countdown-prompt");
console.log("countdown prompt element: ", countdownPromptEl);

const gameboardEl = document.querySelector("#gameboard");
console.log("gameboard element: ", gameboardEl);

/*----- event listeners -----*/
// Event listener for player button click
// setTimeout(function () {
//   gameBtnEls.forEach(function (btn) {
//     // console.log('button value: ', btn.value)
//     btn.addEventListener("click", playerTurn);
//   });
// }, 3000);

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
  if (highScore === undefined) {
    highScore = 0;
    console.log('no high score: ', highScore)
  } else {
    highScore = localStorage.getItem("highScore");
    console.log("recall high score: ", highScore);
  }
  //   console.log("computer turn: ", computerChoices);
  //   console.log("player turn: ", playerChoices);
  //   console.log("score: ", score);
  //   console.log("high score: ", highScore);

  countdown = 5;

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

// setting interval to run every 1000 ms

// start countdown until < 1 and then run stop countdown to clear interval
function countdownTimer() {
  countdown--;
  countdownEl.textContent = countdown;
  console.log(countdown);
  if (countdown < 1) {
    computerTurn();
    stopCountdown();
  }
}

function stopCountdown() {
  clearInterval(interval);
  countdownPromptEl.setAttribute("hidden", "");
}

// runGame -> game loop function -> the game logic lives here
function runGame() {
  console.log("game is running!");

  // call countdownTimer() with setInterval
  interval = setInterval(countdownTimer, 1000);

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

  animateTimer = setInterval(animateChoice, 1500);
  // console.log('arrPos line before round 2: ', arrPos)
}

const nodesDictionary = {
  coffee: coffeeBtnEl,
  bagel: bagelBtnEl,
  pizza: sushiBtnEl,
  sushi: sushiBtnEl,
};

const colorsDictionary = {
  coffee: "green",
  bagel: "gold",
  pizza: "red",
  sushi: "blue",
};

function clearHighlights() {
  coffeeBtnEl.style.backgroundColor = "";
  bagelBtnEl.style.backgroundColor = "";
  pizzaBtnEl.style.backgroundColor = "";
  sushiBtnEl.style.backgroundColor = "";
}

function animateChoice() {
  console.log(
    "current arrPos: ",
    arrPos,
    "array length: ",
    computerChoices.length
  );
  if (arrPos === computerChoices.length) {
    // end turn
    arrPos = 0;
    resetForPlayer();
    console.log("end computer turn");
    return clearInterval(animateTimer);
  } else {
    // start computer turn cycle
    console.log("start of cycle");
    const currentMove = computerChoices[arrPos];
    if (currentMove === "coffee") {
      coffeeBtnEl.style.backgroundColor = "green";
      console.log("highlight coffee");
      setTimeout(function () {
        coffeeBtnEl.style.backgroundColor = "";
      }, 200);
    }
    if (currentMove === "bagel") {
      bagelBtnEl.style.backgroundColor = "gold";
      console.log("highlight bagel");
      setTimeout(function () {
        bagelBtnEl.style.backgroundColor = "";
      }, 200);
    }
    if (currentMove === "pizza") {
      pizzaBtnEl.style.backgroundColor = "red";
      console.log("highlight pizza");
      setTimeout(function () {
        pizzaBtnEl.style.backgroundColor = "";
      }, 200);
    }
    if (currentMove === "sushi") {
      sushiBtnEl.style.backgroundColor = "blue";
      console.log("highlight sushi");
      setTimeout(function () {
        sushiBtnEl.style.backgroundColor = "";
      }, 200);
    }
    arrPos++;
  }
}

// Removed as of 11/1 6:56pm
//   if (computerChoices[arrPos] === "coffee") {
//     coffeeBtnEl.style.backgroundColor = "green";
//     console.log("highlight coffee");
//     setTimeout(function (){
//       removeComputerHighlight()
//     })
//   }
//   if (computerChoices[arrPos] === "bagel") {
//     bagelBtnEl.style.backgroundColor = "gold";
//     console.log("highlight bagel");
// setTimeout(function (){
//   removeComputerHighlight()
// })
//   }
//   if (computerChoices[arrPos] === "pizza") {
//     pizzaBtnEl.style.backgroundColor = "red";
//     console.log("highlight pizza");
// setTimeout(function (){
//   removeComputerHighlight()
// })
//   }
//   if (computerChoices[arrPos] === "sushi") {
//     sushiBtnEl.style.backgroundColor = "blue";
//     console.log("highlight sushi");
// setTimeout(function (){
//   removeComputerHighlight()
// })
// console.log(computerChoices[arrPos]);
// console.log("computer choice iterated: ", computerChoice);

// on each new computer turn, erase player history
function resetForPlayer() {
  // NOTE: maybe enable event handler here (tbd)
  playerChoices = [];
  playerString = "";
  gameBtnEls.forEach(function (btn) {
    btn.removeAttribute("disabled");
    btn.addEventListener("click", playerTurn);
  });
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
  coffeeBtnEl.setAttribute("disabled", "");
  bagelBtnEl.setAttribute("disabled", "");
  pizzaBtnEl.setAttribute("disabled", "");
  sushiBtnEl.setAttribute("disabbled", "");
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
  gameBtnEls.forEach(function (btn) {
    btn.removeEventListener("click", playerTurn);
  });
  computerTurn();
}

// nextLevel

// gameOver
function gameOver() {
  setTimeout(function () {
    gameBtnEls.forEach(function (btn) {
      btn.removeEventListener("click", playerTurn);
    });
    console.log("game over!");
    gameOverEl.removeAttribute("hidden");
    tryAgainBtnEl.removeAttribute("hidden");
    introMsgEl.setAttribute("hidden", "");
    // gameboardEl.setAttribute("hidden", "");
    gameboardEl.classList.add("shake");
    // gameboardEl.style.visibility = "hidden";
  }, 500);
}

//restartGame
function restartGame() {
  introMsgEl.removeAttribute("hidden");
  gameOverEl.setAttribute("hidden", "");
  tryAgainBtnEl.setAttribute("hidden", "");
  countdownPromptEl.removeAttribute("hidden");
  gameboardEl.removeAttribute("hidden");
  gameboardEl.classList.remove("shake");
  init();
  location.reload(); // QUESTION: should I remove init? Are we loading JS twice? Maybe move
}
