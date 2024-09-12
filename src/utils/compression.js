const zlib = require('zlib');

exports.compress = (data) => {
    return new Promise((resolve, reject) => {
        zlib.brotliCompress(Buffer.from(data, 'utf8'), (err, compressed) => {
            if (err) reject(err);
            else resolve(compressed);
        });
    });
};

exports.decompress = (data) => {
    return new Promise((resolve, reject) => {
        zlib.brotliDecompress(data, (err, decompressed) => {
            if (err) reject(err);
            else resolve(decompressed);
        });
    });
};