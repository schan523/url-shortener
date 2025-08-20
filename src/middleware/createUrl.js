import { db } from '../../db/mongoConn.js';
import 'mongodb';
import { generateShortCode, validateUrl} from '../utils.js';

export const createUrl = async (req, res, next) => {
    const collection = db.collection("urls");
    const shortCode = await generateShortCode(collection);

    const exists = await collection.findOne({url: {$eq: req.body.url}});
    if (!(req.body.url && validateUrl(req.body.url))) {
        const err = new Error("Invalid url.");
        err.status = 400;
        next(err);
    }
    else if (exists) {
        const err = new Error("A shortCode for this url already exists.");
        err.status = 400;
        next(err);
    }   
    else {
        const time = new Date();
        req.createdAt = time;
        req.updatedAt = time;

        const data = {
            "url": req.body.url,
            "shortCode": shortCode,
            "createdAt": req.createdAt,
            "updatedAt": req.updatedAt
        };

        const result = await collection.insertOne(data);
        req.data = data;
        next();
    }
}
