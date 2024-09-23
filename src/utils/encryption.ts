import crypto, { CipherGCM, DecipherGCM } from 'crypto';
import { IV_SIZE } from '../constants';

interface EncryptedData {
    iv: Buffer;
    encrypted: Buffer;
    tag: Buffer;
}

export const encrypt = (data: Buffer | string, key: Buffer): EncryptedData => {
    const iv = crypto.randomBytes(IV_SIZE);
    const cipher: CipherGCM = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const tag = cipher.getAuthTag();
    return { iv, encrypted, tag };
};

export function decrypt(encrypted: Buffer, key: Buffer, iv: Buffer, tag: Buffer): Buffer {
    const decipher: DecipherGCM = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
}

