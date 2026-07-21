const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'about.html', 'products.html', 'innovation.html', 
    'sustainability.html', 'contact.html', 'login.html', 'signup.html',
    'dashboard-admin.html', 'dashboard-manager.html', 'dashboard-employee.html'
];

files.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Make navbar full width
        content = content.replace(
            /<nav class="navbar(.*?)">\s*<div class="container">/g, 
            '<nav class="navbar$1">\n        <div class="container-fluid px-4 px-lg-5">'
        );
        
        // Add text-center to footer if not already there (though we will handle in CSS mostly)
        // Actually, just the navbar needs changing in HTML. The footer we can just do in CSS!
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
