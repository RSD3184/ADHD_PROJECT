const memoryGrid = document.getElementById("memory-grid");
const symbols = ['🍎','🍌','🍇','🍉','🍎','🍌','🍇','🍉'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle symbols
symbols.sort(() => 0.5 - Math.random());

// Create cards
symbols.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.innerText = '';
  card.addEventListener('click', flipCard);
  memoryGrid.appendChild(card);
});

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
    // Match!
    showMatchMessage();
    resetCards();
  } else {
    // Not a match
    setTimeout(() => {
      firstCard.innerText = '';
      secondCard.innerText = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showMatchMessage() {
  const msg = document.getElementById("match-message");
  msg.textContent = "Matched!";
  msg.classList.add("show");

  // Hide message after 1 sec
  setTimeout(() => {
    msg.classList.remove("show");
  }, 1000);
}
