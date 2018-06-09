/*jshint esversion: 6 */
(function concentration() {
  "use strict";

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
  let moveCounter = 0,
    seconds = 0,
    minutes = 0,
    hundredths = 0,
    i = 10;
  /* Timers */
  let flipDownTimer, clockTimer, modalTimer, starHandlerTimer;

  /* Setup play, initialize or re-initialize counters, timers, etc. */
  function setup(e) {
    if (e) {
      /* If the user initiated setup by pressing a button or link, prevent the default behavior */
      e.preventDefault();
      /* If the user clicked play on the splashscreen, hide the splash and show the game board */
      if (e.target.id === "play") {
        header.style.display = "none";
        innerContainer.style.display = "block";
      }
    }
    /* If the clicked play on the modal, hide the modal */
    playAgainModal.classList.remove("show-modal");
    /* Shuffle cards */
    shuffle(cards);
    /* Create a fragment to prevent reflows and repaints */
    const fragment = document.createDocumentFragment();
    /* For each card, strip out any classes and append the card to the fragment */
    for (const card of cards) {
      card.classList.remove("no-match", "open", "match");
      fragment.appendChild(card);
    }
    /* Overwrite the deck html with nothing */
    deck.innerHTML = "";
    /* Append the fragment to the deck */
    deck.appendChild(fragment);
    /* Clear the open cards array */
    openCards.splice(0, 2);
    /* Clear the matched cards array */
    matchedCards.splice(0, 16);
    /* Clear the move counter and moves */
    moveCounter = 0;
    moves.textContent = moveCounter;
    /* Reset star counter and show hidden stars */
    i = 10;
    starsLis.forEach(theLi => theLi.firstElementChild.classList.remove("hide"));
    /* Clear all timers */
    stopClock();
    clearClock();
    clearTimeout(modalTimer);
  }

  /* Shuffle the cards in the deck */
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    /* Unitl the counter reaches 0, ... */
    while (currentIndex !== 0) {
      /* Generate a random number in our desired range */
      randomIndex = Math.floor(Math.random() * currentIndex);
      /* Decrement the counter */
      currentIndex--;
      /* Place the element at currentIndex in 'temporaryValue' */
      temporaryValue = array[currentIndex];
      /* Change the element at current index to an element at a randomly selected index */
      array[currentIndex] = array[randomIndex];
      /* Now switch out the element at the randomly selected index for our original element-at-current-index */
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  /* The turn function contains much of the game logic */
  function turn(e) {
    // clearTimeout(flipDownTimer);
    /* If the user clicks on a card that isn't already open or a matched card, then... */
    if (
      e.target.nodeName.toLowerCase() === "li" &&
            !openCards.includes(e.target) &&
            !matchedCards.includes(e.target)
    ) {
      /* If this is a new game, restart the clock and star ratings */
      if (moveCounter === 0) {
        startTimeout();
        updateStarRating();
      }
      /* If there are 0 or 1 cards showing ... */
      if (openCards.length === 0 || openCards.length === 1) {
        /* Flip the card up */
        flipUp(e);
        /* Add the card to the open cards array */
        addToOpenCards(e);
        /* Increase the move counter */
        increaseMoveCounter();
        /* If two cards are showing ... */
        if (openCards.length === 2) {
          /* If they're a match, add the match class and add them to the matched cards array */
          if (matched()) {
            addMatch();
            addToMatchedCards();
          } else {
            /* Otherwise, add the no-match class to the 2 cards and after a second or so, flip them back down again */
            openCards[0].classList.add("no-match");
            openCards[1].classList.add("no-match");
            flipDownTimer = setTimeout(flipDown, 1200);
          }
        }
      }
    }
  }

  /* Flip up a card, when it is clicked on */
  function flipUp(e) {
    e.target.classList.add("open");
  }

  /* Add the flipped card to the open cards array */
  function addToOpenCards(e) {
    openCards.push(e.target);
  }

  /* Increase the move counter */
  function increaseMoveCounter() {
    moveCounter++;
    moves.textContent = moveCounter;
  }

  /* Use a regular expression to check to see if the icon on the previusly flipped card matches the icon on this card and, if so, return true */
  function matched() {
    const cardOneClasses = openCards[0].firstElementChild.classList;
    const cardTwoClasses = openCards[1].firstElementChild.classList;
    for (const theClass of cardOneClasses) {
      if (/icon-.+/.test(theClass) && cardTwoClasses.contains(theClass)) {
        return true;
      }
    }
  }

  /* Add the matched class to matched cards */
  function addMatch() {
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
  }

  /* Add the matched card to the matched cards array */
  function addToMatchedCards() {
    matchedCards.push(openCards[0], openCards[1]);
    /* After they've been added, remove them from the open cards array */
    openCards.pop();
    openCards.pop();
    /* Check to see if the game is over */
    gameOver();
  }

  /* Flip cards back down when they don't match, removing the open and no-match classes and removing them from the open cards array */
  function flipDown() {
    openCards[0].classList.remove("no-match", "open");
    openCards[1].classList.remove("no-match", "open");
    openCards.pop();
    openCards.pop();
  }

  /* If there are 16 cards in the matched cards array, the game is over. Stop the clock and pop up the modal. */
  function gameOver() {
    if (matchedCards.length === 16) {
      stopClock();
      modalTimer = setTimeout(modalSetup, 1500);
      return true;
    }
  }

  /* Update the clock */
  function updateClock() {
    /* This section defines hundredths, seconds and minutes */
    hundredths++;
    if (hundredths > 99) {
      hundredths = 0;
      seconds++;
      if (seconds > 59) {
        seconds = 0;
        minutes++;
      }
    }
    /* This section inserts the count. The long ternary expression is determining whether to add a leading 0 to each part of the 00:00:00 clock */
    clock.textContent =
            (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds) +
            ":" +
            (hundredths > 9 ? hundredths : "0" + hundredths);
    /* Now start counting */
    startTimeout();
  }

  /* The clock timer */
  function startTimeout() {
    clockTimer = setTimeout(updateClock, 10);
  }

  /* Stop the clock and the star rating timer */
  function stopClock() {
    clearTimeout(clockTimer);
    clearInterval(starHandlerTimer);
  }

  /* Reset the clock and reset clock counters */
  function clearClock() {
    clock.textContent = "00:00:00";
    hundredths = 0;
    seconds = 0;
    minutes = 0;
  }

  /* Start the star rating timer */
  function updateStarRating() {
    /* We'll decrement the stars by halfs every 20 seconds */
    starHandlerTimer = setInterval(starHandler, 20000);
  }

  /* The star decrementing function */
  function starHandler() {
    if (i % 2 === 0) {
      /* If the counter is even, then change the star to a half star  by swappin the fa class */
      let theStar = starsLis[i / 2 - 1].firstElementChild;
      theStar.classList.remove("fa-star");
      theStar.classList.add("fa-star-half");
    } else {
      /* If the counter is odd, then change the half star back to a star and hide it */
      let theStar = starsLis[(i + 1) / 2 - 1].firstElementChild;
      theStar.classList.remove("fa-star-half");
      theStar.classList.add("fa-star", "hide");
    }
    /* Decrement the counter. The counter is declared up at the top under VARIABLES */
    i--;
  }

  /* Show the modal with the star rating and time */
  function modalSetup() {
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

  /* Call setup */
  setup();
  /* Add our event listeners for the play button, play again button, and reset */
  deck.addEventListener("click", turn, false);
  reset.addEventListener("click", setup, false);
  playBttn.addEventListener("click", setup, false);
  playAgainBttn.addEventListener("click", setup, false);
})();
