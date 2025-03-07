// Game logic for Hebrew Word Adventure

import { wordBanks } from '../data/word-data.js';
import { gameState, getGameContainer, getWordLengthForLevel } from './game-state.js';
import { shuffleArray, showMessage } from '/utilities.js';
import { showCorrectAnimation, showCorrectPartialWordAnimation, highlightWrongSequence, createConfetti } from './animations.js';
import { renderGame } from '/ui/render.js';
import { startBonusRound } from '/ui/bonus-round.js';

// Set up a new word for the game
export function setupWord() {
  const wordLength = getWordLengthForLevel(gameState.level);
  const wordsForLevel = wordBanks[wordLength];
  
  // Get words that haven't been completed yet
  const availableWords = wordsForLevel.filter(word =>
    !gameState.completedWords[wordLength].includes(word.hebrew)
  );
  
  // If no words left at this level
  if (availableWords.length === 0) {
    // Move to next level if available
    if (gameState.level < 9) { // Now go up to level 9
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
  
  // For multi-word phrases, track individual words
  gameState.currentWordParts = gameState.currentWord.hebrew.split(' ');
  gameState.currentPartIndex = 0; // Start with first word
  
  // Shuffle letters for current word/phrase (no spaces for shuffling)
  const lettersArray = gameState.currentWord.hebrew.replace(/\s+/g, '').split('');
  gameState.shuffledLetters = shuffleArray(lettersArray);
  
  // Reset selected letters and other states
  gameState.selectedLetters = [];
  gameState.completedLetters = [];
  gameState.animatingCorrect = false;
  gameState.partialWordCompleted = false;
  
  // Check if bonus is active
  gameState.bonusActive = gameState.streak >= 3;
  
  renderGame();
}

// Rest of the file remains the same...
