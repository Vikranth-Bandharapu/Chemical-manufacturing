const fs = require('fs');
const path = require('path');

const files = ['dashboard-admin.html', 'dashboard-manager.html', 'dashboard-employee.html'];

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    let c = fs.readFileSync(filePath, 'utf8');
    
    // Replace Share Tech Mono with Roboto
    c = c.replace(/family=Share\+Tech\+Mono/g, 'family=Roboto:wght@400;500;700');
    c = c.replace(/'Share Tech Mono', monospace/g, "'Roboto', sans-serif");
    
    fs.writeFileSync(filePath, c);
    console.log('Updated font in ' + f);
});
