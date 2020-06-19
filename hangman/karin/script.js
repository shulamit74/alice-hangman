const categories = {
  "Animals": ["shark", "cat", "fish"],
  "Singers": ["Justin", "Ariana"],
  "Drinks":  ["water", "sprite"]
}

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

let word;
let guess;
let guesses = [];
let lives = 10;
let lettersUserGuessed = 0; 
let space;

  const addButtons = () => {
    myButtons = document.getElementById('buttons');
    myButtons.innerHTML = ''; 
    letters = document.createElement('div');

    for (let i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('span');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
 
   check = function() {
    list.onclick =  function() {
      guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          lettersUserGuessed += 1;
        } 
      }
      let j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        updateLives();
      } else {
        updateLives();
      }
    }
  }

const updateLives = () => {
  showLives = document.getElementById("mylives");
  showLives.innerHTML = "You have " + lives + " lives";
  if (lives < 1) {
    showLives.innerHTML = "Game Over";
  }
  
  console.log("lettersUserGuessed: ", lettersUserGuessed);
  console.log("word length: ", guesses.length);
  for (let i = 0; i < guesses.length; i++){
    if (lettersUserGuessed == guesses.length){
      showLives.innerHTML = "You win";
    }
  }

}

const addWordLines = () => {
  wordHolder = document.getElementById("hold");
  wordHolder.innerHTML = ''; 
  guesses = [];
  correct = document.createElement('div');
  for (let i = 0; i < word.length; i++){
    guess = document.createElement('span');
    if(word[i] === "-"){
      guess.innerHTML = "-";
    } else {
      guess.innerHTML = "_";
    }
    guesses.push(guess);
    wordHolder.appendChild(correct);
    correct.appendChild(guess);
  }
}
 
  
  const chooseWord = () => {
    const categoryKeys = Object.keys(categories);
    const random = Math.random() 
    let randomIndex = Math.random() * categoryKeys.length 
    randomIndex = Math.floor(randomIndex) 
    
    if(randomIndex === categoryKeys.length){
      randomIndex = randomIndex - 1
    }
    const randomCategory = categoryKeys[randomIndex];
    const wordOptions = categories[randomCategory];
    const wordRandom = Math.random()
    let wordRandomIndex = Math.random() * wordOptions.length 
    wordRandomIndex = Math.floor(wordRandomIndex) 
    if(wordRandomIndex === wordOptions.length){
      wordRandomIndex = wordRandomIndex - 1
    }
    word = wordOptions[wordRandomIndex]  
    word = word.replace(/\s+/g, '-') 
    const element = document.getElementById("category");
    element.innerHTML = randomCategory
  }
 
  const playAgain = () => {
    lettersUserGuessed = 0;
    chooseWord();
    addButtons();
    addWordLines();
  }