const countdownElement = document.getElementById('countdown');
const textElement = document.getElementById('main-message');
const lineElement = document.getElementById('iline');
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
const backgroundContainer = document.getElementById('background-images-container');

// Convert KST to UTC
let startDate = new Date(Date.UTC(2024, 6, 29, 22, 30, 0)).getTime(); // 1st August 2024, 00:00:00 KST -> 31st July 2024, 15:00:00 UTC
let targetDate = new Date(Date.UTC(2024, 8, 4, 7, 0, 0)).getTime(); // 4th September 2024, 00:00:00 KST -> 3rd September 2024, 15:00:00 UTC

let flag = true;
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const totalDistance = targetDate - startDate;
    const passedDistance = totalDistance - distance;
    const progressPercentage = (passedDistance / totalDistance) * 100;
    const progressPosition = (progressPercentage / 2); // Each side progresses at half the speed

    if (distance <= 0) {
        countdownElement.classList.add('hidden');
        textElement.classList.add('hidden');
        lineElement.classList.add('hidden');
        celebrationElement.classList.remove('hidden');
        generateConfetti();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeElements.days.textContent = String(days).padStart(2, '0');
    timeElements.hours.textContent = String(hours).padStart(2, '0');
    timeElements.minutes.textContent = String(minutes).padStart(2, '0');
    timeElements.seconds.textContent = String(seconds).padStart(2, '0');

    leftProgress.style.width = `calc(${progressPosition}% - 20px)`;
    rightProgress.style.width = `calc(${progressPosition}% - 20px)`;

    boyImage.style.left = `calc(${progressPosition}% - 70px)`; // Adjust for image size
    girlImage.style.right = `calc(${progressPosition}% - 70px)`; // Adjust for image size
}

function generateConfetti() {
    const colors = ['#ff69b4', '#ffd700', '#4dd2ff', '#ff6347', '#8a2be2', '#32cd32'];
    const numberOfConfetti = 100;
    if (flag) {
        for (let i = 0; i < numberOfConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 50 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 5 + 5) + 's';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.querySelector('.confetti-container').appendChild(confetti);
        }
        flag = false;
    }
}

let src_id = 0;
function addBackgroundImage() {
    const images = [
        'imgs/001.jpg',
        'imgs/002.jpg',
        'imgs/003.jpg',
        'imgs/004.jpg',
        'imgs/005.jpg',
        'imgs/006.jpg',
    ];

    const imageElement = document.createElement('img');
    new_id = Math.floor(Math.random() * images.length);
    while (new_id == src_id) new_id = Math.floor(Math.random() * images.length);
    src_id = new_id;
    imageElement.src = images[src_id];
    imageElement.classList.add('background-image');

    // Position the image primarily on the sides
    const isLeftSide = Math.random() > 0.5;
    const verticalPosition = Math.random() * 80 + 10; // Between 10% and 90% vertically
    const horizontalPosition = isLeftSide ? Math.random() * 10 + 5 : Math.random() * 10 + 85; // Left 5-15% or Right 85-95%

    imageElement.style.top = `${verticalPosition}%`;
    imageElement.style.left = `${horizontalPosition}%`;

    // Apply random rotation between -45 and 45 degrees
    const rotation = Math.random() * 90 - 45;
    imageElement.style.transform = `rotate(${rotation}deg)`;

    backgroundContainer.appendChild(imageElement);

    // Remove the image after animation
    setTimeout(() => {
        backgroundContainer.removeChild(imageElement);
    }, 10000); // Match with the duration of fadeInOut animation
}

// Call `addBackgroundImage` at random intervals
setInterval(addBackgroundImage, 5000); // Adjust the frequency as needed

setInterval(updateCountdown, 100);
