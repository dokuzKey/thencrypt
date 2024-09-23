import crypto from 'crypto';
import { PBKDF2_ITERATIONS, KEY_SIZE, PEPPER } from '../constants';

export function deriveKey(secretKey: string | Buffer, salt: Buffer | string): Promise<any> {
    return new Promise((resolve, reject) => {
        const pepperedPassword = secretKey + PEPPER;
        crypto.pbkdf2(pepperedPassword, salt, PBKDF2_ITERATIONS, KEY_SIZE, 'sha512', (err, key) => {
            if (err) reject(err);
            else resolve(key);
        });
    });
}