const { Deck } = require('../index.js'); // Import the Deck class from the main file

// Save this in test/deck.test.js
const { expect } = require('chai');

describe('Deck', () => {
    it('should shuffle deck so the order changes', () => {
        const deck = new Deck();
        const originalOrder = deck.cards.map(card => card.value + card.suit);
        deck.shuffle();
        const shuffledOrder = deck.cards.map(card => card.value + card.suit);
        expect(shuffledOrder).to.not.deep.equal(originalOrder);
    });
});
