# thencrypt

An easy-to-use encryption module based on Crypto.

## Installation

```bash
npm install thencrypt
```

## Usage

```typescript
import thencrypt from 'thencrypt';

interface Encryptor {
    encrypt(text: string): Promise<string>;
    decrypt(encryptedText: string): Promise<string>;
}

async function dokuzKey(): Promise<void> {
    const secretKey: string = 'SECRET_KEY';
    const encryptor: Encryptor = new thencrypt(secretKey);
    const text: string = 'I love musti!';

    try {
        const encrypted: string = await encryptor.encrypt(text);
        console.log('Encrypted data: ', encrypted);

        const decrypted: string = await encryptor.decrypt(encrypted);
        console.log('Decrypted data: ', decrypted);
    } catch (error) {
        console.error('Encryption error: ', error);
    }
}

dokuzKey();
```

## License
The thencrypt package is licensed under the Apache 2.0 license. More can be found in [LICENSE](LICENSE)