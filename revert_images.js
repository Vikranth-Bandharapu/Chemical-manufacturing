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
            
            // Revert all images that we mistakenly flipped earlier
            // The utime was set to 2026-07-20T00:00:00Z by our script!
            if (stat.mtime.getTime() === new Date('2026-07-20T00:00:00Z').getTime()) {
                console.log(`Reverting ${file}...`);
                try {
                    const inputBuffer = fs.readFileSync(filePath);
                    const outputBuffer = await sharp(inputBuffer).rotate(180).toBuffer();
                    fs.writeFileSync(filePath, outputBuffer);
                    
                    // Update mtime to now so we don't flip again
                    fs.utimesSync(filePath, new Date(), new Date());
                    flippedCount++;
                } catch (e) {
                    console.error(`Error reverting ${file}:`, e);
                }
            }
        }
    }
    console.log(`Done. Reverted ${flippedCount} images.`);
}
processFiles();
