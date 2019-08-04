/*----- constants -----*/ 
const suits = ['s', 'h', 'c', 'd'];
const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']
/*----- app's state (variables) -----*/ 

let deck, pile, draw, stacks, aces, winner, clickedCard;

/*----- cached element references -----*/ 

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
// document.querySelector('#resetButton').addEventListener('click', init);
// document.querySelector('#pile').addEventListener('click', drawCard);
document.querySelector('#gameBoard').addEventListener('click', handleClick);

/*----- functions -----*/
init();

function init() {
    deck = [];
    pile = [];
    draw = [];
    stacks = [[],[],[],[],[],[],[]]
    aces = [[],[],[],[]]
    winner = null;
    clickedCard = null;
    // make deck
    makeDeck();
    // shuffle deck
    shuffleDeck();
    // create card elements
    // createCardEls();
    // deal cards to game board
    dealCards();
    render();
}

function render() {
    clearAllDivs();
    // for each card on each pile, render them with the card back showing
    // if it's the last card in the pile, render it with it's face up
    stacks.forEach((stack, sIdx) => {
        stack.forEach((card, cIdx) => {
            let cardEl = document.createElement('div');
            if (cIdx === stack.length -1) {
                cardEl.className = `card ${card.suit}${card.value}`
            } else {
                cardEl.className = `card back ${card.suit}${card.value}`
            }
            cardEl.style = `position: absolute; left: -7px; top: ${-7 + (cIdx*7)}px;`
            boardEls[`stack${sIdx +1}`].appendChild(cardEl);
        })
    })

    // render all cards in the 'pile' face down
    renderPile();
    
    // render all cards in the 'draw' face up
    renderDraw();
}
function renderPile() {
    pile.forEach((card, cIdx) => {
        let cardEl = document.createElement('div');
        cardEl.className = `card back ${card.suit}${card.value}`
        cardEl.style = `position: absolute; left: -7px; top: ${-7 + (cIdx*-.5)}px;`
        boardEls.pile.appendChild(cardEl);
    }); 
}
function renderDraw() {
    draw.forEach((card, cIdx) => {
        let cardEl = document.createElement('div');
        cardEl.className = `card ${card.suit}${card.value}`
        cardEl.style = `position: absolute; left: -7px; top: ${-7 + (cIdx*-.5)}px;`
        boardEls.draw.appendChild(cardEl);
    });
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
                             
function dealCards() {
    stacks.forEach((stack, idx) => {
        for (let i = 0; i < idx +1; i++)
        stack.unshift(deck.shift());
    });
    deck.forEach(card =>{
        pile.push(card);
    });              
}

function drawCard () {
    if(pile.length > 0) {
        draw.push(pile.pop());
        // boardEls.pile.removeChild(boardEls.pile.lastChild)
        render();
    } else {
        while(draw.length > 0) {
            pile.push(draw.pop())
        }
        render();
        // while(boardEls.draw.firstChild) {
        //     boardEls.draw.removeChild(boardEls.draw.firstChild);
        // }
    }
}

function clearAllDivs() {
    for(let boardEl in boardEls) {
        while(boardEls[boardEl].firstChild) {
            boardEls[boardEl].removeChild(boardEls[boardEl].firstChild);
        }
    }
}

function handleClick(evt) {
    let clickDest = getClickDestination(evt.target);

    if (clickDest.includes('stack')) {
        handleStackClick();
    } else if (clickDest.includes('ace')) {
        handleAceClick();
    } else if (clickDest === 'draw') {
        handleDrawClick();
    } else if (clickDest === 'pile') {
        drawCard();
    } else if (clickDest === 'resetButton') {
        init();
    }
    // if (!clickedCard && isFaceUpCard(evt.target)) {
    //     clickedCard = evt.target;
    //     clickedCard.className += ' highlight';
    //     let stackId = clickedCard.parentNode.id.replace('stack', '') -1;
    //     console.log(stacks[stackId][stacks[stackId].length-1]);
    // } else if (isFaceUpCard(evt.target)) {
    //     // check if clicked card is playable on destCard
    //     let destCard = evt.target;
    //     console.log(destCard.parentNode);
    //     // play clicked card on top of the destCard
    //     destCard.parentNode.appendChild(clickedCard);
    //     clickedCard.className = clickedCard.className.replace(' highlight', '');
    //     clickedCard = null;
    // } else if (isAcePile(evt.target)) {
    //     console.log(`that's an ace pile`)
    // }
    
    // clickedCard.parentNode.removeChild(clickedCard)
    // clickedCard = null;
}

function isFaceUpCard(element) {
    return (element.className.includes('card') && !(element.className.includes('back')) && !(element.className.includes('outline'))) 
}

function isAcePile(element) {
    if (!(element.firstChild)) {
        return element.id.includes('ace');
    } else {
        return element.parentNode.id.includes('ace');
    }
}

function getClickDestination(element) {
    if (element.id) {
        return element.id;
    } 
    else {
        return element.parentNode.id;
    }
}

function handleStackClick() {
    console.log('handling Stack click');
}

function handleAceClick() {
    console.log('handling Ace click');
}

function handleDrawClick() {
    console.log('handlingDrawClick')
}