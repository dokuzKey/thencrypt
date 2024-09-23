"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("../constants");
function hash(data) {
    const hmac = crypto_1.default.createHmac('sha512', constants_1.HMAC_KEY);
    hmac.update(data);
    return hmac.digest();
}
;
