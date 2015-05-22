var readline = require('readline');

function Clock () {
  this.time    = new Date();
  this.hours   = function () { return this.time.getHours(); };
  this.minutes = function () { return this.time.getMinutes(); };
  this.seconds = function () { return this.time.getSeconds(); };
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  console.log(this.hours() + ":" + this.minutes() + ":" + this.seconds());
};

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  // 2. Call printTime.
  // 3. Schedule the tick interval.
  this.printTime();
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  // 2. Call printTime.
  var currentTime = this.time;
  // console.log(currentTime);
  currentTime.setTime(currentTime.getTime() + Clock.TICK);
  this.printTime();
};

var clock = new Clock();
//clock.run();

reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers (sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Please input a number:", function (answer) {
      sum += parseInt(answer);
      numsLeft--;
      console.log("Partial sum: " + sum);
      addNumbers(sum, numsLeft, completionCallback);
    });
  } else {
    completionCallback(sum);
  }
}

/*
addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
  reader.close();
}); */

function askIfGreaterThan(el1, el2, callback) {
  reader.question("Is " + el1 + " greater than " + el2 + "? ", function (answer) {
    if (answer.toLowerCase() === "yes") {
      callback(true);
    } else if (answer.toLowerCase() === "no") {
      callback(false);
    } else {
      console.log("Please input 'yes' or 'no'.");
      askIfGreaterThan(el1, el2, callback);
    }
  });
}

function innerBubbleSortLoop (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  var madeSwaps = madeAnySwaps;
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], function (isGreaterThan) {
      if (isGreaterThan) {
        var temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
        madeSwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeSwaps, outerBubbleSortLoop);
    });
  } else {
    outerBubbleSortLoop(madeSwaps);
  }
}

function absurdBubbleSort (arr, sortCompletionCallback) {
  function outerBubbleSortLoop (madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1, 4, 0], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
