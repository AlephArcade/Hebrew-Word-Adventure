// Global variable for game container
let gameContainer;

// Game state initialization
export let gameState = {
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
    6: [],
    7: [],
    8: [],
    9: []
  },
  currentLevelProgress: 0,
  inBonusRound: false,
  bonusTimeRemaining: 0,
  bonusReward: {
    extraHints: 0,
    scoreMultiplier: 1
  },
  lives: 10, // 10 lives = 5 hearts
  maxLives: 10, // Maximum number of lives
  shuffledBonusOptions: [], // For storing randomized bonus options
  // Multi-word support properties
  currentWordParts: [], // Array of individual words in the phrase
  currentPartIndex: 0,  // Which word we're currently solving (0=first, 1=second)
  completedLetters: [], // Letters already used in completed words
  partialWordCompleted: false, // Flag for animation between words
  bonusTimer: null // Timer reference for cleanup
};

// Initialize the game state
export function initializeGame() {
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
      6: [],
      7: [],
      8: [],
      9: []
    },
    currentLevelProgress: 0,
    inBonusRound: false,
    bonusTimeRemaining: 0,
    bonusReward: {
      extraHints: 0,
      scoreMultiplier: 1
    },
    lives: 10,
    maxLives: 10,
    shuffledBonusOptions: [],
    // Multi-word support properties
    currentWordParts: [],
    currentPartIndex: 0,
    completedLetters: [],
    partialWordCompleted: false,
    bonusTimer: null
  };
}

// Helper function to get word length for the current level
export function getWordLengthForLevel(level) {
  return level + 1; // Level 1 = 2-letter words, Level 8 = 9-letter words
}

// Set game container reference
export function setGameContainer(container) {
  gameContainer = container;
}

// Get game container reference
export function getGameContainer() {
  return gameContainer;
}
