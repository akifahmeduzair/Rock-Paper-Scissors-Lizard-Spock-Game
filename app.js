// Game choices
const choices = ["rock", "paper", "scissors", "lizard", "spock"];

// Initial scores
let playerScore = 0;
let computerScore = 0;

// DOM elements
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const resultTextElement = document.querySelector(".result");
const restartButton = document.querySelector(".restart-btn");

// Add event listeners to choices
document.querySelectorAll(".choice").forEach((choice) => {
  choice.addEventListener("click", play);
});

// Restart game event listener
restartButton.addEventListener("click", restartGame);

// Play function when user makes a choice
function play(e) {
    const playerChoice = e.target.closest(".choice").dataset.choice;
    const computerChoice = getComputerChoice();
  
    const winner = getWinner(playerChoice, computerChoice);
  
    showResult(playerChoice, computerChoice, winner);
  }
  

// Get random computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Determine the winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "draw";
    } else if (
      (playerChoice === "rock" && (computerChoice === "scissors" || computerChoice === "lizard")) ||
      (playerChoice === "paper" && (computerChoice === "rock" || computerChoice === "spock")) ||
      (playerChoice === "scissors" && (computerChoice === "paper" || computerChoice === "lizard")) ||
      (playerChoice === "lizard" && (computerChoice === "paper" || computerChoice === "spock")) ||
      (playerChoice === "spock" && (computerChoice === "rock" || computerChoice === "scissors"))
    ) {
      return "player";
    } else {
      return "computer";
    }
  }
  
// Show the result
function showResult(playerChoice, computerChoice, winner) {
  if (winner === "player") {
    playerScore++;
    playerScoreElement.textContent = playerScore;
    resultTextElement.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. You win!`;
  } else if (winner === "computer") {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    resultTextElement.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. Computer wins!`;
  } else {
    resultTextElement.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. It's a draw!`;
  }

  // Check if game is over
  if (playerScore === 5 || computerScore === 5) {
    endGame();
  }
}

// End the game
function endGame() {
  document.querySelectorAll(".choice").forEach((choice) => {
    choice.removeEventListener("click", play);
  });

  restartButton.style.display = "block";
}

// Restart the game
function restartGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  resultTextElement.textContent = "Make your move!";

  document.querySelectorAll(".choice").forEach((choice) => {
    choice.addEventListener("click", play);
  });

  restartButton.style.display = "none";
}
