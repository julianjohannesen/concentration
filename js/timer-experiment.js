const clock = document.getElementById("clock");
const starsLis = document.getElementsByClassName("stars")[0].childNodes;
let seconds = 0,
  minutes = 0,
  hundredths = 0,
  i = 10,
  j = 0;
// let clockAndStarRatingTimer = setTimeout(clockAndStarRatingHandler, 100);

(function clockAndStarRatingHandler() {
  j++;
  updateClock();
  updateStarRating();
  setTimeout(clockAndStarRatingHandler, 10);
  console.log(j);
})();

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
}

function updateStarRating() {
  if (j % 200 === 0) {
    if (i % 2 === 0) {
      let theStar = starsLis[(i / 2) - 1].firstElementChild;
      console.log(theStar);
      theStar.classList.remove("fa-star");
      theStar.classList.add("fa-star-half");
    } else {
      let theStar = starsLis[((i + 1) / 2) - 1].firstElementChild;
      console.log(theStar);
      theStar.classList.remove("fas", "fa-star-half");
      theStar.classList.add("far", "fa-star");
    }
    i--;
  }
}