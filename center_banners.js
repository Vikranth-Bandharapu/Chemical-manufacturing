const fs = require('fs');
const files = ['about.html', 'products.html', 'innovation.html', 'sustainability.html', 'contact.html'];
files.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace('<section class="page-banner">', '<section class="page-banner text-center">');
        content = content.replace('<div class="breadcrumb-custom gs-reveal">', '<div class="breadcrumb-custom gs-reveal justify-content-center">');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
