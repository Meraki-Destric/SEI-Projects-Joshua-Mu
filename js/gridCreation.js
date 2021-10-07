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