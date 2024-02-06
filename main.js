let currentPlayer = "X";
const gameBoard = Array(9).fill("");

const board = document.querySelector("#game-board");

function renderBoard() {
  board.innerHTML = gameBoard
    .map((val, idx) => `<div class="cell" data-id ="${idx}">${val}</div>`)
    .join("");
}

function handleCellClick(e) {
  const clickedCell = e.target;
  //   const cellIndex = Array.from(board.children).indexOf(clickedCell);
  const cellIndex = parseInt(e.target.dataset.id);
  if (gameBoard[cellIndex] !== "") return;
  gameBoard[cellIndex] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    alert(`Player ${currentPlayer} wins`);
    resetBoard();
  } else if (!gameBoard.includes("")) {
    alert("it's a draw");
    resetBoard();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}

function resetBoard() {
  currentPlayer = "X";
  gameBoard.fill("");
  renderBoard();
}
board.addEventListener("click", handleCellClick);
renderBoard();
