// Generates docs/assets/optimize-demo.png: a deliberately heavy, unoptimized PNG
// so the optimize-images plugin has something to shrink in the build output.
// Usage: node scripts/generate-demo-image.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const width = 1280;
const height = 640;
const channels = 3;
const data = Buffer.alloc(width * height * channels);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const noise = Math.random() * 28 - 14;
    data[i] = Math.max(0, Math.min(255, 22 + (x / width) * 100 + noise));
    data[i + 1] = Math.max(0, Math.min(255, 22 + (y / height) * 60 + noise));
    data[i + 2] = Math.max(0, Math.min(255, 60 + (1 - x / width) * 150 + noise));
  }
}

mkdirSync('docs/assets', { recursive: true });
await sharp(data, { raw: { width, height, channels } })
  .png({ compressionLevel: 1 })
  .toFile('docs/assets/optimize-demo.png');
