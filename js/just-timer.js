const clock = document.getElementById("clock");
let seconds = 0;
let minutes = 0;
let hundredths = 0;
let t;

function updateClock() {
    hundredths++;
    if (hundredths >= 100) {
        hundredths = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
    }
    clock.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + (hundredths > 9 ? hundredths : "0" + hundredths);
    //clock.textContent = `${minutes}:${seconds}:${hundredths}`;
    startTimeout();
}
startTimeout();


function startTimeout(){
    t = setTimeout(updateClock, 10);
}

function stopClock(){clearTimeout(t);}

function clearClock() {
    clock.textContent = "00:00:00";
    hundredths = 0;
    seconds = 0;
    minutes = 0;
}

