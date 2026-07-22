const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const htmlFiles = ['index.html', 'about.html', 'sustainability.html', 'products.html', 'dashboard-admin.html', 'dashboard-employee.html', 'innovation.html', 'contact.html', 'blog.html'];

async function processFiles() {
    console.log("Flipping all images back to normal...");
    const files = fs.readdirSync(assetsDir);
    let flippedCount = 0;
    
    // We will flip every .webp file in place
    for (const file of files) {
        if (file.endsWith('.webp')) {
            const filePath = path.join(assetsDir, file);
            try {
                const inputBuffer = fs.readFileSync(filePath);
                
                // Flip vertically and horizontally to reverse the previous flip
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
    console.log(`Flipped ${flippedCount} images back to normal.`);

    console.log("Updating HTML to bypass cache again (-final2)...");
    for (const htmlFile of htmlFiles) {
        if (fs.existsSync(htmlFile)) {
            let content = fs.readFileSync(htmlFile, 'utf8');
            
            // The HTML currently points to assets/filename-final.webp (or just .webp)
            // Let's replace anything ending in .webp or -final.webp with -final2.webp
            
            content = content.replace(/assets\/([a-zA-Z0-9_-]+?)(?:-final|-final2)?\.(webp)(\?v=\d+)?/g, (match, basename, ext) => {
                const newBasename = `${basename}-final2`;
                
                // We need to copy the corresponding file to the new filename
                // Wait, if the HTML currently points to basename-final, the actual file on disk is basename-final.webp
                // If it points to just basename, the file is basename.webp
                // We just flipped ALL .webp files, so they are all upright now.
                // We can just copy the base file (or whatever it is) to -final2
                
                let sourceFile = path.join(assetsDir, `${basename}-final.webp`);
                if (!fs.existsSync(sourceFile)) {
                    sourceFile = path.join(assetsDir, `${basename}.webp`);
                }
                
                const destFile = path.join(assetsDir, `${newBasename}.${ext}`);
                if (fs.existsSync(sourceFile)) {
                    fs.copyFileSync(sourceFile, destFile);
                }
                
                return `assets/${newBasename}.${ext}?v=5`;
            });
            
            fs.writeFileSync(htmlFile, content);
            console.log(`Updated ${htmlFile}`);
        }
    }
    console.log("Done!");
}

processFiles();
