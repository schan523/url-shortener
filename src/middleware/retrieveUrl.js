import 'mongodb';
import { db } from '../../db/mongoConn.js';
import { validateUrl } from '../utils.js';

export const retrieveUrl = async (req, res, next) => {
    const collection = db.collection("urls")
    const code = req.params.shortCode;

    const doc = await collection.findOne({shortCode: {$eq: code}}, { url: 1, shortCode: 1, createdAt: 1, updatedAt: 1 });
    if (!doc) {
        const err = new Error("A url for this short code could not be found");
        err.status = 404;
        next(err);
    }
    else {
        console.log(doc);
        await collection.updateOne({shortCode: code}, {$inc: {accessCount: 1}});
        const {accessCount, ...doc_} = doc;
        req.doc = doc_;
        req.doc._id = doc._id.toString();
        if (!URL.canParse(req.doc.url)) {
            req.doc.url = "https://" + req.doc.url;
        }
        next();
    }
}