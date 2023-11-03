const cards = document.querySelectorAll(".day-of-dead");
let cardWasFlipped = false;
let lock = false;
let firstCard, secondCard;
let reset = document.getElementById('button');


document.body.onload = shuffle();

function resetTheGame() {
    cards.forEach(card => card.classList.remove('hidden'));
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', cardFlip));
    shuffle();
}
function resetIt() {
    [cardWasFlipped, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}
function cardFlip() {
    this.classList.toggle('flip');

    if(!cardWasFlipped) {
        cardWasFlipped = true;
        firstCard = this;
    } else {
        cardWasFlipped = false;
        secondCard = this;

        // checkForMatch();
    }
}
function checkForMatch() {
    let isMatch = firstCard.data.skull.type === secondCard.data.skull.type;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', cardFlip);
    secondCard.removeEventListener('click', cardFlip);
    resetIt();
}

function unflipCards() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetIt();

    }, 1200);
}


function shuffle() {
    cards.forEach(card => {
        let randNum = Math.floor(Math.random() * 12);
        card.style.order = randNum;
    }
    );
}

cards.forEach(card => card.addEventListener('click', cardFlip));
reset.addEventListener('click', resetTheGame);