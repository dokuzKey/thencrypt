"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveKey = deriveKey;
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("../constants");
function deriveKey(secretKey, salt) {
    return new Promise((resolve, reject) => {
        const pepperedPassword = secretKey + constants_1.PEPPER;
        crypto_1.default.pbkdf2(pepperedPassword, salt, constants_1.PBKDF2_ITERATIONS, constants_1.KEY_SIZE, 'sha512', (err, key) => {
            if (err)
                reject(err);
            else
                resolve(key);
        });
    });
}
