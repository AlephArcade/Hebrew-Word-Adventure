   // Hebrew word data with Purim additions
const wordBanks = {
  2: [
    { hebrew: 'אב', transliteration: 'av', meaning: 'father' },
    { hebrew: 'אם', transliteration: 'em', meaning: 'mother' },
    { hebrew: 'בא', transliteration: 'ba', meaning: 'comes' },
    { hebrew: 'גן', transliteration: 'gan', meaning: 'garden' },
    { hebrew: 'דג', transliteration: 'dag', meaning: 'fish' },
    { hebrew: 'רע', transliteration: 'ra', meaning: 'bad' },
    { hebrew: 'חג', transliteration: 'chag', meaning: 'holiday' },
    { hebrew: 'שם', transliteration: 'shem', meaning: 'name' },
    { hebrew: 'עץ', transliteration: 'etz', meaning: 'tree' },
  ],
  3: [
    { hebrew: 'יום', transliteration: 'yom', meaning: 'day' },
    { hebrew: 'מים', transliteration: 'mayim', meaning: 'water' },
    { hebrew: 'ילד', transliteration: 'yeled', meaning: 'boy' },
    { hebrew: 'אור', transliteration: 'or', meaning: 'light' },
    { hebrew: 'המן', transliteration: 'haman', meaning: 'Haman (Purim villain)' },
    { hebrew: 'רעש', transliteration: 'ra\'ash', meaning: 'noise' },
    { hebrew: 'מלך', transliteration: 'melech', meaning: 'king' },
    { hebrew: 'נס', transliteration: 'nes', meaning: 'miracle' },
    { hebrew: 'אזן', transliteration: 'ozen', meaning: 'ear' },
    { hebrew: 'שמח', transliteration: 'sameach', meaning: 'happy' },
  ],
  4: [
    { hebrew: 'שלום', transliteration: 'shalom', meaning: 'peace' },
    { hebrew: 'תודה', transliteration: 'toda', meaning: 'thank you' },
    { hebrew: 'ילדה', transliteration: 'yalda', meaning: 'girl' },
    { hebrew: 'אסתר', transliteration: 'esther', meaning: 'Esther (Purim heroine)' },
    { hebrew: 'משתה', transliteration: 'mishteh', meaning: 'feast' },
    { hebrew: 'אדר', transliteration: 'adar', meaning: 'Adar (month of Purim)' },
    { hebrew: 'רעשן', transliteration: 'ra\'ashan', meaning: 'noisemaker' },
    { hebrew: 'שושן', transliteration: 'shushan', meaning: 'Shushan (city)' },
  ],
  5: [
    { hebrew: 'מרדכי', transliteration: 'mordechai', meaning: 'Mordechai (Purim hero)' },
    { hebrew: 'פורים', transliteration: 'purim', meaning: 'Purim holiday' },
    { hebrew: 'משלוח', transliteration: 'mishloach', meaning: 'sending (gifts)' },
    { hebrew: 'מגילה', transliteration: 'megila', meaning: 'scroll' }, 
  ],
  6: [
    { hebrew: 'תחפושת', transliteration: 'tachposet', meaning: 'costume (Purim)' },
    { hebrew: 'אומנות', transliteration: 'omanut', meaning: 'art' },
    { hebrew: 'מוזיקה', transliteration: 'muzika', meaning: 'music' },
  ]
};

// Hebrew letter + nikud combinations for bonus rounds
const nikudChallenges = [
  // Level 1 (easy)
  [
    {
      letter: 'אָ',
      options: ['ah', 'uh', 'eh', 'ee'],
      correct: 'uh',
      sound: 'kamatz',
      transliteration: 'uh as in "sun"'
    },
    {
      letter: 'בֵּ',
      options: ['ve', 'bey', 'bah', 'buh'],
      correct: 'bey',
      sound: 'tzere',
      transliteration: 'e as in "they"'
    },
    {
      letter: 'גִּ',
      options: ['ghee', 'gah', 'go', 'gu'],
      correct: 'ghee',
      sound: 'chirik',
      transliteration: 'i as in "machine"'
    }
  ],
  // Level 2 (medium)
  [
    {
      letter: 'דֹּ',
      options: ['doh', 'dah', 'duh', 'di'],
      correct: 'doh',
      sound: 'cholam',
      transliteration: 'o as in "go"'
    },
    {
      letter: 'הֻ',
      options: ['hoo', 'hi', 'he', 'ho'],
      correct: 'hoo',
      sound: 'kubutz',
      transliteration: 'u as in "flute"'
    }
  ],
  // Level 3 (harder)
  [
    {
      letter: 'חַ',
      options: ['cha', 'chi', 'chu', 'che'],
      correct: 'cha',
      sound: 'patach',
      transliteration: 'a as in "father"'
    },
    {
      letter: 'טוּ',
      options: ['tu', 'ti', 'te', 'ta'],
      correct: 'tu',
      sound: 'shuruk',
      transliteration: 'u as in "flute"'
    },
    {
      letter: 'יֶ',
      options: ['ye', 'ya', 'yo', 'yu'],
      correct: 'ye',
      sound: 'segol',
      transliteration: 'e as in "set"'
    }
  ],
  // Level 4 (advanced)
  [
    {
      letter: 'כַּ',
      options: ['ka', 'ke', 'ki', 'ku'],
      correct: 'ka',
      sound: 'patach',
      transliteration: 'a as in "father"'
    },
    {
      letter: 'לֹ',
      options: ['lo', 'la', 'li', 'lu'],
      correct: 'lo',
      sound: 'cholam',
      transliteration: 'o as in "go"'
    },
    {
      letter: 'נוֹ',
      options: ['no', 'na', 'ni', 'nu'],
      correct: 'no',
      sound: 'cholam malei',
      transliteration: 'o as in "go"'
    }
  ],
  // Level 5 (using common Hebrew names/words to illustrate vowel sounds)
  [
    {
      letter: 'נֹ', // Using the first syllable of "Noach"
      options: ['oh', 'ah', 'eh', 'oo'],
      correct: 'oh',
      sound: 'cholam',
      transliteration: 'as in "Noach"'
    },
    {
      letter: 'יָ', // The first syllable of "Adam"
      options: ['yah', 'yeh', 'yee', 'yuh'],
      correct: 'yah',
      sound: 'qamatz',
      transliteration: 'as in "Adam"'
    },
    {
      letter: 'מֹ', // The first syllable of "Moshe"
      options: ['mo', 'ma', 'me', 'mu'],
      correct: 'mo',
      sound: 'cholam',
      transliteration: 'as in "Moshe"'
    }
  ],
  // Level 6 (even more advanced — "malei" forms)
  [
    {
      letter: 'אִי',
      options: ['a', 'ee', 'o', 'u'],
      correct: 'ee',
      sound: 'chirik malei',
      transliteration: 'ee as in "seen"'
    },
    {
      letter: 'אֵי',
      options: ['ei', 'i', 'a', 'u'],
      correct: 'ei',
      sound: 'tzere malei',
      transliteration: 'ei as in "veil"'
    },
    {
      letter: 'אֹ',
      options: ['o', 'a', 'e', 'u'],
      correct: 'o',
      sound: 'cholam ḥaser',
      transliteration: 'o as in "go"'
    }
  ]
];

// Declare gameContainer as a global variable (but don't initialize it yet)
let gameContainer;

// Game state initialization
let gameState = {
  active: false,
  level: 1,
  currentWord: null,
  shuffledLetters: [],
  selectedLetters: [],
  score: 0,
  streak: 0,
  bonusActive: false,
  hintsRemaining: 15,
  completed: false,
  animatingCorrect: false,
  wordsCompleted: 0,
  completedWords: {
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  },
  currentLevelProgress: 0,
  inBonusRound: false,
  bonusTimeRemaining: 0,
  bonusReward: {
    extraHints: 0,
    scoreMultiplier: 1
  },
  lives: 10, // New property for lives (10 lives = 5 hearts)
  maxLives: 10 // Maximum number of lives
};

// Fixed startGame function that properly initializes lives
function startGame() {
  gameState = {
    active: true,
    level: 1,
    currentWord: null,
    shuffledLetters: [],
    selectedLetters: [],
    score: 0,
    streak: 0,
    bonusActive: false,
    hintsRemaining: 15,
    completed: false,
    animatingCorrect: false,
    wordsCompleted: 0,
    completedWords: {
      2: [],
      3: [],
      4: [],
      5: [],
      6: []
    },
    currentLevelProgress: 0,
    inBonusRound: false,
    bonusTimeRemaining: 0,
    bonusReward: {
      extraHints: 0,
      scoreMultiplier: 1
    },
    lives: 10, // Initialize with 10 lives
    maxLives: 10 // Maximum number of lives
  };
  
  setupWord();
}

function setupWord() {
  const wordLength = getWordLengthForLevel(gameState.level);
  const wordsForLevel = wordBanks[wordLength];
  
  // Get words that haven't been completed yet
  const availableWords = wordsForLevel.filter(word => 
    !gameState.completedWords[wordLength].includes(word.hebrew)
  );
  
  // If no words left at this level
  if (availableWords.length === 0) {
    // Move to next level if available
    if (gameState.level < 6) {
      gameState.level += 1;
      gameState.currentLevelProgress = 0;
      showMessage(`LEVEL UP! Now playing with ${getWordLengthForLevel(gameState.level)} letter words!`);
      // Recursive call to set up a word in the new level
      setupWord();
      return;
    } else {
      // Game completed
      gameState.completed = true;
      renderGame();
      return;
    }
  }
  
  // Select random word from available words
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  gameState.currentWord = availableWords[randomIndex];
  
  // Shuffle letters
  const lettersArray = gameState.currentWord.hebrew.split('');
  gameState.shuffledLetters = shuffleArray(lettersArray);
  
  // Reset selected letters
  gameState.selectedLetters = [];
  gameState.animatingCorrect = false;
  
  // Check if bonus is active
  gameState.bonusActive = gameState.streak >= 3;
  
  renderGame();
}

function shuffleArray(array) {
  // Clone the array to avoid modifying the original if needed:
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getWordLengthForLevel(level) {
 // For levels 1-5, return level + 1; for level 6 or higher, return 6.
  return level < 6 ? level + 1 : 6;
}

function handleLetterSelect(index) {
  // Don't allow selection during animation
  if (gameState.animatingCorrect) return;
  
  // Check if already selected
  if (gameState.selectedLetters.includes(index)) {
    // If this is the last letter selected, deselect it
    if (gameState.selectedLetters[gameState.selectedLetters.length - 1] === index) {
      gameState.selectedLetters.pop();
      renderGame();
    }
    return;
  }
  
  // Add letter to selection
  gameState.selectedLetters.push(index);
  
  // Check if selection is complete
  if (gameState.selectedLetters.length === gameState.currentWord.hebrew.length) {
    checkAnswer();
  } else {
    renderGame();
  }
}

function checkAnswer() {
  // Build the word from selected letters
  const selectedWord = gameState.selectedLetters.map(idx => gameState.shuffledLetters[idx]).join('');
  
  // Check if correct
  if (selectedWord === gameState.currentWord.hebrew) {
    // Mark as animating to prevent further selection
    gameState.animatingCorrect = true;
    gameState.wordsCompleted++;
    
    // Add to completed words
    const wordLength = getWordLengthForLevel(gameState.level);
    gameState.completedWords[wordLength].push(gameState.currentWord.hebrew);
    
    // Update level progress
    gameState.currentLevelProgress = 
      (gameState.completedWords[wordLength].length / wordBanks[wordLength].length) * 100;
    
    // Show complete word in slots with animation
    showCorrectAnimation();
    
    // Calculate points with bonus if streak is active
    let pointsEarned = wordLength * 10;
    
    // Apply bonus for streaks of 3 or more
    if (gameState.bonusActive) {
      pointsEarned = Math.round(pointsEarned * 1.5); // 50% bonus
    }
    
    gameState.score += pointsEarned;
    gameState.streak += 1;
    
    // Update bonus status after increasing streak
    gameState.bonusActive = gameState.streak >= 3;
    
    // Show appropriate message
    if (gameState.bonusActive) {
      showMessage(`+${pointsEarned} points with streak bonus! 🔥`);
    } else {
      showMessage(`AWESOME! +${pointsEarned} points!`);
    }
    
    // Create celebration effect
    createConfetti();
    
    // Check for level completion or next word after animation completes
    setTimeout(() => {
      // Check if we've completed all words at this level
      if (gameState.completedWords[wordLength].length === wordBanks[wordLength].length) {
        if (gameState.level < 6) {
          // Instead of immediately going to next level, start a bonus round
          startBonusRound();
        } else {
          // Game complete - all levels finished
          gameState.completed = true;
        }
      } else {
        // If not completed level, set up next word
        if (!gameState.completed) {
          setupWord();
        } else {
          renderGame(); // Show completion screen
        }
      }
    }, 2000);
  } else {
   // Incorrect - reduce lives by 1 (half a heart)
      gameState.lives = Math.max(0, gameState.lives - 1);
      
      // Check if game over
      if (gameState.lives <= 0) {
        gameOver();
        return;
      }
      
      showMessage('Try again! Lost 1 life.');
      highlightWrongSequence();
      
      // Reset streak on error
      gameState.streak = 0;
      gameState.bonusActive = false;
    
    // Reset selection after a delay
    setTimeout(() => {
      gameState.selectedLetters = [];
      renderGame();
    }, 1000);
  }
}

function gameOver() {
  // Compute total words completed:
  const totalCompleted = Object.values(gameState.completedWords).reduce((sum, arr) => sum + arr.length, 0);
  showMessage('GAME OVER!');

  setTimeout(() => {
    gameContainer.innerHTML = `
      <div class="game-over-screen">
        <h1>GAME OVER</h1>
        <p>Your final score: ${gameState.score}</p>
        <p>Words completed: ${totalCompleted}</p>
        <button class="primary-btn" id="restart-btn">PLAY AGAIN</button>
      </div>
    `;
    document.getElementById('restart-btn').addEventListener('click', startGame);
  }, 1500);
}


function startBonusRound() {
  gameState.inBonusRound = true;
  gameState.bonusTimeRemaining = 10; // 10 seconds for bonus round
  
  // Choose a random nikud challenge based on current level
  const levelChallenges = nikudChallenges[gameState.level - 1];
  const randomIndex = Math.floor(Math.random() * levelChallenges.length);
  gameState.currentBonusChallenge = levelChallenges[randomIndex];
  
  // Start the timer
  gameState.bonusTimer = setInterval(() => {
    gameState.bonusTimeRemaining--;
    if (gameState.bonusTimeRemaining <= 0) {
      clearInterval(gameState.bonusTimer);
      endBonusRound(false); // Timeout
    }
    renderGame();
  }, 1000);
  
  renderGame();
}

// Handle bonus round answer selection
function handleBonusSelection(selected) {
  clearInterval(gameState.bonusTimer); // Stop the timer
  
  const isCorrect = selected === gameState.currentBonusChallenge.correct;
  
  if (isCorrect) {
    // Apply rewards
    gameState.bonusReward.extraHints += 3;
    gameState.hintsRemaining += 3;
    gameState.score += 30;
    
    showMessage('CORRECT! +30 points and 3 bonus hints!');
    createConfetti();
    
    // End the bonus round after a brief delay
    setTimeout(() => {
      endBonusRound(true);
    }, 1500);
  } else {
    // Wrong answer: Show feedback with transliteration explanation and a continue button
    gameContainer.innerHTML = `
      <div class="bonus-feedback">
        <p>Not quite right!</p>
        <p>Hint: ${gameState.currentBonusChallenge.transliteration}</p>
        <button id="continue-btn" class="primary-btn">Continue</button>
      </div>
    `;
    document.getElementById('continue-btn').addEventListener('click', () => {
      endBonusRound(false);
    });
  }
}

// End the bonus round and move to the next level
function endBonusRound(wasSuccessful) {
  gameState.inBonusRound = false;
  clearInterval(gameState.bonusTimer);
  
  // Move to next level
  gameState.level += 1;
  
  // Check if we've reached beyond the maximum level
  if (gameState.level > 6) {
    // Set completed flag to true for game completion
    gameState.completed = true;
    renderGame(); // Show completion screen
    return;
  }
  
  // Otherwise, continue with normal level progression
  gameState.currentLevelProgress = 0;
  showMessage(`LEVEL UP! Now playing with ${getWordLengthForLevel(gameState.level)} letter words!`);
  
  // Set up new word for the next level
  setupWord();
}

function showCorrectAnimation() {
  // Get the correct word in the right order
  const correctWord = gameState.currentWord.hebrew;
  
  // Re-render to show all letters in slots
  renderGame();
  
  // Apply animations to letter tiles and slots
  setTimeout(() => {
    // Animate the selected letter tiles
    const tiles = document.querySelectorAll('.letter-tile.selected');
    tiles.forEach(tile => {
      tile.classList.add('correct-animation');
    });
    
    // Animate the slots
    const slots = document.querySelectorAll('.answer-slot');
    slots.forEach((slot, index) => {
      setTimeout(() => {
        slot.classList.add('correct');
      }, index * 150); // Staggered animation
    });
  }, 100);
}

function createConfetti() {
  const celebration = document.createElement('div');
  celebration.className = 'celebration';
  document.body.appendChild(celebration);
  
  // Create confetti pieces
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random position
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '0';
    
    // Random color
    const colors = ['#FFEB3B', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size
    const size = Math.random() * 10 + 5;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    // Random shape
    if (Math.random() > 0.5) {
      confetti.style.borderRadius = '50%';
    } else {
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    }
    
    // Random animation duration
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    
    // Random delay
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;
    
    celebration.appendChild(confetti);
  }
  
  // Remove after animation finishes
  setTimeout(() => {
    if (celebration.parentNode) {
      celebration.parentNode.removeChild(celebration);
    }
  }, 3000);
}

function highlightWrongSequence() {
  const tiles = document.querySelectorAll('.letter-tile');
  gameState.selectedLetters.forEach(index => {
    tiles[index].classList.add('wrong');
  });
}

function resetSelection() {
  if (gameState.animatingCorrect) return;
  gameState.selectedLetters = [];
  renderGame();
}

// Replace your existing getHint function with this one:
function getHint() {
  if (gameState.hintsRemaining <= 0 || gameState.animatingCorrect) return;
  
  // Find the next letter position that needs to be filled
  let nextLetterPosition = 0;
  
  // If the user has selected letters and they are correct, hint for the next position
  if (gameState.selectedLetters.length > 0) {
    // Check if the selected letters are correct so far
    const selectedWord = gameState.selectedLetters.map(idx => gameState.shuffledLetters[idx]).join('');
    const targetWordStart = gameState.currentWord.hebrew.substring(0, gameState.selectedLetters.length);
    
    if (selectedWord === targetWordStart) {
      // Selected letters are correct, hint for the next position
      nextLetterPosition = gameState.selectedLetters.length;
    } else {
      // Selected letters are incorrect, hint for the first position
      nextLetterPosition = 0;
      // Clear incorrect selections before showing the hint
      gameState.selectedLetters = [];
    }
  }
  
  // If all letters are already selected, no hint needed
  if (nextLetterPosition >= gameState.currentWord.hebrew.length) return;
  
  // Get the correct letter for the next position
  const correctLetter = gameState.currentWord.hebrew[nextLetterPosition];
  
  // Find this letter in the shuffled array that's not already selected
  const hintIndex = gameState.shuffledLetters.findIndex((letter, idx) => 
    letter === correctLetter && !gameState.selectedLetters.includes(idx)
  );
  
  if (hintIndex !== -1) {
    // Add this letter to the selection
    gameState.selectedLetters.push(hintIndex);
    gameState.hintsRemaining -= 1;
    gameState.score = Math.max(0, gameState.score - 5);
    
    showMessage(`Hint: Letter ${nextLetterPosition + 1} selected`);
    renderGame();
    
    // If all letters are now selected, check the answer
    if (gameState.selectedLetters.length === gameState.currentWord.hebrew.length) {
      checkAnswer();
    }
  }
}

// Add this new function
function renderLives() {
  const totalHearts = gameState.maxLives / 2; // 5 hearts for 10 lives
  let heartsHTML = '';
  
  for (let i = 0; i < totalHearts; i++) {
    const livesForThisHeart = Math.min(2, Math.max(0, gameState.lives - (i * 2)));
    
    if (livesForThisHeart === 2) {
      // Full heart
      heartsHTML += `
        <div class="heart full-heart">
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E91E63"/>
          </svg>
        </div>
      `;
    } else if (livesForThisHeart === 1) {
      // Half heart
      heartsHTML += `
        <div class="heart half-heart">
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E91E63" opacity="0.5"/>
            <path d="M7.5,3C4.42,3,2,5.42,2,8.5c0,3.78,3.4,6.86,8.55,11.54L12,21.35V5.09C10.91,3.81,9.24,3,7.5,3z" fill="#E91E63"/>
          </svg>
        </div>
      `;
    } else {
      // Empty heart
      heartsHTML += `
        <div class="heart empty-heart">
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#E91E63" stroke-width="1"/>
          </svg>
        </div>
      `;
    }
  }
  
  return heartsHTML;
}

// Add this function for heart styles
function addHeartStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    #game-container {
      position: relative;
      padding-top: 40px;
    }
    
    .lives-container {
      position: absolute;
      top: 10px;
      right: 20px;
      display: flex;
      justify-content: flex-end;
      z-index: 10;
    }
    
    .hearts-display {
      display: flex;
      justify-content: center;
    }
    
    .heart {
      width: 24px;
      height: 24px;
      margin: 0 2px;
    }
    
    .word-to-find {
      margin-top: 5px;
    }
    
    .game-over-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 20px;
      text-align: center;
    }
    
    .game-over-screen h1 {
      font-size: 36px;
      color: #E91E63;
      margin-bottom: 20px;
    }
  `;
  document.head.appendChild(styleElement);
}

document.addEventListener('DOMContentLoaded', addHeartStyles);
function showMessage(text) {
  const messageElement = document.querySelector('.message');
  if (messageElement) {
    messageElement.textContent = text;
  }
}

function renderBonusRound() {
  const challenge = gameState.currentBonusChallenge;

  // Build options buttons HTML
  let optionsHTML = '';
  challenge.options.forEach(option => {
    optionsHTML += `
      <button class="bonus-option" data-option="${option}">
        ${option}
      </button>
    `;
  });

  gameContainer.innerHTML = `
    <div class="bonus-container">
      <div class="bonus-header">
        <h2>BONUS ROUND!</h2>
        <div class="bonus-timer">
          <svg viewBox="0 0 36 36">
            <path d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FFF8E1"
              stroke-width="1"
              stroke-dasharray="100, 100"
            />
            <path d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FFEB3B"
              stroke-width="2"
              stroke-dasharray="${gameState.bonusTimeRemaining * 10}, 100"
            />
          </svg>
          <div class="time-display">${gameState.bonusTimeRemaining}</div>
        </div>
      </div>
      
      <div class="bonus-instruction">
        Select the correct pronunciation of this Hebrew letter
      </div>
      
      <div class="bonus-nikud">
        ${challenge.letter}
      </div>
      
      <div class="bonus-sound-info">
        <span class="sound-name">${challenge.sound}</span>
        <!-- Transliteration explanation is intentionally hidden here -->
      </div>
      
      <div class="bonus-options">
        ${optionsHTML}
      </div>
      
      <div class="message"></div>
    </div>
  `;

  // Add event listeners to bonus option buttons
  document.querySelectorAll('.bonus-option').forEach(button => {
    const option = button.dataset.option;
    button.addEventListener('click', () => handleBonusSelection(option));
  });
}

// Render functions
function renderStartScreen() {
  gameContainer.innerHTML = `
    <div class="start-screen">
      <h1>Hebrew Word Adventure</h1>
      <p>Master Hebrew letters by putting them in the right order!</p>
      <p>Includes special Purim words!</p>
      <button class="primary-btn" id="start-btn">START QUEST</button>
    </div>
  `;
  
  document.getElementById('start-btn').addEventListener('click', startGame);
}

function renderCompletedScreen() {
  // Calculate total words learned
  const totalWords = Object.keys(wordBanks).reduce((sum, level) => 
    sum + wordBanks[level].length, 0
  );
  
  gameContainer.innerHTML = `
    <div class="complete-screen">
      <h1>🏆 QUEST COMPLETE! 🏆</h1>
      <p>Amazing job! You've mastered all ${totalWords} Hebrew words!</p>
      <p style="font-size: 24px; margin: 20px 0;">Final Score: <span style="color: #FFEB3B; font-weight: bold;">${gameState.score}</span></p>
      <button class="primary-btn" id="restart-btn">PLAY AGAIN</button>
    </div>
  `;
  
  document.getElementById('restart-btn').addEventListener('click', startGame);
}

function renderGameScreen() {
  // Calculate progress for current level
  const wordLength = getWordLengthForLevel(gameState.level);
  const totalWordsInLevel = wordBanks[wordLength].length;
  const completedWordsInLevel = gameState.completedWords[wordLength].length;
  const progressPercentage = (completedWordsInLevel / totalWordsInLevel) * 100;

  // Create HTML for letter tiles
  let letterTilesHTML = '';
  for (let i = 0; i < gameState.shuffledLetters.length; i++) {
    const letter = gameState.shuffledLetters[i];
    const isSelected = gameState.selectedLetters.includes(i);
    const selectionOrder = gameState.selectedLetters.indexOf(i) + 1;
    
    letterTilesHTML += `
      <div class="letter-tile ${isSelected ? 'selected' : ''}" data-index="${i}">
        ${letter}
        ${isSelected ? `<div class="order-indicator">${selectionOrder}</div>` : ''}
      </div>
    `;
  }
  
  // For correct answer, we want to display the complete word in the answer slots
  let answerSlotsHTML = '';
  let slotsContent = [];
  
  if (gameState.animatingCorrect) {
    // When animating a correct answer, show the complete Hebrew word in the right order
    slotsContent = gameState.currentWord.hebrew.split('');
  } else {
    // During normal play, show the letters as they are selected
    for (let i = 0; i < gameState.currentWord.hebrew.length; i++) {
      if (gameState.selectedLetters.length > i) {
        const selectedIndex = gameState.selectedLetters[i];
        slotsContent.push(gameState.shuffledLetters[selectedIndex]);
      } else {
        slotsContent.push('');
      }
    }
  }
  
  // Create the answer slots - right-to-left direction
  for (let i = 0; i < gameState.currentWord.hebrew.length; i++) {
    answerSlotsHTML += `
      <div class="answer-slot">
        ${slotsContent[i]}
      </div>
    `;
  }
  
  // Create stats display with stars - all stars lit when streak is active
  let streakStars = '';
  for (let i = 0; i < 3; i++) {
    if (gameState.bonusActive || i < gameState.streak) {
      streakStars += `<span class="streak-star">★</span>`;
    } else {
      streakStars += `<span class="streak-star" style="opacity: 0.3">★</span>`;
    }
  }
  
  // Only show instructions on first word
  const instructionsHTML = gameState.wordsCompleted === 0 
    ? `<div class="instructions">Tap the letters in order to spell the Hebrew word</div>`
    : '';
    
      // Bonus indicator
      const bonusHTML = gameState.bonusActive
        ? `<div class="streak-bonus">x1.5</div>`
        : '';
      
      // Render game screen
         gameContainer.innerHTML = `
           <!-- Hearts at top right -->
           <div class="lives-container">
             <div class="hearts-display">
               ${renderLives()}
             </div>
           </div>
           
           <!-- Game content starts here -->
           <div class="word-to-find">
             ${gameState.currentWord.transliteration.toUpperCase()}
           </div>
           
           <div class="word-meaning">
             ${gameState.currentWord.meaning}
           </div>

           <div class="stats-container">
             <div class="stat-item">
               <div class="stat-label">LEVEL</div>
               <div class="level-badge">${gameState.level}</div>
             </div>
             
             <div class="stat-item">
               <div class="stat-label">SCORE</div>
              <div class="stat-value">${gameState.score}</div>
             </div>
             
             <div class="stat-item">
               <div class="stat-label">STREAK</div>
                <div class="stat-value streak-value">
                   ${streakStars}
                   ${bonusHTML}
                 </div>
             </div>
           </div>

           <div class="stat-item" style="width: 100%; max-width: 320px; margin-bottom: 10px;">
             <div class="stat-label">PROGRESS ${completedWordsInLevel}/${totalWordsInLevel}</div>
             <div class="progress-container">
               <div class="progress-bar" style="width: ${progressPercentage}%"></div>
             </div>
           </div>
           ${instructionsHTML}
           
           <div class="letter-grid ${gameState.level >= 5 ? 'six-letter' : (gameState.level >= 4 ? 'five-letter' : '')}" id="letter-grid">
             ${letterTilesHTML}
           </div>

        
        <div class="answer-slots">
          ${answerSlotsHTML}
        </div>
        
        <div class="controls">
          <button class="icon-button reset-btn" id="reset-btn" title="Reset">
            <svg viewBox="0 0 24 24">
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
          
           <button class="icon-button hint-btn ${gameState.hintsRemaining <= 0 || gameState.animatingCorrect ? 'disabled' : ''}" id="hint-btn" title="Get Hint">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
      <path d="M12 2v1"/>
      <path d="M12 7v1"/>
      <path d="M5.6 5.6l.7.7"/>
      <path d="M18.4 5.6l-.7.7"/>
      <path d="M16.5 13a4.5 4.5 0 10-9 0 4 4 0 002 3.5v1a2.5 2.5 0 005 0v-1c1.2-.8 2-2.1 2-3.5z" fill="#FFEB3B" stroke="#FFC107"/>
    </svg>
    <div class="hint-count">${gameState.hintsRemaining}</div>
  </button>
        </div>
        
        <div class="message"></div>
      `;
      
      // Add touch event listeners to letter tiles
      document.querySelectorAll('.letter-tile').forEach(tile => {
        const index = parseInt(tile.dataset.index);
        tile.addEventListener('click', () => handleLetterSelect(index));
        tile.addEventListener('touchend', (e) => {
          e.preventDefault();
          handleLetterSelect(index);
        });
      });
      
      // Add button event listeners
      document.getElementById('reset-btn').addEventListener('click', resetSelection);
      document.getElementById('hint-btn').addEventListener('click', getHint);
    }

    function renderGame() {
      if (!gameState.active) {
        renderStartScreen();
      } else if (gameState.completed) {
        renderCompletedScreen();
      } else if (gameState.inBonusRound) {
        renderBonusRound();
      } else {
        renderGameScreen();
      }
    }

// Start game
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the gameContainer here
  gameContainer = document.getElementById('game-container');
  
  // Add heart styles
  addHeartStyles();
  
  if (!gameContainer) {
    console.error('Could not find game-container element!');
    return;
  }
  
  // Start game
  renderGame();
});
