declare class Thencrypt {
    private secretKey;
    constructor(secretKey: string);
    encrypt(plaintext: string): Promise<string>;
    decrypt(ciphertext: string): Promise<string>;
}
export default Thencrypt;
