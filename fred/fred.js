let board = document.getElementById("board");
let body = document.getElementsByTagName("body");
let info = document.getElementById("info");
const btnGameOver = document.getElementById("btnGameOver");
let buttons = [];
let level = 1;
let random_sequence = [];
let current_move = 0;
let sequence_index = 0;
let visible_time = 400;
let isGameOver = false;
let background_colors = [
  "bg-red-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-emerald-600",
  "bg-lime-600",
  "bg-rose-600",
  "bg-blue-600",
  "bg-pink-600",
  "bg-sky-600",
];

function getBgClass(element) {
  let classList = element.classList;
  let className = "";
  for (let i = 0; i < classList.length; i++) {
    let current_class = classList[i];
    if (current_class.includes("bg-")) {
      className = current_class;
    }
  }
  return className;
}
function changeColor(button_id) {
  let current_button = document.getElementById(button_id);
  current_button.setAttribute("disabled", "");
  let btnBgClass = getBgClass(current_button);
  current_button.classList.remove(btnBgClass);
  let lighterClass = btnBgClass.split("-")[1];
  current_button.classList.add(`bg-${lighterClass}-300`);
  setTimeout(() => {
    current_button.classList.remove(`bg-${lighterClass}-300`);
    current_button.classList.add(btnBgClass);
    current_button.removeAttribute("disabled");
  }, visible_time);
}

function HandleClick(event) {
  if (isGameOver) return;
  changeColor(event.target.id);
  current_move++;
  if (current_move == level) {
    if (random_sequence[current_move - 1].id == event.target.id) {
      addRandomElement();
      setTimeout(() => {
        level++;
        info.innerText = `Nivel ${level}`;
        sequence_index = 0;
        current_move = 0;
        illuminateSequence();
      }, visible_time);
    } else {
      sequence_index = 0;
      current_move = 0;
      level = 0;
      random_sequence = [];
      isGameOver = true;
      btnGameOver.classList.remove("hidden");
    }
  } else {
    if (random_sequence[current_move - 1].id != event.target.id) {
      sequence_index = 0;
      current_move = 0;
      level = 0;
      random_sequence = [];
      isGameOver = true;
      btnGameOver.classList.remove("hidden");
    }
  }
}

function addRandomElement() {
  let random_position = Math.floor(Math.random() * buttons.length);
  random_sequence.push(buttons[random_position]);
}

function illuminateSequence() {
  changeColor(random_sequence[sequence_index].id);
  sequence_index++;
  if (sequence_index < random_sequence.length) {
    setTimeout(illuminateSequence, visible_time + 100);
  }
}

function createButtons() {
  for (let i = 0; i < 9; i++) {
    let btn = document.createElement("button");

    btn.id = Math.floor(Math.random() * 1000);
    btn.addEventListener("click", HandleClick);
    btn.classList.add(
      "shadow-lg",
      "h-32",
      "hover:shadow-purple-700",
      "m-2",
      "rounded-md",
      `${background_colors[i]}`
    );
    board.appendChild(btn);
    buttons.push(btn);
  }
}

createButtons();
setTimeout(function () {
  info.innerText = `Nivel 1`;
  addRandomElement();
  illuminateSequence();
}, 1500);
