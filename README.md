# thencrypt

An easy-to-use encryption module based on Crypto.

## Installation

```bash
npm install thencrypt
```

## Usage

```javascript
const thencrypt = require('thencrypt');

async function dokuzKey() {
    const secretKey = 'SECRET_KEY';
    const encryptor = new thencrypt(secretKey);
    const text = 'I love musti!';

    try {
        const encrypted = await encryptor.encrypt(text);
        console.log('Encrypted data: ', encrypted);

        const decrypted = await encryptor.decrypt(encrypted);
        console.log('Decrypted data: ', decrypted);
    } catch (error) {
        console.error('Encryption error: ', error);
    }
}

dokuzKey();
```

## License
The thencrypt package is licensed under the Apache 2.0 license. More can be found in [LICENSE](https://github.com/dokuzKey/thencrypt/blob/main/LICENSE)