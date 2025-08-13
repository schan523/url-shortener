const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({"message": "test message"})
})

app.post("/shorten", (req, res) => {
    res.sendStatus(201).json({"url": "Some url"})
})

app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`)
)