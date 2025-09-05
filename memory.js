const memoryGrid = document.getElementById("memory-grid");
const matchMessage = document.getElementById("match-message");
const levelInfo = document.getElementById("level-info");
const timerDisplay = document.getElementById("timer");

let timerInterval;
let startTime;
let level = 1;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let totalPairs = 0;

const allSymbols = ['🍎','🍌','🍇','🍉','🍒','🍍','🥝','🍑','🥥','🍓','🍋','🍊','🥭']; 

function startLevel(lvl) {
  memoryGrid.innerHTML = ""; 
  levelInfo.textContent = `Level ${lvl}`;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchesFound = 0;

  totalPairs = Math.min(3 + lvl, 9); 
  let selected = allSymbols.slice(0, totalPairs);
  let symbols = [...selected, ...selected];
  symbols.sort(() => Math.random() - 0.5);

  symbols.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    memoryGrid.appendChild(card);
  });

  adjustGrid(totalPairs);
  startTimer();
}

function adjustGrid(pairs) {
  if (pairs <= 6) memoryGrid.style.gridTemplateColumns = "repeat(4, 120px)";
  else if (pairs <= 9) memoryGrid.style.gridTemplateColumns = "repeat(5, 110px)";
  else memoryGrid.style.gridTemplateColumns = "repeat(6, 100px)";
}

function startTimer() {
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsed}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  return Math.floor((Date.now() - startTime) / 1000);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.innerText = this.dataset.symbol;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    showMatchMessage();
    disableCards();
    matchesFound++;

    if (matchesFound === totalPairs) {
      setTimeout(nextLevel, 1200);
    }
  } else {
    setTimeout(unflipCards, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetCards();
}

function unflipCards() {
  firstCard.innerText = '';
  secondCard.innerText = '';
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  resetCards();
}

function resetCards() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showMatchMessage() {
  matchMessage.textContent = "Matched!";
  matchMessage.classList.add("show");
  setTimeout(() => matchMessage.classList.remove("show"), 800);
}

function nextLevel() {
  const levelTime = stopTimer(); // record time or score

  // Store score for this level
  let memoryScores = JSON.parse(sessionStorage.getItem("memoryScores")) || [];
  memoryScores[level - 1] = levelTime; // store by level index
  sessionStorage.setItem("memoryScores", JSON.stringify(memoryScores));

  if (level < 10) {
    level++;
    matchMessage.textContent = `✅ Level ${level - 1} Complete! Starting Level ${level}...`;
    matchMessage.classList.add("show");
    setTimeout(() => {
      matchMessage.classList.remove("show");
      startLevel(level);
    }, 2000);
  } else {
    matchMessage.textContent = "🎉 Congratulations! You completed all 10 levels!";
    matchMessage.classList.add("show");
  }
}

// Start first level
startLevel(level);
