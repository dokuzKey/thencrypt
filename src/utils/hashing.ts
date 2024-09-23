import crypto from 'crypto';
import { HMAC_KEY } from '../constants';

export function hash(data: Buffer | string): Buffer {
    const hmac = crypto.createHmac('sha512', HMAC_KEY);
    hmac.update(data);
    return hmac.digest();
};