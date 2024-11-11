document.getElementById("startButton").addEventListener("click", startCountdown);

function startCountdown() {
    const targetDateInput = document.getElementById("targetDate").value;
    if (!targetDateInput) {
        alert("Please select a target date and time.");
        return;
    }

    const targetDate = new Date(targetDateInput).getTime();
    const countdownContainer = document.getElementById("countdownContainer");

    // Create a new countdown element
    const countdownElement = document.createElement("div");
    countdownElement.className = "countdown";

    const timeDisplay = document.createElement("p");
    timeDisplay.className = "time";
    countdownElement.appendChild(timeDisplay);

    const message = document.createElement("p");
    message.className = "message";
    countdownElement.appendChild(message);

    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop Alarm";
    stopButton.style.display = "none";
    stopButton.addEventListener("click", stopAlarm);
    countdownElement.appendChild(stopButton);

    countdownContainer.appendChild(countdownElement);

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            timeDisplay.textContent = "00d 00h 00m 00s";
            message.textContent = "Time's up!";
            playAlarm();
            stopButton.style.display = "inline";
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        timeDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function playAlarm() {
    const alarmSound = document.getElementById("alarmSound");
    alarmSound.play();
}

function stopAlarm() {
    const alarmSound = document.getElementById("alarmSound");
    alarmSound.pause();
    alarmSound.currentTime = 0;
    this.style.display = "none"; // Hide the stop button after stopping the alarm
}
