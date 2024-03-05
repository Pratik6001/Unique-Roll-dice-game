const player1Element = document.querySelector(".player--0");
const player2Element = document.querySelector(".player--1");
const currentScoreElements = document.querySelectorAll(".sr");
const diceImageElement = document.querySelector(".dice");
const rollDiceButton = document.querySelector(".btn--roll");
const section = document.querySelector(".section");
const winner = document.querySelector(".winner");
const pow = document.querySelector(".power");
const restgame = document.querySelector(".res");
const newgame = document.querySelector(".new");
const playAgainButton = document.querySelector(".play");

const playersc0 = document.querySelector(".player--sc0");
const playersc1 = document.querySelector(".player--sc1");

const audio = new Audio("blaster-2-81267.mp3");
audio.playbackRate = 15;

const fire = document.querySelector(".bullet");
const fire1 = document.querySelector(".bullet1");

diceImageElement.classList.add("hidden");
pow.classList.add("hidden");

function firing(val) {
  if (val === 0) {
    fire.classList.remove("hidden");
    fire1.classList.add("hidden");
  } else {
    fire1.classList.remove("hidden");
    fire.classList.add("hidden");
  }
}
function checkWinner(playerIndex, scoreThreshold) {
  if (
    currentScoreElements[playerIndex].textContent >= scoreThreshold &&
    playerIndex === 0
  ) {
    section.classList.add("hidden");
    winner.classList.remove("hidden");

    const val = parseInt(playersc0.textContent);
    playersc0.textContent = val + 1;
    document.querySelector(".para").textContent = "WINNER";
    document.getElementById("first_img").classList.remove("hidden");
  } else if (
    currentScoreElements[playerIndex].textContent >= scoreThreshold &&
    playerIndex === 1
  ) {
    const val = parseInt(playersc1.textContent);
    playersc1.textContent = val + 1;
    section.classList.add("hidden");
    winner.classList.remove("hidden");
    document.querySelector(".para").textContent = "WINNER";
    document.getElementById("second_img").classList.remove("hidden");
  }
}
function updateCurrentScore(playerIndex, score) {
  currentScoreElements[playerIndex].textContent = score;
}
function updatePlayerTextColor(activePlayerIndex) {
  if (activePlayerIndex === 0) {
    player1Element.style.color = "green"; // Active player 1's text color is green
    player2Element.style.color = "black"; // Inactive player 2's text color is black
  } else {
    player1Element.style.color = "black"; // Inactive player 1's text color is black
    player2Element.style.color = "green"; // Active player 2's text color is green
  }
}

function switchPlayer() {
  player1Element.classList.toggle("player--active");
  player2Element.classList.toggle("player--active");
}
rollDiceButton.addEventListener("click", function () {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceImageElement.classList.remove("hidden");
  diceImageElement.src = `dice-${dice}.png`;

  const activePlayer = player1Element.classList.contains("player--active")
    ? 0
    : 1;

  const currentScoreElement = currentScoreElements[activePlayer];
  const currentScore = parseInt(currentScoreElement.textContent);

  const newScore = currentScore + dice;
  updateCurrentScore(activePlayer, newScore);
  firing(activePlayer);
  audio.play();

  checkWinner(activePlayer, 20);
  checkWinner((activePlayer + 1) % 2, 20);
  switchPlayer();
  updatePlayerTextColor(activePlayer);
});
restgame.addEventListener("click", function () {
  diceImageElement.classList.add("hidden");
  pow.classList.add("hidden");
  currentScoreElements[0].textContent = 0;
  currentScoreElements[1].textContent = 0;
});

newgame.addEventListener("click", function () {
  window.location.reload();
});

playAgainButton.addEventListener("click", function () {
  diceImageElement.classList.add("hidden");
  pow.classList.add("hidden");
  currentScoreElements[0].textContent = 0;
  currentScoreElements[1].textContent = 0;
  player1Element.classList.add("player--active");
  player2Element.classList.remove("player--active");
  player1Element.style.color = "black";
  player2Element.style.color = "black";
  winner.classList.add("hidden");
  section.classList.remove("hidden");
  document.getElementById("first_img").classList.add("hidden");
  document.getElementById("second_img").classList.add("hidden");
});
