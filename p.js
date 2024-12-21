const confettiCanvas = document.getElementById("confettiCanvas");
const fireworksCanvas = document.getElementById("fireworksCanvas");
const birthdaySong = document.getElementById("birthdaySong");

const confettiCtx = confettiCanvas.getContext("2d");
const fireworksCtx = fireworksCanvas.getContext("2d");

confettiCanvas.width = fireworksCanvas.width = window.innerWidth;
confettiCanvas.height = fireworksCanvas.height = window.innerHeight;

let confetti = [];
let fireworks = [];
const colors = ["#ff5722", "#ffcc00", "#4caf50", "#2196f3", "#e91e63"];

// Confetti
function createConfetti() {
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 6 + 2,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
        });
    }
}

function drawConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach((piece, index) => {
        confettiCtx.beginPath();
        confettiCtx.arc(piece.x, piece.y, piece.size, 0, 2 * Math.PI);
        confettiCtx.fillStyle = piece.color;
        confettiCtx.fill();

        piece.x += piece.speedX;
        piece.y += piece.speedY;

        if (piece.y > confettiCanvas.height) {
            confetti.splice(index, 1);
        }
    });
    requestAnimationFrame(drawConfetti);
}

// Fireworks
function createFirework(x, y) {
    for (let i = 0; i < 50; i++) {
        fireworks.push({
            x,
            y,
            size: Math.random() * 4 + 2,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 - 2,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
        });
    }
}

function drawFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworks.forEach((particle, index) => {
        fireworksCtx.beginPath();
        fireworksCtx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        fireworksCtx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
        fireworksCtx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.alpha -= 0.02;

        if (particle.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(drawFireworks);
}

// Hex to RGB conversion
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

// Event Listener
document.getElementById("celebrate-btn").addEventListener("click", () => {
    // Play the birthday song
    birthdaySong.play();

    // Trigger confetti and fireworks
    confetti = [];
    createConfetti();
    drawConfetti();

    setInterval(() => {
        createFirework(
            Math.random() * fireworksCanvas.width,
            Math.random() * fireworksCanvas.height / 2
        );
    }, 500);
    drawFireworks();
});
