// index.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const botDecision = require("./src/bot");

app.use(cors());
app.use(express.json());

// Route utilisée par GoGoKodo
app.get("/action", (req, res) => {
  console.log("GET /action called");
  const decision = botDecision({}); // Aucun body en GET
  res.json(decision);
});

// Route POST facultative pour tes tests locaux
app.post("/action", (req, res) => {
  console.log("POST /action with body:", req.body);
  const gameState = req.body || {};
  const decision = botDecision(gameState);
  res.json(decision);
});

// Page d'accueil
app.get("/", (req, res) => {
  res.send("🤖 Bot-War running. Use GET or POST /action");
});

app.listen(port, () => {
  console.log(`✅ Bot is running on http://localhost:${port}`);
});
