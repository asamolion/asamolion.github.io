(function() {
    "use strict";

    var firstStart = true, // true if the clock is starting
        isPaused = false, // variable to check if the timer is paused or not, true if paused
        timeHeading = "WORK", // heading to be used while pausing and unpausing
        breakFlag = false, // true if the dude is on break else false
        timeInterval, // the reference to setInterval
        stopped = false; // true if the timer has been stopped
    // decrements the value of the DOM element pointed to by the parameter and sets the value
    function decrement(id) {
        var elem = document.getElementById(id),
            value = parseInt(elem.innerHTML, 10);
        value--;
        if (value <= 0) return;
        if (value < 10) value = "0" + value;
        elem.innerHTML = value;
    }
    // does the same thing as decrement but the opposite
    function increment(id) {
        var elem = document.getElementById(id),
            value = parseInt(elem.innerHTML, 10);
        value++;
        if (value <= 0) return;
        if (value < 10) value = "0" + value;
        elem.innerHTML = value;
    }

    /* TIMER FUNCTIONS  */

    // get time remaining as minutes and seconds
    function getTimeRemaining(totalTime) {
        var t = totalTime,
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60);
        return {
            total: t,
            minutes: minutes,
            seconds: seconds
        };
    }

    // update the time-display by the time object given by
    function updateTime(timeObject) {
        document.getElementById("minutes").innerHTML = (
            "0" + timeObject.minutes
        ).slice(-2);
        document.getElementById("seconds").innerHTML = (
            "0" + timeObject.seconds
        ).slice(-2);
    }

    function sessionTimer() {
        var minutes = parseInt(
            document.getElementById("session-display").innerHTML,
            10
        );

        var time = minutes * 60 * 1000; // total number of milliseconds the timer runs

        timeInterval = setInterval(function() {
            if (!isPaused) {
                time -= 1000;
                updateTime(getTimeRemaining(time));
            }
            if (time === 0) {
                stopTimer();
                breakTimer();
            }
        }, 1000);
    }

    function breakTimer() {
        var minutes = parseInt(
            document.getElementById("break-display").innerHTML,
            10
        );

        var time = minutes * 60 * 1000; // total number of milliseconds the timer runs

        timeInterval = setInterval(function() {
            if (!isPaused) {
                time -= 1000;
                updateTime(getTimeRemaining(time));
            }
            if (time === 0) {
                stopTimer();
                sessionTimer();
            }
        }, 1000);
    }

    function pauseTimer() {
        isPaused = true;
    }

    function resumeTimer() {
        isPaused = false;
    }

    function stopTimer() {
        clearInterval(timeInterval);
    }

    /* ADD EVENT HANDLERS */

    // add pause feature on timer click
    document
        .getElementById("time-display")
        .addEventListener("click", function() {
            if (firstStart) {
                firstStart = false;
                sessionTimer();
                return;
            }
            if (isPaused) {
                resumeTimer();
            } else {
                pauseTimer();
            }
        });

    // break plus and minus
    document
        .getElementById("break-minus")
        .addEventListener("click", function() {
            decrement("break-display");
        });
    document.getElementById("break-plus").addEventListener("click", function() {
        if (!breakFlag) {
            increment("break-display");
        }
    });

    // session plus and minus
    document
        .getElementById("session-minus")
        .addEventListener("click", function() {
            if (isPaused || firstStart || stopped) {
                decrement("session-display");
                document.getElementById(
                    "minutes"
                ).innerHTML = document.getElementById(
                    "session-display"
                ).innerHTML;
                document.getElementById("seconds").innerHTML = "00";
                stopTimer();
                isPaused = false;
                firstStart = true;
            }
        });
    document
        .getElementById("session-plus")
        .addEventListener("click", function() {
            if (isPaused || firstStart || stopped) {
                increment("session-display");
                document.getElementById(
                    "minutes"
                ).innerHTML = document.getElementById(
                    "session-display"
                ).innerHTML;
                document.getElementById("seconds").innerHTML = "00";
                stopTimer();
                isPaused = false;
                firstStart = true;
            }
        });
})();
