// index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const botDecision = require("./src/bot");

app.use(express.json());

app.get("/action", (req, res) => {
  const gameState = req.body || {};
  const decision = botDecision(gameState);
  res.json(decision);
});

app.listen(port, () => {
  console.log(`Bot is running on http://localhost:${port}`);
});
