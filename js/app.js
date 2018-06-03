/*jshint esversion: 6 */

// Get the deck element
const deck = document.getElementById("deck");
// Create the cards array
// Array.from() creates an array from the static node list returned by querySelectorAll()
const cards = Array.from(deck.querySelectorAll(".card"));
// The two most recently chosen cards
const openCards = [];
// The matched cards
const matchedCards = [];
// The move counter
let moveCounter = 0;
// The clock
const clock = document.getElementById("clock");
// Clock variables
let seconds = 0;
let minutes = 0;
let hundredths = 0;
let t;

// Shuffle and display the cards on the page
function setup(e) {
    // Prevent page reload, if the user clicks the "play again" button
    if (e) {
        e.preventDefault();
    }
    // Remove the show-modal class from the modal
    document.getElementById("play-again-modal").classList.remove("show-modal");

    // Re-order the elements in the cards array
    shuffle(cards);
    // Create a fragment to store our appended list items, thus avoiding reflows
    const fragment = document.createDocumentFragment();
    // Loop through the cards in the newly shuffled cards array and append each card to our fragment.
    for (const card of cards) {
        // Remove all open, show, match classes from cards
        card.classList.remove("no-match", "open", "match");
        // Append the card to the document fragment
        fragment.appendChild(card);
    }
    // innerHTML overwrites the current list contents
    deck.innerHTML = "";
    // appendChild inserts the fragment
    deck.appendChild(fragment);
    // Clear the clock
    clearClock();
    // Start the clock
    startTimeout();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    let currentIndex = array.length,
        temporaryValue, randomIndex;
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
    /* Only a click on a list item is accepted, and only if that card hasn't already been clicked on. We don't want to allow clicks between cards or clicking on the same card more than once in a turn */
    if (e.target.nodeName.toLowerCase() == "li" && !openCards.includes(e.target) && !matchedCards.includes(e.target)) {
        // If this is your first or second card, do the following. Clicking on a third card does nothing.
        if (openCards.length === 0 || openCards.length === 1) {
            // Flip over the card
            flipUp(e);
            // Add the new card to the openCards array
            addToOpenCards(e);
            // Increase the move counter
            increaseCounter();
            // If this is your second card flip, do the following
            if (openCards.length === 2) {
                // If the cards match
                if (matched()) {
                    // ...then add the match class
                    addMatch();
                    // ... and add these cards to the matched cards array
                    addToMatchedCards();
                    // Or, if the cards don't match
                } else {
                    // ... add the no-match class to both cards.
                    openCards[0].classList.add("no-match");
                    openCards[1].classList.add("no-match");
                    // Show the cards for a couple of seconds, before flipping them back over
                    setTimeout(flipDown, 1600);
                }
            }
        }
    }
}

/* Display the card icon */
function flipUp(e) {
    // Add the "show" class to the li, not the i
    e.target.classList.add("open");
}

/* Add the card to the list of "open" cards */
function addToOpenCards(e) {
    openCards.push(e.target);
}

// Increase the move counter each time a card is flipped up
function increaseCounter() {
    moveCounter++;
    document.getElementById("moves").textContent = moveCounter;
}

/* If openCards contains two cards, then get the icon class of the first card and compare it to the icon class of the second card to see whether they match.
NOTE - Add the 'match' 'open' and 'show' classesclass to the li element, not the i element. */
function matched() {
    // The list of classes on the i tag for both cards (should be icon and icon-whatever)
    const cardOneClasses = openCards[0].firstElementChild.classList;
    const cardTwoClasses = openCards[1].firstElementChild.classList;
    /* Then loop to check each class in the first card's class list to determine whether there's a class that begins with 'icon-' and if that same class is also contained in the second card's class list. Using the regular expression means that we don't have to depend on the position of the icon class in the list of classes. */
    for (const theClass of cardOneClasses) {
        if (/icon-.+/.test(theClass) && cardTwoClasses.contains(theClass)) {
            return true;
        }
    }
}

function addMatch() {
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
    console.log(openCards);
    removeClasses(openCards, "no-match", "open");
    
    // openCards[0].classList.remove("no-match", "open");
    // openCards[1].classList.remove("no-match", "open");
    // And remove them from the openCards array
    openCards.pop();
    openCards.pop();
}

function gameOver() {
    // If the user has matched all of the cards, do the following
    if (matchedCards.length === 16) {
        // Stop the clock
        stopClock();
        // Show the play again modal
        document.getElementById("play-again-modal").classList.add("show-modal");
    }
}

/*
 * THE CLOCK
 * Source articles used to create this code:
 *
 * https://codepen.io/cathydutton/
 * https://stackoverflow.com/questions/729921/settimeout-or-setinterval
 * https://johnresig.com/blog/how-javascript-timers-work/
 * https://javascript.info/settimeout-setinterval
 *
 */

function updateClock() {
    // Increment time
    hundredths++;
    /* When you reach 1 second, increment seconds and set hundredths back to zero. when you reach 1 minute, increment minutes and set seconds back to zero. */
    if (hundredths > 99) {
        hundredths = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
    }
        // Now set the clock display
        clock.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + (hundredths > 9 ? hundredths : "0" + hundredths);
        // Call startTimeout again to update the clock to the next second fraction
        startTimeout();
}

// Timer funtion
function startTimeout() {
    // Call updateClock every hundredth of a second, ie every 10 milliseconds
    t = setTimeout(updateClock, 10);
}

// Stop function
function stopClock() {
    // Clear the setTimeout
    clearTimeout(t);
}

// Clear function
function clearClock() {
    // Reset the clock text
    clock.textContent = "00:00:00";
    // Reset the counters
    hundredths = 0;
    seconds = 0;
    minutes = 0;
}

/*
 * HELPERS
 */

// I wanted a function that will remove one or more classes from one or more elements - a node or a node list, so I created a couple of helper functions.
function removeClasses(theElements, ...theClasses) {
    /* Test to see if "theElements" is a single node or a node list. Credit to Tim Pietrusky https://twitter.com/jackrugile/status/435539724774547456. NodeList has a method called item() that node does not. If the type of something.item is undefined, then you're not dealing with a NodeList. */
    if (typeof theElements.item === "undefined") {
        // Iterate over the "theClasses" rest parameter
        for (const theClass of theClasses) {
            // Use classList.remove() to remove each class
            theElements.classList.remove(theClass);
        }
    } else {
        // When dealing with a node list, iterate over each node
        for (const theElement of theElements) {
            // Iterate over the "theClasses" rest parameter
            for (const theClass of theClasses) {
                // Use classList.remove() to remove each class
                theElement.classList.remove(theClass);
            }
        }
    }
}

//Now I need one to add one or more classes to one or more elements
function addClasses(theElements, ...theClasses) {
    /* Test to see if "theElements" is a single node or a node list. Credit to Tim Pietrusky https://twitter.com/jackrugile/status/435539724774547456. NodeList has a method called item() that node does not. If the type of something.item is undefined, then you're not dealing with a NodeList. */
    if (typeof theElements.item === "undefined") {
        // Iterate over the "theClasses" rest parameter
        for (const theClass of theClasses) {
            // Use classList.add() to add each class
            theElements.classList.add(theClass);
        }
    } else {
        // When dealing with a node list, iterate over each node
        for (const theElement of theElements) {
            // Iterate over the "theClasses" rest parameter
            for (const theClass of theClasses) {
                // Use classList.add() to add each class
                theElement.classList.add(theClass);
            }
        }
    }
}

/*
 * FUNCTION CALLS AND LISTENERS
 */

// Shuffle the cards and display the board
setup();

// If a card is clicked, "flip" it.
deck.addEventListener("click", turn, false);

// If the game is won or the player hits reset, then set up a new game
document.getElementById("reset").addEventListener("click", setup, false);
document.getElementById("play-again").addEventListener("click", setup, false);



//const star = document.createElement("li");
//star.innerHTML = '<i class="fa fa-star"></i>';
//document.getElementById('stars').appendChild(star);

