const wordListInput = document.getElementById('word-list');
const startBtn = document.getElementById('start-btn');
const testSection = document.getElementById('test-section');
const wordPrompt = document.getElementById('word-prompt');
const userInput = document.getElementById('user-input');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const resultSection = document.getElementById('result-section');
const scoreDisplay = document.getElementById('score');
const wordResults = document.getElementById('word-results');
const restartBtn = document.getElementById('restart-btn');
const inputSection = document.getElementById('input-section');

let words = [];
let testWords = [];
let currentWordIndex = 0;
let userAnswers = [];
let score = 0;

// Predefined list of 100 words
const predefinedWords = [
  'apple', 'banana', 'cherry', 'date', 'elephant', 'falcon', 'grape', 'hippopotamus',
  'igloo', 'jaguar', 'kangaroo', 'lemon', 'mango', 'nectarine', 'orange', 'peach',
  'quince', 'raspberry', 'strawberry', 'tomato', 'umbrella', 'violet', 'walnut',
  'xylophone', 'yacht', 'zebra', 'ant', 'bee', 'cat', 'dog', 'eagle', 'frog',
  'goose', 'hawk', 'iguana', 'jellyfish', 'kiwi', 'lion', 'monkey', 'newt',
  'owl', 'penguin', 'quokka', 'rabbit', 'snake', 'tiger', 'urchin', 'vulture',
  'whale', 'xerus', 'yak', 'zucchini', 'cloud', 'rainbow', 'forest', 'mountain',
  'river', 'ocean', 'desert', 'island', 'prairie', 'plateau', 'valley', 'meadow',
  'cliff', 'canyon', 'lake', 'waterfall', 'stream', 'geyser', 'volcano', 'glacier',
  'hill', 'dune', 'reef', 'lagoon', 'beach', 'shore', 'bay', 'cave', 'delta',
  'plain', 'peak', 'peninsula', 'archipelago', 'marsh', 'swamp', 'bog', 'savanna',
  'jungle', 'rainforest', 'tundra', 'steppe', 'fjord', 'estuary', 'grove', 'orchard'
];

// Prepopulate the word list when the page loads
document.addEventListener('DOMContentLoaded', () => {
  wordListInput.value = predefinedWords.join(', '); // Populate the textarea with predefined words
});

// Start the test
startBtn.addEventListener('click', () => {
  if (words.length === 0) {
    const inputWords = wordListInput.value.split(',').map(w => w.trim()).filter(Boolean);
    if (inputWords.length < 10) {
      alert('Please enter at least 10 words.');
      return;
    }
    words = inputWords; // Save words for reuse
  }
  startTest();
});

function startTest() {
  testWords = getRandomWords(words, 10); // Get 10 random words for the test
  inputSection.classList.add('hidden');
  resultSection.classList.add('hidden');
  testSection.classList.remove('hidden');
  currentWordIndex = 0;
  userAnswers = [];
  score = 0;
  repeatBtn.disabled = true;
  userInput.value = '';
  wordPrompt.textContent = 'Press "Next" to hear the first word!';
}

// Next word in the test
nextBtn.addEventListener('click', () => {
  if (currentWordIndex > 0) {
    const userAnswer = userInput.value.trim();
    userAnswers.push(userAnswer);
    userInput.value = '';
  }

  if (currentWordIndex < testWords.length) {
    const currentWord = testWords[currentWordIndex];
    speakWord(currentWord);
    wordPrompt.textContent = `Word ${currentWordIndex + 1} of ${testWords.length}`;
    repeatBtn.disabled = false;
    currentWordIndex++;
  } else {
    endTest();
  }
});

// Repeat the current word
repeatBtn.addEventListener('click', () => {
  const currentWord = testWords[currentWordIndex - 1];
  speakWord(currentWord);
});

// End the test and show results
function endTest() {
  const userAnswer = userInput.value.trim();
  userAnswers.push(userAnswer);
  testSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  displayResults();
}

// Display results
function displayResults() {
  score = 0;
  wordResults.innerHTML = '';
  testWords.forEach((word, index) => {
    const userAnswer = userAnswers[index] || 'empty';
    const isCorrect = word.toLowerCase() === userAnswer.toLowerCase();
    if (isCorrect) score++;

    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${word} - ${isCorrect ? 'Correct' : `Wrong (You wrote: "${userAnswer}")`}`;
    listItem.style.color = isCorrect ? 'green' : 'red';
    wordResults.appendChild(listItem);
  });
  scoreDisplay.textContent = `You scored ${score} out of ${testWords.length}.`;
}

// Restart the test
restartBtn.addEventListener('click', () => {
  startTest();
});

// Function to get random words
function getRandomWords(wordArray, count) {
  return wordArray
    .slice() // Make a copy to avoid modifying the original array
    .sort(() => Math.random() - 0.5) // Shuffle the array
    .slice(0, count); // Select the first `count` words
}

// Function to read a word using TTS
function speakWord(word) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  synth.speak(utterance);
}
