// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const botDecision = require("./src/bot");

app.use(cors());
app.use(express.json());

// Fonction utilitaire pour générer un nombre aléatoire entre min et max inclus
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// GET /action avec un état de jeu aléatoire pour varier la décision
app.get("/action", (req, res) => {
  console.log("GET /action called");

  const gameState = {
    position: { x: randInt(1, 5), y: randInt(1, 5) },
    megaPoint: { x: 5, y: 5 },
    enemies: [{ x: randInt(1, 5), y: randInt(1, 5) }],
    bombs: randInt(0, 3),
    items: [{ x: randInt(1, 5), y: randInt(1, 5) }],
  };

  const decision = botDecision(gameState);
  res.json(decision);
});

// POST /action avec état envoyé par le client
app.post("/action", (req, res) => {
  try {
    console.log("POST /action called with body:", req.body);
    const gameState = typeof req.body === "object" && req.body !== null ? req.body : {};
    const decision = botDecision(gameState);
    res.json(decision);
  } catch (err) {
    console.error("Error handling POST /action:", err);
    res.status(500).json({ error: "Internal bot error" });
  }
});

// Homepage
app.get("/", (req, res) => {
  res.send("🤖 Bot-War running. Use GET or POST /action");
});

app.listen(port, () => {
  console.log(`✅ Bot is running on http://localhost:${port}`);
});
