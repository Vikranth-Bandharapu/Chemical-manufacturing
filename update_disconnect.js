const fs = require('fs');
const path = require('path');

const files = ['dashboard-admin.html', 'dashboard-manager.html', 'dashboard-employee.html'];

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Target DISCONNECT button exactly
        content = content.replace(/href="404\.html"([^>]*>[\s\S]*?DISCONNECT)/gi, 'href="index.html"$1');

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            console.log('Updated disconnect link in ' + f);
        }
    }
});
