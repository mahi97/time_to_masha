const countdownElement = document.getElementById('countdown');
const celebrationElement = document.getElementById('celebration');
const timeElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds')
};

// Set the target date and time here
const targetDate = new Date('2024-08-27T22:32:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        countdownElement.classList.add('hidden');
        celebrationElement.classList.remove('hidden');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((distance % 1000));

    timeElements.days.textContent = String(days).padStart(2, '0');
    timeElements.hours.textContent = String(hours).padStart(2, '0');
    timeElements.minutes.textContent = String(minutes).padStart(2, '0');
    timeElements.seconds.textContent = String(seconds).padStart(2, '0');
    timeElements.milliseconds.textContent = String(milliseconds).padStart(3, '0');
}

setInterval(updateCountdown, 1);
