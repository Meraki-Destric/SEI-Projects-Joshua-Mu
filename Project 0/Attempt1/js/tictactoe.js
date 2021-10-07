// Variables

const O_TEXT = "O";
const X_TEXT = "X";
let chosenSide = O_TEXT;
let player1SIde = O_TEXT;
let player2Side = X_TEXT;
let currentPlayer = chosenSide;
let gameGrid = $(".game");

let rows = 3;
let cols = 3;
let gridList = [];

let playerBlocks = [];

let compBlocks = [];

let gameStarted = false;
let gameOver = false;

let numOfTimeSizeIncreased = 0;

//Easter Eggs
let XO = false;
let colorCode = true;

// AI

let turnAI = false;
let versingAI = false;

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
    checkGrid();
}

function clearGrid() {
    gridList = [];
    playerBlocks = [];
    compBlocks = [];
    currentPlayer = chosenSide;
    $(".row").remove();
}

function checkGrid() {
    const blocks = Array.from($(".block"));

    // Basically a cleaner looking for loop
    // Iterates through every variable within this array
    blocks.forEach((block, index) => {
        // Checks for if the player is clicking on a block
        if (!gameOver) {
            $(block).on("click", playerPick);
        }
    })
}

function playerPick(e) {
    let id = e.target.id;
    gameStarted = true;
    console.log(`ID is ${id}`);
    if (!gameOver && !turnAI) {
        gameStarted = true;
        addPlayerChoice(id);
        checkWinCondition();
        if (versingAI) {
            turnAI = true;
        }
    }

    if (turnAI) {
        chooseAIBlock();
    }
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
                winList.push(gridList[j][0]);
            }
            else {
                winList.push(gridList[j][0 + i]);
            }
        }
        conditions.push(winList);
    }
    for (let i = 0; i < diagonals.length; i++) {
        conditions.push(diagonals[i]);
    }
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
    return diagonalWinConditions;
}

function checkWinCondition() {
    let winCondition = findWinConditions();

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

            //Checks if any of the rows have been claimed
            if (playerRow.equals(winCondition[m]) || playerRow.equals(gridList[m])) {
                console.log("Player 1 Wins");
                $(".winner").html("Player Wins");
                gameStarted = false;
                gameOver = true;
                return;
            }

            else if (compRow.equals(winCondition[m]) || compRow.equals(gridList[m])) {
                console.log("Player 2 Wins");
                $(".winner").html("Player 2 Wins");
                gameStarted = false;
                gameOver = true;
                return;
            }

            else if (playerBlocks.length + compBlocks.length === rows * cols) {
                gameStarted = false;
                console.log("Cat's game. Tie");
                $(".winner").html("Cat's game. Tie");
            }
            else {
                console.log("Continue Playing");
            }
        }
    }
}

function detemineButtons() {

    if (!versingAI) {
        $(".vsAI").css("visibility", "visible");
        $(".vsPlayer").css("visibility", "hidden");
    }
    if (versingAI) {
        $(".vsAI").css("visibility", "hidden");
        $(".vsPlayer").css("visibility", "visible");
    }
}

function chooseAIBlock() {
    let blockChosenByAI = Math.floor(Math.random() * 8);
    console.log(`Block Chose By AI is: ${blockChosenByAI}`);
    //Check if player has chosen this option already
    for (let i = 0; i < playerBlocks.length; i++) {
        if (blockChosenByAI === playerBlocks[i]) {
            blockChosenByAI = Math.floor(Math.random() * 8);
            console.log(`Block Chose By AI is: ${blockChosenByAI}`);
            i = 0;
        }

    }

    addPlayerChoice(blockChosenByAI);
    turnAI = false;
}

//#endregion

$(document).ready(() => {

    detemineButtons();

    $(".play").on("click", () => {
        clearGrid();
        createGrid(rows, cols);
        $(".restart").css("visibility", "visible");
        $(".play").remove();
        $("h1").remove();
    });

    $(".tiktak").on("click", () => {
        if (!gameStarted) {
            XO = true;
            colorCode = false;
        }
    });

    $(".smallBox").on("click", () => {
        if (!gameStarted) {
            XO = false;
            colorCode = true;
        }
    })

    $(".restart").on("click", () => {
        gameOver = false;
        $(".winner").html("");
        clearGrid();
        createGrid(rows, cols);
    });

    $(".vsAI").on("click", () => {
        if (!gameStarted) {
            versingAI = true;
            detemineButtons();
        }
    });

    $(".vsPlayer").on("click", () => {
        if (!gameStarted) {
            versingAI = false;
            detemineButtons();
        }
    });

    $(".gridSize").on("click", () => {
        numOfTimeSizeIncreased++
        gameOver = false;

        if (numOfTimeSizeIncreased === 1) {
            rows = 4;
            cols = 4;
            $(".winner").html("");
            clearGrid();
            createGrid(rows, cols);
        }

        if (numOfTimeSizeIncreased === 2) {
            rows = 5;
            cols = 5;
            $(".winner").html("");
            clearGrid();
            createGrid(rows, cols);
        }

        if (numOfTimeSizeIncreased > 2) {
            rows = 3;
            cols = 3;
            numOfTimeSizeIncreased = 0;
            $(".winner").html("");
            clearGrid();
            createGrid(rows, cols);
        }
    });
});