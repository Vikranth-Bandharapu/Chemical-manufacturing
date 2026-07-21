const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace in footer or anywhere
    content = content.replace(/\+1 \(555\) 123-4567/g, '9876543221');
    content = content.replace(/info@chemcomanufacturing\.com/g, 'support@stackly.com');

    // Also update href="mailto:..." and href="tel:..." if they exist
    content = content.replace(/mailto:info@chemcomanufacturing\.com/g, 'mailto:support@stackly.com');
    content = content.replace(/tel:\+15551234567/g, 'tel:9876543221');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Updated contact info in ' + f);
    }
});
