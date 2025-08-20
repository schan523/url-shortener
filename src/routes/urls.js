import express from 'express';
import { shorten } from '../middleware/shorten.js';
import { retrieveUrl } from '../middleware/retrieveUrl.js';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.post("/shorten", shorten, (req, res) => {
    const response = {
        "id": req.id,
        "url": req.body.url,
        "shortCode": req.shortCode,
        "createdAt": req.createdAt,
        "updatedAt": req.updatedAt
    }
    res.status(201).json(response);
})

router.get("/shorten/:shortCode", retrieveUrl, (req, res) => {
    // res.status(200).send(req.doc);
    console.log(req.doc);
    const originalUrl = "https://"+req.doc.url
    res.redirect(originalUrl);
})

router.use(errorHandler);

export { router as urlRouter }