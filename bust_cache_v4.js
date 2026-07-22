const fs = require('fs');
const files = ['index.html', 'about.html', 'sustainability.html', 'dashboard-admin.html', 'dashboard-employee.html'];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/\?v=3/g, '?v=4');
        content = content.replace(/\?v=2/g, '?v=4');
        fs.writeFileSync(file, content);
    }
}
console.log('Cache busted to v4!');
