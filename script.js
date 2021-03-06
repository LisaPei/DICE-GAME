// Player variables
var player1Hold, player2Hold, player1Turn, player2Turn, currentPlayer, previousDiceRoll, diceRollValue;

player1Hold = 0; player2Hold = 0; player1Turn = 0; player2Turn = 0; currentPlayer = 0; previousDiceRoll = 0; diceRollValue = 0;

// Switch case function to be called everytime the dice is rolled to display the number rolled
function changeDiceDisplay(rolled) {
    switch (true) {
        case (rolled === 1):
            document.getElementById('diceOne').style.display = 'block';
            break;
        case (rolled === 2):
            document.getElementById('diceTwo').style.display = 'block';
            break;
        case (rolled === 3):
            document.getElementById('diceThree').style.display = 'block';
            break;
        case (rolled === 4): 
            document.getElementById('diceFour').style.display = 'block';
            break;
        case (rolled === 5): 
            document.getElementById('diceFive').style.display = 'block';
            break;
        case (rolled === 6):
            document.getElementById('diceSix').style.display = 'block';
            break;
    }
}

// Switch case function to be called before the dice that is rolled is displayed
function hidePreviousDice(previousRoll) {
    // Checks if value is falsy, which is will be the first roll to keep the previousRoll variable one behind the current dice value
    if (previousRoll) {
        switch (true) {
            case (previousRoll === 1):
                document.getElementById('diceOne').style.display = 'none';
                break;
            case (previousRoll === 2):
                document.getElementById('diceTwo').style.display = 'none';
                break;
            case (previousRoll === 3):
                document.getElementById('diceThree').style.display = 'none';
                break;
            case (previousRoll === 4): 
                document.getElementById('diceFour').style.display = 'none';
                break;
            case (previousRoll === 5): 
                document.getElementById('diceFive').style.display = 'none';
                break;
            case (previousRoll === 6):
                document.getElementById('diceSix').style.display = 'none';
                break;
        }
    }
}

// Function to be called everytime 'hold' is pressed, to determine is player has won
function determineIfWinner(currentplayer) {
    if (currentPlayer === 0) {
        if (player1Hold >= 100) {
            // Indicates player has won when accumulated more than 100 points 
            document.getElementById('hiddenWinner1').style.display = 'block';
        }
    } else if (currentPlayer === 1) {
        if (player2Hold >= 100) {
            // Indicates player has won when accumulated more than 100 points 
            document.getElementById('hiddenWinner2').style.display = 'block';
        }
    }
}

// Function to track score player has accumulated for current turn
function addTurnScore(currentPlayer, valueToAdd) {
    if (currentPlayer === 0) {
        player1Turn = player1Turn + valueToAdd;

        // Shows respective point accumulation changes on front-end
        document.getElementById('player1Turn').textContent = player1Turn;
    } else if (currentPlayer === 1) {
        player2Turn = player2Turn + valueToAdd;

        // Shows respective point accumulation changes on front-end
        document.getElementById('player2Turn').textContent = player2Turn;
    }
}

// Funtion for dice roll logic and to indicate which player's turn it currently is
function rollDice() {
    // forces previous dice roll to be one roll behind, as it should be 
    previousDiceRoll = diceRollValue;
    hidePreviousDice(previousDiceRoll);
    diceRollValue = Math.floor(Math.random() * 6) + 1;
    changeDiceDisplay(diceRollValue);

    // Switches players if dice rolled === 1
    if (diceRollValue === 1) {
        if (currentPlayer === 0) {
            currentPlayer = currentPlayer + 1;
            player1Turn = 0;

            // Adjusts front-end to indicate player turns have swapped
            document.getElementById('player1Turn').textContent = 0;
            document.getElementById('player1').style.border = 'solid white';
            document.getElementById('player2').style.border = 'solid black';
        } else if (currentPlayer === 1) {
            currentPlayer = currentPlayer - 1;
            player2Turn = 0;

            // Adjusts front-end to indicate player turns have swapped
            document.getElementById('player2Turn').textContent = 0;
            document.getElementById('player2').style.border = 'solid white';
            document.getElementById('player1').style.border = 'solid black';
        }
    // Block to add current dice roll value to turn total for potential banking/accumulation 
    } else if (diceRollValue === 2) {
        addTurnScore(currentPlayer, diceRollValue);
    } else if (diceRollValue === 3) {
        addTurnScore(currentPlayer, diceRollValue);
    } else if (diceRollValue === 4) {
        addTurnScore(currentPlayer, diceRollValue);
    } else if (diceRollValue === 5) {
        addTurnScore(currentPlayer, diceRollValue);
    } else if (diceRollValue === 6) {
        addTurnScore(currentPlayer, diceRollValue);
    }
}

// Function to hold/bank/add current turn points into cumulative point total 
function holdScore() {
    if (currentPlayer === 0 && player1Turn != 0) {
        player1Hold = player1Hold + player1Turn;
        determineIfWinner(currentPlayer);

        // Logic to store current player's points and switch player turns
        document.getElementById('player1Hold').textContent = player1Hold;
        currentPlayer = 1;
        player1Turn = 0;

        // Adjusts front-end to indicate next player's turn
        document.getElementById('player1Turn').textContent = 0;
        document.getElementById('player1').style.border = 'solid white';
        document.getElementById('player2').style.border = 'solid black';
    } else if (currentPlayer === 1 && player2Turn != 0) {
        player2Hold = player2Hold + player2Turn;
        determineIfWinner(currentPlayer);

        // Logic to store current player's points and switch player turns
        document.getElementById('player2Hold').textContent = player2Hold;
        currentPlayer = 0;
        player2Turn = 0;

        // Adjusts front-end to indicate next player's turn
        document.getElementById('player2Turn').textContent = 0;
        document.getElementById('player2').style.border = 'solid white';
        document.getElementById('player1').style.border = 'solid black';
    }
}

// Function to remove game rules and start game
function startGame() {
    document.getElementById('gameRules').style.display = 'none';
    document.getElementById('gameStart').style.display = 'block';
}
