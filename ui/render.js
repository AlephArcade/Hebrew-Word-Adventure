// Rendering functions for Hebrew Word Adventure

import { wordBanks } from '../js/data/word-data.js';
import { gameState, getGameContainer, getWordLengthForLevel } from '../js/core/game-state.js';
import { renderLives } from '../utilities.js';
import { renderBonusRound } from './bonus-round.js';
import { handleLetterSelect, resetSelection, startGame, getHint } from '../js/core/game-logic.js';

// Main rendering function that decides which screen to display
export function renderGame() {
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

// Render the start screen
function renderStartScreen() {
  getGameContainer().innerHTML = `
    <div class="start-screen">
      <h1>Hebrew Word Adventure</h1>
      <p>Master Hebrew letters by putting them in the right order!</p>
      <p>Includes special Purim words!</p>
      <button class="primary-btn" id="start-btn">START QUEST</button>
    </div>
  `;
  
  document.getElementById('start-btn').addEventListener('click', startGame);
}

// Render the game completed screen
function renderCompletedScreen() {
  // Calculate total words learned
  const totalWords = Object.keys(wordBanks).reduce((sum, level) =>
    sum + wordBanks[level].length, 0
  );
  
  getGameContainer().innerHTML = `
    <div class="complete-screen">
      <h1>🏆 QUEST COMPLETE! 🏆</h1>
      <p>Amazing job! You've mastered all ${totalWords} Hebrew words!</p>
      <p style="font-size: 24px; margin: 20px 0;">Final Score: <span style="color: #FFEB3B; font-weight: bold;">${gameState.score}</span></p>
      <button class="primary-btn" id="restart-btn">PLAY AGAIN</button>
    </div>
  `;
  
  document.getElementById('restart-btn').addEventListener('click', startGame);
}

// Update the renderGameScreen function in render.js to implement vertical word stacking

function renderGameScreen() {
  // Calculate progress for current level
  const wordLength = getWordLengthForLevel(gameState.level);
  const totalWordsInLevel = wordBanks[wordLength].length;
  const completedWordsInLevel = gameState.completedWords[wordLength].length;
  const progressPercentage = (completedWordsInLevel / totalWordsInLevel) * 100;

  // Create HTML for letter tiles
  let letterTilesHTML = '';
  for (let i = 0; i < gameState.shuffledLetters.length; i++) {
    // Skip this letter if it's already been used for a completed word part
    if (gameState.completedLetters.includes(i)) continue;
    
    const letter = gameState.shuffledLetters[i];
    const isSelected = gameState.selectedLetters.includes(i);
    const selectionOrder = gameState.selectedLetters.indexOf(i) + 1;
    
 // First, modify your letter tile HTML to include a uniquely identifiable class
letterTilesHTML += `
  <div class="letter-tile tile-${i} ${isSelected ? 'selected' : ''} ${gameState.partialWordCompleted && isSelected ? 'partial-correct-animation' : ''}" 
       data-index="${i}">
    ${letter}
    ${isSelected ? `<div class="order-indicator">${selectionOrder}</div>` : ''}
  </div>
`;

// Then, use a cleanup approach that leverages the cloneNode technique
document.querySelectorAll('.letter-tile').forEach(tile => {
  const index = parseInt(tile.dataset.index);
  // Create a clean copy of the element without event listeners
  const newTile = tile.cloneNode(true);
  // Replace the old element with the new one
  tile.parentNode.replaceChild(newTile, tile);
  // Add fresh event listeners to the new element
  newTile.addEventListener('click', () => handleLetterSelect(index));
  newTile.addEventListener('touchend', (e) => {
    e.preventDefault();
    handleLetterSelect(index);
  });
});
  // Create answer slots for each part of the phrase - VERTICAL STACKING
  let answerSlotsHTML = '';
  
  // Loop through all word parts to create vertical stacking
  gameState.currentWordParts.forEach((wordPart, partIndex) => {
    // Create a container for each word part
    const isCurrentPart = partIndex === gameState.currentPartIndex;
    const isCompletedPart = partIndex < gameState.currentPartIndex;
    
    // Add row class based on status
    const rowClass = isCurrentPart ? 'current-part' : (isCompletedPart ? 'completed-part' : '');
    
    // Start the word row
    answerSlotsHTML += `<div class="word-row ${rowClass}">`;
    
    // For each letter in this word part
    for (let i = 0; i < wordPart.length; i++) {
      let slotContent = '';
      
      if (isCompletedPart) {
        // For completed word parts, show the actual letter
        slotContent = wordPart[i];
      } else if (isCurrentPart && gameState.selectedLetters.length > i) {
        // For current word part, show selected letters
        const selectedIndex = gameState.selectedLetters[i];
        slotContent = gameState.shuffledLetters[selectedIndex];
      }
      
      // Add the slot
      answerSlotsHTML += `
        <div class="answer-slot">
          ${slotContent}
        </div>
      `;
    }
    
    // End the word row
    answerSlotsHTML += `</div>`;
  });

  // Create streak stars
  let streakStars = '';
  for (let i = 0; i < 3; i++) {
    streakStars += `<span class="streak-star" ${!(gameState.bonusActive || i < gameState.streak) ? 'style="opacity: 0.3"' : ''}>★</span>`;
  }

  // Instructions (only on first word, but always keep the div for consistent layout)
  const instructionsHTML = gameState.wordsCompleted === 0
    ? `<div class="instructions">Tap the letters in order to spell the Hebrew word</div>`
    : `<div class="instructions">&nbsp;</div>`;
    
  // Bonus indicator
  const bonusHTML = gameState.bonusActive
    ? `<div class="streak-bonus">x1.5</div>`
    : '';
  
  // Render game screen
  getGameContainer().innerHTML = `
    <!-- Hearts at top right -->
    <div class="lives-container">
      <div class="hearts-display">
        ${renderLives(gameState.lives, gameState.maxLives)}
      </div>
    </div>
    
    <!-- Game content starts here -->
    <div class="game-content-wrapper">
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
     
      <div class="progress-wrapper">
        <div class="progress-inner">
          <div class="stat-label">PROGRESS ${completedWordsInLevel}/${totalWordsInLevel}</div>
          <div class="progress-container">
            <div class="progress-bar" style="width: ${progressPercentage}%"></div>
          </div>
        </div>
      </div>
      
      <div class="letter-grid ${wordLength >= 8 ? 'nine-letter' : (wordLength >= 7 ? 'seven-letter' : (wordLength >= 5 ? 'six-letter' : (wordLength >= 4 ? 'five-letter' : '')))}">
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
        
        <button class="icon-button hint-btn ${gameState.hintsRemaining <= 0 || gameState.animatingCorrect || gameState.partialWordCompleted ? 'disabled' : ''}" id="hint-btn" title="Get Hint">
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
      
      ${instructionsHTML}
      
      <div class="message"></div>
    </div>
  `;
  
  // Add event listeners to letter tiles
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


// In ui/render.js, replace the current event listener code at the end of renderGameScreen()
// FROM:
document.querySelectorAll('.letter-tile').forEach(tile => {
  const index = parseInt(tile.dataset.index);
  tile.addEventListener('click', () => handleLetterSelect(index));
  tile.addEventListener('touchend', (e) => {
    e.preventDefault();
    handleLetterSelect(index);
  });
});

// TO:
const letterGrid = document.querySelector('.letter-grid');
letterGrid.addEventListener('click', (e) => {
  const tile = e.target.closest('.letter-tile');
  if (tile) {
    const index = parseInt(tile.dataset.index);
    handleLetterSelect(index);
  }
});

letterGrid.addEventListener('touchend', (e) => {
  e.preventDefault();
  const tile = e.target.closest('.letter-tile');
  if (tile) {
    const index = parseInt(tile.dataset.index);
    handleLetterSelect(index);
  }
});
