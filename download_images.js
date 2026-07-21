const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');

const images = [
    { name: 'hero-banner.webp', prompt: 'modern professional chemical manufacturing plant industrial facility exterior high quality' },
    { name: 'lab-research.webp', prompt: 'state of the art chemistry laboratory with scientists working in white coats bright professional' },
    { name: 'factory-interior.webp', prompt: 'clean modern industrial chemical plant interior with pipes and steel tanks' },
    { name: 'innovation.webp', prompt: 'abstract molecule structure glowing blue and orange chemistry research' },
    { name: 'sustainability.webp', prompt: 'solar panels at an industrial factory green energy sustainability professional' },
    { name: 'quality-control.webp', prompt: 'scientist inspecting a glowing liquid vial in a clean laboratory' },
    { name: 'products.webp', prompt: 'industrial chemical storage tanks pure professional lighting' },
    { name: 'safety.webp', prompt: 'industrial worker in safety gear professional factory setting' },
    { name: 'global.webp', prompt: 'global logistics shipping containers modern port' },
    { name: 'agriculture.webp', prompt: 'advanced agricultural technology green crop field' },
    { name: 'pharma.webp', prompt: 'pharmaceutical manufacturing pills laboratory clean room' },
    { name: 'contact.webp', prompt: 'modern corporate office building exterior glass professional' }
];

const targetDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadAndConvert() {
    for (const img of images) {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(img.prompt)}?width=800&height=600&nologo=true`;
        const filepath = path.join(targetDir, img.name);
        
        console.log(`Downloading ${img.name}...`);
        try {
            const response = await axios({
                url,
                responseType: 'arraybuffer'
            });
            
            console.log(`Converting ${img.name} to WebP...`);
            await sharp(response.data)
                .webp({ quality: 60 }) // High compression to keep < 100kb
                .toFile(filepath);
                
            const stats = fs.statSync(filepath);
            console.log(`Saved ${img.name} - Size: ${(stats.size / 1024).toFixed(2)} KB`);
        } catch (error) {
            console.error(`Error processing ${img.name}:`, error.message);
        }
    }
    console.log("All images processed successfully!");
}

downloadAndConvert();
