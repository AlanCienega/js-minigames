let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let text_score = document.getElementById("score");
let label_max_score = document.getElementById("max_score");
let body = document.getElementById("body");

let asnwer = document.getElementById("enemy");
localStorage.setItem("max_score", 0);

let moves = ["🪨", "🧻", "✄"];

function handleButtonClick(playerMove) {
  let enemy = Math.floor(Math.random() * 3);
  let enemy_move = moves[enemy];
  let score = parseInt(text_score.textContent.split(":")[1]);

  if (playerMove == enemy) {
    asnwer.innerText = `Enemy = ${enemy_move}, tie`;
  } else if (
    (playerMove == 0 && enemy == 1) ||
    (playerMove == 1 && enemy == 2) ||
    (playerMove == 2 && enemy == 0)
  ) {
    asnwer.innerText = `Enemy = ${enemy_move}, you lose`;
    text_score.innerText = "Score : 0";
  } else {
    asnwer.innerText = `Enemy = ${enemy_move}, you win!`;
    score++;
    text_score.innerText = `Score : ${score}`;
    localStorage.max_score = Math.max(score, parseInt(localStorage.max_score));
    label_max_score.innerText = `Max : ${localStorage.max_score}`;
  }
}

rock.addEventListener("click", () => {
  handleButtonClick(0);
});

paper.addEventListener("click", () => {
  handleButtonClick(1);
});

scissors.addEventListener("click", () => {
  handleButtonClick(2);
});
