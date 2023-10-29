# Pseudocode

Pseudocode outlines the app's logic using plain language. It provides a road map to writing the code itself.

## Step-By-Step Logic

1. The game begins with the computer making it's first choice. This is done by selecting a random index from the game options array (coffee, bagel, pizza, sushi).

2. The player then has to try to repeat the computer's choice by clicking the corresponding, matching button.

3. If the player's turn is equal to the computer's, the player chose correclty and the current level will increase incremently by 1.

4. Check if the current level is greater than the high score using conditional logic. If this is true, set the high score as the current player's mewly-reached level. If this is false, do not change the high score.

5. The process above repeats for each level, with the computer first repeating it's previous turn and then incremently adding 1 new, random choice to their turn.

6. The game ends when the player's turn does not equal the computer's.