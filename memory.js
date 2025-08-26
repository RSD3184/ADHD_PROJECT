const memoryGrid = document.getElementById("memory-grid");
const matchMessage = document.getElementById("match-message");
const levelInfo = document.getElementById("level-info");

let level = 1;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let totalPairs = 0;

const allSymbols = ['🍎','🍌','🍇','🍉','🍒','🍍','🥝','🍑','🥥','🍓','🍋','🍊','🥭']; 

function startLevel(lvl) {
  memoryGrid.innerHTML = ""; // clear grid
  levelInfo.textContent = `Level ${lvl}`;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchesFound = 0;

  totalPairs = Math.min(3 + lvl,9); // max 9 pairs(18 cards)
  let selected = allSymbols.slice(0, totalPairs);
  let symbols = [...selected, ...selected]; // duplicate for pairs

  // Shuffle
  symbols.sort(() => Math.random() - 0.5);

  // Create cards
  symbols.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    memoryGrid.appendChild(card);
  });

  adjustGrid(totalPairs);
}

function adjustGrid(pairs) {
  if (pairs <= 6) {
    memoryGrid.style.gridTemplateColumns = "repeat(4, 120px)";
  } else if (pairs <= 9) {
    memoryGrid.style.gridTemplateColumns = "repeat(5, 110px)";
  } else {
    memoryGrid.style.gridTemplateColumns = "repeat(6, 100px)";
  }
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
    // Match
    showMatchMessage();
    disableCards();
    matchesFound++;

    if (matchesFound === totalPairs) {
      setTimeout(nextLevel, 1200);
    }
  } else {
    // Not a match
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
  setTimeout(() => {
    matchMessage.classList.remove("show");
  }, 800);
}

function nextLevel() {
  if (level < 10) {
    level++;
    // show a short encouraging message in your match-message div
    const message = document.getElementById("match-message");
    message.textContent = `✅ Level ${level - 1} Complete! Starting Level ${level}...`;
    message.classList.add("show");

    // hide the message and move to next level after 2 seconds
    setTimeout(() => {
      message.classList.remove("show");
      startLevel(level);
    }, 2000);
  } else {
    const message = document.getElementById("match-message");
    message.textContent = "🎉 Congratulations! You completed all 10 levels!";
    message.classList.add("show");
  }
}

// Start first level
startLevel(level);
