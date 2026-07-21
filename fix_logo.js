const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let c = fs.readFileSync(path.join(__dirname, f), 'utf8');
    let original = c;
    
    const oldLogo = '<img src="assets/logo.webp" alt="CHEMCO Logo" height="35" class="d-inline-block align-text-top me-2" style="filter: drop-shadow(0 0 2px rgba(0,0,0,0.2));">';
    const newLogo = '<img src="assets/logo.webp" alt="CHEMCO Logo" style="height: 40px; max-width: 160px; object-fit: contain; filter: drop-shadow(0 0 2px rgba(0,0,0,0.2));">';
    
    c = c.split(oldLogo).join(newLogo);
    
    if (c !== original) {
        fs.writeFileSync(path.join(__dirname, f), c);
        console.log('Fixed logo in ' + f);
    }
});
