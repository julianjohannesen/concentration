Notes

#Functions:#
- setup
- shuffle
- turn
- flipUp
- addToOpenCards
- flipDown
- gameOver
- updateClock
- startTimeout
- stopClock
- clearClock
- starRating
- starHandler
- modalSetup


#Listeners#
- deck click listener
- reset click listener
- play button click listener
- play again button click listener

#Timers#
- flipDownTimer
- clockTimer
- starHandlerTimer
- modalTimer

#PROBLEMS:#
- gameOver calls stopClock and that's a problem, because clicking reset doesn't run gameOver
- DONE: Add contrast background to score panel
- DONE: Should stars be going up or down?
- DONE: re-read rubric
- add flash animation to red no-match
- The clock and star timers don't exactly match up. That's fixable.
- I haven't cleared all of my timers! There's still the flipdown timer
- Add a design to the back of the cards
- Document the code
- Don't immediately show the match on matched cards, add some sort of cool effect
- Add a modal for when a player times out - that is, the stars are reduced to zero