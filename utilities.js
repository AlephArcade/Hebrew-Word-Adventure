// Utility functions for Hebrew Word Adventure

// Shuffle an array using Fisher-Yates algorithm
export function shuffleArray(array) {
  // Clone the array to avoid modifying the original
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Display a message to the user
export function showMessage(text) {
  const messageElement = document.querySelector('.message');
  if (messageElement) {
    messageElement.textContent = text;
  }
}

// Add heart styles to the document
export function addHeartStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    #game-container {
      position: relative;
      padding-top: 40px;
    }
    
    .lives-container {
      position: absolute;
      top: 10px;
      right: 0;
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
      color: #FFF8E1;
      margin-bottom: 20px;
    }
  `;
  document.head.appendChild(styleElement);
}

// Add multi-word styles to the document
export function addMultiWordStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Update letter grid for more letters */
    .letter-grid.seven-letter {
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    
    .letter-grid.nine-letter {
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    
    /* Adjust tile size for longer words */
    .letter-grid.seven-letter .letter-tile,
    .letter-grid.nine-letter .letter-tile {
      height: 80px;
      font-size: 32px;
    }
    
    /* Word separator styling */
    .word-separator {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFEB3B;
      font-size: 24px;
      margin: 0 5px;
      opacity: 0.7;
    }
    
    /* Answer slot styles for multi-word phrases */
    .answer-slot.current-part {
      border-color: #FFEB3B;
    }
    
    .answer-slot.completed-part {
      background-color: rgba(76, 175, 80, 0.3);
      border-color: #4CAF50;
      color: #FFF8E1;
    }
    
    /* Animation for partial word completion */
    .partial-correct-animation {
      animation: partialPulse 0.5s ease-in-out 3;
    }
    
    @keyframes partialPulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.5; }
      100% { transform: scale(0.95); opacity: 0; }
    }
    
    /* For smallest screens, make slots smaller for long phrases */
    @media screen and (max-width: 360px) {
      .answer-slots:has(> .answer-slot:nth-child(7)) .answer-slot {
        width: 35px;
        height: 35px;
        font-size: 18px;
      }
    }
  `;
  document.head.appendChild(styleElement);
}

// Render hearts for lives display
export function renderLives(lives, maxLives) {
  const totalHearts = maxLives / 2; // 5 hearts for 10 lives
  let heartsHTML = '';
  
  for (let i = 0; i < totalHearts; i++) {
    const livesForThisHeart = Math.min(2, Math.max(0, lives - (i * 2)));
    
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

// Add this to utilities.js

// Secret developer mode functionality
export function initializeDevMode() {
  // Track clicks on the level badge for secret activation
  let levelBadgeTaps = 0;
  let tapTimer = null;
  
  // Add a global keyboard shortcut (Alt+Shift+L)
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.key === 'L') {
      showLevelSelector();
    }
  });
  
  // Watch for DOM changes to attach the level badge click handler
  const observer = new MutationObserver(mutations => {
    const levelBadge = document.querySelector('.level-badge');
    if (levelBadge && !levelBadge.hasAttribute('data-dev-listener')) {
      levelBadge.setAttribute('data-dev-listener', 'true');
      
      // Add click handler to the level badge
      levelBadge.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent clicks from bubbling
        
        levelBadgeTaps++;
        
        // Clear existing timer
        if (tapTimer) clearTimeout(tapTimer);
        
        // Set a new timer (reset count if no taps within 1.5 seconds)
        tapTimer = setTimeout(() => {
          levelBadgeTaps = 0;
        }, 1500);
        
        // If 5 taps detected within time window, show level selector
        if (levelBadgeTaps >= 5) {
          levelBadgeTaps = 0;
          showLevelSelector();
        }
      });
    }
  });
  
  // Start observing the document for DOM changes
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
}

// Show the level selector overlay
function showLevelSelector() {
  import('./core/game-state.js').then(module => {
    const { gameState, getGameContainer } = module;
    const { level } = gameState;
    
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.className = 'dev-mode-overlay';
    overlay.innerHTML = `
      <div class="dev-mode-panel">
        <h2>Developer Mode</h2>
        <p>Current Level: ${level}</p>
        <div class="level-buttons">
          ${Array.from({length: 9}, (_, i) => i + 1).map(lvl => 
            `<button class="level-btn ${lvl === level ? 'current' : ''}" data-level="${lvl}">Level ${lvl}</button>`
          ).join('')}
        </div>
        <div class="dev-actions">
          <button id="dev-close-btn">Close</button>
          <button id="reset-progress-btn">Reset All Progress</button>
        </div>
      </div>
    `;
    
    // Add styles inline to keep it self-contained
    const style = document.createElement('style');
    style.textContent = `
      .dev-mode-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
      }
      .dev-mode-panel {
        background: #1E1E1E;
        border: 2px solid #FFEB3B;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 320px;
        color: #FFFFFF;
      }
      .dev-mode-panel h2 {
        color: #FFEB3B;
        margin-top: 0;
        text-align: center;
        border-bottom: 1px solid #FFEB3B;
        padding-bottom: 10px;
      }
      .level-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 20px 0;
      }
      .level-btn {
        background: #333;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 4px;
        cursor: pointer;
      }
      .level-btn.current {
        background: #FFEB3B;
        color: #333;
        font-weight: bold;
      }
      .dev-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
      .dev-actions button {
        padding: 8px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      #dev-close-btn {
        background: #4CAF50;
        color: white;
      }
      #reset-progress-btn {
        background: #F44336;
        color: white;
      }
    `;
    
    // Add to DOM
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    // Add event listeners
    document.querySelectorAll('.level-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLevel = parseInt(btn.dataset.level);
        skipToLevel(targetLevel);
        document.body.removeChild(overlay);
      });
    });
    
    document.getElementById('dev-close-btn').addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
    
    document.getElementById('reset-progress-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all progress?')) {
        resetAllProgress();
        document.body.removeChild(overlay);
      }
    });
  });
}

// Skip to a specific level
function skipToLevel(targetLevel) {
  import('./core/game-state.js').then(module => {
    const { gameState } = module;
    import('./core/game-logic.js').then(gameLogic => {
      // Set the level
      gameState.level = targetLevel;
      
      // Clear completed words for the target level to ensure new words
      const wordLength = targetLevel + 1;
      gameState.completedWords[wordLength] = [];
      
      // Reset progress for the level
      gameState.currentLevelProgress = 0;
      
      // Set up a new word at this level
      gameLogic.setupWord();
      
      console.log(`Developer mode: Skipped to level ${targetLevel}`);
    });
  });
}

// Reset all game progress
function resetAllProgress() {
  import('./core/game-state.js').then(module => {
    const { initializeGame } = module;
    import('./core/game-logic.js').then(gameLogic => {
      // Reset everything
      initializeGame();
      gameLogic.setupWord();
      console.log('Developer mode: Reset all progress');
    });
  });
}
