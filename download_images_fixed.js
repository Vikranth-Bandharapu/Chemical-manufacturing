const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const images = {
    'logo.jpg': 'https://loremflickr.com/400/200/logo,abstract/all',
    'about-hq.jpg': 'https://loremflickr.com/800/600/headquarters,building,modern/all',
    'about-mission.jpg': 'https://loremflickr.com/800/600/factory,sunset/all',
    'about-vision.jpg': 'https://loremflickr.com/800/600/laboratory,futuristic/all',
    'about-map.jpg': 'https://loremflickr.com/800/600/world,map,technology/all',
    'pharma.jpg': 'https://loremflickr.com/800/600/pharmaceutical,laboratory/all',
    'office-asia.jpg': 'https://loremflickr.com/800/600/office,asia/all',
    'team-ceo.jpg': 'https://loremflickr.com/400/400/ceo,businessman,portrait/all',
    'team-cto.jpg': 'https://loremflickr.com/400/400/businesswoman,portrait/all',
    'team-coo.jpg': 'https://loremflickr.com/400/400/businessman,portrait/all',
    'news-1.jpg': 'https://loremflickr.com/800/600/chemical,plant/all',
    'news-2.jpg': 'https://loremflickr.com/800/600/green,chemistry,plant/all',
    'news-3.jpg': 'https://loremflickr.com/800/600/business,growth,chart/all',
    'feature-rd.jpg': 'https://loremflickr.com/800/600/research,laboratory/all',
    'inno-bio.jpg': 'https://loremflickr.com/800/600/biology,science/all',
    'sust-stem.jpg': 'https://loremflickr.com/800/600/education,students/all',
    'product-catalysts.jpg': 'https://loremflickr.com/800/600/chemistry,macro/all',
    'office-europe.jpg': 'https://loremflickr.com/800/600/office,europe/all',
    'office-me.jpg': 'https://loremflickr.com/800/600/office,dubai/all',
    'factory-interior.jpg': 'https://loremflickr.com/800/600/factory,interior/all',
    'category-industrial.jpg': 'https://loremflickr.com/800/600/industrial,chemistry/all',
    'category-specialty.jpg': 'https://loremflickr.com/800/600/chemistry,glassware/all',
    'category-agro.jpg': 'https://loremflickr.com/800/600/agriculture,science/all',
    'agro-index.jpg': 'https://loremflickr.com/800/600/agriculture,field/all',
    'feature-construction.jpg': 'https://loremflickr.com/800/600/construction,cranes/all',
    'feature-water.jpg': 'https://loremflickr.com/800/600/water,treatment/all',
    'client-john.jpg': 'https://loremflickr.com/400/400/man,business,portrait/all',
    'client-alice.jpg': 'https://loremflickr.com/400/400/woman,business,portrait/all',
    'category-pharma.jpg': 'https://loremflickr.com/800/600/pharmaceutical,cleanroom/all',
    'product-polymers.jpg': 'https://loremflickr.com/800/600/plastic,polymer/all',
    'product-surfactants.jpg': 'https://loremflickr.com/800/600/liquid,chemistry/all',
    'agro-products.jpg': 'https://loremflickr.com/800/600/plants,science/all',
    'qc-products.jpg': 'https://loremflickr.com/800/600/quality,control/all',
    'sust-solar.jpg': 'https://loremflickr.com/800/600/solar,panels/all',
    'sust-safety.jpg': 'https://loremflickr.com/800/600/safety,worker/all',
    'sust-health.jpg': 'https://loremflickr.com/800/600/occupational,health/all'
};

function download(fileUrl, dest) {
    return new Promise((resolve, reject) => {
        https.get(fileUrl, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                let redirectUrl = response.headers.location;
                if (!redirectUrl.startsWith('http')) {
                    const parsedUrl = new url.URL(fileUrl);
                    redirectUrl = `${parsedUrl.protocol}//${parsedUrl.host}${redirectUrl}`;
                }
                return download(redirectUrl, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error('Failed to get ' + fileUrl + ' (' + response.statusCode + ')'));
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
            file.on('error', (err) => {
                fs.unlink(dest, () => reject(err));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function run() {
    console.log("Downloading new images...");
    const promises = [];
    for (const [filename, fileUrl] of Object.entries(images)) {
        const dest = path.join(assetsDir, filename);
        promises.push(
            download(fileUrl, dest)
                .then(() => console.log(`Downloaded ${filename}`))
                .catch(e => console.error(`Error downloading ${filename}:`, e.message))
        );
    }
    await Promise.allSettled(promises); // Wait for all to finish, even if some fail
    
    // Check if logo.jpg exists before copying
    if (fs.existsSync(path.join(assetsDir, 'logo.jpg'))) {
        fs.copyFileSync(path.join(assetsDir, 'logo.jpg'), path.join(assetsDir, 'logo.webp'));
    }

    console.log("Updating HTML files to use clean .jpg names...");
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    const timestamp = Date.now();
    
    for (const file of htmlFiles) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Match ANY assets/name.webp, assets/name-final4.jpg etc, and replace with assets/name.jpg
        content = content.replace(/assets\/([a-zA-Z0-9_-]+?)(?:-final|-final2|-final3|-final4)?\.(webp|jpg|png)(?:\?v=\d+)?/g, (match, basename) => {
            // Special case for logo.webp if needed, but we can just map it to logo.jpg
            let cleanName = basename;
            if (cleanName === 'logo') return `assets/logo.jpg?v=${timestamp}`;
            return `assets/${cleanName}.jpg?v=${timestamp}`;
        });
        
        fs.writeFileSync(file, content);
    }
    console.log("All done!");
}

run();
