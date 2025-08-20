import 'mongodb';
import * as crypto from 'crypto';

const generateShortCode = async (collection) => {
    let code;
    let exists = true;

    while (exists) {
        code = crypto.randomBytes(3).toString('hex');
        exists = await collection.findOne({shortCode: {$eq: code}});
    }
    return code;
}

const validateUrl = (url) => {
    if (!URL.canParse(url)) {
        let newUrl = "http://" + url;
        if (!URL.canParse(newUrl)) {
            return false;
        }
    }
    return true;
}

export { generateShortCode, validateUrl }