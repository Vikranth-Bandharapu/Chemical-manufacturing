const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('dashboard'));

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace the single Sign In button with both Login and Sign Up
    content = content.replace(/<div class="d-flex gap-3">\s*<a href="login\.html" class="btn-custom btn-primary-custom">Sign In<\/a>\s*<\/div>/g, 
`<div class="d-flex gap-3">
                    <a href="login.html" class="btn-custom btn-outline-custom">Login</a>
                    <a href="signup.html" class="btn-custom btn-primary-custom">Sign Up</a>
                </div>`);

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Restored Login/Sign Up buttons in ' + f);
    }
});
