const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const htmlFiles = ['index.html', 'about.html', 'sustainability.html', 'products.html', 'dashboard-admin.html', 'dashboard-employee.html', 'innovation.html', 'contact.html', 'blog.html'];

async function processFiles() {
    console.log("Flipping all images one final time to make them upright...");
    const files = fs.readdirSync(assetsDir);
    let flippedCount = 0;
    
    // Flip every .webp file in place
    for (const file of files) {
        if (file.endsWith('.webp')) {
            const filePath = path.join(assetsDir, file);
            try {
                const inputBuffer = fs.readFileSync(filePath);
                
                const outputBuffer = await sharp(inputBuffer)
                    .flip()
                    .flop()
                    .withMetadata(false)
                    .toBuffer();
                    
                fs.writeFileSync(filePath, outputBuffer);
                flippedCount++;
            } catch (e) {
                console.error(`Error flipping ${file}:`, e);
            }
        }
    }
    console.log(`Flipped ${flippedCount} images back to UPRIGHT.`);

    console.log("Updating HTML to bypass cache (-final3)...");
    for (const htmlFile of htmlFiles) {
        if (fs.existsSync(htmlFile)) {
            let content = fs.readFileSync(htmlFile, 'utf8');
            
            content = content.replace(/assets\/([a-zA-Z0-9_-]+?)(?:-final|-final2|-final3)?\.(webp)(\?v=\d+)?/g, (match, basename, ext) => {
                const newBasename = `${basename}-final3`;
                
                let sourceFile = path.join(assetsDir, `${basename}-final2.webp`);
                if (!fs.existsSync(sourceFile)) {
                    sourceFile = path.join(assetsDir, `${basename}-final.webp`);
                }
                if (!fs.existsSync(sourceFile)) {
                    sourceFile = path.join(assetsDir, `${basename}.webp`);
                }
                
                const destFile = path.join(assetsDir, `${newBasename}.${ext}`);
                if (fs.existsSync(sourceFile)) {
                    fs.copyFileSync(sourceFile, destFile);
                }
                
                return `assets/${newBasename}.${ext}?v=6`;
            });
            
            fs.writeFileSync(htmlFile, content);
            console.log(`Updated ${htmlFile}`);
        }
    }
    console.log("Done! Everything is upright and cache is busted.");
}

processFiles();
