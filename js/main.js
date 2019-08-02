/*----- constants -----*/ 
const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
/*----- app's state (variables) -----*/ 
let winner;

/*----- cached element references -----*/ 
let deck = [];
let cardEls = [];

const boardEls = {
    pile: document.getElementById('pile'),
    draw: document.getElementById('draw'),
    ace1: document.getElementById('ace1'),
    ace2: document.getElementById('ace2'),
    ace3: document.getElementById('ace3'),
    ace4: document.getElementById('ace4'),
    stack1: document.getElementById('stack1'),
    stack2: document.getElementById('stack2'),
    stack3: document.getElementById('stack3'),
    stack4: document.getElementById('stack4'),
    stack5: document.getElementById('stack5'),
    stack6: document.getElementById('stack6'),
    stack7: document.getElementById('stack7')
}
/*----- event listeners -----*/ 


/*----- functions -----*/
init();

function init() {
    // make deck
    makeDeck();
    // shuffle deck
    shuffleDeck();
    console.log(deck);
    // create card elements
    createCardEls();
    console.log(cardEls);
    // deal cards to game board
    dealCards();
}

function makeDeck() {
    suits.forEach(suit => {
        values.forEach(value => {
            let card = {value: value, suit: suit};
            deck.push(card);
        });
    });
}

function shuffleDeck() {
    deck = deck.sort(()=> Math.random() -.5);
}


function createCardEls() {
    let temp;
    deck.forEach(card => {
        temp = document.createElement('div');
        temp.class = `${card.suit}${card.value}`;
        cardEls.push(temp);
    });
}
                             
function dealCards() {
                                
}