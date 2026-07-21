const fs = require('fs');
const path = require('path');

const files = ['dashboard-admin.html', 'dashboard-manager.html', 'dashboard-employee.html'];

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Replace anything that looks like a logout link to point to index.html
        // e.g., <a href="404.html" class="nav-link text-danger"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</a>
        content = content.replace(/href="[^"]*"([^>]*>[\s\S]*?(?:Logout|Log Out|Sign Out))/gi, 'href="index.html"$1');

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            console.log('Updated logout link in ' + f);
        }
    }
});
