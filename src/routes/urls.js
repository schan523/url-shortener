import express from 'express';
import { createUrl } from '../middleware/createUrl.js';
import { retrieveUrl } from '../middleware/retrieveUrl.js';
import { updateUrl } from '../middleware/updateUrl.js';
import { deleteUrl } from '../middleware/deleteUrl.js';
import { getStats } from '../middleware/getStats.js';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.post("/shorten", createUrl, (req, res) => {
    const response = {
        "id": req.data.id,
        "url": req.data.url,
        "shortCode": req.data.shortCode,
        "createdAt": req.data.createdAt,
        "updatedAt": req.data.updatedAt
    }
    res.status(201).json(response);
})

router.get("/shorten/:shortCode", retrieveUrl, (req, res) => {
    console.log(req.doc);
    res.redirect(req.doc.url);
})

router.put("/shorten/:shortCode", updateUrl, (req, res) => {
    res.status(200).send(req.doc);
})

router.delete("/shorten/:shortCode", deleteUrl, (req, res) => {
    res.status(204).send("No content.");
})

router.get("/shorten/:shortCode/stats", getStats, (req, res) => {
    res.status(200).send(req.doc);
})

router.use(errorHandler);

export { router as urlRouter }