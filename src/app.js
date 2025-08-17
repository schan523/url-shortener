import express from 'express';
import dotenv from "dotenv";
import { shorten } from './middleware/shorten.js';
import { db } from '../db/mongoConn.js';

dotenv.config()
const app = express();
const PORT = 3000;

app.get('/:id', (req, res) => {
    res.send(`Get ID ${req.params.id}`)
})

app.post("/shorten", shorten, (req, res) => {
    res.sendStatus(201).json({"url": "Some url"})
})

app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`)
)