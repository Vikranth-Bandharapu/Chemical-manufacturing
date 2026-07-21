const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    let original = content;

    // Replace the text-based logo with the image logo across the files
    const logoHtml = '<img src="assets/logo.webp" alt="CHEMCO Logo" height="35" class="d-inline-block align-text-top me-2" style="filter: drop-shadow(0 0 2px rgba(0,0,0,0.2));">';
    
    // Replace exact text logo string
    content = content.replace(/<i class="fa-solid fa-flask-vial"><\/i>\s*CHEM<span>CO<\/span>/g, logoHtml);

    if (content !== original) {
        fs.writeFileSync(path.join(__dirname, file), content);
        console.log(`Updated Logo in ${file}`);
    }
});
