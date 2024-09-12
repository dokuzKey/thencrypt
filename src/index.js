const crypto = require('crypto');
const { compress, decompress } = require('./utils/compression');
const { deriveKey } = require('./utils/keyDerivation');
const { encrypt, decrypt } = require('./utils/encryption');
const { hash, verifyHash } = require('./utils/hashing');
const { SALT_SIZE, IV_SIZE, TAG_SIZE } = require('./constants');

class thencrypt {
    constructor(secretKey) {
        if (!secretKey) {
            throw new Error('A secret key is required!');
        }
        this.secretKey = secretKey;
    }

    async encrypt(plaintext) {
        try {
            const compressed = await compress(plaintext);
            const salt = crypto.randomBytes(SALT_SIZE);
            const key = await deriveKey(this.secretKey, salt);
            const { iv, encrypted, tag } = encrypt(compressed, key);
            const dataToHash = Buffer.concat([salt, iv, encrypted, tag]);
            const dataHash = hash(dataToHash);
            const result = Buffer.concat([salt, iv, encrypted, tag, dataHash]);
            return result.toString('base64');
        } catch (error) {
            throw new Error('Encryption failed');
        }
    }

    async decrypt(ciphertext) {
        try {
            const data = Buffer.from(ciphertext, 'base64');
            const salt = data.subarray(0, SALT_SIZE);
            const iv = data.subarray(SALT_SIZE, SALT_SIZE + IV_SIZE);
            const encrypted = data.subarray(SALT_SIZE + IV_SIZE, -TAG_SIZE - 64);
            const tag = data.subarray(-TAG_SIZE - 64, -64);
            const dataHash = data.subarray(-64);

            const dataToVerify = data.subarray(0, -64);
            if (!verifyHash(dataToVerify, dataHash)) {
                console.log('Data integrity check failed');
            }

            const key = await deriveKey(this.secretKey, salt);
            const decrypted = decrypt(encrypted, key, iv, tag);
            const decompressed = await decompress(decrypted);
            return decompressed.toString('utf8');
        } catch (error) {
            throw new Error('Decryption failed');
        }
    }
}

module.exports = thencrypt;