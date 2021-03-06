function createElements() {
  var bigBoard = document.getElementsByClassName("big-board")[0];

  bigBoard.innerHTML = ""; // empty existing board;

  for (i = 0; i < 9; i++) {
    var smallBoard = document.createElement("div"); // this is a small board
    smallBoard.className = "soduko-board";
    smallBoard.id = "board-" + i;

    bigBoard.appendChild(smallBoard);
    for (j = 0; j < 9; j++) {
      // generate cells for small board
      var small = document.createElement("div");
      var input = document.createElement("input");

      var row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      var column = (i % 3) * 3 + (j % 3);
      small.className = "square column-" + column + " row-" + row;
      smallBoard.appendChild(small);
      small.appendChild(input);
    }
  }
}

function check() {
  let isAllLegal = true;
  // check that all squares are correct:
  for (j = 0; j < 9; j++) {
    var cells = document.querySelectorAll("#board-" + j + " .square");
    var finalArray = [];
    var text;
    for (cell of cells) {
      if (cell.querySelector("input") != null) {
        text = cell.querySelector("input").value;
        finalArray.push(text);
        if (isNaN(text) || text > 9 || text < 0 || text == "0") {
          cell.style.backgroundColor = "red";
        }
      } else {
        cell.style.backgroundColor = "";
        finalArray.push(cell.innerHTML);
      }
    }
    const isSmallBoardLegal = isArrayLegal(finalArray);
    if (isSmallBoardLegal === false) {
      // if one of the small boards is not legal - the whole game is not legal.
      isAllLegal = false;
    }
  }
  // check that all columns are correct:
  for (j = 0; j < 9; j++) {
    var cells = document.querySelectorAll(".column-" + j + ".square"); // column-0, column-1
    var finalArray = [];
    var text;
    for (cell of cells) {
      if (cell.querySelector("input") != null) {
        text = cell.querySelector("input").value;
        finalArray.push(text);
      } else {
        finalArray.push(cell.innerHTML);
      }
    }
    const isSmallBoardLegal = isArrayLegal(finalArray);
    if (isSmallBoardLegal === false) {
      // if one of the small boards is not legal - the whole game is not legal.
      isAllLegal = false;
    }
  }
  // check that all rows are correct:
  for (j = 0; j < 9; j++) {
    var cells = document.querySelectorAll(".row-" + j + ".square"); // row-0, row-1, row-3...
    console.log(cells);
    var finalArray = [];
    var text;
    for (cell of cells) {
      if (cell.querySelector("input") != null) {
        text = cell.querySelector("input").value;
        finalArray.push(text);
      } else {
        finalArray.push(cell.innerHTML);
      }
    }
    const isSmallBoardLegal = isArrayLegal(finalArray);
    if (isSmallBoardLegal === false) {
      // if one of the small boards is not legal - the whole game is not legal.
      isAllLegal = false;
    }
  }
  if (isAllLegal) {
    window.alert("You have won!");
  } else window.alert("Try again");
}

function isArrayLegal(array) {
  let isArrayLegal = true;
  const arrayCopy = [];
  for (number of array) {
    var cellIndex = arrayCopy.indexOf(number);
    if (cellIndex == -1) {
    } else {
      isArrayLegal = false;
    }
    if (number === "") {
      isArrayLegal = false;
    }
    arrayCopy.push(number);
  }
  return isArrayLegal;
}

function generateBoard() {
  createElements();
  var bigSoduko = [
    [5, 3, 4, 6, 7, 2, 1, 8, 9],
    [1, 7, 8, 9, 4, 3, 6, 5, 2],
    [9, 2, 6, 8, 5, 1, 4, 7, 3],
    [3, 9, 1, 7, 6, 8, 4, 2, 5],
    [7, 2, 4, 5, 1, 9, 3, 8, 6],
    [5, 6, 8, 3, 4, 2, 1, 9, 7],
    [9, 4, 7, 2, 1, 6, 8, 5, 3],
    [2, 3, 1, 8, 9, 5, 4, 6, 7],
    [6, 8, 5, 7, 3, 4, 2, 1, 9],
  ];

  for (j = 0; j < 9; j++) {
    // j = 0,1,2
    var cells = document.querySelectorAll("#board-" + j + " .square");
    for (let i = 0; i < 9; i++) {
      cells[i].innerHTML = bigSoduko[j][i]; // 0, 1, 2
    }
  }
  startTimer();

  emptyCells();
  function emptyCells() {
    for (i = 0; i < 9; i++) {
      var smallBoardId = "board-" + i; // "board-0, board-1...board-8";
      var cells = document.querySelectorAll(
        "#" + smallBoardId + " " + ".square"
      ); //#board-1 .square, #board-2 .square...

      let randomCellIndex;
      let legalNumber;
      let numberOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      for (let i = 0; i < 5; i++) {
        randomCellIndex = Math.floor(numberOptions.length * Math.random());
        legalNumber = numberOptions[randomCellIndex];
        cells[legalNumber].innerHTML = "<input type='text' value=''  />";
      }
    }
  }
}
function emptyCells() {
  var cells = document.querySelectorAll(".square");
  let randomCellIndex;
  let legalNumber;
  let numberOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = 0; i < 5; i++) {
    randomCellIndex = Math.floor(numberOptions.length * Math.random());
    legalNumber = numberOptions[randomCellIndex];
    cells[legalNumber].innerHTML = "<input type='text' value=''  />";
  }
}

function emptyAllCells() {
  var cells = document.querySelectorAll(".square");
  for (cell of cells) {
    cell.style.backgroundColor = "antiquewhite";
  }
  for (let i = 0; i < 9; i++) {
    cells[i].innerHTML = "<input type ='text' value =''/>";
  }
}

let myInterval;
function startTimer() {
  let startTime = 0;
  if (myInterval) {
    clearInterval(myInterval);
  }
  const timer = document.getElementById("timer");
  myInterval = setInterval(function () {
    startTime = startTime + 0.1;
    timer.innerHTML = startTime.toFixed(2);
  }, 100);
}
function endTimer() {
  clearInterval(myInterval);
}
