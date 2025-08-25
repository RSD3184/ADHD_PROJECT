const reactionBox = document.getElementById("reaction-box");
const startBtn = document.getElementById("start-btn");
const resultDisplay = document.getElementById("result");
const levelDisplay = document.getElementById("level-display");

let startTime, timeoutId;
let level = 1;

// List of colors with readable names and actual values
const colors = [
  { name: "green", value: "#2ecc71" },
  { name: "blue", value: "#3498db" },
  { name: "purple", value: "#9b59b6" },
  { name: "orange", value: "#e67e22" },
  { name: "red", value: "#e74c3c" },
  { name: "pink", value: "#e91e63" }
];

startBtn.addEventListener("click", startGame);

function startGame() {
  resultDisplay.textContent = "";
  reactionBox.style.backgroundColor = "";
  
  startBtn.disabled = true;

  // If already won, stop the game
  if (level > 10) {
    reactionBox.textContent = " Congratulations! You finished all levels!";
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

    reactionBox.addEventListener("click", handleClick);
  }, randomDelay);
}

function handleClick() {
  if (!startTime) return;

  const reactionTime = (Date.now() - startTime) / 1000;
  resultDisplay.textContent = ` Your reaction time: ${reactionTime.toFixed(3)} seconds`;

  // Level up
  level++;
  levelDisplay.textContent = `Level: ${level}`;

  // If reached level 11, show congrats message
  if (level > 10) {
    reactionBox.textContent = " Congratulations! You finished all levels!";
    reactionBox.style.backgroundColor = "#f1c40f"; // celebratory gold
    startBtn.disabled = true;
    reactionBox.removeEventListener("click", handleClick);
    return;
  }

  resetGame();
}

function resetGame() {
  startTime = null;
  startBtn.disabled = false;
  reactionBox.removeEventListener("click", handleClick);
  reactionBox.textContent = "Click 'Start' to begin again";
  reactionBox.style.backgroundColor = "";
}
