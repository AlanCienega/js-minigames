const animeURL = "https://animechan.xyz/api/random";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const hangmanSection = document.getElementById("hangman");
const message = document.getElementById("message");

let gameOver = false;
let hangmanFaults = 0;
let hangmanGoals = 0;
let randomPokemon = "";
let inputClasses = ["bg-zinc-200", "m-2", "w-8", "text-center"];
const hangman = [
  `_______\n|/      |\n|      \n|       \n|       \n|      \n|\n|___`,
  `_______\n|/      |\n|      (_)\n|       \n|       \n|      \n|\n|___`,
  `_______\n|/      |\n|      (_)\n|       |\n|       \n|      \n|\n|___`,
  `_______\n|/      |\n|      (_)\n|      \\|/\n|       \n|      \n|\n|___`,
  `_______\n|/      |\n|      (_)\n|      \\|/\n|       |\n|      \n|\n|___`,
  `_______\n|/      |\n|      (_)\n|      \\|/\n|       |\n|      /\n|\n|___`,
  `_______\n|/      |\n|      (_)\n|      \\|/\n|       |\n|      / \\\n|\n|___`,
];

let buttonClasses = ["rounded", "text-2xl", "m-2", "hover:shadow-xl"];
message.addEventListener("mouseover", handleMouseOver);
message.addEventListener("mouseleave", handleMouseLeave);

function createAlphabet() {
  let alphabet = [];
  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i).toLowerCase());
  }
  return alphabet;
}
function checkGameStatus() {
  if (
    hangmanFaults >= hangman.length - 1 ||
    hangmanGoals >= randomPokemon.name.length
  ) {
    message.classList.remove("hidden");
    message.innerText = "Game over";
    if (hangmanFaults >= hangman.length - 1) {
      message.classList.add(...buttonClasses, "bg-red-700");
    } else {
      message.classList.add(...buttonClasses, "bg-emerald-700");
    }
    return true;
  }
}
function disableKeys() {
  console.log("deshabilitando");
  for (let i = 0; i < keyboard.children.length; i++) {
    const element = keyboard.children[i];
    element.setAttribute("disabled", "");
  }
}
function handleClick(event) {
  let keyPressed = event.target.textContent;
  let inputs = document.getElementsByClassName(keyPressed);
  if (inputs.length) {
    hangmanGoals += inputs.length;
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = keyPressed;
    }
  } else {
    hangmanFaults++;
  }
  gameOver = checkGameStatus();
  if (gameOver) {
    disableKeys();
  }
  drawHangman();
}
function drawHangman() {
  hangmanSection.innerHTML = hangman[hangmanFaults];
}
function handleMouseOver() {
  if (gameOver) {
    message.innerText = "Play again";
  }
}
function handleMouseLeave() {
  if (gameOver) {
    message.innerText = "GameOver";
  }
}
function createKeyboard() {
  let alphabet = createAlphabet();
  alphabet.forEach((key) => {
    let btn = document.createElement("button");
    btn.addEventListener("click", handleClick);
    styledBtn = setButtonClasses(btn, key);
    keyboard.append(styledBtn);
  });
}
async function fetchPokemons() {
  try {
    const response = await fetch(pokemonURL);
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.error("Error:", error);
  }
}
function choosePokemon(pokemons) {
  return pokemons[Math.floor(Math.random() * pokemons.length)];
}
async function drawInputs() {
  const pokemons = await fetchPokemons();
  randomPokemon = choosePokemon(pokemons);
  console.log(randomPokemon);
  createInputs(randomPokemon.name.length);
}

function createInputs(number) {
  for (let i = 0; i < number; i++) {
    let currentInput = document.createElement("input");
    const inputText = createCustomInput(currentInput, i);
    board.append(inputText);
  }
}
function setButtonClasses(element, text) {
  element.classList.add(...buttonClasses, "bg-zinc-300", "w-10", "h-10");
  element.innerText = text;
  return element;
}
function createCustomInput(element, id) {
  element.classList.add(...inputClasses, randomPokemon.name[id]);
  element.id = id;
  element.setAttribute("maxlength", "1");
  element.setAttribute("disabled", "");
  return element;
}
drawInputs();
createKeyboard();
drawHangman();
