// src/bot.js
// Logique simple :
// - Si on est au centre (mega point), on attaque,
// - Sinon on collecte si possible,
// - Sinon on se déplace aléatoirement,
// - Place une bombe si on a des ennemis proches.

function botDecision(gameState) {
  // gameState exemple (à adapter selon format réel) :
  // {
  //   position: { x: 2, y: 3 },
  //   points: 5,
  //   bombs: 1,
  //   grid: [...], // grille du jeu
  //   enemies: [ {x:3,y:3}, ... ],
  //   megaPoint: {x: 2, y:2},
  //   items: [ {type:'point', x:1, y:2}, ...]
  // }

  // Par défaut, mouvement et action
  let move = "STAY";
  let action = "NONE";

  const pos = gameState.position || { x: 0, y: 0 };
  const megaPoint = gameState.megaPoint || null;
  const enemies = gameState.enemies || [];
  const bombsLeft = gameState.bombs || 0;

  // Fonction utilitaire pour détecter si un ennemi est adjacent
  function isEnemyAdjacent() {
    return enemies.some(e => 
      (Math.abs(e.x - pos.x) + Math.abs(e.y - pos.y)) === 1
    );
  }

  // Si ennemi adjacent, on attaque
  if (isEnemyAdjacent()) {
    action = "ATTACK";
    move = "STAY";
  }
  // Sinon si au mega point, on place une bombe si possible
  else if (megaPoint && pos.x === megaPoint.x && pos.y === megaPoint.y && bombsLeft > 0) {
    action = "BOMB";
    move = "STAY";
  }
  // Sinon si point proche, on se déplace vers lui
  else if (gameState.items && gameState.items.length > 0) {
    const nearest = gameState.items[0]; // On prend le premier item (simplification)
    if (nearest.x > pos.x) move = "RIGHT";
    else if (nearest.x < pos.x) move = "LEFT";
    else if (nearest.y > pos.y) move = "DOWN";
    else if (nearest.y < pos.y) move = "UP";
    action = "COLLECT";
  }
  // Sinon on bouge aléatoirement
  else {
    const moves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
    move = moves[Math.floor(Math.random() * moves.length)];
    action = "NONE";
  }

  return { move, action };
}

module.exports = botDecision;
