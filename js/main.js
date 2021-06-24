import Player from "./Player.js";

/**
 * To start:
 * Check index.html, make sure the board with fields are created with correct classnames
 * The board should be 3x3 fields
 * Add correct classes
 */

let players = [];
let currentPlayer = 0; // This is the index of the array of the currentplayer
const fields = document.querySelectorAll('.board > .field');
const resetButton = document.querySelector(".reset-btn");

//Create two players aligned with the Player class
const playerOne = new Player("Speler 1", "X");
const playerTwo = new Player("Speler 2", "O");
//Add both players to the players array

players.push(playerOne, playerTwo);

console.log("players array contains: " + players.length + " players");

/**
 * Assignment
 * Make a loop thru all the fields and add a click event. 
 * Connect the addSymbolToField function in the eventHandler
 */

console.log("We have some fields: " + fields.length);

for(let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('click', function() {
     addSymbolToField(fields[i]);
    });
}


/**
 * Assignment 
 * Give body to the reset function (the function exists below)
 */
resetButton.addEventListener("click", resetGame);

let currentSymbol = players[currentPlayer].symbol;

function addSymbolToField(field) {
    let fieldContent = field.textContent;

    console.log("clicked:" + fieldContent);

    if (fieldContent === 'X' || fieldContent === 'o') {
        alert('This field can not be used');
        return;
    }

    if (currentPlayer == 0) {
        currentSymbol = players[currentPlayer].symbol;
        field.textContent = currentSymbol;
        currentPlayer++;
        return;
    } else  {
        currentSymbol = players[currentPlayer].symbol;
        field.textContent = currentSymbol;
        currentPlayer--;
        return;
    }
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let gameState = ["", "", "", "", "", "", "", "", "",];

function checkWinner() {
    console.log(gameState)
    for(let i = 0; i < fields.length; i++)  {
        const state = fields[i].textContent;
        gameState[i] = state;  
}

let roundWon = false;

for (let i = 0; i < 8; i++)  {
    const winCondition = winningConditions[i];
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];
    if (a === '' || c === '') {
        continue;
    }
    if (a === b && b === c) {
        roundWon = true;
        break
    }
}

    if (roundWon) {
        for(let i = 0; i < players.length; i++) {
            let player = players[i];

            if(currentSymbol === player.symbol) {
                player.addPoint();
                alert(player.name + " has won and has " + player.points + "points");
            }
        }
    }
}

    /**
     * Assignment
     * Add the current player symbol to the field textContent
     * What more needs to be done here? Make a short todolist
     */      

function resetGame() {
    for (let i = 0; fields.length > i; i++){
        fields[i].textContent = "";
    }

    currentSymbol = players[0].symbol;
    currentPlayer = 0;
}