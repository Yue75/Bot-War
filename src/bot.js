// src/bot.js
function botDecision(gameState) {
  // Stratégie de base : bouge vers le haut et collecte si possible
  return {
    move: "UP",
    action: "COLLECT"
  };
}

module.exports = botDecision;
