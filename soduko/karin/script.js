function createElements(){
  var bigBoard = document.getElementsByClassName("big-board")[0];
 
bigBoard.innerHTML = ""; // empty existing board;

   for (i = 0; i < 9; i++) {  
     var smallBoard = document.createElement("div"); // this is a small board
     smallBoard.className = 'soduko-board';
     smallBoard.id = "board-"+i;

     bigBoard.appendChild(smallBoard); 
      for (j = 0; j < 9; j++) {  // generate cells for small board
        var small = document.createElement("div");
        var input = document.createElement("input");
        small.className = 'square';
        smallBoard.appendChild(small);
        small.appendChild(input);
      }
   }
}

function check() {
  // check that all squares are correct
  let isAllLegal = true;
  for (j = 0; j < 9; j++) { 
    var cells = document.querySelectorAll("#board-" + j + " .square");
    console.log(cells);
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
    if(isSmallBoardLegal === false){ 
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
  // check that all rows are correct
  //check that all columns are correct
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
    if(number === ""){
      isArrayLegal = false;
    }
    arrayCopy.push(number);
  }
  return isArrayLegal;
}  
 
  
   
function generateBoard(){
  
  createElements();
  startTimer();
var bigSoduko = [
    [8,5,6,4,2,1,9,7,3], // board-1 bigSoduko[1]
    [7,9,2,6,3,8,4,1,5], // board-2 bigSoduko[2]
    [3,4,1,7,9,5,6,2,8],
    [3,1,2,6,4,8,5,9,7],
    [9,6,7,3,5,1,2,8,4], 
    [8,5,4,9,7,2,1,3,6],
    [7,8,4,2,6,5,1,3,9],
    [1,2,3,8,7,9,5,4,6], 
    [5,6,9,4,1,3,2,8,7],
  ]


  
  for(j=0; j< 9; j++){ // j = 0,1,2
    var cells = document.querySelectorAll("#board-"+j+" .square");
    for (let i = 0; i < 9; i++) { 
      cells[i].innerHTML = bigSoduko[j][i] // 0, 1, 2
    }
  }
  
 
  emptyCells();
 function emptyCells() {
  for(i=0; i < 9; i++){
    var smallBoardId = "board-"+i// "board-0, board-1...board-8";
    var cells = document.querySelectorAll("#"+smallBoardId+" "+".square"); //#board-1 .square, #board-2 .square...
    
    let randomCellIndex;
    let legalNumber;
    let numberOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 2; i++) {
      randomCellIndex = Math.floor(numberOptions.length * Math.random()); 
      legalNumber = numberOptions[randomCellIndex];
      cells[legalNumber].innerHTML = "<input type='text' value=''  />";
    }
  }
}
 
  
  
}

 function emptyAllCells() {
  var cells= document.querySelectorAll(".square");
  for(cell of cells) {
   cell.style.backgroundColor = "antiquewhite";
  }  
  for (let i = 0; i < 9; i++) {
    cells[i].innerHTML = "<input type ='text' value =''/>"
  }
}

let myInterval; 
function startTimer() {
  let startTime = 0;
  if(myInterval){
    clearInterval(myInterval);
  }
  const timer = document.getElementById("timer");
  myInterval = setInterval(function () {
    startTime = startTime + 0.1;
    timer.innerHTML = startTime.toFixed(2);
  }, 100);
}
 function endTimer(){
   clearInterval(myInterval);
 }



