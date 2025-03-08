const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const app = express();
const PORT = 3000;

app.use(cors());

const datasetPath = path.join(__dirname, "dataset", "dataset.csv");
let tongueTwisters = [];

const loadCSV = () => {
    tongueTwisters = []; // Reset before loading
    fs.createReadStream(datasetPath)
        .pipe(csv({ headers: false })) // No headers in CSV
        .on("data", (row) => {
            // Assuming CSV format: id,text
            const id = parseInt(row[0]);
            const text = row[1];
            if (!isNaN(id) && text) tongueTwisters.push({ id, text });
        })
        .on("end", () => {
            console.log(`Loaded ${tongueTwisters.length} tongue twisters.`);
        });
};

// Load CSV on startup
loadCSV();

// 🔹 Get a random tongue twister
app.get("/twister", (req, res) => {
    if (tongueTwisters.length === 0) return res.status(500).json({ error: "Dataset not loaded" });

    const randomIndex = Math.floor(Math.random() * tongueTwisters.length);
    res.json(tongueTwisters[randomIndex]);
});

// 🔹 Get a specific tongue twister by ID
app.get("/twister/:id", (req, res) => {
    if (tongueTwisters.length === 0) return res.status(500).json({ error: "Dataset not loaded" });

    const id = parseInt(req.params.id);
    const twister = tongueTwisters.find((t) => t.id === id);
    if (twister) {
        res.json(twister);
    } else {
        res.status(404).json({ error: "Tongue twister not found" });
    }
});

// 🔹 Get multiple random tongue twisters
app.get("/twisters", (req, res) => {
    if (tongueTwisters.length === 0) return res.status(500).json({ error: "Dataset not loaded" });

    let count = parseInt(req.query.count) || 1;
    count = Math.min(count, tongueTwisters.length);

    const shuffled = [...tongueTwisters].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    res.json(selected);
});

// 🔹 Default 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// 🔹 Start the server
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});
