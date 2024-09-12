const crypto = require('crypto');
const { IV_SIZE } = require('../constants');

exports.encrypt = (data, key) => {
    const iv = crypto.randomBytes(IV_SIZE);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const tag = cipher.getAuthTag();
    return { iv, encrypted, tag };
};

exports.decrypt = (encrypted, key, iv, tag) => {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
};
