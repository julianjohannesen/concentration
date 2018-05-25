
const star = document.createElement("li");
star.innerHTML = '<i class="fa fa-star"></i>';
document.getElementById('stars').appendChild(star);

const clock = document.getElementsById("timer");
let seconds = 0, minutes = 0, t;

function updateClock() {
    // Increment seconds
    seconds++;
    // When you reach 1 minute, increment minutes and set seconds back to zero
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    // Now set the clock display
    clock.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    // Finally, call timeIt again
}

// Timer funtion
function timeIt() {
    t = setTimeout(updateClock, 1000);
}

timeIt();

// Stop function
// This will run when all matches are achieved
function stopClock() {
    clearTimeout(t);
}

// Clear function
// This will run on click of "Play Again" or reset
function clearClock() {
    clock.textContent = "00:00";
    seconds = 0; minutes = 0;
}
