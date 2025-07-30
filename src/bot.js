// src/bot.js

function botDecision(gameState) {
  const pos = gameState.position || { x: 0, y: 0 };
  const megaPoint = gameState.megaPoint || null;
  const enemies = gameState.enemies || [];
  const bombsLeft = gameState.bombs || 0;
  const items = gameState.items || [];

  let move = "STAY";
  let action = "NONE";

  const isAdjacent = (a, b) =>
    Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;

  // 🥊 1. ATTACK if enemy is adjacent
  const adjacentEnemy = enemies.find(e => isAdjacent(pos, e));
  if (adjacentEnemy) {
    return { move: "STAY", action: "ATTACK" };
  }

  // 💣 2. BOMB if we're at the megaPoint and have bombs
  if (megaPoint && pos.x === megaPoint.x && pos.y === megaPoint.y && bombsLeft > 0) {
    return { move: "STAY", action: "BOMB" };
  }

  // 💎 3. Go toward nearest item
  if (items.length > 0) {
    const nearest = items.reduce((closest, item) => {
      const dist = Math.abs(item.x - pos.x) + Math.abs(item.y - pos.y);
      const closestDist = Math.abs(closest.x - pos.x) + Math.abs(closest.y - pos.y);
      return dist < closestDist ? item : closest;
    });

    if (nearest.x > pos.x) move = "RIGHT";
    else if (nearest.x < pos.x) move = "LEFT";
    else if (nearest.y > pos.y) move = "DOWN";
    else if (nearest.y < pos.y) move = "UP";

    action = "COLLECT";
    return { move, action };
  }

  // 🤷 4. Otherwise, random move
  const directions = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
  move = directions[Math.floor(Math.random() * directions.length)];
  action = "NONE";

  return { move, action };
}

module.exports = botDecision;
