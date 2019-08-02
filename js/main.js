/*----- constants -----*/ 
const deck = [];
const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
/*----- app's state (variables) -----*/ 
/*----- cached element references -----*/ 
/*----- event listeners -----*/ 
/*----- functions -----*/
function makeDeck() {
    suits.forEach(suit => {
        values.forEach(value => {
            let card = {Value: value, Suit: suit};
            deck.push(card);
        });
    });
}

makeDeck();
console.log(deck);

// Shuffle function
// myArr.sort(function() {
//     return Math.random() -.5;
// })