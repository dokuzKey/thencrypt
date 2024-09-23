interface EncryptedData {
    iv: Buffer;
    encrypted: Buffer;
    tag: Buffer;
}
export declare const encrypt: (data: Buffer | string, key: Buffer) => EncryptedData;
export declare function decrypt(encrypted: Buffer, key: Buffer, iv: Buffer, tag: Buffer): Buffer;
export {};
