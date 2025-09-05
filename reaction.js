const reactionBox = document.getElementById("reaction-box");
const startBtn = document.getElementById("start-btn");
const resultDisplay = document.getElementById("result");
const levelDisplay = document.getElementById("level-display");

let startTime, timeoutId;
let level = 1;
let isClickable = false;

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

  if (level > 10) {
    reactionBox.textContent = "🎉 Reaction game completed!";
    reactionBox.style.backgroundColor = "#f1c40f";
    startBtn.disabled = true;
    return;
  }

  const chosen = colors[Math.floor(Math.random() * colors.length)];
  reactionBox.textContent = `Wait for the box to turn ${chosen.name.toUpperCase()}...`;
  const randomDelay = Math.floor(Math.random() * 3000) + 2000;

  timeoutId = setTimeout(() => {
    reactionBox.style.backgroundColor = chosen.value;
    reactionBox.textContent = `CLICK! (${chosen.name.toUpperCase()})`;
    startTime = Date.now();
    isClickable = true;
  }, randomDelay);
}

function handleClick() {
  if (!isClickable) {
    clearTimeout(timeoutId);
    reactionBox.textContent = "❌ Too soon! Click 'Start' to try again.";
    resultDisplay.textContent = "";
    startBtn.disabled = false;
    return;
  }

  const reactionTime = (Date.now() - startTime) / 1000;
  resultDisplay.textContent = `✅ Reaction time: ${reactionTime.toFixed(3)}s`;

  storeReactionTime(reactionTime);

  level++;
  levelDisplay.textContent = `Level: ${level}`;

  if (level > 10) {
    reactionBox.textContent = "🎉 Reaction game completed!";
    reactionBox.style.backgroundColor = "#f1c40f";
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

function storeReactionTime(time) {
  let reactionTimes = JSON.parse(sessionStorage.getItem("reactionTimes")) || [];
  reactionTimes[level - 1] = time.toFixed(3); // store at correct level index
  sessionStorage.setItem("reactionTimes", JSON.stringify(reactionTimes));
}
