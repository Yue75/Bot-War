const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const botDecision = require("./src/bot");

app.use(cors());
app.use(express.json());

app.all("/action", (req, res) => {
  console.log(`Received ${req.method} request on /action with body:`, req.body);
  const gameState = req.body || {};
  const decision = botDecision(gameState);
  res.json(decision);
});

app.get("/", (req, res) => {
  res.send("🤖 Bot-War running. Use POST /action");
});

app.listen(port, () => {
  console.log(`Bot running on http://localhost:${port}`);
});
