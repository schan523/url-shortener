import 'mongodb';
import { db } from '../../db/mongoConn.js';

export const getStats = async (req, res, next) => {
    const collection = db.collection("urls");
    const doc = await collection.findOne({shortCode: {$eq: req.params.shortCode}});

    if (!doc) {
        const err = new Error("Not found.");
        err.status = 404;
        next(err);
    }
    else {
        req.doc = doc;
        next();
    }
} 