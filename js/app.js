// Get the deck element
const deck = document.getElementById('deck');
// Create the cards array
// Array.from() creates an array from the static node list returned by querySelectorAll()
const cards = Array.from(deck.querySelectorAll('.card'));
// The two most recently chosen cards
const openCards = [];

// Shuffle and display the cards on the page
function setup() {

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

/* Flip the card */
function flip(event) {
    if (openCards.length < 2) {
        displayIcon(event);
        addToOpen(event);
    }
}

/* Display the card icon */
function displayIcon(event) {
    event.target.classList.add('show');
}

/* Add the card to the list of "open" cards */
function addToOpen(event) {
    openCards.push(event.target.parentElement);
}

// If the icon of card just added to the openCards list, matches the icon of a card already on the list, then add class 'match' etc.
// NOTE - they add the match class to the li element. Same for the 'open' and 'show' classes
function match() {
    const cardOneClasses = openCards[0].firstElementChild.classList;
    const cardTwoClasses = openCards[1].firstElementChild.classList;
    let theIcon = "";
    // Is there more than one card in openCards?
    if (openCards.length > 1) {
        // This loop determines whether there's a class in the most recently opened  card's class list that begins with fa-. It will store that class in the theIcon variable. This way we don't have to depend on the position of the icon class in the list of classes.
        for (const theClass of classesArray) {
            //Test the regular expression to see if it matches the current class in the loop
            //If it does, then assign that class to theIcon.  This && expression is a shorthand way of wrting an if statement.
            /fa-.+/.test(theClass) && (theIcon = theClass);
        }
        // Loop through the cards in openCards and if a card contains theIcon, then add the match class
        for (const card of openCards) {
            if (card.classList.contains(theIcon)) {
                card.classList.toggle("match");
                break;
            }
        }
    }
}

// Shuffle the cards and display the board
setup();
/* If a card is clicked, "flip" it. */
deck.addEventListener("click", flip, false);
