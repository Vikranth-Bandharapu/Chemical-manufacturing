const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const files = fs.readdirSync(assetsDir);

async function processFiles() {
    let flippedCount = 0;
    for (const file of files) {
        if (file.endsWith('.webp')) {
            const filePath = path.join(assetsDir, file);
            try {
                const inputBuffer = fs.readFileSync(filePath);
                
                // Flip vertically and horizontally (effectively rotate 180), strip metadata
                const outputBuffer = await sharp(inputBuffer)
                    .flip()
                    .flop()
                    .withMetadata(false)
                    .toBuffer();
                    
                fs.writeFileSync(filePath, outputBuffer);
                flippedCount++;
                console.log(`Flipped ${file}`);
            } catch (e) {
                console.error(`Error flipping ${file}:`, e);
            }
        }
    }
    console.log(`Done. Flipped ${flippedCount} images.`);
}
processFiles();
