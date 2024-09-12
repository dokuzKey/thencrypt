const crypto = require('crypto');
const { HASH_SEED, HMAC_KEY } = require('../constants');

exports.hash = (data) => {
    const hmac = crypto.createHmac('sha512', HMAC_KEY);
    hmac.update(data);
    return hmac.digest();
};

exports.verifyHash = (data, hash) => crypto.timingSafeEqual(exports.hash(data), hash);