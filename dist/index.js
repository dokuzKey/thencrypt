"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const compression_1 = require("./utils/compression");
const keyDerivation_1 = require("./utils/keyDerivation");
const encryption_1 = require("./utils/encryption");
const hashing_1 = require("./utils/hashing");
const constants_1 = require("./constants");
class Thencrypt {
    constructor(secretKey) {
        if (!secretKey) {
            throw new Error('A secret key is required!');
        }
        this.secretKey = secretKey;
    }
    encrypt(plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compressed = yield (0, compression_1.compress)(plaintext);
                const salt = crypto_1.default.randomBytes(constants_1.SALT_SIZE);
                const key = yield (0, keyDerivation_1.deriveKey)(this.secretKey, salt);
                const { iv, encrypted, tag } = (0, encryption_1.encrypt)(compressed, key);
                const dataToHash = Buffer.concat([salt, iv, encrypted, tag]);
                const dataHash = (0, hashing_1.hash)(dataToHash);
                const result = Buffer.concat([salt, iv, encrypted, tag, dataHash]);
                return result.toString('base64');
            }
            catch (error) {
                throw new Error(`Encryption failed: ${error.message}`);
            }
        });
    }
    decrypt(ciphertext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = Buffer.from(ciphertext, 'base64');
                const salt = data.subarray(0, constants_1.SALT_SIZE);
                const iv = data.subarray(constants_1.SALT_SIZE, constants_1.SALT_SIZE + constants_1.IV_SIZE);
                const encrypted = data.subarray(constants_1.SALT_SIZE + constants_1.IV_SIZE, -constants_1.TAG_SIZE - 64);
                const tag = data.subarray(-constants_1.TAG_SIZE - 64, -64);
                const key = yield (0, keyDerivation_1.deriveKey)(this.secretKey, salt);
                const decrypted = (0, encryption_1.decrypt)(encrypted, key, iv, tag);
                const decompressed = yield (0, compression_1.decompress)(decrypted);
                return decompressed.toString('utf8');
            }
            catch (error) {
                throw new Error('Decryption failed');
            }
        });
    }
    ;
}
exports.default = Thencrypt;
