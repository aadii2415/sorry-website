const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// Save reply (non-blocking)
app.post("/reply", (req, res) => {
    const message = req.body.message;

    fs.appendFile("replies.txt", message + "\n", (err) => {
        if (err) {
            return res.status(500).json({ status: "Error saving message" });
        }
        res.json({ status: "Your message reached my heart ❤️" });
    });
});

// Get all replies
app.get("/messages", (req, res) => {
    fs.readFile("replies.txt", "utf-8", (err, data) => {
        if (err) {
            return res.send("No messages yet 💌");
        }
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});