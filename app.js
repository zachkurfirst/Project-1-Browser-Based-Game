/*----- constants -----*/
const options = ["coffee", "bagel", "pizza", "sushi"];

/*----- state variables -----*/
let computerChoices = [];
let playerChoices = [];
let computerString = "";
let playerString = "";
let score;
let highScore;
let countdown;
let timer;
let interval;
let arrPos = 0;
let animateTimer;

/*----- cached elements  -----*/
const startGameBtnEl = document.querySelector("#start");
const scoreEl = document.querySelector("#current-score");
const highScoreEl = document.querySelector("#high-score");
const gameOverEl = document.querySelector("#game-over");
const gameBtnEls = document.querySelectorAll("#gameboard button");
const coffeeBtnEl = document.querySelector("#coffee");
const bagelBtnEl = document.querySelector("#bagel");
const pizzaBtnEl = document.querySelector("#pizza");
const sushiBtnEl = document.querySelector("#sushi");
const tryAgainBtnEl = document.querySelector("#try-again");
const instructionsEl = document.querySelector("#instructions");
const countdownEl = document.querySelector("#countdown");
const countdownPromptEl = document.querySelector("#countdown-prompt");
const gameboardEl = document.querySelector("#gameboard");

/*----- event listeners -----*/
// Click event listeners to start and restart the game
startGameBtnEl.addEventListener("click", runGame);
tryAgainBtnEl.addEventListener("click", restartGame);

/*----- functions -----*/
init();

function init() {
  score = 0;
  // check local storage for pre-existing high score
  highScore = localStorage.getItem("highScore");
  if (highScore === undefined || highScore === null) {
    highScore = 0;
  }
  countdown = 5;
  render();
}

function render() {
  renderScoreboard();
  renderCountdown();
}

function renderScoreboard() {
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
}

function renderCountdown() {
  countdownEl.textContent = countdown;
}

// prompted by click event listener on 'start game' button
function runGame() {
  instructionsEl.setAttribute("hidden", "");
  startGameBtnEl.setAttribute("hidden", "");
  countdownPromptEl.removeAttribute("hidden");
  interval = setInterval(beginCountdown, 1000);
}

function beginCountdown() {
  countdown--;
  countdownEl.textContent = countdown;
  if (countdown < 1) {
    stopCountdown();
    computerTurn();
  }
}

function stopCountdown() {
  clearInterval(interval);
  countdownPromptEl.setAttribute("hidden", "");
}

// convert array to string for ease of comparison
function computerTurn() {
  const rdmChoice = Math.floor(Math.random() * options.length);
  computerChoices.push(options[rdmChoice]);
  computerString = computerChoices.join("-");
  animateTimer = setInterval(animateChoices, 1500);
}

// cycle through each computer choice to display in UI
function animateChoices() {
  if (arrPos === computerChoices.length) {
    arrPos = 0;
    resetForPlayer();
    return clearInterval(animateTimer);
  } else {
    const currentMove = computerChoices[arrPos];
    if (currentMove === "coffee") {
      coffeeBtnEl.style.backgroundColor = "green";
      setTimeout(function () {
        coffeeBtnEl.style.backgroundColor = "";
      }, 200);
    }
    if (currentMove === "bagel") {
      bagelBtnEl.style.backgroundColor = "gold";
      setTimeout(function () {
        bagelBtnEl.style.backgroundColor = "";
      }, 200);
    }
    if (currentMove === "pizza") {
      pizzaBtnEl.style.backgroundColor = "red";
      setTimeout(function () {
        pizzaBtnEl.style.backgroundColor = "";
      }, 200);
    }
    if (currentMove === "sushi") {
      sushiBtnEl.style.backgroundColor = "blue";
      setTimeout(function () {
        sushiBtnEl.style.backgroundColor = "";
      }, 200);
    }
    arrPos++;
  }
}

// erase player history and enable button for upcoming choices
function resetForPlayer() {
  playerChoices = [];
  playerString = "";
  gameBtnEls.forEach(function (btn) {
    btn.removeAttribute("disabled");
    btn.addEventListener("click", playerTurn);
  });
}

// return truthy allows player to continue making choices
function playerTurn(event) {
  playerChoices.push(event.target.id);
  playerString = playerChoices.join("-");
  if (
    computerString.startsWith(playerString) &&
    playerString !== computerString
  ) {
    return;
  } else {
    compareChoices();
  }
}

function compareChoices() {
  coffeeBtnEl.setAttribute("disabled", "");
  bagelBtnEl.setAttribute("disabled", "");
  pizzaBtnEl.setAttribute("disabled", "");
  sushiBtnEl.setAttribute("disabled", "");
  if (playerString === computerString) {
    updateScoreboard();
  } else {
    gameOver();
  }
}

// store new high score (if applicable) and remove event listener
function updateScoreboard() {
  score++;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = localStorage.getItem("highScore");
  }
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  gameBtnEls.forEach(function (btn) {
    btn.removeEventListener("click", playerTurn);
  });
  computerTurn();
}

// after half second delay, end game
function gameOver() {
  setTimeout(function () {
    gameBtnEls.forEach(function (btn) {
      btn.removeEventListener("click", playerTurn);
    });
    gameOverEl.removeAttribute("hidden");
    tryAgainBtnEl.removeAttribute("hidden");
    gameboardEl.classList.add("shake");
  }, 500);
}

// propt game restart with resetting of variables and begin countdown
function restartGame() {
  gameOverEl.setAttribute("hidden", "");
  tryAgainBtnEl.setAttribute("hidden", "");
  countdownPromptEl.removeAttribute("hidden");
  gameboardEl.classList.remove("shake");
  computerChoices = [];
  playerChoices = [];
  score = 0;
  countdown = 5;
  interval = setInterval(beginCountdown, 1000);
  render();
}
