# 🗽 SIMON: NYC 🗽 
I choce to build the classic short-term memory game, 'Simon'. I recently moved to New York City, so I have chosen to replace the classic green, red, blue, and yellow colored buttons with some of the city's most notorious indulgences: coffee ☕️, bagels 🥯, pizza 🍕, and sushi 🍣!

## Screenshot(s)
![]
![]
![]
![]

## Technologies Used
- HTML
- CSS
- JavaScript

## Getting Started
In this section include the link to your deployed game and any instructions you deem important.

## Next Steps
Planned future enhancements (icebox items).

Note: Don't underestimate the value of a well crafted README.md. The README.md introduces your project to prospective employers and forms their first impression of your work!

///

## Game Logic


#### The Objective
The goal of the game is to repeat the exact sequence of choices the computer makes. As you progress to the next round, the computer will add on one additional choice to their exisiting sequence.

#### 1. Computer Turn
The game begins with the computer making it's first choice. For example, the computer could select 'pizza'.

#### 2. Player Turn
Next, the player is required to match the computer's choice in order for the game to continue.

#### 3. Correct Guess
If the player correctly repeats the computer's choice, they earn a point and the game continues to the next round.

After each correct guess, the player advances to the next level, and the level count increases by 1.

The computer would then make it's second choice. Each computer turn involves first repeating the exact sequence of their previous choices.

#### 4. Incorrect Guess
If the player guesses incorrectly, the game ends.

#### 5. High Score
The game will display the high score. If the player advances to a level greater than the current high score, the high score value will be updated.