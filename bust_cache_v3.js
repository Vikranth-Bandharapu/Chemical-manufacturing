const fs = require('fs');

const files = ['index.html', 'about.html', 'sustainability.html'];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace ?v=2 with ?v=3
    content = content.replace(/\?v=2/g, '?v=3');
    
    // Also, if any .webp doesn't have a version parameter yet, give it ?v=3
    content = content.replace(/\.webp"/g, '.webp?v=3"');
    content = content.replace(/\.webp'\)/g, '.webp?v=3\')');
    
    // Clean up any double query params like ?v=3?v=3
    content = content.replace(/\?v=\d+\?v=\d+/g, '?v=3');
    
    fs.writeFileSync(file, content);
}
console.log('Cache busted to v3!');
