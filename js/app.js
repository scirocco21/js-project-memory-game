
// const cardTypes = ["paper-plane-o", "diamond", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let cardList = document.querySelectorAll("li.card");
let moveCounter = document.querySelector("span.moves")
let openCards = [];
let matches = [];
let moves;

function setGame() {
  let cardList = document.querySelectorAll("li.card");
  let shuffledDeck = shuffle(Array.from(cardList));
  for (let i = 0; i < cardList.length; i++) {
    cardList[i].querySelector("i").className = shuffledDeck[i].querySelector("i").className
    cardList[i].className = "card"
    cardList[i].addEventListener("click", clickHandler)
  }
  moves = 0;
  moveCounter.textContent = moves
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

function handleMatch() {
  // lock two open cards that match
}

function clickHandler() {
  addCard(this);
  this.classList.add("open", "show");
  let icon = this.querySelector("i")

  if (hasPriorCard()) {
    let previousCard = openCards[openCards.length - 2];
    if (previousCard.querySelector("i").className === icon.className) {
      this.classList.add("match")
      previousCard.classList.add("match")

      this.removeEventListener("click", clickHandler)
      previousCard.removeEventListener("click", clickHandler)

      removeCards();
      matches.push(this, previousCard)
    } else {
      removeCards();
      setTimeout(function() {previousCard.classList.remove("open", "show")}, 1000)
      let card = this
      setTimeout(function() {card.classList.remove("open", "show")}, 1000)
    }
    moves += 1;
    moveCounter.textContent = moves

    // check if game is over
  }


  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */

}
