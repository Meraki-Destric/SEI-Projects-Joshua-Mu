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

// Timer
let timerActive = false;

// Points
let compPoints = 0;
let playerPoints = 0;

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

function timer() {
    var sec = 1;
    if (timerActive) {
        var timer = setInterval(function () {
            sec--;
            console.log(sec);
            if (sec <= 0) {
                clearInterval(timer);
                timerActive = false;
            }
        }, 1000);
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
    console.log(playerBlocks.length + compBlocks.length);
    // Loops to see if the chosen block has been chosen before
    if (playerBlocks.length + compBlocks.length < (rows * cols - 1)) {
        // From Player 1 side
        for (let i = 0; i < playerBlocks.length; i++) {
            // From Player 2 side
            for (let j = 0; j < compBlocks.length; j++) {
                if (blockChosenByAI === compBlocks[j]) {
                    blockChosenByAI = Math.floor(Math.random() * 8);
                    console.log(`Block J  Chose By AI is: ${blockChosenByAI}`);
                    j = 0;
                }
            }

            if (blockChosenByAI === playerBlocks[i]) {
                blockChosenByAI = Math.floor(Math.random() * 8);
                console.log(`Block Chose By AI is: ${blockChosenByAI}`);
                i = 0;
            }
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