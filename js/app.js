/*jshint esversion: 6 */

// Get the deck element
const deck = document.getElementById('deck');
// Create the cards array
// Array.from() creates an array from the static node list returned by querySelectorAll()
const cards = Array.from(deck.querySelectorAll('.card'));
// The two most recently chosen cards
const openCards = [];
// The matched cards
const matchedCards = [];
// The move counter
let theCounter = 0;

// Shuffle and display the cards on the page
function setup(e) {
    // Prevent page reload, if the user clicks the "play again" button
    e.preventDefault();
    // Remove the show-modal class from the modal
    document.getElementById("play-again-modal").classList.remove("show-modal");
    // Re-order the elements in the cards array
    shuffle(cards);
    // Create a fragment to store our appended list items, thus avoiding reflows
    const fragment = document.createDocumentFragment();
    // Loop through the cards in the newly shuffled cards array and append each card to our fragment.
    for(const card of cards) {
        fragment.appendChild(card);
    }
    // innerHTML overwrites the current list contents
    deck.innerHTML = "";
    // appendChild inserts the fragment
    deck.appendChild(fragment);
    // Clear the clock
    clearClock();
    // Start the clock
    timeIt();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;
    // Randomly swap around the values in the array for as many time as there are values
    while (currentIndex !== 0) {
        // Set a random index number in our range
        randomIndex = Math.floor(Math.random() * currentIndex);
        // Decrement the current index counter
        currentIndex--;
        // Store the value at the current index
        temporaryValue = array[currentIndex];
        // These next two lines switch the places of the value at current index
        // and the value at the random index.
        // Change the value at the current index to the value at the random index
        array[currentIndex] = array[randomIndex];
        // Change the value at the random index to the value at the current index
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/* Flip the cards and see whether they match. If so add them to matched, etc. If not flip them back over. */
function turn(e) {
    // Only a click on a list item is accepted, and only if that card hasn't already been clicked on. We don't want to allow clicks between cards or clicking on the same card more than once in a turn
    if ( e.target.nodeName.toLowerCase() == "li" && !openCards.includes(e.target) && !matchedCards.includes(e.target) ) {
        // If this is your first or second card, do the following. Clicking on a third card does nothing.
        if (openCards.length === 0 || openCards.length === 1) {
            // Flip over the card
            flipUp(e);
            // Add the new card to the openCards array
            addToOpenCards(e);
            // Increase the move counter
            increaseCounter();
            // If this is you second card flip, do the following
            if (openCards.length === 2) {
                // If the cards match
                if (matched()) {
                    // ...then add the match class
                    addMatch();
                    // ... and add these cards to the matched cards array
                    addToMatchedCards();
                } else {
                    // If the card do NOT match, add the no-match class to both cards
                    openCards[0].classList.add("no-match");
                    openCards[1].classList.add("no-match");
                    // Show the cards for a couple of seconds, before flipping them back over
                    setTimeout(flipDown, 2000);
                } 
            }
        }
    }
}

/* Display the card icon */
function flipUp(e) {
    // Add the "show" class to the li, not the i
    e.target.classList.add('show', "open");
}

/* Add the card to the list of "open" cards */
function addToOpenCards(e) {
    openCards.push(e.target);
}

// Increase the move counter each time a card is flipped up
function increaseCounter() {
    theCounter++;
    document.getElementById('moves').textContent = theCounter;
}

// If openCards contains two cards, then get the icon class of the first card and compare it to the icon class of the second card to see whether they match.
// NOTE - they add the match class to the li element. Same for the 'open' and 'show' classes
function matched() {
    // The list of classes on the i tag for both cards (should be fa and fa-whatever)
    const cardOneClasses = openCards[0].firstElementChild.classList;
    const cardTwoClasses = openCards[1].firstElementChild.classList;
    // Then loop to check each class in the first card's class list to determine whether there's a class that begins with fa- and if that same class is also contained in the second card's class list. Using the regular expression means that we don't have to depend on the position of the icon class in the list of classes.
    for (const theClass of cardOneClasses) {
            if ( /fa-.+/.test(theClass) && cardTwoClasses.contains(theClass) ) {
                return true;
            }
    }
}

function addMatch(){
    // Add the match class to the two matching cards, adding the class to the li, not to the i
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
}

function addToMatchedCards() {
    // Add the cards to the matchedCards array
    matchedCards.push(openCards[0], openCards[1]);
    // And remove them from the openCards array. There are only two, so we'll just pop them off one after the other.
    openCards.pop();
    openCards.pop();
    gameOver();
    
}

function flipDown() {
    // If there's no match, flip the cards back over
    openCards[0].classList.remove("show", "no-match", "open");
    openCards[1].classList.remove("show", "no-match", "open");
    // And remove them from the openCards array
    openCards.pop();
    openCards.pop();
}

function gameOver(){
    // If the user has matched all of the cards, do the following
    if (matchedCards.length === 16) {
        // Stop the clock
        stopClock()
        // Show the play again modal
        document.getElementById('play-again-modal').classList.add("show-modal") 
    }
}

// Shuffle the cards and display the board
setup();

// If a card is clicked, "flip" it.
deck.addEventListener("click", turn, false);

// If the game is won or the player hits reset
document.getElementById("reset").addEventListener("click", setup, false);
document.getElementById("play-again").addEventListener("click", setup, false);