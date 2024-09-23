import crypto from 'crypto';
import { compress, decompress } from './utils/compression';
import { deriveKey } from './utils/keyDerivation';
import { encrypt, decrypt } from './utils/encryption';
import { hash } from './utils/hashing';
import { SALT_SIZE, IV_SIZE, TAG_SIZE } from './constants';

class Thencrypt {
    private secretKey: string;

    constructor(secretKey: string) {
        if (!secretKey) {
            throw new Error('A secret key is required!');
        }
        this.secretKey = secretKey;
    }

    async encrypt(plaintext: string): Promise<string> {
        try {
            const compressed = await compress(plaintext);
            const salt = crypto.randomBytes(SALT_SIZE);
            const key = await deriveKey(this.secretKey, salt);
            const { iv, encrypted, tag } = encrypt(compressed, key);
            const dataToHash = Buffer.concat([salt, iv, encrypted, tag]);
            const dataHash = hash(dataToHash);
            const result = Buffer.concat([salt, iv, encrypted, tag, dataHash]);
            return result.toString('base64');
        } catch (error: any) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    }

    async decrypt(ciphertext: string): Promise<string> {
        try {
            const data = Buffer.from(ciphertext, 'base64');
            const salt = data.subarray(0, SALT_SIZE);
            const iv = data.subarray(SALT_SIZE, SALT_SIZE + IV_SIZE);
            const encrypted = data.subarray(SALT_SIZE + IV_SIZE, -TAG_SIZE - 64);
            const tag = data.subarray(-TAG_SIZE - 64, -64);
    
            const key = await deriveKey(this.secretKey, salt);
            const decrypted = decrypt(encrypted, key, iv, tag);
            const decompressed = await decompress(decrypted);
            return decompressed.toString('utf8');
        } catch (error) {
            throw new Error('Decryption failed');
        }
    };
}

export default Thencrypt;