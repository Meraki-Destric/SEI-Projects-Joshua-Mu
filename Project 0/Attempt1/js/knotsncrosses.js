// Conditions
let playerChoices = [];
let compChoices = [];


function checkRow() {
    let blocks = $(".row .block");
    let blockList = Array.from(blocks);
    playerChoices = [];
    compChoices = [];

    for (let i = 0; i < blocks.length; i++) {
        let test = blockList[i];

        if (blockList[i].style.backgroundColor == "red") {
            playerChoices.push(i + 1);
        }
        else {
            compChoices.push(i + 1);
        }
    }

    console.log(`Player List is ${playerChoices}`);
    console.log(`Computer List is ${compChoices}`);
}

function checkWins() {
    console.log("Checking if someone has won");
    console.log(playerChoices);

    for (let i = 0; i < playerChoices.length; i++) {
        // Horizontal Winnings
        if (playerChoices[i + 2] - 2 === playerChoices[i] &&
            playerChoices[i] + 1 === playerChoices[i + 1] &&
            playerChoices[i] + 2 === playerChoices[i + 2]) {
            console.log(`Player Wins`);
        }
        //Vertical Winnings
        else if (playerChoices[i + 2] - 6 === playerChoices[i] &&
            playerChoices[i] + 3 === playerChoices[i + 1] &&
            playerChoices[i] + 6 === playerChoices[i + 2])
        {
            console.log(`Player Wins`);
        }
        else if (playerChoices[i + 2] - 4 === playerChoices[i] &&
            playerChoices[i] + 2 === playerChoices[i + 1] &&
            playerChoices[i] + 4 === playerChoices[i + 2])
        {
            console.log(`Player Wins`);
        }
        else if (playerChoices[i + 2] - 8 === playerChoices[i] &&
            playerChoices[i] + 4 === playerChoices[i + 1] &&
            playerChoices[i] + 8 === playerChoices[i + 2])
        {
            console.log(`Player Wins`);
        }
    }
}



function selectBlock() {
    $(this).css("background-color", "red");

    checkRow();
    checkWins();
}

$(".block").on("click", selectBlock);