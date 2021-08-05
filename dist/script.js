'use strict';

//selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  //1.Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  diceEl.style.visibility = `visible`;

  //2.Display dice
  diceEl.classList.remove(`hidden`);
  diceEl.src = `photos/dice-${dice}.png`;

  //3.Check for rolled 1
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to nexct player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
  }
});

btnHold.addEventListener(`click`, function () {
  // 1. Add current score to active player's score
  document.getElementById(`score--${activePlayer}`).textContent =
    currentScore +
    +document.getElementById(`score--${activePlayer}`).textContent;

  // 2.Check if player's score is >= 100
  if (+document.getElementById(`score--${activePlayer}`).textContent >= 100) {
    player0El.classList.add(`winner`);
    player1El.classList.add(`winner`);
  }

  //Switch to the next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
});

btnNew.addEventListener(`click`, function () {
  // 1.reset all the scores to 0
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  // 2.going back to player 1
  activePlayer = activePlayer === 1 ? 0 : 0;
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  // 3.remove the dice
  diceEl.style.visibility = `hidden`;
  // 4.reset the backroundColor to normal
  player1El.classList.remove(`winner`);
  player0El.classList.remove(`winner`);
});
