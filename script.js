//Display todays date
const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.getElementById("date").innerHTML = days[date.getDay()]+" "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
console.log(formattedDate);

const letter1 = document.getElementById('randomWordLetter1');
const letter2 = document.getElementById('randomWordLetter2');
const letter3 = document.getElementById('randomWordLetter3');
const letter4 = document.getElementById('randomWordLetter4');
const letter5 = document.getElementById('randomWordLetter5');


// Function to get a single random 5-letter word
async function getRandomWord() {
  // API endpoint URL
  const apiUrl = 'https://random-word-api.vercel.app/api?words=1&length=5';

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
      throw new Error('Failed to fetch random word');
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to get a random word
getRandomWord();


// Add event listener to each keyboard key
const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
  key.addEventListener('click', handleKeyClick);
});

// Event handler for keyboard key click
function handleKeyClick(event) {
  const clickedKey = event.target;
  console.log(`Clicked key: ${clickedKey.textContent}`);
}
