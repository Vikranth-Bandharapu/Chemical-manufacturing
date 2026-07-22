const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'about.html', 'sustainability.html'];
const assetsDir = path.join(__dirname, 'assets');

for (const htmlFile of htmlFiles) {
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Regex to match src="assets/something.webp" or src="assets/something.webp?v=3"
    // and background: url('assets/something.webp')
    
    const regex = /assets\/([a-zA-Z0-9_-]+)\.(webp|jpg|png)(\?v=\d+)?/g;
    
    content = content.replace(regex, (match, filename, ext) => {
        const originalPath = path.join(assetsDir, `${filename}.${ext}`);
        const newFilename = `${filename}-final.${ext}`;
        const newPath = path.join(assetsDir, newFilename);
        
        // Copy the file if it exists
        if (fs.existsSync(originalPath)) {
            fs.copyFileSync(originalPath, newPath);
        }
        
        return `assets/${newFilename}`;
    });
    
    fs.writeFileSync(htmlFile, content);
    console.log(`Updated ${htmlFile}`);
}
console.log('All images renamed to bypass local file cache!');
