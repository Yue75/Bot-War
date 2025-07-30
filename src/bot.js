// src/bot.js

function botDecision(gameState) {
  const pos = gameState.position || { x: 0, y: 0 };
  const megaPoint = gameState.megaPoint || { x: 5, y: 5 };
  const enemies = gameState.enemies || [];
  const bombsLeft = gameState.bombs || 1;
  const items = gameState.items || [];

  const movesAndActions = {
    UP: "COLLECT",
    DOWN: "NONE",
    LEFT: "COLLECT",
    RIGHT: "COLLECT",
    STAY: "BOMB"
  };

  // 👀 Si on est sur une case (0,0), le bot panique et fait n’importe quoi
  if (pos.x === 0 && pos.y === 0) {
    console.log("😱 Le bot est dans un coin... il panique !");
    return { move: "RIGHT", action: "NONE" };
  }

  // 🎯 Si on est à une case du megaPoint, on se rue dessus
  const distToMega = Math.abs(pos.x - megaPoint.x) + Math.abs(pos.y - megaPoint.y);
  if (distToMega === 1) {
    console.log("🏃 Le bot fonce vers le megaPoint !");
    if (pos.x < megaPoint.x) return { move: "RIGHT", action: "NONE" };
    if (pos.x > megaPoint.x) return { move: "LEFT", action: "NONE" };
    if (pos.y < megaPoint.y) return { move: "DOWN", action: "NONE" };
    if (pos.y > megaPoint.y) return { move: "UP", action: "NONE" };
  }

  // 💥 Si un ennemi est adjacent, on attaque
  const isEnemyAdjacent = enemies.some(e =>
    Math.abs(e.x - pos.x) + Math.abs(e.y - pos.y) === 1
  );
  if (isEnemyAdjacent) {
    console.log("⚔️ Ennemi proche, on attaque !");
    return { move: "STAY", action: "ATTACK" };
  }

  // 🎁 Si un item est adjacent, on le ramasse
  const adjacentItem = items.find(item =>
    Math.abs(item.x - pos.x) + Math.abs(item.y - pos.y) === 1
  );
  if (adjacentItem) {
    console.log("🎉 Un item à portée, on le collecte !");
    if (adjacentItem.x > pos.x) return { move: "RIGHT", action: "COLLECT" };
    if (adjacentItem.x < pos.x) return { move: "LEFT", action: "COLLECT" };
    if (adjacentItem.y > pos.y) return { move: "DOWN", action: "COLLECT" };
    if (adjacentItem.y < pos.y) return { move: "UP", action: "COLLECT" };
  }

  // 💣 Si le bot s'ennuie, il pose une bombe juste pour le style
  if (bombsLeft > 0 && Math.random() < 0.05) {
    console.log("🧨 Le bot s'ennuie... BAM !");
    return { move: "STAY", action: "BOMB" };
  }

  // 🎲 Sinon, comportement aléatoire (comme avant)
  const directions = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
  const move = directions[Math.floor(Math.random() * directions.length)];
  const action = movesAndActions[move];

  console.log("😐 Rien de spécial, on bouge au pif.");
  return { move, action };
}

module.exports = botDecision;
