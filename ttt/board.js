function Board () {
  this.grid = [["o", "o", "o"],
               ["o", "o", "o"],
               ["o", "o", "o"]];

  this.comparePositions = function (arr1, arr2) {
    var equal = true;
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        equal = false;
        break;
      }
    }

    return equal;
  };

  this.display = function () {
    this.grid.forEach(function (row) {
      console.log(JSON.stringify(row));
    });
  };

  this.empty = function (pos) {
    return this.grid[pos[0]][pos[1]] === "o";
  };

  this.placeMark = function(pos, mark) {
    if (this.empty(pos)) {
      this.grid[pos[0]][pos[1]] = mark;
      return true;
    } else {
      return false;
    }
  };

  this.winningPlayer = function () {
    var g = this.grid,
        testArrH = ["H", "H", "H"],
        testArrC = ["C", "C", "C"],
        seriesToCheck = [
          [g[0][0], g[0][1], g[0][2]],
          [g[1][0], g[1][1], g[1][2]],
          [g[2][0], g[2][1], g[2][2]],
          [g[0][0], g[1][0], g[2][0]],
          [g[0][1], g[1][1], g[2][1]],
          [g[0][2], g[1][2], g[2][2]],
          [g[0][0], g[1][1], g[2][2]],
          [g[2][0], g[1][1], g[0][2]]
        ];

    for (var series = 0; series < seriesToCheck.length; series++) {
      if (this.comparePositions(seriesToCheck[series], testArrH) ||
          this.comparePositions(seriesToCheck[series], testArrC))
      {
        return true;
      }
    }

    return false;
  };
}

module.exports = Board;
