const fs = require('fs');

// 1. Update css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');
css += `
/* Fix for mobile menu background scroll */
body.mobile-menu-open {
    overflow: hidden !important;
    height: 100vh !important;
    position: fixed;
    width: 100%;
}
`;
fs.writeFileSync('css/style.css', css);

// 2. Update js/main.js
let js = fs.readFileSync('js/main.js', 'utf8');
js = js.replace(/document\.body\.style\.overflow = 'hidden';/g, "document.body.classList.add('mobile-menu-open');");
js = js.replace(/document\.body\.style\.overflow = '';/g, "document.body.classList.remove('mobile-menu-open');");
fs.writeFileSync('js/main.js', js);

// 3. Remove notification icon from dashboards
const adminFile = 'dashboard-admin.html';
const managerFile = 'dashboard-manager.html';

function removeNotification(file) {
    let html = fs.readFileSync(file, 'utf8');
    const toRemove = `<div class="notification-icon">\r\n                        <i class="fa-solid fa-bell"></i>\r\n                    </div>`;
    // Try matching with both \r\n and \n
    let cleaned = html.replace(/<div class="notification-icon">[\s\S]*?<\/div>/g, '');
    fs.writeFileSync(file, cleaned);
}

removeNotification(adminFile);
removeNotification(managerFile);
console.log("Done.");
