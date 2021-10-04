// Variables

const O_TEXT = "O";
const X_TEXT = "X";
let chosenSide = O_TEXT;
let player2Side = X_TEXT;
let currentPlayer = chosenSide;
let gameGrid = $(".game");

let rows = 3;
let cols = 3;
let gridList = [];

let playerBlocks = [];

let compBlocks = [];

//#region Borrowed Functions

// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

//#endregion

//#region Tic Tac Toe Functionality

function createGrid(numOfRows, numOfCols) {
    let grid = [];
    let previousID = 0;
    for (let i = 0; i < numOfRows; i++) {
        let row = [];
        let rowElement = $("<div></div>")
        rowElement.addClass("row");
        rowElement.attr("id", `${i}row`);
        previousID = rows * (i);
        for (let j = 0; j < numOfCols; j++) {
            row.push(j + previousID);
            let colElement = $("<div></div>");
            colElement.addClass("block");
            colElement.attr("id", `${j + previousID}`);
            rowElement.append(colElement);
        }
        grid.push(row);
        gameGrid.append(rowElement);
    }

    gridList = grid;
    console.log(gameGrid);
    checkGrid();
}

function checkGrid() {
    const blocks = Array.from($(".block"));
    console.log(blocks);

    // Basically a cleaner looking for loop
    // Iterates through every variable within this array
    blocks.forEach((block, index) => {
        // Checks for if the player is clicking on a block
        $(block).on("click", playerPick);
    })
}

function playerPick(e) {
    const id = e.target.id;
    console.log(id);

    addPlayerChoice(id);
    checkWinCondition();
}

function addPlayerChoice(blockID) {
    let chosenByPlayer = false;
    let chosenByComp = false;

    for (let i = 0; i < playerBlocks.length; i++) {
        console.log(parseInt(blockID));
        // Check if player has chosen this block before
        if (parseInt(blockID) === playerBlocks[i]) {
            chosenByPlayer = true;
        }

        for (let j = 0; j < compBlocks.length; j++) {
            // Check if player 2 or the computer has chosen this before
            if (parseInt(blockID) === compBlocks[j]) {
                chosenByComp = true;
            }
        }
    }

    // If current player is player 1, run this
    if (currentPlayer === chosenSide) {
        if (chosenByComp || chosenByPlayer) {
            console.log("This option has been chosen before");
        }
        else {
            playerBlocks.push(parseInt(blockID));
            let chosenBlock = $(`#${blockID}`);
            chosenBlock.css("background-color", "red");
        }
    }

    // If current player is player 2, run this
    else if (currentPlayer === player2Side) {
        if (chosenByComp || chosenByPlayer) {
            console.log("This option has been chosen before");
        }
        else {
            compBlocks.push(parseInt(blockID));
            let chosenBlock = $(`#${blockID}`);
            chosenBlock.css("background-color", "blue");
        }
    }

    let sortedPlayer = playerBlocks.sort(function (a, b) {
        return a - b;
    });

    playerBlocks = sortedPlayer;
    console.log(`Player has chosen ${playerBlocks}`);
    let sortComp = compBlocks.sort(function(a, b) {
        return a - b;
      });
      
    compBlocks = sortComp;
    console.log(`Computer has chosen ${compBlocks}`);
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
}

function findWinConditions() {
    let conditions = [];
    let diagonals = findDiagonalConditions();
    // Vertical Win Condition
    for (let i = 0; i < gridList.length; i++) {
        let winList = [];
        for (let j = 0; j < cols; j++) {
            if (i < 1) {
                // Return the first character of every array
                console.log(gridList[j][0]);
                winList.push(gridList[j][0]);
            }
            else {
                console.log(gridList[j][0 + i]);
                winList.push(gridList[j][0 + i]);
            }
        }
        conditions.push(winList);
    }
    for (let i = 0; i < diagonals.length; i++) {
        conditions.push(diagonals[i]);
    }
    console.log(conditions);
    return conditions;
}

function findDiagonalConditions() {
    let diagonalWinConditions = [];
    let diagonal1 = [];
    let diagonal2 = [];
    let currentIndex = gridList.length - 1;
    for (let i = 0; i < gridList.length; i++) {
        diagonal1.push(gridList[i][i]);
    }

    for (let i = 0; i < gridList.length; i++) {
        diagonal2.push(gridList[i][currentIndex]);
        currentIndex--;
    }

    diagonalWinConditions.push(diagonal1);
    diagonalWinConditions.push(diagonal2);
    console.log(diagonalWinConditions);
    return diagonalWinConditions;
}

function checkWinCondition() {
    console.log(`Current blocks selected: ${playerBlocks.length + compBlocks.length}`);
    let winCondition = findWinConditions();
    console.log(`Win Conditions are: ${winCondition}`);

    // Selects Row
    for (let i = 0; i < gridList.length; i++) {
        let playerRow = [];
        let compRow = [];
        // Selects Column
        // Checking the first row
        for (let j = 0; j < gridList[i].length; j++) {
            if (i === 0) {
                playerRow.push(playerBlocks[j]);
                compRow.push(compBlocks[j]);
            }
            else {
                playerRow.push(playerBlocks[j + i]);
                compRow.push(compBlocks[j + i]);
            }
        }




        for (let m = 0; m < winCondition.length + gridList.length; m++) {
            console.log(`Checking player choices: ${playerRow}`);
            console.log(`Checking computer choices: ${compRow}`);
            console.log(`Current checking list is: ${winCondition[m]}`);
            console.log(`Current checking list is: ${gridList[m]}`);

            //Checks if any of the rows have been claimed
            if (playerRow.equals(winCondition[m]) || playerRow.equals(gridList[m])) {
                console.log("Player Wins");
                return;
            }

            else if (compRow.equals(winCondition[m]) || compRow.equals(gridList[m])) {
                console.log("Computer Wins");
                return;
            }

            else if (playerBlocks.length + compBlocks.length === rows * cols) {
                console.log("Cat's game. Tie");
            }
            else {
                console.log("Continue Playing");
            }
        }
    }
}

//#endregion

$(".play").on("click", createGrid(rows, cols));
