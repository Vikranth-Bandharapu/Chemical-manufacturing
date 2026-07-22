const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'assets');

async function processImages() {
    const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.jpg') && f !== 'logo.jpg');
    
    for (const file of files) {
        const inputPath = path.join(assetsDir, file);
        const outputName = file.replace('.jpg', '.webp');
        const outputPath = path.join(assetsDir, outputName);
        
        try {
            // Convert to webp with high compression to ensure <100kb
            await sharp(inputPath)
                .webp({ quality: 50, effort: 6 }) // quality 50 ensures very small file size
                .toFile(outputPath);
                
            // Check size
            const stat = fs.statSync(outputPath);
            console.log(`Converted ${file} to ${outputName} - Size: ${(stat.size / 1024).toFixed(2)} KB`);
            
            // Delete original jpg
            fs.unlinkSync(inputPath);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    // Update HTML files
    console.log("Updating HTML files...");
    const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
    
    for (const htmlFile of htmlFiles) {
        let content = fs.readFileSync(htmlFile, 'utf8');
        
        // Replace all .jpg references inside assets folder to .webp
        content = content.replace(/assets\/([a-zA-Z0-9_-]+)\.jpg/g, 'assets/$1.webp');
        
        fs.writeFileSync(htmlFile, content);
    }
    
    // Also remove logo.jpg if it exists just to clean up
    if (fs.existsSync(path.join(assetsDir, 'logo.jpg'))) {
        fs.unlinkSync(path.join(assetsDir, 'logo.jpg'));
    }

    console.log("All done!");
}

processImages();
