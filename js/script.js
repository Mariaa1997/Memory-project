const cards = document.querySelectorAll(".day-of-dead");
let popup = document.getElementById('popup');
let cardWasFlipped = false;
let lock = false;
let firstCard, secondCard;
let reset = document.getElementById('button');
let secondsRemaining = 45;
let totalCardsFlipped = 0;
let isGameOver = false;
let isMatching = false;


document.body.onload = shuffle();
let timer = setInterval(countdown, 1000);

function countdown() {
    document.querySelector('.seconds').innerHTML = `${':'}${secondsRemaining}`;
    if (secondsRemaining > 0) {
        secondsRemaining--;
    } else { 
        if (!isGameOver) {
            popup.classList.toggle('active');
            document.querySelector('.game-over').innerHTML = 'Time Is Up. Game Over...';
            isGameOver = true;
        }
    }
}
function toggle() {
    popup.classList.toggle('active');
}
function resetTheGame() {
    cards.forEach(card => card.classList.remove('hidden'));
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', cardFlip));
    secondsRemaining = 45;
    totalCardsFlipped = 0;
    isMatching = false;
    isGameOver = false;
    if (popup.classList.contains('active')) popup.classList.toggle('active');
    document.querySelector('.game-over').style.color = 'red';
    shuffle();
}
function resetIt() {
    [cardWasFlipped, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
    checkIfGameIsOver();
    isMatching = false;
}
function checkIfGameIsOver() {
    if (totalCardsFlipped === 12) { 
        isGameOver = true;
        didUserWin = true;
        popup.classList.toggle('active');
        document.querySelector('.game-over').style.color = 'green';
        document.querySelector('.game-over').innerHTML = 'WINNER!!!';
    }
}
function cardFlip() {
    if (!isMatching) { 
        this.classList.toggle('flip');
        if (!cardWasFlipped) {
            cardWasFlipped = true;
            firstCard = this;
        } else {
            if (this.getAttribute('id') !== firstCard.getAttribute('id')) { 
                isMatching = true;
                cardWasFlipped = false;
                secondCard = this;
                checkForMatch();
            } else {
                cardWasFlipped = false;
                firstCard = null;
            }
        }
    }
}
function checkForMatch() {
    let isMatch = firstCard.getAttribute('data-skull-type') === secondCard.getAttribute('data-skull-type');
    if (isMatch) { 
        totalCardsFlipped += 2;
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', cardFlip);
    secondCard.removeEventListener('click', cardFlip);
    resetIt();
}

function unflipCards() {
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