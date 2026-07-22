const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\.webp"/g, '.webp?v=2"');
html = html.replace(/\.webp'\)/g, '.webp?v=2\')'); // For background images
fs.writeFileSync('index.html', html);
