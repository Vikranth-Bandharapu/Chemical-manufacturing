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
            const stat = fs.statSync(filePath);
            
            if (stat.mtime > new Date('2026-07-21T00:00:00Z')) {
                console.log(`Flipping ${file}...`);
                try {
                    const inputBuffer = fs.readFileSync(filePath);
                    const outputBuffer = await sharp(inputBuffer).rotate(180).toBuffer();
                    fs.writeFileSync(filePath, outputBuffer);
                    
                    const oldDate = new Date('2026-07-20T00:00:00Z');
                    fs.utimesSync(filePath, oldDate, oldDate);
                    flippedCount++;
                } catch (e) {
                    console.error(`Error flipping ${file}:`, e);
                }
            }
        }
    }
    console.log(`Done. Flipped ${flippedCount} images.`);
}
processFiles();
