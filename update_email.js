const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'about.html', 'products.html', 'innovation.html', 
    'sustainability.html', 'contact.html', 'login.html', 'signup.html'
];

files.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/support@stackly\.com/g, 'support@chemco.com');
        fs.writeFileSync(file, content);
    }
});
