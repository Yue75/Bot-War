// __tests__/bot.test.js
const botDecision = require("../src/bot");

describe("Bot Decision Logic", () => {
  it("should return a valid action format", () => {
    const result = botDecision({});
    expect(result).toHaveProperty("move");
    expect(result).toHaveProperty("action");
    expect(["UP", "DOWN", "LEFT", "RIGHT", "STAY"]).toContain(result.move);
    expect(["BOMB", "COLLECT", "NONE"]).toContain(result.action);
  });
});
