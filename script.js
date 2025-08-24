function startGame(game) {
  if (game === "Memory") {
    // Redirect to memory game page
    window.location.href = "memory.html";
  } else {
    alert("The " + game + " game is coming soon!");
  }
}
