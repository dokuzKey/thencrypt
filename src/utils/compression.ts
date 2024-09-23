import * as zlib from 'zlib';

export function compress(data: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        zlib.brotliCompress(Buffer.from(data, 'utf8'), (err, compressed) => {
            if (err) reject(err);
            else resolve(compressed);
        });
    });
}

export function decompress(data: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        zlib.brotliDecompress(data, (err, decompressed) => {
            if (err) reject(err);
            else resolve(decompressed);
        });
    });
}