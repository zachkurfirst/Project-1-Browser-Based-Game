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
  highScore = localStorage.getItem("highScore");
  if (highScore === undefined) {
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

// runGame -> when player clicks 'start game' OR 'try again' button
function runGame() {
  instructionsEl.setAttribute("hidden", "");
  startGameBtnEl.setAttribute("hidden", "");
  countdownPromptEl.removeAttribute("hidden");
  interval = setInterval(beginCountdown, 1000);
}

function beginCountdown() {
  countdown--;
  countdownEl.textContent = countdown;
  console.log(countdown);
  if (countdown < 1) {
    stopCountdown();
    computerTurn();
  }
}

function stopCountdown() {
  clearInterval(interval);
  countdownPromptEl.setAttribute("hidden", "");
}

function computerTurn() {
  const rdmChoice = Math.floor(Math.random() * options.length);
  computerChoices.push(options[rdmChoice]);
  computerString = computerChoices.join("-"); // -> turn computerChoices array into a string
  console.log("computer choice string: ", computerString);
  animateTimer = setInterval(animateChoices, 1500);
}

function animateChoices() {
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

// resetForPlayer -> at end of each computer turn, erase player history and active button event listener
function resetForPlayer() {
  playerChoices = [];
  playerString = "";
  gameBtnEls.forEach(function (btn) {
    btn.removeAttribute("disabled");
    btn.addEventListener("click", playerTurn);
  });
}

// playerTurn -> start with logging the name of the option on click
function playerTurn(event) {
  playerChoices.push(event.target.id);
  console.log("player choice array: ", playerChoices);
  playerString = playerChoices.join("-");
  console.log("player choice string: ", playerString);

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

// updateScoreboard -> advance to next level, update high score (if applicable)
function updateScoreboard() {
  score++;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = localStorage.getItem("highScore");
    console.log(localStorage, highScore);
  }
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  gameBtnEls.forEach(function (btn) {
    btn.removeEventListener("click", playerTurn);
  });
  computerTurn();
}

// gameOver -> string comparison check is false and player loses
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

//restartGame -> player clicks 'try again' button
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
