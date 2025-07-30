// __tests__/bot.test.js
const botDecision = require("../src/bot");

describe("Bot decision logic", () => {
  test("🧠 Panique dans le coin (0,0)", () => {
    const gameState = { position: { x: 0, y: 0 } };
    const result = botDecision(gameState);
    expect(result.move).toBe("RIGHT");
    expect(result.action).toBe("NONE");
  });

  test("🎯 Fonce sur le megaPoint adjacent", () => {
    const gameState = {
      position: { x: 4, y: 5 },
      megaPoint: { x: 5, y: 5 }
    };
    const result = botDecision(gameState);
    expect(result.move).toBe("RIGHT");
    expect(result.action).toBe("NONE");
  });

  test("⚔️ Attaque un ennemi adjacent", () => {
    const gameState = {
      position: { x: 2, y: 2 },
      enemies: [{ x: 2, y: 3 }]
    };
    const result = botDecision(gameState);
    expect(result.move).toBe("STAY");
    expect(result.action).toBe("ATTACK");
  });

  test("🎁 Collecte un item adjacent à droite", () => {
    const gameState = {
      position: { x: 1, y: 1 },
      items: [{ x: 2, y: 1 }]
    };
    const result = botDecision(gameState);
    expect(result.move).toBe("RIGHT");
    expect(result.action).toBe("COLLECT");
  });

  test("🧨 Peut poser une bombe (stochastique)", () => {
    const gameState = {
      position: { x: 1, y: 1 },
      bombs: 10
    };

    let bombCount = 0;
    for (let i = 0; i < 200; i++) {
      const result = botDecision(gameState);
      if (result.action === "BOMB") {
        bombCount++;
      }
    }
    // Doit poser des bombes de temps en temps
    expect(bombCount).toBeGreaterThan(0);
  });

  test("🎲 Fallback aléatoire donne une direction valide", () => {
    const gameState = { position: { x: 10, y: 10 } };

    const result = botDecision(gameState);
    const validMoves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
    const validActions = ["COLLECT", "NONE", "BOMB"];

    expect(validMoves).toContain(result.move);
    expect(validActions).toContain(result.action);
  });
});
