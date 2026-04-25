const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// File path
const FILE_PATH = path.join(__dirname, "replies.txt");

// ✅ Save reply
app.post("/reply", (req, res) => {
    const message = req.body.message;

    // Basic validation
    if (!message || message.trim() === "") {
        return res.status(400).json({ status: "Message cannot be empty 💌" });
    }

    const time = new Date().toLocaleString();
    const data = `${time} - ${message}\n`;

    fs.appendFile(FILE_PATH, data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "Error saving message 💔" });
        }

        res.json({ status: "Your message reached my heart ❤️" });
    });
});

// ✅ Get all messages (optional feature)
app.get("/messages", (req, res) => {
    fs.readFile(FILE_PATH, "utf-8", (err, data) => {
        if (err) {
            return res.send("No messages yet 💌");
        }
        res.send(data);
    });
});

// ✅ Root route (IMPORTANT for Render if not using index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});