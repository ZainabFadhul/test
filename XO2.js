// Select all elements with the class "box" from HTML code and store them on boxes variable
let boxes = document.querySelectorAll(".box");

// Initialize game variables
let turn; // Current player's turn (X or O)
let isGameOver = false; // Flag to track if the game is over
let moveCount = 0; // Counter for the total number of moves made
let moves = { X: 0, O: 0 }; // Object to track the total number of moves made by each player(يتتبع عدد الحركات)
let currentMoves = { X: [], O: [] }; // Object to track the positions of the current moves made by each player (يتتبع مواضع التحركات)

// Initialize scoreboard variables
let xScore = 0; // Player X's score
let oScore = 0; // Player O's score

// Get scoreboard elements
const xScoreDisplay = document.getElementById("x-score");
const oScoreDisplay = document.getElementById("o-score");

// Get turn indicator element
const currentTurnDisplay = document.getElementById("current-turn");

// Hide game elements initially to not shown on the strarting screen
document.querySelector(".turn-container").style.display = "none";
document.querySelector(".main-grid").style.display = "none";
document.querySelector("#play-again").style.display = "none";

// Add event listeners to the start buttons
document.querySelector("#start-x").addEventListener("click", () => {
    startGame("X");
});
document.querySelector("#start-o").addEventListener("click", () => {
    startGame("O");
});

// Function to start the game when player press starting eathier with x or o button
function startGame(startingPlayer) {
    turn = startingPlayer; //This variable is used to keep track of whose turn it is in the game.
    document.querySelector("#start-screen").style.display = "none"; // Hides the start screen
    document.querySelector(".turn-container").style.display = "block"; //Displays the turn container
    document.querySelector(".main-grid").style.display = "grid"; //Displays the main grid
    document.querySelector(".scoreboard").style.display = "flex"; // Show the scoreboard when the games start and one of the player wins
    currentTurnDisplay.textContent = turn; //Updates the text content of the currentTurnDisplay element to show whose turn it is
}

// Add event listeners to each box
boxes.forEach(e => {
    e.innerHTML = ""; //sets the inner HTML of the current box (e) to an empty string, effectively clearing the box
    e.addEventListener("click", () => { //adds a click event listener to the current box (e)
        if (!isGameOver) { // checks if the game is not over
            if (moves[turn] < 3 && e.innerHTML === "") { //checks if the current player turn has made fewer than three moves and if the clicked box is empty
                e.innerHTML = turn;
                currentMoves[turn].push(e);
                moves[turn]++;
                moveCount++;
                checkWin();
                checkDraw();
                if (!isGameOver) changeTurn();
            } else if (moves[turn] === 3 && e.innerHTML === turn) {
                e.innerHTML = "";
                currentMoves[turn] = currentMoves[turn].filter(piece => piece !== e);
                moves[turn]--;
                moveCount--;
            } else if (moves[turn] < 3 && e.innerHTML === "") {
                e.innerHTML = turn;
                currentMoves[turn].push(e);
                moves[turn]++;
                moveCount++;
                checkWin();
                checkDraw();
                if (!isGameOver) changeTurn();
            }
        }
    });
});

// Function to change turn
function changeTurn() { //toggling the current player's turn
    turn = turn === "X" ? "O" : "X"; //changing turn for example if turn is currently x it will be set to o
    currentTurnDisplay.textContent = turn; //change the text displayed on the screen to indicate whose turn it is
}

// Function to check for a win
function checkWin() {
    let winConditions = [ // all win winConditions
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i];
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true; //If a winning condition is met, this line sets the isGameOver flag to true
            document.querySelector("#results").innerHTML = turn + " wins!"; //display the message indicating which player has won the game
            document.querySelector("#play-again").style.display = "inline"; //sets the display style of the "Play Again" button to "inline" making it visible
            // Highlight the winning row on the board
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"; //sets the background color of the winning box to "#08D9D6", highlighting it
                boxes[winConditions[i][j]].style.color = "#000"; //sets the text color of the winning box to "#000" black
            }
            // Update the score
            if (turn === "X") {
                xScore++;
                xScoreDisplay.textContent = xScore;
            } else {
                oScore++;
                oScoreDisplay.textContent = oScore;
            } //increments the score of the winning player xScore or oScore and updates the corresponding element xScoreDisplay or oScoreDisplay with the new score
            return; //exits the function early because a win has been detected and there's no need to check for other win conditions
        }
    }
}
// Function to check for a draw
function checkDraw() {
    if (moveCount === 9 && !isGameOver) {
        isGameOver = true;
        document.querySelector("#results").innerHTML = "Draw!";
        document.querySelector("#play-again").style.display = "block";
    }
}

// Event listener for the "Play Again" button
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;  //resets the isGameOver variable to false
    moveCount = 0; //resets the moveCount variable to 0,
    moves = { X: 0, O: 0 }; //resets the moves object to have 0 moves for both players X and O
    currentMoves = { X: [], O: [] }; //resets the currentMoves object to be empty for both players X and O indicating that they have not made any moves in the new game
    // Reset all boxes
    boxes.forEach(e => {
        e.innerHTML = ""; //Resets the inner HTML of the box to empty, clearing any X or O marks
        e.style.removeProperty("background-color"); // Removes the background color of the box resetting it to its default
        e.style.color = "#fff"; // Reset text color to white
    });
    document.querySelector("#results").innerHTML = ""; //clears the content of the element with the ID "results"  which displays the game result
    document.querySelector("#play-again").style.display = "none"; // hides the "Play Again" button again  as the game has been reset
    changeTurn(); //set the turn to the starting player (X or O) for the new game
});
