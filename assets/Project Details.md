
# Sniper Browser Game

## Choice of Game:

- **Name**: Sniper Browser Game

- **Summary**: The user will simulate being on a firing range and will be given a target's distance and the wind speed and direction at the target (all generated randomly). It is then up to the user to input elevation (up) and windage (left and right) adjustments based on the given information to successfully shoot a round and hit the target. 
 
- **Parameters** A user will be given 10 targets and will be allowed 2 shots on each target. A user will also be given 15 rounds total. To win the game, a user will have to successfully hit at least 7 out of 10 targets.

## Pseudocode

1. Declare variables (objects) for the target information to include distance, wind speeds, and wind directions with the correct user inputs to hit target

or

1. Declare variables for the possible target distances, wind speeds, and wind directions as random numbers

1. Declare other variables such as ammunition remaining, targets remaining, shot history, shots on target, targets hit (current score),

1. Create HTML elements

    - 2 input boxes for user to add elevation and windage
    - 3 display boxes to show the user the target data
    - 1 display box to show remaining ammuniton
    - 1 box to show history of previous target engagements

1. Create all catched references

1. Add an event listener for the "fire" button

1. Declare a render function to display if target was a "hit" or "miss' and then set the screen up for the next shot

1. Set up ```handleShot()``` which will check the user's input against the correct inputs to hit the target.

    - if correct, it will ```render()```

    - if a miss, 2 display boxes will tell the user if they were high/low and right/left of the target

    - ```handleShot()``` will also be tracking ammunition and previous traget data?

    - if no targets remaining, will check shot history

    - If 7/10 or more = winner
    - Else, you lose







