'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  });
}

const startBtn = select('.start-btn');
const guessCounter = select('.guess-counter');
const guessInput = select('.guess-input');
const display = select('.display');

listen('click', startBtn, () => {
  guessCounter.classList.remove('hidden');
  guessInput.classList.remove('hidden');
  display.classList.remove('hidden');
  startBtn.classList.add('hidden');
  guessInput.focus();

  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let guessCount = 0;

  display.textContent = '';
  guessCounter.textContent = `Guesses: ${guessCount}`;

  listen('keydown', guessInput, (event) => {
    if (event.key === 'Enter') {
      const guess = parseInt(guessInput.value);

      if (isNaN(guess) || guess < 1 || guess > 100) {
        display.textContent = 'Please enter a number between 1 and 100';
        return;
      }

      guessCount++;
      guessCounter.textContent = `Guesses: ${guessCount}`;
      guessInput.value = '';

      if (guess === randomNumber) {
        display.textContent = `Congratulations!`;
        setTimeout(() => {
          startBtn.classList.remove('hidden');
          display.textContent = '';
          guessCounter.textContent = '';
          guessInput.value = '';
        }, 3000);
      } else if (guess < randomNumber) {
        display.textContent = '';
        sleep(200).then(() => display.textContent = 'Higher');
      } else {
        display.textContent = '';
        sleep(200).then(() => display.textContent = 'Lower');
      }
    }
  });
});
