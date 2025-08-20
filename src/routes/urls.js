import express from 'express';
import { shorten } from '../middleware/shorten.js';
import { retrieveUrl } from '../middleware/retrieveUrl.js';
import { updateUrl } from '../middleware/updateUrl.js';
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
    res.redirect(req.doc.url);
})

router.put("/shorten/:shortCode", updateUrl, (req, res) => {
    res.status(200).send(req.doc);
})

router.use(errorHandler);

export { router as urlRouter }