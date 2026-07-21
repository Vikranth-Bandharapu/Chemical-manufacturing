const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'innovation.html', 'sustainability.html', 'products.html', 'contact.html'];
const dir = path.join(__dirname);

const map = {
    'Chemical+Plant': 'hero-banner.webp',
    'R&amp;D': 'lab-research.webp',
    'R&D': 'lab-research.webp',
    'Production': 'factory-interior.webp',
    'Quality+Control': 'quality-control.webp',
    'Pharmaceuticals': 'quality-control.webp',
    'Agriculture': 'sustainability.webp',
    'Construction': 'factory-interior.webp',
    'Water+Treatment': 'sustainability.webp',
    'Our+Mission': 'hero-banner.webp',
    'Our+Vision': 'innovation.webp',
    'Safety+First': 'factory-interior.webp',
    'Excellence': 'quality-control.webp',
    'Integrity': 'lab-research.webp',
    'Advanced+Labs': 'lab-research.webp',
    'Bio-Catalysis': 'innovation.webp',
    'Polymers': 'factory-interior.webp',
    'Agri-Science': 'sustainability.webp',
    'APIs': 'quality-control.webp',
    'Pilot+Plant': 'factory-interior.webp',
    'Solar+Panels': 'sustainability.webp',
    'Solvent+Recovery': 'factory-interior.webp',
    'Eco-Packaging': 'sustainability.webp',
    'Byproduct': 'innovation.webp',
    'Safety+Gear': 'factory-interior.webp',
    'STEM+Education': 'lab-research.webp',
    'Community+Health': 'sustainability.webp',
    'Polymer+Additives': 'innovation.webp',
    'Surfactants': 'quality-control.webp',
    'Catalysts': 'innovation.webp',
    'Europe+Office': 'hero-banner.webp',
    'Asia+Pacific': 'hero-banner.webp',
    'Middle+East': 'hero-banner.webp',
    'Global+Map+Integration': 'hero-banner.webp'
};

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    content = content.replace(/https:\/\/placehold\.co\/[0-9x]+\/[A-F0-9]+\/[A-F0-9]+\.webp\?text=([^"&]+(?:&amp;[^"&]+)?)/g, (match, text) => {
        if (map[text]) {
            return `assets/${map[text]}`;
        }
        return `assets/factory-interior.webp`;
    });
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log(`Updated ${file}`);
});
