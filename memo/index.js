let board = document.getElementById("board");
let tries = document.getElementById("tries");
let cards = ["♡", "☻", "☼", "♤", "⚈", "⚐", "⚑", "⚒", "✣", "⚙", "⚛", "☠"];
let unsorted = [];
let flippedCards = [];
let flippedCardsCounter = 0;
let level = 0;
let checked_cards = 0;
level = 2;
/* do {
  level = prompt(
    "Elije dificultad, numero de cartas a descubir (numero mayor a 1)"
  );
} while (level < 2);
*/
tries.textContent = cards.length * level;

function unsortCards(items) {
  for (let i = 1; i <= parseInt(level); i++) {
    let items_copy = [...items];
    while (items_copy.length) {
      let random_position = Math.floor(Math.random() * items_copy.length);
      let random_item = items_copy.splice(random_position, 1);
      unsorted.push(...random_item);
    }
  }
}

function flipCard(card_id) {
  let card = document.getElementById(card_id);
  card.style.color = "black";
  card.setAttribute("disabled", "");
  flippedCards.push(card);
}
function resetStylesToFlippedCards() {
  flippedCards.forEach((flippedCard) => {
    flippedCard = document.getElementById(flippedCard.id);
    flippedCard.style.color = "#e2e8f0";
    flippedCard.removeAttribute("disabled");
  });
}

function checkCards() {
  // remove flipped cards with status ok
  checked_cards += 2;
  flippedCards.forEach((element) => {
    let myCard = document.getElementById(element.id);
    myCard.style.display = "";
    myCard.classList.add("bg-green-500");
  });
  if (checked_cards >= cards.length * 2) {
    setTimeout(() => {
      alert("You Win");
      location.reload();
    }, 500);
  }
}
function handleFlipCard(event) {
  flipCard(event.target.id);
  flippedCardsCounter++;
  // almacenar cartas volteadas mientras sea menor al nivel
  if (flippedCardsCounter <= level) {
    // ahora si es igual el nivel al numero de elementos volteados comparamos si son iguales
    if (flippedCardsCounter == level) {
      let resultFlipped = flippedCards.map((element) => element.textContent);
      let resultFlippedSet = new Set([...resultFlipped]);
      if (resultFlippedSet.size == 1) {
        setTimeout(() => {
          checkCards();
          flippedCardsCounter = 0;
          flippedCards = [];
        }, 500);
      } else {
        setTimeout(() => {
          resetStylesToFlippedCards();
          flippedCardsCounter = 0;
          flippedCards = [];
          tries.textContent = parseInt(tries.textContent) - 1;
          if (parseInt(tries.textContent) < 1) {
            alert("ya valio");
            location.reload();
          }
        }, 500);
      }
    }
  } else {
    // si aun no han volteado todas las cartas disponibles, entonces voltearlas
    flipCard(event.target.id);
  }
}

function printCards() {
  unsorted.forEach((element) => {
    // crear texto
    txt = document.createTextNode(element);
    // crear boton con su id y evento
    btn = document.createElement("button");
    btn.classList.add(
      "shadow-lg",
      "hover:bg-blue-700",
      "h-20",
      "text-5xl",
      "bg-slate-200",
      "hover:shadow-purple-700",
      "m-3",
      "rounded-md"
    );
    // btn.id = crypto.randomUUID();
    btn.id = Math.floor(Math.random() * 100000);
    btn.addEventListener("click", handleFlipCard);
    btn.appendChild(txt);
    board.appendChild(btn);
  });
}

unsortCards(cards);
printCards();
