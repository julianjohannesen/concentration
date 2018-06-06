/*jshint esversion: 6 */
/*
* VARIABLES 
*/
/* DOM elements */
const header = document.querySelector("header");
const playBttn = document.querySelector(".play");
const innerContainer = document.querySelector(".inner-container");
const starsUl = document.getElementById("stars");
const starsLis = document.getElementsByClassName("stars")[0].childNodes;
const moves = document.getElementById("moves");
const clock = document.getElementById("clock");
const reset = document.getElementById("reset");
const playAgainModal = document.getElementById("modal");
const playAgainBttn = document.getElementById("play-again");
const deck = document.getElementById("deck");
const cards = Array.from(deck.querySelectorAll(".card"));
/* Arrays */
const openCards = [];
const matchedCards = [];
/* Counters */
let moveCounter = 0, seconds = 0, minutes = 0,  hundredths = 0; i = 10;
/* Timers */
let flipDownTimer, clockTimer, modalTimer, starHandlerTimer;

function setup(e) {
    if(e){
        e.preventDefault();
        if(e.target.id == "play"){
            header.style.display = "none";
            innerContainer.style.display = "block";
        }
    }
    
    playAgainModal.classList.remove("show-modal");
    shuffle(cards);
    const fragment = document.createDocumentFragment();
    for (const card of cards) {
        card.classList.remove("no-match", "open", "match");
        fragment.appendChild(card);
    }
    /* Overwrite the deck html with nothing */
    deck.innerHTML = "";
    /* Append the fragment to the deck */
    deck.appendChild(fragment);
    /* Clear the open cards array */
    openCards.splice(0,2);
    /* Clear the matched cards array */
    matchedCards.splice(0,16);
    /* Clear the move counter and moves */
    moveCounter = 0
    moves.textContent = moveCounter;
    /* Show hidden stars */
    starsLis.forEach( theLi => theLi.firstElementChild.classList.remove("hide"));
    /* Clear all timers */
    stopClock();
    clearClock();
    clearTimeout(modalTimer);
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
        if (moveCounter === 0) {
            startTimeout();
            starRating();
        }
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
                    const flipDownTimer = setTimeout(flipDown, 1600);
                }
            }
        }
    }
}

function flipUp(e){e.target.classList.add("open");}

function addToOpenCards(e){openCards.push(e.target);}

function increaseCounter() {
    moveCounter++;
    moves.textContent = moveCounter;
}

function matched() {
    const cardOneClasses = openCards[0].firstElementChild.classList;
    const cardTwoClasses = openCards[1].firstElementChild.classList;
    for (const theClass of cardOneClasses) {
        if (/icon-.+/.test(theClass) && cardTwoClasses.contains(theClass)) {
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
        modalTimer = setTimeout(modalSetup, 1500);
        return true;
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
    clock.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + (hundredths > 9 ? hundredths : "0" + hundredths);
    startTimeout();
}

function startTimeout(){clockTimer = setTimeout(updateClock, 10);}

function stopClock(){
    clearTimeout(clockTimer);
    clearInterval(starHandlerTimer);
}

function clearClock() {
    clock.textContent = "00:00:00";
    hundredths = 0;
    seconds = 0;
    minutes = 0;
}

function starRating () {
    starHandlerTimer = setInterval(starHandler, 2000);
}

function starHandler() { 
    if (i % 2 === 0) {
        let theStar = starsLis[(i/2) - 1].firstElementChild;
        theStar.classList.remove("fa-star");
        theStar.classList.add("fa-star-half");
    } else {
        let theStar = starsLis[((i+1)/2) - 1].firstElementChild;
        theStar.classList.remove("fa-star-half");
        theStar.classList.add("fa-star", "hide");
    }
    i--;
}

function modalSetup () {
    const modalRating = document.getElementById("modalRating");
    const modalTime = document.getElementById("modalTime");
    modalRating.textContent = "Your star rating is: ";
    modalTime.textContent = "Your time is: ";
    const clnStarsUl = starsUl.cloneNode(true);
    const clnClock = clock.cloneNode(true);
    modalRating.appendChild(clnStarsUl);
    modalTime.appendChild(clnClock);
    playAgainModal.classList.add("show-modal");
}

setup();
deck.addEventListener("click", turn, false);
reset.addEventListener("click", setup, false);
playBttn.addEventListener("click", setup, false);
playAgainBttn.addEventListener("click", setup, false);
