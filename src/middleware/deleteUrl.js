import "mongodb";
import { db } from "../../db/mongoConn.js";

export const deleteUrl = async (req, res, next) => {
    const collection = db.collection("urls");
    const doc = await collection.findOne({shortCode: {$eq: req.params.shortCode}});

    if (!doc) {
        const err = new Error("A url matching this short code was not found.");
        err.status = 404;
        next(err);
    }
    else {
        await collection.deleteOne({ shortCode: req.params.shortCode});
        console.log("finished deleting this url");
        next();
    }
}