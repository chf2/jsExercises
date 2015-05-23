var readline = require("readline");
var TTT = require("./ttt");

reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var game = new TTT.Game(reader, function () {
  reader.close();
});
game.takeHumanTurn();
