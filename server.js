const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// Save her reply
app.post("/reply", (req, res) => {
    const message = req.body.message;

    fs.appendFileSync("replies.txt", message + "\n");

    res.json({ status: "Your message reached my heart ❤️" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
