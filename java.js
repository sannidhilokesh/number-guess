const input = document.querySelector("#guess");
const btn = document.querySelector("#btn");
const pvs = document.querySelector("#previous");
const rem = document.querySelector("#remaining");
const result = document.querySelector("#result");

const popup = document.querySelector("#popup");
const popupMsg = document.querySelector("#popup-message");
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");

const generateNumber = () => Math.floor(Math.random() * 100) + 1;

let randomnumber = generateNumber();
let prevGuess = [];
let remaining = 10;
let gameOver = false;

const resetGame = () => {
  randomnumber = generateNumber();
  prevGuess = [];
  remaining = 10;
  gameOver = false;

  result.innerHTML = "Guess a Number";
  pvs.innerHTML = "Previous guesses:";
  rem.innerHTML = "Guesses remaining: 10";

  input.value = "";
  btn.disabled = false;
};

const showPopup = (message) => {
  popupMsg.innerHTML = message;
  popup.style.display = "flex";
};

yesBtn.addEventListener("click", () => {
  popup.style.display = "none";
  resetGame();
});

noBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (gameOver) return;

  const guess = Number(input.value);

  if (!input.value || isNaN(guess) || guess < 1 || guess > 100) {
    alert("Enter valid number (1-100)");
    return;
  }

  if (guess === randomnumber) {
    result.innerHTML = ` Correct! Number was ${randomnumber}`;
    gameOver = true;
    btn.disabled = true;

    showPopup(" You Won! Play Again?");
    return;
  }

  remaining--;
  prevGuess.push(guess);

  result.innerHTML = ` Wrong guess: ${guess}`;
  pvs.innerHTML = `Previous guesses: ${prevGuess.join(", ")}`;
  rem.innerHTML = `Guesses remaining: ${remaining}`;

  if (remaining === 0) {
    result.innerHTML = ` Game Over! Number was ${randomnumber}`;
    gameOver = true;
    btn.disabled = true;

    showPopup("Game Over! Play Again?");
  }

  input.value = "";
});
