const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--; //decrement maxTime by -1
      return (timeText.innerText = maxTime);
    }
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    initGame(); // initGame is called so the game restarts
  }, 1000);
};

const initGame = () => {
  initTimer(30); // calling timer function while implementing 30s as maxTime
  let randomObj = words[Math.floor(Math.random() * words.length)]; //getting random objects from words
  let wordArray = randomObj.word.split(""); //splitting each letter of random word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //getting random numbers
    //shuffling and swiping wordArray letters randomly
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  hintText.innerText = randomObj.hint; //passing randomObj hint as hint text
  wordText.innerText = wordArray.join(""); //passing shuffled words as word text
  correctWord = randomObj.word.toLowerCase();
  inputField.value = ""; //making field input empty
  inputField.setAttribute("maxlength", correctWord.length); //setting input maxlength after value to word length
};
initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase(); //getting user value
  if (!userWord) return alert("Please enter a word check"); // if user didn't input any value

  // if user word doesn't matched with the correct word
  if (userWord !== correctWord)
    return alert(`Oops! ${userWord} is not a correct word`);
  //if the two conditions above failed then show congrats
  alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
