import 'mongodb';
import { db } from '../../db/mongoConn.js';

export const updateUrl = async (req, res, next) => {
    const collection = db.collection("urls");
    const code = req.params.shortCode;

    const doc = await collection.findOne({shortCode: {$eq: code}});
    const doc_ = await collection.findOne({url: {$eq: req.params.url}});

    if (!req.body.url) {
        const err = new Error("No url was given.");
        err.status = 400;
        next(err);
    }
    else if (!doc) {
        const err = new Error("A url for this short code could not be found.");
        err.status = 404;
        next(err);
    }
    else if (doc_) {
        const err = new Error("a short code for this url already exists.");
        err.status = 400;
        next(err);
    }
    else {
        await collection.updateOne(
            { shortCode: code},
            {
                $set: {"url": req.body.url},
                $inc: {accessCount: 1},
                $currentDate: { "updatedAt": true }
            }
        );
        const newDoc = await collection.findOne({shortCode: {$eq: code}});
        const {accessCount, ...newDoc_} = newDoc;
        req.doc = newDoc_;
        next();
    }
}