const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('dashboard'));

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Use regex to remove the Get Quote button and any preceding whitespace/newlines
    content = content.replace(/\s*<a href="[^"]*" class="btn-custom btn-primary-custom">Get Quote<\/a>/g, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Removed Get Quote button in ' + f);
    }
});
