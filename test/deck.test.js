const { Deck } = require('../index.js'); // Import the Deck class from the main file

const { expect } = require('chai'); // Import Chai for assertions


// Test suite for the Deck class
describe('Deck', () => { 
    it('should shuffle deck so the order changes', () => { // Test to ensure the deck is shuffled
        const deck = new Deck(); // Create a new instance of the Deck class
        const originalOrder = deck.cards.map(card => card.value + card.suit); // Store the original order of the cards
        deck.shuffle(); // Shuffle the deck
        const shuffledOrder = deck.cards.map(card => card.value + card.suit); // Get the order of the cards after shuffling
        expect(shuffledOrder).to.not.deep.equal(originalOrder); // Assert that the shuffled order is different from the original order
    });
});
