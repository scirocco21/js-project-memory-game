let moveCounter = document.getElementById("moves")
let scores;
let openCards = [];
let matches = [];
let moves;

function setGame() {
  let cardList = document.querySelectorAll("li.card");
  let shuffledCards = shuffle(Array.from(cardList));
  document.querySelector("ul.deck").innerHTML = ""
  for (let i = 0; i < shuffledCards.length; i++) {
    document.querySelector("ul.deck").appendChild(shuffledCards[i]);
    cardList[i].className = "card";
    cardList[i].addEventListener("click", clickHandler);
  }
  matches = []
  scores = 3;
  moves = 0;
  moveCounter.textContent = moves
  document.getElementById("sec").innerHTML = 00;
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function addCard(card) {
  openCards.push(card)
}

function removeCards() {
  openCards.splice(-2,2)
}

function hasPriorCard() {
  return openCards.length > 1 ? true : false
}

function handleMatch(card1, card2) {
  card1.classList.add("match")
  card2.classList.add("match")
  card1.removeEventListener("click", clickHandler)
  card2.removeEventListener("click", clickHandler)
  removeCards();
  matches.push(card1, card2)
}

function handleMismatch(card1, card2) {
  removeCards();
  setTimeout(function() {card1.classList.remove("open", "show")}, 1000)
  setTimeout(function() {card2.classList.remove("open", "show")}, 1000)
  card1.addEventListener("click", clickHandler)
  card2.addEventListener("click", clickHandler)
}

function updateScore() {
  if (scores === 3 && moves > 12) {
    scores -= 1
    let starList = document.querySelector("ul.stars")
    starList.removeChild(starList.children[0]);
    let node = document.createElement("li")
    node.className = "fa fa-star-o";
    document.querySelector(".stars").appendChild(node);
  } else if (scores === 2 && moves > 16) {
    scores -= 1
    let starList = document.querySelector("ul.stars")
    starList.removeChild(starList.children[0]);
    let node = document.createElement("li")
    node.className = "fa fa-star-o";
    document.querySelector("ul.stars").appendChild(node);
  }
}

function gameOver() {
  return matches.length === 16 ? true : false;
}

function clickHandler() {
  if (moves === 0) {
    start()
  }
  addCard(this);
  this.classList.add("open", "show");
  this.removeEventListener("click", clickHandler);
  let icon = this.querySelector("i")

  if (hasPriorCard()) {
    let previousCard = openCards[openCards.length - 2];
    if (previousCard.querySelector("i").className === icon.className) {
      handleMatch(this, previousCard)
    } else {
      handleMismatch(this, previousCard)
    }
    moves += 1;
    moveCounter.textContent = moves
    updateScore();

    if (gameOver()) {
      stop()
      setTimeout(openModal, 1000)
    }
  }
}

let modal = document.getElementById("simpleModal");
let againBtn = document.getElementById("repeat");
let closeBtn = document.getElementById("closeBtn");
let restartBtn = document.querySelector("div.restart");

againBtn.addEventListener('click', function(){
  setGame();
  closeModal();
});

restartBtn.addEventListener('click', function(){
  stop();
  setGame();
});

closeBtn.addEventListener('click', closeModal);

function openModal() {
  let message = document.getElementById("message");
  let scores = document.querySelectorAll("ul.stars li i")
  message.append(`<p>Your score was ${scores.length}</p>`)
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none"
  }
}

window.addEventListener("click", clickOutside)

// game timer
let timerInterval = null;
let value;

function start() {
  value = 0;
  stop(); // stoping the previous counting (if any)
  timerInterval = setInterval(changeValue, 1000);
}

function changeValue() {
  value = parseFloat(value)
  document.getElementById("sec").innerHTML = ++value;
}

let stop = function() {
  clearInterval(timerInterval);
}
