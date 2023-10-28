## Choice of Game
I am choosing to build 'Simon', a short-term memory game. I recently moved to New York City, so in the interest of giving the game a bit of personal touch, I have chosen to replace the classic green, red, blue, and yellow colored buttons with some of NYC's most-deletacble treats: pizza, bagels, coffee, and ice cream.

## Wireframe
![NYC Simon Wireframe](./docs/assets/Wireframe%20-%20NYC%20Simon.png)

The text of 'Coffee', 'Bagel', 'Pizza', and 'Ice Cream' are placeholders and will be replaced with icons/images.

## Pseudocode

### Game Logic

#### The Objective
The goal of the game is to repeat the exact sequence of choices the computer makes. As you progress to the next round, the computer will add on one additional choice to their exisiting sequence.

#### 1. Computer Turn
The game begins with the computer (to be renamed?) making it's first choice. For example, the computer could select 'pizza'.

#### 2. Player Turn
Next, the player is prompted to match the computer's choice.

#### 3. Correct Guess
If the player correctly repeats the computer's choices, they earn a point and the game continues to the next round.

After each correct guess, the player advances to the next level, and the level count increases by 1.

The computer would then make it's second choice. Each computer round involves first repeating the exact sequence of their previous choices.

#### 4. Incorrect Guess
If the player guesses incorrectly, the game ends.

#### 5. High Score
The game will display the high score. If the player advances to a level greater than the current high score, the high score value will be updated to the current player's result.




