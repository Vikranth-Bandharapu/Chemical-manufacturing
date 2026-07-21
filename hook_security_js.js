const fs = require('fs');
const path = require('path');

const files = ['dashboard-admin.html', 'dashboard-manager.html', 'dashboard-employee.html'];

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    let c = fs.readFileSync(filePath, 'utf8');
    
    // Add script at bottom
    if (!c.includes('security.js')) {
        c = c.replace(/<\/body>/, '    <script src="assets/js/security.js"></script>\n</body>');
    }
    
    // Admin Dashboard updates
    if (f === 'dashboard-admin.html') {
        c = c.replace(/<a href="404\.html" class="btn btn-danger btn-sm security-font">/g, '<a href="#" class="btn btn-danger btn-sm security-font btn-lockdown">');
        c = c.replace(/<div class="log-feed pe-2">/g, '<div class="log-feed pe-2" id="log-feed-container">');
    }
    
    // Manager Dashboard updates
    if (f === 'dashboard-manager.html') {
        c = c.replace(/fs-2">94\.2%<\/h3>/g, 'fs-2" id="live-yield">94.2%</h3>');
    }
    
    // Employee Dashboard updates
    if (f === 'dashboard-employee.html') {
        c = c.replace(/fs-3">14:00:00Z<\/h3>/g, 'fs-3"><span class="live-clock">14:00:00Z</span></h3>');
    }
    
    fs.writeFileSync(filePath, c);
    console.log('Hooked JS in ' + f);
});
