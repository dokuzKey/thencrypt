const crypto = require('crypto');
const { PBKDF2_ITERATIONS, KEY_SIZE, PEPPER } = require('../constants');

exports.deriveKey = (password, salt) => {
    return new Promise((resolve, reject) => {
        const pepperedPassword = password + PEPPER;
        crypto.pbkdf2(pepperedPassword, salt, PBKDF2_ITERATIONS, KEY_SIZE, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key);
        });
    });
};