// Functions
import { getBingoNumbers } from "./js/getBingoNumbers";

//  Components
import "./components/BingoCard";

const numbers = getBingoNumbers();
const newNumber = document.querySelector(".number");
let hasWinner = false;

newNumber.addEventListener("click", () => {
  if (numbers.length !== 0 && !hasWinner) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers[randomIndex];

    const history = document.querySelector(".history");
    const playersCards = document.querySelectorAll("bingo-card");

    newNumber.textContent = randomNumber;
    const cellNumberHistory = document.createElement("div");
    cellNumberHistory.textContent = randomNumber;
    history.appendChild(cellNumberHistory);

    const playerHasNumber = playersCards[0].numbers.findIndex(element => element === randomNumber);
    const cpuHasNumber = playersCards[1].numbers.findIndex(element => element === randomNumber);

    if (playerHasNumber !== -1) {
      playersCards[0].checkCell(randomNumber, playerHasNumber);
    }

    if (cpuHasNumber !== -1) {
      playersCards[1].checkCell(randomNumber, cpuHasNumber);
    }

    if (playersCards[0].numbers.length === 0 && playersCards[1].numbers.length === 0) {
      setWinner("Empate");
    } else if (playersCards[0].numbers.length === 0) {
      setWinner("Player Wins");
    } else if (playersCards[1].numbers.length === 0) {
      setWinner("CPU Wins");
    }

    numbers.splice(randomIndex, 1);
  }
});

const setWinner = (quote) => {
  newNumber.textContent = quote;
  hasWinner = true;
};
