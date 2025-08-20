import 'mongodb';
import { db } from '../../db/mongoConn.js';
import { validateUrl } from '../utils.js';

export const retrieveUrl = async (req, res, next) => {
    const collection = db.collection("urls")
    const code = req.params.shortCode;

    const doc = await collection.findOne({shortCode: {$eq: code}});
    if (!doc) {
        const err = new Error("A url for this short code could not be found");
        err.status = 404;
        next(err);
    }
    else {
        req.doc = doc;
        req.doc._id = doc._id.toString();
        if (!URL.canParse(req.doc.url)) {
            req.doc.url = "https://" + req.doc.url;
        }
        next();
    }
}