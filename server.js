const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Load tongue twisters from CSV
const csvPath = path.join(__dirname, "dataset/dataset.csv");
const tongueTwisters = fs.readFileSync(csvPath, "utf-8")
  .split("\n")
  .map(line => line.replace(/\r/g, "")) 
  .filter(line => line)
  .map((line, index) => ({ id: index, text: line.split(",")[1].trim() })); // Trim spaces

// Get a random tongue twister
app.get("/twister", (req, res) => {
  const randomTwister = tongueTwisters[Math.floor(Math.random() * tongueTwisters.length)];
  res.json(randomTwister);
});

// Get a tongue twister by ID
app.get("/twister/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const twister = tongueTwisters.find(t => t.id === id);
  if (twister) res.json(twister);
  else res.status(404).json({ error: "Not found" });
});

// Get multiple random tongue twisters
app.get("/twisters", (req, res) => {
  const count = parseInt(req.query.count) || 1;
  const randomTwisters = Array.from({ length: count }, () =>
    tongueTwisters[Math.floor(Math.random() * tongueTwisters.length)]
  );
  res.json(randomTwisters);
});

// Vercel handler
module.exports = app;
