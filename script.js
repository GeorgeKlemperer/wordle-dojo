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

const letter1 = document.getElementById("randomWordLetter1");
const letter2 = document.getElementById("randomWordLetter2");
const letter3 = document.getElementById("randomWordLetter3");
const letter4 = document.getElementById("randomWordLetter4");
const letter5 = document.getElementById("randomWordLetter5");

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
      const randomWord = data[0].toUpperCase();
      //Display the random word
      letter1.innerText = randomWord.charAt(0);
      letter2.innerText = randomWord.charAt(1);
      letter3.innerText = randomWord.charAt(2);
      letter4.innerText = randomWord.charAt(3);
      letter5.innerText = randomWord.charAt(4);
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
let guess1 = "";
// let guess2 = "";
// let guess3 = "";
// let guess4 = "";
// let guess5 = "";

function updateHTML() {
  let guess1FirstLetter = document.getElementById(
    `guessLetter${guessNumber}-1`
  );
  guess1FirstLetter.innerHTML = guess1.charAt(0).toUpperCase();
  let guess1SecondLetter = document.getElementById(
    `guessLetter${guessNumber}-2`
  );
  guess1SecondLetter.innerHTML = guess1.charAt(1).toUpperCase();
  let guess1ThirdLetter = document.getElementById(
    `guessLetter${guessNumber}-3`
  );
  guess1ThirdLetter.innerHTML = guess1.charAt(2).toUpperCase();
  let guess1FourthLetter = document.getElementById(
    `guessLetter${guessNumber}-4`
  );
  guess1FourthLetter.innerHTML = guess1.charAt(3).toUpperCase();
  let guess1FifthLetter = document.getElementById(
    `guessLetter${guessNumber}-5`
  );
  guess1FifthLetter.innerHTML = guess1.charAt(4).toUpperCase();
  console.log(guess1);
  console.log(guess1.length);
}

// Add event listener to each digital keyboard key
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("click", handleKeyClick);
});

// Event handler for digital keyboard key click
function handleKeyClick(event) {
  const clickedKey = event.target;

  if (clickedKey.id === "backspaceButton") {
    // Handle the backspace button click
    if (guessNumber === 1 && guess1.length > 0) {
      // Remove the last character from the guess
      guess1 = guess1.slice(0, -1);
      // Update the HTML elements with guessed letters
      updateHTML();
    }
  } else {
    // Handle other keyboard keys
    guess1 += clickedKey.textContent;
    updateHTML();
  }
}

// Function to handle real keyboard events
function handleRealKeyPress(event) {
  // Check if the pressed key is a letter (A-Z or a-z)
  if (
    (event.keyCode >= 65 && event.keyCode <= 90) ||
    (event.keyCode >= 97 && event.keyCode <= 122)
  ) {
    if (guessNumber === 1 && guess1.length <= 4)
      // Append the pressed letter to the guess
      guess1 += event.key.toUpperCase();
    // Update the HTML elements with guessed letters
    updateHTML();
  }

  // Check if the pressed key is the backspace key (KeyCode 8)
  if (event.keyCode === 8) {
    // Prevent the default behavior of the backspace key (delete text)
    event.preventDefault();
    if (guessNumber === 1 && guess1.length > 0) {
      // Remove the last character from the guess
      guess1 = guess1.slice(0, -1);

      // Update the HTML elements with guessed letters
      updateHTML();
    }
  }
}

// Add an event listener for 'keydown' event on the document
document.addEventListener("keydown", handleRealKeyPress);
