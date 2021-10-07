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
                playerPoints++;
                $("#player1Score").html(playerPoints.toString());
                $(".winner").html("Player Wins");
                gameStarted = false;
                gameOver = true;
                return;
            }

            else if (compRow.equals(winCondition[m]) || compRow.equals(gridList[m])) {
                console.log("Player 2 Wins");
                $(".winner").html("Player 2 Wins");
                $("#player2Score").html(playerPoints.toString());
                compPoints++;
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