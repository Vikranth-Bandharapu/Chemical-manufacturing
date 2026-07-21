const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== '404.html' && !f.includes('login') && !f.includes('signup') && !f.includes('forgot'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    let original = content;

    // Replace href in <a> tags that have btn or btn-custom class
    content = content.replace(/<a([^>]*?)class="([^"]*\b(?:btn|btn-custom)\b[^"]*)"([^>]*?)href="([^"]+)"/g, (match, p1, p2, p3, href) => {
        if (href !== '404.html' && href !== 'login.html') {
            return `<a${p1}class="${p2}"${p3}href="404.html"`;
        }
        return match;
    });

    content = content.replace(/<a([^>]*?)href="([^"]+)"([^>]*?)class="([^"]*\b(?:btn|btn-custom)\b[^"]*)"/g, (match, p1, href, p3, p4) => {
        if (href !== '404.html' && href !== 'login.html') {
            return `<a${p1}href="404.html"${p3}class="${p4}"`;
        }
        return match;
    });

    // Replace <button> tags to add onclick, excluding type="submit", navbar togglers, accordion buttons
    content = content.replace(/<button([^>]*?)>/g, (match, attrs) => {
        if (attrs.includes('type="submit"') || attrs.includes('data-bs-toggle') || attrs.includes('navbar-toggler')) {
            return match;
        }
        // If it's a CTA button and doesn't already have an onclick
        if (attrs.includes('btn') && !attrs.includes('onclick')) {
            return `<button${attrs} onclick="window.location.href='404.html'">`;
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(path.join(__dirname, file), content);
        console.log(`Updated CTAs in ${file}`);
    }
});
