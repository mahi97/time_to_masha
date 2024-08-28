const countdownElement = document.getElementById('countdown');
const celebrationElement = document.getElementById('celebration');
const timeElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds')
};
const leftProgress = document.getElementById('left-progress');
const rightProgress = document.getElementById('right-progress');
const boyImage = document.getElementById('boy');
const girlImage = document.getElementById('girl');

const startDate = new Date('2024-08-01T00:00:00').getTime();
const targetDate = new Date('2024-09-04T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const totalDistance = targetDate - startDate;
    const passedDistance = totalDistance - distance;
    const progressPercentage = (passedDistance / totalDistance) * 100;
    const progressPosition = (progressPercentage / 2); // Each side progresses at half the speed

    if (distance <= 0) {
        countdownElement.classList.add('hidden');
        celebrationElement.classList.remove('hidden');
        generateConfetti();
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

    leftProgress.style.width = `${progressPosition}%`;
    rightProgress.style.width = `${progressPosition}%`;

    boyImage.style.left = `calc(${progressPosition}% - 50px)`; // Adjust for image size
    girlImage.style.right = `calc(${progressPosition}% - 50px)`; // Adjust for image size
}

function generateConfetti() {
    const colors = ['#ff69b4', '#ffd700', '#4dd2ff', '#ff6347', '#8a2be2', '#32cd32'];
    const numberOfConfetti = 100;

    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.querySelector('.confetti-container').appendChild(confetti);
    }
}

setInterval(updateCountdown, 1);
