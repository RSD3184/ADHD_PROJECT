let startTime;
let timeoutId;

const reactionBox = document.getElementById("reaction-box");
const startBtn = document.getElementById("start-btn");
const result = document.getElementById("result");

startBtn.addEventListener("click", startGame);

function startGame() {
  result.textContent = "";
  startBtn.disabled = true;
  reactionBox.textContent = "Wait for green...";
  reactionBox.style.backgroundColor = "#e74c3c"; // red

  // Random delay between 2–5 seconds
  const delay = Math.floor(Math.random() * 3000) + 2000;

  timeoutId = setTimeout(() => {
    reactionBox.style.backgroundColor = "#2ecc71"; // green
    reactionBox.textContent = "CLICK!";
    startTime = Date.now();
  }, delay);
}

reactionBox.addEventListener("click", () => {
  if (!startTime) {
    // clicked too early
    clearTimeout(timeoutId);
    reactionBox.textContent = "Too soon! Try again.";
    reactionBox.style.backgroundColor = "#f39c12"; // yellow
    startBtn.disabled = false;
  } else {
    // valid click
    const reactionTime = Date.now() - startTime;
    result.textContent = `Your reaction time: ${reactionTime} ms`;
    reactionBox.textContent = "Click 'Start' to try again!";
    reactionBox.style.backgroundColor = "#ffb84d"; // yellow reset
    startTime = null;
    startBtn.disabled = false;
  }
});
