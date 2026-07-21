const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('dashboard'));

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace the Login button with a solid Sign In button
    content = content.replace(/<a href="login\.html" class="btn-custom btn-outline-custom">Login<\/a>/g, '<a href="login.html" class="btn-custom btn-primary-custom">Sign In</a>');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Updated Sign In button in ' + f);
    }
});
