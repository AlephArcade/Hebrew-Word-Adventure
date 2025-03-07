// Debug script for Hebrew Word Adventure
console.log('Debug script loaded');

// Test if game container exists
const gameContainer = document.getElementById('game-container');
console.log('Game container found:', !!gameContainer);

// Show any JavaScript errors
window.addEventListener('error', function(event) {
  console.error('JavaScript error:', event.error);
  
  // Display error on screen
  const errorDiv = document.createElement('div');
  errorDiv.style.color = 'red';
  errorDiv.style.backgroundColor = 'white';
  errorDiv.style.padding = '10px';
  errorDiv.style.margin = '10px';
  errorDiv.style.borderRadius = '5px';
  errorDiv.style.fontFamily = 'monospace';
  errorDiv.style.whiteSpace = 'pre-wrap';
  errorDiv.textContent = `Error: ${event.error.message}\n\nStack: ${event.error.stack}`;
  
  document.body.appendChild(errorDiv);
});
