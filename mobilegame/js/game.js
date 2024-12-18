let gameStartTime = Date.now();
let timerInterval;
let isGameActive = true;
let totalRounds = 0;
let playerPoints = getRandomPoints();
let computer1Points = getRandomPoints();
let computer2Points = getRandomPoints();
let playerScore = 0;
let computer1Score = 0;
let computer2Score = 0;
let consecutiveWins = 0;
let consecutiveLosses = 0;
let isThreePlayerMode = false;

const choices = {
  rock: { static: "../images/rockstatic.gif", gif: "../images/Rock.gif" },
  paper: { static: "../images/paperstatic.gif", gif: "../images/Paper.gif" },
  scissors: { static: "../images/scissorstatic.gif", gif: "../images/Scissor.gif" }
};

// Sound initialization
const backgroundMusic = new Audio('../sounds/background.mp3');
const consecutiveWinSound = new Audio('../sounds/winner.mp3');
const endGameSound = new Audio('../sounds/endgame.mp3');
const gameOverSound = new Audio('../sounds/gameover.mp3');
const highestPointsSound = new Audio('../sounds/highest.mp3');
const consecutiveLossSound = new Audio('../sounds/loss.mp3');

backgroundMusic.volume = 0.4;
backgroundMusic.loop = true;

function playSound(sound) {
  sound.play().catch(err => console.log(`Error playing sound:`, err));
}

document.addEventListener('DOMContentLoaded', function() {
  updatePointsDisplay();
  setupEventListeners();
  checkHighestPoints();
  
  backgroundMusic.play()
    .catch(err => console.log('Error playing background music:', err));
});

function setupEventListeners() {
  document.getElementById("twoPlayerMode").addEventListener("click", () => setGameMode(false));
  document.getElementById("threePlayerMode").addEventListener("click", () => setGameMode(true));
  document.getElementById("endGameButton").addEventListener("click", endGame);
  
  window.addEventListener('beforeunload', () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  });
}

function setGameMode(threePlayer) {
  isThreePlayerMode = threePlayer;
  document.getElementById("twoPlayerMode").classList.toggle("active", !threePlayer);
  document.getElementById("threePlayerMode").classList.toggle("active", threePlayer);
  
  const computer2Elements = document.querySelectorAll("#computer2Container");
  computer2Elements.forEach(el => el.style.display = threePlayer ? "block" : "none");
  
  resetGame();
}

function resetGame() {
  playerPoints = getRandomPoints();
  computer1Points = getRandomPoints();
  computer2Points = getRandomPoints();
  playerScore = computer1Score = computer2Score = 0;
  consecutiveWins = consecutiveLosses = totalRounds = 0;
  gameStartTime = Date.now();
  isGameActive = true;
  updatePointsDisplay();
  document.getElementById("winner").textContent = "Let's Play Janken!";
  checkHighestPoints();
}

function updatePointsDisplay() {
  document.getElementById("userPoints").textContent = `Points: ${playerPoints}`;
  document.getElementById("computer1Points").textContent = `Points: ${computer1Points}`;
  document.getElementById("computer2Points").textContent = `Points: ${computer2Points}`;
  document.querySelector(".player-score").textContent = playerScore;
  document.querySelector(".computer1-score").textContent = computer1Score;
  document.querySelector(".computer2-score").textContent = computer2Score;
  document.getElementById("totalRoundsPlayed").textContent = totalRounds; // Add this line
}

function playGame(userSelection) {
  if (!isGameActive) return;
  
  totalRounds++;
  const computer1Selection = getComputerChoice();
  const computer2Selection = isThreePlayerMode ? getComputerChoice() : null;

  updateImage("userChoice", userSelection, "gif");
  updateImage("computer1Choice", computer1Selection, "gif");
  if (isThreePlayerMode) {
    updateImage("computer2Choice", computer2Selection, "gif");
  }

  setTimeout(() => {
    updateImage("userChoice", userSelection, "static");
    updateImage("computer1Choice", computer1Selection, "static");
    if (isThreePlayerMode) {
      updateImage("computer2Choice", computer2Selection, "static");
    }
  }, 1000);

  setTimeout(() => {
    updateGameState(determineWinner(userSelection, computer1Selection, computer2Selection));
  }, 1800);
}

function determineWinner(user, computer1, computer2) {
  return !isThreePlayerMode ? determineWinnerTwoPlayer(user, computer1) 
                           : determineWinnerThreePlayer(user, computer1, computer2);
}

function determineWinnerTwoPlayer(user, computer) {
  if (user === computer) return "It's a draw!";
  return ((user === "rock" && computer === "scissors") ||
          (user === "paper" && computer === "rock") ||
          (user === "scissors" && computer === "paper")) ? "You win!" : "Robot wins!";
}

function determineWinnerThreePlayer(user, computer1, computer2) {
  const choices = [user, computer1, computer2];
  const uniqueChoices = new Set(choices);

  if (uniqueChoices.size !== 2) return "It's a three-way draw!";

  if ((user === "rock" && computer1 === "scissors" && computer2 === "scissors") ||
      (user === "paper" && computer1 === "rock" && computer2 === "rock") ||
      (user === "scissors" && computer1 === "paper" && computer2 === "paper")) {
    return "You win!";
  }
  
  if ((computer1 === "rock" && user === "scissors" && computer2 === "scissors") ||
      (computer1 === "paper" && user === "rock" && computer2 === "rock") ||
      (computer1 === "scissors" && user === "paper" && computer2 === "paper")) {
    return "Robot wins!";
  }
  
  if ((computer2 === "rock" && user === "scissors" && computer1 === "scissors") ||
      (computer2 === "paper" && user === "rock" && computer1 === "rock") ||
      (computer2 === "scissors" && user === "paper" && computer1 === "paper")) {
    return "CPU wins!";
  }

  return "It's a draw!";
}

function updateGameState(result) {
  if (!isGameActive) return;

  if (result === "You win!") {
    computer1Points -= 10;
    if (isThreePlayerMode) computer2Points -= 10;
    playerScore++;
    consecutiveWins++;
    consecutiveLosses = 0;
    if (consecutiveWins === 3) {
      alert("Congratulations! You have won 3 consecutive rounds!");
      playSound(consecutiveWinSound);
    }
  } else if (result.includes("Robot") || result.includes("CPU")) {
    playerPoints -= 10;
    consecutiveWins = 0;
    consecutiveLosses++;
    
    if (result === "Robot wins!") {
      if (isThreePlayerMode) computer2Points -= 10;
      computer1Score++;
    } else {
      computer1Points -= 10;
      computer2Score++;
    }

    if (consecutiveLosses === 3) playSound(consecutiveLossSound);
  }

  checkHighestPoints();

  if (playerPoints <= 10) {
    alert("Warning! You only have 10 points remaining.");
  }

  if (playerPoints <= 0 || computer1Points <= 0 || (isThreePlayerMode && computer2Points <= 0)) {
    let finalResult = "Game Over! ";
    finalResult += playerPoints > 0 ? "You win the game!" : 
                  computer1Points > 0 ? "Robot wins the game!" : "CPU wins the game!";
    
    document.getElementById("winner").textContent = finalResult;
    if (playerPoints <= 0) playSound(gameOverSound);
    showGameStats();
  } else {
    document.getElementById("winner").textContent = result;
  }

  updatePointsDisplay();
}

function showGameStats() {
  if (!isGameActive) return;
  isGameActive = false;
  
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  
  document.querySelector('.game-container').style.display = 'none';
  document.getElementById('statsScreen').style.display = 'flex';

  const winner = playerPoints > 0 ? "Player wins!" : 
                computer1Points > 0 ? "Robot wins!" : "CPU wins!";

  document.getElementById('gameWinner').textContent = winner;
  document.getElementById('gameDuration').textContent = formatDuration(Math.floor((Date.now() - gameStartTime) / 1000));
  document.getElementById('finalPlayerPoints').textContent = playerPoints;
  document.getElementById('finalRobotPoints').textContent = computer1Points;
  document.getElementById('totalPlayerWins').textContent = playerScore;
  document.getElementById('totalRobotWins').textContent = computer1Score;

  const cpuPointsContainer = document.getElementById('cpuPointsContainer');
  const cpuWinsContainer = document.getElementById('cpuWinsContainer');
  
  if (isThreePlayerMode) {
    cpuPointsContainer.style.display = 'flex';
    cpuWinsContainer.style.display = 'flex';
    document.getElementById('finalCPUPoints').textContent = computer2Points;
    document.getElementById('totalCPUWins').textContent = computer2Score;
  } else {
    cpuPointsContainer.style.display = 'none';
    cpuWinsContainer.style.display = 'none';
  }

  startStatsTimer();
}

function startStatsTimer() {
  let timeLeft = 20;
  const countdownElement = document.getElementById('countdown');
  
  timerInterval = setInterval(() => {
    countdownElement.textContent = --timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      window.location.href = 'feedback.html';
    }
  }, 1000);
}

function checkHighestPoints() {
  if (playerPoints > computer1Points && (!isThreePlayerMode || playerPoints > computer2Points)) {
    playSound(highestPointsSound);
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function updateImage(elementId, choice, type) {
  document.getElementById(elementId).src = choices[choice][type];
}

function endGame() {
  if (!isGameActive) return;
  playSound(endGameSound);
  showGameStats();
}

function getRandomPoints() {
  return Math.floor(Math.random() * 9 + 2) * 10;
}