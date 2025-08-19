import { db } from '../../db/mongoConn.js';

export const shorten = (req, res, next) => {
    const collection = db.collection("urls");
    const data = {"url": req.body.url};
    const result = collection.insertOne(data);
    next();
}

