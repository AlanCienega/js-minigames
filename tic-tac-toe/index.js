const board = document.getElementById("board");
const info = document.getElementById("info");
const btn_reload = document.getElementById("playAgain");
//                    x         o
const players = ["&#10539;", "&#8413;"];
let currentMove = Math.floor(Math.random() * players.length);
let moves = [];
let xWins = false;
let oWins = false;
let gameOver = false;
const cellClasses = [
  "h-32",
  "bg-white",
  "hover:bg-neutral-300",
  "justify-center",
  "items-center",
  "text-5xl",
  "text-cyan-400",
  "font-bold",
];
info.innerHTML = `Plays ${players[currentMove]}`;
const winnerMoves = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
btn_reload.addEventListener("mouseover", handleMouseOver);
btn_reload.addEventListener("mouseleave", handleMouseLeave);

function handleMouseOver() {
  btn_reload.innerText = "Play Again";
}
function handleMouseLeave() {
  btn_reload.innerText = "Game Over";
}
function drawBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.addEventListener("click", move);
    cell.classList.add(...cellClasses, "flex");
    cell.id = i;
    board.append(cell);
  }
}

function move(event) {
  const player = document.getElementById(event.target.id);
  if (player.textContent || gameOver) {
    return;
  }
  player.innerHTML = players[currentMove];
  moves.push({ position: event.target.id, player: currentMove });

  currentMove = currentMove === 1 ? 0 : 1;
  gameOver = isGameOver();
  if (gameOver) {
    if (xWins) {
      info.innerHTML = `${players[0]} wins`;
    } else if (oWins) {
      info.innerHTML = `${players[1]} wins`;
    } else {
      info.innerText = "Draw";
    }
    btn_reload.classList.remove("hidden");
  } else {
    info.innerHTML = `Plays ${players[currentMove]}`;
  }
}

function hasWinnerMoves(array) {
  let result = false;
  for (let i = 0; i < winnerMoves.length; i++) {
    const element = winnerMoves[i];
    const a = element[0];
    const b = element[1];
    const c = element[2];
    if (array.includes(a) && array.includes(b) && array.includes(c)) {
      result = true;
    }
  }
  return result;
}
function isGameOver() {
  let playerXmoves = moves.filter((element) => element.player == 0);
  let playerXpositions = playerXmoves.map((move) => parseInt(move.position));
  let playerOmoves = moves.filter((element) => element.player == 1);
  let playerOpositions = playerOmoves.map((move) => parseInt(move.position));

  xWins = hasWinnerMoves(playerXpositions);
  oWins = hasWinnerMoves(playerOpositions);

  let no_missing_moves = playerOmoves.length + playerXmoves.length >= 9;
  return xWins || oWins || no_missing_moves;
}
drawBoard();
