var Board = require("./board");

function Game(reader, completionCallback) {
  this.board = new Board();
  this.over = false;

  this.takeHumanTurn = function () {
    var game = this,
        gameBoard = game.board;

    gameBoard.display();
    reader.question("Please input row, col to mark: ", function (answer) {
      var move = [parseInt(answer[0]), parseInt(answer[answer.length - 1])];

      if (gameBoard.placeMark(move, "H")) {
        if (gameBoard.winningPlayer()) {
          console.log("You won!");
          completionCallback();
        } else if (gameBoard.tied()){
          console.log("It's a tie!");
          completionCallback();
        } else {
          game.takeComputerTurn();
        }
      } else {
        console.log("Invalid move");
        game.takeHumanTurn();
      }
    });
  };

  this.takeComputerTurn = function () {
    var validMove = false;
    while (!validMove) {
      var row = Math.floor(Math.random() * 3),
          col = Math.floor(Math.random() * 3);

      validMove = this.board.placeMark([row, col], "C");
    }
    if (this.board.winningPlayer()) {
      console.log("You lost!");
      completionCallback();
    } else {
      this.takeHumanTurn();
    }

  };
}

module.exports = Game;
