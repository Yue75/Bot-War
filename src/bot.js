// src/bot.js

function botDecision(gameState) {
  const directions = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];

  const movesAndActions = {
    UP: "COLLECT",
    DOWN: "NONE",
    LEFT: "COLLECT",
    RIGHT: "COLLECT",
    STAY: "BOMB"
  };

  // Choix aléatoire parmi les mouvements possibles
  const move = directions[Math.floor(Math.random() * directions.length)];
  const action = movesAndActions[move];

  return { move, action };
}

module.exports = botDecision;
