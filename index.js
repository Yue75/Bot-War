const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const botDecision = require("./src/bot");

app.use(cors());
app.use(express.json());

// GET /action
app.get("/action", (req, res) => {
  console.log("GET /action called");
  const decision = botDecision({});
  res.json(decision);
});

// POST /action
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
