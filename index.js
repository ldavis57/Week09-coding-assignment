// Suits for card display
const cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"]; // define the suits 
const cardNames = { // Card values for cards greater than 10
    // Maps face cared values to their names instead of number, i.e. 11 is Jack, 12 is Queen, etc.
    11: "Jack",
    12: "Queen",
    13: "King",
    14: "Ace"
};

// -----------------------------
// Card Class
// Represents a single playing card with a numeric value and a suit
// -----------------------------
class Card { 
    constructor(value, suit) { // value is a number from 2 to 14, suit is one of the cardSuits
        this.value = value; // value of the card (2-14)
        this.suit = suit; // suit of the card (one of the cardSuits)
    }

    describe() {
        // Returns a string representation of the card, i.e. "Jack of Hearts ❤️"
        // if value is greater than 10, use cardNames to get the name, otherwise use the value directly
        const name = this.value > 10 ? cardNames[this.value] : this.value;  // get the name of the card based on its value
        return `${name} of ${this.suit}`; // returns a string representation of the card
    }
}

// -----------------------------
// Deck Class
// Represents a full 52-card deck
// -----------------------------
class Deck {
    constructor() { // Initializes a new deck of cards
        this.cards = []; // Empty array to hold the cards in the deck

        // Nested loops create 52 cards: each suit gets cards from 2 to Ace (14).
        for (let suit of cardSuits) { // Loop through each suit
            for (let value = 2; value <= 14; value++) { // Loop through values 2 to 14
                this.cards.push(new Card(value, suit)); // Create a new card and add it to the deck
            }
        }
    }

    // Randomly shuffles the deck
    // i is the row index, j is the column index
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) { // Loop through the deck in reverse order
            let j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap the cards at indices i and j
        }
    }

    // Splits the deck into two 26-card hands, one for each player
    deal() {
        return [this.cards.slice(0, 26), this.cards.slice(26)]; // Returns two hands, each with 26 cards
    }
}

// -----------------------------
// Player Class
// Creates a player with a name, a hand of cards, and a score starting at 0.
// -----------------------------
class Player {
    constructor(name, hand) { // name is the player's name, hand is an array of Card objects
        this.name = name; // Player's name
        this.hand = hand; // Player's hand, an array of Card objects
        this.score = 0; // Player's score, initialized to 0
    }

    // Plays (removes and returns) the top card of the hand.
    playCard() {
        return this.hand.shift(); // removes the top card from hand
    }

    // Adds 1 point to the player's score when they win a round.
    incrementScore() {
        this.score += 1;
    }
}

// -----------------------------
// Game Logic
// Function that contains the full flow of the game.
// -----------------------------
function playWarGame() {
    const deck = new Deck(); // Creates a new deck of cards using the Deck class
    deck.shuffle(); // Shuffles the deck to randomize the order of cards using the shuffle method in Deck class

    const [hand1, hand2] = deck.deal(); // Deals the shuffled deck into two hands of 26 cards each using the deal method in Deck class
    // hand1 and hand2 are arrays of Card objects, each containing 26 cards

    const player1 = new Player("Player 1", hand1); // Creates Player 1 with their hand of cards using the Player class
    const player2 = new Player("Player 2", hand2); // Creates Player 2 with their hand of cards using the Player class
    console.log("🏁 Starting WAR Game!\n"); // displays message indicating the start of the game

    for (let i = 0; i < 26; i++) {
        const card1 = player1.playCard(); // Player 1 plays the top card from their hand using the playCard method in Player class
        const card2 = player2.playCard(); // Player 2 plays the top card from their hand using the playCard method in Player class

        console.log(`Round ${i + 1}:`); // displays the current round number
        console.log(`${player1.name} plays: ${card1.describe()}`); // displays the card played by Player 1
        console.log(`${player2.name} plays: ${card2.describe()}`); // displays the card played by Player 2

        // Compares card values. The higher card wins and scores 1 point. Ties = no points.
        if (card1.value > card2.value) { // Player 1's card is higher
            player1.incrementScore(); // Player 1 increments their score by 1 using the incrementScore method in Player class
            console.log("-> Player 1 wins the round!\n"); // displays message indicating Player 1 wins the round
        } else if (card2.value > card1.value) { // Player 2's card is higher
            player2.incrementScore(); // Player 2 increments their score by 1 using the incrementScore method in Player class
            console.log("-> Player 2 wins the round!\n"); // displays message indicating Player 2 wins the round
        } else {
            console.log("-> It's a tie! No points awarded.\n"); // displays message indicating the round is a tie, no points are awarded
        }
    }

    // Final results
    // Prints final scores after all rounds.
    console.log("🏁 Game Over!");

    // displays final scores of both players using the score property from Player class
    console.log(`Final Scores:\nPlayer 1: ${player1.score}\nPlayer 2: ${player2.score}`); 

    // Checks if Player 1 has a higher score, print winning message using the score property from Player class
    if (player1.score > player2.score) { 
        console.log("🎉 Player 1 wins the game!");

    // Checks if Player 2 has a higher score, print winning message using the score property from Player class
    } else if (player2.score > player1.score) { 
        console.log("🎉 Player 2 wins the game!");

    // Prints if hand was a tie
    } else {
        console.log("🤝 It's a tie game!"); 
    }
}

// Start the game
playWarGame(); // Calls the playWarGame function to start the game

// Only export if running in Node.js (for testing)
if (typeof module !== 'undefined') { // Check if module is defined (indicating Node.js environment)
  module.exports = { Deck }; // Export the Deck class for testing
}

