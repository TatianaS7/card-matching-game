//DEFINE CARD OBJECTS WITH NUMERIC KEYS AND CORRESPONDING VALUES
let cards = {
        0: "Red",
        1: "Green",
        2: "Purple",
        3: "Red",
        4: "Green",
        5: "Purple"
}; 



//SHUFFLE CARDS
let newOrder = []; //Initalize array to store shuffled values

function shuffleCards(cards) {
    let keys = Object.keys(cards); //Get array of keys from cards object

    keys.sort(() => Math.random() - 0.5); //Shuffle keys using sort method
    
    //Iterate through shuffled keys
    keys.forEach(key => {
        newOrder.push(cards[key]); //Push corresponding value to array
    });

    return newOrder;
};

console.log(shuffleCards(cards));




//POPULATE GRID WITH CARDS
const cardsDiv = document.querySelector('#card-grid');

function reorderCardsOnPage() {
    cardsDiv.innerHTML = '';

    //Itereate through array and output card buttons
    newOrder.forEach((card, index) => {
        cardsDiv.innerHTML += `
        <button class="card-buttons" style="background-color: ${card}; min-width: 2in; min-height: 3in;" value="${index}" name="${index}" id="${index}">${card}</button>`;
    });

    //Add event listener to each button
    document.querySelectorAll('.card-buttons').forEach(button => {
        button.addEventListener('click', selectCard);
    })
};





//SELECT CARDS 
const matchResultDiv = document.querySelector("#match-result");
const scoreDiv = document.querySelector("#score");

let score = 0;
let card1 = null;

function selectCard(event) {
    const clickedCard = event.target;
    clickedCard.disabled = true; //Prevent reclicking button

    if (!card1) {
        card1 = clickedCard;
    } else {
        const card2 = clickedCard;
        compareCards(card1, card2);
        card1 = null;
    }
};




//MATCH CARDS AND KEEP SCORE
function compareCards(card1, card2) {
    if (newOrder[card1.value] === newOrder[card2.value]) {
        matchResultDiv.style.display = "block";
        matchResultDiv.innerHTML = "MATCH";
        score += 3;
    } else {
        matchResultDiv.style.display = "block";
        matchResultDiv.innerHTML = "NOT A MATCH";
        score += 0;
        // Re-enable the cards after a short delay
        setTimeout(() => {
            card1.disabled = false;
            card2.disabled = false;
        }, 500);
    }
    scoreDiv.innerHTML = score;
    setTimeout(() => {
        matchResultDiv.style.display = "none";
    }, 700);
}

// Call shuffleCards to initialize newOrder array and populate the grid
shuffleCards(cards);
reorderCardsOnPage();




//START GAME OVER 
const startOverBtn = document.querySelector('#start-over-button');

startOverBtn.addEventListener('click', function() {
    newOrder = [];
    score = 0;
    scoreDiv.innerHTML = score;
    shuffleCards(cards);
    reorderCardsOnPage();
});