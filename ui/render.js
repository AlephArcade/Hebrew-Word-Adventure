// Main entry point for Hebrew Word Adventure

import { setGameContainer } from './core/game-state.js';
import { renderGame } from '/ui/render.js';
import { addHeartStyles, addMultiWordStyles, initializeDevMode } from '/utilities.js';

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - initializing Hebrew Word Adventure');
  
  // Initialize the game container
  const gameContainer = document.getElementById('game-container');
  
  if (!gameContainer) {
    console.error('Could not find game-container element!');
    return;
  }
  
  console.log('Setting up game container');
  
  try {
    // Set up references
    setGameContainer(gameContainer);
    
    // Add required styles
    addHeartStyles();
    addMultiWordStyles();
    
    // Initialize developer mode (secret level skipping)
    initializeDevMode();
    
    // Start the game with the start screen
    console.log('Rendering initial game screen');
    renderGame();
  } catch (error) {
    console.error('Error initializing game:', error);
    
    // Display error visibly
    gameContainer.innerHTML = `
      <div style="color: white; padding: 20px; text-align: center;">
        <h2>Game Initialization Error</h2>
        <p>${error.message}</p>
        <pre style="text-align: left; background: #222; padding: 10px; overflow: auto;">${error.stack}</pre>
      </div>
    `;
  }
});
