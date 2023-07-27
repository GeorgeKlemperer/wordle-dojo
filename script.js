//Display todays date
const date = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
document.getElementById("date").innerHTML =
  days[date.getDay()] +
  " " +
  date.getDate() +
  "/" +
  (date.getMonth() + 1) +
  "/" +
  date.getFullYear();

let formattedDate =
  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
console.log(formattedDate);

const answerElement = document.getElementById("answer");
let randomWord = "";

// Function to get a single random 5-letter word
async function getRandomWord() {
  // API endpoint URL
  const apiUrl = "https://random-word-api.vercel.app/api?words=1&length=5";

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the response is successful
    if (response.ok) {
      randomWord = data[0].toUpperCase();
      //Display the random word
      answerElement.innerHTML = randomWord;

      console.log(randomWord);
    } else {
      throw new Error("Failed to fetch random word");
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to get a random word
getRandomWord();

let guessNumber = 1;
let guess = "";

function updateHTML() {
  let guessFirstLetter = document.getElementById(`guessLetter${guessNumber}-1`);
  guessFirstLetter.innerHTML = guess.charAt(0).toUpperCase();
  let guessSecondLetter = document.getElementById(
    `guessLetter${guessNumber}-2`
  );
  guessSecondLetter.innerHTML = guess.charAt(1).toUpperCase();
  let guessThirdLetter = document.getElementById(`guessLetter${guessNumber}-3`);
  guessThirdLetter.innerHTML = guess.charAt(2).toUpperCase();
  let guessFourthLetter = document.getElementById(
    `guessLetter${guessNumber}-4`
  );
  guessFourthLetter.innerHTML = guess.charAt(3).toUpperCase();
  let guessFifthLetter = document.getElementById(`guessLetter${guessNumber}-5`);
  guessFifthLetter.innerHTML = guess.charAt(4).toUpperCase();
  console.log(guess);
  console.log(guess.length);
}

// Add event listener to each digital keyboard key
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("click", handleKeyClick);
});

// Event handler for digital keyboard key click
function handleKeyClick(event) {
  const clickedKey = event.target;

  if (clickedKey.id === "enterButton" && guess.length === 5) {
    submitGuess();
  }

  if (clickedKey.id === "backspaceButton") {
    // Handle the backspace button click
    if (guess.length > 0) {
      // Remove the last character from the guess
      guess = guess.slice(0, -1);
      // Update the HTML elements with guessed letters
      updateHTML();
    }
  } else {
    // Handle other keyboard keys
    if (guess.length <= 4 && clickedKey.id !== "enterButton") {
      guess += clickedKey.textContent;
      updateHTML();
    }
  }
}

function handleRealKeyPress(event) {
  const keyPressed = event.key.toUpperCase();

  // Check if the pressed key is a letter (A-Z or a-z)
  if (/^[A-Z]$/.test(keyPressed) && guess.length <= 4) {
    // Append the pressed letter to the guess
    guess += keyPressed;
  }

  // Check if the pressed key is the backspace key (KeyCode 8)
  if (event.keyCode === 8) {
    event.preventDefault();
    if (guess.length > 0) {
      // Remove the last character from the guess
      guess = guess.slice(0, -1);
    }
  }

  // Check if the pressed key is the enter key (KeyCode 13)
  if (event.keyCode === 13 && guess.length === 5) {
    submitGuess();
  }

  // Update the HTML elements with guessed letters
  updateHTML();
}

// Add an event listener for 'keydown' event on the document
document.addEventListener("keydown", handleRealKeyPress);

function submitGuess() {
  console.log("submit");
  let AL1 = randomWord.charAt(0).toUpperCase();
  let AL2 = randomWord.charAt(1).toUpperCase();
  let AL3 = randomWord.charAt(2).toUpperCase();
  let AL4 = randomWord.charAt(3).toUpperCase();
  let AL5 = randomWord.charAt(4).toUpperCase();

  let answerArray = [AL1, AL2, AL3, AL4, AL5];
  console.log(answerArray);

  let guessArray = guess.split("");
  console.log(guessArray);

  let GL1 = document.getElementById(`guessLetter${guessNumber}-1`);
  let GL2 = document.getElementById(`guessLetter${guessNumber}-2`);
  let GL3 = document.getElementById(`guessLetter${guessNumber}-3`);
  let GL4 = document.getElementById(`guessLetter${guessNumber}-4`);
  let GL5 = document.getElementById(`guessLetter${guessNumber}-5`);

  let matchedLetters = [];

  for (let i = 0; i < answerArray.length; i++) {
    if (guessArray[i] === answerArray[i]) {
      matchedLetters.push(guessArray[i]);
      console.log(`Matched letters: ${matchedLetters}`);
    }
  }

  let matchedIndexes = [];

  for (let i = 0; i < answerArray.length; i++) {
    if (guessArray[i] === answerArray[i]) {
      matchedIndexes.push(i);
      console.log(`Matched indexes: ${matchedIndexes}`);
    }
  }

  // Compare the two arrays
  for (let i = 0; i < answerArray.length; i++) {
    if (guessArray[i] === answerArray[i]) {
      answerArray[i] = "removed";
      console.log(answerArray);
      if (i === 0) GL1.style.backgroundColor = "green";
      if (i === 1) GL2.style.backgroundColor = "green";
      if (i === 2) GL3.style.backgroundColor = "green";
      if (i === 3) GL4.style.backgroundColor = "green";
      if (i === 4) GL5.style.backgroundColor = "green";
      document.getElementById(`${guessArray[i]}`).style.backgroundColor =
        "green";
      if (
        GL1.style.backgroundColor === "green" &&
        GL2.style.backgroundColor === "green" &&
        GL3.style.backgroundColor === "green" &&
        GL4.style.backgroundColor === "green" &&
        GL5.style.backgroundColor === "green"
      ) {
        winGame();
      }
    }
  }

  for (let i = 0; i < answerArray.length; i++) {
    if (
      answerArray.includes(guessArray[i]) &&
      !matchedLetters.includes(guessArray[i])
    ) {
      answerArray[answerArray.indexOf(guessArray[i])] = "removed";
      console.log(answerArray);
      matchedIndexes.push(i);
      if (i === 0) GL1.style.backgroundColor = "orange";
      if (i === 1) GL2.style.backgroundColor = "orange";
      if (i === 2) GL3.style.backgroundColor = "orange";
      if (i === 3) GL4.style.backgroundColor = "orange";
      if (i === 4) GL5.style.backgroundColor = "orange";
      if (
        document.getElementById(`${guessArray[i]}`).style.backgroundColor !==
        "green"
      ) {
        document.getElementById(`${guessArray[i]}`).style.backgroundColor =
          "orange";
      }
    } else if (
      answerArray.includes(guessArray[i]) &&
      matchedLetters.includes(guessArray[i])
    ) {
      let indexToRemove = matchedLetters.indexOf(guessArray[i]);
      matchedLetters.splice(indexToRemove, 1);
    }
  }

  for (let i = 0; i < answerArray.length; i++) {
    if (!answerArray.includes(guessArray[i]) && !matchedIndexes.includes(i)) {
      if (i === 0) GL1.style.backgroundColor = "lightgrey";
      if (i === 1) GL2.style.backgroundColor = "lightgrey";
      if (i === 2) GL3.style.backgroundColor = "lightgrey";
      if (i === 3) GL4.style.backgroundColor = "lightgrey";
      if (i === 4) GL5.style.backgroundColor = "lightgrey";
      if (
        document.getElementById(`${guessArray[i]}`).style.backgroundColor !==
          "green" &&
        document.getElementById(`${guessArray[i]}`).style.backgroundColor !==
          "orange"
      ) {
        document.getElementById(`${guessArray[i]}`).style.backgroundColor =
          "lightgrey";
      }
    }
  }

  guessNumber += 1;
  console.log(guessNumber);
  guess = "";

  if (guessNumber === 7) {
    loseGame();
  }
}

function winGame() {
  answerElement.style.visibility = "visible";
  guessNumber = undefined;
}

function loseGame() {
  answerElement.style.visibility = "visible";
  guessNumber = undefined;
}
