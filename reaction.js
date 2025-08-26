const reactionBox = document.getElementById("reaction-box");
const startBtn = document.getElementById("start-btn");
const resultDisplay = document.getElementById("result");
const levelDisplay = document.getElementById("level-display");

let startTime, timeoutId;
let level = 1;
let isClickable = false;

// List of colors with readable names and actual values
const colors = [
  { name: "green", value: "#2ecc71" },
  { name: "blue", value: "#3498db" },
  { name: "purple", value: "#d56efdff" },
  { name: "orange", value: "#e67e22" },
  { name: "red", value: "#e74c3c" },
  { name: "pink", value: "#ff4483ff" },
  { name: "yellow", value: "#fffc46ff" },
];

startBtn.addEventListener("click", startGame);
reactionBox.addEventListener("click", handleClick);

function startGame() {
  resultDisplay.textContent = "";
  reactionBox.style.backgroundColor = "";
  reactionBox.textContent = "";

  startBtn.disabled = true;
  isClickable = false;

  // If already won, stop the game
  if (level > 10) {
    reactionBox.textContent = "🎉 Congratulations! You finished all levels!";
    reactionBox.style.backgroundColor = "#f1c40f"; // celebratory gold
    startBtn.disabled = true;
    return;
  }

  // Pick a random color for this level
  const chosen = colors[Math.floor(Math.random() * colors.length)];

  // Show message inside the box with the color name
  reactionBox.textContent = `Wait for the box to turn ${chosen.name.toUpperCase()}...`;

  // Random delay before color change
  const randomDelay = Math.floor(Math.random() * 3000) + 2000;

  timeoutId = setTimeout(() => {
    reactionBox.style.backgroundColor = chosen.value;
    reactionBox.textContent = `CLICK! (${chosen.name.toUpperCase()})`;

    startTime = Date.now();
    isClickable = true;
  }, randomDelay);
}

function handleClick() {
  // If player clicks before allowed
  if (!isClickable) {
    clearTimeout(timeoutId);
    reactionBox.textContent = "❌ Too soon! Click 'Start' to try again.";
    resultDisplay.textContent = ""; // clear any previous time
    startBtn.disabled = false;
    return; // don't call resetGame here, so the "too soon" msg stays
  }

  // Valid click
  const reactionTime = (Date.now() - startTime) / 1000;
  resultDisplay.textContent = `✅ Your reaction time: ${reactionTime.toFixed(3)} seconds`;

  // Level up
  level++;
  levelDisplay.textContent = `Level: ${level}`;

  // If reached level 11, show congrats message
  if (level > 10) {
    reactionBox.textContent = "🎉 Congratulations! You finished all levels!";
    reactionBox.style.backgroundColor = "#f1c40f"; // celebratory gold
    startBtn.disabled = true;
    return;
  }

  resetGame();
}

function resetGame() {
  startTime = null;
  isClickable = false;
  startBtn.disabled = false;
  reactionBox.textContent = "Click 'Start' to play next level";
  reactionBox.style.backgroundColor = "";
}
