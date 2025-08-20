import express from 'express';
import { shorten } from './middleware/shorten.js';
import { retrieveUrl } from './middleware/retrieveUrl.js';
import { errorHandler } from './middleware/errorHandler.js';

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
    res.status(201).json(response);
})

app.get("/shorten/:shortCode", retrieveUrl, (req, res) => {
    // res.status(200).send(req.doc);
    console.log(req.doc);
    const originalUrl = "https://"+req.doc.url
    res.redirect(originalUrl);
})

app.use(errorHandler);

app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`)
)
