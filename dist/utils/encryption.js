"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("../constants");
const encrypt = (data, key) => {
    const iv = crypto_1.default.randomBytes(constants_1.IV_SIZE);
    const cipher = crypto_1.default.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const tag = cipher.getAuthTag();
    return { iv, encrypted, tag };
};
exports.encrypt = encrypt;
function decrypt(encrypted, key, iv, tag) {
    const decipher = crypto_1.default.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
}
