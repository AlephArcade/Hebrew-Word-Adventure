// Game logic for Hebrew Word Adventure

import { wordBanks } from '../data/word-data.js';
import { gameState, getGameContainer, getWordLengthForLevel } from './game-state.js';
import { shuffleArray, showMessage } from '../../utilities.js';
import { showCorrectAnimation, showCorrectPartialWordAnimation, highlightWrongSequence, createConfetti } from './animations.js';
import { renderGame } from '../../ui/render.js';
import { startBonusRound } from '../../ui/bonus-round.js';

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

// Handle letter selection
export function handleLetterSelect(index) {
  // Don't allow selection during animations
  if (gameState.animatingCorrect || gameState.partialWordCompleted) return;
  
  // Check if already selected
  if (gameState.selectedLetters.includes(index)) {
    // If this is the last letter selected, deselect it
    if (gameState.selectedLetters[gameState.selectedLetters.length - 1] === index) {
      gameState.selectedLetters.pop();
      renderGame();
    }
    return;
  }
  
  // Check if this letter is part of completed words
  if (gameState.completedLetters.includes(index)) return;
  
  // Add letter to selection
  gameState.selectedLetters.push(index);
  
  // Get current word part length
  const currentWordLength = gameState.currentWordParts[gameState.currentPartIndex].length;
  
  // Check if selection is complete for current word part
  if (gameState.selectedLetters.length === currentWordLength) {
    if (gameState.currentWordParts.length > 1) {
      // For multi-word phrases, check each word separately
      checkPartialAnswer();
    } else {
      // For single words, check the full answer
      checkAnswer();
    }
  } else {
    renderGame();
  }
}

// Check partial answer (first word in multi-word phrase)
export function checkPartialAnswer() {
  // Build the selected word
  const selectedWord = gameState.selectedLetters.map(idx => gameState.shuffledLetters[idx]).join('');
  const targetWord = gameState.currentWordParts[gameState.currentPartIndex];
  
  if (selectedWord === targetWord) {
    // First word is correct
    gameState.partialWordCompleted = true;
    showCorrectPartialWordAnimation();
    
    // Show message for first word
    showMessage(`First word correct: "${targetWord}"!`);
    
    // After animation completes, move to the next word
    setTimeout(() => {
      // Store completed letters
      gameState.completedLetters = [...gameState.completedLetters, ...gameState.selectedLetters];
      
      // Move to next word part
      gameState.currentPartIndex++;
      gameState.selectedLetters = [];
      gameState.partialWordCompleted = false;
      
      // If all word parts are completed, check the entire phrase
      if (gameState.currentPartIndex >= gameState.currentWordParts.length) {
        checkAnswer(); // The whole phrase is completed
      } else {
        // Continue with next word
        renderGame();
      }
    }, 1500); // Time for animation to complete
  } else {
    // First word is incorrect
    gameState.lives = Math.max(0, gameState.lives - 1);
    
    if (gameState.lives <= 0) {
      gameOver();
      return;
    }
    
    showMessage('Try again! Lost 1 life.');
    highlightWrongSequence();
    
    // Reset streak on error
    gameState.streak = 0;
    gameState.bonusActive = false;
    
    // Reset selection for current word part only
    setTimeout(() => {
      gameState.selectedLetters = [];
      renderGame();
    }, 1000);
  }
}

// Check full answer
export function checkAnswer() {
  // For multi-word phrases that have already validated individual words
  if (gameState.currentWordParts.length > 1 && gameState.currentPartIndex >= gameState.currentWordParts.length) {
    // All words have been validated individually, so mark as complete without additional message
    handleCorrectAnswer(true); // Pass true to indicate this is completing a multi-word phrase
    return;
  }
  
  // For single words or the last word of a phrase
  // Build the word from selected letters
  const selectedWord = gameState.selectedLetters.map(idx => gameState.shuffledLetters[idx]).join('');
  
  // Check if correct
  if (selectedWord === gameState.currentWord.hebrew.replace(/\s+/g, '') || 
      selectedWord === gameState.currentWordParts[gameState.currentPartIndex]) {
    handleCorrectAnswer(false); // Normal completion message
  } else {
    // Incorrect
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

// Handle correct answer
export function handleCorrectAnswer(skipMessage = false) {
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
      
  // Show appropriate message if not skipping message
  // Skip message when completing a multi-word phrase that already had messages for each word
  if (!skipMessage) {
    if (gameState.bonusActive) {
      showMessage(`+${pointsEarned} points with streak bonus! 🔥`);
    } else {
      showMessage(`AWESOME! +${pointsEarned} points!`);
    }
  }
      
  // Create celebration effect
  createConfetti();
      
  // Check for level completion or next word after animation completes
  setTimeout(() => {
    // Check if we've completed all words at this level
    if (gameState.completedWords[wordLength].length === wordBanks[wordLength].length) {
      if (gameState.level < 9) {
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
}

// Game over - display game over screen and final score
export function gameOver() {
  // Compute total words completed:
  const totalCompleted = Object.values(gameState.completedWords).reduce((sum, arr) => sum + arr.length, 0);
  showMessage('GAME OVER!');
 
  setTimeout(() => {
    getGameContainer().innerHTML = `
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

// Reset letter selections
export function resetSelection() {
  if (gameState.animatingCorrect || gameState.partialWordCompleted) return;
  gameState.selectedLetters = [];
  renderGame();
}

// Start the game
export function startGame() {
  import('./game-state.js').then(({ initializeGame }) => {
    initializeGame();
    setupWord();
  });
}

// Get hint for the next letter - Adding the missing function
export function getHint() {
  if (gameState.hintsRemaining <= 0 || gameState.animatingCorrect || gameState.partialWordCompleted) return;
  
  // Find the next letter position that needs to be filled
  let nextLetterPosition = 0;
  
  // Get the current word part we're working on
  const currentWordPart = gameState.currentWordParts[gameState.currentPartIndex];
  
  // If the user has selected letters and they are correct, hint for the next position
  if (gameState.selectedLetters.length > 0) {
    // Check if the selected letters are correct so far
    const selectedWord = gameState.selectedLetters.map(idx => gameState.shuffledLetters[idx]).join('');
    const targetWordStart = currentWordPart.substring(0, gameState.selectedLetters.length);
    
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
  
  // If all letters for current word part are already selected, no hint needed
  if (nextLetterPosition >= currentWordPart.length) return;
  
  // Get the correct letter for the next position
  const correctLetter = currentWordPart[nextLetterPosition];
  
  // Find this letter in the shuffled array that's not already selected
  // and not part of completed words
  const hintIndex = gameState.shuffledLetters.findIndex((letter, idx) =>
    letter === correctLetter && 
    !gameState.selectedLetters.includes(idx) &&
    !gameState.completedLetters.includes(idx)
  );
  
  if (hintIndex !== -1) {
    // Add this letter to the selection
    gameState.selectedLetters.push(hintIndex);
    gameState.hintsRemaining -= 1;
    gameState.score = Math.max(0, gameState.score - 5);
    
    // Customize message based on multi-word status
    if (gameState.currentWordParts.length > 1) {
      showMessage(`Hint: Letter ${nextLetterPosition + 1} of word ${gameState.currentPartIndex + 1} selected`);
    } else {
      showMessage(`Hint: Letter ${nextLetterPosition + 1} selected`);
    }
    
    renderGame();
    
    // If all letters for current word part are now selected, check the answer
    if (gameState.selectedLetters.length === currentWordPart.length) {
      if (gameState.currentWordParts.length > 1) {
        checkPartialAnswer();
      } else {
        checkAnswer();
      }
    }
  }
}
