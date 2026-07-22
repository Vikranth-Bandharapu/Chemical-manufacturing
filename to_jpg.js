const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const htmlFiles = ['index.html', 'about.html', 'sustainability.html', 'products.html', 'dashboard-admin.html', 'dashboard-employee.html', 'innovation.html', 'contact.html', 'blog.html'];

async function processFiles() {
    console.log("Converting all currently used WebP files to JPG and forcing a 180 degree rotation...");
    const files = fs.readdirSync(assetsDir);
    let flippedCount = 0;
    
    // We only care about the currently used files, which are -final3.webp, 
    // or if they don't exist, we fallback.
    // Actually, let's just find all files that match the base names.
    // The easiest is just process every file that has -final3.webp
    
    for (const file of files) {
        if (file.endsWith('-final3.webp')) {
            const filePath = path.join(assetsDir, file);
            const baseName = file.replace('-final3.webp', '');
            const newFileName = `${baseName}-final4.jpg`;
            const destPath = path.join(assetsDir, newFileName);
            
            try {
                const inputBuffer = fs.readFileSync(filePath);
                
                // Force convert to JPEG (removes WebP specific quirks), rotate 180, strip metadata
                await sharp(inputBuffer)
                    .rotate(180)
                    .withMetadata(false)
                    .jpeg({ quality: 90 })
                    .toFile(destPath);
                    
                flippedCount++;
            } catch (e) {
                console.error(`Error converting ${file}:`, e);
            }
        }
    }
    console.log(`Converted and rotated ${flippedCount} images to JPG.`);

    console.log("Updating HTML to point to -final4.jpg...");
    for (const htmlFile of htmlFiles) {
        if (fs.existsSync(htmlFile)) {
            let content = fs.readFileSync(htmlFile, 'utf8');
            
            // Replace any assets/filename...webp with assets/filename-final4.jpg
            content = content.replace(/assets\/([a-zA-Z0-9_-]+?)(?:-final|-final2|-final3)?\.(webp)(\?v=\d+)?/g, (match, basename, ext) => {
                return `assets/${basename}-final4.jpg?v=7`;
            });
            
            fs.writeFileSync(htmlFile, content);
            console.log(`Updated ${htmlFile}`);
        }
    }
    console.log("Done! Everything converted to JPG, rotated 180, and HTML updated.");
}

processFiles();
