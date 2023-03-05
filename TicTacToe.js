var board = ["", "", "", "", "", "", "", "", ""]; //empty board
var turn = "X"; // first players turn
var gameOver = false; //status of game

// add event listener when each cell is clicked
var cells = document.querySelectorAll('.cell');
cells.forEach(function(cell) {
  cell.addEventListener('click', handleCellClick);
});

var restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restart);

//do nothing if game is over when cell is clicked
function handleCellClick(event) {
  if (gameOver) {
    return;
  }
// clicked cell and index or location of cell clicked
  let cell = event.target;
  let index = Array.from(cells).indexOf(cell);
  if (board[index] === "") {
    board[index] = turn;
    cell.innerHTML = turn;
    turn = (turn === "X") ? "O" : "X"; //switch turns
    document.getElementById('turn').innerHTML = turn + "'s turn!"; //display whose turn
    checkWin(); 
  }
}
// see if there is a winner 
function checkWin() {
  var winner = null;
  // Check rows of board
  for (var i = 0; i < 9; i += 3) {
    if (board[i] !== "" && board[i] === board[i+1] && board[i] === board[i+2]) {
      winner = board[i];
      break;
    }
  }
  // Check columns on board
  for (var i = 0; i < 3; i++) {
    if (board[i] !== "" && board[i] === board[i+3] && board[i] === board[i+6]) {
      winner = board[i];
      break;
    }
  }
  if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
    winner = board[0];
  }
  if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
    winner = board[2];
  }

  // Check for a tie
  var tie = !board.includes("");

  if (winner || tie) {
    gameOver = true;
    cells.forEach(function(cell) {
      cell.removeEventListener('click', handleCellClick);
    });
    if (winner) {
      document.getElementById('message').innerHTML = winner + " wins!";
    } else {
      document.getElementById('message').innerHTML = "It's a tie!";
    }
  }
}
//start game over
function restart() {
  cells.forEach(function(cell) {
    cell.innerHTML = "";
    cell.addEventListener('click', handleCellClick);
  });
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  gameOver = false;
  document.getElementById('turn').innerHTML = turn + "'s turn!";
  document.getElementById('message').innerHTML = "";
}
