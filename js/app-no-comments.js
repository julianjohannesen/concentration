/*jshint esversion: 6 */
const deck = document.getElementById("deck");
const cards = Array.from(deck.querySelectorAll(".card"));
const openCards = [];
const matchedCards = [];
let theCounter = 0;
const clock = document.getElementById("clock");
let seconds = 0;
let minutes = 0;
let hundredths = 0;
let t;

function setup(e) {
    if(e){e.preventDefault();}
    document.getElementById("play-again-modal").classList.remove("show-modal");
    shuffle(cards);
    const fragment = document.createDocumentFragment();
    for (const card of cards) {
        card.classList.remove("no-match", "open", "match");
        fragment.appendChild(card);
    }
    deck.innerHTML = "";
    deck.appendChild(fragment);
    clearClock();
    startTimeout();
}

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function turn(e) {
    if (e.target.nodeName.toLowerCase() == "li" && !openCards.includes(e.target) && !matchedCards.includes(e.target)) {
        if (openCards.length === 0 || openCards.length === 1) {
            flipUp(e);
            addToOpenCards(e);
            increaseCounter();
            if (openCards.length === 2) {
                if (matched()) {
                    addMatch();
                    addToMatchedCards();
                } else {
                    openCards[0].classList.add("no-match");
                    openCards[1].classList.add("no-match");
                    setTimeout(flipDown, 1600);
                }
            }
        }
    }
}

function flipUp(e){e.target.classList.add("open");}

function addToOpenCards(e){openCards.push(e.target);}

function increaseCounter() {
    theCounter++;
    document.getElementById("moves").textContent = theCounter;
}

function matched() {
    const cardOneClasses = openCards[0].firstElementChild.classList;
    const cardTwoClasses = openCards[1].firstElementChild.classList;
    for (const theClass of cardOneClasses) {
        if (/fa-.+/.test(theClass) && cardTwoClasses.contains(theClass)) {
            return true;
        }
    }
}

function addMatch() {
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
}

function addToMatchedCards() {
    matchedCards.push(openCards[0], openCards[1]);
    openCards.pop();
    openCards.pop();
    gameOver();

}

function flipDown() {
    openCards[0].classList.remove("no-match", "open");
    openCards[1].classList.remove("no-match", "open");
    openCards.pop();
    openCards.pop();
}

function gameOver() {
    if (matchedCards.length === 16) {
        stopClock();
        document.getElementById("play-again-modal").classList.add("show-modal");
    }
}

function updateClock() {
    hundredths++;
    if (hundredths > 99) {
        hundredths = 0;
        seconds++;
        if (seconds > 59) {
            seconds = 0;
            minutes++;
        }
    }
    clock.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + (hundredths > 99 ? hundredths : "0" + hundredths);
    startTimeout();
}

function startTimeout(){t = setTimeout(updateClock, 10);}

function stopClock(){clearTimeout(t);}

function clearClock() {
    clock.textContent = "00:00:00";
    hundredths = 0;
    seconds = 0;
    minutes = 0;
}

function removeClasses(theElements, ...theClasses) {
    if (typeof theElements.item === "undefined") {
        for (const theClass of theClasses) {
            theElements.classList.remove(theClass);
        }
    } else {
        for (const theElement of theElements) {
            for (const theClass of theClasses) {
                theElement.classList.remove(theClass);
            }
        }
    }
}

function addClasses(theElements, ...theClasses) {
    if (typeof theElements.item === "undefined") {
        for (const theClass of theClasses) {
            theElements.classList.add(theClass);
        }
    } else {
        for (const theElement of theElements) {
            for (const theClass of theClasses) {
                theElement.classList.add(theClass);
            }
        }
    }
}

setup();
deck.addEventListener("click", turn, false);
document.getElementById("reset").addEventListener("click", setup, false);
document.getElementById("play-again").addEventListener("click", setup, false);
