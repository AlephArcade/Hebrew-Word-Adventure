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
