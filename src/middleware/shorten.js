import { db } from '../../db/mongoConn.js';
import 'mongodb';
import * as crypto from 'crypto';

export const shorten = async (req, res, next) => {
    const collection = db.collection("urls");
    const shortCode = await generateShortCode(collection);
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
    req.id = result.insertedId;
    req.shortCode = data.shortCode;

    next();
}

const generateShortCode = async (collection) => {
    let code;
    let exists = true;

    while (exists) {
        code = crypto.randomBytes(3).toString('hex');
        exists = await collection.findOne({shortCode: {$eq: code}});
    }
    return code;
}