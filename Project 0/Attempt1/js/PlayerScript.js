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
            if (turnAI) {
                console.log("AI chose an already selected block");
                return;
            }
            alert("This option has been chosen before");
        }
        else {
            playerBlocks.push(parseInt(blockID));
            let chosenBlock = $(`#${blockID}`);
            if (colorCode) {
                chosenBlock.css("background-color", "red");
            }
            else if (XO)
            {
                chosenBlock.html(currentPlayer);
            }
        }
    }

    // If current player is player 2, run this
    else if (currentPlayer === player2Side) {
        if (chosenByComp || chosenByPlayer) {
            if (turnAI) {
                console.log("AI chose an already selected block");
                return;
            }
            alert("This option has been chosen before");
        }
        else {
            compBlocks.push(parseInt(blockID));
            let chosenBlock = $(`#${blockID}`);
            if (colorCode) {
                chosenBlock.css("background-color", "blue");
            }
            else if (XO)
            {
                chosenBlock.html(currentPlayer);
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
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
}