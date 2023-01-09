"use strict";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const playerScore0 = document.getElementById("score--0");
const playerScore1 = document.getElementById("score--1");
const playerCurrentScore0 = document.getElementById("current--0");
const playerCurrentScore1 = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

dice.classList.add("hidden");
let scores, currentScore, activePlayer, playing;

function init() {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  playerCurrentScore0.textContent = 0;
  playerCurrentScore1.textContent = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  playing = true;
  playerScore0.textContent = 0;
  playerScore1.textContent = 0;
  dice.classList.add("hidden");
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    dice.classList.remove("hidden");
    const randomNr = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${randomNr}.png`;

    if (randomNr !== 1) {
      currentScore += randomNr;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
