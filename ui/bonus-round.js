// Bonus round functionality for Hebrew Word Adventure

import { nikudChallenges } from '../js/data/nikud-data.js';
import { gameState, getGameContainer } from '../js/core/game-state.js';
import { shuffleArray, showMessage } from '../utilities.js';
import { createConfetti } from '../js/core/animations.js';
import { renderGame } from './render.js';
import { setupWord } from '../js/core/game-logic.js';

// Start a bonus round
export function startBonusRound() {
  gameState.inBonusRound = true;
  gameState.bonusTimeRemaining = 10; // 10 seconds for bonus round
  
  // Rest of the startBonusRound function...
  
  // Choose a random nikud challenge based on current level
  // Use the current level's challenges, or level 6 challenges if level > 6
  const challengeLevel = Math.min(gameState.level - 1, nikudChallenges.length - 1);
  const levelChallenges = nikudChallenges[challengeLevel];
  const randomIndex = Math.floor(Math.random() * levelChallenges.length);
  gameState.currentBonusChallenge = levelChallenges[randomIndex];
  
  // Shuffle the options ONCE at the start and store in game state
  gameState.shuffledBonusOptions = shuffleArray([...gameState.currentBonusChallenge.options]);
  
  // Clear any existing timer
  if (gameState.bonusTimer) {
    clearInterval(gameState.bonusTimer);
  }
  
  // Start the timer
  gameState.bonusTimer = setInterval(() => {
    gameState.bonusTimeRemaining--;
    if (gameState.bonusTimeRemaining <= 0) {
      clearInterval(gameState.bonusTimer);
      endBonusRound(false); // Timeout
    }
    renderGame(); // This will call renderBonusRound without re-shuffling
  }, 1000);
  
  renderGame();
}

// End the bonus round and move to the next level
export function endBonusRound(wasSuccessful) {
  gameState.inBonusRound = false;
  
  if (gameState.bonusTimer) {
    clearInterval(gameState.bonusTimer);
    gameState.bonusTimer = null;
  }
  
  // Move to next level
  gameState.level += 1;
  
  // Check if we've reached beyond the maximum level
  if (gameState.level > 9) {
    // Set completed flag to true for game completion
    gameState.completed = true;
    renderGame(); // Show completion screen
    return;
  }
  
  // Otherwise, continue with normal level progression
  gameState.currentLevelProgress = 0;
  showMessage(`LEVEL UP! Now playing with ${gameState.level + 1} letter words!`);
  
  // Set up new word for the next level
  setupWord();
}

// Handle bonus round answer selection
export function handleBonusSelection(selected) {
  if (gameState.bonusTimer) {
    clearInterval(gameState.bonusTimer);
    gameState.bonusTimer = null;
  }
  
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
    getGameContainer().innerHTML = `
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

// Render the bonus round screen
export function renderBonusRound() {
  const challenge = gameState.currentBonusChallenge;
  
  // Use the pre-shuffled options from gameState
  let optionsHTML = '';
  gameState.shuffledBonusOptions.forEach(option => {
    optionsHTML += `
      <button class="bonus-option" data-option="${option}">
        ${option}
      </button>
    `;
  });

  getGameContainer().innerHTML = `
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
