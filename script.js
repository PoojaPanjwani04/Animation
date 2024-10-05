// Selecting DOM elements
const startButton = document.getElementById('start-button');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let gameInterval;
let moveInterval;

// Function to start the game
function startGame() {
    // Reset score and timer
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    // Show the ball
    ball.style.display = 'block';

    // Start moving the ball every 1 second
    moveBall();
    moveInterval = setInterval(moveBall, 1000);

    // Start the timer countdown
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Hide the start button during the game
    startButton.disabled = true;
    startButton.style.opacity = 0.5;
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(moveInterval);
    ball.style.display = 'none';
    alert(`Game Over! Your Score: ${score}`);
    startButton.disabled = false;
    startButton.style.opacity = 1;
}

// Function to move the ball to a random position within the container
function moveBall() {
    const container = document.querySelector('.game-container');
    const containerRect = container.getBoundingClientRect();

    const ballSize = ball.offsetWidth;
    const maxLeft = container.clientWidth - ballSize;
    const maxTop = container.clientHeight - ballSize - 100; // Adjust for header and controls

    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop) + 50; // +50 to avoid overlapping with header

    ball.style.left = `${randomLeft}px`;
    ball.style.top = `${randomTop}px`;
}

// Function to handle ball clicks
function catchBall() {
    score++;
    scoreDisplay.textContent = score;
    moveBall(); // Move the ball immediately after a successful catch
}

// Event Listeners
startButton.addEventListener('click', startGame);
ball.addEventListener('click', catchBall);
