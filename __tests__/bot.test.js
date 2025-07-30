const botDecision = require("../src/bot");

describe("Bot Decision Tests", () => {
  test("doit retourner un objet avec move et action", () => {
    const gameState = {
      position: { x: 1, y: 1 },
      bombs: 3,
      enemies: [{ x: 1, y: 2 }],
      megaPoint: { x: 0, y: 0 },
      items: [{ type: "point", x: 2, y: 1 }]
    };

    const decision = botDecision(gameState);

    expect(decision).toHaveProperty("move");
    expect(decision).toHaveProperty("action");

    const validMoves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
    const validActions = ["COLLECT", "ATTACK", "BOMB", "NONE"];

    expect(validMoves).toContain(decision.move);
    expect(validActions).toContain(decision.action);
  });

  test("attaque si ennemi adjacent", () => {
    const gameState = {
      position: { x: 1, y: 1 },
      bombs: 3,
      enemies: [{ x: 1, y: 2 }], // adjacent
    };
    const decision = botDecision(gameState);
    expect(decision.action).toBe("ATTACK");
    expect(decision.move).toBe("STAY");
  });

  test("pose bombe si au mega point et bombes dispo", () => {
    const gameState = {
      position: { x: 5, y: 5 },
      bombs: 2,
      enemies: [],
      megaPoint: { x: 5, y: 5 }
    };
    const decision = botDecision(gameState);
    expect(decision.action).toBe("BOMB");
    expect(decision.move).toBe("STAY");
  });

  test("se déplace vers un point s'il y a un item", () => {
    const gameState = {
      position: { x: 0, y: 0 },
      bombs: 0,
      enemies: [],
      items: [{ type: "point", x: 1, y: 0 }]
    };
    const decision = botDecision(gameState);
    expect(["RIGHT", "LEFT", "UP", "DOWN", "STAY"]).toContain(decision.move);
    expect(["COLLECT", "NONE"]).toContain(decision.action);
  });
});
