var readline = require('readline');
reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame () {
  this.stacks = [[3, 2, 1], [], []];

  this.isWon = function () {
    return this.stacks[1].length === 3 || this.stacks[2].length === 3;
  };

  this.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startStack = this.stacks[startTowerIdx];
    var endStack = this.stacks[endTowerIdx];
    return !(startStack.length === 0) && (endStack.length === 0 ||
           endStack[endStack.length - 1] > startStack[startStack.length - 1]);
  };

  this.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove (startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  this.print = function () {
    console.log(JSON.stringify(this.stacks));
  };

  this.promptMove = function (callback) {
    this.print();
    reader.question("Move disc from which stack? ", function (fromStack) {
      reader.question("Move disc to which stack? ", function (toStack) {
        callback(fromStack, toStack);
      });
    });
  };

  this.run = function (completionCallback) {
    var game = this;
    game.promptMove(function (fromStack, toStack) {
      if (!game.move(fromStack, toStack)) {
        console.log("Invalid move.");
        }
      if (game.isWon()) {
        console.log("You won!");
        completionCallback();
      } else {
        game.run(completionCallback);
      }
    });
  };
}

var hanoi = new HanoiGame();
hanoi.run(function () {
  reader.close();
});
