import express from 'express';
import { shorten } from './middleware/shorten.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/:id', (req, res) => {
    res.send(`Get ID ${req.params.id}`)
})

app.post("/shorten", shorten, (req, res) => {
    const response = {
        "id": req.id,
        "url": req.body.url,
        "shortCode": req.shortCode,
        "createdAt": req.createdAt,
        "updatedAt": req.updatedAt
    }
    console.log(response);
    res.status(201).json(response);
})

app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`)
)