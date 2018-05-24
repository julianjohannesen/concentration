const matchedCards = [];
let numOfCards = 16;
const openCards = [];
let theCounter = 0;

//while (matchedCards.length < numOfCards) {
    // do the stuff
//}

// If two cards are open and are not matched, don't allow user to open more cards

/* Hide the card icon. If the two flipped cards don't match, then we'll need to flip them back over with this function */
function hideIcon(card) {
    card.firstElementChild.classList.remove('show');
}




function increaseCounter() {
    const star = document.createElement("li");
    star.innerHTML = '<i class="fa fa-star"></i>';
    document.getElementById('stars').appendChild(star);
    theCounter++;
    document.getElementById('moves').textContent = theCounter;
}

