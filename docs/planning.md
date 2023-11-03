## Choice of Game
I am choosing to build 'Simon', a short-term memory game. I recently moved to New York City, so I have chosen to replace the classic green, red, blue, and yellow colored buttons with some of the city's most notorious indulgences: coffee, bagels, pizza, and sushi!

## Wireframe
![NYC Simon Wireframe](docs/assets/wireframe.png)

## Pseudocode & Step by Step Logic
### Set Variables and Cache Elements
Identify and store variables for later use.
1. Constant array for game options
2. State variables for computer and player choice arrays, strings (for comparisons), scores, timers etc.
3. Cache elements from HTML for DOM manipulation in browser via JS. For ease of ease, I'll be using querySelector (or querySelectorAll) for element selection, all by '#id' value (reserving class values for CSS styling)

#### Event Listeners
1. Start Game button -> click will begin game
2. Restart Game button -> click will restart game
3. Game choice buttons (coffee, bagel, etc...) -> click will log player choice
    - Note: Disable this listener when it is not the player's turn

### Function Breakdown
(-> indicates function calls another function)
1. init(): on page load, set score to 0, recall high score from local storage (or set to 0 if undefined), -> render()
2. render(): renderScoreboard() & renderCountdown()
3. renderScoreboard(): renders score and high score on page load
4. renderCountdown(): renders countdown to starting point
5. runGame(): begins game when player clicks 'start game' -> beginCountdown()
6. beginCountdown(): runs countdown timer -> stopCountdown() & computerTurn()
7. stopCountdown(): hides countdown
8. computerTurn(): Computer makes a random choice by using random number (via Math.floor & Math.random) as an index for the constant choices array, then push the new choice to the existing computer choices array, convert to string (with join method) since it's a lot easier to compare strings than arrays -> animateChoice
9. animateChoices(): on interval, styles choices based on their position in array, removes style with setTimeout, exits when finished -> resetForPlayer(): clear pre-existing player choices and activate button enabled state and listener for player clicks
10. playerTurn(): player attempts to repeat computer's sequence, on each player click, push to array and convert existing array to string, continue until condition is no longer true -> compareChoices()
- this is sort of a comparison 'before' the main comparison, where we check each existing string addition against the computer's string
11. compareChoices(): disable button states, if player wins -> updateScoreboard(), if player loses -> gameOver()
    - player wins if the strings are equal
    - player loses if the strings are not equal
12. updateScoreboard(): update score (and high score if applicable) and remove choice click listener
13. gameOver(): after half a second, remove choice click listener, present game over message and restart button for player
14. restartGame(): if player chooses to restart with click, remove game over items and return timer, reset key variables to starting point -> beginCountdown() & render()

## User Stories
### As a player, I would like to...
1. First be introduced to brief game instructions.
2. See the computer make their choice.
3. Then make my choice.
4. Know if I'm correct by seeing my score go up, and for the game to continue.
5. Know when I've lost and that game is over.
6. Be able to restart the game if I've lost.
7. Be able to see the high score, and have it update if I beat the existing high score.