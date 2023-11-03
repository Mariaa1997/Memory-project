const cards = document.querySelectorAll(".day-of-dead");
let cardWasFlipped = false;
let lock = false;
let firstCard, secondCard;
let reset = document.getElementById('button');

function reset(){
    cards.forEach(card => card.classList.remove)
}

function cardFlip() {
    if (lock) return;
this.classList.add('flip');

if (!cardWasFlipped){
    cardWasFlipped = true;
    firstCard = this;
    return;
} 

secondCard = this;
cardWasFlipped = false;

checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.skull.type === secondCard.dataset.skull.type){
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click' , cardFlip);
    secondCard.removeEventListener('click' , cardFlip);
}

function unflipCards (){
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // lock = false;
    }, 1500);
    }



    function shuffle(){
        cards.forEach (card => {
            let randNum = Math.floor (Math.random() *12);
            card.style.order = randNum;
        }
            );
    }

cards.forEach(card => card.addEventListener('click' , cardFlip));