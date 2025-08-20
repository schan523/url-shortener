import express from 'express';
import { createUrl } from '../middleware/createUrl.js';
import { retrieveUrl } from '../middleware/retrieveUrl.js';
import { updateUrl } from '../middleware/updateUrl.js';
import { deleteUrl } from '../middleware/deleteUrl.js';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.post("/shorten", createUrl, (req, res) => {
    res.status(201).json(req.data);
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

router.use(errorHandler);

export { router as urlRouter }