const boxes = Array.from($(".box"));

const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;

const drawBoard = () => {
    // Basically a cleaner looking for loop
    // Iterates through every variable within this array
    boxes.forEach((box, index) => {
        let styleString = "";
        // Checks that the object is on the top row
        if (index < 3) {
            styleString += "border-bottom: 3px solid #f44336;";
        }
        //Checks that the object is on the left column
        if (index % 3 === 0) {
            styleString += "border-right: 3px solid #f44336;";
        }
        // Checks that the object is in the middle
        if (index % 3 === 2) {
            styleString += "border-left: 3px solid #f44336;";
        }
        // Checks that the object is on the bottom row
        if (index > 5) {
            styleString += "border-top: 3px solid #f44336;";
        }
        box.style = styleString;
        $(box).on("click", boxClicked);
    })
}

const boxClicked = (e) => {
    const id = e.target.id - 1;
    console.log(id);
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        currentPlayer = currentPlayer ===  O_TEXT ? X_TEXT : O_TEXT;
    }
}

drawBoard();