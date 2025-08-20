import 'mongodb';
import { db } from '../../db/mongoConn.js';

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
        next();
    }
}