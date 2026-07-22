const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');

// List of specific files to flip based on user screenshots
const filesToFlip = [
    'about-hq-final4.jpg',
    'pharma-final4.jpg',
    'office-asia-final4.jpg',
    'category-industrial-final4.jpg',
    'category-specialty-final4.jpg',
    'category-agro-final4.jpg',
    'category-pharma-final4.jpg',
    'qc-products-final4.jpg',
    'agro-products-final4.jpg',
    'product-polymers-final4.jpg',
    'product-surfactants-final4.jpg',
    'product-catalysts-final4.jpg',
    'sus-plant-final4.jpg',
    'sus-water-final4.jpg',
    'sus-energy-final4.jpg',
    'sus-cert-final4.jpg',
    'blog-1-final4.jpg',
    'blog-2-final4.jpg',
    'blog-3-final4.jpg',
    'contact-bg-final4.jpg',
    'team-ceo-final4.jpg',
    'team-cto-final4.jpg',
    'team-coo-final4.jpg'
];

async function processFiles() {
    console.log("Flipping specific images 180 degrees...");
    let flippedCount = 0;
    
    for (const file of filesToFlip) {
        const filePath = path.join(assetsDir, file);
        if (fs.existsSync(filePath)) {
            try {
                const inputBuffer = fs.readFileSync(filePath);
                
                // Write to a temp file first, then replace
                const tempPath = path.join(assetsDir, file + '.tmp');
                
                await sharp(inputBuffer)
                    .rotate(180)
                    .withMetadata(false)
                    .jpeg({ quality: 90 })
                    .toFile(tempPath);
                    
                fs.copyFileSync(tempPath, filePath);
                fs.unlinkSync(tempPath);
                
                flippedCount++;
                console.log(`Successfully flipped: ${file}`);
            } catch (e) {
                console.error(`Error flipping ${file}:`, e);
            }
        } else {
            console.warn(`File not found: ${file}`);
        }
    }
    
    console.log(`Flipped ${flippedCount} images.`);

    // To bust cache again, we must update the HTML files to use ?v=8
    console.log("Updating HTML cache buster to ?v=8...");
    const htmlFiles = ['index.html', 'about.html', 'sustainability.html', 'products.html', 'dashboard-admin.html', 'dashboard-employee.html', 'innovation.html', 'contact.html', 'blog.html'];
    
    for (const htmlFile of htmlFiles) {
        if (fs.existsSync(htmlFile)) {
            let content = fs.readFileSync(htmlFile, 'utf8');
            content = content.replace(/\?v=7/g, '?v=8');
            fs.writeFileSync(htmlFile, content);
        }
    }
    console.log("Done updating HTML cache buster.");
}

processFiles();
