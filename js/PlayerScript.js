function addPlayerChoice(blockID) {
    let chosenByPlayer = false;
    let chosenByComp = false;

    for (let i = 0; i < playerBlocks.length; i++) {
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
            alert("This option has been chosen before");
            console.log("Wooo!");
            return;
        }
        else if (!chosenByComp && !chosenByPlayer) {
            console.log("Ignoring you either way");
            playerBlocks.push(parseInt(blockID));
            let chosenBlock = $(`#${blockID}`);
            if (colorCode) {
                chosenBlock.css("background-color", "red");
                currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
            }
            else if (XO) {
                chosenBlock.html(currentPlayer);
                currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
            }
        }

        timerActive = true;
        timer();
    }

    // If current player is player 2, run this
    else if (currentPlayer === player2Side) {
        if (playerBlocks.length + compBlocks.length < rows * cols) {
            if (chosenByComp || chosenByPlayer) {
                if (turnAI) {
                    console.log("AI chose an already selected block");
                    chooseAIBlock();
                    console.log("Wooo!");
                    return;
                }
                if (!turnAI) {
                    alert("This option has been chosen before");
                    return;
                }
            }
            else if (!chosenByComp && !chosenByPlayer) {
                console.log("Ignoring you either way");
                compBlocks.push(parseInt(blockID));
                let chosenBlock = $(`#${blockID}`);
                if (colorCode) {
                    chosenBlock.css("background-color", "blue");
                    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
                }
                else if (XO) {
                    chosenBlock.html(currentPlayer);
                    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
                }
            }
        }
    }

    let sortedPlayer = playerBlocks.sort(function (a, b) {
        return a - b;
    });

    playerBlocks = sortedPlayer;
    let sortComp = compBlocks.sort(function (a, b) {
        return a - b;
    });

    compBlocks = sortComp;
}

function playerPick(e) {
    let id = e.target.id;
    // Signals that the game has started and that no modifications can be made
    console.log(`ID is ${id}`);
    if (!timerActive) {
        if (!gameOver && !turnAI) {
            gameStarted = true;
            addPlayerChoice(id);
            checkWinCondition();
            if (versingAI) {
                turnAI = true;
                console.log("AI Enabled");
            }
        }
        if (turnAI) {
            chooseAIBlock();
        }
    }
}