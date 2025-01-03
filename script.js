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
let startDate = new Date(Date.UTC(2025, 0, 3, 23, 30, 0)).getTime(); // 1st August 2024, 00:00:00 KST -> 31st July 2024, 15:00:00 UTC
let targetDate = new Date(Date.UTC(2025, 0, 12, 01, 30, 0)).getTime(); // 4th September 2024, 00:00:00 KST -> 3rd September 2024, 15:00:00 UTC
let speed = 1;
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

    const days = Math.floor(distance / (1000 * 60 * 60 * 24 / speed));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24 / speed)) / (1000 * 60 * 60 / speed));
    const minutes = Math.floor((distance % (1000 * 60 * 60 / speed)) / (1000 * 60 / speed));
    const seconds = Math.floor((distance % (1000 * 60 / speed)) / (1000 / speed));

    timeElements.days.textContent = String(days).padStart(0, '0');
    timeElements.hours.textContent = String(hours).padStart(0, '0');
    timeElements.minutes.textContent = String(minutes).padStart(0, '0');
    timeElements.seconds.textContent = String(seconds).padStart(0, '0');

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
        'imgs/007.jpg',
        'imgs/008.jpg',
        'imgs/009.jpg',
        'imgs/010.jpg',
        'imgs/011.jpg',
        'imgs/012.jpg',
        'imgs/013.jpg',
        'imgs/014.jpg',
        'imgs/015.jpg',
    ];

    const imageElement = document.createElement('img');
    new_id = Math.floor(Math.random() * images.length);
    while (new_id == src_id) new_id = Math.floor(Math.random() * images.length);
    src_id = new_id;
    imageElement.src = images[src_id];
    imageElement.classList.add('background-image');

    // Calculate safe areas for image placement
    const safeVerticalTop = 0; // 15% down from the top to avoid the header and text
    const safeVerticalBottom = 30; // 85% down to avoid the countdown
    const safeHorizontalLeft = 20; // 10% from the left to avoid left border
    const safeHorizontalRight = 80; // 90% from the left to avoid right border
    const safeSecondVerticalBottom = 100;
    const safeSecondVecticalTop = 70;
    // Position the image avoiding the center area and edges
    const verticalPosition = Math.random() * (safeVerticalBottom - safeVerticalTop) + safeVerticalTop;
    const horizontalPosition = Math.random() * (safeHorizontalRight - safeHorizontalLeft) + safeHorizontalLeft;
    const verticalPosition2 = Math.random() * (safeSecondVecticalTop - safeSecondVerticalBottom) + safeSecondVerticalBottom;

    const up_or_down = Math.random() > 0.5;
    
    if (up_or_down) {
        imageElement.style.top = `${verticalPosition}%`;
    } else {
        imageElement.style.top = `${verticalPosition2}%`;
    }
    imageElement.style.left = `${horizontalPosition}%`;

    // Apply random rotation between -45 and 45 degrees
    const rotation = Math.random() * 90 - 45;
    imageElement.style.transform = `rotate(${rotation}deg)`;

    backgroundContainer.appendChild(imageElement);

    // Remove the image after animation
    setTimeout(() => {
        backgroundContainer.removeChild(imageElement);
    }, 6000); // Match with the duration of fadeInOut animation
}

// Call `addBackgroundImage` at random intervals
setInterval(addBackgroundImage, 3000); // Adjust the frequency as needed

setInterval(updateCountdown, 1);
