// Main entry point for Hebrew Word Adventure

import { setGameContainer } from './core/game-state.js';
import { renderGame } from './ui/render.js';
import { addHeartStyles, addMultiWordStyles, initializeDevMode } from './utilities.js';

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the game container
  const gameContainer = document.getElementById('game-container');
  
  if (!gameContainer) {
    console.error('Could not find game-container element!');
    return;
  }
  
  // Set up references
  setGameContainer(gameContainer);
  
  // Add required styles
  addHeartStyles();
  addMultiWordStyles();
  
  // Initialize developer mode (secret level skipping)
  initializeDevMode();
  
  // Start the game with the start screen
  renderGame();
});
