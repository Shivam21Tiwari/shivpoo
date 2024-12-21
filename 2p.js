document.getElementById('envelope').addEventListener('click', function () {
    this.classList.toggle('open');
});

// Handle Yes and No button clicks
document.getElementById('Yes-button').addEventListener('click', function () {
    playAudio('yesAudio');
    showEmoji('😊', 'You said YES! 🥳');
});

document.getElementById('No-button').addEventListener('click', function () {
    playAudio('noAudio');
    showEmoji('😢', 'You said NO... 💔');
});

// Function to display the emoji and message
function showEmoji(emoji, message) {
    const emojiContainer = document.getElementById('emoji-container');
    emojiContainer.innerHTML = `<div>${emoji}</div><p>${message}</p>`;
    emojiContainer.classList.add('show');
}

// Function to play the audio
function playAudio(audioId) {
    const yesAudio = document.getElementById('yesAudio');
    const noAudio = document.getElementById('noAudio');

    // Stop any playing audio before starting a new one
    yesAudio.pause();
    yesAudio.currentTime = 0;
    noAudio.pause();
    noAudio.currentTime = 0;

    // Play the selected audio
    const selectedAudio = document.getElementById(audioId);
    selectedAudio.play();
}
